# 상품 벌크 업데이트

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/bulk-update-origin-product-product

# 상품 벌크 업데이트

```
PUT

## /v1/products/origin-products/bulk-update
```

상품의 특정 항목을 일괄 수정합니다.

## Request[​](#request "Direct link to Request")

- application/json

### Body**required**

**originProductNos**원상품번호 (integer<int64>)[]required

**productBulkUpdateType**벌크 업데이트 종류 (string)

- IMMEDIATE\_DISCOUNT(기본 할인), SALE\_PRICE(판매가), SALE\_PERIOD(판매 기간), DELIVERY(배송 정보), DELIVERY\_ATTRIBUTE(배송 속성), DELIVERY\_HOPE(희망일배송), PURCHASE\_BENEFIT(구매/리뷰 혜택), PURCHASE\_QUANTITY\_LIMIT(구매 수량 제한)

**Possible values:** [`IMMEDIATE_DISCOUNT`, `SALE_PRICE`, `SALE_PERIOD`, `DELIVERY`, `DELIVERY_ATTRIBUTE`, `DELIVERY_HOPE`, `PURCHASE_BENEFIT`, `PURCHASE_QUANTITY_LIMIT`]

**immediateDiscountPolicy** 판매자 기본 할인 정책 (object)

mobileDiscountMethod로 설정한 값은 무시됩니다. 추후 오류 응답이 반환될 수 있으므로 discountMethod를 사용하세요.

**discountMethod** 할인 혜택 (object)

할인 혜택

**value**할인 값 (number)required

할인 단위에 따른 값을 입력합니다.

- 예: 정율 10%이면 10, 정액 100원이면 100

**Possible values:** `>= 1` and `<= 10000000`

**unitType**할인 단위 (string)required

할인 단위 타입. PERCENT, WON만 입력 가능합니다.

- PERCENT(정율), WON(정액)

**Possible values:** [`PERCENT`, `WON`, `YEN`, `COUNT`]

**startDate**할인 시작일 (string<date-time>)

매 시각 00, 10, 20, 30, 40, 50분으로만 설정 가능합니다. 'yyyy-MM-dd'T'HH:mm[:ss][.SSS]XXX' 형식으로 입력합니다.

**endDate**할인 종료일 (string<date-time>)

매 시각 09, 19, 29, 39, 49, 59분으로만 설정 가능합니다. 'yyyy-MM-dd'T'HH:mm[:ss][.SSS]XXX' 형식으로 입력합니다.

**productSalePrice** 판매가 변경 조건 (object)

판매가 정보

**value**변경 금액 (integer<int32>)required

**productSalePriceChangerType**판매가 변경 타입 (string)required

**Possible values:** [`UP`, `DOWN`, `TO`]

**productSalePriceChangerUnitType**판매가 단위 타입 (string)required

PERCENT, WON만 입력 가능합니다.

- PERCENT(정율), WON(정액)

**productSalePeriod** 판매 기간 변경 사항 (object)

판매 기간 정보

**saleStartDate**판매 시작 일시 (string<date-time>)

매 시각 00분으로만 설정 가능합니다. 'yyyy-MM-dd'T'HH:mm[:ss][.SSS]XXX' 형식으로 입력합니다.

**saleEndDate**판매 종료 일시 (string<date-time>)

매 시각 59분으로만 설정 가능합니다. 'yyyy-MM-dd'T'HH:mm[:ss][.SSS]XXX' 형식으로 입력합니다.

**deliveryInfo** 배송 정보 (object)

배송 방식 및 배송비 등을 설정할 수 있습니다. 입력하지 않으면 배송 없는 상품으로 등록됩니다.
렌탈 또는 지금배달 상품의 경우에는 배송 정보를 필수로 입력해야 합니다.

**deliveryType**배송 방법 유형 코드 (string)required

네이버 상품 API에서 배송 방법 유형을 나타내기 위해 사용하는 코드입니다.

- DELIVERY(택배, 소포, 등기), DIRECT(직접배송(화물배달))
- 네이버 풀필먼트 상품, 배송 속성 SELLER\_GUARANTEE(N판매자배송), 배송속성 HOPE\_SELLER\_GUARANTEE(N희망일배송)인 경우 배송 방법은 DELIVERY(택배, 소포, 등기)만 허용됩니다.

**Possible values:** [`DELIVERY`, `DIRECT`]

**deliveryAttributeType**배송 속성 타입 코드 (string)required

