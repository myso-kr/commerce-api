# 네이버 커머스API 문서 표준 컨벤션

> AI(LLM) 최적화 기준으로 작성된 마크다운 서식·구조 표준입니다.
> 자동화 변환 스크립트의 변환 기준으로 활용됩니다.

---

## 0. AI 최적화 원칙

LLM/RAG 시스템에서 마크다운이 효과적인 이유:

- **토큰 효율**: HTML 대비 20-30% 토큰 절감
- **검색 정확도**: 순수 텍스트·HTML 대비 RAG 검색 정확도 20-35% 향상
- **청킹 경계**: `##` H2 헤더가 RAG 청크 경계로 작동 — 헤더 텍스트가 청크 메타데이터가 됨
- **학습 분포 일치**: LLM 사전학습 데이터의 대다수가 마크다운 형식

> **핵심 설계 원칙**: 모든 `## H2` 섹션은 완전히 독립적으로 읽혀야 합니다.
> RAG가 해당 청크만 검색해도 문맥을 파악할 수 있어야 합니다.

---

## 1. 현황 진단

210개 마크다운 파일 분석 결과 확인된 공통 문제:

| 문제 | 해당 파일 수 |
|------|-------------|
| H1 제목 중복 | 136/184 |
| HTTP 메서드 코드블록 오포맷 | 135/184 |
| "Direct link to" 앵커 노이즈 | 136/184 |
| UI 탭 잔재 (curl/java, Schema/Example) | 135/184 |
| Array 표기법 (`- Array [`, `- ]`) | 126/184 |
| 이스케이프된 언더스코어 (`\_`) | 102/184 |
| 웹 UI 잔재 (Request Collapse all, Base URL Edit) | 135/184 |
| 인증 보일러플레이트 중복 | 134/184 |

---

## 2. 페이지 유형 분류

| 유형 | 수 | `type` 값 |
|------|----|-----------|
| API 엔드포인트 | 135 | `api-endpoint` |
| 카테고리 목차 | 53 | `category-index` |
| 데이터 구조체 | 13 | `schema` |
| 일반 가이드 | 9 | `guide` |

---

## 3. 디렉토리 구조

현재 파일명은 Docusaurus 슬러그 기반으로 의미가 없습니다.
**API 경로를 그대로 반영한 디렉토리 구조**로 재편합니다.

```
docs/
├── llms.txt                        # 사이트 레벨 AI 진입점 (llmstxt.org 표준)
├── llms-full.txt                   # 전체 문서 플랫 마크다운 export
│
├── guide/                          # 일반 가이드
│   ├── introduction.md
│   ├── auth.md
│   ├── restful-api.md
│   ├── restriction.md
│   └── trouble-shooting.md
│
├── api/                            # API 엔드포인트 (경로 기반)
│   ├── v1/
│   │   ├── oauth2/
│   │   │   └── token.POST.md
│   │   ├── pay-order/
│   │   │   └── seller/
│   │   │       └── product-orders/
│   │   │           ├── query.POST.md
│   │   │           └── dispatch.POST.md
│   │   ├── bizdata-stats/
│   │   │   └── channels/
│   │   │       └── {channelNo}/
│   │   │           └── marketing/
│   │   │               └── all/
│   │   │                   └── daily.GET.md
│   │   ├── pay-settle/
│   │   ├── contents/
│   │   └── ...
│   └── v2/
│       └── products/
│           └── index.POST.md
│
├── schema/                         # 데이터 구조체
│   ├── 원상품-정보-구조체.md
│   └── ...
│
└── category/                       # 카테고리 목차 (선택)
    └── 상품.md
```

**파일명 규칙**: `{마지막-경로-세그먼트}.{METHOD}.md`

- `POST /v1/oauth2/token` → `api/v1/oauth2/token.POST.md`
- `GET /v1/bizdata-stats/channels/{channelNo}/marketing/all/daily` → `api/v1/bizdata-stats/channels/{channelNo}/marketing/all/daily.GET.md`
- 경로 파라미터는 `{paramName}` 형태로 폴더명 유지

