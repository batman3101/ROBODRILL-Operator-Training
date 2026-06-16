import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const items = [
  { id: "01", ko: "ROBODRILL 구조", vi: "Cấu trúc ROBODRILL", focusKo: "장비 본체, 작업 영역, 주축, ATC, CNC 패널의 역할을 구분한다.", focusVi: "Phân biệt thân máy, vùng làm việc, trục chính, ATC và bảng điều khiển CNC.", image: "fanuc_robodrill_real_wikimedia.jpg" },
  { id: "02", ko: "전원 ON/OFF", vi: "Bật và tắt nguồn", focusKo: "전원 투입 전 점검, CNC 부팅, Servo ON, 안전한 전원 차단 순서를 익힌다.", focusVi: "Thực hành kiểm tra trước khi bật nguồn, khởi động CNC, Servo ON và tắt nguồn an toàn.", image: "fanuc_robodrill_official_panel.webp" },
  { id: "03", ko: "원점복귀", vi: "Về điểm gốc máy", focusKo: "기준점 복귀가 필요한 이유와 축별 복귀 순서를 이해한다.", focusVi: "Hiểu lý do cần về điểm gốc và thứ tự đưa từng trục về chuẩn.", image: "training_flow.svg", asset: "diagrams" },
  { id: "04", ko: "JOG 이동", vi: "Di chuyển JOG", focusKo: "JOG 모드에서 축 선택, 방향 확인, 이송 속도 제한을 습관화한다.", focusVi: "Tạo thói quen chọn trục, xác nhận hướng và giới hạn tốc độ khi dùng JOG.", image: "axis_coordinate.svg", asset: "diagrams" },
  { id: "05", ko: "HANDLE 이동", vi: "Di chuyển bằng tay quay HANDLE", focusKo: "핸들 배율과 미세 접근 절차를 익혀 충돌 위험을 낮춘다.", focusVi: "Nắm cách chọn hệ số tay quay và tiếp cận tinh để giảm nguy cơ va chạm.", image: "axis_coordinate.svg", asset: "diagrams" },
  { id: "06", ko: "좌표계 이해", vi: "Hiểu hệ tọa độ", focusKo: "기계좌표, 작업좌표, 상대좌표, 공구 보정 좌표의 차이를 이해한다.", focusVi: "Phân biệt tọa độ máy, tọa độ làm việc, tọa độ tương đối và tọa độ bù dao.", image: "axis_coordinate.svg", asset: "diagrams" },
  { id: "07", ko: "MDI 사용법", vi: "Cách dùng MDI", focusKo: "짧은 명령을 직접 입력할 때의 확인 절차와 실행 위험을 이해한다.", focusVi: "Hiểu quy trình kiểm tra và rủi ro khi nhập lệnh ngắn trực tiếp bằng MDI.", image: "fanuc_robodrill_official_panel.webp" },
  { id: "08", ko: "프로그램 호출", vi: "Gọi chương trình", focusKo: "프로그램 번호 확인, 호출, 실행 전 점검 절차를 익힌다.", focusVi: "Thực hành xác nhận số chương trình, gọi chương trình và kiểm tra trước chạy.", image: "fanuc_robodrill_official_panel.webp" },
  { id: "09", ko: "공구교환", vi: "Thay dao", focusKo: "ATC 동작 범위, T 코드, 주축 공구와 매거진 공구 확인을 익힌다.", focusVi: "Hiểu vùng hoạt động ATC, mã T, kiểm tra dao trên trục chính và dao trong ổ dao.", image: "fanuc_robodrill_official_tool_changer.webp" },
  { id: "10", ko: "Tool Offset", vi: "Bù dao Tool Offset", focusKo: "공구 길이 보정과 마모 보정의 목적, 입력 전 확인 절차를 이해한다.", focusVi: "Hiểu mục đích bù chiều dài dao, bù mòn dao và kiểm tra trước khi nhập giá trị.", image: "fanuc_robodrill_official_tool_changer.webp" },
  { id: "11", ko: "Work Offset", vi: "Bù gốc Work Offset", focusKo: "G54 등 작업 좌표계와 소재 기준점 설정 절차를 익힌다.", focusVi: "Thực hành hệ tọa độ làm việc như G54 và quy trình đặt gốc phôi.", image: "axis_coordinate.svg", asset: "diagrams" },
  { id: "12", ko: "프로그램 기본 구조", vi: "Cấu trúc chương trình cơ bản", focusKo: "블록, G 코드, M 코드, 주석, 안전 시작줄을 읽는 법을 익힌다.", focusVi: "Đọc được block, mã G, mã M, chú thích và dòng khởi động an toàn.", image: "training_flow.svg", asset: "diagrams" },
  { id: "13", ko: "드라이런과 싱글블록", vi: "Dry run và Single Block", focusKo: "첫 실행 전 드라이런, 싱글블록, 오버라이드 확인 절차를 익힌다.", focusVi: "Thực hành dry run, single block và kiểm tra override trước lần chạy đầu.", image: "training_flow.svg", asset: "diagrams" },
  { id: "14", ko: "절삭유와 칩 관리", vi: "Quản lý dung dịch cắt và phoi", focusKo: "절삭유 방향, 잔량, 칩 배출 상태가 안전과 품질에 미치는 영향을 이해한다.", focusVi: "Hiểu ảnh hưởng của hướng tưới nguội, mức dung dịch và thoát phoi đến an toàn và chất lượng.", image: "fanuc_robodrill_real_wikimedia.jpg" },
  { id: "15", ko: "소재 고정과 바이스", vi: "Kẹp phôi và ê tô", focusKo: "기준면, 클램프, 바이스 체결, 간섭 확인 절차를 익힌다.", focusVi: "Thực hành kiểm tra mặt chuẩn, kẹp, ê tô và vùng có thể va chạm.", image: "fanuc_robodrill_real_wikimedia.jpg" },
  { id: "16", ko: "공구 상태 점검", vi: "Kiểm tra tình trạng dao", focusKo: "공구 마모, 파손, 홀더 오염, 장착 상태를 관찰한다.", focusVi: "Quan sát mòn dao, mẻ dao, bẩn holder và tình trạng gá lắp.", image: "fanuc_robodrill_official_tool_changer.webp" },
  { id: "17", ko: "알람 확인과 기본 대응", vi: "Kiểm tra alarm và xử lý cơ bản", focusKo: "알람 번호를 기록하고 임의 재시작 전에 원인 확인과 보고를 수행한다.", focusVi: "Ghi lại mã alarm, kiểm tra nguyên nhân và báo cáo trước khi khởi động lại.", image: "fanuc_robodrill_official_panel.webp" },
  { id: "18", ko: "품질 확인 기초", vi: "Cơ bản kiểm tra chất lượng", focusKo: "첫 제품 치수, 버, 표면 상태, 기록 기준을 이해한다.", focusVi: "Hiểu cách kiểm tra kích thước sản phẩm đầu, ba via, bề mặt và tiêu chuẩn ghi nhận.", image: "fanuc_robodrill_real_wikimedia.jpg" },
  { id: "19", ko: "작업 기록지 작성", vi: "Ghi phiếu công việc", focusKo: "작업 조건, 공구, 좌표, 알람, 측정 결과를 추적 가능하게 기록한다.", focusVi: "Ghi điều kiện gia công, dao, tọa độ, alarm và kết quả đo để truy xuất được.", image: "training_flow.svg", asset: "diagrams" },
  { id: "20", ko: "첫 가공 실습", vi: "Thực hành gia công đầu tiên", focusKo: "안전 점검부터 드라이런, 첫 절삭, 품질 확인, 기록까지 통합 수행한다.", focusVi: "Thực hiện tổng hợp từ kiểm tra an toàn, dry run, cắt lần đầu, kiểm tra chất lượng đến ghi nhận.", image: "fanuc_robodrill_real_wikimedia.jpg" }
];