네이버 상품 API에서 배송 속성 타입을 나타내기 위해 사용하는 코드입니다.
네이버 풀필먼트 상품은 OPTION\_TODAY(옵션별 오늘출발)을 설정할 수 없습니다.

- 상품 등록/수정 시: NORMAL(일반 배송), TODAY(오늘출발), OPTION\_TODAY(옵션별 오늘출발), HOPE(희망일배송), TODAY\_ARRIVAL(당일배송(지금배달 관련 기능)), DAWN\_ARRIVAL(새벽배송(지금배달 관련 기능)), ARRIVAL\_GUARANTEE(N배송), SELLER\_GUARANTEE(N판매자배송), HOPE\_SELLER\_GUARANTEE(N희망일배송), QUICK(즉시배달(퀵커머스 관련 기능)), PICKUP(픽업(퀵커머스 관련 기능)), QUICK\_PICKUP(배달,픽업(퀵커머스 관련 기능))
- 상품 일괄 수정 시: NORMAL(일반 배송), TODAY(오늘출발), HOPE(희망일배송), SELLER\_GUARANTEE(N판매자배송), HOPE\_SELLER\_GUARANTEE(N희망일배송)
- 렌탈상품 등록/수정 시: NORMAL(일반 배송), HOPE(희망일배송)

**Possible values:** [`NORMAL`, `TODAY`, `OPTION_TODAY`, `HOPE`, `TODAY_ARRIVAL`, `DAWN_ARRIVAL`, `ARRIVAL_GUARANTEE`, `SELLER_GUARANTEE`, `HOPE_SELLER_GUARANTEE`, `QUICK`, `PICKUP`, `QUICK_PICKUP`]

**deliveryCompany**택배사 (string)

DELIVERY(택배, 소포, 등기)일 때 필수 입력

- 주문 > 발주/발송 처리 > 발송 처리 API의 택배사 코드(deliveryCompanyCode)를 참고하여 코드값을 입력합니다.
- 배송 속성이 SELLER\_GUARANTEE(N판매자배송), HOPE\_SELLER\_GUARANTEE(N희망일배송)인 경우 판매자정보 > 판매자 물류 > 물류사 연동 정보 조회API에서 해당하는 deliveryTypes(배송속성)의 logisticsCompanyId(물류사ID)를 상품API의 deliveryCompany(택배사)에 입력합니다.

**outboundLocationId**판매자 창고 ID (string)

배송 속성이 SELLER\_GURANTEE(N판매자배송), HOPE\_SELLER\_GUARANTEE(N희망일배송)인 경우 필수입력이며, 그 밖의 배송속성에 입력된 판매자 창고ID값은 무시됩니다.
판매자정보 > 판매자물류 > 판매자 창고 정보 조회API에서 해당하는 deliveryType(배송속성)의 창고ID를 입력합니다.

**deliveryBundleGroupUsable**묶음배송 가능 여부 (boolean)

묶음배송 그룹 코드가 존재하는 경우 자동으로 true로 설정됩니다.
배송속성이 HOPE\_SELLER\_GUARANTEE(N희망일배송)인 경우 묶음배송 설정이 불가합니다.

**deliveryBundleGroupId**묶음배송 그룹 코드 (integer<int64>)

묶음배송 가능이 true이고 묶음배송 그룹 코드가 null이면 기본 그룹으로 저장됩니다.(배송 속성이 ARRIVAL\_GUARANTEE인 경우 제외)

**quickServiceAreas**string[]

퀵서비스 배송 지역 코드입니다.
네이버 풀필먼트 상품, N희망일배송 상품은 퀵서비스를 설정할 수 없습니다.

- SEOUL(서울 전지역), GYEONGGI(경기 전지역), GOYANG(경기 고양), GOCHON(경기 고촌), GONJIAM(경기 곤지암), GWACHEON(경기 과천), GWANGMYEONG(경기 광명), GYEONGGIGWANGJU(경기 광주), GYOMUN(경기 교문리), GURI(경기 구리), GUSEONG(경기 구성), GUNPO(경기 군포), GIMPO(경기 김포), BUCHEON(경기 부천), BUNDANG(경기 분당), SEONGNAM(경기 성남), SUWON(경기 수원), SUJI(경기 수지), SIHEUNG(경기 시흥), ANSAN(경기 안산), ANYANG(경기 안양), YONGIN(경기 용인), UIWANG(경기 의왕), UIJEONGBU(경기 의정부), ICHEON(경기 이천), ILSAN(경기 일산), JICHUK(경기 지축), PAJU(경기 파주), HANAM(경기 하남), GWANGJU(광주 전지역), DAEGU(대구 전지역), DAEJEON(대전 전지역), BUSAN(부산 전지역), ULSAN(울산 전지역), INCHEON(인천 전지역)

