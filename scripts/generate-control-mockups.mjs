import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "src", "assets", "diagrams", "control");

const items = [
  {
    id: "01",
    title: "ROBODRILL 구조",
    mode: "SYSTEM",
    status: "READY",
    screenTitle: "SYSTEM STATUS",
    rows: [["AREA", "CHECK POINT", "STATE"], ["PANEL", "CNC / soft keys", "READY"], ["SPINDLE", "tool clamped", "STOP"], ["ATC", "magazine home", "READY"], ["DOOR", "interlock", "CLOSED"]],
    softKeys: ["SYSTEM", "POS", "MSG", "OFFSET", "GRAPH"],
    highlights: ["SYSTEM", "POS", "RESET"],
    callouts: ["패널, 주축, ATC, 작업영역을 같은 화면 흐름으로 연결해 본다.", "처음에는 화면 상태와 실제 장비 위치를 번갈아 확인한다."]
  },
  {
    id: "02",
    title: "전원 ON/OFF",
    mode: "POWER",
    status: "SERVO OFF",
    screenTitle: "POWER UP CHECK",
    rows: [["STEP", "SCREEN / LAMP", "ACTION"], ["1", "CNC BOOT OK", "WAIT"], ["2", "SERVO OFF", "SERVO ON"], ["3", "HOME REQUIRED", "ZRN"], ["4", "READY", "MEM / JOG"]],
    softKeys: ["SYSTEM", "MESSAGE", "POS", "SETTING", "CHECK"],
    highlights: ["POWER", "SERVO ON", "ZRN", "RESET"],
    callouts: ["전원 투입 후 바로 가공하지 않고 Servo ON과 원점복귀 요구를 확인한다.", "전원 차단은 주축 정지, 축 정지, Servo OFF를 확인한 뒤 진행한다."]
  },
  {
    id: "03",
    title: "원점복귀",
    mode: "ZRN",
    status: "HOME REQUIRED",
    screenTitle: "REFERENCE RETURN",
    rows: [["AXIS", "MACHINE POS", "HOME"], ["Z", "----.---", "NOT"], ["X", "----.---", "NOT"], ["Y", "----.---", "NOT"], ["AFTER", "0.000", "HOME OK"]],
    softKeys: ["POS", "MACHINE", "REL", "ALL", "OPRT"],
    highlights: ["ZRN", "+Z", "+X", "+Y", "POS"],
    callouts: ["먼저 Z축을 안전한 위쪽으로 보내고 X/Y 복귀를 진행한다.", "HOME 표시가 바뀌기 전에는 프로그램 실행을 시작하지 않는다."]
  },
  {
    id: "04",
    title: "JOG 이동",
    mode: "JOG",
    status: "FEED 10%",
    screenTitle: "JOG OPERATION",
    rows: [["FIELD", "VALUE", "CHECK"], ["MODE", "JOG", "OK"], ["AXIS", "X SELECTED", "VERIFY"], ["DIRECTION", "+ / -", "SAY BEFORE MOVE"], ["FEED OVR", "10%", "LOW"]],
    softKeys: ["POS", "REL", "HANDLE", "JOG", "OPRT"],
    highlights: ["JOG", "+X", "-X", "+Y", "-Y", "+Z", "-Z", "FEED 10%"],
    callouts: ["축 선택과 방향키를 먼저 말로 확인하고 짧게 누른다.", "화면 좌표 변화와 실제 테이블/주축 움직임을 동시에 본다."]
  },
  {
    id: "05",
    title: "HANDLE 이동",
    mode: "HANDLE",
    status: "x10",
    screenTitle: "HANDLE OPERATION",
    rows: [["FIELD", "VALUE", "CHECK"], ["AXIS", "Z", "SELECTED"], ["MULTIPLY", "x10", "CONFIRM"], ["ONE CLICK", "0.010 mm", "SLOW"], ["DIRECTION", "CW + / CCW -", "VERIFY"]],
    softKeys: ["POS", "REL", "HANDLE", "AXIS", "OPRT"],
    highlights: ["HANDLE", "MPG", "x1", "x10", "x100", "+Z", "-Z"],
    callouts: ["핸들 회전 전 축과 배율을 크게 읽고 한 클릭씩 접근한다.", "시계/반시계 방향의 실제 이동 방향은 장비 축 표기와 함께 확인한다."]
  },
  {
    id: "06",
    title: "좌표계 이해",
    mode: "POS",
    status: "G54 ACTIVE",
    screenTitle: "POSITION DISPLAY",
    rows: [["COORD", "X", "Y", "Z"], ["MACHINE", "-320.450", "-120.000", "-85.230"], ["WORK G54", "0.000", "0.000", "50.000"], ["RELATIVE", "0.000", "0.000", "0.000"], ["DIST TO GO", "0.000", "0.000", "0.000"]],
    softKeys: ["ABS", "REL", "MACHINE", "DIST", "OPRT"],
    highlights: ["POS", "ABS", "REL", "MACHINE", "G54"],
    callouts: ["기계좌표와 작업좌표를 같은 숫자로 착각하지 않는다.", "값을 입력하기 전 현재 선택된 좌표계 이름을 먼저 읽는다."]
  },
  {
    id: "07",
    title: "MDI 사용법",
    mode: "MDI",
    status: "EDIT LINE",
    screenTitle: "MDI INPUT",
    rows: [["LINE", "COMMAND", "CHECK"], ["N001", "G91 G28 Z0.", "RETURN Z"], ["N002", "M03 S1000", "SPINDLE"], ["N003", "M05", "STOP"], ["RUN", "CYCLE START", "AFTER CONFIRM"]],
    softKeys: ["MDI", "INSERT", "ALTER", "DELETE", "INPUT"],
    highlights: ["MDI", "INPUT", "CYCLE START", "FEED HOLD", "RESET"],
    callouts: ["짧은 명령도 실제 장비 움직임으로 이어지므로 실행 전 한 줄씩 읽는다.", "좌표계, 주축 회전, 공구 위치를 확인한 뒤 Cycle Start를 누른다."]
  },
  {
    id: "08",
    title: "프로그램 호출",
    mode: "MEM",
    status: "PROGRAM SELECT",
    screenTitle: "PROGRAM DIRECTORY",
    rows: [["NO", "PROGRAM", "NOTE"], [">", "O0002 TESTCUT", "SELECTED"], [" ", "O0003 DRILL", "STANDBY"], [" ", "O0100 SETUP", "CHECK"], ["ACTIVE", "O0002", "MEM READY"]],
    softKeys: ["DIR", "SEARCH", "O-SRCH", "SELECT", "OPRT"],
    highlights: ["MEM", "PROG", "O-SRCH", "SELECT", "CYCLE START"],
    callouts: ["선택 줄의 O번호와 실제 실행할 작업지시서의 번호를 대조한다.", "호출 후 첫 공구, 첫 좌표, 안전 시작줄을 확인한다."]
  },
  {
    id: "09",
    title: "공구교환",
    mode: "MDI",
    status: "ATC READY",
    screenTitle: "TOOL CHANGE CHECK",
    rows: [["FIELD", "VALUE", "CHECK"], ["COMMAND", "T05 M06", "READ"], ["SPINDLE TOOL", "T01", "CURRENT"], ["MAGAZINE", "T05 READY", "TARGET"], ["ATC AREA", "CLEAR", "VERIFY"]],
    softKeys: ["OFFSET", "TOOL", "MDI", "ATC", "OPRT"],
    highlights: ["MDI", "T", "M06", "CYCLE START", "FEED HOLD"],
    callouts: ["T번호와 실제 매거진 위치를 확인하고 ATC 동작 범위 안에 손을 넣지 않는다.", "교환 후 주축 공구번호와 화면 표시를 다시 읽는다."]
  },
  {
    id: "10",
    title: "Tool Offset",
    mode: "OFFSET",
    status: "TOOL GEOM",
    screenTitle: "TOOL OFFSET",
    rows: [["NO", "H LENGTH", "WEAR"], ["01", "125.430", "0.000"], ["02", "118.220", "-0.010"], ["03", "132.000", "0.000"], ["INPUT", "+ / INPUT", "CONFIRM"]],
    softKeys: ["OFFSET", "GEOM", "WEAR", "NO.SRH", "INPUT"],
    highlights: ["OFFSET", "GEOM", "WEAR", "INPUT", "RESET"],
    callouts: ["공구번호와 H번호가 일치하는지 먼저 확인한다.", "마모 보정은 작은 값으로 넣고 입력 후 다시 읽는다."]
  },
  {
    id: "11",
    title: "Work Offset",
    mode: "OFFSET",
    status: "G54",
    screenTitle: "WORK OFFSET",
    rows: [["COORD", "X", "Y", "Z"], ["G54", "0.000", "0.000", "-12.350"], ["G55", "----", "----", "----"], ["MEASURE", "Z FACE", "SET"], ["CHECK", "G54 ACTIVE", "YES"]],
    softKeys: ["OFFSET", "WORK", "G54", "MEASUR", "INPUT"],
    highlights: ["OFFSET", "WORK", "G54", "MEASUR", "INPUT"],
    callouts: ["소재 기준면을 정한 뒤 G54의 X/Y/Z 값을 따로 확인한다.", "G54가 활성인지 확인하지 않고 가공을 시작하지 않는다."]
  },
  {
    id: "12",
    title: "프로그램 기본 구조",
    mode: "EDIT",
    status: "PROGRAM",
    screenTitle: "PROGRAM EDIT",
    rows: [["BLOCK", "CODE", "MEANING"], ["O0002", "PROGRAM NO", "ID"], ["G90 G54 G17", "SAFETY", "MODE"], ["T01 M06", "TOOL CHANGE", "TOOL"], ["G00 X0. Y0.", "RAPID MOVE", "POSITION"]],
    softKeys: ["PROG", "EDIT", "SEARCH", "INSERT", "DELETE"],
    highlights: ["EDIT", "PROG", "SEARCH", "RESET"],
    callouts: ["프로그램은 줄 단위로 읽고 첫 이동 위치를 반드시 확인한다.", "안전 시작줄의 G90/G54/G17 같은 모드 코드를 설명할 수 있어야 한다."]
  },
  {
    id: "13",
    title: "드라이런과 싱글블록",
    mode: "MEM",
    status: "DRY RUN",
    screenTitle: "RUN CHECK",
    rows: [["SWITCH", "STATE", "PURPOSE"], ["DRY RUN", "ON", "NO CUT"], ["SINGLE BLOCK", "ON", "ONE LINE"], ["FEED OVR", "10%", "SLOW"], ["BLOCK", "N120", "CURRENT"]],
    softKeys: ["CHECK", "GRAPH", "SINGLE", "DRYRUN", "OPRT"],
    highlights: ["DRY RUN", "SINGLE BLOCK", "FEED 10%", "CYCLE START", "FEED HOLD"],
    callouts: ["첫 실행 전 Dry Run과 Single Block을 켜고 낮은 override로 시작한다.", "한 블록 실행 후 공구 위치와 다음 줄을 동시에 본다."]
  },
  {
    id: "14",
    title: "절삭유와 칩 관리",
    mode: "JOG",
    status: "COOLANT",
    screenTitle: "COOLANT CHECK",
    rows: [["ITEM", "STATE", "CHECK"], ["COOLANT", "ON", "FLOW"], ["NOZZLE", "TOOL TIP", "AIM"], ["CHIP", "CLEAR", "REMOVE"], ["DOOR", "CLOSED", "INTERLOCK"]],
    softKeys: ["JOG", "COOLNT", "CHIP", "CHECK", "OPRT"],
    highlights: ["COOLANT", "JOG", "FEED HOLD", "RESET"],
    callouts: ["노즐은 공구 끝을 향해야 하고 칩은 가공 전 제거한다.", "절삭유 확인은 문 닫힘과 주축 정지 상태에서 안전하게 한다."]
  },
  {
    id: "15",
    title: "소재 고정과 바이스",
    mode: "SETUP",
    status: "CLAMP CHECK",
    screenTitle: "SETUP CHECKLIST",
    rows: [["ITEM", "STATE", "ACTION"], ["VISE", "CLAMPED", "TORQUE"], ["WORK", "SEATED", "NO GAP"], ["PARALLEL", "OK", "CHECK"], ["CLEARANCE", "OK", "DRY RUN"]],
    softKeys: ["SETUP", "JOG", "POS", "CHECK", "OPRT"],
    highlights: ["JOG", "HANDLE", "FEED 10%", "RESET"],
    callouts: ["소재가 기준면에 밀착됐는지 확인하고 바이스 체결 상태를 기록한다.", "공구 간섭은 실제 이동 전에 Dry Run으로 확인한다."]
  },
  {
    id: "16",
    title: "공구 상태 점검",
    mode: "OFFSET",
    status: "TOOL CHECK",
    screenTitle: "TOOL STATUS",
    rows: [["TOOL", "LIFE", "CHECK"], ["T01", "80%", "OK"], ["T02", "15%", "REVIEW"], ["T03", "BROKEN?", "STOP"], ["HOLDER", "CLEAN", "OK"]],
    softKeys: ["TOOL", "LIFE", "OFFSET", "WEAR", "OPRT"],
    highlights: ["TOOL", "OFFSET", "WEAR", "RESET"],
    callouts: ["공구 마모, 파손, 홀더 오염은 화면 수명 표시와 실제 날끝 관찰을 함께 본다.", "의심 공구는 임의 사용하지 않고 교체 또는 보고한다."]
  },
  {
    id: "17",
    title: "알람 확인과 기본 대응",
    mode: "ALARM",
    status: "STOP",
    screenTitle: "ALARM MESSAGE",
    rows: [["NO", "MESSAGE", "ACTION"], ["1004", "DOOR OPEN", "CHECK DOOR"], ["300", "AXIS NOT READY", "CHECK SERVO"], ["RESET", "AFTER CAUSE", "ONLY AFTER CHECK"], ["LOG", "TIME / STATE", "WRITE"]],
    softKeys: ["MESSAGE", "ALARM", "HISTORY", "RESET?", "OPRT"],
    highlights: ["ALARM", "MESSAGE", "RESET", "FEED HOLD"],
    callouts: ["Reset을 누르기 전에 알람 번호, 메시지, 발생 조건을 기록한다.", "원인이 남아 있으면 알람 삭제보다 정지와 보고가 우선이다."]
  },
  {
    id: "18",
    title: "품질 확인 기초",
    mode: "CHECK",
    status: "FIRST PIECE",
    screenTitle: "FIRST PIECE CHECK",
    rows: [["ITEM", "NOMINAL", "RESULT"], ["X SIZE", "25.000", "OK/NG"], ["Y SIZE", "40.000", "OK/NG"], ["BURR", "NONE", "CHECK"], ["SURFACE", "GOOD", "CHECK"]],
    softKeys: ["CHECK", "MEASURE", "OFFSET", "LOG", "OPRT"],
    highlights: ["OFFSET", "WEAR", "LOG", "RESET"],
    callouts: ["첫 제품은 치수, 버, 표면 상태를 보고 필요하면 보정값 변경을 검토한다.", "측정 결과가 기록되기 전에는 연속 가공으로 넘어가지 않는다."]
  },
  {
    id: "19",
    title: "작업 기록지 작성",
    mode: "LOG",
    status: "RECORD",
    screenTitle: "WORK RECORD",
    rows: [["FIELD", "VALUE", "SOURCE"], ["PROGRAM", "O0002", "SCREEN"], ["TOOL", "T01/T02", "OFFSET"], ["WORK OFFSET", "G54", "OFFSET"], ["ALARM / MEAS.", "WRITE", "LOG"]],
    softKeys: ["PROG", "OFFSET", "ALARM", "LOG", "SAVE"],
    highlights: ["PROG", "OFFSET", "MESSAGE", "SAVE"],
    callouts: ["기록지는 기억이 아니라 다음 작업자가 조건을 재현할 수 있게 하는 증거이다.", "프로그램, 공구, 좌표, 알람, 측정 결과를 같은 기준으로 남긴다."]
  },
  {
    id: "20",
    title: "첫 가공 실습",
    mode: "MEM",
    status: "FIRST CUT",
    screenTitle: "FIRST MACHINING FLOW",
    rows: [["STEP", "SCREEN", "ACTION"], ["1", "SETUP OK", "CHECK"], ["2", "DRY RUN OK", "SINGLE BLOCK"], ["3", "CYCLE START", "CUT"], ["4", "MEASURE", "LOG"]],
    softKeys: ["POS", "PROG", "OFFSET", "GRAPH", "CHECK"],
    highlights: ["MEM", "DRY RUN", "SINGLE BLOCK", "CYCLE START", "FEED HOLD", "RESET"],
    callouts: ["첫 가공은 준비, Dry Run, 절삭, 측정, 기록을 끊어서 진행한다.", "정상 확인 전에는 연속 운전으로 넘어가지 않는다."]
  }
];

