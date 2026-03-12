---
doc-id: "v1-pay-settle-settle-commission-details-get"
title: "수수료 상세 내역 조회"
description: "searchDate string<date>"
type: api-endpoint
method: GET
path: /v1/pay-settle/settle/commission-details
base-url: https://api.commerce.naver.com/external
category: 정산
tags:
  - get
  - settle
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/find-commission-details-pay-settle
---

# 수수료 상세 내역 조회



```
> **GET** `https://api.commerce.naver.com/external/v1/pay-settle/settle/commission-details`
```

수수료 상세 내역 조회

## Request

**GET** `/v1/pay-settle/settle/commission-details`
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

- SETTLE_CASEBYCASE_SETTLE_SCHEDULE_DATE(정산 예정일)
- SETTLE_CASEBYCASE_SETTLE_BASIS_DATE(정산 기준일)
- SETTLE_CASEBYCASE_SETTLE_COMPLETE_DATE(정산 완료일)
- SETTLE_CASEBYCASE_PAY_DATE(결제일)
- SETTLE_CASEBYCASE_TAXRETURN_BASIS_DATE(세금 신고 기준일)

**Possible values:** [`SETTLE_CASEBYCASE_SETTLE_SCHEDULE_DATE`, `SETTLE_CASEBYCASE_SETTLE_BASIS_DATE`, `SETTLE_CASEBYCASE_SETTLE_COMPLETE_DATE`, `SETTLE_CASEBYCASE_PAY_DATE`, `SETTLE_CASEBYCASE_TAXRETURN_BASIS_DATE`]

**settleDecisionType** string

결제일 구분(periodType 값이 SETTLE_CASEBYCASE_PAY_DATE인 경우)

- SETTLED(정산 확정 건)
- UNSETTLED(정산 미확정 건)
- BEFORE_CANCEL(정산 전 취소 건)

**Possible values:** [`SETTLED`, `UNSETTLED`, `BEFORE_CANCEL`]

**settleType** string

정산 구분

- NORMAL_SETTLE_ORIGINAL(일반정산)
- NORMAL_SETTLE_AFTER_CANCEL(정산 후 취소)
- NORMAL_SETTLE_BEFORE_CANCEL(정산 전 취소)
- QUICK_SETTLE_ORIGINAL(빠른정산)
- QUICK_SETTLE_CANCEL(빠른정산 회수)
- QUANTITY_CANCEL_DEDUCTION(수량 취소 정산(공제))
- QUANTITY_CANCEL_RESTORE(수량 취소 정산(환급))
- PURCHASE_CONFIRM(구매 확정)

**Possible values:** [`NORMAL_SETTLE_ORIGINAL`, `NORMAL_SETTLE_AFTER_CANCEL`, `NORMAL_SETTLE_BEFORE_CANCEL`, `QUICK_SETTLE_ORIGINAL`, `QUICK_SETTLE_CANCEL`, `QUANTITY_CANCEL_DEDUCTION`, `QUANTITY_CANCEL_RESTORE`]

**pageNumber** integer<int32>required

페이지 번호

**Example:** 1

**Possible values:** `>= 1`

**pageSize** integer<int32>required

페이지 크기(1000 이하)

**Example:** 10

**Possible values:** `<= 1000`

## Responses

**GET** `/v1/pay-settle/settle/commission-details` — 응답
OK

**elements** CommerceCommissionDetail.pay-settle (object)[]required

**orderNo**주문 번호 (string)required

주문 번호

**productOrderId**상품 주문 번호 (string)required

상품 주문 번호, 배송비 번호, 기타 비용 번호

**productOrderType**정산 대상 구분 (string)required

정산 대상 구분(상품 주문, 배송비, 기타 비용)

- PROD_ORDER(상품 주문)
- DELIVERY(배송비)
- EXTRAFEE(기타 비용)
- WITHDRAW(결제 수단 출금)
- REFUND(구매자 환불)
- PL_REFUND(후불 결제 환불)
- DEDUCTION_RESTORE(기타 공제 환급)
- PROD_PAY(상품 결제)
- PURCHASE_REVIEW(텍스트 리뷰)
- PREMIUM_PURCHASE_REVIEW(포토/동영상 리뷰)
- REGULAR_PURCHASE_REVIEW(알림받기 동의 회원 리뷰 추가 적립)
- ONE_MONTH_PURCHASE_REVIEW(한 달 사용 텍스트 리뷰)
- ONE_MONTH_PREMIUM_PURCHASE_REVIEW(한 달 사용 포토/동영상 리뷰)
- REVIEW(리뷰 적립)
- ETC_COUPON(기타 할인)
- QUICK_SETTLE(빠른정산)
- QUANTITY_CANCEL(수량 취소)
- DIFFERENCE_SETTLE(차액 정산)
- DEPOSIT_SETTLE(보증금)
- RENTAL_ORDER(렌탈 주문)
- MANUAL_ORDER(수기 주문)
- RENTAL_SCHEDULED_ORDER(월 렌탈료 주문)
- PREFERENTIAL_COMMISSION(우대 수수료 환급)
- POINT_ACCUMULATION(포인트 적립)

**Possible values:** [`PROD_ORDER`, `DELIVERY`, `EXTRAFEE`, `WITHDRAW`, `REFUND`, `PL_REFUND`, `DEDUCTION_RESTORE`, `PROD_PAY`, `PURCHASE_REVIEW`, `PREMIUM_PURCHASE_REVIEW`, `REGULAR_PURCHASE_REVIEW`, `ONE_MONTH_PURCHASE_REVIEW`, `ONE_MONTH_PREMIUM_PURCHASE_REVIEW`, `REVIEW`, `ETC_COUPON`, `QUICK_SETTLE`, `QUANTITY_CANCEL`, `DIFFERENCE_SETTLE`, `DEPOSIT_SETTLE`, `RENTAL_ORDER`, `MANUAL_ORDER`, `RENTAL_SCHEDULED_ORDER`, `PREFERENTIAL_COMMISSION`, `POINT_ACCUMULATION`]

**productId**상품 번호 (string)nullable

상품 번호

**productName**상품명 (string)nullable

상품명

**merchantId**가맹점 ID (string)required

가맹점 ID

**merchantName**가맹점명 (string)required

가맹점명

**purchaserName**구매자명 (string)nullable

구매자명

**settleType**정산 상태 (string)required

정산 상태 구분(정산, 정산 전 취소, 정산 후 취소)

- NORMAL_SETTLE_ORIGINAL(일반정산)
- NORMAL_SETTLE_AFTER_CANCEL(정산 후 취소)
- NORMAL_SETTLE_BEFORE_CANCEL(정산 전 취소)
- QUICK_SETTLE_ORIGINAL(빠른정산)
- QUICK_SETTLE_CANCEL(빠른정산 회수)
- QUANTITY_CANCEL_DEDUCTION(수량 취소 정산(공제))
- QUANTITY_CANCEL_RESTORE(수량 취소 정산(환급))
- PURCHASE_CONFIRM(구매 확정)

**Possible values:** [`NORMAL_SETTLE_ORIGINAL`, `NORMAL_SETTLE_AFTER_CANCEL`, `NORMAL_SETTLE_BEFORE_CANCEL`, `QUICK_SETTLE_ORIGINAL`, `QUICK_SETTLE_CANCEL`, `QUANTITY_CANCEL_DEDUCTION`, `QUANTITY_CANCEL_RESTORE`]

**settleBasisDate**정산 기준일 (string<date>)nullable

정산 기준일(yyyy-MM-dd)

**settleExpectDate**정산 예정일 (string<date>)nullable

정산 예정일(yyyy-MM-dd)

**settleCompleteDate**정산 완료일 (string<date>)nullable

정산 완료일(yyyy-MM-dd)

**taxReturnDate**세금 신고 기준일 (string<date>)nullable

세금 신고 기준일(yyyy-MM-dd)

**commissionBasisAmount**수수료 기준 금액 (number)required

수수료 기준 금액

**commissionType**수수료 타입 (string)required

수수료 타입

- SALE_COMMISSION((구)판매 수수료)
- PAY_COMMISSION(Npay 수수료)
- CHNL_COMMISSION(채널 수수료)
- ISTLM_COMMISSION(무이자 할부 수수료)
- PUBLISHING_COMMISSION(퍼블리싱 수수료)
- INFLOW_COMMISSION(유입 수수료)
- SERVICE_COMMISSION(솔루션 사용료)
- CONTRACT_COMMISSION(계약 수수료)
- PACKAGE_COMMISSION(패키지 사용료)
- PARTNER_COMMISSION(제휴 사용료)
- PURCHASER_COMMISSION(구매자 수수료)
- PRICE_COMPARISON_COMMISSION(가격비교 수수료)
- PLATFORM_COMMISSION(판매 수수료)
- VERTICAL_COMMISSION(버티컬 사용료)

**Possible values:** [`SALE_COMMISSION`, `PAY_COMMISSION`, `CHNL_COMMISSION`, `ISTLM_COMMISSION`, `PUBLISHING_COMMISSION`, `INFLOW_COMMISSION`, `SERVICE_COMMISSION`, `CONTRACT_COMMISSION`, `PACKAGE_COMMISSION`, `PARTNER_COMMISSION`, `PLATFORM_COMMISSION`, `VERTICAL_COMMISSION`, `PURCHASER_COMMISSION`, `PRICE_COMPARISON_COMMISSION`]

**sellingInterlockCommissionType**매출 연동 수수료 타입 (string)nullable

매출 연동 수수료 타입

- NAVER_SHOPPING(네이버쇼핑)
- TOPTOP(탑탑)
- EASY_BOOKING(네이버예약)
- ONEPLUS(원쁠딜)
- SEARCH_ETC(검색>기타)
- LENS(검색>렌즈)
- SHOPPING_SEARCH(검색>쇼핑검색)
- SHOPPING_SEARCH_CATALOG(검색>쇼핑검색카탈로그)
- INTEGRATED_SEARCH(검색>통합검색)
- INTEGRATED_SEARCH_CATALOG(검색>통합검색카탈로그)
- BRAND_SEARCH(광고>브랜드검색)
- SHOPPING_SEARCH_AD(광고>쇼핑검색)
- SHOPPING_BOX(광고>쇼핑박스)
- ONEPLUS_DEAL(광고>원쁠딜)
- DA(광고>DA)
- SA(광고>SA)
- NAVER(기타>네이버)
- NOT_NAVER(기타>네이버외)
- SMART_PLACE(예약)
- BOOK(버티컬>도서)
- LUXURY(버티컬>럭셔리)
- MR(버티컬>미스터)
- PET(버티컬>펫)
- OVERSEA_DIRECT_PURCHASE(패션타운>해외직구)
- VERTICAL_BEST(버티컬>BEST)
- FORYOU(버티컬>FORYOU)
- TOP_TOP(TOPTOP)
- SHOPPING_ETC(쇼핑>기타)
- EXHIBITION(쇼핑>기획전)
- PAN_CONTENTS(쇼핑>메인판컨텐츠)
- BRAND_STORE(쇼핑>브랜드스토어)
- GIFT(쇼핑>선물)
- SHOPPING_LIVE(쇼핑>쇼핑LIVE)
- TALKTALK(쇼핑>톡톡)
- HOT_DEAL(쇼핑>핫딜)
- AITEMS(쇼핑>AiTEMS)
- SHOPPING_BEST(쇼핑>BEST)
- LIVING(윈도>리빙)
- BEAUTY(패션타운>뷰티)
- SHOPPING_WINDOW(윈도>쇼핑)
- ART(윈도>아트)
- KIDS(윈도>키즈)
- FOOD(윈도>푸드)
- PLAY(윈도>플레이)
- BRANCH(장보기>기타)
- VILLAGE_MARKET(장보기>동네시장)
- MART(장보기>마트)
- BRAND_BRANCH(장보기>브랜드직영관)
- MY(MY>기타)
- CART_ZIM_RECENT(MY>장바구니,찜,최근)
- REPURCHASE(MY>재구매)
- PAY(MY>페이)
- SUBSCRIPTION(MY>정기구독)
- FASH_TW(패션타운>패션타운)
- DEPARTMENT_STORE(패션타운>백화점)
- OUTLET(패션타운>아울렛)
- SOHO_STREET(패션타운>소호&스트릿)
- DESIGNER(패션타운>디자이너)
- FASH_TW_BRAND(패션타운>브랜드직영몰)
- CONTRACT_TYPE(계약)
- CAFE(구매자)
- ARRIVAL_GUARANTEE(쇼핑>N배송관)
- SVC_RENTAL(렌탈 솔루션 사용료)
- SVC_REGULAR_SUBSCRIPTION(정기구독 솔루션 사용료)
- SVC_ARRIVAL_GUARANTEE(N배송 솔루션 사용료)
- SVC_SELLER_GUARANTEE(N판매자배송 솔루션 사용료)
- SVC_HOPE_SELLER_GUARANTEE(N희망일배송 솔루션 사용료)
- SVC_N_SHOPPING_CONNECT(쇼핑 커넥트 솔루션 사용료)
- PKG_BRAND_SOLUTION(브랜드솔루션패키지 사용료)
- PATR_AFFILIATE(어필리에이트 사용료)
- N_SHOPPING_SEARCH(검색>N쇼핑검색)
- NPLUS_SEARCH(검색>플러스스토어_검색)
- NPLUS_SEARCH_AD(검색>플러스스토어_검색광고)
- NPLUS_SEARCH_CATEGORY(검색>플러스스토어_카테고리)
- NPLUS_INTEGRATED_SEARCH(검색>통검_플러스스토어_검색)
- SHOPPING_BEST_AD(광고>쇼핑베스트)
- NPLUS_PRODUCT_AD(광고>N+상품광고)
- BRAND_CONNECT(기타>브랜드커넥트)
- SHOPPING_BEST_V2(쇼핑>쇼핑베스트)
- SHOPPING_BEST_TAB(쇼핑>베스트탭)
- TODAY_EVENT(쇼핑>오늘행사)
- TODAY_EVENT_TAB(쇼핑>오늘행사탭)
- COUPON_BENEFIT(쇼핑>쿠폰/혜택)
- SHOPPING_REWARD(쇼핑>슈퍼적립)
- N_CATEGORY(쇼핑>N카테고리)
- SHOPPING_HOME(쇼핑>홈)
- FORYOU_TAB(쇼핑>포유탭)
- FASHION_BEAUTY_TAB(쇼핑>패션뷰티탭)
- INTEGRATED_PROMOTION_TAB(쇼핑>통합프로모션탭)
- CURATION_TAB(쇼핑>큐레이션탭)
- NPLUS_HOME_TAB(쇼핑>플러스스토어_홈탭)
- NPLUS_HOME_FASHION_BEAUTY_TAB(쇼핑>플러스스토어_홈_패션뷰티탭)
- NPLUS_HOME_FORYOU_TAB(쇼핑>플러스스토어_홈_포유탭)
- NPLUS_HOME_CURATION_TAB(쇼핑>플러스스토어_홈_큐레이션탭)
- NPLUS_HOME_INTEGRATED_PROMOTION_TAB(쇼핑>플러스스토어_홈_통프탭)
- NPLUS_HOME_BEST_TAB(쇼핑>플러스스토어_홈_베스트탭)
- NPLUS_HOME_TODAY_EVENT_TAB(쇼핑>플러스스토어_홈_오늘행사탭)
- NPLUS_HOME_ARRIVAL_GUARANTEE_TAB(쇼핑>플러스스토어_홈_N배송탭)
- PAY_HISTORY_TAB(MY>결제탭)
- ZIM_PRODUCT_TAB(MY>찜한상품탭)
- SHOPPING_REVIEW_TAB(MY>쇼핑리뷰탭)
- SHOPPING_WEB_HISTORY(MY>쇼핑웹_구매내역)
- DISCOVER(쇼핑>발견)
- SETTLE_DANAWA(다나와)
- SETTLE_ENURI(에누리)
- NOW_DELIVERY(지금배달>기타)
- NOW_DELIVERY_MART(지금배달>마트)
- NOW_DELIVERY_LOCAL_MARKET(지금배달>동네시장)
- NOW_DELIVERY_BRAND_BRANCH(지금배달>브랜드직영관)
- PLT_SMART_STORE(스마트스토어 판매 수수료)
- PLF_BRAND_STORE(브랜드스토어 판매 수수료)
- PLF_SMART_STORE_MARKETING(스마트스토어 판매자 마케팅 수수료)
- PLF_BRAND_STORE_MARKETING(브랜드스토어 판매자 마케팅 수수료)
- SVC_SUPER_POINT(슈퍼적립 솔루션 사용료)
- TODAY_LAST_DEAL(쇼핑>오늘끝딜)
- NPLUS_TODAY_LAST_DEAL(쇼핑>N+스토어_오늘끝딜탭)
- KURLY_N_MART_HOME(컬리N마트>홈)
- KUR_N_MART(컬리N마트>기타)
- SVC_N_DELIVERY_DIRECT_CONTRACT(네이버 물류직계약 솔루션 사용료)
- VTC_SHOPPING_LIVE(쇼핑라이브 버티컬 사용료)
- VTC_FASHION_TOWN(패션타운 버티컬 사용료)
- VTC_ONE_PLUS_DEAL(원쁠딜 버티컬 사용료)
- VTC_MISTER(미스터 버티컬 사용료)
- HIGHEND(하이엔드)

**Possible values:** [`NAVER_SHOPPING`, `TOPTOP`, `EASY_BOOKING`, `ONEPLUS`, `SEARCH_ETC`, `LENS`, `SHOPPING_SEARCH`, `SHOPPING_SEARCH_CATALOG`, `INTEGRATED_SEARCH`, `INTEGRATED_SEARCH_CATALOG`, `BRAND_SEARCH`, `SHOPPING_SEARCH_AD`, `SHOPPING_BOX`, `ONEPLUS_DEAL`, `DA`, `SA`, `NAVER`, `NOT_NAVER`, `SMART_PLACE`, `BOOK`, `LUXURY`, `MR`, `PET`, `OVERSEA_DIRECT_PURCHASE`, `VERTICAL_BEST`, `FORYOU`, `TOP_TOP`, `SHOPPING_ETC`, `EXHIBITION`, `PAN_CONTENTS`, `BRAND_STORE`, `GIFT`, `SHOPPING_LIVE`, `TALKTALK`, `HOT_DEAL`, `AITEMS`, `SHOPPING_BEST`, `LIVING`, `BEAUTY`, `SHOPPING_WINDOW`, `ART`, `KIDS`, `FOOD`, `PLAY`, `BRANCH`, `VILLAGE_MARKET`, `MART`, `BRAND_BRANCH`, `MY`, `CART_ZIM_RECENT`, `REPURCHASE`, `PAY`, `SUBSCRIPTION`, `FASH_TW`, `DEPARTMENT_STORE`, `OUTLET`, `SOHO_STREET`, `DESIGNER`, `FASH_TW_BRAND`, `ARRIVAL_GUARANTEE`, `N_SHOPPING_SEARCH`, `NPLUS_SEARCH`, `NPLUS_SEARCH_AD`, `NPLUS_SEARCH_CATEGORY`, `NPLUS_INTEGRATED_SEARCH`, `SHOPPING_BEST_AD`, `NPLUS_PRODUCT_AD`, `BRAND_CONNECT`, `SHOPPING_BEST_V2`, `SHOPPING_BEST_TAB`, `TODAY_EVENT`, `TODAY_EVENT_TAB`, `COUPON_BENEFIT`, `SHOPPING_REWARD`, `N_CATEGORY`, `SHOPPING_HOME`, `FORYOU_TAB`, `FASHION_BEAUTY_TAB`, `INTEGRATED_PROMOTION_TAB`, `CURATION_TAB`, `NPLUS_HOME_TAB`, `NPLUS_HOME_FASHION_BEAUTY_TAB`, `NPLUS_HOME_FORYOU_TAB`, `NPLUS_HOME_CURATION_TAB`, `NPLUS_HOME_INTEGRATED_PROMOTION_TAB`, `NPLUS_HOME_BEST_TAB`, `NPLUS_HOME_TODAY_EVENT_TAB`, `NPLUS_HOME_ARRIVAL_GUARANTEE_TAB`, `PAY_HISTORY_TAB`, `ZIM_PRODUCT_TAB`, `SHOPPING_REVIEW_TAB`, `SHOPPING_WEB_HISTORY`, `DISCOVER`, `NOW_DELIVERY`, `NOW_DELIVERY_MART`, `NOW_DELIVERY_LOCAL_MARKET`, `NOW_DELIVERY_BRAND_BRANCH`, `TODAY_LAST_DEAL`, `NPLUS_TODAY_LAST_DEAL`, `VTC_SHOPPING_LIVE`, `VTC_FASHION_TOWN`, `VTC_ONE_PLUS_DEAL`, `VTC_MISTER`, `HIGHEND`, `KURLY_N_MART_HOME`, `KUR_N_MART`, `PLT_SMART_STORE`, `PLF_BRAND_STORE`, `PLF_SMART_STORE_MARKETING`, `PLF_BRAND_STORE_MARKETING`, `SVC_RENTAL`, `SVC_REGULAR_SUBSCRIPTION`, `SVC_ARRIVAL_GUARANTEE`, `SVC_SELLER_GUARANTEE`, `SVC_HOPE_SELLER_GUARANTEE`, `SVC_N_SHOPPING_CONNECT`, `SVC_SUPER_POINT`, `SVC_N_DELIVERY_DIRECT_CONTRACT`, `CONTRACT_TYPE`, `PKG_BRAND_SOLUTION`, `PATR_AFFILIATE`, `CAFE`, `FLEA_MARKET`, `FLEA_MARKET_NAVER`, `FLEA_MARKET_DELIVERY_FEE`, `FLEA_MARKET_NAVER_DELIVERY_FEE`, `SETTLE_DANAWA`, `SETTLE_ENURI`]

**payMeansType**결제 수단 (string)nullable

결제 수단

- PAYMEANS_TYPE_ALL(전체)
- PAYMEANS_TYPE_BANK(실시간 계좌 이체)
- PAYMEANS_TYPE_CCARD(신용카드)
- PAYMEANS_TYPE_CHAMT((구)구매자충전금)
- PAYMEANS_TYPE_CHKAC((구)체크아웃적립금)
- PAYMEANS_TYPE_DON((구)네이버캐쉬)
- PAYMEANS_TYPE_MOBIL(휴대폰 결제)
- PAYMEANS_TYPE_NCASH(네이버페이 포인트·머니)
- PAYMEANS_TYPE_POINT(포인트 결제)
- PAYMEANS_TYPE_VACCT(무통장입금)
- PAYMEANS_TYPE_SKIP(나중에결제)
- PAYMEANS_TYPE_PAYLATER(후불 결제)
- PAYMEANS_TYPE_GIFTCARD(기프트 카드)
- PAYMEANS_TYPE_NONE(주결제 수단 없음)
- PAYMEANS_TYPE_NMP_DISCOUNT(네이버 할인지원금)
- PAYMEANS_TYPE_OVERSEAS_CARD(해외 카드)

**Possible values:** [`PAYMEANS_TYPE_ALL`, `PAYMEANS_TYPE_BANK`, `PAYMEANS_TYPE_CCARD`, `PAYMEANS_TYPE_CHAMT`, `PAYMEANS_TYPE_CHKAC`, `PAYMEANS_TYPE_DON`, `PAYMEANS_TYPE_MOBIL`, `PAYMEANS_TYPE_NCASH`, `PAYMEANS_TYPE_POINT`, `PAYMEANS_TYPE_VACCT`, `PAYMEANS_TYPE_SKIP`, `PAYMEANS_TYPE_PAYLATER`, `PAYMEANS_TYPE_GIFTCARD`, `PAYMEANS_TYPE_NONE`, `PAYMEANS_TYPE_NMP_DISCOUNT`, `PAYMEANS_TYPE_OVERSEAS_CARD`]

**commissionAmount**수수료 금액 (number)required

수수료 금액

**maximumSellingInterlockCommissionAmount**최대 과금 매출 연동 수수료 금액 (number)

최대 과금 매출 연동 수수료 금액

**pagination** Pagination.pay-settle (object)required

**page**integer<int32>

**size**integer<int32>

**totalPages**integer<int32>

**totalElements**integer<int64>

```json
{
  "elements": [
    {
      "orderNo": "string",
      "productOrderId": "string",
      "productOrderType": "PROD_ORDER",
      "productId": "string",
      "productName": "string",
      "merchantId": "string",
      "merchantName": "string",
      "purchaserName": "string",
      "settleType": "NORMAL_SETTLE_ORIGINAL",
      "settleBasisDate": "2024-07-29",
      "settleExpectDate": "2024-07-29",
      "settleCompleteDate": "2024-07-29",
      "taxReturnDate": "2024-07-29",
      "commissionBasisAmount": 0,
      "commissionType": "SALE_COMMISSION",
      "sellingInterlockCommissionType": "NAVER_SHOPPING",
      "payMeansType": "PAYMEANS_TYPE_ALL",
      "commissionAmount": 0,
      "maximumSellingInterlockCommissionAmount": 0
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
curl -L 'https://api.commerce.naver.com/external/v1/pay-settle/settle/commission-details' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>'
```




https://api.commerce.naver.com/external



Parameters

pageNumber — queryrequired

pageSize — queryrequired

Show optional parameters

searchDate — query

orderId — query

productOrderId — query

periodType — query

---SETTLE_CASEBYCASE_SETTLE_SCHEDULE_DATESETTLE_CASEBYCASE_SETTLE_BASIS_DATESETTLE_CASEBYCASE_SETTLE_COMPLETE_DATESETTLE_CASEBYCASE_PAY_DATESETTLE_CASEBYCASE_TAXRETURN_BASIS_DATE

settleDecisionType — query

---SETTLEDUNSETTLEDBEFORE_CANCEL

settleType — query

---NORMAL_SETTLE_ORIGINALNORMAL_SETTLE_AFTER_CANCELNORMAL_SETTLE_BEFORE_CANCELQUICK_SETTLE_ORIGINALQUICK_SETTLE_CANCELQUANTITY_CANCEL_DEDUCTIONQUANTITY_CANCEL_RESTORE
