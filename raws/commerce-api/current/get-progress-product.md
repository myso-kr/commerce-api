# (v2) 그룹상품 요청 결과 조회

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-progress-product

# (v2) 그룹상품 요청 결과 조회

```
GET

## /v2/standard-group-products/status
```

그룹상품 등록 API와 그룹상품 수정 API의 요청 결과를 조회합니다. - type : CREATE(등록), UPDATE(수정)

## Request[​](#request "Direct link to Request")

### Query Parameters

**type** string

결과를 조회할 그룹상품 요청 API의 타입\n- CREATE(그룹상품 등록), UPDATE(그룹상품 수정)

**Possible values:** [`CREATE`, `UPDATE`]

**requestId** string

조회할 요청ID

## Responses[​](#responses "Direct link to Responses")

- 200
- 308
- 400
- 401
- 403
- 404
- 500

성공

- application/json;charset=UTF-8

- Schema
- Example (auto)

**Schema**

**progress** 그룹상품 요청 진행 상황 (object)

**state**요청 결과 (string)

- QUEUED: 상품 등록/수정 대기 중
- IN PROGRESS: 상품 등록/수정 진행 중
- COMPLETED: 상품 등록/수정 완료
- ALREADY\_RESERVED: 동일 계정에서 이미 다른 요청이 진행 중
- FAILED: 상품 등록/수정 실패
- ERROR: 시스템 오류

**Possible values:** [`QUEUED`, `IN_PROGRESS`, `COMPLETED`, `ALREADY_RESERVED`, `ERROR`, `FAILED`]

**invalidInputs** 잘못된 입력값 목록 (object)[]

- Array [

**name**string

**type**string

**message**string

- ]

**errorMessage**잘못된 입력값 메세지 (string)

**progress**요청 진행률 (integer<int32>)

**requestId**요청 ID (string)

요청을 식별하기 위한 고유 ID입니다. 처리 상태와 진행 상황을 조회할 수 있습니다.

**groupProductNo**그룹상품번호 (integer<int64>)

**productNos** 그룹상품 등록/수정 상품번호 응답 (object)[]

- Array [

**originProductNo**원상품번호 (integer<int64>)

**smartstoreChannelProductNo**스마트스토어 채널 상품번호 (integer<int64>)

**windowChannelProductNo**윈도 채널 상품번호 (integer<int64>)

- ]

**standardPurchaseOptionsIds** 그룹상품 판매옵션정보 응답 (object)[]

- Array [

**originProductNo**원상품번호 (integer<int64>)

**standardPurchaseOptionsIds** 판매옵션정보 (object)[]

- Array [

**optionId**판매옵션 ID (integer<int64>)

**valueName**판매 옵션값명 (string)

- ]

- ]

```json
{
  "progress": {
    "state": "QUEUED",
    "invalidInputs": [
      {
        "name": "string",
        "type": "string",
        "message": "string"
      }
    ],
    "errorMessage": "string",
    "progress": 0
  },
  "requestId": "string",
  "groupProductNo": 0,
  "productNos": [
    {
      "originProductNo": 0,
      "smartstoreChannelProductNo": 0,
      "windowChannelProductNo": 0
    }
  ],
  "standardPurchaseOptionsIds": [
    {
      "originProductNo": 0,
      "standardPurchaseOptionsIds": [
        {
          "optionId": 0,
          "valueName": "string"
        }
      ]
    }
  ]
}
```

리디렉션  
- code : PERMANENT\_REDIRECT

- application/json;charset=UTF-8

- Schema
- Example (auto)

**Schema**

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

- Array [

**name**string

**type**string

**message**string

- ]

**timestamp**string<date-time>

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "type": "string",
      "message": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z"
}
```

잘못된 요청  
- code : BAD\_REQUEST

- application/json;charset=UTF-8

- Schema
- Example (auto)

**Schema**

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

- Array [

**name**string

**type**string

**message**string

- ]

**timestamp**string<date-time>

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "type": "string",
      "message": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z"
}
```

인가되지 않은 요청  
- code : UNAUTHORIZED

- application/json;charset=UTF-8

- Schema
- Example (auto)

**Schema**

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

- Array [

**name**string

**type**string

**message**string

- ]

**timestamp**string<date-time>

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "type": "string",
      "message": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z"
}
```

권한 없음  
- code : FORBIDDEN

- application/json;charset=UTF-8

- Schema
- Example (auto)

**Schema**

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

- Array [

**name**string

**type**string

**message**string

- ]

**timestamp**string<date-time>

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "type": "string",
      "message": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z"
}
```

데이터 없음  
- code : NOT\_FOUND

- application/json;charset=UTF-8

- Schema
- Example (auto)

**Schema**

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

- Array [

**name**string

**type**string

**message**string

- ]

**timestamp**string<date-time>

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "type": "string",
      "message": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z"
}
```

내부 서버 오류  
- code : INTERNAL\_SERVER\_ERROR

- application/json;charset=UTF-8

- Schema
- Example (auto)

**Schema**

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

- Array [

**name**string

**type**string

**message**string

- ]

**timestamp**string<date-time>

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "type": "string",
      "message": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z"
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
curl -L 'https://api.commerce.naver.com/external/v2/standard-group-products/status' \
-H 'Accept: application/json;charset=UTF-8' \
-H 'Authorization: Bearer <token>'
```

Request Collapse all

Base URL

Edit

https://api.commerce.naver.com/external

Auth

Bearer Token

ParametersShow optional parameters

type — query

---CREATEUPDATE

requestId — query