const panelButtons = [
  { id: "EDIT", x: 680, y: 198, w: 70, h: 34 },
  { id: "MEM", x: 760, y: 198, w: 70, h: 34 },
  { id: "MDI", x: 840, y: 198, w: 70, h: 34 },
  { id: "JOG", x: 680, y: 242, w: 70, h: 34 },
  { id: "HANDLE", x: 760, y: 242, w: 70, h: 34 },
  { id: "ZRN", x: 840, y: 242, w: 70, h: 34 },
  { id: "+X", x: 704, y: 336, w: 54, h: 34 },
  { id: "-X", x: 704, y: 422, w: 54, h: 34 },
  { id: "+Y", x: 762, y: 378, w: 54, h: 34 },
  { id: "-Y", x: 646, y: 378, w: 54, h: 34 },
  { id: "+Z", x: 842, y: 336, w: 54, h: 34 },
  { id: "-Z", x: 842, y: 422, w: 54, h: 34 },
  { id: "CYCLE START", x: 680, y: 520, w: 108, h: 46 },
  { id: "FEED HOLD", x: 804, y: 520, w: 108, h: 46 },
  { id: "RESET", x: 930, y: 198, w: 84, h: 34 },
  { id: "INPUT", x: 930, y: 242, w: 84, h: 34 },
  { id: "PROG", x: 930, y: 286, w: 84, h: 34 },
  { id: "POS", x: 930, y: 330, w: 84, h: 34 },
  { id: "OFFSET", x: 930, y: 374, w: 84, h: 34 },
  { id: "MESSAGE", x: 930, y: 418, w: 84, h: 34 },
  { id: "SYSTEM", x: 930, y: 462, w: 84, h: 34 },
  { id: "COOLANT", x: 930, y: 506, w: 84, h: 34 }
];

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function t(x, y, value, size = 20, weight = 600, fill = "#0f2433") {
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
  const normalized = String(value).replaceAll("/", " / ").replace(/\s+/g, " ").trim();
  const words = normalized.split(" ");
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

function textBlock(x, y, value, maxWidth, size = 16, weight = 700, fill = "#163247", lineHeight = 19) {
  const lines = wrapText(value, size, maxWidth);
  return `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}">
${lines.map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${esc(line)}</tspan>`).join("\n")}
</text>`;
}

function rect(x, y, w, h, fill, stroke = "#9fb0c2", r = 6, sw = 2) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
}

function screenRows(rows) {
  const colX = [88, 228, 404];
  return rows.map((row, index) => {
    const y = 178 + index * 46;
    const fill = index === 0 ? "#dcecff" : index % 2 === 0 ? "#ffffff" : "#f4f8fb";
    return `${rect(72, y - 30, 520, 40, fill, "#9fb0c2", 0, 1)}
