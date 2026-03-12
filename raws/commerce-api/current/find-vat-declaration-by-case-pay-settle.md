# 건별 부가세 내역 조회

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/find-vat-declaration-by-case-pay-settle

# 건별 부가세 내역 조회

```
GET

## /v1/pay-settle/vat/case
```

건별 부가세 내역 조회

## Request[​](#request "Direct link to Request")

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

## Responses[​](#responses "Direct link to Responses")

- 200
- 400
- 500

OK

- application/json

- Schema
- Example (auto)

**Schema**

**elements** CommerceVatDeclarationByCase.pay-settle (object)[]required

- Array [

**settleBasisDate**정산 기준일 (string<date>)nullable

정산 기준일(yyyy-MM-dd)

**orderId**주문 번호 (string)required

주문 번호

**productOrderId**상품 주문 번호 (string)nullable

상품 주문 번호, 배송비 번호, 기타 비용 번호

**productOrderType**정산 대상 구분 (string)nullable

정산 대상 구분(상품 주문, 배송비, 기타 비용)

- PROD\_ORDER(상품 주문)
- DELIVERY(배송비)
- EXTRAFEE(기타 비용)
- WITHDRAW(결제 수단 출금)
- REFUND(구매자 환불)
- PL\_REFUND(후불 결제 환불)
- DEDUCTION\_RESTORE(기타 공제 환급)
- PROD\_PAY(상품 결제)
- PURCHASE\_REVIEW(텍스트 리뷰)
- PREMIUM\_PURCHASE\_REVIEW(포토/동영상 리뷰)
- REGULAR\_PURCHASE\_REVIEW(알림받기 동의 회원 리뷰 추가 적립)
- ONE\_MONTH\_PURCHASE\_REVIEW(한 달 사용 텍스트 리뷰)
- ONE\_MONTH\_PREMIUM\_PURCHASE\_REVIEW(한 달 사용 포토/동영상 리뷰)
- REVIEW(리뷰 적립)
- ETC\_COUPON(기타 할인)
- QUICK\_SETTLE(빠른정산)
- QUANTITY\_CANCEL(수량 취소)
- DIFFERENCE\_SETTLE(차액 정산)
- DEPOSIT\_SETTLE(보증금)
- RENTAL\_ORDER(렌탈 주문)
- MANUAL\_ORDER(수기 주문)
- RENTAL\_SCHEDULED\_ORDER(월 렌탈료 주문)
- PREFERENTIAL\_COMMISSION(우대 수수료 환급)
- POINT\_ACCUMULATION(포인트 적립)

**Possible values:** [`PROD_ORDER`, `DELIVERY`, `EXTRAFEE`, `WITHDRAW`, `REFUND`, `PL_REFUND`, `DEDUCTION_RESTORE`, `PROD_PAY`, `PURCHASE_REVIEW`, `PREMIUM_PURCHASE_REVIEW`, `REGULAR_PURCHASE_REVIEW`, `ONE_MONTH_PURCHASE_REVIEW`, `ONE_MONTH_PREMIUM_PURCHASE_REVIEW`, `REVIEW`, `ETC_COUPON`, `QUICK_SETTLE`, `QUANTITY_CANCEL`, `DIFFERENCE_SETTLE`, `DEPOSIT_SETTLE`, `RENTAL_ORDER`, `MANUAL_ORDER`, `RENTAL_SCHEDULED_ORDER`, `PREFERENTIAL_COMMISSION`, `POINT_ACCUMULATION`]

**detailType**상세 유형 (string)nullable

상세 유형(결제 수단 정산, 혜택 정산, 공제/환급)

- VOUCH\_DETAIL\_PAYMENT\_SETL(결제 수단 정산)
- VOUCH\_DETAIL\_COUPON\_SETL(혜택 정산)
- VOUCH\_DETAIL\_PRODUCT\_COUPON\_SETL(혜택 정산(상품 할인))
- VOUCH\_DETAIL\_ORDER\_COUPON\_SETL(혜택 정산(스토어 할인))
- VOUCH\_DETAIL\_DLVFEE\_COUPON\_SETL(혜택 정산(배송비 할인))
- VOUCH\_DETAIL\_DDTN\_RSTOR(공제/환급)
- VOUCH\_DETAIL\_RTNDLV(공제/환급(반품 배송비))
- VOUCH\_DETAIL\_ETCDLV(공제/환급(기타))
- VOUCH\_DETAIL\_DCCNCL(공제/환급(복수구매 할인 취소))
- VOUCH\_DETAIL\_DLVREC(공제/환급(배송비 금액 변동))
- VOUCH\_DETAIL\_DLCNCL(공제/환급(배송비 할인 금액 변동))

**Possible values:** [`VOUCH_DETAIL_PAYMENT_SETL`, `VOUCH_DETAIL_PRODUCT_COUPON_SETL`, `VOUCH_DETAIL_ORDER_COUPON_SETL`, `VOUCH_DETAIL_DLVFEE_COUPON_SETL`, `VOUCH_DETAIL_RTNDLV`, `VOUCH_DETAIL_ETCDLV`, `VOUCH_DETAIL_DCCNCL`, `VOUCH_DETAIL_DLVREC`, `VOUCH_DETAIL_DLCNCL`, `VOUCH_DETAIL_COUPON_SETL`, `VOUCH_DETAIL_DDTN_RSTOR`]

**status**상태 (string)nullable

상태(원주문 매출, 주문 취소, 공제/환급, 환급 취소, 수량 취소 정산(공제), 수량 취소 정산(환급))

- VOUCH\_PUBLICATION(원주문 매출)
- VOUCH\_CANCEL(주문 취소)
- VOUCH\_RSTOR\_PUBLICATION(공제/환급)
- VOUCH\_RSTOR\_CANCEL(환급 취소)

**Possible values:** [`VOUCH_PUBLICATION`, `VOUCH_CANCEL`, `VOUCH_RSTOR_PUBLICATION`, `VOUCH_RSTOR_CANCEL`]

**productName**상품명 (string)nullable

상품명

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

- ]

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
      "orderId": "string",
      "productOrderId": "string",
      "productOrderType": "PROD_ORDER",
      "detailType": "VOUCH_DETAIL_PAYMENT_SETL",
      "status": "VOUCH_PUBLICATION",
      "productName": "string",
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

- application/json

- Schema
- Example

**Schema**

**code**stringrequired

오류 코드

**message**stringrequired

오류 메시지

**invalidInputs** InvalidInput.pay-settle (object)[]

잘못 입력된 필드 값

- Array [

**name**stringrequired

필드명

**message**stringrequired

메시지

**type**stringrequired

오류 타입

- ]

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

- application/json

- Schema
- Example

**Schema**

**code**stringrequired

오류 코드

**message**stringrequired

오류 메시지

**invalidInputs** InvalidInput.pay-settle (object)[]

잘못 입력된 필드 값

- Array [

**name**stringrequired

필드명

**message**stringrequired

메시지

**type**stringrequired

오류 타입

- ]

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
curl -L 'https://api.commerce.naver.com/external/v1/pay-settle/vat/case' \
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

startDate — queryrequired

endDate — queryrequired

pageNumber — queryrequired

pageSize — queryrequired
