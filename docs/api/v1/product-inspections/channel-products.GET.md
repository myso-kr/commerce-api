---
doc-id: "v1-product-inspections-channel-products-get"
title: "수정 요청 상품 목록을 조회"
description: "상품 검수에서 수정 요청 상품으로 지정한 상품 목록을 조회합니다."
type: api-endpoint
method: GET
path: /v1/product-inspections/channel-products
base-url: https://api.commerce.naver.com/external
category: 기타
tags:
  - get
  - reference
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-inspection-products-request-product
---

# 수정 요청 상품 목록을 조회



```
> **GET** `https://api.commerce.naver.com/external/v1/product-inspections/channel-products`
```

상품 검수에서 수정 요청 상품으로 지정한 상품 목록을 조회합니다.

## Request

**GET** `/v1/product-inspections/channel-products`
### Query Parameters

**page** integer<int32>

조회할 페이지 번호. 기본값은 1

**Default value:** `1`

**size** integer<int32>

페이지 크기. 10, 50, 100만 입력 가능, 기본값은 100

**Default value:** `100`

## Responses

**GET** `/v1/product-inspections/channel-products` — 응답
성공

**contents** ExternalApiInspectionProductVo.product (object)[]

**channelProductNo**채널 상품번호 (integer<int64>)

**reason**사유 (string)

**action**조치 사항 (string)

**restorationRequestAvailable**복원 요청 가능 여부 (boolean)

Y 또는 N. 이미 복원 요청하여 검수 진행 중인 상품의 경우 N을 입력합니다.

**page**integer<int32>

**size**integer<int32>

**totalElements**integer<int32>

**totalPages**integer<int32>

**first**boolean

**last**boolean

```json
{
  "contents": [
    {
      "channelProductNo": 0,
      "reason": "string",
      "action": "string",
      "restorationRequestAvailable": true
    }
  ],
  "page": 0,
  "size": 0,
  "totalElements": 0,
  "totalPages": 0,
  "first": true,
  "last": true
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
curl -L 'https://api.commerce.naver.com/external/v1/product-inspections/channel-products' \
-H 'Accept: application/json;charset=UTF-8' \
-H 'Authorization: Bearer <token>'
```




https://api.commerce.naver.com/external



ParametersShow optional parameters

page — query

size — query