${t(colX[0], y - 4, row[0] ?? "", index === 0 ? 17 : 18, index === 0 ? 800 : 600, "#102d3d")}
${t(colX[1], y - 4, row[1] ?? "", index === 0 ? 17 : 18, index === 0 ? 800 : 600, "#102d3d")}
${textBlock(colX[2], y - 4, row[2] ?? "", 172, index === 0 ? 17 : 17, index === 0 ? 800 : 600, "#102d3d", 17)}`;
  }).join("\n");
}

function softKeyRow(keys) {
  return keys.map((key, index) => {
    const x = 74 + index * 104;
    return `${rect(x, 512, 94, 40, "#eef6ff", "#8cb6d7", 5, 2)}
${t(x + 14, 538, key, 15, 800, "#0d4e67")}`;
  }).join("\n");
}

function controlScreen(item) {
  return `<g>
${rect(46, 80, 590, 500, "#263847", "#0f1d28", 18, 5)}
${rect(70, 116, 542, 390, "#eff7fb", "#0f1d28", 6, 3)}
${rect(70, 116, 542, 42, "#0d4e67", "#0d4e67", 6, 0)}
${t(88, 144, item.screenTitle, 20, 800, "#ffffff")}
${t(350, 144, `MODE ${item.mode}`, 16, 800, "#ffffff")}
${rect(488, 124, 112, 24, item.status.includes("STOP") || item.status.includes("OFF") ? "#fff3d8" : "#dff7e8", "none", 4, 0)}
${t(498, 143, item.status, item.status.length > 11 ? 11 : 13, 800, item.status.includes("STOP") || item.status.includes("OFF") ? "#9b2525" : "#17613c")}
${screenRows(item.rows)}
${softKeyRow(item.softKeys)}
${t(72, 612, "화면 읽기 순서", 18, 800, "#0d4e67")}
${t(72, 642, "1. 모드  2. 현재 선택값  3. 실행 조건  4. 하단 소프트키", 17, 700, "#334155")}
</g>`;
}

function isHighlighted(item, id) {
  return item.highlights.some((value) => value.toUpperCase() === id.toUpperCase());
}

function button(item, spec) {
  const highlight = isHighlighted(item, spec.id);
  const fill = highlight ? "#fff3d8" : "#f8fafc";
  const stroke = highlight ? "#d6901f" : "#94a3b8";
  const labelColor = highlight ? "#9b2525" : "#223344";
    return `${rect(spec.x, spec.y, spec.w, spec.h, fill, stroke, 6, highlight ? 4 : 2)}
