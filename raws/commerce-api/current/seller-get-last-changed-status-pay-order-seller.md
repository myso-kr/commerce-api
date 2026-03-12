# 변경 상품 주문 내역 조회

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/seller-get-last-changed-status-pay-order-seller

# 변경 상품 주문 내역 조회

```
GET

## /v1/pay-order/seller/product-orders/last-changed-statuses
```

조회 요청 범위의 기준은 변경 일시(date-time)입니다.

조회 종료 일시(lastChangedTo) 값을 생략하면 조회 시작 일시(lastChangedFrom)로부터 이후 24시간의 내역을 조회합니다. 조회 결과는 변경 일시 기준 오름차순으로 정렬되며, 일시가 같으면 상품 주문 번호 기준 오름차순으로 정렬됩니다.

조회 결과는 요청 범위 내에서 최대 300개(또는 limitCount)의 변경된 상품 주문 내역을 제공합니다. 예를 들어 조회 요청 범위 내에 345개의 변경된 상품 주문 내역이 있어도 첫 요청의 응답에는 300개만 제공합니다. 이어서 나머지 45개의 정렬된 데이터를 조회하려면 앞 요청의 응답에 포함된 more 객체의 moreFrom과 moreSequence 값을 다음 요청의 lastChangedFrom과 moreSequence에 각각 입력합니다. 만약 조회 요청 범위 내에 변경된 상품 주문 내역이 300개(또는 limitCount) 이하라면 more 객체는 제공되지 않습니다. 응답의 more 객체의 설명과 예를 참고 바랍니다.

## Request[​](#request "Direct link to Request")

### Query Parameters

**lastChangedFrom** string<date-time>required

조회 시작 일시(inclusive)

**Example:** 2022-04-11T15:21:44.000+09:00

**lastChangedTo** string<date-time>

조회 종료 일시(inclusive). 생략 시 lastChangedFrom으로부터 24시간 후로 자동 지정됩니다.

**lastChangedType** lastChangedType.pay-order-seller (string)

최종 변경 구분

**moreSequence** string

moreSequence 사용법은 API 설명을 참고합니다. 임의의 값 입력 시 예기치 않은 결과가 제공될 수 있습니다.

**limitCount** integer

조회 응답 개수 제한. 생략하거나 300을 초과하는 값을 입력하면 최대 300개의 내역을 제공합니다.

## Responses[​](#responses "Direct link to Responses")

- 200
- 400
- 500

(성공) 변경 상품 주문 내역

- application/json

- Schema
- not\_more
- has\_more

**Schema**

**timestamp**string<date-time>

**Example:** `2023-01-16T17:14:51.794+09:00`

**traceId**stringrequired

**data** object

**count**integerrequired

**more** more.pay-order-seller (object)

일시 범위로 목록을 요청하는 API는 최대 응답 개수를 제한합니다. 만약 응답할 항목의 개수가 최대 응답 개수보다 많으면 최대 응답 개수만큼의 일부만 응답으로 제공됩니다. 요청한 범위 내의 항목을 모두 제공하지 못한 경우 more 객체가 응답에 포함됩니다. more 객체의 moreFrom과 moreSequence 값을 사용해 나머지 항목을 요청할 수 있습니다.
응답 목록은 시간순으로 정렬되어 있습니다. moreFrom 값은 최대 응답 개수 제한 때문에 제공하지 못한 항목 중 첫 항목의 일시를 의미합니다. 이 값을 새로운 조회 요청의 조회 시작 일시로 지정하면 다음 목록을 이어서 조회할 수 있습니다.
이때 같은 일시에 해당하는 항목이 두 개 이상 존재할 수 있기 때문에 같은 일시의 값을 구체적으로 구분하기 위해서 moreSequence 값을 제공합니다. 새로운 요청에서 moreSequence 값을 사용하면 특정 필드 값이 moreSequence 이상인 항목만 제공되어 중복 응답을 피할 수 있습니다.

**moreFrom**string<date-time>

45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**moreSequence**string

20바이트 내외

**lastChangeStatuses** object[]required

이 구조체는 주문건의 변경 상품 주문 정보를 표현하는 구조체입니다.
전체 주문건에서 지정된 조회 조건에 해당하는 주문건을 식별할 수 있는 일부 정보를 표현합니다.

- 이 구조체는 API 호출에 대한 응답으로만 사용합니다.
- 구조체의 객체 1개는 상품주문번호 1개를 표현합니다.

