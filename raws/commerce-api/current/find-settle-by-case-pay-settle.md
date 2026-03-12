# 건별 정산 내역 조회

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/find-settle-by-case-pay-settle

# 건별 정산 내역 조회

```
GET

## /v1/pay-settle/settle/case
```

건별 정산 내역 조회

## Request[​](#request "Direct link to Request")

### Query Parameters

**searchDate** string<date>

조회일

**Example:** 2022-01-01

**orderId** string

주문 번호

**productOrderId** string

상품 주문 번호

**periodType** string

조회 기간 기준

- SETTLE\_CASEBYCASE\_SETTLE\_SCHEDULE\_DATE(정산 예정일)
- SETTLE\_CASEBYCASE\_SETTLE\_BASIS\_DATE(정산 기준일)
- SETTLE\_CASEBYCASE\_SETTLE\_COMPLETE\_DATE(정산 완료일)
- SETTLE\_CASEBYCASE\_PAY\_DATE(결제일)
- SETTLE\_CASEBYCASE\_TAXRETURN\_BASIS\_DATE(세금 신고 기준일)

**Possible values:** [`SETTLE_CASEBYCASE_SETTLE_SCHEDULE_DATE`, `SETTLE_CASEBYCASE_SETTLE_BASIS_DATE`, `SETTLE_CASEBYCASE_SETTLE_COMPLETE_DATE`, `SETTLE_CASEBYCASE_PAY_DATE`, `SETTLE_CASEBYCASE_TAXRETURN_BASIS_DATE`]

**settleDecisionType** string

결제일 구분(periodType 값이 SETTLE\_CASEBYCASE\_PAY\_DATE인 경우)

- SETTLED(정산 확정 건)
- UNSETTLED(정산 미확정 건)
- BEFORE\_CANCEL(정산 전 취소 건)

**Possible values:** [`SETTLED`, `UNSETTLED`, `BEFORE_CANCEL`]

**settleType** string

정산 구분

- NORMAL\_SETTLE\_ORIGINAL(일반정산)
- NORMAL\_SETTLE\_AFTER\_CANCEL(정산 후 취소)
- NORMAL\_SETTLE\_BEFORE\_CANCEL(정산 전 취소)
- QUICK\_SETTLE\_ORIGINAL(빠른정산)
- QUICK\_SETTLE\_CANCEL(빠른정산 회수)
- QUANTITY\_CANCEL\_DEDUCTION(수량 취소 정산(공제))
- QUANTITY\_CANCEL\_RESTORE(수량 취소 정산(환급))
- PURCHASE\_CONFIRM(구매 확정)

**Possible values:** [`NORMAL_SETTLE_ORIGINAL`, `NORMAL_SETTLE_AFTER_CANCEL`, `NORMAL_SETTLE_BEFORE_CANCEL`, `QUICK_SETTLE_ORIGINAL`, `QUICK_SETTLE_CANCEL`, `QUANTITY_CANCEL_DEDUCTION`, `QUANTITY_CANCEL_RESTORE`]

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

**elements** CommerceSettleByCase.pay-settle (object)[]required

