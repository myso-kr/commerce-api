# SKU 목록 조회 API

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-ns-information-paged-list-nfa

# SKU 목록 조회 API

```
POST

## /v1/logistics/products/sellers/me/skus/query-paged-list
```

SKU 목록 페이지를 조회합니다.

## Request[​](#request "Direct link to Request")

- application/json

### Body**required**

**searchKeywordType**stringnullable

검색 키워드 타입.

- 조회하고자 하는 검색 키워드
- NS\_ID 선택 시, SKU ID를 입력합니다.
- BARCODE 선택 시, 바코드를 입력합니다.

**nsIds**string[]nullable

SKU ID 목록. 조회하고자 하는 SKU의 관리 코드.

- 재고 구분을 위해 네이버에서 채번한 고유 SKU 값입니다.
- 영문/숫자 조합, 영문 대/소문자 구분, SKU ID 당 최대 20자 구성.
- 복수 입력 가능

**nsBarcodes**string[]nullable

SKU 바코드. 조회하고자 하는 SKU의 바코드번호.

- SKU에 부착된 바코드 값입니다.
- 영문/숫자/공백/하이픈(-)/언더스코어(\_)/온점(.) 조합 가능, 영문 대/소문자 구분, 최대 100자 구성.
- 복수 입력 가능

**periodType**stringnullable

검색 기간 유형.

- 조회하고자 하는 날짜 기준
- SKU\_REG\_DAY 선택 시, SKU 등록일을 입력합니다.
- SKU\_MOD\_DAY 선택 시, SKU 수정일을 입력합니다.

**fromDate**stringnullable

검색 기간 시작일.

- 'yyyy-mm-dd' 형식으로 입력.

**toDate**stringnullable

검색 기간 종료일.

- 'yyyy-mm-dd' 형식으로 입력.

**page**numbernullable

페이지 번호.

- 첫 번째 페이지 번호는 1입니다.
- 최대 조회 가능 개수는 10만 건을 초과할 수 없습니다.

**Possible values:** `>= 1` and `<= 100000`

**size**numbernullable

페이지 크기.

- 페이지당 최대 500건까지 조회할 수 있습니다.
- 최대 조회 가능 개수는 10만 건을 초과할 수 없습니다.

**Possible values:** `>= 1` and `<= 500`

**orderType**stringnullable

정렬 기준.

- MODIFICATION(SKU 수정일순), REGISTRATION(SKU 등록일순).

## Responses[​](#responses "Direct link to Responses")

- 200
- 400
- 404
- 500

OK

- application/json

- Schema
- Example (auto)

**Schema**

**content** NaverSkuSearchInfo.nfa (object)[]required

SKU 목록

- 조회 조건에 해당하는 SKU 정보가 존재하지 않을 경우, 빈 값(empty array)으로 전달합니다.

**Possible values:** `<= 500`

- Array [

**nsId**stringrequired

SKU ID

**nsName**string

SKU 명

**nsBarcode**string

SKU 바코드

**storageTemperature**string

재고 보관 온도

| 코드 | 설명 |
| --- | --- |
| DRY | 상온 |
| WET | 냉장 |
| FROZEN | 냉동 |

**Possible values:** [`DRY`, `WET`, `FROZEN`]

**shelfLifeManagement**boolean

소비기한 관리 여부

**lotNoManagement**boolean

로트번호 관리 여부

**nsMappingCount**integer<int32>required

SKU ID에 연결된 판매상품의 수

**registrationYmdt**string<date-time>required

SKU 정보가 등록된 최초 일시

- KST(UTC+09:00)로 응답

**Example:** `2024-01-01T11:20:50.001+09:00`

**modificationYmdt**string<date-time>required

SKU 정보가 변경된 최종 일시

- KST(UTC+09:00)로 응답

**Example:** `2024-01-01T11:20:50.001+09:00`

- ]

**totalPages**integer<int32>required

전체 페이지 수

**Possible values:** `>= 0`

**totalElements**integer<int64>required

전체 SKU 수

**Possible values:** `>= 0`

**page**integer<int32>required

페이지 번호

**Possible values:** `>= 1`

**size**integer<int32>required

한 페이지 당 항목 수

**Possible values:** `>= 0`

**sort**stringrequired

정렬 기준

| 코드 | 설명 |
| --- | --- |
| MODIFICATION | SKU 수정 일시 |
| REGISTRATION | SKU 등록 일시 |

**Example:** `MODIFICATION`

**first**booleanrequired

첫 번째 페이지 여부

**Example:** `true`

**last**booleanrequired

마지막 페이지 여부

**Example:** `false`

```json
{
  "content": [
    {
      "nsId": "string",
      "nsName": "string",
      "nsBarcode": "string",
      "storageTemperature": "DRY",
      "shelfLifeManagement": true,
      "lotNoManagement": true,
      "nsMappingCount": 0,
      "registrationYmdt": "2024-01-01T11:20:50.001+09:00",
      "modificationYmdt": "2024-01-01T11:20:50.001+09:00"
    }
  ],
  "totalPages": 0,
  "totalElements": 0,
  "page": 0,
  "size": 0,
  "sort": "MODIFICATION",
  "first": true,
  "last": false
}
```