**Possible values:** [`SEOUL`, `GYEONGGI`, `GOYANG`, `GOCHON`, `GONJIAM`, `GWACHEON`, `GWANGMYEONG`, `GYEONGGIGWANGJU`, `GYOMUN`, `GURI`, `GUSEONG`, `GUNPO`, `GIMPO`, `BUCHEON`, `BUNDANG`, `SEONGNAM`, `SUWON`, `SUJI`, `SIHEUNG`, `ANSAN`, `ANYANG`, `YONGIN`, `UIWANG`, `UIJEONGBU`, `ICHEON`, `ILSAN`, `JICHUK`, `PAJU`, `HANAM`, `GWANGJU`, `DAEGU`, `DAEJEON`, `BUSAN`, `ULSAN`, `INCHEON`]

**visitAddressId**방문 수령 주소록 ID (integer<int64>)

방문 수령 주소 코드.
네이버 풀필먼트 상품, N희망일배송 상품은 방문 수령을 설정할 수 없습니다.

**deliveryFee** 배송비 정보 (object)required

배송비 정보

**deliveryFeeType**배송비 타입 (string)

배송비 타입을 입력하지 않으면 FREE(무료)로 설정됩니다.

- FREE(무료), CONDITIONAL\_FREE(조건부 무료), PAID(유료), UNIT\_QUANTITY\_PAID(수량별), RANGE\_QUANTITY\_PAID(구간별)
- 렌탈상품 등록/수정 시: FREE(무료), PAID(유료)

**Possible values:** [`FREE`, `CONDITIONAL_FREE`, `PAID`, `UNIT_QUANTITY_PAID`, `RANGE_QUANTITY_PAID`]

**baseFee**기본 배송비 (integer<int32>)

**Possible values:** `<= 100000`

**freeConditionalAmount**무료 조건 금액 (integer<int32>)

배송비 유형이 '조건부 무료'일 경우 입력합니다.

**Possible values:** `<= 999999990`

**repeatQuantity**기본 배송비 반복 부과 수량 (integer<int32>)

반복 수량. 배송비 유형이 '수량별 부과 - 반복 구간'일 경우 입력합니다.

**secondBaseQuantity**배송비 조건 2구간 수량 (integer<int32>)

2구간 최소 수량. 배송비 유형이 '수량별 부과 - 구간 직접 설정'일 경우 입력합니다.

**secondExtraFee**배송비 조건 2구간 수량 초과 시 추가 배송비 (integer<int32>)

2구간 추가 배송비. 배송비 유형이 '수량별 부과 - 구간 직접 설정'일 경우 입력합니다.

**thirdBaseQuantity**배송비 조건 3구간 수량 (integer<int32>)

3구간 최소 수량. 배송비 유형이 '수량별 부과 - 구간 직접 설정'일 경우 입력합니다.

**thirdExtraFee**배송비 조건 3구간 초과 시 추가 배송비 (integer<int32>)

3구간 추가 배송비. 배송비 유형이 '수량별 부과 - 구간 직접 설정'일 경우 입력합니다.

**deliveryFeePayType**배송비 결제 방식 코드 (string)

네이버 상품 API에서 배송비 결제 방식을 나타내기 위해 사용하는 코드입니다.

- COLLECT(착불), PREPAID(선결제), COLLECT\_OR\_PREPAID(착불 또는 선결제)

**Possible values:** [`COLLECT`, `PREPAID`, `COLLECT_OR_PREPAID`]

**deliveryFeeByArea** 지역별 추가 배송비 (object)

지역별 추가 배송비

**deliveryAreaType**지역별 추가 배송비 권역 코드 (string)required

묶음배송 그룹 등록 시 지역별 추가 배송비 권역을 입력하기 위한 코드입니다.
묶음배송 가능 여부가 true인 경우 묶음배송 그룹에 설정된 값이 적용됩니다.(배송 속성이 ARRIVAL\_GUARANTEE인 경우 제외).

- AREA\_2(내륙/제주 및 도서산간 지역으로 구분(2권역)), AREA\_3(내륙/제주/제주 외 도서산간 지역으로 구분(3권역))

**Possible values:** [`AREA_2`, `AREA_3`]

