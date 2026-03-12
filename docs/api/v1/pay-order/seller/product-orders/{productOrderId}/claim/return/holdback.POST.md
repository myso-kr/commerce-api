---
doc-id: "v1-pay-order-seller-product-orders-productOrderId-claim-return-holdback-post"
title: "반품 보류"
description: "1건의 상품 주문에 대한 반품을 보류합니다."
type: api-endpoint
method: POST
path: /v1/pay-order/seller/product-orders/{productOrderId}/claim/return/holdback
base-url: https://api.commerce.naver.com/external
category: 주문
tags:
  - order
  - post
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/seller-holdback-return-pay-order-seller
---

# 반품 보류



```
> **POST** `https://api.commerce.naver.com/external/v1/pay-order/seller/product-orders/{productOrderId}/claim/return/holdback`
```

1건의 상품 주문에 대한 반품을 보류합니다.

## Request

**POST** `/v1/pay-order/seller/product-orders/{productOrderId}/claim/return/holdback`
### Path Parameters

**productOrderId** stringrequired

상품 주문 번호

**Example:** 2022040521691951

### Body**required**

반품 보류 Request Object

**holdbackClassType**holdbackReason.pay-order-seller (string)required

보류 유형. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| RETURN_DELIVERYFEE | 반품 배송비 청구 |  |
| EXTRAFEEE | 추가 비용 청구 |  |
| RETURN_DELIVERYFEE_AND_EXTRAFEEE | 반품 배송비 + 추가 비용 청구 |  |
| RETURN_PRODUCT_NOT_DELIVERED | 반품 상품 미입고 |  |
| ETC | 기타 사유 |  |
| EXCHANGE_DELIVERYFEE | 교환 배송비 청구 |  |
| EXCHANGE_EXTRAFEE | 추가 교환 비용 청구 |  |
| EXCHANGE_PRODUCT_READY | 교환 상품 준비 중 |  |
| EXCHANGE_PRODUCT_NOT_DELIVERED | 교환 상품 미입고 |  |
| EXCHANGE_HOLDBACK | 교환 구매 확정 보류 |  |
| SELLER_CONFIRM_NEED | 판매자 확인 필요 |  |
| PURCHASER_CONFIRM_NEED | 구매자 확인 필요 |  |
| SELLER_REMIT | 판매자 직접 송금 |  |
| ETC2 | 기타 |  |

**holdbackReturnDetailReason**stringrequired

보류 상세 사유

**Example:** `미입고`

**extraReturnFeeAmount**number

기타 반품 비용

**Example:** `0`

## Responses

**POST** `/v1/pay-order/seller/product-orders/{productOrderId}/claim/return/holdback` — 응답
(성공/실패) 상품 주문 처리 내역

**timestamp**string<date-time>

**Example:** `2023-01-16T17:14:51.794+09:00`

**traceId**stringrequired

**data** object

**successProductOrderIds**string[]

(성공) 상품 주문 번호

**failProductOrderInfos** object[]

**productOrderId**string

(실패) 상품 주문 번호

**code**errorCode.pay-order-seller (string)

## 오류 코드 정의

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| **4000** | 잘못된 요청 파라미터 | 오류 유형.객체명.필드명 |
| **9999** | 기타 | 정의되지 않은 오류 코드 |
| **100001** | 상품 주문을 찾을 수 없음 |  |
| **100003** | 주문을 찾을 수 없음 |  |
| **101009** | 처리 권한이 없는 상품 주문 번호를 요청 |  |
| **101011** | 직계약 상품은 물류사만 발주확인 가능 |  |
| **104105** | 발송 기한 입력 범위 초과 |  |
| **104116** | 배송 방법 변경 필요(배송 없음 주문) |  |
| **104117** | 배송 방법 변경 필요 |  |
| **104118** | 택배사 미입력 |  |
| **104119** | 택배사 코드 확인 |  |
| **104120** | 송장 번호 미입력 |  |
| **104121** | 배송 송장 오류(기사용 송장) |  |
| **104122** | 배송 송장 오류(비유효 송장) |  |
| **104131** | 상품 주문 번호 중복 |  |
| **104133** | 잘못된 요청 |  |
| **104417** | 교환 상태 확인 필요(재배송 처리 불가능 주문 상태) |  |
| **104139** | 조회 가능한 날짜 범위를 초과 |  |
| **104441** | 희망일배송 상품 또는 N희망일배송 상품이 아님 |  |
| **104442** | 상품 주문 상태 확인 필요 |  |
| **104443** | 발주 상태 확인 필요 |  |
| **104444** | 배송 희망일 날짜가 유효하지 않음 |  |
| **104445** | 배송 희망일 변경 가능 날짜 초과 |  |
| **104446** | 기존과 동일한 희망일 배송일시 |  |
| **104138** | 배송 희망일 변경 실패 |  |
| **104449** | 배송 희망일 변경 가능 기간 아님 |  |
| **104450** | N희망일배송 상품은 배송희망시간, 지역 입력 불가 |  |
| **105306** | 변경을 요청한 상태가 기존과 동일 |  |
| **105308** | 직계약 상품은 물류사만 발송처리 가능 |  |
| **105001** | E쿠폰 요청 정보의 상품주문번호가 중복되었습니다. |  |
| **105002** | E쿠폰 발송처리의 인증번호가 유효하지 않습니다. |  |

**message**string

(실패) 메시지

```json
{
  "timestamp": "2023-01-16T17:14:51.794+09:00",
  "traceId": "string",
  "data": {
    "successProductOrderIds": [
      "string"
    ],
    "failProductOrderInfos": [
      {
        "productOrderId": "string",
        "code": "string",
        "message": "string"
      }
    ]
  }
}
```

(실패) 잘못된 요청

**code**errorCode.pay-order-seller (string)

## 오류 코드 정의

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| **4000** | 잘못된 요청 파라미터 | 오류 유형.객체명.필드명 |
| **9999** | 기타 | 정의되지 않은 오류 코드 |
| **100001** | 상품 주문을 찾을 수 없음 |  |
| **100003** | 주문을 찾을 수 없음 |  |
| **101009** | 처리 권한이 없는 상품 주문 번호를 요청 |  |
| **101011** | 직계약 상품은 물류사만 발주확인 가능 |  |
| **104105** | 발송 기한 입력 범위 초과 |  |
| **104116** | 배송 방법 변경 필요(배송 없음 주문) |  |
| **104117** | 배송 방법 변경 필요 |  |
| **104118** | 택배사 미입력 |  |
| **104119** | 택배사 코드 확인 |  |
| **104120** | 송장 번호 미입력 |  |
| **104121** | 배송 송장 오류(기사용 송장) |  |
| **104122** | 배송 송장 오류(비유효 송장) |  |
| **104131** | 상품 주문 번호 중복 |  |
| **104133** | 잘못된 요청 |  |
| **104417** | 교환 상태 확인 필요(재배송 처리 불가능 주문 상태) |  |
| **104139** | 조회 가능한 날짜 범위를 초과 |  |
| **104441** | 희망일배송 상품 또는 N희망일배송 상품이 아님 |  |
| **104442** | 상품 주문 상태 확인 필요 |  |
| **104443** | 발주 상태 확인 필요 |  |
| **104444** | 배송 희망일 날짜가 유효하지 않음 |  |
| **104445** | 배송 희망일 변경 가능 날짜 초과 |  |
| **104446** | 기존과 동일한 희망일 배송일시 |  |
| **104138** | 배송 희망일 변경 실패 |  |
| **104449** | 배송 희망일 변경 가능 기간 아님 |  |
| **104450** | N희망일배송 상품은 배송희망시간, 지역 입력 불가 |  |
| **105306** | 변경을 요청한 상태가 기존과 동일 |  |
| **105308** | 직계약 상품은 물류사만 발송처리 가능 |  |
| **105001** | E쿠폰 요청 정보의 상품주문번호가 중복되었습니다. |  |
| **105002** | E쿠폰 발송처리의 인증번호가 유효하지 않습니다. |  |

**message**string

**timestamp**string<date-time>

**Example:** `2023-01-16T17:14:51.794+09:00`

**traceId**stringrequired

```json
{
  "code": "string",
  "message": "string",
  "timestamp": "2023-01-16T17:14:51.794+09:00",
  "traceId": "string"
}
```

(실패) 서버 내부

**code**errorCode.pay-order-seller (string)

## 오류 코드 정의

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| **4000** | 잘못된 요청 파라미터 | 오류 유형.객체명.필드명 |
| **9999** | 기타 | 정의되지 않은 오류 코드 |
| **100001** | 상품 주문을 찾을 수 없음 |  |
| **100003** | 주문을 찾을 수 없음 |  |
| **101009** | 처리 권한이 없는 상품 주문 번호를 요청 |  |
| **101011** | 직계약 상품은 물류사만 발주확인 가능 |  |
| **104105** | 발송 기한 입력 범위 초과 |  |
| **104116** | 배송 방법 변경 필요(배송 없음 주문) |  |
| **104117** | 배송 방법 변경 필요 |  |
| **104118** | 택배사 미입력 |  |
| **104119** | 택배사 코드 확인 |  |
| **104120** | 송장 번호 미입력 |  |
| **104121** | 배송 송장 오류(기사용 송장) |  |
| **104122** | 배송 송장 오류(비유효 송장) |  |
| **104131** | 상품 주문 번호 중복 |  |
| **104133** | 잘못된 요청 |  |
| **104417** | 교환 상태 확인 필요(재배송 처리 불가능 주문 상태) |  |
| **104139** | 조회 가능한 날짜 범위를 초과 |  |
| **104441** | 희망일배송 상품 또는 N희망일배송 상품이 아님 |  |
| **104442** | 상품 주문 상태 확인 필요 |  |
| **104443** | 발주 상태 확인 필요 |  |
| **104444** | 배송 희망일 날짜가 유효하지 않음 |  |
| **104445** | 배송 희망일 변경 가능 날짜 초과 |  |
| **104446** | 기존과 동일한 희망일 배송일시 |  |
| **104138** | 배송 희망일 변경 실패 |  |
| **104449** | 배송 희망일 변경 가능 기간 아님 |  |
| **104450** | N희망일배송 상품은 배송희망시간, 지역 입력 불가 |  |
| **105306** | 변경을 요청한 상태가 기존과 동일 |  |
| **105308** | 직계약 상품은 물류사만 발송처리 가능 |  |
| **105001** | E쿠폰 요청 정보의 상품주문번호가 중복되었습니다. |  |
| **105002** | E쿠폰 발송처리의 인증번호가 유효하지 않습니다. |  |

**message**string

**timestamp**string<date-time>

**Example:** `2023-01-16T17:14:51.794+09:00`

**traceId**stringrequired

```json
{
  "code": "string",
  "message": "string",
  "timestamp": "2023-01-16T17:14:51.794+09:00",
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
curl -L 'https://api.commerce.naver.com/external/v1/pay-order/seller/product-orders/:productOrderId/claim/return/holdback' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{
  "holdbackClassType": "string",
  "holdbackReturnDetailReason": "미입고",
  "extraReturnFeeAmount": 0
}'
```




https://api.commerce.naver.com/external



Parameters

productOrderId — pathrequired

Body required

- Example (from schema)
- ex1

```json
{
  "holdbackClassType": "string",
  "holdbackReturnDetailReason": "미입고",
  "extraReturnFeeAmount": 0
}
```
