# FANUC ROBODRILL Beginner Training Manual

FANUC ROBODRILL 초보자 교육 매뉴얼을 HTML/CSS 기반으로 작성하고 PDF로 변환하는 프로젝트입니다.

## 목표

- PDF 기반 교육 교재 생성
- 한국어 폰트 깨짐 방지
- Markdown 원고를 HTML로 렌더링한 뒤 브라우저 인쇄 엔진으로 PDF 생성
- 기초 단계 01 항목을 교육 교재 형식으로 확장
- 이미지, 도해, 표, 실습문제 포함

## 폴더 구조

```text
fanuc-robodrill-manual/
├─ README.md
├─ MANUAL_SPEC.md
├─ prompts/
│  └─ codex_task_01.md
├─ src/
│  ├─ content/
│  │  └─ level1_item01.md
│  ├─ assets/
│  │  ├─ fonts/
│  │  ├─ images/
│  │  └─ diagrams/
│  └─ templates/
│     └─ pdf_template.html
├─ scripts/
│  └─ build-pdf.mjs
├─ output/
│  ├─ html/
│  └─ pdf/
└─ package.json
```

## 교재 생성

```bash
npm run build
```

생성 결과:

- 한국어 항목별 HTML/PDF: `output/html/ko/`, `output/pdf/ko/`
- 베트남어 항목별 HTML/PDF: `output/html/vi/`, `output/pdf/vi/`
- 한국어 통합본: `output/html/ko/fanuc_robodrill_level1_manual_ko.html`, `output/pdf/ko/fanuc_robodrill_level1_manual_ko.pdf`
- 베트남어 통합본: `output/html/vi/fanuc_robodrill_level1_manual_vi.html`, `output/pdf/vi/fanuc_robodrill_level1_manual_vi.pdf`

샘플 항목만 다시 만들 때:

```bash
npm run pdf:sample
```

이 방식은 reportlab으로 PDF를 직접 조립하지 않고, HTML/CSS를 먼저 만든 다음 Chrome 또는 Edge의 인쇄 엔진으로 PDF를 출력합니다.

HTML 출력은 화면 검수용 좌우 여백과 중앙 문서 폭을 별도로 적용합니다. PDF 인쇄는 A4 여백 규칙을 사용합니다.

각 항목에는 실제 설비 이미지와 함께 안전, 관찰, 절차, 점검, 실습 포인트를 설명하는 교육용 일반 그림 카드가 포함됩니다. 일반 그림은 Bootstrap Icons SVG를 로컬 자산으로 저장해 사용합니다.

## 실제 교재 제작 계획

20개 항목, 총 200-250페이지 규모의 기초과정 제작 흐름은 [MANUAL_PRODUCTION_PLAN.md](MANUAL_PRODUCTION_PLAN.md)에 정리되어 있습니다.

## 한글 폰트

기본 CSS는 `Noto Sans KR`을 우선 사용하고, 없을 경우 Windows 기본 한국어 폰트인 `Malgun Gothic`으로 대체합니다. 배포 품질을 고정하려면 다음 파일을 추가하세요.

```text
src/assets/fonts/NotoSansKR-Regular.woff2
src/assets/fonts/NotoSansKR-Medium.woff2
src/assets/fonts/NotoSansKR-Bold.woff2
```

폰트 파일이 있으면 생성 스크립트가 자동으로 `@font-face`를 구성합니다.