${t(spec.x + 8, spec.y + 23, spec.id, spec.id.length > 9 ? 11 : 14, 800, labelColor)}`;
}

function overrideDial(label, x, y, active) {
  return `<g>
<circle cx="${x}" cy="${y}" r="34" fill="${active ? "#fff3d8" : "#f1f5f9"}" stroke="${active ? "#d6901f" : "#94a3b8"}" stroke-width="${active ? 4 : 2}"/>
<line x1="${x}" y1="${y}" x2="${x + 24}" y2="${y - 22}" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
${t(x - 34, y + 54, label, 13, 800, "#0d4e67")}
</g>`;
}

function mpg(item) {
  const active = isHighlighted(item, "MPG") || isHighlighted(item, "x10") || isHighlighted(item, "x1") || isHighlighted(item, "x100");
  return `<g>
<circle cx="812" cy="650" r="44" fill="${active ? "#fff3d8" : "#e2e8f0"}" stroke="${active ? "#d6901f" : "#64748b"}" stroke-width="${active ? 4 : 3}"/>
<circle cx="812" cy="650" r="15" fill="#ffffff" stroke="#64748b" stroke-width="3"/>
<path d="M812 598 A52 52 0 0 1 861 650" fill="none" stroke="#25a55f" stroke-width="7" marker-end="url(#arrow-green)"/>
<path d="M812 702 A52 52 0 0 1 763 650" fill="none" stroke="#d64242" stroke-width="7" marker-end="url(#arrow-red)"/>
${t(877, 646, "+", 20, 800, "#17613c")}
${t(736, 680, "-", 20, 800, "#9b2525")}
${t(764, 724, "MPG HANDLE", 15, 800, "#0d4e67")}
</g>`;
}

function panel(item) {
  return `<g>
