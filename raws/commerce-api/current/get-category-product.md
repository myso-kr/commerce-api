# 카테고리 조회

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-category-product

# 카테고리 조회

```
GET

## /v1/categories/:categoryId
```

카테고리 조회

## Request[​](#request "Direct link to Request")

### Path Parameters

**categoryId** stringrequired

카테고리 ID

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

**wholeCategoryName**전체 카테고리명 (string)required

**id**카테고리 ID (string)required

**name**카테고리명 (string)required

**last**리프 카테고리 여부 (boolean)required

**exceptionalCategories**예외 카테고리 목록 (string)[]

- E\_COUPON(E쿠폰), ADULT(성인), MARINE\_PRODUCTS(수산물), REVIEW\_UNEXPOSE(구매평 미노출), CHILD\_CERTIFICATION(어린이제품 인증 대상), ORIGINAREA\_PRODUCTS(원산지 입력 대상), GREEN\_PRODUCTS(친환경 인증 대상), KC\_CERTIFICATION(KC 인증 대상), SAFE\_CRITERION(안전기준준수대상), AFFILIATE(어필리에이트), TRADITIONAL\_ALCOHOL(전통주), OPTION\_PRICE(옵션가 제한 예외 카테고리), BOOK(도서\_일반), BOOK\_EBOOK(도서\_E북), BOOK\_AUDIO(도서\_오디오북), BOOK\_MAGAZINE(도서\_잡지), BOOK\_USED(도서\_중고), BOOK\_OVERSEAS(도서\_해외), BOOK\_FREE(도서\_정가제free), PERFORMANCE(문화비\_소득공제), FREE\_RETURN\_INSURANCE(반품안심케어), REGULAR\_SUBSCRIPTION(정기구독), RENTAL\_SUBSCRIPTION(렌탈), MANUFACTURE\_DEFINE\_NO(품번)

**Possible values:** [`E_COUPON`, `ADULT`, `MARINE_PRODUCTS`, `REVIEW_UNEXPOSE`, `CHILD_CERTIFICATION`, `ORIGINAREA_PRODUCTS`, `GREEN_PRODUCTS`, `KC_CERTIFICATION`, `SAFE_CRITERION`, `AFFILIATE`, `TRADITIONAL_ALCOHOL`, `ALCOHOL`, `OPTION_PRICE`, `BOOK_CHILD`, `BOOK`, `BOOK_EBOOK`, `BOOK_AUDIO`, `BOOK_MAGAZINE`, `BOOK_USED`, `BOOK_OVERSEAS`, `BOOK_FREE`, `PERFORMANCE`, `FREE_RETURN_INSURANCE`, `REGULAR_SUBSCRIPTION`, `RENTAL_SUBSCRIPTION`, `VINTAGE_CITY`, `SEONE_AI_ASSISTANT_UNEXPOSE`, `GROUP_PRODUCT_MAX`, `DYNAMIC_PRICING_CONFIG`, `MANUFACTURE_DEFINE_NO`, `PREORDER_VALID_DATE`, `UNIT_PRICE`]

**certificationInfos** 인증 정보 (object)[]

- Array [

**id**인증 카테고리 ID (integer<int64>)required

**name**인증명 (string)required

**kindTypes**인증 종류 목록 (string)[]required

- KC\_CERTIFICATION(KC 인증 대상), CHILD\_CERTIFICATION(어린이제품 인증 대상), GREEN\_PRODUCTS(친환경 인증 대상), PARALLEL\_IMPORT(병행수입), OVERSEAS(구매대행), ETC(기타 인증 유형)

**Possible values:** [`KC_CERTIFICATION`, `CHILD_CERTIFICATION`, `GREEN_PRODUCTS`, `PARALLEL_IMPORT`, `OVERSEAS`, `ETC`]

**green**친환경농산물 여부 (boolean)required

**certificationMarkType**인증마크 타입 (string)

**Possible values:** [`KC`, `ORGANIC_AGRICULTURAL_PROD`, `ORGANIC_ANIMAL_PROD`, `NON_PESTICIDE`, `NON_ANTIBIOTIC`, `LOW_PESTICIDE`, `GAP`, `AGRICULTURAL_TRACEABILITY`, `PROCESSED_FOOD_KS`, `TRADITIONAL_FOOD`, `ORGANIC_PROCESSED_FOOD`, `QUALITY_SEAFOOD`, `ECO_SEAFOOD`, `HACCP`, `GMP`, `SAFETY`, `SIX_INDUSTRY`, `ANIMAL_WELFARE`, `FOOD_MASTER`, `ECO_PROCESSED_FOOD`, `ECO_ORGANIC_ANIMAL_PROD`, `TRADITIONAL_SEAFOOD`, `SOCIAL_ENTERPRISE`, `VILLAGE_ENTERPRISE`, `SPECIAL_SEAFOOD`, `SEA_ORGANIC_PROCESSED_FOOD`, `SEA_ORGANIC_PROD`, `SEA_NON_ANTIBIOTIC`, `SEA_NON_ACTIVE_TREATMENT`, `ALCOHOL`, `LIVING_CHEMISTRY_SAFETY`, `ECO_FRIENDLY`, `VEGAN`, `VEGAN_STANDARD_CERT`, `LOW_CARBON`, `OVERSEAS_PETA`, `OVERSEAS_V_LABEL`, `OVERSEAS_VEGAN_SOCIETY`, `OVERSEAS_EVE_VEGAN`, `ECO_OVERSEAS_MSC`, `ECO_OVERSEAS_USDA`, `ECO_OVERSEAS_ECOCERT`, `ECO_OVERSEAS_FSC`, `ECO_OVERSEAS_FAIR_TRADE`, `ECO_OVERSEAS_CARBON_TRUST`]

**companyName**인증 상호 사용 여부 (boolean)

**certificationDate**인증 일자 사용 여부 (boolean)

**kcParallelImportExemptionObject**KC 병행수입 면제 대상 여부 (boolean)

**nonEssential**비필수 여부(인증번호 없음) (boolean)

- ]

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
curl -L 'https://api.commerce.naver.com/external/v1/categories/:categoryId' \
-H 'Accept: application/json;charset=UTF-8' \
-H 'Authorization: Bearer <token>'
```

Request Collapse all

Base URL

Edit

https://api.commerce.naver.com/external

Auth

Bearer Token

Parameters

categoryId — pathrequired
