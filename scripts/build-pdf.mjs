import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const templatePath = join(root, "src", "templates", "pdf_template.html");
const htmlOnly = process.argv.includes("--html-only");
const buildAll = process.argv.includes("--all");
const buildBook = process.argv.includes("--book");
const lang = valueFor("--lang") ?? "ko";
const item = valueFor("--item") ?? "01";

const labels = {
  ko: {
    title: "FANUC ROBODRILL 기초과정",
    header: "FANUC ROBODRILL 기초과정 | Level 1",
    footer: "HTML/CSS 기반 PDF",
    bookName: "fanuc_robodrill_level1_manual_ko"
  },
  vi: {
    title: "Giáo trình cơ bản FANUC ROBODRILL",
    header: "Giáo trình cơ bản FANUC ROBODRILL | Level 1",
    footer: "PDF tạo từ HTML/CSS",
    bookName: "fanuc_robodrill_level1_manual_vi"
  }
};

function valueFor(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function splitTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function toAssetUrl(src, baseDir) {
  if (/^(https?:|file:|data:)/i.test(src)) return src;
  const abs = resolve(baseDir, src);
  return pathToFileURL(abs).href;
}

function inlineMarkdown(text, baseDir) {
  let html = escapeHtml(text);
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
    return `<img src="${toAssetUrl(src, baseDir)}" alt="${escapeHtml(alt)}">`;
  });
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  return html;
}