const ko = {
  lang: "ko",
  course: "FANUC ROBODRILL 기초과정",
  target: "ROBODRILL을 처음 다루는 작업자, 품질 담당자, 설비 담당자",
  format: "교육 목표, 안전사항, 실제 이미지, 절차, 실습, 시험 문제",
  sourceNote: "웹 실사 및 공식 참고 이미지는 src/assets/images/ATTRIBUTION.md의 출처 기준을 따른다.",
  figureSource: "출처와 사용권은 이미지 출처 문서에 기록한다.",
  labels: {
    target: "대상",
    goal: "목표",
    format: "형식",
    objectives: "교육 목표",
    safety: "안전사항",
    image: "실제 이미지와 관찰 포인트",
    concept: "핵심 개념",
    procedure: "단계별 절차",
    checklist: "현장 체크리스트",
    practice: "실습",
    mistakes: "흔한 실수와 예방",
    problems: "시험 문제",
    answers: "정답과 지도자 메모",
    next: "다음 항목 연결"
  }
};

const vi = {
  lang: "vi",
  course: "Giáo trình cơ bản FANUC ROBODRILL",
  target: "Người vận hành mới, nhân viên chất lượng và nhân viên bảo trì thiết bị",
  format: "Mục tiêu, an toàn, hình ảnh thực tế, quy trình, thực hành, câu hỏi kiểm tra",
  sourceNote: "Hình ảnh thực tế và hình ảnh tham khảo chính thức tuân theo phần nguồn trong src/assets/images/ATTRIBUTION.md.",
  figureSource: "Nguồn và quyền sử dụng được ghi trong tài liệu nguồn hình ảnh.",
  labels: {
    target: "Đối tượng",
    goal: "Mục tiêu",
    format: "Hình thức",
    objectives: "Mục tiêu đào tạo",
    safety: "An toàn",
    image: "Hình ảnh thực tế và điểm quan sát",
    concept: "Khái niệm cốt lõi",
    procedure: "Quy trình từng bước",
    checklist: "Checklist tại hiện trường",
    practice: "Thực hành",
    mistakes: "Lỗi thường gặp và phòng tránh",
    problems: "Câu hỏi kiểm tra",
    answers: "Đáp án và ghi chú cho giảng viên",
    next: "Liên kết với mục tiếp theo"
  }
};

