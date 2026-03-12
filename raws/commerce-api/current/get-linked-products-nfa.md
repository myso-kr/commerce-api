# SKU 연결상품 조회 API

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-linked-products-nfa

# SKU 연결상품 조회 API

```
GET

## /v1/logistics/products/sellers/me/skus/:nsId/product-mappings
```

SKU에 연결된 상품 목록을 페이지 단위로 조회합니다.

## Request[​](#request "Direct link to Request")

### Path Parameters

**nsId** stringrequired

SKU ID. 조회하고자 하는 SKU의 관리 코드.

- 재고 구분을 위해 네이버에서 채번한 고유 SKU 값입니다.
- 영문/숫자 조합, 영문 대/소문자 구분, SKU ID 당 최대 20자 구성.

### Query Parameters

**page** integer<int32>

페이지 번호 (1부터 시작).

- 최대 조회 가능 개수는 10만 건을 초과할 수 없습니다.

**Default value:** `1`

**Example:** 1

**Possible values:** `>= 1`

**size** integer<int32>

페이지 크기 (1-500).

- 최대 조회 가능 개수는 10만 건을 초과할 수 없습니다.

**Default value:** `50`

**Example:** 50

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

조회한 SKU ID

**content** NsProductMappingSummary.nfa (object)[]required

연결상품 목록.

- 조회 조건에 해당하는 연결상품이 존재하지 않을 경우, 빈 값(empty array)으로 전달합니다.

- Array [

**channelProductId**stringnullable

채널 상품 ID. SKU와 연결된 채널 상품 ID.

**optionId**stringnullable

옵션 ID. SKU와 연결된 옵션 ID.

**pickingQuantityPerOrder**integer<int32>nullable

주문당 출고수량. 주문당 SKU의 출고수량.

- ]

**totalPages**integer<int32>required

전체 페이지 수

**Possible values:** `>= 0`

**totalElements**integer<int64>required

전체 연결상품 수

**Possible values:** `>= 0`

**page**integer<int32>required

현재 페이지 번호

**Possible values:** `>= 1`

**size**integer<int32>required

페이지 크기

**Possible values:** `>= 0`

**first**booleanrequired

첫 번째 페이지 여부

**Example:** `true`

**last**booleanrequired

마지막 페이지 여부

**Example:** `false`

```json
{
  "nsId": "string",
  "content": [
    {
      "channelProductId": "string",
      "optionId": "string",
      "pickingQuantityPerOrder": 0
    }
  ],
  "totalPages": 0,
  "totalElements": 0,
  "page": 0,
  "size": 0,
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
curl -L 'https://api.commerce.naver.com/external/v1/logistics/products/sellers/me/skus/:nsId/product-mappings' \
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

Show optional parameters

page — query

size — query
