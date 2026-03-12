# 전체 속성값 단위 조회

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-attribute-value-unit-list-product

# 전체 속성값 단위 조회

```
GET

## /v1/product-attributes/attribute-value-units
```

전체 속성값 단위 조회

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

- Array [

**id**속성값 단위 코드 (string)required

**unitCodeName**속성값 단위명 (string)required

- ]

```json
[
  {
    "id": "string",
    "unitCodeName": "string"
  }
]
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
curl -L 'https://api.commerce.naver.com/external/v1/product-attributes/attribute-value-units' \
-H 'Accept: application/json;charset=UTF-8' \
-H 'Authorization: Bearer <token>'
```

Request Collapse all

Base URL

Edit

https://api.commerce.naver.com/external

Auth

Bearer Token
