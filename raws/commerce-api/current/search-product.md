# 상품 목록 조회

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/search-product

# 상품 목록 조회

```
POST

## /v1/products/search
```

상품 목록 조회

## Request[​](#request "Direct link to Request")

- application/json

### Body**required**

**searchKeywordType**검색 키워드 타입 (string)

- 채널 상품번호(CHANNEL\_PRODUCT\_NO) 선택 시 채널 상품번호를 입력합니다.
- 원상품번호(PRODUCT\_NO) 선택 시 채널 원상품번호를 입력합니다.
- 그룹상품번호(GROUP\_PRODUCT\_NO) 선택 시 그룹상품번호를 입력합니다.
- 판매자 관리 코드(SELLER\_CODE) 선택 시 판매자 관리 코드를 입력합니다.

**Possible values:** [`CHANNEL_PRODUCT_NO`, `PRODUCT_NO`, `GROUP_PRODUCT_NO`, `SELLER_CODE`]

**channelProductNos**채널 상품번호 목록 (integer<int64>)[]

**originProductNos**원상품번호 목록 (integer<int64>)[]

**groupProductNos**그룹상품번호 목록 (integer<int64>)[]

**sellerManagementCode**판매자 관리 코드 (string)

**productStatusTypes**상품 판매 상태 목록 (string)[]

조회하려는 상품 판매 상태를 선택합니다.

- WAIT(판매 대기), SALE(판매 중), OUTOFSTOCK(품절), UNADMISSION(승인 대기), REJECTION(승인 거부), SUSPENSION(판매 중지), CLOSE(판매 종료), PROHIBITION(판매 금지)

**Possible values:** [`WAIT`, `SALE`, `OUTOFSTOCK`, `UNADMISSION`, `REJECTION`, `SUSPENSION`, `CLOSE`, `PROHIBITION`, `DELETE`]

**page**페이지 번호 (integer<int32>)

첫 번째 페이지 번호는 1입니다.

**Default value:** `1`

**size**페이지 크기 (integer<int32>)

페이지당 최대 500건까지 조회할 수 있습니다.

**Default value:** `50`

**orderType**정렬 기준 (string)

- NO(상품번호순), REG\_DATE(등록일순), MOD\_DATE(수정일순), NAME(상품명순), SELLER\_CODE(판매자 상품코드순), LOW\_PRICE(판매가 낮은순), HIGH\_PRICE(판매가 높은순), POPULARITY(인기도순), ACCUMULATE\_SALE(누적판매건수순), LOW\_DISCOUNT\_PRICE(할인가 낮은순), SALE\_START(판매시작일순), SALE\_END(판매종료일순)

**Possible values:** [`NO`, `NAME`, `SELLER_CODE`, `LOW_PRICE`, `HIGH_PRICE`, `REG_DATE`, `MOD_DATE`, `SALE_START`, `SALE_END`, `POPULARITY`, `ACCUMULATE_SALE`, `LOW_DISCOUNT_PRICE`, `TOTAL_REVIEW_COUNT`, `AVERAGE_REVIEW_SCORE`]

**periodType**검색 기간 유형 (string)

- PROD\_REG\_DAY(상품 등록일), SALE\_START\_DAY(판매 시작일), SALE\_END\_DAY(판매 종료일), PROD\_MOD\_DAY(최종 수정일)

**Possible values:** [`PROD_REG_DAY`, `SALE_START_DAY`, `SALE_END_DAY`, `PROD_MOD_DAY`]

**fromDate**검색 기간 시작일 (string<date>)

'yyyy-MM-dd' 형식 입력.

**toDate**검색 기간 종료일 (string<date>)

'yyyy-MM-dd' 형식 입력.

## Responses[​](#responses "Direct link to Responses")

- 200
- 308
- 400
- 401
- 403
- 404
- 500

OK

- application/json;charset=UTF-8

- Schema
- Example (auto)

**Schema**

**contents** 콘텐츠 목록 (object)[]