---

## 4. YAML Frontmatter 표준

### 설계 원칙

- `description`은 단일 밀도 높은 문장으로 작성 — 벡터 임베딩 시 문서와 함께 인덱싱됨
- `tags`는 RAG 필터링을 위한 통제 어휘 (자유 형식 X)
- `updated`는 최신 문서 우선 검색에 사용
- `entities`는 명명된 개체 검색 리콜 향상

### 4-1. `api-endpoint`

```yaml
---
doc-id: "v1-oauth2-token-post"
title: "인증 토큰 발급 요청"
description: "client_id와 bcrypt 전자서명으로 OAuth2 Client Credentials 인증 토큰을 발급하며, 유효 시간은 3시간이고 30분 이내 만료 시 자동 갱신된다."
type: api-endpoint
method: POST
path: /v1/oauth2/token
base-url: https://api.commerce.naver.com/external
category: 인증
tags:
  - oauth2
  - auth
  - token
status: stable
updated: "2024-01-01"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/exchange-sellers-auth
entities:
  - client_id
  - client_secret_sign
  - access_token
---
```

| 필드 | 설명 | 필수 |
|------|------|:----:|
| `doc-id` | 안정적 고유 식별자 (경로 기반 kebab-case) | ✓ |
| `title` | 한국어 문서 제목 | ✓ |
| `description` | 임베딩용 밀도 높은 한 문장 요약 | ✓ |
| `type` | `api-endpoint` 고정 | ✓ |
| `method` | `GET` \| `POST` \| `PUT` \| `DELETE` \| `PATCH` | ✓ |
| `path` | API 경로 (`/v1/products/{productId}` 형태) | ✓ |
| `base-url` | API 호스트 | ✓ |
| `category` | 도메인 카테고리 (상품/주문/정산/인증...) | ✓ |
| `tags` | RAG 필터링용 통제 어휘 목록 | ✓ |
| `status` | `stable` \| `deprecated` \| `beta` | ✓ |
| `updated` | ISO 8601 날짜 | ✓ |
| `source` | 원문 URL | ✓ |
| `entities` | 핵심 필드명·타입명 목록 (검색 리콜 향상) | |

### 4-2. `schema`

```yaml
---
doc-id: "schema-origin-product"
title: "원상품 정보 구조체"
description: "상품 등록·조회·수정 API에서 공통으로 사용하는 원상품의 판매 상태, 이미지, 배송, 옵션, 가격 정보를 담는 요청/응답 구조체."
type: schema
category: 상품
tags:
  - schema
  - product
  - origin-product
status: stable
updated: "2024-01-01"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/schemas/원상품-정보-구조체
entities:
  - statusType
  - deliveryInfo
  - optionInfo
---
```

### 4-3. `category-index`

```yaml
---
doc-id: "category-product"
title: "상품"
description: "원상품·채널상품 등록·조회·수정·삭제 및 옵션·배송 관련 API와 구조체 목록."
type: category-index
category: 상품
tags:
  - product
  - category
status: stable
updated: "2024-01-01"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/상품
---
```

### 4-4. `guide`

```yaml
---
doc-id: "guide-auth"
title: "인증"
description: "커머스API OAuth2 Client Credentials 인증 흐름, bcrypt 전자서명 생성 방법, 토큰 만료 시 재발급 패턴."
type: guide
category: 가이드
tags:
  - oauth2
  - auth
  - getting-started
status: stable
updated: "2024-01-01"
source: https://apicenter.commerce.naver.com/docs/auth
---
```

---

## 5. Tags 통제 어휘

RAG 필터링의 일관성을 위해 아래 어휘만 사용합니다.

**도메인**:
`auth` · `product` · `order` · `settle` · `inquiry` · `logistics` · `stats` · `commerce-solution` · `seller`

**기능**:
`oauth2` · `token` · `schema` · `category` · `option` · `delivery` · `image` · `cancel` · `exchange` · `return` · `dispatch`

