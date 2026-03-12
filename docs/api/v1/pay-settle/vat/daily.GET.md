---
doc-id: "v1-pay-settle-vat-daily-get"
title: "일별 부가세 내역 조회"
description: "startDate string<date>required"
type: api-endpoint
method: GET
path: /v1/pay-settle/vat/daily
base-url: https://api.commerce.naver.com/external
category: 정산
tags:
  - get
  - settle
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/find-daily-vat-declaration-pay-settle
---

# 일별 부가세 내역 조회



```
> **GET** `https://api.commerce.naver.com/external/v1/pay-settle/vat/daily`
```

일별 부가세 내역 조회

## Request

**GET** `/v1/pay-settle/vat/daily`
### Query Parameters

**startDate** string<date>required

시작일(전월 말일까지 조회 가능)

**Example:** 2022-01-01

**endDate** string<date>required

종료일(전월 말일까지 조회 가능)

**Example:** 2022-02-01

**pageNumber** integer<int32>required

페이지 번호

**Example:** 1

**Possible values:** `>= 1`

**pageSize** integer<int32>required

페이지 크기(1000 이하)

**Example:** 10

**Possible values:** `<= 1000`

## Responses

**GET** `/v1/pay-settle/vat/daily` — 응답
OK

**elements** CommerceDailyVatDeclaration.pay-settle (object)[]required

**settleBasisDate**정산 기준일 (string<date>)

정산 기준일(yyyy-MM-dd)

**totalSalesAmount**총 매출 금액 (number)required

총 매출 금액

**taxationSalesAmount**과세 매출 금액 (number)required

과세 매출 금액

**taxExemptionSalesAmount**면세 매출 금액 (number)required

면세 매출 금액

**creditCardAmount**신용카드 금액 (number)required

신용카드 금액

**cashInComeDeductionAmount**현금영수증 소득공제 금액 (number)required

현금영수증 소득공제 금액

**cashOutGoingEvidenceAmount**현금영수증 지출 증빙 금액 (number)required

현금영수증 지출 증빙 금액

**cashExclusionIssuanceAmount**현금영수증 발행 제외 금액 (number)required

현금영수증 발행 제외 금액

**otherAmount**기타 금액 (number)required

기타 금액

**merchantId**가맹점 ID (string)nullable

가맹점 ID

**merchantName**가맹점명 (string)nullable

가맹점명

**pagination** Pagination.pay-settle (object)required

**page**integer<int32>

**size**integer<int32>

**totalPages**integer<int32>

**totalElements**integer<int64>

```json
{
  "elements": [
    {
      "settleBasisDate": "2024-07-29",
      "totalSalesAmount": 0,
      "taxationSalesAmount": 0,
      "taxExemptionSalesAmount": 0,
      "creditCardAmount": 0,
      "cashInComeDeductionAmount": 0,
      "cashOutGoingEvidenceAmount": 0,
      "cashExclusionIssuanceAmount": 0,
      "otherAmount": 0,
      "merchantId": "string",
      "merchantName": "string"
    }
  ],
  "pagination": {
    "page": 0,
    "size": 0,
    "totalPages": 0,
    "totalElements": 0
  }
}
```

Bad Request

**code**stringrequired

오류 코드

**message**stringrequired

오류 메시지

**invalidInputs** InvalidInput.pay-settle (object)[]

잘못 입력된 필드 값

**name**stringrequired

필드명

**message**stringrequired

메시지

**type**stringrequired

오류 타입

**timestamp**string<date-time>required

처리 시각

**Example:** `2022-09-15T14:00:15.600+09:00`

**traceId**string

트랜잭션 ID

```json
{
  "code": "BAD_REQUEST",
  "message": "잘못된 요청",
  "invalidInputs": [
    {
      "name": "fieldName",
      "message": "잘못된 값입니다.",
      "type": "typeMismatch"
    }
  ],
  "timestamp": "2022-09-01T12:00:00.000+09:00",
  "traceId": "trace-id"
}
```

Internal Server Error

**code**stringrequired

오류 코드

**message**stringrequired

오류 메시지

**invalidInputs** InvalidInput.pay-settle (object)[]

잘못 입력된 필드 값

**name**stringrequired

필드명

**message**stringrequired

메시지

**type**stringrequired

오류 타입

**timestamp**string<date-time>required

처리 시각

**Example:** `2022-09-15T14:00:15.600+09:00`

**traceId**string

트랜잭션 ID

```json
{
  "code": "INTERNAL_SERVER_ERROR",
  "message": "내부 서버 오류",
  "invalidInputs": [],
  "timestamp": "2022-09-01T12:00:00.000+09:00",
  "traceId": "trace-id"
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
curl -L 'https://api.commerce.naver.com/external/v1/pay-settle/vat/daily' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>'
```




https://api.commerce.naver.com/external



Parameters

startDate — queryrequired

endDate — queryrequired

pageNumber — queryrequired

pageSize — queryrequired
