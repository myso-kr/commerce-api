# 발송 지연 처리

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/seller-delay-dispatch-due-date-pay-order-seller

# 발송 지연 처리

```
POST

## /v1/pay-order/seller/product-orders/:productOrderId/delay
```

특정 상품 주문을 발송 지연 처리합니다.

## Request[​](#request "Direct link to Request")

### Path Parameters

**productOrderId** stringrequired

상품 주문 번호

**Example:** 2022030221117100

- application/json

### Body**required**

string 배열

**dispatchDueDate**string<date-time>

발송 기한

**Example:** `2022-06-05T12:17:35.000+09:00`

**delayedDispatchReason**delayedDispatchReason.pay-order-seller (string)

발송 지연 사유 코드. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| PRODUCT\_PREPARE | 상품 준비 중 |  |
| CUSTOMER\_REQUEST | 고객 요청 |  |
| CUSTOM\_BUILD | 주문 제작 |  |
| RESERVED\_DISPATCH | 예약 발송 |  |
| OVERSEA\_DELIVERY | 해외 배송 |  |
| ETC | 기타 |  |

**Example:** `PRODUCT_PREPARE`

**dispatchDelayedDetailedReason**string

발송 지연 상세 사유

**Example:** `상품 준비중입니다.`

## Responses[​](#responses "Direct link to Responses")

- 200
- 400
- 500

(성공/실패) 상품 주문 처리 내역

- application/json

- Schema
- Example (auto)

**Schema**

**timestamp**string<date-time>

**Example:** `2023-01-16T17:14:51.794+09:00`

**traceId**stringrequired

**data** object

**successProductOrderIds**string[]

(성공) 상품 주문 번호

**failProductOrderInfos** object[]

- Array [

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

- ]

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

- application/json

- Schema
- Example (auto)

**Schema**

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

- application/json

- Schema
- Example (auto)

**Schema**

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

#### Authorization: oauth2

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

- curl
- java
- python
- php
- nodejs
- csharp
- kotlin

- CURL

```bash
curl -L 'https://api.commerce.naver.com/external/v1/pay-order/seller/product-orders/:productOrderId/delay' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{
  "dispatchDueDate": "2022-06-05T12:17:35.000+09:00",
  "delayedDispatchReason": "PRODUCT_PREPARE",
  "dispatchDelayedDetailedReason": "상품 준비중입니다."
}'
```

Request Collapse all

Base URL

Edit

https://api.commerce.naver.com/external

Auth

Bearer Token

Parameters

productOrderId — pathrequired

Body required

```json
{
  "dispatchDueDate": "2022-06-05T12:17:35.000+09:00",
  "delayedDispatchReason": "PRODUCT_PREPARE",
  "dispatchDelayedDetailedReason": "상품 준비중입니다."
}
```
