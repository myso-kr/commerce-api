---
doc-id: "v1-product-manufacturers-get"
title: "제조사 조회"
description: "name stringrequired"
type: api-endpoint
method: GET
path: /v1/product-manufacturers
base-url: https://api.commerce.naver.com/external
category: 기타
tags:
  - get
  - reference
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-manufacturer-list-product
---

# 제조사 조회



```
> **GET** `https://api.commerce.naver.com/external/v1/product-manufacturers`
```

제조사 조회

## Request

**GET** `/v1/product-manufacturers`
### Query Parameters

**name** stringrequired

검색할 제조사 이름

## Responses

**GET** `/v1/product-manufacturers` — 응답
성공

**id**ID (integer<int64>)

브랜드나 제조사 등의 ID 값

**name**이름 (string)

브랜드나 제조사 등의 이름

```json
[
  {
    "id": 0,
    "name": "string"
  }
]
```

리디렉션  
- code : PERMANENT_REDIRECT

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

**name**string

**type**string

**message**string

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
- code : BAD_REQUEST

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

**name**string

**type**string

**message**string

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

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

**name**string

**type**string

**message**string

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

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

**name**string

**type**string

**message**string

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
- code : NOT_FOUND

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

**name**string

**type**string

**message**string

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
- code : INTERNAL_SERVER_ERROR

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

**name**string

**type**string

**message**string

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



```bash
curl -L 'https://api.commerce.naver.com/external/v1/product-manufacturers' \
-H 'Accept: application/json;charset=UTF-8' \
-H 'Authorization: Bearer <token>'
```




https://api.commerce.naver.com/external



Parameters

name — queryrequired