function assetPath(item) {
  const folder = item.asset ?? "images";
  return `../../assets/${folder}/${item.image}`;
}

function studyDiagramPath(item) {
  return `../../assets/diagrams/training/level1_item${item.id}_study.svg`;
}

function koStudyFigure(item, title) {
  return `![${title} 기능 학습 도해](${studyDiagramPath(item)})

<p class="caption">그림 ${Number(item.id)}-2. ${title}의 CNC 화면 예시, 조작 순서, 실제 움직임을 함께 보는 학습용 도해.</p>

도해는 장식용 그림이 아니라 실습 전에 읽어야 하는 작업 지도이다. 왼쪽의 CNC 화면 예시에서 모드, 선택된 축, 프로그램 번호, 오프셋 값 같은 문자를 먼저 읽고, 오른쪽의 동작 그림에서 실제로 움직일 장치와 방향을 확인한다. 아래 학습 순서는 지도자에게 말로 보고한 뒤 한 단계씩 수행한다.`;
}

function viStudyFigure(item, title) {
  return `![Sơ đồ học chức năng ${title}](${studyDiagramPath(item)})

<p class="caption">Hình ${Number(item.id)}-2. Sơ đồ học cho ${title}, gồm ví dụ màn hình CNC, thứ tự thao tác và chuyển động thật.</p>

Sơ đồ này không phải hình trang trí. Trước khi thực hành, học viên đọc màn hình CNC ở bên trái để biết mode, trục, số chương trình hoặc giá trị offset, sau đó nhìn phần chuyển động bên phải để hiểu cơ cấu nào sẽ di chuyển. Các bước bên dưới được dùng để báo cáo miệng với giảng viên rồi mới thao tác từng bước.`;
}

function cover(locale, item) {
  const title = locale.lang === "ko" ? item.ko : item.vi;
  const focus = locale.lang === "ko" ? item.focusKo : item.focusVi;
  return `<section class="cover">
<div>
<div class="cover-mark"></div>
<h1>${locale.course}</h1>
<p class="subtitle">Level 1 - Item ${item.id}<br>${title}</p>
</div>
<div class="cover-meta">
<strong>${locale.labels.target}</strong><span>${locale.target}</span>
<strong>${locale.labels.goal}</strong><span>${focus}</span>
<strong>${locale.labels.format}</strong><span>${locale.format}</span>
</div>
</section>`;
}

