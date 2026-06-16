import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "src", "assets", "diagrams", "training");

const diagrams = [
  {
    id: "01",
    title: "ROBODRILL 구조와 작업자 관찰 위치",
    screen: ["SYSTEM STATUS", "MODE: EDIT / MEM", "SPINDLE: STOP", "ATC: READY"],
    steps: ["CNC 화면 상태 확인", "주축과 공구 위치 확인", "ATC 동작 범위 확인", "작업 영역 문 닫힘 확인"],
    machine: "structure"
  },
  {
    id: "02",
    title: "전원 ON/OFF, Servo ON, Home Return 흐름",
    screen: ["POWER ON", "CNC BOOT OK", "SERVO OFF -> ON", "HOME RETURN REQUIRED"],
    steps: ["메인 전원 ON", "CNC 부팅 완료 확인", "Servo ON", "Home Return", "가공 종료 후 Servo OFF"],
    machine: "power"
  },
  {
    id: "03",
    title: "원점복귀 축 순서와 안전 위치",
    screen: ["HOME RETURN", "Z: NOT HOME", "X: NOT HOME", "Y: NOT HOME"],
    steps: ["Z축을 먼저 위로 복귀", "X/Y축 복귀", "기계좌표 0 확인", "원점 표시등 확인"],
    machine: "home"
  },
  {
    id: "04",
    title: "JOG 이동 축 선택과 방향 확인",
    screen: ["JOG MODE", "AXIS: X", "FEED: 10%", "DISTANCE: CONT."],
    steps: ["JOG 모드 선택", "축 선택 X/Y/Z", "방향 키 확인", "짧게 누르고 실제 이동 확인"],
    machine: "axis"
  },
  {
    id: "05",
    title: "HANDLE 배율과 핸들 회전 방향",
    screen: ["HANDLE MODE", "AXIS: Z", "MULTIPLY: x10", "MOVE: +0.010 mm/click"],
    steps: ["축 선택", "배율 x1/x10/x100 선택", "시계방향 + 이동", "반시계방향 - 이동", "한 클릭씩 접근"],
    machine: "handle"
  },
  {
    id: "06",
    title: "기계좌표, 작업좌표, 상대좌표 비교",
    screen: ["POSITION", "MACHINE X Y Z", "WORK G54 X Y Z", "RELATIVE X Y Z"],
    steps: ["기계좌표는 장비 기준", "G54는 소재 기준", "상대좌표는 임시 확인용", "값 입력 전 좌표계 이름 확인"],
    machine: "coordinate"
  },
  {
    id: "07",
    title: "MDI 화면 입력과 실행 전 확인",
    screen: ["MDI", "N001 G91 G28 Z0.", "N002 M03 S1000", "CYCLE START? NO"],
    steps: ["MDI 모드 선택", "한 줄 명령 입력", "좌표/회전/공구 확인", "Dry Run 또는 낮은 override로 실행"],
    machine: "mdi"
  },
  {
    id: "08",
    title: "프로그램 호출 화면과 실행 전 점검",
    screen: ["PROGRAM LIST", "> O0002 TESTCUT", "O0003 DRILL", "MEM READY"],
    steps: ["프로그램 번호 확인", "선택된 O번호 읽기", "첫 줄과 공구번호 확인", "Cycle Start 전 Dry Run"],
    machine: "program"
  },
  {
    id: "09",
    title: "공구교환 T 코드와 ATC 동작 범위",
    screen: ["TOOL CHANGE", "COMMAND: T05 M06", "SPINDLE TOOL: T01", "MAGAZINE: T05 READY"],
    steps: ["현재 주축 공구 확인", "호출할 T번호 확인", "ATC 회전 범위 확인", "교환 후 공구번호 확인"],
    machine: "toolchange"
  },
  {
    id: "10",
    title: "Tool Offset 화면과 길이/마모 입력",
    screen: ["TOOL OFFSET", "NO  H-LENGTH  WEAR", "01  125.430  0.000", "02  118.220 -0.010"],
    steps: ["공구번호와 H번호 일치 확인", "길이 보정값 입력", "마모 보정은 작은 값으로 조정", "입력 후 다시 읽기"],
    machine: "tooloffset"
  },
  {
    id: "11",
    title: "Work Offset G54 소재 기준점 설정",
    screen: ["WORK OFFSET", "G54 X 0.000", "G54 Y 0.000", "G54 Z -12.350"],
    steps: ["소재 기준면 선택", "X/Y 기준 잡기", "Z 기준면 터치", "G54 값 저장 후 재확인"],
    machine: "workoffset"
  },
  {
    id: "12",
    title: "프로그램 블록 구조와 안전 시작줄",
    screen: ["O0002", "G90 G54 G17 G40 G49", "T01 M06", "G00 X0. Y0."],
    steps: ["O번호 확인", "안전 시작줄 읽기", "공구 호출 확인", "첫 이동 위치 확인"],
    machine: "programblock"
  },
  {
    id: "13",
    title: "Dry Run, Single Block, Override 관계",
    screen: ["DRY RUN: ON", "SINGLE BLOCK: ON", "FEED OVR: 10%", "BLOCK: N120"],
    steps: ["Dry Run 켜기", "Single Block 켜기", "Override 낮추기", "한 블록 실행 후 관찰"],
    machine: "dryrun"
  },
  {
    id: "14",
    title: "절삭유 방향과 칩 배출 확인",
    screen: ["COOLANT: ON", "FLOW: OK", "CHIP AREA: CHECK", "DOOR: CLOSED"],
    steps: ["노즐 방향을 공구 끝에 맞춤", "절삭유 흐름 확인", "칩 쌓임 확인", "문 닫힘 후 운전"],
    machine: "coolant"
  },
  {
    id: "15",
    title: "바이스 고정, 기준면, 간섭 확인",
    screen: ["SETUP CHECK", "VISE: CLAMPED", "WORK: SEATED", "CLEARANCE: OK"],
    steps: ["평행대와 기준면 확인", "소재 안착 확인", "바이스 체결", "공구 간섭 거리 확인"],
    machine: "vise"
  },
  {
    id: "16",
    title: "공구 마모, 파손, 장착 상태 점검",
    screen: ["TOOL CHECK", "T01 LENGTH OK", "WEAR LIMIT 0.05", "HOLDER CLEAN"],
    steps: ["날끝 마모 확인", "칩핑/파손 확인", "홀더 오염 제거", "장착 방향 확인"],
    machine: "toolcheck"
  },
  {
    id: "17",
    title: "Alarm 화면 읽기와 기본 대응",
    screen: ["ALARM", "1004 DOOR OPEN", "AXIS NOT READY", "RESET AFTER CHECK"],
    steps: ["알람 번호 기록", "메시지 그대로 읽기", "발생 조건 기록", "원인 확인 후 Reset"],
    machine: "alarm"
  },
  {
    id: "18",
    title: "첫 제품 품질 확인 위치",
    screen: ["FIRST PIECE CHECK", "X SIZE: OK/NG", "BURR: CHECK", "SURFACE: CHECK"],
    steps: ["기준 치수 측정", "버와 모서리 확인", "표면 상태 확인", "결과 기록 후 다음 제품"],
    machine: "quality"
  },
  {
    id: "19",
    title: "작업 기록지에 남길 핵심 항목",
    screen: ["WORK LOG", "PROGRAM O0002", "TOOL T01/T02", "OFFSET G54 / H01"],
    steps: ["장비와 날짜 기록", "프로그램 번호 기록", "공구/오프셋 기록", "알람과 측정 결과 기록"],
    machine: "record"
  },
  {
    id: "20",
    title: "첫 가공 실습 전체 흐름",
    screen: ["FIRST CUT", "SETUP OK", "DRY RUN OK", "CUT -> MEASURE -> LOG"],
    steps: ["안전 점검", "좌표와 공구 확인", "Dry Run", "첫 절삭", "측정과 기록"],
    machine: "firstcut"
  }
];

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function text(x, y, value, size = 22, weight = 600, fill = "#163247") {
  return `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}">${esc(value)}</text>`;
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

function wrapText(value, size, maxWidth) {
  const words = String(value).replaceAll("->", " -> ").replace(/\s+/g, " ").trim().split(" ");
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (estimateWidth(next, size) <= maxWidth || !current) {
      current = next;
    } else {
      lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines.length > 0 ? lines : [""];
}

function textBlock(x, y, value, maxWidth, size = 18, weight = 700, fill = "#163247", lineHeight = 19) {
  const lines = wrapText(value, size, maxWidth);
  return `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}">
${lines.map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${esc(line)}</tspan>`).join("\n")}
</text>`;
}

function screen(lines) {
  const rows = lines.map((line, index) => {
    const y = 172 + index * 42;
    const fill = index === 0 ? "#d9f1ff" : "#ffffff";
    return `<rect x="72" y="${y - 26}" width="330" height="34" rx="4" fill="${fill}" stroke="#7ea6bd"/>
${text(90, y, line, index === 0 ? 20 : 18, index === 0 ? 800 : 500, "#102d3d")}`;
  }).join("\n");

  return `<g>
<rect x="48" y="84" width="378" height="298" rx="18" fill="#263847" stroke="#0f1d28" stroke-width="5"/>
<rect x="70" y="124" width="334" height="220" rx="6" fill="#eff7fb" stroke="#111827" stroke-width="3"/>
<circle cx="105" cy="368" r="9" fill="#25a55f"/>
<circle cx="142" cy="368" r="9" fill="#e6a319"/>
<circle cx="179" cy="368" r="9" fill="#d64242"/>
${text(72, 104, "CNC 화면 예시", 20, 800, "#ffffff")}
${rows}
</g>`;
}

function stepsBlock(steps) {
  return steps.map((step, index) => {
    const x = index % 2 === 0 ? 54 : 470;
    const y = 522 + Math.floor(index / 2) * 68;
    return `<rect x="${x}" y="${y}" width="376" height="52" rx="10" fill="#eef3f8" stroke="#b8c4d2"/>
<circle cx="${x + 28}" cy="${y + 24}" r="15" fill="#176f8f"/>
${text(x + 23, y + 31, index + 1, 18, 800, "#ffffff")}
${textBlock(x + 56, y + 25, step, 292, 16, 700, "#163247", 17)}`;
  }).join("\n");
}

function machineDrawing(kind) {
  const base = `<g transform="translate(500 94)">
${text(0, 10, "동작/구조 설명", 20, 800, "#0d4e67")}
<rect x="0" y="58" width="350" height="230" rx="16" fill="#f8fafc" stroke="#b8c4d2" stroke-width="3"/>`;
  const end = "</g>";

  const arrows = {
    x: `<line x1="96" y1="190" x2="248" y2="190" stroke="#d64242" stroke-width="5" marker-end="url(#arrow-red)"/><line x1="248" y1="214" x2="96" y2="214" stroke="#d64242" stroke-width="5" marker-end="url(#arrow-red)"/>${text(126, 178, "X축 + / -", 18, 800, "#9b2525")}`,
    y: `<line x1="284" y1="220" x2="284" y2="102" stroke="#176f8f" stroke-width="5" marker-end="url(#arrow-blue)"/><line x1="306" y1="102" x2="306" y2="220" stroke="#176f8f" stroke-width="5" marker-end="url(#arrow-blue)"/>${text(256, 94, "Y축", 18, 800, "#0d4e67")}`,
    z: `<line x1="74" y1="232" x2="74" y2="96" stroke="#25a55f" stroke-width="5" marker-end="url(#arrow-green)"/>${text(88, 112, "Z축 UP", 17, 800, "#17613c")}`
  };

  if (kind === "axis" || kind === "home" || kind === "coordinate") {
    return `${base}
<rect x="126" y="128" width="104" height="78" fill="#f2c14e" stroke="#7a5a0a" stroke-width="4"/>
<rect x="152" y="82" width="54" height="50" fill="#cbd5e1" stroke="#64748b" stroke-width="3"/>
${arrows.x}${arrows.y}${kind === "home" ? arrows.z : ""}
${textBlock(88, 262, kind === "coordinate" ? "G54 소재 원점" : "축 방향을 말로 확인", 214, 17, 800, "#163247", 18)}
${kind === "coordinate" ? `<circle cx="126" cy="206" r="8" fill="#111827"/>${text(140, 212, "X0 Y0", 16, 800, "#111827")}` : ""}
${end}`;
  }

  if (kind === "handle") {
    return `${base}
<circle cx="174" cy="158" r="62" fill="#e2e8f0" stroke="#475569" stroke-width="4"/>
<circle cx="174" cy="158" r="16" fill="#ffffff" stroke="#475569" stroke-width="3"/>
<path d="M174 88 A70 70 0 0 1 242 158" fill="none" stroke="#25a55f" stroke-width="6" marker-end="url(#arrow-green)"/>
<path d="M174 228 A70 70 0 0 1 106 158" fill="none" stroke="#d64242" stroke-width="6" marker-end="url(#arrow-red)"/>
${text(230, 118, "+ 방향", 18, 800, "#17613c")}
${text(54, 220, "- 방향", 18, 800, "#9b2525")}
<rect x="42" y="260" width="80" height="30" rx="6" fill="#fff3d8" stroke="#d6901f"/>${text(58, 282, "x1", 18, 800)}
<rect x="134" y="260" width="80" height="30" rx="6" fill="#fff3d8" stroke="#d6901f"/>${text(146, 282, "x10", 18, 800)}
<rect x="226" y="260" width="80" height="30" rx="6" fill="#fff3d8" stroke="#d6901f"/>${text(235, 282, "x100", 18, 800)}
${end}`;
  }

  if (["mdi", "program", "programblock", "dryrun"].includes(kind)) {
    return `${base}
<rect x="36" y="86" width="278" height="158" rx="8" fill="#111827" stroke="#334155" stroke-width="4"/>
${text(58, 124, kind === "mdi" ? "MDI 입력 줄" : kind === "program" ? "O번호 선택" : kind === "dryrun" ? "한 블록 실행" : "블록별 의미", 22, 800, "#d9f1ff")}
${text(58, 164, kind === "programblock" ? "G90 G54 G17" : kind === "dryrun" ? "SINGLE BLOCK ON" : "실행 전 다시 읽기", 20, 700, "#ffffff")}
${text(58, 204, "Cycle Start 전 확인", 20, 700, "#f2c14e")}
<rect x="62" y="262" width="94" height="34" rx="8" fill="#25a55f"/>${text(82, 286, "START", 17, 800, "#ffffff")}
<rect x="174" y="262" width="94" height="34" rx="8" fill="#d64242"/>${text(199, 286, "STOP", 17, 800, "#ffffff")}
${end}`;
  }

  if (["toolchange", "tooloffset", "workoffset", "toolcheck"].includes(kind)) {
    return `${base}
<circle cx="84" cy="130" r="44" fill="#cbd5e1" stroke="#475569" stroke-width="4"/>
<rect x="74" y="72" width="20" height="86" fill="#64748b"/>
<circle cx="244" cy="160" r="72" fill="#eef3f8" stroke="#64748b" stroke-width="4"/>
${[0,1,2,3,4,5].map((n)=>`<circle cx="${244+52*Math.cos(n*Math.PI/3)}" cy="${160+52*Math.sin(n*Math.PI/3)}" r="14" fill="#f2c14e" stroke="#7a5a0a"/>`).join("")}
<line x1="132" y1="138" x2="178" y2="154" stroke="#176f8f" stroke-width="7" marker-end="url(#arrow-blue)"/>
${text(56, 234, kind === "tooloffset" ? "H값 / Wear 값 확인" : kind === "workoffset" ? "G54 기준점 저장" : kind === "toolcheck" ? "날끝 상태 확대 확인" : "T번호와 실제 공구 대조", 20, 800, "#163247")}
${end}`;
  }

  if (kind === "power") {
    return `${base}
<rect x="46" y="102" width="76" height="48" rx="8" fill="#eef3f8" stroke="#8da0b6" stroke-width="3"/>
${text(64, 132, "Power", 16, 800, "#0d4e67")}
<line x1="128" y1="126" x2="170" y2="126" stroke="#176f8f" stroke-width="5" marker-end="url(#arrow-blue)"/>
<rect x="176" y="102" width="76" height="48" rx="8" fill="#eef8f3" stroke="#9bc7af" stroke-width="3"/>
${text(194, 132, "Servo", 16, 800, "#17613c")}
<line x1="258" y1="126" x2="300" y2="126" stroke="#176f8f" stroke-width="5" marker-end="url(#arrow-blue)"/>
<rect x="306" y="102" width="36" height="48" rx="8" fill="#fff3d8" stroke="#d6901f" stroke-width="3"/>
${text(312, 132, "ZRN", 14, 800, "#9b2525")}
<rect x="72" y="190" width="202" height="54" rx="8" fill="#e2e8f0" stroke="#64748b" stroke-width="4"/>
<rect x="116" y="212" width="114" height="42" fill="#f2c14e" stroke="#7a5a0a" stroke-width="4"/>
${textBlock(54, 282, "전원 ON 후 Servo ON과 Home Return 요구를 순서대로 확인", 284, 17, 800, "#163247", 18)}
${end}`;
  }

  if (["coolant", "vise", "quality", "record", "firstcut", "structure", "alarm"].includes(kind)) {
    const label = {
      coolant: "노즐은 공구 끝을 향하게",
      vise: "기준면 밀착 / 바이스 체결",
      quality: "첫 제품 측정 위치 기록",
      record: "프로그램, 공구, 좌표 기록",
      firstcut: "점검 -> Dry Run -> 절삭 -> 측정",
      power: "전원 ON 후 Servo/Home 확인",
      structure: "패널, 주축, ATC, 작업영역",
      alarm: "알람 번호와 조건 먼저 기록"
    }[kind];
    return `${base}
<rect x="72" y="94" width="202" height="138" rx="8" fill="#e2e8f0" stroke="#64748b" stroke-width="4"/>
<rect x="116" y="132" width="114" height="74" fill="#f2c14e" stroke="#7a5a0a" stroke-width="4"/>
${kind === "coolant" ? `<path d="M62 96 C100 104 126 120 150 150" fill="none" stroke="#176f8f" stroke-width="6" marker-end="url(#arrow-blue)"/>` : ""}
${kind === "alarm" ? `<rect x="52" y="78" width="246" height="68" rx="8" fill="#fff3d8" stroke="#d6901f" stroke-width="4"/>${text(78, 122, "ALARM 1004", 24, 800, "#9b2525")}` : ""}
${kind === "vise" ? `<rect x="52" y="218" width="246" height="28" fill="#475569"/><line x1="70" y1="100" x2="114" y2="130" stroke="#d64242" stroke-width="5" marker-end="url(#arrow-red)"/>` : ""}
${kind === "quality" ? `<line x1="52" y1="92" x2="280" y2="232" stroke="#475569" stroke-width="6"/><line x1="280" y1="92" x2="52" y2="232" stroke="#475569" stroke-width="6"/>` : ""}
${textBlock(42, 270, label, 286, 17, 800, "#163247", 18)}
${end}`;
  }

  return `${base}${text(54, 180, "기능 도해", 28, 800)}${end}`;
}

function svg(diagram) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="720" viewBox="0 0 1000 720" role="img" aria-labelledby="title desc">
<title id="title">${esc(diagram.title)}</title>
<desc id="desc">초보자가 CNC 화면, 조작 순서, 장비 움직임을 함께 이해하도록 만든 교육용 도해</desc>
<defs>
  <marker id="arrow-blue" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M1.5,1.5 L8,4.5 L1.5,7.5 Z" fill="#176f8f"/></marker>
  <marker id="arrow-red" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M1.5,1.5 L8,4.5 L1.5,7.5 Z" fill="#d64242"/></marker>
  <marker id="arrow-green" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M1.5,1.5 L8,4.5 L1.5,7.5 Z" fill="#25a55f"/></marker>
</defs>
<rect width="1000" height="720" fill="#ffffff"/>
<rect x="24" y="24" width="952" height="672" rx="20" fill="#ffffff" stroke="#d8dde6" stroke-width="3"/>
${text(52, 58, diagram.title, 28, 800, "#0d4e67")}
${screen(diagram.screen)}
${machineDrawing(diagram.machine)}
${text(54, 492, "학습 순서", 22, 800, "#0d4e67")}
${stepsBlock(diagram.steps)}
</svg>
`;
}

mkdirSync(outDir, { recursive: true });
for (const diagram of diagrams) {
  writeFileSync(join(outDir, `level1_item${diagram.id}_study.svg`), svg(diagram), "utf8");
}

console.log(`Generated ${diagrams.length} training diagrams in ${outDir}`);