function markdownToHtml(markdown, baseDir) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const output = [];
  let paragraph = [];
  let listType = null;
  let inCode = false;
  let codeLines = [];

  const closeParagraph = () => {
    if (paragraph.length === 0) return;
    output.push(`<p>${inlineMarkdown(paragraph.join(" "), baseDir)}</p>`);
    paragraph = [];
  };

  const closeList = () => {
    if (!listType) return;
    output.push(`</${listType}>`);
    listType = null;
  };

  const openList = (type) => {
    if (listType === type) return;
    closeList();
    output.push(`<${type}>`);
    listType = type;
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      closeParagraph();
      closeList();
      if (inCode) {
        output.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        codeLines = [];
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    if (!trimmed) {
      closeParagraph();
      closeList();
      continue;
    }

    if (trimmed === "[PAGE_BREAK]") {
      closeParagraph();
      closeList();
      output.push('<div class="page-break"></div>');
      continue;
    }

    if (/^<[^>]+>/.test(trimmed) || /^<\/[^>]+>/.test(trimmed)) {
      closeParagraph();
      closeList();
      output.push(line.replace(/src="([^"]+)"/g, (_, src) => `src="${toAssetUrl(src, baseDir)}"`));
      continue;
    }

    const tableNext = lines[index + 1]?.trim() ?? "";
    if (trimmed.includes("|") && /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(tableNext)) {
      closeParagraph();
      closeList();
      const headers = splitTableRow(trimmed);
      index += 2;
      const rows = [];
      while (index < lines.length && lines[index].trim().includes("|")) {
        rows.push(splitTableRow(lines[index]));
        index += 1;
      }
      index -= 1;

      output.push("<table>");
      output.push(`<thead><tr>${headers.map((cell) => `<th>${inlineMarkdown(cell, baseDir)}</th>`).join("")}</tr></thead>`);
      output.push("<tbody>");
      for (const row of rows) {
        output.push(`<tr>${row.map((cell) => `<td>${inlineMarkdown(cell, baseDir)}</td>`).join("")}</tr>`);
      }
      output.push("</tbody></table>");
      continue;
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(trimmed);
    if (heading) {
      closeParagraph();
      closeList();
      const level = heading[1].length;
      output.push(`<h${level}>${inlineMarkdown(heading[2], baseDir)}</h${level}>`);
      continue;
    }

    const quote = /^>\s?(.+)$/.exec(trimmed);
    if (quote) {
      closeParagraph();
      closeList();
      const klass = /안전|주의|경고|an toàn|Chú ý/i.test(quote[1]) ? "callout warning" : "callout";
      output.push(`<blockquote class="${klass}">${inlineMarkdown(quote[1], baseDir)}</blockquote>`);
      continue;
    }

    const unordered = /^[-*]\s+(.+)$/.exec(trimmed);
    if (unordered) {
      closeParagraph();
      openList("ul");
      output.push(`<li>${inlineMarkdown(unordered[1], baseDir)}</li>`);
      continue;
    }

    const ordered = /^\d+\.\s+(.+)$/.exec(trimmed);
    if (ordered) {
      closeParagraph();
      openList("ol");
      output.push(`<li>${inlineMarkdown(ordered[1], baseDir)}</li>`);
      continue;
    }

    paragraph.push(trimmed);
  }

  closeParagraph();
  closeList();
  return output.join("\n");
}

function fontCss() {
  const fontDir = join(root, "src", "assets", "fonts");
  const regular = join(fontDir, "NotoSansKR-Regular.woff2");
  const medium = join(fontDir, "NotoSansKR-Medium.woff2");
  const bold = join(fontDir, "NotoSansKR-Bold.woff2");

  const face = (weight, path) => `
    @font-face {
      font-family: "ManualKR";
      src: url("${pathToFileURL(path).href}") format("woff2");
      font-weight: ${weight};
      font-style: normal;
      font-display: swap;
    }`;

  const rules = [];
  if (existsSync(regular)) rules.push(face(400, regular));
  if (existsSync(medium)) rules.push(face(500, medium));
  if (existsSync(bold)) rules.push(face(800, bold));

  if (rules.length > 0) return rules.join("\n");

  return `
    @font-face {
      font-family: "ManualKR";
      src: local("Noto Sans KR"), local("Noto Sans"), local("Segoe UI"), local("Malgun Gothic");
      font-weight: 400 800;
      font-style: normal;
      font-display: swap;
    }`;
}

function findBrowser() {
  const envPath = process.env.CHROME_PATH;
  const candidates = [
    envPath,
    join(process.env.ProgramFiles ?? "", "Google", "Chrome", "Application", "chrome.exe"),
    join(process.env["ProgramFiles(x86)"] ?? "", "Google", "Chrome", "Application", "chrome.exe"),
    join(process.env.ProgramFiles ?? "", "Microsoft", "Edge", "Application", "msedge.exe"),
    join(process.env["ProgramFiles(x86)"] ?? "", "Microsoft", "Edge", "Application", "msedge.exe")
  ].filter(Boolean);

  return candidates.find((candidate) => existsSync(candidate));
}

function renderHtml(markdown, sourceDir, outputPath, currentLang, title) {
  const copy = labels[currentLang] ?? labels.ko;
  const template = readFileSync(templatePath, "utf8");
  const content = markdownToHtml(markdown, sourceDir);
  const html = template
    .replaceAll("{{LANG}}", currentLang)
    .replaceAll("{{TITLE}}", title)
    .replace("{{FONT_CSS}}", fontCss())
    .replaceAll("{{HEADER}}", copy.header)
    .replaceAll("{{FOOTER}}", copy.footer)
    .replace("{{CONTENT}}", content)
    .replaceAll("{{DATE}}", new Date().toISOString().slice(0, 10));

  ensureDir(dirname(outputPath));
  writeFileSync(outputPath, html, "utf8");
}

function printPdf(htmlPath, pdfPath) {
  const browser = findBrowser();
  if (!browser) {
    throw new Error("Chrome or Edge was not found. Set CHROME_PATH to the browser executable.");
  }

  ensureDir(dirname(pdfPath));
  const result = spawnSync(browser, [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--no-pdf-header-footer",
    "--print-to-pdf-no-header",
    `--print-to-pdf=${pdfPath}`,
    pathToFileURL(htmlPath).href
  ], {
    cwd: root,
    encoding: "utf8"
  });

  if (result.status !== 0) {
    throw new Error(`PDF generation failed:\n${result.stderr || result.stdout}`);
  }

  if (!existsSync(pdfPath) || statSync(pdfPath).size < 1024) {
    throw new Error(`PDF was not created or is empty: ${pdfPath}`);
  }
}

function contentDir(currentLang) {
  return join(root, "src", "content", currentLang);
}

function contentFiles(currentLang) {
  return readdirSync(contentDir(currentLang))
    .filter((name) => /^level1_item\d{2}\.md$/.test(name))
    .sort();
}

function buildItem(currentLang, itemId) {
  const copy = labels[currentLang] ?? labels.ko;
  const sourceDir = contentDir(currentLang);
  const contentPath = join(sourceDir, `level1_item${itemId}.md`);
  const markdown = readFileSync(contentPath, "utf8");
  const htmlOutputPath = join(root, "output", "html", currentLang, `level1_item${itemId}.html`);
  const pdfOutputPath = join(root, "output", "pdf", currentLang, `level1_item${itemId}.pdf`);
  renderHtml(markdown, sourceDir, htmlOutputPath, currentLang, `${copy.title} - Item ${itemId}`);
  if (!htmlOnly) printPdf(htmlOutputPath, pdfOutputPath);
  console.log(`HTML: ${htmlOutputPath}`);
  if (!htmlOnly) console.log(`PDF: ${pdfOutputPath}`);
}

function buildFullBook(currentLang) {
  const copy = labels[currentLang] ?? labels.ko;
  const sourceDir = contentDir(currentLang);
  const files = contentFiles(currentLang);
  const markdown = files
    .map((name, index) => {
      const content = readFileSync(join(sourceDir, name), "utf8");
      return index === 0 ? content : `[PAGE_BREAK]\n\n${content}`;
    })
    .join("\n\n");
  const htmlOutputPath = join(root, "output", "html", currentLang, `${copy.bookName}.html`);
  const pdfOutputPath = join(root, "output", "pdf", currentLang, `${copy.bookName}.pdf`);
  renderHtml(markdown, sourceDir, htmlOutputPath, currentLang, copy.title);
  if (!htmlOnly) printPdf(htmlOutputPath, pdfOutputPath);
  console.log(`BOOK HTML: ${htmlOutputPath}`);
  if (!htmlOnly) console.log(`BOOK PDF: ${pdfOutputPath}`);
}

function run() {
  if (buildAll) {
    for (const currentLang of ["ko", "vi"]) {
      for (const name of contentFiles(currentLang)) {
        buildItem(currentLang, name.match(/\d{2}/)[0]);
      }
      buildFullBook(currentLang);
    }
    return;
  }

  if (buildBook) {
    buildFullBook(lang);
    return;
  }

  buildItem(lang, item);
}

run();