function koBody(item, index) {
  const next = items[index + 1];
  const title = item.ko;
  const nextTitle = next ? `${next.id} ${next.ko}` : "Level 1 종합 복습";
  return `${cover(ko, item)}

[PAGE_BREAK]

# ${item.id}. ${title}

이 항목은 ${title}을 초보자가 안전하게 이해하고 현장에서 설명할 수 있도록 만든 수업 단위이다. ${item.focusKo} 조작자는 버튼 이름을 외우는 것보다 현재 장비 상태, 다음 동작, 위험 위치를 먼저 확인해야 한다. 모든 절차는 확인, 선택, 실행, 관찰, 기록의 순서로 진행한다.

> 안전 주의: 실제 장비 조작은 반드시 현장 안전 규정, 제조사 매뉴얼, 사내 작업표준서, 지도자의 지시에 따른다. 확신이 없으면 멈추고 상태를 보고한다.

## ${ko.labels.objectives}

- ${item.focusKo}
- 관련 버튼, 화면 표시, 장비 반응을 말로 설명한다.
- 조작 전 안전 확인 항목을 체크리스트로 점검한다.
- 정상 상태와 이상 상태를 구분해 지도자에게 보고한다.
- 실습 결과를 작업 기록지에 남긴다.

| 구분 | 학습자가 해야 할 행동 | 통과 기준 |
| --- | --- | --- |
| 이해 | ${title}의 목적을 설명한다 | 핵심 용어 3개 이상을 사용한다 |
| 확인 | 조작 전 위험 요소를 찾는다 | 작업 영역, 화면, 오버라이드를 확인한다 |
| 실행 | 지도자 감독하에 단계별로 수행한다 | 빠른 조작 없이 멈춤과 확인을 반복한다 |
| 기록 | 결과와 이상 여부를 적는다 | 날짜, 장비 상태, 확인자를 남긴다 |

[PAGE_BREAK]

## ${ko.labels.safety}

${title}에서 가장 위험한 순간은 작업자가 장비 상태를 확인하지 않고 다음 동작을 실행할 때이다. 특히 주축, 축 이동, 공구 교환, 좌표 입력, 프로그램 실행은 화면 조작이 실제 기계 움직임으로 연결된다. 초보자는 화면의 숫자와 실제 공구 위치를 항상 함께 보아야 한다.

이 항목의 학습 도해를 먼저 읽고, 화면에서 어떤 상태를 확인해야 하는지와 실제 장비에서 어느 부분이 움직일 수 있는지를 연결해 설명한다. 그림을 읽지 못하면 조작을 시작하지 않는다.

| 위험 상황 | 발생 원인 | 예방 행동 |
| --- | --- | --- |
| 예상과 다른 축 이동 | 축 선택, 방향, 좌표계를 혼동함 | 움직일 축과 방향을 말로 확인한다 |
| 충돌 | 공구, 소재, 지그 간격을 보지 않음 | 낮은 속도와 짧은 이동으로 접근한다 |
| 재시작 오류 | 알람 원인을 확인하지 않음 | 알람 번호와 발생 조건을 기록한다 |
| 품질 불량 | 보정값이나 기준면을 놓침 | 작업 전 기록과 화면 값을 대조한다 |

> 안전 주의: 비상정지는 마지막 방어 수단이다. 비상정지를 누를 상황을 만들기 전에 오버라이드를 낮추고, 의심되면 정지한 뒤 확인한다.

[PAGE_BREAK]

## ${ko.labels.image}

![${title} 참고 이미지](${assetPath(item)})

<p class="caption">그림 ${Number(item.id)}-1. ${title} 교육용 참고 이미지. ${ko.figureSource}</p>

이미지를 볼 때는 장비 전체를 한 번에 보려 하지 말고 작업자에게 영향을 주는 위치부터 확인한다. 첫째, 손과 몸이 들어갈 수 있는 위험 구간을 찾는다. 둘째, 버튼 또는 화면 조작이 어떤 장치의 움직임으로 이어지는지 연결한다. 셋째, 이상이 생겼을 때 즉시 멈출 수 있는 위치를 확인한다.

${koStudyFigure(item, title)}

## ${ko.labels.concept}

${title}의 핵심은 절차 자체보다 절차가 필요한 이유를 이해하는 것이다. ROBODRILL은 작고 빠른 장비이므로 작은 확인 누락도 빠른 충돌이나 품질 문제로 이어질 수 있다. 따라서 초급 과정에서는 정확한 가공 조건보다 안전한 관찰 습관을 먼저 고정한다.

위 기능 도해에서 화면 예시, 움직임 방향, 학습 순서를 각각 손으로 짚으며 설명한다. 특히 숫자나 모드 표시는 실제 장비 화면의 같은 위치에서 다시 확인해야 한다.

| 핵심 용어 | 의미 | 현장 확인 |
| --- | --- | --- |
| 상태 확인 | 장비가 어떤 모드와 조건인지 읽는 것 | 화면, 램프, 알람, 오버라이드 |
| 실행 조건 | 기계가 움직일 수 있는 준비 상태 | 도어, Servo, 좌표, 공구 |
| 관찰 거리 | 공구와 소재 사이의 여유 | 가까울수록 속도와 이동량을 낮춘다 |
| 기록 | 다음 작업자가 이해할 수 있는 증거 | 수치, 알람, 조치, 확인자 |

[PAGE_BREAK]

## ${ko.labels.procedure}

다음 절차는 교육용 기본 흐름이다. 실제 현장 절차가 있으면 현장 절차를 우선한다.

절차를 시작하기 전에는 기능 도해의 순서를 한 번 읽고, 실제 패널이나 화면에서 같은 이름의 버튼과 표시를 찾는다. 이름이 다르거나 화면 상태가 다르면 지도자에게 먼저 확인한다.

1. 작업 전 주변 정리, 보호구, 비상정지 위치를 확인한다.
2. CNC 화면에서 현재 모드, 알람, 프로그램 상태를 읽는다.
3. 작업 영역 안쪽의 공구, 소재, 지그, 칩 상태를 확인한다.
4. ${title}에 필요한 버튼이나 화면 메뉴를 찾고 이름을 말한다.
5. 오버라이드와 이동 조건을 낮은 위험 상태로 설정한다.
6. 지도자에게 수행할 동작을 한 문장으로 보고한다.
7. 짧게 실행하고 즉시 멈춰 실제 장비 반응을 관찰한다.
8. 이상이 없을 때만 다음 단계로 진행한다.

<div class="callout practice">
실습: 지도자가 지정한 교육 위치에서 ${title} 절차를 소리 내어 설명한 뒤, 실제 조작은 한 단계씩 멈추며 수행한다. 각 단계 후 화면 상태와 실제 장비 상태를 함께 말한다.
</div>

[PAGE_BREAK]

## ${ko.labels.checklist}

체크리스트는 기능 도해의 화면, 장치, 이동 방향을 실제 장비에서 다시 확인하는 과정이다. 체크가 끝난 뒤에도 실제 움직임이 예상과 다르면 즉시 정지한다.

| 점검 항목 | 정상 기준 | 이상 시 조치 |
| --- | --- | --- |
| 주변 상태 | 통로, 바닥, 작업대가 정리되어 있다 | 정리 후 다시 시작 |
| 화면 상태 | 알람과 비정상 메시지가 없다 | 알람 번호 기록 후 보고 |
| 장비 내부 | 공구, 지그, 소재가 간섭 없이 고정되어 있다 | 고정 상태 재확인 |
| 오버라이드 | 초급 실습에 맞게 낮게 설정되어 있다 | 지도자 지시에 따라 조정 |
| 기록지 | 작업자, 날짜, 장비 번호가 적혀 있다 | 누락 항목 작성 |

체크리스트는 서류 작업이 아니라 사고를 줄이는 장치이다. 체크가 끝난 뒤에도 실제 움직임이 예상과 다르면 즉시 정지한다.

[PAGE_BREAK]

## ${ko.labels.practice}

실습은 도해를 보고 설명하는 단계와 실제 장비에서 한 단계씩 조작하는 단계를 분리한다. 학습자는 먼저 그림을 보며 순서를 말하고, 지도자가 확인한 뒤에만 조작한다.

### 실습 A: 상태 읽기

1. 화면에서 현재 모드와 알람 상태를 읽는다.
2. 작업 영역에서 가장 가까운 위험 위치를 찾는다.
3. ${title} 수행 전에 확인할 항목 5가지를 말한다.
4. 지도자에게 현재 상태를 보고한다.

### 실습 B: 절차 수행

1. 지도자가 지정한 안전 조건에서 첫 단계를 수행한다.
2. 동작 후 화면 숫자와 실제 움직임을 비교한다.
3. 예상과 다르면 즉시 멈추고 원인을 말한다.
4. 정상이라면 다음 단계로 이동한다.

### 실습 C: 기록

실습 결과, 이상 여부, 질문 사항을 기록한다. 기록은 다음 작업자와 지도자가 같은 상황을 이해할 수 있을 정도로 구체적으로 작성한다.

[PAGE_BREAK]

## ${ko.labels.mistakes}

| 흔한 실수 | 왜 위험한가 | 예방 질문 |
| --- | --- | --- |
| 버튼을 먼저 누름 | 화면 상태를 놓친다 | 지금 모드는 무엇인가 |
| 방향을 추측함 | 반대 방향 이동이 생긴다 | 어느 축이 어느 방향으로 움직이는가 |
| 알람을 지움 | 원인이 남은 채 재시작한다 | 알람 번호를 기록했는가 |
| 기록을 생략함 | 다음 작업자가 조건을 알 수 없다 | 누가 봐도 재현 가능한가 |

초보자에게 가장 중요한 능력은 빠른 조작이 아니라 안전하게 멈추고 설명하는 능력이다. 이상 소음, 예상과 다른 움직임, 화면 알람, 절삭유 이상, 공구 흔들림을 보면 즉시 멈추고 보고한다.

[PAGE_BREAK]

## ${ko.labels.problems}

### 객관식

1. ${title} 조작 전 가장 먼저 확인할 내용으로 알맞은 것은?
   - A. 작업 속도를 최대로 올린다
   - B. 현재 모드, 알람, 작업 영역 상태를 확인한다
   - C. 프로그램을 즉시 실행한다
   - D. 기록지를 나중에 작성한다

2. 예상과 다른 움직임이 보일 때의 첫 행동은?
   - A. 계속 실행한다
   - B. 즉시 멈추고 상태를 확인한다
   - C. 알람만 삭제한다
   - D. 오버라이드를 올린다

### 단답형

1. ${title} 수행 전 확인할 항목 5가지를 쓰시오.
2. 오버라이드를 낮게 시작해야 하는 이유를 설명하시오.
3. 이상 상황 보고에 포함해야 할 정보를 3가지 쓰시오.

[PAGE_BREAK]

## ${ko.labels.answers}

객관식 정답은 1번 B, 2번 B이다. 단답형은 주변 상태, 화면 알람, 현재 모드, 작업 영역, 공구 상태, 소재 고정, 오버라이드, 기록지 중 현장에 맞는 내용을 포함하면 된다.

지도자는 학습자가 절차를 외웠는지만 보지 말고, 각 단계에서 왜 멈추고 확인해야 하는지 설명할 수 있는지 확인한다. 특히 ${title}은 다음 항목과 연결되므로, 실습 후 반드시 질문과 기록을 남긴다.

## ${ko.labels.next}

다음 학습 항목은 ${nextTitle}이다. 이번 항목에서 익힌 상태 확인, 안전 정지, 기록 습관은 다음 항목에서도 그대로 사용한다.
`;
}

