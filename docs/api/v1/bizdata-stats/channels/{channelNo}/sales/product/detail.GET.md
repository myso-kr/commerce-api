---
doc-id: "v1-bizdata-stats-channels-channelNo-sales-product-detail-get"
title: "상품 성과 API"
description: "[브랜드스토어 전용] 상품별 결제 데이터를 결제액 기준 상위 1000개 제공합니다."
type: api-endpoint
method: GET
path: /v1/bizdata-stats/channels/{channelNo}/sales/product/detail
base-url: https://api.commerce.naver.com/external
category: API데이터솔루션
tags:
  - get
  - stats
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/product-unit-report-using-get-bizdata-stats
---

# 상품 성과 API



```
> **GET** `https://api.commerce.naver.com/external/v1/bizdata-stats/channels/{channelNo}/sales/product/detail`
```

[브랜드스토어 전용] 상품별 결제 데이터를 결제액 기준 상위 1000개 제공합니다.

## Request

**GET** `/v1/bizdata-stats/channels/{channelNo}/sales/product/detail`
### Path Parameters

**channelNo** stringrequired

조회 채널 번호

### Query Parameters

**startDate** stringrequired

조회 시작일

**endDate** stringrequired

조회 종료일

**sort** string

sort

**Possible values:** [`numPurchase`, `payAmount`, `productQuantity`, `refundNumPurchase`, `refundPayAmount`, `refundProductQuantity`]

## Responses

**GET** `/v1/bizdata-stats/channels/{channelNo}/sales/product/detail` — 응답
OK

- \*/\*



**productUnitReport** ProductUnitRow (object)[]

**detailCategory**string

세카테고리

**largeCategory**string

대카테고리

**middleCategory**string

중카테고리

**numPurchases**number<double>

결제 수

**orderCouponDiscountAmount**number<double>

주문 쿠폰

**payAmount**number<double>

결제 금액

**payAmountOnMobile**number<double>

모바일 결제 금액

**productCouponDiscountAmount**number<double>

상품쿠폰

**productId**string

상품 ID

**productName**string

상품명

**productQuantity**number<double>

결제 상품 수량

**productQuantityOnMobile**number<double>

모바일 결제 상품 수량

**refundNumPurchases**number<double>

환불 건수

**refundPayAmount**number<double>

환불 금액

**refundProductQuantity**number<double>

환불 수량

**smallCategory**string

소카테고리

```json
{
  "productUnitReport": [
    {
      "detailCategory": "string",
      "largeCategory": "string",
      "middleCategory": "string",
      "numPurchases": 0,
      "orderCouponDiscountAmount": 0,
      "payAmount": 0,
      "payAmountOnMobile": 0,
      "productCouponDiscountAmount": 0,
      "productId": "string",
      "productName": "string",
      "productQuantity": 0,
      "productQuantityOnMobile": 0,
      "refundNumPurchases": 0,
      "refundPayAmount": 0,
      "refundProductQuantity": 0,
      "smallCategory": "string"
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
curl -L 'https://api.commerce.naver.com/external/v1/bizdata-stats/channels/:channelNo/sales/product/detail' \
-H 'Accept: */*' \
-H 'Authorization: Bearer <token>'
```




https://api.commerce.naver.com/external



Parameters

channelNo — pathrequired

startDate — queryrequired

endDate — queryrequired

Show optional parameters

sort — query

---numPurchasepayAmountproductQuantityrefundNumPurchaserefundPayAmountrefundProductQuantity