**area2extraFee**2권역 추가 배송비 (integer<int32>)

2권역인 경우 "제주 및 도서산간" 지역 추가 배송비.
3권역인 경우 "제주" 지역 추가 배송비.
묶음배송 가능 여부가 true인 경우 묶음배송 그룹에 설정된 값이 적용됩니다.(배송 속성이 ARRIVAL\_GUARANTEE인 경우 제외).

**Possible values:** `<= 200000`

**area3extraFee**3권역 추가 배송비 (integer<int32>)

"제주 외 도서산간" 지역 추가 배송비. deliveryAreaType이 3권역인 경우 필수.
묶음배송 가능 여부가 true인 경우 묶음배송 그룹에 설정된 값이 적용됩니다.(배송 속성이 ARRIVAL\_GUARANTEE인 경우 제외).

**Possible values:** `<= 200000`

**differentialFeeByArea**지역별 차등 배송비 정보 (string)

**claimDeliveryInfo** 클레임(반품/교환) 정보 (object)required

클레임(반품/교환) 정보

**returnDeliveryCompanyPriorityType**반품 택배사 우선순위 타입 (string)

미입력 시 '기본 반품 택배사(PRIMARY)'로 설정됩니다.

**Possible values:** [`PRIMARY`, `SECONDARY_1`, `SECONDARY_2`, `SECONDARY_3`, `SECONDARY_4`, `SECONDARY_5`, `SECONDARY_6`, `SECONDARY_7`, `SECONDARY_8`, `SECONDARY_9`]

**returnDeliveryFee**반품 배송비 (integer<int32>)required

**Possible values:** `<= 1000000`

**exchangeDeliveryFee**교환 배송비 (integer<int32>)required

**Possible values:** `<= 1000000`

**shippingAddressId**출고지 주소록 번호 (integer<int64>)

배송 속성이 ARRIVAL\_GUARANTEE(N배송)인 경우 null로 입력합니다.

**returnAddressId**반품/교환지 주소록 번호 (integer<int64>)

**freeReturnInsuranceYn**반품안심케어 설정 (boolean)

**installation**설치 여부 (boolean)

배송 속성이 HOPE\_SELLER\_GUARANTEE(N희망일배송)인 경우에만 필수. 미입력 시 false로 설정됩니다. 그 외 배송 속성에 입력한 경우 무시됩니다.

**installationFee**별도 설치비 유무 (boolean)

설치 여부가 false이면 별도 설치비 유무는 입력한 값에 관계 없이 false로 설정됩니다.

**expectedDeliveryPeriodType**주문 제작 상품 발송 예정일 타입 코드 (string)

ETC는 상품 수정에만 사용 가능하며, 이미 저장된 '주문 후 예상 발송 기간' 값이 존재하거나 '직접 입력형'인 경우 설정 가능합니다.

- ETC(직접 입력형), TWO(선택형: 2일), THREE(선택형: 3일), FOUR(선택형: 4일), FIVE(선택형: 5일), SIX(선택형: 6일), SEVEN(선택형: 7일), EIGHT(선택형: 8일), NINE(선택형: 9일), TEN(선택형: 10일), ELEVEN(선택형: 11일), TWELVE(선택형: 12일), THIRTEEN(선택형: 13일 ), FOURTEEN(선택형: 14일)

**Possible values:** [`ETC`, `TWO`, `THREE`, `FOUR`, `FIVE`, `SIX`, `SEVEN`, `EIGHT`, `NINE`, `TEN`, `ELEVEN`, `TWELVE`, `THIRTEEN`, `FOURTEEN`]

**expectedDeliveryPeriodDirectInput**발송 예정일 직접 입력 값 (string)

**todayStockQuantity**오늘출발 상품 재고 수량 (integer<int32>)

**customProductAfterOrderYn**주문 확인 후 제작 상품 여부 (boolean)

**hopeDeliveryGroupId**희망일배송 그룹 번호 (integer<int64>)

배송 속성 타입 코드가 희망일배송이고 희망일배송 그룹 번호가 Null이면 기본 그룹으로 저장됩니다.

**businessCustomsClearanceSaleYn**사업자 통관 판매 여부 (boolean)

출고지 주소가 해외인 경우에만 적용됩니다. 미입력 시 false로 입력됩니다.

**deliveryAttribute** 배송 속성 정보 요청 (object)

**deliveryAttributeType**배송 속성 타입 코드 (string)required

