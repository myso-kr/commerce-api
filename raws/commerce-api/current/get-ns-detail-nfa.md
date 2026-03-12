# SKU 조회 API

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-ns-detail-nfa

# SKU 조회 API

```
GET

## /v1/logistics/products/sellers/me/skus/:nsId
```

호출 대상 네이버 SKU ID에 대한 상세 정보를 응답합니다.

## Request[​](#request "Direct link to Request")

### Path Parameters

**nsId** stringrequired

SKU ID. 조회하고자 하는 SKU의 관리 코드.

- 재고 구분을 위해 네이버에서 채번한 고유 SKU 값입니다.
- 영문/숫자 조합, 영문 대/소문자 구분, SKU ID 당 최대 20자 구성.

**Possible values:** `non-empty` and `<= 20 characters`

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

**nsId**stringrequired

SKU ID. 재고 구분을 위해 네이버에서 채번한 고유 SKU 값입니다.

- 영문/숫자 조합, 영문 대/소문자 구분, SKU ID 당 최대 20자 구성

**nsBarcode**stringnullable

SKU 바코드. SKU에 부착된 바코드 값입니다.

- 영문/숫자/공백/하이픈(-)/언더스코어(\_)/온점(.) 조합 가능, 영문 대/소문자 구분, 최대 100자 구성

**nsName**stringnullable

SKU 이름.

**storageTemperature**stringnullable

SKU 보관온도.

**Possible values:** [`DRY`, `WET`, `FROZEN`]

**shelfLifeManagement**booleannullable

SKU 소비기한 관리여부.

**lotNoManagement**booleannullable

SKU 로트번호 관리 여부.

**pieceWidth**numbernullable

SKU 가로 길이 (cm).

**pieceLength**numbernullable

SKU 세로 길이 (cm).

**pieceHeight**numbernullable

SKU 높이 (cm).

**pieceWeight**numbernullable

SKU 무게 (kg).

**nsType**stringnullable

SKU 유형.

**Possible values:** [`MAIN`, `FREEBIE`]

**linkedAlliances** SkuLinkedAlliance.nfa (object)[]

연동 물류사 목록

- Array [

**allianceId**stringrequired

물류사. SKU정보가 연동된 물류사.

**Example:** `CJ`

**allianceLinkedYmdt**string<date-time>required

연동일시.

- 물류사 SKU정보 연동일시
- KST(UTC+09:00)로 응답

**Example:** `2024-01-01T11:20:50.001+09:00`

- ]

**registrationYmdt**string<date-time>required

SKU 등록일시. KST(UTC+09:00)로 응답.

**Example:** `2024-01-01T11:20:50.001+09:00`

**modificationYmdt**string<date-time>required

SKU 수정일시. KST(UTC+09:00)로 응답.

**Example:** `2024-01-01T11:20:50.001+09:00`

```json
{
  "nsId": "string",
  "nsBarcode": "string",
  "nsName": "string",
  "storageTemperature": "DRY",
  "shelfLifeManagement": true,
  "lotNoManagement": true,
  "pieceWidth": 0,
  "pieceLength": 0,
  "pieceHeight": 0,
  "pieceWeight": 0,
  "nsType": "MAIN",
  "linkedAlliances": [
    {
      "allianceId": "CJ",
      "allianceLinkedYmdt": "2024-01-01T11:20:50.001+09:00"
    }
  ],
  "registrationYmdt": "2024-01-01T11:20:50.001+09:00",
  "modificationYmdt": "2024-01-01T11:20:50.001+09:00"
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
curl -L 'https://api.commerce.naver.com/external/v1/logistics/products/sellers/me/skus/:nsId' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>'
```

Request Collapse all

Base URL

Edit

https://api.commerce.naver.com/external

Auth

Bearer Token

Parameters

nsId — pathrequired
