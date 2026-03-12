---
doc-id: "v1-product-fashion-models-post"
title: "패션모델 저장"
description: "id패션모델 번호 (integer<int64>)"
type: api-endpoint
method: POST
path: /v1/product-fashion-models
base-url: https://api.commerce.naver.com/external
category: 기타
tags:
  - post
  - reference
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/save-fashion-model-product
---

# 패션모델 저장



```
> **POST** `https://api.commerce.naver.com/external/v1/product-fashion-models`
```

패션모델 저장

## Request

**POST** `/v1/product-fashion-models`
### Body**required**

**id**패션모델 번호 (integer<int64>)

**name**패션모델명 (string)required

**height**패션모델키 (integer<int32>)

**weight**패션모델 몸무게 (integer<int32>)

**top**패션모델 상의 사이즈 (string)

**bottom**패션모델 하의 사이즈 (string)

**shoe**패션모델 신발 사이즈 (string)

**modelImage** 이미지 (object)

**url**이미지 URL (string)required

## Responses

**POST** `/v1/product-fashion-models` — 응답
성공

**id**패션모델 번호 (integer<int64>)

**name**패션모델명 (string)required

**height**패션모델키 (integer<int32>)

**weight**패션모델 몸무게 (integer<int32>)

**top**패션모델 상의 사이즈 (string)

**bottom**패션모델 하의 사이즈 (string)

**shoe**패션모델 신발 사이즈 (string)

**modelImage** 이미지 (object)

**url**이미지 URL (string)required

```json
{
  "id": 0,
  "name": "string",
  "height": 0,
  "weight": 0,
  "top": "string",
  "bottom": "string",
  "shoe": "string",
  "modelImage": {
    "url": "string"
  }
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
curl -L 'https://api.commerce.naver.com/external/v1/product-fashion-models' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json;charset=UTF-8' \
-H 'Authorization: Bearer <token>' \
-d '{
  "id": 0,
  "name": "string",
  "height": 0,
  "weight": 0,
  "top": "string",
  "bottom": "string",
  "shoe": "string",
  "modelImage": {
    "url": "string"
  }
}'
```




https://api.commerce.naver.com/external



Body required

```json
{
  "id": 0,
  "name": "string",
  "height": 0,
  "weight": 0,
  "top": "string",
  "bottom": "string",
  "shoe": "string",
  "modelImage": {
    "url": "string"
  }
}
```