- NORMAL(일반 배송), TODAY(오늘출발), HOPE(희망일배송)-productBulkUpdateType이 'DELIVERY\_HOPE'인 경우에만 설정 가능

**Possible values:** [`NORMAL`, `TODAY`, `OPTION_TODAY`, `HOPE`, `TODAY_ARRIVAL`, `DAWN_ARRIVAL`, `ARRIVAL_GUARANTEE`, `SELLER_GUARANTEE`, `HOPE_SELLER_GUARANTEE`, `QUICK`, `PICKUP`, `QUICK_PICKUP`]

**todayStockQuantity**오늘출발 상품 재고 수량 (integer<int32>)

**expectedDeliveryPeriodType**주문 제작 상품 발송 예정일 타입 코드 (string)

ETC는 상품 수정에만 사용 가능하며, 이미 저장된 '주문 후 예상 발송 기간' 값이 존재하거나 '직접 입력형'인 경우 설정 가능합니다.

- ETC(직접 입력형), TWO(선택형: 2일), THREE(선택형: 3일), FOUR(선택형: 4일), FIVE(선택형: 5일), SIX(선택형: 6일), SEVEN(선택형: 7일), EIGHT(선택형: 8일), NINE(선택형: 9일), TEN(선택형: 10일), ELEVEN(선택형: 11일), TWELVE(선택형: 12일), THIRTEEN(선택형: 13일 ), FOURTEEN(선택형: 14일)

**Possible values:** [`ETC`, `TWO`, `THREE`, `FOUR`, `FIVE`, `SIX`, `SEVEN`, `EIGHT`, `NINE`, `TEN`, `ELEVEN`, `TWELVE`, `THIRTEEN`, `FOURTEEN`]

**expectedDeliveryPeriodDirectInput**발송 예정일 직접 입력 값 (string)

**customProductAfterOrderYn**주문 확인 후 제작 상품 여부 (boolean)

**hopeDeliveryGroupId**희망일배송 그룹 번호 (integer<int64>)

배송 속성 타입 코드가 희망일배송이고 희망일배송 그룹 번호가 Null이면 기본 그룹으로 저장됩니다.

**purchaseBenefit** 구매/리뷰 혜택 정보 요청 (object)

**multiPurchaseDiscountPolicy** 복수 구매 할인 정책 (object)

판매자 복수 구매 할인 정책

**discountMethod** 복수 구매 할인 혜택 (object)

복수 구매 할인 혜택

**value**할인 값 (number)required

할인 단위에 따른 값을 입력합니다.

- 예: 정율 10%이면 10, 정액 100원이면 100

**Possible values:** `>= 1` and `<= 10000000`

**unitType**할인 단위 (string)required

할인 단위 타입. PERCENT, WON만 입력 가능합니다.

- PERCENT(정율), WON(정액)

**Possible values:** [`PERCENT`, `WON`, `YEN`, `COUNT`]

**startDate**할인 시작일 (string<date>)

복수 구매 할인의 경우 날짜로만 지정됩니다. 'yyyy-MM-dd' 형식으로 입력합니다.

**endDate**할인 종료일 (string<date>)

복수 구매 할인의 경우 날짜로만 지정됩니다. 'yyyy-MM-dd' 형식으로 입력합니다.

**orderValue**주문 금액(수량) 값 (number)required

**orderValueUnitType**주문 금액(수량) 단위 (string)required

COUNT, WON만 입력 가능합니다.

- COUNT(개수), WON(정액)

**Possible values:** [`PERCENT`, `WON`, `YEN`, `COUNT`]

**purchasePointPolicy** 상품 구매 포인트 정책 (object)

판매자 상품 구매 포인트 정책

**value**상품 구매 포인트 값 (number)required

포인트 단위에 따른 값을 입력합니다.

- 예: 정율 10%이면 10, 정액 100원이면 100

**unitType**상품 구매 포인트 단위 (string)required

상품 구매 포인트 단위 타입. PERCENT, WON만 입력 가능합니다.

- PERCENT(정율), WON(정액)

**Possible values:** [`PERCENT`, `WON`, `YEN`, `COUNT`]

**startDate**적립 시작일 (string<date>)

'yyyy-MM-dd' 형식 입력

**endDate**적립 종료일 (string<date>)

시작일을 입력한 경우 필수. 'yyyy-MM-dd' 형식 입력.

**reviewPointPolicy** 구매평 포인트 정책 (object)

판매자 상품 리뷰 포인트 정책

**textReviewPoint**텍스트 리뷰 포인트 (integer<int32>)

