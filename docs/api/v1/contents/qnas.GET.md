---
doc-id: "v1-contents-qnas-get"
title: "상품 문의 목록 조회"
description: "page integer<int32>"
type: api-endpoint
method: GET
path: /v1/contents/qnas
base-url: https://api.commerce.naver.com/external
category: 문의
tags:
  - get
  - inquiry
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-comments-contents
---

# 상품 문의 목록 조회



```
> **GET** `https://api.commerce.naver.com/external/v1/contents/qnas`
```

## Request

**GET** `/v1/contents/qnas`
### Query Parameters

**page** integer<int32>

페이지 번호. 첫 번째 페이지 번호는 1입니다.

**Default value:** `1`

**size** integer<int32>

페이지 크기. 페이지당 최대 100건까지 조회할 수 있습니다.

**Default value:** `100`

**answered** boolean

답변 여부

**fromDate** string<date-time>required

검색 시작 일시

**Example:** 2020-07-25T10:10:10.100Z

**toDate** string<date-time>required

검색 종료 일시

**Example:** 2020-07-25T10:10:10.100Z

## Responses

**GET** `/v1/contents/qnas` — 응답
성공

**contents** 상품 문의 내용 구조체 (object)[]

**createDate**생성 일시 (string<date-time>)

**Example:** `2025-02-03T22:36:42.008+09:00`

**question**문의 내용 (string)

**answer**판매자 답변 내용(여러 개면 최초 답변을 반환) (string)

**answered**판매자 답변 여부 (boolean)

**productId**채널 상품번호 (integer<int64>)

**productName**상품명 (string)

**maskedWriterId**마스킹된 작성자 ID (string)

**questionId**상품 문의 번호 (integer<int64>)

**page**integer<int32>

**size**integer<int32>

**totalElements**integer<int64>

**totalPages**integer<int32>

**sort** PagedResultSort.contents (object)

**sorted**boolean

**fields** PagedResultSortOrder.contents (object)[]

**name**string

**direction**string

**Possible values:** [`asc`, `desc`]

**first**boolean

**last**boolean

```json
{
  "contents": [
    {
      "createDate": "2025-02-03T22:36:42.008+09:00",
      "question": "string",
      "answer": "string",
      "answered": true,
      "productId": 0,
      "productName": "string",
      "maskedWriterId": "string",
      "questionId": 0
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
        "direction": "asc"
      }
    ]
  },
  "first": true,
  "last": true
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
curl -L 'https://api.commerce.naver.com/external/v1/contents/qnas' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>'
```




https://api.commerce.naver.com/external



Parameters

fromDate — queryrequired

toDate — queryrequired

Show optional parameters

page — query

size — query

answered — query

---truefalse
