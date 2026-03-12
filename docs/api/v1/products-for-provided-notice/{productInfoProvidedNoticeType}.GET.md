---
doc-id: "v1-products-for-provided-notice-productInfoProvidedNoticeType-get"
title: "상품정보제공고시 상품군 단건 조회"
description: "지정한 상품정보제공고시 상품군 유형의 정보를 조회합니다."
type: api-endpoint
method: GET
path: /v1/products-for-provided-notice/{productInfoProvidedNoticeType}
base-url: https://api.commerce.naver.com/external
category: 상품
tags:
  - get
  - product
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-product-info-provided-notice-type-vo-product
---

# 상품정보제공고시 상품군 단건 조회



```
> **GET** `https://api.commerce.naver.com/external/v1/products-for-provided-notice/{productInfoProvidedNoticeType}`
```

지정한 상품정보제공고시 상품군 유형의 정보를 조회합니다.

## Request

**GET** `/v1/products-for-provided-notice/{productInfoProvidedNoticeType}`
### Path Parameters

**productInfoProvidedNoticeType** stringrequired

상품정보제공고시 상품군 유형

**Possible values:** [`WEAR`, `SHOES`, `BAG`, `FASHION_ITEMS`, `SLEEPING_GEAR`, `FURNITURE`, `IMAGE_APPLIANCES`, `HOME_APPLIANCES`, `SEASON_APPLIANCES`, `OFFICE_APPLIANCES`, `OPTICS_APPLIANCES`, `MICROELECTRONICS`, `CELLPHONE`, `NAVIGATION`, `CAR_ARTICLES`, `MEDICAL_APPLIANCES`, `KITCHEN_UTENSILS`, `COSMETIC`, `JEWELLERY`, `FOOD`, `GENERAL_FOOD`, `DIET_FOOD`, `KIDS`, `MUSICAL_INSTRUMENT`, `SPORTS_EQUIPMENT`, `BOOKS`, `LODGMENT_RESERVATION`, `TRAVEL_PACKAGE`, `AIRLINE_TICKET`, `RENT_CAR`, `RENTAL_HA`, `RENTAL_ETC`, `DIGITAL_CONTENTS`, `GIFT_CARD`, `MOBILE_COUPON`, `MOVIE_SHOW`, `ETC_SERVICE`, `BIOCHEMISTRY`, `BIOCIDAL`, `ETC`]

## Responses

**GET** `/v1/products-for-provided-notice/{productInfoProvidedNoticeType}` — 응답
성공

**productInfoProvidedNoticeType**상품정보제공고시 상품군 유형 (string)

**Possible values:** [`WEAR`, `SHOES`, `BAG`, `FASHION_ITEMS`, `SLEEPING_GEAR`, `FURNITURE`, `IMAGE_APPLIANCES`, `HOME_APPLIANCES`, `SEASON_APPLIANCES`, `OFFICE_APPLIANCES`, `OPTICS_APPLIANCES`, `MICROELECTRONICS`, `CELLPHONE`, `NAVIGATION`, `CAR_ARTICLES`, `MEDICAL_APPLIANCES`, `KITCHEN_UTENSILS`, `COSMETIC`, `JEWELLERY`, `FOOD`, `GENERAL_FOOD`, `DIET_FOOD`, `KIDS`, `MUSICAL_INSTRUMENT`, `SPORTS_EQUIPMENT`, `BOOKS`, `LODGMENT_RESERVATION`, `TRAVEL_PACKAGE`, `AIRLINE_TICKET`, `RENT_CAR`, `RENTAL_HA`, `RENTAL_ETC`, `DIGITAL_CONTENTS`, `GIFT_CARD`, `MOBILE_COUPON`, `MOVIE_SHOW`, `ETC_SERVICE`, `BIOCHEMISTRY`, `BIOCIDAL`, `ETC`]

**productInfoProvidedNoticeTypeName**상품정보제공고시 상품군 유형명 (string)

**productInfoProvidedNoticeContents** 상품정보제공고시 상품군 유형 상세 정보 (object)[]

**fieldType**상품정보제공고시 상품군 필드 타입 (string)

**fieldName**상품정보제공고시 상품군 필드 이름 (string)

**fieldDescription**상품정보제공고시 상품군 필드 설명 (string)

**fieldAddDescription**상품정보제공고시 상품군 필드 추가 설명 (string)

**fieldMaxLength**상품정보제공고시 상품군 필드 길이 (integer<int32>)

```json
{
  "productInfoProvidedNoticeType": "WEAR",
  "productInfoProvidedNoticeTypeName": "string",
  "productInfoProvidedNoticeContents": [
    {
      "fieldType": "string",
      "fieldName": "string",
      "fieldDescription": "string",
      "fieldAddDescription": "string",
      "fieldMaxLength": 0
    }
  ]
}
```

리디렉션  
- code : PERMANENT_REDIRECT

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

**name**string

**type**string

**message**string

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
- code : BAD_REQUEST

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

**name**string

**type**string

**message**string

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

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

**name**string

**type**string

**message**string

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

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

**name**string

**type**string

**message**string

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
- code : NOT_FOUND

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

**name**string

**type**string

**message**string

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
- code : INTERNAL_SERVER_ERROR

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

**name**string

**type**string

**message**string

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
curl -L 'https://api.commerce.naver.com/external/v1/products-for-provided-notice/:productInfoProvidedNoticeType' \
-H 'Accept: application/json;charset=UTF-8' \
-H 'Authorization: Bearer <token>'
```




https://api.commerce.naver.com/external



Parameters

productInfoProvidedNoticeType — pathrequired

---WEARSHOESBAGFASHION_ITEMSSLEEPING_GEARFURNITUREIMAGE_APPLIANCESHOME_APPLIANCESSEASON_APPLIANCESOFFICE_APPLIANCESOPTICS_APPLIANCESMICROELECTRONICSCELLPHONENAVIGATIONCAR_ARTICLESMEDICAL_APPLIANCESKITCHEN_UTENSILSCOSMETICJEWELLERYFOODGENERAL_FOODDIET_FOODKIDSMUSICAL_INSTRUMENTSPORTS_EQUIPMENTBOOKSLODGMENT_RESERVATIONTRAVEL_PACKAGEAIRLINE_TICKETRENT_CARRENTAL_HARENTAL_ETCDIGITAL_CONTENTSGIFT_CARDMOBILE_COUPONMOVIE_SHOWETC_SERVICEBIOCHEMISTRYBIOCIDALETC