텍스트 리뷰 작성 시 적립되는 네이버페이 포인트

**photoVideoReviewPoint**포토/동영상 리뷰 포인트 (integer<int32>)

포토/동영상 리뷰 작성 시 적립되는 네이버페이 포인트

**afterUseTextReviewPoint**한 달 사용 텍스트 리뷰 포인트 (integer<int32>)

한 달 사용 텍스트 리뷰 작성 시 적립되는 네이버페이 포인트

**afterUsePhotoVideoReviewPoint**한 달 사용 포토/동영상 리뷰 포인트 (integer<int32>)

한 달 사용 포토/동영상 리뷰 작성 시 적립되는 네이버페이 포인트

**storeMemberReviewPoint**알림받기 동의/소식알림(톡톡친구) 회원 리뷰 추가 적립 포인트 (integer<int32>)

알림받기 동의/톡톡친구 회원이 상품 리뷰, 한 달 사용 리뷰 작성 시 추가 적립되는 네이버페이 포인트

- 텍스트 리뷰나 포토/동영상 리뷰 구분 없이 1회만 지급

**startDate**적립 시작일 (string<date>)

네이버페이 포인트 유효기간 시작일. 'yyyy-MM-dd' 형식 입력.

**endDate**적립 종료일 (string<date>)

네이버페이 포인트 유효기간 종료일. 시작일을 입력한 경우 필수. 'yyyy-MM-dd' 형식 입력.

**freeInterestPolicy** 무이자 할부 정책 (object)

무이자 할부 정책

**value**무이자 할부 개월 수 (integer<int32>)required

**startDate**무이자 할부 시작일 (string<date>)

'yyyy-MM-dd' 형식 입력

**endDate**무이자 할부 종료일 (string<date>)

시작일을 입력한 경우 필수. 'yyyy-MM-dd' 형식 입력.

**giftPolicy** 사은품 정책 (object)

사은품 정책

**presentContent**사은품 (string)

사은품 내용

**purchaseQuantityInfo** 구매 수량 설정 정보 (object)

구매 수량 정보

**minPurchaseQuantity**최소 구매 수량 (integer<int32>)

**Possible values:** `<= 10000`

**maxPurchaseQuantityPerId**1인 최대 구매 수량 (integer<int32>)

**Possible values:** `<= 99999999`

**maxPurchaseQuantityPerOrder**1회 최대 구매 수량 (integer<int32>)

**Possible values:** `<= 10000`

**detailAttribute** 원상품 상세 속성 정보 (object)

**customsTaxType**관부가세 타입 코드 (string)

관부가세 타입을 나타내기 위해 사용하는 코드입니다.

- NOT\_APPLICABLE(부과 대상 아님), INCLUDED(관부가세 포함), EXCLUDED(관부가세 미포함)

**Possible values:** [`NOT_APPLICABLE`, `INCLUDED`, `EXCLUDED`]

## Responses[​](#responses "Direct link to Responses")

- 200
- 308
- 400
- 401
- 403
- 404
- 500

성공

- application/json;charset=UTF-8

- Schema
- Example (auto)

**Schema**

**code**string

코드

**message**string

메시지

**data**object

데이터 정보

```json
{
  "code": "string",
  "message": "string",
  "data": {}
}
```

리디렉션  
- code : PERMANENT\_REDIRECT

- application/json;charset=UTF-8

- Schema
- Example (auto)

**Schema**

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

- Array [

**name**string

**type**string

**message**string

- ]

**timestamp**string<date-time>

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "type": "string",
      "message": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z"
}
```

잘못된 요청  
- code : BAD\_REQUEST

- application/json;charset=UTF-8

- Schema
- Example (auto)

**Schema**

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

- Array [

**name**string

**type**string

**message**string

- ]

**timestamp**string<date-time>

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "type": "string",
      "message": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z"
}
```

인가되지 않은 요청  
- code : UNAUTHORIZED

- application/json;charset=UTF-8

- Schema
- Example (auto)

**Schema**

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

- Array [

**name**string

**type**string

**message**string

- ]

**timestamp**string<date-time>

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "type": "string",
      "message": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z"
}
```

권한 없음  
- code : FORBIDDEN

- application/json;charset=UTF-8

- Schema
- Example (auto)

**Schema**

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

- Array [

**name**string

**type**string

**message**string

- ]

**timestamp**string<date-time>

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "type": "string",
      "message": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z"
}
```

데이터 없음  
- code : NOT\_FOUND

