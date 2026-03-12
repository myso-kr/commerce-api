---
doc-id: "v1-product-images-upload-post"
title: "상품 이미지 다건 등록"
description: "POST multipart/form-data 방식으로 이미지 정보를 전송합니다."
type: api-endpoint
method: POST
path: /v1/product-images/upload
base-url: https://api.commerce.naver.com/external
category: 기타
tags:
  - post
  - reference
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/upload-product
---

# 상품 이미지 다건 등록



```
> **POST** `https://api.commerce.naver.com/external/v1/product-images/upload`
```

POST multipart/form-data 방식으로 이미지 정보를 전송합니다.

## Request

**POST** `/v1/product-images/upload`
- multipart/form-data

### Body

**imageFiles**string<binary>[]required

최대 10개까지 등록 가능. 업로드할 수 있는 이미지의 형식은 JPG, GIF, PNG, BMP입니다.

## Responses

**POST** `/v1/product-images/upload` — 응답
성공

**images** 이미지 (object)[]

**url**이미지 URL (string)required

```json
{
  "images": [
    {
      "url": "string"
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
curl -L -X POST 'https://api.commerce.naver.com/external/v1/product-images/upload' \
-H 'Content-Type: multipart/form-data' \
-H 'Accept: application/json;charset=UTF-8' \
-H 'Authorization: Bearer <token>'
```




https://api.commerce.naver.com/external



Body

imageFilesrequired
