---
doc-id: "v1-contents-seller-notices-sellerNoticeId-delete"
title: "공지사항 삭제"
description: "입력한 공지사항 번호의 공지사항을 삭제합니다. 단, 상품에 연결된 공지사항은 삭제할 수 없습니다."
type: api-endpoint
method: DELETE
path: /v1/contents/seller-notices/{sellerNoticeId}
base-url: https://api.commerce.naver.com/external
category: 문의
tags:
  - delete
  - inquiry
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/delete-post-contents
---

# 공지사항 삭제



```
> **DELETE** `https://api.commerce.naver.com/external/v1/contents/seller-notices/{sellerNoticeId}`
```

입력한 공지사항 번호의 공지사항을 삭제합니다.   
**단, 상품에 연결된 공지사항은 삭제할 수 없습니다.**

## Request

**DELETE** `/v1/contents/seller-notices/{sellerNoticeId}`
### Path Parameters

**sellerNoticeId** integer<int64>required

공지사항 ID

## Responses

**DELETE** `/v1/contents/seller-notices/{sellerNoticeId}` — 응답
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
curl -L -X DELETE 'https://api.commerce.naver.com/external/v1/contents/seller-notices/:sellerNoticeId' \
-H 'Authorization: Bearer <token>'
```




https://api.commerce.naver.com/external



Parameters

sellerNoticeId — pathrequired
