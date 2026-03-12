---
doc-id: "v1-product-models-get"
title: "카탈로그 조회"
description: "name stringrequired"
type: api-endpoint
method: GET
path: /v1/product-models
base-url: https://api.commerce.naver.com/external
category: 기타
tags:
  - get
  - reference
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-model-list-product
---

# 카탈로그 조회



```
> **GET** `https://api.commerce.naver.com/external/v1/product-models`
```

카탈로그 조회

## Request

**GET** `/v1/product-models`
### Query Parameters

**name** stringrequired

검색할 카탈로그 이름

**page** integer<int32>

페이지 번호

**Default value:** `1`

**size** integer<int32>

페이지 크기

**Default value:** `100`

## Responses

**GET** `/v1/product-models` — 응답
성공

**contents** 모델 카탈로그 정보 구조체 (object)[]

**wholeCategoryName**전체 카테고리명 (string)

**categoryId**카테고리 ID (string)

**manufacturerCode**제조사 코드 (integer<int64>)

제조사 ID

**manufacturerName**제조사명 (string)

**brandCode**브랜드 코드 (integer<int64>)

브랜드 ID

**brandName**브랜드명 (string)

**id**카탈로그 ID (integer<int64>)

**name**카탈로그명 (string)

**page**페이지 번호 (integer<int32>)

**size**페이지 크기 (integer<int32>)

**totalElements**전체 개수 (integer<int64>)

**totalPages**전체 페이지 수 (integer<int32>)

**sort** 정렬 정보 (object)

정렬 정보

**sorted**데이터 정렬 적용 여부 (boolean)

**fields** 정렬 적용 필드 정보 (object)[]

**name**필드 이름 (string)

**direction**정렬 순서 (string)

- ASC(오름차순), DESC(내림차순)

**Possible values:** [`ASC`, `DESC`]

**first**첫 번째 페이지 여부 (boolean)

**last**마지막 페이지 여부 (boolean)

```json
{
  "contents": [
    {
      "wholeCategoryName": "string",
      "categoryId": "string",
      "manufacturerCode": 0,
      "manufacturerName": "string",
      "brandCode": 0,
      "brandName": "string",
      "id": 0,
      "name": "string"
    }
  ],
  "page": 0,
  "size": 0,
  "totalElements": 0,
  "totalPages": 0,
  "sort": {
    "sorted": true,
    "fields": [
      {
        "name": "string",
        "direction": "ASC"
      }
    ]
  },
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
curl -L 'https://api.commerce.naver.com/external/v1/product-models' \
-H 'Accept: application/json;charset=UTF-8' \
-H 'Authorization: Bearer <token>'
```




https://api.commerce.naver.com/external



Parameters

name — queryrequired

Show optional parameters

page — query

size — query
