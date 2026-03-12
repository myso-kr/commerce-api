---
doc-id: "v1-pay-merchant-inquiries-inquiryNo-answer-answerContentId-put"
title: "고객 문의 답변 수정"
description: "inquiryNo integer<int64>required"
type: api-endpoint
method: PUT
path: /v1/pay-merchant/inquiries/{inquiryNo}/answer/{answerContentId}
base-url: https://api.commerce.naver.com/external
category: 기타
tags:
  - put
  - reference
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/update-inquiry-answer-pay-merchant
---

# 고객 문의 답변 수정



```
> **PUT** `https://api.commerce.naver.com/external/v1/pay-merchant/inquiries/{inquiryNo}/answer/{answerContentId}`
```

## Request

**PUT** `/v1/pay-merchant/inquiries/{inquiryNo}/answer/{answerContentId}`
### Path Parameters

**inquiryNo** integer<int64>required

문의 번호

**answerContentId** integer<int64>required

답변 번호

### Body**required**

**answerComment**stringrequired

답변 내용

**Example:** `답변 내용입니다`

**answerTemplateId**string

답변 템플릿 ID

**Example:** `12345`

## Responses

**PUT** `/v1/pay-merchant/inquiries/{inquiryNo}/answer/{answerContentId}` — 응답
OK

**code**string

**message**string

**data** InquiryAnswerId.pay-merchant (object)

**inquiryNo**integer<int64>

문의 번호

**inquiryCommentNo**integer<int64>

답변 번호

**timestamp**string<date-time>

**Example:** `2022-09-15T14:00:15.600+09:00`

**traceId**string

```json
{
  "data": {
    "inquiryNo": 0,
    "inquiryCommentNo": 0
  },
  "code": "string",
  "message": "string",
  "timestamp": "2022-09-15T14:00:15.600+09:00",
  "traceId": "string"
}
```

## Bad Request

---

| 코드 | 설명 |
| --- | --- |
| ERR-NC-101001 | 정상적인 요청이 아닌 경우 |
| ERR-NC-101004 | 문의 번호에 해당하는 문의가 없거나 삭제된 경우 |
| ERR-NC-101005 | 문의가 유효하지 않은 경우 |
| ERR-NC-101007 | 답변 권한이 없는 경우 |
| ERR-NC-101008 | 판매자 번호가 유효하지 않은 경우 |
| ERR-NC-101010 | 해당 문의에 이미 답변이 존재하는 경우 |

**code**string

**message**string

**data**object

**timestamp**string<date-time>

**Example:** `2022-09-15T14:00:15.600+09:00`

**traceId**string

```json
{
                "code": "ERR-NC-101004",
                "message": "문의 번호 123456789에 해당하는 문의가 없습니다.",
                "timestamp": "2022-09-16T16:33:14.300+09:00",
                "traceId": "44c1eec345d4d446"
              }
```

## Internal Server Error

---

| 코드 | 설명 |
| --- | --- |
| ERR-NC-101006 | 서버 내부 오류 |

**code**string

**message**string

**data**object

**timestamp**string<date-time>

**Example:** `2022-09-15T14:00:15.600+09:00`

**traceId**string

```json
{
  "code": "ERR-NC-101006",
  "message": "요청한 API가 정상적으로 수행되지 않았습니다.",
  "timestamp": "2022-09-16T16:33:14.300+09:00",
  "traceId": "44c1eec345d4d446"
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
curl -L -X PUT 'https://api.commerce.naver.com/external/v1/pay-merchant/inquiries/:inquiryNo/answer/:answerContentId' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{
  "answerComment": "답변 내용입니다",
  "answerTemplateId": "12345"
}'
```




https://api.commerce.naver.com/external



Parameters

inquiryNo — pathrequired

answerContentId — pathrequired

Body required

```json
{
  "answerComment": "답변 내용입니다",
  "answerTemplateId": "12345"
}
```