- Array [

**settleBasisDate**정산 기준일 (string<date>)nullable

정산 기준일(yyyy-MM-dd)

**settleExpectDate**정산 예정일 (string<date>)nullable

정산 예정일(yyyy-MM-dd)

**settleCompleteDate**정산 완료일 (string<date>)nullable

정산 완료일(yyyy-MM-dd)

**payDate**결제일 (string<date>)nullable

결제일(yyyy-MM-dd)

**orderId**주문 번호 (string)nullable

주문 번호

**productOrderId**상품 주문 번호 (string)nullable

상품 주문 번호, 배송비 번호, 기타 비용 번호

**productOrderType**정산 대상 구분 (string)required

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

**settleType**정산 상태 (string)nullable

정산 상태 구분(정산, 정산 전 취소, 정산 후 취소)

- NORMAL\_SETTLE\_ORIGINAL(일반정산)
- NORMAL\_SETTLE\_AFTER\_CANCEL(정산 후 취소)
- NORMAL\_SETTLE\_BEFORE\_CANCEL(정산 전 취소)
- QUICK\_SETTLE\_ORIGINAL(빠른정산)
- QUICK\_SETTLE\_CANCEL(빠른정산 회수)
- QUANTITY\_CANCEL\_DEDUCTION(수량 취소 정산(공제))
- QUANTITY\_CANCEL\_RESTORE(수량 취소 정산(환급))
- PURCHASE\_CONFIRM(구매 확정)

**Possible values:** [`NORMAL_SETTLE_ORIGINAL`, `NORMAL_SETTLE_AFTER_CANCEL`, `NORMAL_SETTLE_BEFORE_CANCEL`, `QUICK_SETTLE_ORIGINAL`, `QUICK_SETTLE_CANCEL`, `QUANTITY_CANCEL_DEDUCTION`, `QUANTITY_CANCEL_RESTORE`]

**productId**상품 번호 (string)nullable

상품 번호

**productName**상품명 (string)nullable

상품명

**purchaserName**구매자명 (string)nullable

구매자명

**paySettleAmount**결제 정산 금액 (number)required

결제 정산 금액(=정산 기준 금액)

**totalPayCommissionAmount**총 네이버페이 관리 수수료 금액 (number)nullable

총 네이버페이 관리 수수료 금액

**freeInstallmentCommissionAmount**판매자 부담 무이자 할부 수수료 (number)nullable

판매자 부담 무이자 할부 수수료

**sellingInterlockCommissionAmount**매출 연동 수수료 (number)nullable

매출 연동 수수료

**benefitSettleAmount**헤택 금액 (number)required

혜택 정산 금액

**settleExpectAmount**정산 예정 금액 (number)required

정산 예정 금액

**merchantId**가맹점 ID (string)nullable

가맹점 ID

**merchantName**가맹점명 (string)nullable

가맹점명

**contractNo**계약 번호 (string)nullable

계약 번호

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
      "settleExpectDate": "2024-07-29",
      "settleCompleteDate": "2024-07-29",
      "payDate": "2024-07-29",
      "orderId": "string",
      "productOrderId": "string",
      "productOrderType": "PROD_ORDER",
      "settleType": "NORMAL_SETTLE_ORIGINAL",
      "productId": "string",
      "productName": "string",
      "purchaserName": "string",
      "paySettleAmount": 0,
      "totalPayCommissionAmount": 0,
      "freeInstallmentCommissionAmount": 0,
      "sellingInterlockCommissionAmount": 0,
      "benefitSettleAmount": 0,
      "settleExpectAmount": 0,
      "merchantId": "string",
      "merchantName": "string",
      "contractNo": "string"
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
curl -L 'https://api.commerce.naver.com/external/v1/pay-settle/settle/case' \
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

pageNumber — queryrequired

pageSize — queryrequired

Show optional parameters

searchDate — query

orderId — query

productOrderId — query

periodType — query

---SETTLE\_CASEBYCASE\_SETTLE\_SCHEDULE\_DATESETTLE\_CASEBYCASE\_SETTLE\_BASIS\_DATESETTLE\_CASEBYCASE\_SETTLE\_COMPLETE\_DATESETTLE\_CASEBYCASE\_PAY\_DATESETTLE\_CASEBYCASE\_TAXRETURN\_BASIS\_DATE

settleDecisionType — query

---SETTLEDUNSETTLEDBEFORE\_CANCEL

settleType — query

---NORMAL\_SETTLE\_ORIGINALNORMAL\_SETTLE\_AFTER\_CANCELNORMAL\_SETTLE\_BEFORE\_CANCELQUICK\_SETTLE\_ORIGINALQUICK\_SETTLE\_CANCELQUANTITY\_CANCEL\_DEDUCTIONQUANTITY\_CANCEL\_RESTORE