- Array [

**orderId**string

주문 ID. 20바이트 내외

**productOrderId**string

상품 주문 ID. 20바이트 내외

**lastChangedType**lastChangedType.pay-order-seller (string)

최종 변경 구분. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| PAY\_WAITING | 결제 대기 |  |
| PAYED | 결제 완료 |  |
| EXCHANGE\_OPTION | 옵션 변경 | 선물하기 |
| DELIVERY\_ADDRESS\_CHANGED | 배송지 변경 |  |
| GIFT\_RECEIVED | 선물 수락 | 선물하기 |
| CLAIM\_REJECTED | 클레임 철회 |  |
| DISPATCHED | 발송 처리 |  |
| CLAIM\_REQUESTED | 클레임 요청 |  |
| COLLECT\_DONE | 수거 완료 |  |
| CLAIM\_COMPLETED | 클레임 완료 |  |
| PURCHASE\_DECIDED | 구매 확정 |  |
| HOPE\_DELIVERY\_INFO\_CHANGED | 배송 희망일 변경 |  |
| CLAIM\_REDELIVERING | 교환 재배송처리 |  |

**paymentDate**string<date-time>

결제 일시. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**lastChangedDate**string<date-time>

최종 변경 일시. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**productOrderStatus**productOrderStatus.pay-order-seller (string)

상품 주문 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| PAYMENT\_WAITING | 결제 대기 |  |
| PAYED | 결제 완료 |  |
| DELIVERING | 배송 중 |  |
| DELIVERED | 배송 완료 |  |
| PURCHASE\_DECIDED | 구매 확정 |  |
| EXCHANGED | 교환 |  |
| CANCELED | 취소 |  |
| RETURNED | 반품 |  |
| CANCELED\_BY\_NOPAYMENT | 미결제 취소 |  |

**claimType**claimType.pay-order-seller (string)

클레임 구분. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| CANCEL | 취소 |  |
| RETURN | 반품 |  |
| EXCHANGE | 교환 |  |
| PURCHASE\_DECISION\_HOLDBACK | 구매 확정 보류 |  |
| ADMIN\_CANCEL | 직권 취소 |  |

**claimStatus**claimStatus.pay-order-seller (string)

클레임 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| CANCEL\_REQUEST | 취소 요청 |  |
| CANCELING | 취소 처리 중 |  |
| CANCEL\_DONE | 취소 처리 완료 |  |
| CANCEL\_REJECT | 취소 철회 |  |
| RETURN\_REQUEST | 반품 요청 |  |
| EXCHANGE\_REQUEST | 교환 요청 |  |
| COLLECTING | 수거 처리 중 |  |
| COLLECT\_DONE | 수거 완료 |  |
| EXCHANGE\_REDELIVERING | 교환 재배송 중 |  |
| RETURN\_DONE | 반품 완료 |  |
| EXCHANGE\_DONE | 교환 완료 |  |
| RETURN\_REJECT | 반품 철회 |  |
| EXCHANGE\_REJECT | 교환 철회 |  |
| PURCHASE\_DECISION\_HOLDBACK | 구매 확정 보류 |  |
| PURCHASE\_DECISION\_REQUEST | 구매 확정 요청 |  |
| PURCHASE\_DECISION\_HOLDBACK\_RELEASE | 구매 확정 보류 해제 |  |
| ADMIN\_CANCELING | 직권 취소 중 |  |
| ADMIN\_CANCEL\_DONE | 직권 취소 완료 |  |
| ADMIN\_CANCEL\_REJECT | 직권 취소 철회 |  |

**receiverAddressChanged**boolean

배송지 정보 변경 여부. 45바이트 내외

**Default value:** `false`

**giftReceivingStatus**giftReceivingStatus.pay-order-seller (string)

선물 수락 상태 구분. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| WAIT\_FOR\_RECEIVING | 수락 대기(배송지 입력 대기) |  |
| RECEIVED | 수락 완료 |  |

- ]

요청 일시 범위 내에 총 변경 상품 주문 내역이 3건

```json
{
  "timestamp": "2022-05-11T22:27:38.419+09:00",
  "data": {
    "lastChangeStatuses": [
      {
        "productOrderStatus": "PAYMENT_WAITING",
        "productOrderId": "2022051122441251",
        "orderId": "2022051120592121",
        "lastChangedDate": "2022-05-11T21:05:26.000+09:00",
        "lastChangedType": "PAY_WAITING",
        "receiverAddressChanged": false
      },
      {
        "productOrderStatus": "PAYMENT_WAITING",
        "claimType": "CANCEL",
        "claimStatus": "CANCELING",
        "productOrderId": "2022051122442301",
        "orderId": "2022051120593131",
        "lastChangedDate": "2022-05-11T22:05:26.000+09:00",
        "lastChangedType": "CLAIM_REQUESTED",
        "receiverAddressChanged": false
      },
      {
        "productOrderStatus": "PAYED",
        "productOrderId": "2022051122443341",
        "orderId": "2022051120594131",
        "lastChangedDate": "2022-05-11T22:05:27.000+09:00",
        "lastChangedType": "PAYED",
        "receiverAddressChanged": false
      }
    ],
    "count": 3
  }
}
```

요청 일시 범위 내에 변경 상품 주문 내역이 최대값(예: 2) 초과

```json
{
  "timestamp": "2022-05-11T22:27:54.781+09:00",
  "data": {
    "lastChangeStatuses": [
      {
        "productOrderStatus": "PAYMENT_WAITING",
        "productOrderId": "2022051122441251",
        "orderId": "2022051120592121",
        "lastChangedDate": "2022-05-11T21:05:26.000+09:00",
        "lastChangedType": "PAY_WAITING",
        "receiverAddressChanged": false
      },
      {
        "productOrderStatus": "PAYMENT_WAITING",
        "claimType": "CANCEL",
        "claimStatus": "CANCELING",
        "productOrderId": "2022051122442301",
        "orderId": "2022051120593131",
        "lastChangedDate": "2022-05-11T22:05:26.000+09:00",
        "lastChangedType": "CLAIM_REQUESTED",
        "receiverAddressChanged": false
      }
    ],
    "more": {
      "moreFrom": "2022-05-11T22:05:27.000+09:00",
      "moreSequence": "2022051122443341"
    },
    "count": 2
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
curl -L 'https://api.commerce.naver.com/external/v1/pay-order/seller/product-orders/last-changed-statuses' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>'
```

Request Collapse all

Base URL

Edit

https://api.commerce.naver.com/external

Auth

Bearer Token

Parameters

lastChangedFrom — queryrequired

Show optional parameters

lastChangedTo — query

lastChangedType — query

moreSequence — query

limitCount — query