function viBody(item, index) {
  const next = items[index + 1];
  const title = item.vi;
  const nextTitle = next ? `${next.id} ${next.vi}` : "Ôn tập tổng hợp Level 1";
  return `${cover(vi, item)}

[PAGE_BREAK]

# ${item.id}. ${title}

Mục này giúp học viên mới hiểu và giải thích an toàn nội dung ${title}. ${item.focusVi} Người vận hành không chỉ học tên nút mà phải đọc trạng thái máy, dự đoán hành động tiếp theo và nhận biết vị trí nguy hiểm trước khi thao tác. Mọi thao tác được thực hiện theo thứ tự kiểm tra, chọn, thực hiện, quan sát và ghi lại.

> Chú ý an toàn: Khi thao tác trên máy thật, luôn tuân thủ quy định an toàn tại xưởng, tài liệu của nhà sản xuất, tiêu chuẩn công việc nội bộ và hướng dẫn của giảng viên. Nếu chưa chắc chắn, hãy dừng lại và báo cáo trạng thái.

## ${vi.labels.objectives}

- ${item.focusVi}
- Giải thích được nút liên quan, thông tin trên màn hình và phản ứng của máy.
- Kiểm tra các hạng mục an toàn trước thao tác bằng checklist.
- Phân biệt trạng thái bình thường và bất thường để báo cáo cho giảng viên.
- Ghi lại kết quả thực hành vào phiếu công việc.

| Nhóm | Hành động học viên cần làm | Tiêu chuẩn đạt |
| --- | --- | --- |
| Hiểu | Giải thích mục đích của ${title} | Dùng ít nhất 3 thuật ngữ chính |
| Kiểm tra | Tìm yếu tố nguy hiểm trước thao tác | Kiểm tra vùng làm việc, màn hình và override |
| Thực hiện | Làm từng bước dưới sự giám sát | Không thao tác nhanh, luôn dừng để xác nhận |
| Ghi nhận | Ghi kết quả và bất thường | Có ngày, trạng thái máy và người xác nhận |

[PAGE_BREAK]

## ${vi.labels.safety}

Thời điểm nguy hiểm nhất trong ${title} là khi người vận hành chạy bước tiếp theo mà chưa đọc trạng thái máy. Trục chính, chuyển động trục, thay dao, nhập tọa độ và chạy chương trình đều có thể biến thao tác trên màn hình thành chuyển động thật. Học viên phải nhìn đồng thời số trên màn hình và vị trí dao thật.

Trước khi thao tác, học viên đọc sơ đồ học của bài này và liên hệ giữa trạng thái trên màn hình với bộ phận có thể chuyển động trên máy thật. Nếu chưa giải thích được sơ đồ, không bắt đầu thao tác.

| Tình huống nguy hiểm | Nguyên nhân | Cách phòng tránh |
| --- | --- | --- |
| Trục đi sai hướng | Nhầm trục, hướng hoặc hệ tọa độ | Nói rõ trục và hướng trước khi chạy |
| Va chạm | Không nhìn khoảng cách dao, phôi, đồ gá | Tiếp cận bằng tốc độ thấp và bước ngắn |
| Khởi động lại sai | Không kiểm tra nguyên nhân alarm | Ghi mã alarm và điều kiện phát sinh |
| Lỗi chất lượng | Bỏ sót giá trị bù hoặc mặt chuẩn | Đối chiếu phiếu ghi và màn hình |

> Chú ý an toàn: Emergency stop là lớp bảo vệ cuối cùng. Trước khi cần dùng nó, hãy giảm override, dừng lại và xác nhận khi có nghi ngờ.

[PAGE_BREAK]

## ${vi.labels.image}

![Hình tham khảo ${title}](${assetPath(item)})

<p class="caption">Hình ${Number(item.id)}-1. Hình tham khảo cho bài ${title}. ${vi.figureSource}</p>

Khi quan sát hình, không nên nhìn toàn bộ máy một cách chung chung. Hãy bắt đầu từ vị trí ảnh hưởng trực tiếp đến người vận hành. Thứ nhất, tìm vùng nguy hiểm nơi tay hoặc cơ thể có thể đi vào. Thứ hai, liên hệ nút hoặc màn hình với cơ cấu sẽ chuyển động. Thứ ba, xác định vị trí có thể dừng máy ngay khi có bất thường.

${viStudyFigure(item, title)}

## ${vi.labels.concept}

Điểm cốt lõi của ${title} không chỉ là nhớ quy trình, mà là hiểu vì sao quy trình đó tồn tại. ROBODRILL là máy nhỏ và nhanh, nên một lần bỏ sót kiểm tra cũng có thể dẫn tới va chạm hoặc lỗi chất lượng. Vì vậy ở cấp cơ bản, thói quen quan sát an toàn quan trọng hơn tốc độ thao tác.

Học viên chỉ vào sơ đồ chức năng để giải thích ví dụ màn hình, hướng chuyển động và thứ tự học. Các số, mode hoặc tên nút trên sơ đồ phải được kiểm tra lại trên màn hình máy thật.

| Thuật ngữ | Ý nghĩa | Kiểm tra tại hiện trường |
| --- | --- | --- |
| Kiểm tra trạng thái | Đọc máy đang ở mode và điều kiện nào | Màn hình, đèn, alarm, override |
| Điều kiện chạy | Trạng thái máy có thể chuyển động | Cửa, Servo, tọa độ, dao |
| Khoảng cách quan sát | Khoảng hở giữa dao và phôi | Càng gần càng giảm tốc độ và lượng di chuyển |
| Ghi nhận | Bằng chứng để người sau hiểu | Giá trị, alarm, xử lý, người xác nhận |

[PAGE_BREAK]

## ${vi.labels.procedure}

Quy trình sau là luồng đào tạo cơ bản. Nếu xưởng có quy trình riêng, phải ưu tiên quy trình của xưởng.

Trước khi bắt đầu quy trình, học viên đọc thứ tự trên sơ đồ và tìm cùng tên nút hoặc hiển thị trên bảng điều khiển thật. Nếu tên hoặc trạng thái màn hình khác, phải hỏi giảng viên trước.

1. Kiểm tra khu vực xung quanh, bảo hộ và vị trí emergency stop.
2. Đọc mode hiện tại, alarm và trạng thái chương trình trên màn hình CNC.
3. Kiểm tra dao, phôi, đồ gá và phoi trong vùng làm việc.
4. Tìm nút hoặc menu cần dùng cho ${title} và nói tên của nó.
5. Đặt override và điều kiện chuyển động ở mức rủi ro thấp.
6. Báo cáo cho giảng viên bằng một câu về thao tác sắp làm.
7. Chạy một bước ngắn rồi dừng để quan sát phản ứng thật của máy.
8. Chỉ chuyển sang bước tiếp theo khi không có bất thường.

<div class="callout practice">
Thực hành: Tại vị trí đào tạo do giảng viên chỉ định, học viên nói to quy trình ${title}, sau đó thực hiện từng bước và dừng lại sau mỗi bước. Sau mỗi bước, học viên mô tả trạng thái màn hình và trạng thái máy thật.
</div>

[PAGE_BREAK]

## ${vi.labels.checklist}

Checklist là quá trình đối chiếu lại màn hình, cơ cấu và hướng chuyển động trong sơ đồ với máy thật. Dù checklist đã xong, nếu chuyển động thật khác dự đoán thì phải dừng ngay.

| Hạng mục kiểm tra | Tiêu chuẩn bình thường | Xử lý khi bất thường |
| --- | --- | --- |
| Khu vực xung quanh | Lối đi, sàn và bàn thao tác gọn gàng | Dọn lại rồi bắt đầu |
| Màn hình | Không có alarm hoặc thông báo bất thường | Ghi mã alarm và báo cáo |
| Bên trong máy | Dao, đồ gá, phôi cố định và không va chạm | Kiểm tra lại gá đặt |
| Override | Đặt thấp phù hợp cho thực hành cơ bản | Điều chỉnh theo giảng viên |
| Phiếu ghi | Có người thao tác, ngày và số máy | Bổ sung mục thiếu |

Checklist không phải là giấy tờ hình thức. Nó là công cụ giảm tai nạn. Dù đã checklist xong, nếu chuyển động thật khác dự đoán thì phải dừng ngay.

[PAGE_BREAK]

## ${vi.labels.practice}

Phần thực hành tách thành hai bước: giải thích theo sơ đồ trước, sau đó thao tác từng bước trên máy thật. Học viên chỉ thao tác sau khi giảng viên xác nhận phần giải thích.

### Thực hành A: Đọc trạng thái

1. Đọc mode hiện tại và trạng thái alarm trên màn hình.
2. Tìm vị trí nguy hiểm gần nhất trong vùng làm việc.
3. Nói 5 hạng mục cần kiểm tra trước ${title}.
4. Báo cáo trạng thái hiện tại cho giảng viên.

### Thực hành B: Thực hiện quy trình

1. Thực hiện bước đầu tiên trong điều kiện an toàn do giảng viên chỉ định.
2. So sánh số trên màn hình với chuyển động thật.
3. Nếu khác dự đoán, dừng ngay và nói nguyên nhân nghi ngờ.
4. Nếu bình thường, chuyển sang bước tiếp theo.

### Thực hành C: Ghi nhận

Ghi kết quả thực hành, bất thường và câu hỏi. Nội dung ghi phải đủ cụ thể để người sau và giảng viên hiểu lại cùng một tình huống.

[PAGE_BREAK]

## ${vi.labels.mistakes}

| Lỗi thường gặp | Vì sao nguy hiểm | Câu hỏi phòng tránh |
| --- | --- | --- |
| Bấm nút trước | Bỏ sót trạng thái màn hình | Mode hiện tại là gì |
| Đoán hướng | Có thể đi ngược hướng | Trục nào sẽ đi theo hướng nào |
| Xóa alarm | Nguyên nhân vẫn còn | Đã ghi mã alarm chưa |
| Không ghi lại | Người sau không biết điều kiện | Người khác có tái hiện được không |

Năng lực quan trọng nhất của người mới không phải là thao tác nhanh, mà là biết dừng an toàn và giải thích. Khi nghe tiếng lạ, thấy chuyển động khác dự đoán, alarm, vấn đề dung dịch cắt hoặc dao rung, hãy dừng và báo cáo.

[PAGE_BREAK]

## ${vi.labels.problems}

### Trắc nghiệm

1. Việc đầu tiên cần kiểm tra trước ${title} là gì?
   - A. Tăng tốc độ lên cao nhất
   - B. Kiểm tra mode hiện tại, alarm và vùng làm việc
   - C. Chạy chương trình ngay
   - D. Ghi phiếu sau cũng được

2. Khi thấy máy chuyển động khác dự đoán, hành động đầu tiên là gì?
   - A. Tiếp tục chạy
   - B. Dừng ngay và kiểm tra trạng thái
   - C. Chỉ xóa alarm
   - D. Tăng override

### Tự luận ngắn

1. Viết 5 hạng mục cần kiểm tra trước ${title}.
2. Giải thích vì sao nên bắt đầu với override thấp.
3. Viết 3 thông tin cần có khi báo cáo bất thường.

[PAGE_BREAK]

## ${vi.labels.answers}

Đáp án trắc nghiệm: câu 1 là B, câu 2 là B. Với phần tự luận, câu trả lời cần bao gồm các ý phù hợp như khu vực xung quanh, alarm, mode hiện tại, vùng làm việc, tình trạng dao, gá phôi, override và phiếu ghi.

Giảng viên không chỉ kiểm tra học viên có nhớ quy trình hay không. Cần kiểm tra học viên có giải thích được vì sao phải dừng và xác nhận ở từng bước hay không. ${title} liên kết với bài tiếp theo, nên sau thực hành phải luôn để lại câu hỏi và ghi nhận.

## ${vi.labels.next}

Bài tiếp theo là ${nextTitle}. Thói quen kiểm tra trạng thái, dừng an toàn và ghi nhận trong bài này sẽ tiếp tục được dùng ở bài sau.
`;
}

function writeAll() {
  for (const locale of [ko, vi]) {
    const dir = join(root, "src", "content", locale.lang);
    mkdirSync(dir, { recursive: true });
    items.forEach((item, index) => {
      const body = locale.lang === "ko" ? koBody(item, index) : viBody(item, index);
      writeFileSync(join(dir, `level1_item${item.id}.md`), body, "utf8");
    });
  }
}

writeAll();
console.log("Generated Korean and Vietnamese content for 20 Level 1 items.");
