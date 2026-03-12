---
doc-id: "v2-product-delivery-info-return-delivery-companies-get"
title: "(v2) 반품 택배사 다건 조회"
description: "반품/교환 택배사 코드 목록을 조회합니다. 반품/교환 택배사명 파라미터에 값을 입력하지 않으면 전체 반품/교환 택배사 코드 목록을 조회합니다."
type: api-endpoint
method: GET
path: /v2/product-delivery-info/return-delivery-companies
base-url: https://api.commerce.naver.com/external
category: 기타
tags:
  - get
  - reference
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-return-delivery-company-list-product
---

# (v2) 반품 택배사 다건 조회



```
> **GET** `https://api.commerce.naver.com/external/v2/product-delivery-info/return-delivery-companies`
```

반품/교환 택배사 코드 목록을 조회합니다. 반품/교환 택배사명 파라미터에 값을 입력하지 않으면 전체 반품/교환 택배사 코드 목록을 조회합니다.

## Request

**GET** `/v2/product-delivery-info/return-delivery-companies`
### Query Parameters

**name** string

반품/교환 택배사명. LIKE '반품/교환 택배사명%' 검색

## Responses

**GET** `/v2/product-delivery-info/return-delivery-companies` — 응답
성공

**returnDeliveryCompanies** 반품 택배사 정보 구조체 (object)[]

**id**ID (integer<int64>)

**name**이름 (string)

**returnDeliveryCompanyPriorityType**반품 택배사 우선순위 타입 (string)

**Possible values:** [`PRIMARY`, `SECONDARY_1`, `SECONDARY_2`, `SECONDARY_3`, `SECONDARY_4`, `SECONDARY_5`, `SECONDARY_6`, `SECONDARY_7`, `SECONDARY_8`, `SECONDARY_9`]

```json
{
  "returnDeliveryCompanies": [
    {
      "id": 0,
      "name": "string",
      "returnDeliveryCompanyPriorityType": "PRIMARY"
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
curl -L 'https://api.commerce.naver.com/external/v2/product-delivery-info/return-delivery-companies' \
-H 'Accept: application/json;charset=UTF-8' \
-H 'Authorization: Bearer <token>'
```




https://api.commerce.naver.com/external



ParametersShow optional parameters

name — query
