---
doc-id: "v1-contents-qnas-questionId-put"
title: "상품 문의 답변 등록/수정"
description: "상품 문의의 답변을 등록하거나 수정할 수 있습니다."
type: api-endpoint
method: PUT
path: /v1/contents/qnas/{questionId}
base-url: https://api.commerce.naver.com/external
category: 문의
tags:
  - inquiry
  - put
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/create-or-update-answer-contents
---

# 상품 문의 답변 등록/수정



```
> **PUT** `https://api.commerce.naver.com/external/v1/contents/qnas/{questionId}`
```

상품 문의의 답변을 등록하거나 수정할 수 있습니다.

## Request

**PUT** `/v1/contents/qnas/{questionId}`
### Path Parameters

**questionId** integer<int64>required

상품 문의 ID

### Body**required**

**commentContent**상품 문의 답변 내용 (string)required

## Responses

**PUT** `/v1/contents/qnas/{questionId}` — 응답
성공

잘못된 요청  
- code : BAD_REQUEST

**code**string

**message**string

**invalidInputs** InvalidInput.contents (object)[]

**name**string

**type**string

**message**string

**timestamp**string<date-time>

**Example:** `2025-02-03T22:36:42.137+09:00`

**traceId**string

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
  "timestamp": "2025-02-03T22:36:42.137+09:00",
  "traceId": "string"
}
```

인가되지 않은 요청  
- code : UNAUTHORIZED

**code**string

**message**string

**invalidInputs** InvalidInput.contents (object)[]

**name**string

**type**string

**message**string

**timestamp**string<date-time>

**Example:** `2025-02-03T22:36:42.137+09:00`

**traceId**string

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
  "timestamp": "2025-02-03T22:36:42.137+09:00",
  "traceId": "string"
}
```

권한 없음  
- code : FORBIDDEN

**code**string

**message**string

**invalidInputs** InvalidInput.contents (object)[]

**name**string

**type**string

**message**string

**timestamp**string<date-time>

**Example:** `2025-02-03T22:36:42.137+09:00`

**traceId**string

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
  "timestamp": "2025-02-03T22:36:42.137+09:00",
  "traceId": "string"
}
```

데이터 없음  
- code : NOT_FOUND

**code**string

**message**string

**invalidInputs** InvalidInput.contents (object)[]

**name**string

**type**string

**message**string

**timestamp**string<date-time>

**Example:** `2025-02-03T22:36:42.137+09:00`

**traceId**string

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
  "timestamp": "2025-02-03T22:36:42.137+09:00",
  "traceId": "string"
}
```

내부 서버 오류  
- code : INTERNAL_SERVER_ERROR

**code**string

**message**string

**invalidInputs** InvalidInput.contents (object)[]

**name**string

**type**string

**message**string

**timestamp**string<date-time>

**Example:** `2025-02-03T22:36:42.137+09:00`

**traceId**string

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
  "timestamp": "2025-02-03T22:36:42.137+09:00",
  "traceId": "string"
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
curl -L -X PUT 'https://api.commerce.naver.com/external/v1/contents/qnas/:questionId' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{
  "commentContent": "string"
}'
```




https://api.commerce.naver.com/external



Parameters

questionId — pathrequired

Body required

```json
{
  "commentContent": "string"
}
```