- application/json;charset=UTF-8

- Schema
- Example (auto)

**Schema**

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

- Array [

**name**string

**type**string

**message**string

- ]

**timestamp**string<date-time>

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "type": "string",
      "message": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z"
}
```

내부 서버 오류  
- code : INTERNAL\_SERVER\_ERROR

- application/json;charset=UTF-8

- Schema
- Example (auto)

**Schema**

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

- Array [

**name**string

**type**string

**message**string

- ]

**timestamp**string<date-time>

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "type": "string",
      "message": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z"
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
curl -L -X PUT 'https://api.commerce.naver.com/external/v1/products/origin-products/bulk-update' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json;charset=UTF-8' \
-H 'Authorization: Bearer <token>' \
-d '{
  "originProductNos": [
    0
  ],
  "productBulkUpdateType": "IMMEDIATE_DISCOUNT",
  "immediateDiscountPolicy": {
    "discountMethod": {
      "value": 0,
      "unitType": "PERCENT",
      "startDate": "2024-07-29T15:51:28.071Z",
      "endDate": "2024-07-29T15:51:28.071Z"
    }
  },
  "productSalePrice": {
    "value": 0,
    "productSalePriceChangerType": "UP",
    "productSalePriceChangerUnitType": "string"
  },
  "productSalePeriod": {
    "saleStartDate": "2024-07-29T15:51:28.071Z",
    "saleEndDate": "2024-07-29T15:51:28.071Z"
  },
  "deliveryInfo": {
    "deliveryType": "DELIVERY",
    "deliveryAttributeType": "NORMAL",
    "deliveryCompany": "string",
    "outboundLocationId": "string",
    "deliveryBundleGroupUsable": true,
    "deliveryBundleGroupId": 0,
    "quickServiceAreas": [
      "SEOUL"
    ],
    "visitAddressId": 0,
    "deliveryFee": {
      "deliveryFeeType": "FREE",
      "baseFee": 0,
      "freeConditionalAmount": 0,
      "repeatQuantity": 0,
      "secondBaseQuantity": 0,
      "secondExtraFee": 0,
      "thirdBaseQuantity": 0,
      "thirdExtraFee": 0,
      "deliveryFeePayType": "COLLECT",
      "deliveryFeeByArea": {
        "deliveryAreaType": "AREA_2",
        "area2extraFee": 0,
        "area3extraFee": 0
      },
      "differentialFeeByArea": "string"
    },
    "claimDeliveryInfo": {
      "returnDeliveryCompanyPriorityType": "PRIMARY",
      "returnDeliveryFee": 0,
      "exchangeDeliveryFee": 0,
      "shippingAddressId": 0,
      "returnAddressId": 0,
      "freeReturnInsuranceYn": true
    },
    "installation": true,
    "installationFee": true,
    "expectedDeliveryPeriodType": "ETC",
    "expectedDeliveryPeriodDirectInput": "string",
    "todayStockQuantity": 0,
    "customProductAfterOrderYn": true,
    "hopeDeliveryGroupId": 0,
    "businessCustomsClearanceSaleYn": true
  },
  "deliveryAttribute": {
    "deliveryAttributeType": "NORMAL",
    "todayStockQuantity": 0,
    "expectedDeliveryPeriodType": "ETC",
    "expectedDeliveryPeriodDirectInput": "string",
    "customProductAfterOrderYn": true,
    "hopeDeliveryGroupId": 0
  },
  "purchaseBenefit": {
    "multiPurchaseDiscountPolicy": {
      "discountMethod": {
        "value": 0,
        "unitType": "PERCENT",
        "startDate": "2024-07-29",
        "endDate": "2024-07-29"
      },
      "orderValue": 0,
      "orderValueUnitType": "PERCENT"
    },
    "purchasePointPolicy": {
      "value": 0,
      "unitType": "PERCENT",
      "startDate": "2024-07-29",
      "endDate": "2024-07-29"
    },
    "reviewPointPolicy": {
      "textReviewPoint": 0,
      "photoVideoReviewPoint": 0,
      "afterUseTextReviewPoint": 0,
      "afterUsePhotoVideoReviewPoint": 0,
      "storeMemberReviewPoint": 0,
      "startDate": "2024-07-29",
      "endDate": "2024-07-29"
    },
    "freeInterestPolicy": {
      "value": 0,
      "startDate": "2024-07-29",
      "endDate": "2024-07-29"
    },
    "giftPolicy": {
      "presentContent": "string"
    }
  },
  "purchaseQuantityInfo": {
    "minPurchaseQuantity": 0,
    "maxPurchaseQuantityPerId": 0,
    "maxPurchaseQuantityPerOrder": 0
  },
  "detailAttribute": {
    "customsTaxType": "NOT_APPLICABLE"
  }
}'
```

