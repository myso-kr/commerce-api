---
doc-id: "v1-bizdata-stats-channels-channelNo-sales-product-search-keyword-by-product-get"
title: "상품/검색 채널 상품별 키워드 API"
description: "[브랜드스토어 전용] 상품별로 판매에 영향을 주는 주요 키워드 데이터 최대 5개를 결제액 기준 상위 10개 상품에 대해 제공합니다."
type: api-endpoint
method: GET
path: /v1/bizdata-stats/channels/{channelNo}/sales/product-search/keyword-by-product
base-url: https://api.commerce.naver.com/external
category: API데이터솔루션
tags:
  - get
  - stats
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/keyword-by-product-report-using-get-bizdata-stats
---

# 상품/검색 채널 상품별 키워드 API



```
> **GET** `https://api.commerce.naver.com/external/v1/bizdata-stats/channels/{channelNo}/sales/product-search/keyword-by-product`
```

[브랜드스토어 전용] 상품별로 판매에 영향을 주는 주요 키워드 데이터 최대 5개를 결제액 기준 상위 10개 상품에 대해 제공합니다.

## Request

**GET** `/v1/bizdata-stats/channels/{channelNo}/sales/product-search/keyword-by-product`
### Path Parameters

**channelNo** stringrequired

조회 채널 번호

### Query Parameters

**startDate** stringrequired

조회 시작일

**endDate** stringrequired

조회 종료일

## Responses

**GET** `/v1/bizdata-stats/channels/{channelNo}/sales/product-search/keyword-by-product` — 응답
OK

- \*/\*



**rows** KeywordByProductReportRow (object)[]

상품/검색 채널 키워드별 상품 분석 항목 목록

**payAmount**number<double>

결제 금액

**productName**string

상품명

**refKeyword**string

키워드

```json
{
  "rows": [
    {
      "payAmount": 0,
      "productName": "string",
      "refKeyword": "string"
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
curl -L 'https://api.commerce.naver.com/external/v1/bizdata-stats/channels/:channelNo/sales/product-search/keyword-by-product' \
-H 'Accept: */*' \
-H 'Authorization: Bearer <token>'
```




https://api.commerce.naver.com/external



Parameters

channelNo — pathrequired

startDate — queryrequired

endDate — queryrequired
