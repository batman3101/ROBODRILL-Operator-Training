# Codex Task 01

## 목적

`src/content/level1_item01.md`를 FANUC ROBODRILL 초보자 교육 교재 형식으로 확장하고, HTML/CSS 기반 PDF 변환 흐름으로 샘플 PDF를 생성한다.

## 요구사항

- reportlab 직접 생성 방식을 사용하지 않는다.
- Markdown 원고를 HTML로 변환한다.
- HTML 템플릿에 인쇄용 CSS를 적용한다.
- Noto Sans KR 우선 적용 구조를 사용한다.
- 이미지, 도해, 표, 실습문제, 정답을 포함한다.
- `npm run pdf:sample`로 `output/pdf/level1_item01_sample.pdf`가 생성되어야 한다.

## 산출물

- `src/content/ko/level1_item01.md`
- `src/content/vi/level1_item01.md`
- `src/templates/pdf_template.html`
- `scripts/build-pdf.mjs`
- `output/html/ko/level1_item01.html`
- `output/pdf/ko/level1_item01.pdf`