- Array [

**groupProductNo**그룹상품번호 (integer<int64>)

**originProductNo**원상품번호 (integer<int64>)

**channelProducts** 채널 상품 목록 (object)[]

- Array [

**groupProductNo**그룹상품번호 (integer<int64>)

**originProductNo**원상품번호 (integer<int64>)

**channelProductNo**채널 상품번호 (integer<int64>)

**channelServiceType**채널 서비스 타입 (string)

**Possible values:** [`STOREFARM`, `WINDOW`, `AFFILIATE`]

**injectProductNo**수급 상품번호 (integer<int64>)

**categoryId**카테고리 ID (string)

**name**상품명 (string)

**sellerManagementCode**판매자 관리 코드 (string)

**statusType**상품 판매 상태 코드 (string)

- WAIT(판매 대기), SALE(판매 중), OUTOFSTOCK(품절), UNADMISSION(승인 대기), REJECTION(승인 거부), SUSPENSION(판매 중지), CLOSE(판매 종료), PROHIBITION(판매 금지)

**Possible values:** [`WAIT`, `SALE`, `OUTOFSTOCK`, `UNADMISSION`, `REJECTION`, `SUSPENSION`, `CLOSE`, `PROHIBITION`, `DELETE`]

**channelProductDisplayStatusType**채널 상품 전시 상태 (string)

**Possible values:** [`WAIT`, `ON`, `SUSPENSION`]

**salePrice**판매가 (integer<int64>)required

**Possible values:** `<= 999999990`

**discountedPrice**할인가 (integer<int64>)

**Possible values:** `<= 999999990`

**mobileDiscountedPrice**(Depecated) 모바일 할인가 (integer<int64>)deprecated

**Possible values:** `<= 999999990`

**stockQuantity**재고 수량 (integer<int32>)

**Possible values:** `<= 99999999`

**knowledgeShoppingProductRegistration**네이버쇼핑 등록 (boolean)

**deliveryAttributeType**배송 속성 (string)

- NORMAL(일반 배송), TODAY(오늘출발), OPTION\_TODAY(옵션별 오늘출발), HOPE(희망일배송), TODAY\_ARRIVAL(당일배송), DAWN\_ARRIVAL(새벽배송)

**Possible values:** [`NORMAL`, `TODAY`, `OPTION_TODAY`, `HOPE`, `TODAY_ARRIVAL`, `DAWN_ARRIVAL`, `ARRIVAL_GUARANTEE`, `SELLER_GUARANTEE`, `HOPE_SELLER_GUARANTEE`, `QUICK`, `PICKUP`, `QUICK_PICKUP`]

**deliveryFee**기본 배송비 (integer<int64>)

**Possible values:** `<= 100000`

**returnFee**반품 배송비 (integer<int64>)

**Possible values:** `<= 1000000`

**exchangeFee**교환 배송비 (integer<int64>)

**Possible values:** `<= 1000000`

**multiPurchaseDiscount**복수 구매 할인 (integer<int64>)

**Possible values:** `<= 10000000`

**multiPurchaseDiscountUnitType**복수 구매 할인 단위 (string)

복수 구매 할인 단위 타입. PERCENT, WON만 입력 가능합니다.

- PERCENT(정율), WON(정액)

**Possible values:** [`PERCENT`, `WON`]

**sellerPurchasePoint**상품 구매 포인트(판매자) (integer<int64>)

**sellerPurchasePointUnitType**상품 구매 포인트(판매자) 할인 단위 (string)

상품 구매 포인트(판매자) 할인 단위 타입. PERCENT, WON 입력 가능합니다.

- PERCENT(정율), WON(정액)

**Possible values:** [`PERCENT`, `WON`]

**managerPurchasePoint**상품 구매 포인트(관리자) (integer<int64>)

**textReviewPoint**텍스트 리뷰 포인트 (integer<int64>)

**photoVideoReviewPoint**포토/동영상 리뷰 포인트 (integer<int64>)

**regularCustomerPoint**알림받기 동의 회원 리뷰 추가 적립 포인트 (integer<int64>)

**freeInterest**무이자 할부 (integer<int32>)

**gift**사은품 (string)

**saleStartDate**판매 시작 일시 (string<date-time>)

'yyyy-MM-dd'T'HH:mm[:ss][.SSS]XXX' 형식으로 입력합니다.

**saleEndDate**판매 종료 일시 (string<date-time>)

'yyyy-MM-dd'T'HH:mm[:ss][.SSS]XXX' 형식으로 입력합니다.

**wholeCategoryName**전체 카테고리명 (string)

**wholeCategoryId**전체 카테고리 ID (string)

**representativeImage** 이미지 (object)

**url**이미지 URL (string)required

**modelId**카탈로그 ID (integer<int64>)

**modelName**카탈로그명 (string)

**brandName**브랜드명 (string)

**manufacturerName**제조사명 (string)

**sellerTags** KrExternalApiTagInfoVo.product (object)[]

- Array [

**code**태그 ID. 직접 입력의 경우에는 ID가 존재하지 않습니다. (integer<int64>)

**text**태그명 (string)required

- ]

**regDate**상품 등록일 (string<date-time>)

**modifiedDate**상품 수정일 (string<date-time>)

- ]

- ]

