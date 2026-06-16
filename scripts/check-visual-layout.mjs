import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function fail(message) {
  failures.push(message);
}

function plainText(value) {
  return value
    .replace(/<[^>]*>/g, "")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function estimateWidth(value, size) {
  return Array.from(String(value)).reduce((width, ch) => {
    const code = ch.codePointAt(0);
    if (/\s/.test(ch)) return width + size * 0.32;
    if (code >= 0xac00 && code <= 0xd7a3) return width + size * 0.92;
    if (code > 127) return width + size * 0.74;
    if (/[A-Z0-9]/.test(ch)) return width + size * 0.62;
    return width + size * 0.5;
  }, 0);
}

function countSvgFiles(dir) {
  return readdirSync(dir).filter((name) => name.endsWith(".svg")).length;
}

function textFitLimit(kind, x, y) {
  if (kind === "control") {
    if (x >= 64 && x < 120 && y > 640) return 540;
    if (x >= 48 && x < 80 && y < 70) return 990;
    if (x >= 88 && x < 220 && y >= 160 && y <= 370) return 130;
    if (x >= 228 && x < 390 && y >= 160 && y <= 370) return 170;
    if (x >= 404 && x < 570 && y >= 160 && y <= 370) return 172;
  }

  if (kind === "training") {
    if (x >= 52 && x < 80 && y < 70) return 900;
    if (x >= 110 && x <= 900 && y >= 520) return 292;
    if (x >= 42 && x < 100 && y >= 250 && y <= 300) return 286;
  }

  return Infinity;
}

function scanGeneratedSvgText(kind, dir) {
  for (const name of readdirSync(dir).filter((file) => file.endsWith(".svg")).sort()) {
    const svg = readFileSync(join(dir, name), "utf8");
    const re = /<text x="([^"]+)" y="([^"]+)" font-size="([^"]+)"[^>]*>([\s\S]*?)<\/text>/g;
    let match;

    while ((match = re.exec(svg))) {
      const x = Number(match[1]);
      const y = Number(match[2]);
      const size = Number(match[3]);
      const limit = textFitLimit(kind, x, y);
      if (!Number.isFinite(limit)) continue;

      const tspanLines = [...match[4].matchAll(/<tspan[^>]*>(.*?)<\/tspan>/g)].map((line) => plainText(line[1]));
      const lines = tspanLines.length > 0 ? tspanLines : [plainText(match[4])];

      for (const line of lines) {
        const width = estimateWidth(line, size);
        if (width > limit) {
          fail(`${kind}/${name}: text may overflow (${Math.round(width)} > ${limit}) "${line}"`);
        }
      }
    }
  }
}

function scanLegacyText() {
  const targets = [
    join(root, "src", "assets", "diagrams"),
    join(root, "src", "assets", "images")
  ];
  const blocked = [
    /Programmer view/i,
    /machine-specific axis/i,
    />Safety</,
    />Power on</,
    />Reference</,
    />Tool setup</,
    /Record and review/i,
    /Machine body and work area/i,
    /CNC panel</i
  ];

  for (const dir of targets) {
    for (const name of readdirSync(dir).filter((file) => file.endsWith(".svg"))) {
      const svg = readFileSync(join(dir, name), "utf8");
      for (const pattern of blocked) {
        if (pattern.test(svg)) fail(`${join(dir, name)} contains legacy visual text: ${pattern}`);
      }
    }
  }
}

function checkGeneratedCounts() {
  const controlCount = countSvgFiles(join(root, "src", "assets", "diagrams", "control"));
  const trainingCount = countSvgFiles(join(root, "src", "assets", "diagrams", "training"));
  if (controlCount !== 20) fail(`expected 20 control SVGs, found ${controlCount}`);
  if (trainingCount !== 20) fail(`expected 20 training SVGs, found ${trainingCount}`);
}

function checkHtmlImages() {
  for (const lang of ["ko", "vi"]) {
    const htmlDir = join(root, "output", "html", lang);
    if (!existsSync(htmlDir)) continue;

    for (const name of readdirSync(htmlDir).filter((file) => /^level1_item\d{2}\.html$/.test(file)).sort()) {
      const html = readFileSync(join(htmlDir, name), "utf8");
      const imgCount = (html.match(/<img /g) ?? []).length;
      if (imgCount !== 3) fail(`${lang}/${name}: expected 3 images, found ${imgCount}`);
      if (/bootstrap|icons\/bootstrap|visual-card|visual-strip/i.test(html)) {
        fail(`${lang}/${name}: contains legacy icon/card reference`);
      }
      if (!html.includes("/diagrams/control/")) fail(`${lang}/${name}: missing control mockup image`);
      if (!html.includes("/diagrams/training/")) fail(`${lang}/${name}: missing training diagram image`);
    }
  }
}

checkGeneratedCounts();
scanGeneratedSvgText("control", join(root, "src", "assets", "diagrams", "control"));
scanGeneratedSvgText("training", join(root, "src", "assets", "diagrams", "training"));
scanLegacyText();
checkHtmlImages();

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Visual layout checks passed.");
