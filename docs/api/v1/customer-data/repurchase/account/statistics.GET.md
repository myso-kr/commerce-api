---
doc-id: "v1-customer-data-repurchase-account-statistics-get"
title: "재구매 통계 API"
description: "[브랜드스토어 전용] 스토어의 주별 재구매 데이터를 제공합니다. 매주 월요일에 지난주 데이터가 생성됩니다. API 호출 시 반드시 월요일이 포함되어 있어야 데이터가 정상적으로 호출됩니다."
type: api-endpoint
method: GET
path: /v1/customer-data/repurchase/account/statistics
base-url: https://api.commerce.naver.com/external
category: API데이터솔루션
tags:
  - get
  - stats
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-repurchase-data-insight
---

# 재구매 통계 API



```
> **GET** `https://api.commerce.naver.com/external/v1/customer-data/repurchase/account/statistics`
```

[브랜드스토어 전용] 스토어의 주별 재구매 데이터를 제공합니다. 매주 월요일에 지난주 데이터가 생성됩니다. API 호출 시 반드시 월요일이 포함되어 있어야 데이터가 정상적으로 호출됩니다.

## Request

**GET** `/v1/customer-data/repurchase/account/statistics`
### Query Parameters

**startDate** string<yyyy-MM-dd>required

조회 시작일. 최대 18개월 전.

**Example:** 2023-01-01

**endDate** string<yyyy-MM-dd>required

조회 종료일. 최소 1일 전.

**Example:** 2023-01-01

## Responses

**GET** `/v1/customer-data/repurchase/account/statistics` — 응답
OK

**aggregateDate**stringrequired

집계일. yyyy-MM-dd 형식.

**periodType**stringrequired

집계 기간. `weekly`, `daily`.

**purchaseAmount**integer<int64>required

구매 금액

**purchaseAmountRatio**number<double>required

구매 금액 비율

**purchaseCustomerCount**integer<int64>required

**purchaseCustomerRatio**number<double>required

**repurchaseAmount**integer<int64>required

재구매 금액

**repurchaseAmountRatio**number<double>required

재구매 금액 비율

**repurchaseCustomerCount**integer<int64>required

**repurchaseCustomerRatio**number<double>required

**accountNo**integer<int64>required

```json
[
  {
    "aggregateDate": "string",
    "periodType": "string",
    "purchaseAmount": 0,
    "purchaseAmountRatio": 0,
    "purchaseCustomerCount": 0,
    "purchaseCustomerRatio": 0,
    "repurchaseAmount": 0,
    "repurchaseAmountRatio": 0,
    "repurchaseCustomerCount": 0,
    "repurchaseCustomerRatio": 0,
    "accountNo": 0
  }
]
```

Bad request

**code**stringrequired

**message**stringrequired

**debugMessage**stringrequired

**invalidInputs** GWInvalidDetail.data-insight (object)[]required

**name**stringrequired

**message**stringrequired

**type**stringrequired

**timestamp**string<date-time>required

**traceId**stringrequired

```json
{
  "code": "string",
  "message": "string",
  "debugMessage": "string",
  "invalidInputs": [
    {
      "name": "string",
      "message": "string",
      "type": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z",
  "traceId": "string"
}
```

Unauthorized

**code**stringrequired

**message**stringrequired

**debugMessage**stringrequired

**invalidInputs** GWInvalidDetail.data-insight (object)[]required

**name**stringrequired

**message**stringrequired

**type**stringrequired

**timestamp**string<date-time>required

**traceId**stringrequired

```json
{
  "code": "string",
  "message": "string",
  "debugMessage": "string",
  "invalidInputs": [
    {
      "name": "string",
      "message": "string",
      "type": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z",
  "traceId": "string"
}
```

Not found

**code**stringrequired

**message**stringrequired

**debugMessage**stringrequired

**invalidInputs** GWInvalidDetail.data-insight (object)[]required

**name**stringrequired

**message**stringrequired

**type**stringrequired

**timestamp**string<date-time>required

**traceId**stringrequired

```json
{
  "code": "string",
  "message": "string",
  "debugMessage": "string",
  "invalidInputs": [
    {
      "name": "string",
      "message": "string",
      "type": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z",
  "traceId": "string"
}
```

Internal Server Error

**code**stringrequired

**message**stringrequired

**debugMessage**stringrequired

**invalidInputs** GWInvalidDetail.data-insight (object)[]required

**name**stringrequired

**message**stringrequired

**type**stringrequired

**timestamp**string<date-time>required

**traceId**stringrequired

```json
{
  "code": "string",
  "message": "string",
  "debugMessage": "string",
  "invalidInputs": [
    {
      "name": "string",
      "message": "string",
      "type": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z",
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
curl -L 'https://api.commerce.naver.com/external/v1/customer-data/repurchase/account/statistics' \
-H 'Accept: application/json;charset=UTF-8' \
-H 'Authorization: Bearer <token>'
```




https://api.commerce.naver.com/external



Parameters

startDate — queryrequired

endDate — queryrequired