**메타**:
`getting-started` · `reference` · `guide` · `deprecated` · `beta`

---

## 6. 본문 서식 표준

### 6-1. `api-endpoint` 전체 구조

> **RAG 청킹 경계**: 각 `## H2` 섹션은 독립 청크가 됩니다.
> 각 섹션 첫 줄에 엔드포인트 정보를 반복해 컨텍스트를 자급합니다.

```markdown
---
(frontmatter)
---

# 인증 토큰 발급 요청

> **POST** `https://api.commerce.naver.com/external/v1/oauth2/token`

client_id와 bcrypt 전자서명으로 OAuth2 인증 토큰을 발급합니다.
동일 리소스에는 토큰 하나만 발급되며, 유효 시간은 3시간(10,800초)입니다.
남은 유효 시간이 30분 이상이면 기존 토큰이 반환되고, 30분 미만이면 새 토큰이 발급됩니다.

> 인증 필요 없음 — 이 엔드포인트가 토큰을 발급합니다.

## Request

**POST** `/v1/oauth2/token` — `Content-Type: application/x-www-form-urlencoded`

### Body Parameters

| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|:----:|------|
| `client_id` | string | ✓ | 애플리케이션 ID |
| `timestamp` | integer (int64) | ✓ | 전자서명 생성 시 사용한 밀리초 Unix 시간. 5분간 유효 |
| `grant_type` | string | ✓ | 고정값: `client_credentials` |
| `client_secret_sign` | string | ✓ | bcrypt 전자서명 ([생성 방법](../../guide/auth.md#전자서명)) |
| `type` | string | ✓ | `SELLER` (판매자 리소스) \| `SELF` (자기 리소스) |
| `account_id` | string | | `type=SELLER`일 때 판매자 ID 또는 UID |

## Response

**POST** `/v1/oauth2/token` — 응답 `Content-Type: application/json`

### 200 OK — 발급 성공

| 필드 | 타입 | 설명 |
|------|------|------|
| `access_token` | string | 발급된 인증 토큰 |
| `expires_in` | integer (int64) | 유효 기간 (초). 발급 후 10,800초 |
| `token_type` | string | 항상 `"Bearer"` |

```json
{
  "access_token": "string",
  "expires_in": 10800,
  "token_type": "Bearer"
}
```

### 400 / 403 / 500 — 오류

**400·403·500** 모두 동일한 오류 응답 구조를 사용합니다.

| 필드 | 타입 | 설명 |
|------|------|------|
| `code` | string | 오류 코드 (예: `GW.AUTHN`) |
| `message` | string | 오류 메시지 |
| `timestamp` | string (date-time) | 오류 발생 일시 (KST) |
| `invalidInputs` | object[] | 유효성 오류 항목 목록 |
| `data` | object | 추가 데이터 |

```json
{
  "code": "GW.AUTHN",
  "message": "요청을 보낼 권한이 없습니다.",
  "timestamp": "2023-11-05T23:35:24.415+09:00",
  "invalidInputs": [],
  "data": {}
}
```

## Example

```bash
curl -X POST 'https://api.commerce.naver.com/external/v1/oauth2/token' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'client_id=YOUR_CLIENT_ID' \
  --data-urlencode 'timestamp=1706671059230' \
  --data-urlencode 'grant_type=client_credentials' \
  --data-urlencode 'client_secret_sign=YOUR_SIGNATURE' \
  --data-urlencode 'type=SELLER' \
  --data-urlencode 'account_id=YOUR_SELLER_ID'
```
```

---

### 6-2. `schema` 구조

```markdown
---
(frontmatter)
---

# 원상품 정보 구조체

상품 등록·조회·수정 API의 요청/응답에서 공통으로 사용하는 원상품 데이터 구조체입니다.

## Fields

| 필드 | 타입 | 필수 | 설명 |
|------|------|:----:|------|
| `statusType` | string | ✓ | 판매 상태 코드 |
| `saleType` | string | | 판매 유형: `NEW` (새 상품), `OLD` (중고) |
| `leafCategoryId` | string | | 리프 카테고리 ID. 상품 등록 시 필수 |
| `name` | string | ✓ | 상품명 |
| `detailContent` | string | ✓ | 상품 상세 정보 HTML. 수정 시 생략 가능 |
| `images` | object | ✓ | 상품 이미지 정보 |
| `images.representativeImage` | object | ✓ | 대표 이미지 (1000×1000px 권장) |
| `images.representativeImage.url` | string | ✓ | 이미지 업로드 API로 발급받은 URL |
| `images.optionalImages[]` | object[] | | 추가 이미지 최대 9개 |
| `images.optionalImages[].url` | string | ✓ | 추가 이미지 URL |
| `salePrice` | integer (int64) | ✓ | 판매 가격. 최대 999,999,990 |
| `stockQuantity` | integer (int32) | | 재고 수량. 0이면 품절 처리 |

## Enum Values

### `statusType`

| 값 | 설명 |
|----|------|
| `WAIT` | 판매 대기 |
| `SALE` | 판매 중 |
| `OUTOFSTOCK` | 품절 |
| `SUSPENSION` | 판매 중지 |
| `CLOSE` | 판매 종료 |
| `PROHIBITION` | 판매 금지 |
```

---

### 6-3. `category-index` 구조

```markdown
---
(frontmatter)
---

# 상품

원상품·채널상품 등록·조회·수정·삭제와 옵션·배송 관련 API 목록입니다.

## 문서 목록

| 문서 | 유형 | 설명 |
|------|------|------|
| [원상품 정보 구조체](../../schema/원상품-정보-구조체.md) | schema | 요청/응답 공통 구조체 |
| [(v2) 상품 등록](../../api/v2/products/index.POST.md) | POST | 원상품과 채널 상품을 동시에 등록 |
| [(v2) 원상품 조회](../../api/v2/products/{productId}/origin.GET.md) | GET | 원상품 전체 정보 조회 |
| [(v2) 원상품 수정](../../api/v2/products/{productId}/origin.PUT.md) | PUT | 원상품 정보 수정 |
| [(v2) 원상품 삭제](../../api/v2/products/{productId}/origin.DELETE.md) | DELETE | 원상품 삭제 |
```

---

## 7. 세부 서식 규칙

### 7-1. 헤더 전략 (RAG 청킹 핵심)

LangChain `MarkdownHeaderTextSplitter`는 헤더를 청크 경계로 사용합니다.
헤더 텍스트는 청크 메타데이터로 저장되어 검색 쿼리와 매칭됩니다.

```
규칙:
- # H1: 문서당 하나. 문서 제목.
- ## H2: 주요 청크 경계. 자급적(self-contained) 섹션.
           "Details", "More Info" 같은 모호한 이름 금지.
           → "Request Body Parameters", "Response 200 OK" 처럼 서술적으로.
- ### H3: H2 내 세부 구분. 3단계 이상 중첩 금지.
- #### H4: 최대 깊이. 거의 사용하지 않음.
```

각 H2 섹션 첫 줄에 엔드포인트·타입명 등 핵심 컨텍스트를 반복해 청크를 자급 처리합니다:

```markdown
## Request

**POST** `/v1/pay-order/seller/product-orders/dispatch` — 발송 처리 요청
```

### 7-2. 단락 규칙

- 단락은 3-5문장 이내. 한 단락에 하나의 개념.
- 긴 문장보다 짧고 명확한 문장 우선.
- 핵심 정보는 단락 첫 줄에 배치 (역피라미드 구조).

### 7-3. HTTP 메서드 표기

```markdown
# 변환 전 (제거 대상)
​```
POST

## /v1/oauth2/token
​```

# 변환 후
> **POST** `https://api.commerce.naver.com/external/v1/oauth2/token`
```

본문 섹션에서 컨텍스트 자급을 위한 반복 표기:

```markdown
## Request

**POST** `/v1/oauth2/token` — `Content-Type: application/x-www-form-urlencoded`
```

### 7-4. 파라미터·필드 표기

**기본 테이블 포맷** (정확도·토큰 효율 균형):

```markdown
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|:----:|------|
| `client_id` | string | ✓ | 애플리케이션 ID |
| `timestamp` | integer (int64) | ✓ | 밀리초 Unix 시간. 5분간 유효 |
```

**MKV 포맷** (필드 수 3개 이하 또는 extraction-critical 데이터):

```markdown
- **`access_token`** (string): 발급된 인증 토큰
- **`expires_in`** (integer): 유효 기간(초). 항상 10800
- **`token_type`** (string): 항상 `"Bearer"`
```

규칙:
- 필드명은 항상 인라인 코드 `` `field_name` `` — `\_` 이스케이프 제거
- `required` → `✓`, optional → 빈칸
- `**Example:**` 값은 설명에 포함하거나 생략
- 테이블은 단순 행/열 데이터에만 — 셀 안에 두 문장 이상이면 목록으로 전환
- 병합 셀, 중첩 테이블 사용 금지 (파서 혼동, LLM 파싱 오류)

### 7-5. 중첩 객체 표기

`- Array [`, `- ]` 패턴 → 점 표기법으로 테이블 행 전개:

```markdown
# 변환 전
**dispatchProductOrders** object[]
- Array [
  **productOrderId** string
  **deliveryMethod** string
- ]

# 변환 후
| `dispatchProductOrders[]` | object[] | ✓ | 발송 처리 대상 목록 |
| `dispatchProductOrders[].productOrderId` | string | | 상품 주문 번호 |
| `dispatchProductOrders[].deliveryMethod` | string | | 배송 방법 코드 |
```

중첩이 깊은 경우 H3으로 분리:

```markdown
### `deliveryInfo` 객체

`POST /v2/products` 요청의 배송 정보 하위 필드.

| 필드 | 타입 | 필수 | 설명 |
|------|------|:----:|------|
| `deliveryType` | string | ✓ | 배송 방법 |
| `deliveryAttributeType` | string | ✓ | 배송 속성 |
```

**중첩 깊이 최대 3단계** — 그 이상은 H3 별도 섹션으로 분리.

### 7-6. Enum 표기

값이 4개 이하: 설명 셀에 인라인 코드 나열

```markdown
| `type` | string | ✓ | `SELLER` (판매자 리소스) \| `SELF` (자기 리소스) |
```

값이 5개 이상: 섹션 하단에 별도 Enum 테이블

```markdown
**`statusType`** 허용 값:

| 값 | 설명 |
|----|------|
| `WAIT` | 판매 대기 |
| `SALE` | 판매 중 |
| `OUTOFSTOCK` | 품절 |
```

### 7-7. 코드 블록

- 항상 펜스드 코드블록(`` ``` ``) — 들여쓰기 방식 금지
- 항상 언어 식별자 명시: `bash`, `json`, `python`, `java`, `http`, `yaml`
- 코드블록 앞뒤 빈 줄 필수
- API 문서는 요청·응답 블록을 인접 배치:

```markdown
요청 예시:

```http
POST /v1/oauth2/token HTTP/1.1
Content-Type: application/x-www-form-urlencoded
```

```
client_id=YOUR_CLIENT_ID&grant_type=client_credentials
```

응답 예시:

```json
{
  "access_token": "...",
  "expires_in": 10800,
  "token_type": "Bearer"
}
```
```

- 코드 블록 내 설명 산문 금지 — 필요하면 코드 주석 사용

### 7-8. 제거 대상 패턴

| 패턴 | 이유 |
|------|------|
| `[​](#xxx "Direct link to xxx")` | Docusaurus 앵커 노이즈 |
| `- curl`, `- java`, `- python` (탭 라벨 목록) | UI 탭 잔재 |
| `- Schema`, `- Example (auto)` | UI 탭 잔재 |
| `Request Collapse all` / `Base URL\nEdit` | 인터랙티브 UI 잔재 |
| `#### Authorization: oauth2` + 보일러플레이트 | 모든 API 반복, 전역 참조로 대체 |
| `> 원문: https://...` | frontmatter `source`로 이동 |
| `<details>` / `<summary>` HTML | RAG 청커가 내용 인식 불가 |
| JavaScript 렌더링 의존 인터랙션 | AI 파서 접근 불가 |

### 7-9. H1 중복 제거

```markdown
# 변환 전
# 인증 토큰 발급 요청       ← 첫 번째 (파일 상단)
> 원문: https://...
# 인증 토큰 발급 요청       ← 두 번째 (본문)

# 변환 후
---
title: "인증 토큰 발급 요청"
source: "https://..."
---
# 인증 토큰 발급 요청       ← frontmatter 이후 하나만 유지
```

### 7-10. 인증 섹션 처리

모든 엔드포인트 하단의 반복 인증 보일러플레이트 제거.
엔드포인트 제목 아래 한 줄 참조로 대체:

```markdown
# 발송 처리

> **POST** `https://api.commerce.naver.com/external/v1/pay-order/seller/product-orders/dispatch`
>
> 인증 필요: [OAuth2 Bearer Token](../../guide/auth.md) — `Authorization: Bearer {token}`
```

### 7-11. 응답 상태코드 그룹핑

동일 스키마를 공유하는 오류 상태코드는 하나의 섹션으로 묶습니다:

```markdown
# 변환 전: 400, 403, 500 각각 동일 내용 반복

# 변환 후
### 400 / 403 / 500 — 오류

400·403·500 모두 동일한 오류 응답 구조를 사용합니다.

| 필드 | 타입 | 설명 |
|------|------|------|
| `code` | string | 오류 코드 |
| `message` | string | 오류 메시지 |
```

---

## 8. 사이트 레벨 AI 진입점

### 8-1. `docs/llms.txt`

[llmstxt.org](https://llmstxt.org/) 표준에 따라 `docs/llms.txt`를 생성합니다.
Anthropic, Cloudflare, Stripe 등이 채택한 표준입니다.

```markdown
# 네이버 커머스API

> 스마트스토어 주요 기능을 HTTP API로 호출하는 커머스 플랫폼 공개 API 문서.
> OAuth2 Client Credentials 인증, API 버전: 2.73.0

## 가이드

- [소개](guide/introduction.md): 커머스API 개요 및 사용 등록 절차
- [인증](guide/auth.md): OAuth2 Client Credentials 흐름, bcrypt 전자서명 생성
- [RESTful API 규격](guide/restful-api.md): Content-Type, HTTP 상태코드, 호스트
- [제약 사항](guide/restriction.md): Rate Limit, Quota Limit

## API 엔드포인트

- [인증 토큰 발급](api/v1/oauth2/token.POST.md): POST /v1/oauth2/token
- [상품 등록 (v2)](api/v2/products/index.POST.md): POST /v2/products
- [주문 조회](api/v1/pay-order/seller/product-orders/query.POST.md): POST /v1/pay-order/seller/product-orders/query
- ...

## 스키마

- [원상품 정보 구조체](schema/원상품-정보-구조체.md)
- ...

## Optional

- [카테고리 목차](category/): 도메인별 API 묶음
```

### 8-2. `docs/llms-full.txt`

모든 마크다운 파일을 단일 파일로 연결한 전체 export.
LLM의 full-context 수집에 사용됩니다.

---

## 9. RAG 청킹 설계 가이드

| 항목 | 권장값 |
|------|--------|
| 청킹 전략 | 헤더 기반 (H2 경계) |
| API reference 청크 크기 | 256-400 tokens |
| 청크 오버랩 | 50 tokens |
| 청크 메타데이터 | H1, H2, H3 계층 + frontmatter fields |

**LangChain 설정 참고:**

```python
from langchain.text_splitter import MarkdownHeaderTextSplitter

splitter = MarkdownHeaderTextSplitter(headers_to_split_on=[
    ("#", "h1"),
    ("##", "h2"),
    ("###", "h3"),
])
```

**H2 계층 메타데이터를 청크에 포함**하면 검색 정확도가 69% → 84%로 향상됩니다 (계층 메타데이터 포함 연구 기준).

---

## 10. 도메인 카테고리 매핑

| 원본 Docusaurus 카테고리 | API path 그룹 | 새 디렉토리 | 권장 태그 |
|--------------------------|--------------|------------|---------|
| 인증 | `/v1/oauth2` | `api/v1/oauth2/` | `oauth2`, `auth` |
| 주문 | `/v1/pay-order/seller` | `api/v1/pay-order/` | `order`, `dispatch` |
| 상품 | `/v1/products`, `/v2/products` | `api/v1/products/`, `api/v2/products/` | `product` |
| 정산 | `/v1/pay-settle` | `api/v1/pay-settle/` | `settle` |
| 문의 | `/v1/contents` | `api/v1/contents/` | `inquiry` |
| API데이터솔루션(통계) | `/v1/bizdata-stats` | `api/v1/bizdata-stats/` | `stats` |
| 커머스솔루션 | `/v1/commerce-solutions` | `api/v1/commerce-solutions/` | `commerce-solution` |
| 판매자정보 | `/v1/seller`, `/v1/pay-user` | `api/v1/seller/` | `seller` |
| 물류 | `/v1/logistics` | `api/v1/logistics/` | `logistics` |

---

## 11. 변환 체크리스트

각 파일 변환 시 확인 항목:

**Frontmatter**
- [ ] `doc-id` 삽입 (경로 기반 kebab-case, 유일)
- [ ] `title` — 한국어 원문 제목
- [ ] `description` — 임베딩용 밀도 높은 한 문장
- [ ] `type`, `method`, `path`, `base-url`, `category`, `tags`, `status`, `updated`, `source` 삽입
- [ ] `entities` — 핵심 필드명·타입명 목록

**구조 정리**
- [ ] H1 중복 제거 (frontmatter 이후 하나만)
- [ ] `> 원문:` 줄 제거
- [ ] HTTP 메서드 코드블록 → `> **METHOD** \`full-url\`` 인라인 변환
- [ ] 각 H2 섹션 첫 줄에 `METHOD /path` 컨텍스트 반복

**노이즈 제거**
- [ ] "Direct link to" 앵커 제거
- [ ] UI 탭 목록 제거 (curl/java 탭 라벨, Schema/Example 라벨)
- [ ] 웹 UI 잔재 제거 (Request Collapse all, Base URL Edit 등)
- [ ] 인증 보일러플레이트 섹션 제거 → 한 줄 참조로 대체

**필드 정규화**
- [ ] `\_` → `_` (인라인 코드 내 언더스코어 언이스케이프)
- [ ] 필드 정의 → 마크다운 테이블 (`파라미터|타입|필수|설명`)
- [ ] `- Array [`, `- ]` → 점 표기법 테이블 행으로 전개
- [ ] 중첩 3단계 초과 → H3 별도 섹션
- [ ] Enum 값 → 4개 이하 인라인, 5개 이상 별도 테이블
- [ ] 동일 스키마 반복 응답코드 → 단일 섹션으로 그룹핑

**코드블록**
- [ ] 언어 식별자 명시 (`bash`, `json`, `http` 등)
- [ ] 코드블록 앞뒤 빈 줄 확인
- [ ] curl 예시 유지, 다른 언어 탭 제거

**파일 재배치**
- [ ] API path 기반 디렉토리로 이동
- [ ] 파일명: `{마지막-세그먼트}.{METHOD}.md`

**사이트 레벨**
- [ ] `docs/llms.txt` 생성
- [ ] `docs/llms-full.txt` 생성 (전체 concat)
