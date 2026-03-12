# 판매자 창고 정보 조회

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-outbound-locations-nfa

# 판매자 창고 정보 조회

```
GET

## /v1/logistics/outbound-locations
```

판매자 계정이 운영 중인 창고에 대한 창고 ID, 창고명, 택배사, 배송 속성을 조회합니다.

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

- Array [

**outboundLocationId**string

창고 ID

**outboundLocationName**string

창고명

**mappings** SellerDeliveryOutboundLocationMappingDto.nfa (object)[]

창고에 대해 주문 마감 시각, CAPA, 휴무 정보가 설정된 택배사, 배송 속성 목록. (판매자센터 매핑 DB) 창고 ID를 포함하는 판매자센터 매핑 ID 목록을 응답합니다.

- Array [

**allianceId**string

택배사 ID

**allianceName**string

택배사명

**deliveryType**string

배송 속성

**Possible values:** [`SELLER_GUARANTEE`, `HOPE_SELLER_GUARANTEE`]

- ]

- ]

```json
[
  {
    "outboundLocationId": "string",
    "outboundLocationName": "string",
    "mappings": [
      {
        "allianceId": "string",
        "allianceName": "string",
        "deliveryType": "SELLER_GUARANTEE"
      }
    ]
  }
]
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
curl -L 'https://api.commerce.naver.com/external/v1/logistics/outbound-locations' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>'
```

Request Collapse all

Base URL

Edit

https://api.commerce.naver.com/external

Auth

Bearer Token
