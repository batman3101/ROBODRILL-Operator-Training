# Manual Specification

## 제작 방향

이 저장소의 교재는 `Markdown 원고 -> HTML/CSS 레이아웃 -> PDF 출력` 순서로 생성한다. PDF를 직접 그리는 reportlab 방식은 사용하지 않는다. HTML을 중간 산출물로 남겨 검수, 스타일 수정, 재출력이 쉽도록 한다.

## 출력 방식

1. `src/content/ko/level1_itemXX.md`와 `src/content/vi/level1_itemXX.md`에 교육 원고를 작성한다.
2. `scripts/build-pdf.mjs`가 Markdown을 HTML로 변환한다.
3. `src/templates/pdf_template.html`의 인쇄 CSS를 적용한다.
4. Chrome 또는 Edge의 headless print 기능으로 언어별 항목 PDF와 통합 PDF를 생성한다.

## 페이지 기준

- 용지: A4
- 여백: 상단 18mm, 좌우 16mm, 하단 18mm
- 본문: 한국어 교육 교재용 가독성 우선
- 구성: 목표, 핵심 개념, 절차, 표, 도해, 실습, 점검문제, 정답
- 각 항목 목표 분량: 10-20페이지
- 언어별 통합본 목표 분량: 200-250페이지

## 한글 폰트 설계

PDF에서 한국어와 베트남어가 깨지지 않도록 다음 순서로 폰트를 적용한다.

1. `src/assets/fonts/`에 포함된 Noto Sans KR WOFF2 파일
2. 운영체제에 설치된 `Noto Sans KR`
3. Windows 기본 한국어 폰트 `Malgun Gothic`
4. `Noto Sans`, `Segoe UI`, `Arial`
5. 일반 sans-serif

권장 파일명:

```text
src/assets/fonts/NotoSansKR-Regular.woff2
src/assets/fonts/NotoSansKR-Medium.woff2
src/assets/fonts/NotoSansKR-Bold.woff2
```

템플릿은 `ManualKR` 폰트 패밀리를 본문 기본값으로 사용한다. 실제 배포용 PDF에서는 폰트 파일을 저장소에 넣어 OS 설치 상태와 무관하게 동일한 결과가 나오도록 한다.

## 언어별 산출물

```text
src/content/ko/level1_item01.md ... level1_item20.md
src/content/vi/level1_item01.md ... level1_item20.md
output/html/ko/
output/html/vi/
output/pdf/ko/
output/pdf/vi/
```

통합본:

```text
output/html/ko/fanuc_robodrill_level1_manual_ko.html
output/pdf/ko/fanuc_robodrill_level1_manual_ko.pdf
output/html/vi/fanuc_robodrill_level1_manual_vi.html
output/pdf/vi/fanuc_robodrill_level1_manual_vi.pdf
```

## 이미지와 도해

- 장비 사진 또는 실제 화면 캡처는 `src/assets/images/`에 둔다.
- 개념도, 좌표계, 작업 흐름도는 `src/assets/diagrams/`에 둔다.
- 안전, 관찰, 절차, 점검, 실습을 설명하는 일반 교육 그림은 `src/assets/icons/bootstrap/`에 둔다.
- 원고에서는 상대 경로 Markdown 이미지 문법을 사용한다.
- 웹에서 가져온 이미지는 `src/assets/images/ATTRIBUTION.md`에 출처, 작성자, 라이선스 또는 사용권 주의사항을 남긴다.
- 재배포용 교재에는 공식 제조사 이미지의 사용 허가 여부를 별도로 확인한다.

예:

```md
![ROBODRILL 구성도](../assets/images/robodrill_overview.svg)
```

## 검수 기준

- 한글 글자가 네모 또는 깨진 글리프로 출력되지 않아야 한다.
- HTML 화면 검수본은 좌우 여백과 중앙 문서 폭이 있어야 한다.
- 표와 도해가 페이지 밖으로 넘치지 않아야 한다.
- 각 항목은 실제 이미지 외에도 설명 포인트별 교육용 일반 그림을 포함해야 한다.
- 실습 절차가 초보자 기준으로 독립 실행 가능해야 한다.
- 안전 경고는 본문보다 눈에 띄어야 한다.
- HTML과 PDF 산출물이 모두 생성되어야 한다.