${t(676, 88, "조작 패널 mockup", 22, 800, "#0d4e67")}
${rect(660, 112, 390, 628, "#e8edf3", "#8da0b6", 18, 4)}
${t(684, 152, "MODE SELECT", 16, 800, "#334155")}
${panelButtons.map((spec) => button(item, spec)).join("\n")}
${t(684, 318, "AXIS / DIRECTION", 16, 800, "#334155")}
${overrideDial("FEED OVR", 958, 584, isHighlighted(item, "FEED 10%") || item.status.includes("FEED"))}
${mpg(item)}
<circle cx="990" cy="696" r="32" fill="#d64242" stroke="#9b2525" stroke-width="5"/>
${t(964, 701, "E-STOP", 13, 800, "#ffffff")}
</g>`;
}

function callouts(item) {
  return item.callouts.map((line, index) => {
    const y = 676 + index * 42;
    return `${rect(46, y - 24, 590, 38, "#eef8f3", "#9bc7af", 6, 1)}
${textBlock(64, y - 4, line, 540, 15, 700, "#163247", 17)}`;
  }).join("\n");
}

function svg(item) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1120" height="780" viewBox="0 0 1120 780" role="img" aria-labelledby="title desc">
<title id="title">${esc(item.title)} CNC 화면 및 조작 패널 mockup</title>
<desc id="desc">${esc(item.title)} 수업에서 화면의 어느 값을 읽고 패널의 어느 버튼을 확인해야 하는지 보여 주는 교육용 mockup</desc>
<defs>
  <marker id="arrow-red" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M2,2 L10,6 L2,10 Z" fill="#d64242"/></marker>
  <marker id="arrow-green" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M2,2 L10,6 L2,10 Z" fill="#25a55f"/></marker>
</defs>
<rect width="1120" height="780" fill="#ffffff"/>
${rect(24, 24, 1072, 732, "#ffffff", "#d8dde6", 20, 3)}
${t(48, 58, `Item ${item.id}. ${item.title} - CNC 화면/패널 학습 mockup`, 27, 800, "#0d4e67")}
${controlScreen(item)}
${panel(item)}
${callouts(item)}
</svg>
`;
}

mkdirSync(outDir, { recursive: true });
for (const item of items) {
  writeFileSync(join(outDir, `level1_item${item.id}_control.svg`), svg(item), "utf8");
}

console.log(`Generated ${items.length} CNC control mockups in ${outDir}`);