Request Collapse all

Base URL

Edit

https://api.commerce.naver.com/external

Auth

Bearer Token

Body required

```json
{
  "originProductNos": [
    0
  ],
  "productBulkUpdateType": "IMMEDIATE_DISCOUNT",
  "immediateDiscountPolicy": {
    "discountMethod": {
      "value": 0,
      "unitType": "PERCENT",
      "startDate": "2024-07-29T15:51:28.071Z",
      "endDate": "2024-07-29T15:51:28.071Z"
    }
  },
  "productSalePrice": {
    "value": 0,
    "productSalePriceChangerType": "UP",
    "productSalePriceChangerUnitType": "string"
  },
  "productSalePeriod": {
    "saleStartDate": "2024-07-29T15:51:28.071Z",
    "saleEndDate": "2024-07-29T15:51:28.071Z"
  },
  "deliveryInfo": {
    "deliveryType": "DELIVERY",
    "deliveryAttributeType": "NORMAL",
    "deliveryCompany": "string",
    "outboundLocationId": "string",
    "deliveryBundleGroupUsable": true,
    "deliveryBundleGroupId": 0,
    "quickServiceAreas": [
      "SEOUL"
    ],
    "visitAddressId": 0,
    "deliveryFee": {
      "deliveryFeeType": "FREE",
      "baseFee": 0,
      "freeConditionalAmount": 0,
      "repeatQuantity": 0,
      "secondBaseQuantity": 0,
      "secondExtraFee": 0,
      "thirdBaseQuantity": 0,
      "thirdExtraFee": 0,
      "deliveryFeePayType": "COLLECT",
      "deliveryFeeByArea": {
        "deliveryAreaType": "AREA_2",
        "area2extraFee": 0,
        "area3extraFee": 0
      },
      "differentialFeeByArea": "string"
    },
    "claimDeliveryInfo": {
      "returnDeliveryCompanyPriorityType": "PRIMARY",
      "returnDeliveryFee": 0,
      "exchangeDeliveryFee": 0,
      "shippingAddressId": 0,
      "returnAddressId": 0,
      "freeReturnInsuranceYn": true
    },
    "installation": true,
    "installationFee": true,
    "expectedDeliveryPeriodType": "ETC",
    "expectedDeliveryPeriodDirectInput": "string",
    "todayStockQuantity": 0,
    "customProductAfterOrderYn": true,
    "hopeDeliveryGroupId": 0,
    "businessCustomsClearanceSaleYn": true
  },
  "deliveryAttribute": {
    "deliveryAttributeType": "NORMAL",
    "todayStockQuantity": 0,
    "expectedDeliveryPeriodType": "ETC",
    "expectedDeliveryPeriodDirectInput": "string",
    "customProductAfterOrderYn": true,
    "hopeDeliveryGroupId": 0
  },
  "purchaseBenefit": {
    "multiPurchaseDiscountPolicy": {
      "discountMethod": {
        "value": 0,
        "unitType": "PERCENT",
        "startDate": "2024-07-29",
        "endDate": "2024-07-29"
      },
      "orderValue": 0,
      "orderValueUnitType": "PERCENT"
    },
    "purchasePointPolicy": {
      "value": 0,
      "unitType": "PERCENT",
      "startDate": "2024-07-29",
      "endDate": "2024-07-29"
    },
    "reviewPointPolicy": {
      "textReviewPoint": 0,
      "photoVideoReviewPoint": 0,
      "afterUseTextReviewPoint": 0,
      "afterUsePhotoVideoReviewPoint": 0,
      "storeMemberReviewPoint": 0,
      "startDate": "2024-07-29",
      "endDate": "2024-07-29"
    },
    "freeInterestPolicy": {
      "value": 0,
      "startDate": "2024-07-29",
      "endDate": "2024-07-29"
    },
    "giftPolicy": {
      "presentContent": "string"
    }
  },
  "purchaseQuantityInfo": {
    "minPurchaseQuantity": 0,
    "maxPurchaseQuantityPerId": 0,
    "maxPurchaseQuantityPerOrder": 0
  },
  "detailAttribute": {
    "customsTaxType": "NOT_APPLICABLE"
  }
}
```
