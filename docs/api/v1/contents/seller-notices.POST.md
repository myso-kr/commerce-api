---
doc-id: "v1-contents-seller-notices-post"
title: "공지사항 등록"
description: "postCategoryType공지사항 유형 (string)"
type: api-endpoint
method: POST
path: /v1/contents/seller-notices
base-url: https://api.commerce.naver.com/external
category: 문의
tags:
  - inquiry
  - post
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/create-post-contents
---

# 공지사항 등록



```
> **POST** `https://api.commerce.naver.com/external/v1/contents/seller-notices`
```

## Request

**POST** `/v1/contents/seller-notices`
### Body**required**

**postCategoryType**공지사항 유형 (string)

- ORDINARY(일반), EVENT(이벤트), DELIVERY(배송 지연), PRODUCT(상품)
- 미입력 시 `ORDINARY(일반)` 유형으로 등록됩니다.

**Possible values:** [`ORDINARY`, `EVENT`, `DELIVERY`, `PRODUCT`]

**title**공지사항 제목 (string)required

**importantNotice**중요 공지사항 여부 (boolean)

중요 공지사항으로 등록 가능합니다. 미입력 시 false로 저장됩니다.

**importantNoticeStartDate**중요 공지 시작 일시 (string<date-time>)

- 공지사항 등록/수정 시: 입력한 시각의 00분으로 설정됩니다.
  - 중요 공지사항 여부를 true로 설정 후 입력이 가능 합니다.
- 공지사항 조회 시: KST 기준으로 출력됩니다.

**Example:** `2023-04-18T14:25:05.140+09:00`

**importantNoticeEndDate**중요 공지 종료 일시 (string<date-time>)

- 공지사항 등록/수정 시: 입력한 시각의 59분으로 설정됩니다.
  - 중요 공지사항 여부를 true로 설정 후 입력이 가능 합니다.
- 공지사항 조회 시: KST 기준으로 출력됩니다.

**Example:** `2023-04-18T14:25:05.141+09:00`

**wholeNotice**전체 공지사항 여부 (boolean)

전체 공지사항으로 등록 가능합니다. 단, 기존에 설정되어 있던 전체 공지사항은 해제됩니다(1건만 등록 가능). 미입력 시 false로 저장됩니다.

**displayStartDate**전시 시작 일시 (string<date-time>)

- 공지사항 등록/수정 시: 입력한 시각의 00분으로 설정됩니다.
  - 미입력 시 현재 시각의 00분으로 저장됩니다.(예: 2022-09-02 16:00:00)
- 공지사항 조회 시: KST 기준으로 출력됩니다.

**Example:** `2023-04-18T14:25:05.143+09:00`

**displayEndDate**전시 종료 일시 (string<date-time>)

- 공지사항 등록/수정 시: 입력한 시각의 59분으로 설정됩니다.
  - 공지사항 조회 시: KST 기준으로 출력됩니다.

**Example:** `2023-04-18T14:25:05.144+09:00`

**popup**팝업 여부 (boolean)

스토어의 팝업 여부를 나타냅니다. 단, 기존에 설정되어 있던 팝업 공지사항은 해제됩니다(1건만 등록 가능). 미입력 시 false로 저장됩니다.

**popupStartDate**팝업 시작 일시 (string<date-time>)

- 공지사항 등록/수정 시: 입력한 시각의 00분으로 설정됩니다.
  - 팝업 여부를 true로 설정 후 팝업 시작 일시 미입력 시 현재 시각의 00분으로 저장됩니다.(예: 2022-09-02 16:00:00)
- 공지사항 조회 시: KST 기준으로 출력됩니다.

**Example:** `2023-04-18T14:25:05.145+09:00`

**popupEndDate**팝업 종료 일시 (string<date-time>)

- 공지사항 등록/수정 시: 입력한 시각의 59분으로 설정됩니다.
  - 팝업 여부를 true로 설정 후 팝업 종료 일시 미입력 시 일주일 후 현재 시각의 59분으로 저장됩니다.(예: 2022-09-09 16:59:59)
- 공지사항 조회 시: KST 기준으로 출력됩니다.

**Example:** `2023-04-18T14:25:05.146+09:00`

**detailContents**공지사항 내용 (string)required

## Responses

**POST** `/v1/contents/seller-notices` — 응답
성공

**sellerNoticeId**공지사항 ID (integer<int64>)

```json
{
  "sellerNoticeId": 0
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
curl -L 'https://api.commerce.naver.com/external/v1/contents/seller-notices' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{
  "postCategoryType": "ORDINARY",
  "title": "string",
  "importantNotice": true,
  "importantNoticeStartDate": "2023-04-18T14:25:05.140+09:00",
  "importantNoticeEndDate": "2023-04-18T14:25:05.141+09:00",
  "wholeNotice": true,
  "displayStartDate": "2023-04-18T14:25:05.143+09:00",
  "displayEndDate": "2023-04-18T14:25:05.144+09:00",
  "popup": true,
  "popupStartDate": "2023-04-18T14:25:05.145+09:00",
  "popupEndDate": "2023-04-18T14:25:05.146+09:00",
  "detailContents": "string"
}'
```




https://api.commerce.naver.com/external



Body required

```json
{
  "postCategoryType": "ORDINARY",
  "title": "string",
  "importantNotice": true,
  "importantNoticeStartDate": "2023-04-18T14:25:05.140+09:00",
  "importantNoticeEndDate": "2023-04-18T14:25:05.141+09:00",
  "wholeNotice": true,
  "displayStartDate": "2023-04-18T14:25:05.143+09:00",
  "displayEndDate": "2023-04-18T14:25:05.144+09:00",
  "popup": true,
  "popupStartDate": "2023-04-18T14:25:05.145+09:00",
  "popupEndDate": "2023-04-18T14:25:05.146+09:00",
  "detailContents": "string"
}
```