**page**페이지 번호 (integer<int32>)

**size**페이지 크기 (integer<int32>)

**totalElements**전체 개수 (integer<int64>)

**totalPages**전체 페이지 수 (integer<int32>)

**sort** 정렬 정보 (object)

정렬 정보

**sorted**데이터 정렬 적용 여부 (boolean)

**fields** 정렬 적용 필드 정보 (object)[]

- Array [

**name**필드 이름 (string)

**direction**정렬 순서 (string)

- ASC(오름차순), DESC(내림차순)

**Possible values:** [`ASC`, `DESC`]

- ]

**first**첫 번째 페이지 여부 (boolean)

**last**마지막 페이지 여부 (boolean)

```json
{
  "contents": [
    {
      "groupProductNo": 0,
      "originProductNo": 0,
      "channelProducts": [
        {
          "groupProductNo": 0,
          "originProductNo": 0,
          "channelProductNo": 0,
          "channelServiceType": "STOREFARM",
          "injectProductNo": 0,
          "categoryId": "string",
          "name": "string",
          "sellerManagementCode": "string",
          "statusType": "WAIT",
          "channelProductDisplayStatusType": "WAIT",
          "salePrice": 0,
          "discountedPrice": 0,
          "stockQuantity": 0,
          "knowledgeShoppingProductRegistration": true,
          "deliveryAttributeType": "NORMAL",
          "deliveryFee": 0,
          "returnFee": 0,
          "exchangeFee": 0,
          "multiPurchaseDiscount": 0,
          "multiPurchaseDiscountUnitType": "PERCENT",
          "sellerPurchasePoint": 0,
          "sellerPurchasePointUnitType": "PERCENT",
          "managerPurchasePoint": 0,
          "textReviewPoint": 0,
          "photoVideoReviewPoint": 0,
          "regularCustomerPoint": 0,
          "freeInterest": 0,
          "gift": "string",
          "saleStartDate": "2024-07-29T15:51:28.071Z",
          "saleEndDate": "2024-07-29T15:51:28.071Z",
          "wholeCategoryName": "string",
          "wholeCategoryId": "string",
          "representativeImage": {
            "url": "string"
          },
          "modelId": 0,
          "modelName": "string",
          "brandName": "string",
          "manufacturerName": "string",
          "sellerTags": [
            {
              "code": 0,
              "text": "string"
            }
          ],
          "regDate": "2024-07-29T15:51:28.071Z",
          "modifiedDate": "2024-07-29T15:51:28.071Z"
        }
      ]
    }
  ],
  "page": 0,
  "size": 0,
  "totalElements": 0,
  "totalPages": 0,
  "sort": {
    "sorted": true,
    "fields": [
      {
        "name": "string",
        "direction": "ASC"
      }
    ]
  },
  "first": true,
  "last": true
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
curl -L 'https://api.commerce.naver.com/external/v1/products/search' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json;charset=UTF-8' \
-H 'Authorization: Bearer <token>' \
-d '{
  "searchKeywordType": "CHANNEL_PRODUCT_NO",
  "channelProductNos": [
    0
  ],
  "originProductNos": [
    0
  ],
  "groupProductNos": [
    0
  ],
  "sellerManagementCode": "string",
  "productStatusTypes": [
    "WAIT"
  ],
  "page": 1,
  "size": 50,
  "orderType": "NO",
  "periodType": "PROD_REG_DAY",
  "fromDate": "2024-07-29",
  "toDate": "2024-07-29"
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
  "searchKeywordType": "CHANNEL_PRODUCT_NO",
  "channelProductNos": [
    0
  ],
  "originProductNos": [
    0
  ],
  "groupProductNos": [
    0
  ],
  "sellerManagementCode": "string",
  "productStatusTypes": [
    "WAIT"
  ],
  "page": 1,
  "size": 50,
  "orderType": "NO",
  "periodType": "PROD_REG_DAY",
  "fromDate": "2024-07-29",
  "toDate": "2024-07-29"
}
```
