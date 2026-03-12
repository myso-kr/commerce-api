# 멀티 상품 변경

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/update-multi-products-product

# 멀티 상품 변경

```
PATCH

## /v1/products/origin-products/multi-update
```

여러 상품의 판매가, 재고, 할인, 판매 상태를 다르게 변경할 수 있습니다.

## Request[​](#request "Direct link to Request")

- application/json

### Body**required**

**multiProductUpdateRequestVos** 멀티 상품 수정 요청 단건 (object)[]required

- Array [

**originProductNo**원상품 번호 (integer<int64>)required

**multiUpdateTypes**멀티 업데이트 종류 (string)[]

- SALE\_PRICE(판매가), IMMEDIATE\_DISCOUNT(기본 할인), STOCK(재고 변경), PRODUCT\_STATUS\_SALE(판매중 변경), PRODUCT\_STATUS\_SUSPENSION(판매중지 변경)

**Possible values:** [`SALE_PRICE`, `IMMEDIATE_DISCOUNT`, `STOCK`, `PRODUCT_STATUS_SALE`, `PRODUCT_STATUS_SUSPENSION`]

**productSalePrice** 판매가 정보 (object)

판매가 정보

**salePrice**상품 판매 가격 (integer<int32>)required

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

**stockQuantity**재고 수량 (integer<int32>)

- ]

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
curl -L -X PATCH 'https://api.commerce.naver.com/external/v1/products/origin-products/multi-update' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json;charset=UTF-8' \
-H 'Authorization: Bearer <token>' \
-d '{
  "multiProductUpdateRequestVos": [
    {
      "originProductNo": 0,
      "multiUpdateTypes": [
        "SALE_PRICE"
      ],
      "productSalePrice": {
        "salePrice": 0
      },
      "immediateDiscountPolicy": {
        "discountMethod": {
          "value": 0,
          "unitType": "PERCENT",
          "startDate": "2024-07-29T15:51:28.071Z",
          "endDate": "2024-07-29T15:51:28.071Z"
        }
      },
      "stockQuantity": 0
    }
  ]
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
  "multiProductUpdateRequestVos": [
    {
      "originProductNo": 0,
      "multiUpdateTypes": [
        "SALE_PRICE"
      ],
      "productSalePrice": {
        "salePrice": 0
      },
      "immediateDiscountPolicy": {
        "discountMethod": {
          "value": 0,
          "unitType": "PERCENT",
          "startDate": "2024-07-29T15:51:28.071Z",
          "endDate": "2024-07-29T15:51:28.071Z"
        }
      },
      "stockQuantity": 0
    }
  ]
}
```
