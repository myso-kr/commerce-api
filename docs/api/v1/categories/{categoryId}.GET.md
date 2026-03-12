---
doc-id: "v1-categories-categoryId-get"
title: "카테고리 조회"
description: "categoryId stringrequired"
type: api-endpoint
method: GET
path: /v1/categories/{categoryId}
base-url: https://api.commerce.naver.com/external
category: 기타
tags:
  - get
  - reference
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-category-product
---

# 카테고리 조회



```
> **GET** `https://api.commerce.naver.com/external/v1/categories/{categoryId}`
```

카테고리 조회

## Request

**GET** `/v1/categories/{categoryId}`
### Path Parameters

**categoryId** stringrequired

카테고리 ID

## Responses

**GET** `/v1/categories/{categoryId}` — 응답
성공

**wholeCategoryName**전체 카테고리명 (string)required

**id**카테고리 ID (string)required

**name**카테고리명 (string)required

**last**리프 카테고리 여부 (boolean)required

**exceptionalCategories**예외 카테고리 목록 (string)[]

- E_COUPON(E쿠폰), ADULT(성인), MARINE_PRODUCTS(수산물), REVIEW_UNEXPOSE(구매평 미노출), CHILD_CERTIFICATION(어린이제품 인증 대상), ORIGINAREA_PRODUCTS(원산지 입력 대상), GREEN_PRODUCTS(친환경 인증 대상), KC_CERTIFICATION(KC 인증 대상), SAFE_CRITERION(안전기준준수대상), AFFILIATE(어필리에이트), TRADITIONAL_ALCOHOL(전통주), OPTION_PRICE(옵션가 제한 예외 카테고리), BOOK(도서_일반), BOOK_EBOOK(도서_E북), BOOK_AUDIO(도서_오디오북), BOOK_MAGAZINE(도서_잡지), BOOK_USED(도서_중고), BOOK_OVERSEAS(도서_해외), BOOK_FREE(도서_정가제free), PERFORMANCE(문화비_소득공제), FREE_RETURN_INSURANCE(반품안심케어), REGULAR_SUBSCRIPTION(정기구독), RENTAL_SUBSCRIPTION(렌탈), MANUFACTURE_DEFINE_NO(품번)

**Possible values:** [`E_COUPON`, `ADULT`, `MARINE_PRODUCTS`, `REVIEW_UNEXPOSE`, `CHILD_CERTIFICATION`, `ORIGINAREA_PRODUCTS`, `GREEN_PRODUCTS`, `KC_CERTIFICATION`, `SAFE_CRITERION`, `AFFILIATE`, `TRADITIONAL_ALCOHOL`, `ALCOHOL`, `OPTION_PRICE`, `BOOK_CHILD`, `BOOK`, `BOOK_EBOOK`, `BOOK_AUDIO`, `BOOK_MAGAZINE`, `BOOK_USED`, `BOOK_OVERSEAS`, `BOOK_FREE`, `PERFORMANCE`, `FREE_RETURN_INSURANCE`, `REGULAR_SUBSCRIPTION`, `RENTAL_SUBSCRIPTION`, `VINTAGE_CITY`, `SEONE_AI_ASSISTANT_UNEXPOSE`, `GROUP_PRODUCT_MAX`, `DYNAMIC_PRICING_CONFIG`, `MANUFACTURE_DEFINE_NO`, `PREORDER_VALID_DATE`, `UNIT_PRICE`]

**certificationInfos** 인증 정보 (object)[]

**id**인증 카테고리 ID (integer<int64>)required

**name**인증명 (string)required

**kindTypes**인증 종류 목록 (string)[]required

- KC_CERTIFICATION(KC 인증 대상), CHILD_CERTIFICATION(어린이제품 인증 대상), GREEN_PRODUCTS(친환경 인증 대상), PARALLEL_IMPORT(병행수입), OVERSEAS(구매대행), ETC(기타 인증 유형)

**Possible values:** [`KC_CERTIFICATION`, `CHILD_CERTIFICATION`, `GREEN_PRODUCTS`, `PARALLEL_IMPORT`, `OVERSEAS`, `ETC`]

**green**친환경농산물 여부 (boolean)required

**certificationMarkType**인증마크 타입 (string)

**Possible values:** [`KC`, `ORGANIC_AGRICULTURAL_PROD`, `ORGANIC_ANIMAL_PROD`, `NON_PESTICIDE`, `NON_ANTIBIOTIC`, `LOW_PESTICIDE`, `GAP`, `AGRICULTURAL_TRACEABILITY`, `PROCESSED_FOOD_KS`, `TRADITIONAL_FOOD`, `ORGANIC_PROCESSED_FOOD`, `QUALITY_SEAFOOD`, `ECO_SEAFOOD`, `HACCP`, `GMP`, `SAFETY`, `SIX_INDUSTRY`, `ANIMAL_WELFARE`, `FOOD_MASTER`, `ECO_PROCESSED_FOOD`, `ECO_ORGANIC_ANIMAL_PROD`, `TRADITIONAL_SEAFOOD`, `SOCIAL_ENTERPRISE`, `VILLAGE_ENTERPRISE`, `SPECIAL_SEAFOOD`, `SEA_ORGANIC_PROCESSED_FOOD`, `SEA_ORGANIC_PROD`, `SEA_NON_ANTIBIOTIC`, `SEA_NON_ACTIVE_TREATMENT`, `ALCOHOL`, `LIVING_CHEMISTRY_SAFETY`, `ECO_FRIENDLY`, `VEGAN`, `VEGAN_STANDARD_CERT`, `LOW_CARBON`, `OVERSEAS_PETA`, `OVERSEAS_V_LABEL`, `OVERSEAS_VEGAN_SOCIETY`, `OVERSEAS_EVE_VEGAN`, `ECO_OVERSEAS_MSC`, `ECO_OVERSEAS_USDA`, `ECO_OVERSEAS_ECOCERT`, `ECO_OVERSEAS_FSC`, `ECO_OVERSEAS_FAIR_TRADE`, `ECO_OVERSEAS_CARBON_TRUST`]

**companyName**인증 상호 사용 여부 (boolean)

**certificationDate**인증 일자 사용 여부 (boolean)

**kcParallelImportExemptionObject**KC 병행수입 면제 대상 여부 (boolean)

**nonEssential**비필수 여부(인증번호 없음) (boolean)

```json
{
  "wholeCategoryName": "string",
  "id": "string",
  "name": "string",
  "last": true,
  "exceptionalCategories": [
    "E_COUPON"
  ],
  "certificationInfos": [
    {
      "id": 0,
      "name": "string",
      "kindTypes": [
        "KC_CERTIFICATION"
      ],
      "green": true,
      "certificationMarkType": "KC",
      "companyName": true,
      "certificationDate": true,
      "kcParallelImportExemptionObject": true,
      "nonEssential": true
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
curl -L 'https://api.commerce.naver.com/external/v1/categories/:categoryId' \
-H 'Accept: application/json;charset=UTF-8' \
-H 'Authorization: Bearer <token>'
```




https://api.commerce.naver.com/external



Parameters

categoryId — pathrequired