유효성 검사 오류

- `code`: **invalid\_input**

- application/json

- Schema
- Example

**Schema**

**code**string

오류 코드

**Example:** `server_error`

**message**string

오류 메시지

**Example:** `Unknown Error - An error occurred during operation`

**invalidInputs** InvalidInput.nfa (object)[]

유효하지 않은 입력 목록. 400(Bad Request) 상태 코드와 함께 활용.

- Array [

**name**string

유효성 검사 오류가 발생한 필드/경로 변수/파라미터 이름

**Example:** `name`

**message**string

유효성 검사 메시지

**Example:** `반드시 값이 존재하고 길이 혹은 크기가 0보다 커야 합니다.`

- ]

**timestamp**string<date-time>

오류 발생 시간

**Example:** `2020-04-27T19:21:38.774Z`

**traceId**string

해당 요청에 대한 Trace ID

**Example:** `44c1eec345d4d446`

```json
{
  "code": "invalid_input",
  "message": "Bad Request",
  "invalidInputs": [
    {
      "name": "name",
      "message": "반드시 값이 존재하고 길이 혹은 크기가 0보다 커야 합니다."
    },
    {
      "name": "email",
      "message": "반드시 값이 존재하고 길이 혹은 크기가 0보다 커야 합니다."
    }
  ],
  "timestamp": 1591256260211,
  "traceId": "e6d2139b308ee167",
  "exception": null,
  "trace": null
}
```

잘못된 API 주소 또는 리소스를 찾을 수 없는 경우

- `code`: **not\_found**

- application/json

- Schema
- Example

**Schema**

**code**string

오류 코드

**Example:** `server_error`

**message**string

오류 메시지

**Example:** `Unknown Error - An error occurred during operation`

**invalidInputs** InvalidInput.nfa (object)[]

유효하지 않은 입력 목록. 400(Bad Request) 상태 코드와 함께 활용.

- Array [

**name**string

유효성 검사 오류가 발생한 필드/경로 변수/파라미터 이름

**Example:** `name`

**message**string

유효성 검사 메시지

**Example:** `반드시 값이 존재하고 길이 혹은 크기가 0보다 커야 합니다.`

- ]

**timestamp**string<date-time>

오류 발생 시간

**Example:** `2020-04-27T19:21:38.774Z`

**traceId**string

해당 요청에 대한 Trace ID

**Example:** `44c1eec345d4d446`

```json
{
  "code": "not_found",
  "message": "Not Found",
  "timestamp": "2020-04-27T19:21:38.774Z",
  "traceId": "44c1eec345d4d446"
}
```

API 처리 중 오류 발생

- `code`: **server\_error**

- application/json

- Schema
- Example

**Schema**

**code**string

오류 코드

**Example:** `server_error`

**message**string

오류 메시지

**Example:** `Unknown Error - An error occurred during operation`

**invalidInputs** InvalidInput.nfa (object)[]

유효하지 않은 입력 목록. 400(Bad Request) 상태 코드와 함께 활용.

- Array [

**name**string

유효성 검사 오류가 발생한 필드/경로 변수/파라미터 이름

**Example:** `name`

**message**string

유효성 검사 메시지

**Example:** `반드시 값이 존재하고 길이 혹은 크기가 0보다 커야 합니다.`

- ]

**timestamp**string<date-time>

오류 발생 시간

**Example:** `2020-04-27T19:21:38.774Z`

**traceId**string

해당 요청에 대한 Trace ID

**Example:** `44c1eec345d4d446`

```json
{
  "code": "server_error",
  "message": "Unknown Error - An error occurred during operation",
  "timestamp": "2020-04-27T19:21:38.774Z",
  "traceId": "44c1eec345d4d446"
}
```

#### Authorization: oauth2

```
name: Client-Credentialstype: oauth2description: 인증 토큰 발급 후 API 요청 시 Authorization 헤더를 추가합니다.
> Authorization: Bearer {인증 토큰}
flows: {
  "clientCredentials": {
    "tokenUrl": "https://api.commerce.naver.com/external/v1/oauth2/token",
    "scopes": {
      "N/A": "커머스API는 'scopes' 스펙을 제공하지 않습니다."
    }
  }
}
```

- curl
- java
- python
- php
- nodejs
- csharp
- kotlin

- CURL

```bash
curl -L 'https://api.commerce.naver.com/external/v1/logistics/products/sellers/me/skus/query-paged-list' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{
  "searchKeywordType": "string",
  "nsIds": [
    "string"
  ],
  "nsBarcodes": [
    "string"
  ],
  "periodType": "string",
  "fromDate": "string",
  "toDate": "string",
  "page": 0,
  "size": 0,
  "orderType": "string"
}'
```

Request Collapse all

Base URL

Edit

https://api.commerce.naver.com/external

Auth

Bearer Token

Body required

```json
{
  "searchKeywordType": "string",
  "nsIds": [
    "string"
  ],
  "nsBarcodes": [
    "string"
  ],
  "periodType": "string",
  "fromDate": "string",
  "toDate": "string",
  "page": 0,
  "size": 0,
  "orderType": "string"
}
```
