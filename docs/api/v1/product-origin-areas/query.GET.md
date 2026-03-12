---
doc-id: "v1-product-origin-areas-query-get"
title: "원산지 코드 정보 다건 조회"
description: "원산지 상세 지역명을 입력하거나 원산지 코드를 입력하여 검색할 수 있습니다. 원산지 코드를 입력한 경우 다른 검색 조건은 무시합니다."
type: api-endpoint
method: GET
path: /v1/product-origin-areas/query
base-url: https://api.commerce.naver.com/external
category: 기타
tags:
  - get
  - reference
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-origin-area-list-product
---

# 원산지 코드 정보 다건 조회



```
> **GET** `https://api.commerce.naver.com/external/v1/product-origin-areas/query`
```

원산지 상세 지역명을 입력하거나 원산지 코드를 입력하여 검색할 수 있습니다. 원산지 코드를 입력한 경우 다른 검색 조건은 무시합니다.

## Request

**GET** `/v1/product-origin-areas/query`
### Query Parameters

**name** string

원산지 상세 지역명. code를 입력하지 않은 경우 필수.
아래와 같은 형식으로 입력하면 전체 이름에 매칭되는 원산지가 반환됩니다.

- 국산: 광역시도 > 시구군
- 수입산: 대륙 > 국가명
- 원양산: 해역명
- 기타: 상세 설명에 표시/직접 입력
  마지막 항목(시구군, 국가명, 해역명)으로 조회하면 LIKE '마지막항목%'으로 검색됩니다.

**code** string

원산지 코드. name을 입력하지 않은 경우 필수.

## Responses

**GET** `/v1/product-origin-areas/query` — 응답
성공

**originAreaCodeNames** 코드, 이름 정보 (object)[]

**code**코드 (string)

**name**이름 (string)

```json
{
  "originAreaCodeNames": [
    {
      "code": "string",
      "name": "string"
    }
  ]
}
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
curl -L 'https://api.commerce.naver.com/external/v1/product-origin-areas/query' \
-H 'Accept: application/json;charset=UTF-8' \
-H 'Authorization: Bearer <token>'
```




https://api.commerce.naver.com/external



ParametersShow optional parameters

name — query

code — query
