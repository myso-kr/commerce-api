---
doc-id: "v1-bizdata-stats-channels-channelNo-sales-hourly-detail-get"
title: "판매 성과 API"
description: "[브랜드스토어 전용] 시간대별 스토어의 주요 거래 데이터를 제공합니다."
type: api-endpoint
method: GET
path: /v1/bizdata-stats/channels/{channelNo}/sales/hourly/detail
base-url: https://api.commerce.naver.com/external
category: API데이터솔루션
tags:
  - get
  - stats
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/sales-report-using-get-bizdata-stats
---

# 판매 성과 API



```
> **GET** `https://api.commerce.naver.com/external/v1/bizdata-stats/channels/{channelNo}/sales/hourly/detail`
```

[브랜드스토어 전용] 시간대별 스토어의 주요 거래 데이터를 제공합니다.

## Request

**GET** `/v1/bizdata-stats/channels/{channelNo}/sales/hourly/detail`
### Path Parameters

**channelNo** stringrequired

조회 채널 번호

### Query Parameters

**startDate** stringrequired

조회 시작일

**endDate** stringrequired

조회 종료일

## Responses

**GET** `/v1/bizdata-stats/channels/{channelNo}/sales/hourly/detail` — 응답
OK

- \*/\*



**rows** SalesHourlyReportRow (object)[]

판매 분석 항목 목록

**date**string

날짜

**deliveryCost**number<double>

배송비

**hour**string

시간

**numPurchases**number<double>

결제 수

**numPurchasesOnMobile**number<double>

모바일 결제 수

**numUsers**number<double>

결제자 수

**payAmount**number<double>

결제 금액

**payAmountOnMobile**number<double>

모바일 결제 금액

**productQuantity**number<double>

결제 상품 수량

**refundNumPurchases**number<double>

환불 건수

**refundPayAmount**number<double>

환불 금액

**refundProductQuantity**number<double>

환불 수량

**subscriptionPayAmount**number<double>

정기구독 결제 금액

```json
{
  "rows": [
    {
      "date": "string",
      "deliveryCost": 0,
      "hour": "string",
      "numPurchases": 0,
      "numPurchasesOnMobile": 0,
      "numUsers": 0,
      "payAmount": 0,
      "payAmountOnMobile": 0,
      "productQuantity": 0,
      "refundNumPurchases": 0,
      "refundPayAmount": 0,
      "refundProductQuantity": 0,
      "subscriptionPayAmount": 0
    }
  ]
}
```

Bad Request

- \*/\*



**code**string

오류 코드

**Possible values:** [`E400S00`, `E400S01`, `E400S02`, `E400S03`, `E400S98`, `E400S99`, `E401A01`, `E403A01`, `E404S00`, `E500A01`, `E500S00`, `E500S99`]

**message**string

오류 메시지

**timestamp**string

오류 시간

**traceId**string

Trace ID

```json
{
  "code": "E400S00",
  "message": "string",
  "timestamp": "string",
  "traceId": "string"
}
```

Unauthorized

- \*/\*



**code**string

오류 코드

**Possible values:** [`E400S00`, `E400S01`, `E400S02`, `E400S03`, `E400S98`, `E400S99`, `E401A01`, `E403A01`, `E404S00`, `E500A01`, `E500S00`, `E500S99`]

**message**string

오류 메시지

**timestamp**string

오류 시간

**traceId**string

Trace ID

```json
{
  "code": "E400S00",
  "message": "string",
  "timestamp": "string",
  "traceId": "string"
}
```

Forbidden

- \*/\*



**code**string

오류 코드

**Possible values:** [`E400S00`, `E400S01`, `E400S02`, `E400S03`, `E400S98`, `E400S99`, `E401A01`, `E403A01`, `E404S00`, `E500A01`, `E500S00`, `E500S99`]

**message**string

오류 메시지

**timestamp**string

오류 시간

**traceId**string

Trace ID

```json
{
  "code": "E400S00",
  "message": "string",
  "timestamp": "string",
  "traceId": "string"
}
```

Internal Server Error

- \*/\*



**code**string

오류 코드

**Possible values:** [`E400S00`, `E400S01`, `E400S02`, `E400S03`, `E400S98`, `E400S99`, `E401A01`, `E403A01`, `E404S00`, `E500A01`, `E500S00`, `E500S99`]

**message**string

오류 메시지

**timestamp**string

오류 시간

**traceId**string

Trace ID

```json
{
  "code": "E400S00",
  "message": "string",
  "timestamp": "string",
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
curl -L 'https://api.commerce.naver.com/external/v1/bizdata-stats/channels/:channelNo/sales/hourly/detail' \
-H 'Accept: */*' \
-H 'Authorization: Bearer <token>'
```




https://api.commerce.naver.com/external



Parameters

channelNo — pathrequired

startDate — queryrequired

endDate — queryrequired
