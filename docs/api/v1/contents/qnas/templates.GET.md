---
doc-id: "v1-contents-qnas-templates-get"
title: "상품 문의 답변 템플릿 목록 조회"
description: "Schema"
type: api-endpoint
method: GET
path: /v1/contents/qnas/templates
base-url: https://api.commerce.naver.com/external
category: 문의
tags:
  - get
  - inquiry
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-comment-templates-contents
---

# 상품 문의 답변 템플릿 목록 조회



```
> **GET** `https://api.commerce.naver.com/external/v1/contents/qnas/templates`
```

## Responses

**GET** `/v1/contents/qnas/templates` — 응답
성공

**questionType**상품 문의 템플릿 유형 (string)

PRODUCT(상품), DELIVERY(배송), RETURN(반품), EXCHANGE(교환), REFUND(환불), ETC(기타)

**Possible values:** [`PRODUCT`, `DELIVERY`, `RETURN`, `EXCHANGE`, `REFUND`, `ETC`]

**subject**제목 (string)

**content**내용 (string)

```json
{
  "questionType": "PRODUCT",
  "subject": "string",
  "content": "string"
}
```

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
curl -L 'https://api.commerce.naver.com/external/v1/contents/qnas/templates' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>'
```




https://api.commerce.naver.com/external
