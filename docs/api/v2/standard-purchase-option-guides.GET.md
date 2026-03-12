---
doc-id: "v2-standard-purchase-option-guides-get"
title: "(v2) 판매 옵션 정보 조회"
description: "판매 옵션 정보를 조회합니다."
type: api-endpoint
method: GET
path: /v2/standard-purchase-option-guides
base-url: https://api.commerce.naver.com/external
category: 기타
tags:
  - get
  - reference
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-option-guides-by-category-id-product
---

# (v2) 판매 옵션 정보 조회



```
> **GET** `https://api.commerce.naver.com/external/v2/standard-purchase-option-guides`
```

판매 옵션 정보를 조회합니다.

## Request

**GET** `/v2/standard-purchase-option-guides`
### Query Parameters

**categoryId** stringrequired

리프 카테고리 ID

## Responses

**GET** `/v2/standard-purchase-option-guides` — 응답
성공

**useOptionYn**판매 옵션 사용가능 카테고리 여부 (boolean)

true인 카테고리에 대해서만 그룹상품 설정이 가능합니다.

**optionGuides** 판매 옵션 가이드 (object)[]

판매 옵션 사용 가능 카테고리의 경우, 판매 옵션 가이드를 설정해야 합니다.

**guideId**가이드 ID (integer<int64>)required

**standardPurchaseOptions** 판매 옵션 (object)[]required

가이드에 포함되는 옵션 목록입니다.

**optionId**판매옵션 ID (integer<int64>)required

**optionName**판매 옵션명 (string)required

**modelOptionYn**네이버 가격비교 서비스 노출 기준 (boolean)required

가격비교 서비스 노출 기준이 되는 판매옵션 여부를 표시합니다.

(예 : ‘용량‘ 판매옵션명이 True인 경우, 동일 용량 값 기준으로 그룹 내 상품들을 묶어 가격비교 서비스에 노출)

True인 판매옵션명이 존재하지 않는 경우, 별도 묶음 없이 그룹상품 단위 그대로 노출됩니다.

**colorCodeYn**색상코드 입력가능 여부 (boolean)required

색상코드 입력이 가능한 판매옵션 여부를 표시합니다.
그룹상품 등록API를 통해 전달되는 HEX값(#000000 형식)이 색상칩으로 사용될 수 있습니다.

**optionType**판매옵션 유형 (string)required

NUMBER 숫자형, TEXT 문자형
단위값이 존재하는 숫자형 판매옵션의 경우, 숫자+단위값 형식으로 입력해야 합니다.
단위값은 허용되는 단위값 내에서만 사용 가능합니다.

**Possible values:** [`NUMBER`, `TEXT`]

**optionUsableUnits** 판매 옵션 단위 (object)[]

단위 목록이 존재하는 판매 옵션의 경우 판매 옵션값명에 단위가 사용되어야 합니다.
목록에 존재하지 않는 단위는 사용할 수 없습니다.

**unit**단위 (string)

**optionInfo** 판매 옵션 상세 설명 (object)

판매자가 판매 옵션의 개념을 이해하고 정확한 값을 입력할 수 있도록 가이드하기 위해, 판매 옵션에 대해 설명하는 문구입니다.
상품 등록 화면에서 판매 옵션값 입력 창이나 툴팁, 도움말 등에 활용할 수 있습니다.

**tooltip**입력 가이드 문구 정보 (string)

판매 옵션별 툴팁, 도움말 등에 표시되는 문구입니다.

**placeHolder**플레이스홀더 문구 정보 (string)

판매 옵션별로 판매 옵션값 입력 창에 표시되는 문구입니다.

**optionValues** 판매옵션값 (object)[]required

ID가 등록되어 있는 판매 옵션값의 목록으로, 판매 옵션값 입력 창에 자동 완성으로 제공하여 정확한 입력을 돕습니다.
목록에 존재하지 않는 판매 옵션값명은 직접 입력할 수 있습니다.

**valueName**stringrequired

판매옵션값명

**useUnitPrice**단위 가격 사용 여부 (boolean)

**unitPriceValue**단위 가격 표기 용량 (integer<int32>)

**unitPriceText**단위 가격 표기 단위 (string)

```json
{
  "useOptionYn": true,
  "optionGuides": [
    {
      "guideId": 0,
      "standardPurchaseOptions": [
        {
          "optionId": 0,
          "optionName": "string",
          "modelOptionYn": true,
          "colorCodeYn": true,
          "optionType": "NUMBER",
          "optionUsableUnits": [
            {
              "unit": "string"
            }
          ],
          "optionInfo": {
            "tooltip": "string",
            "placeHolder": "string"
          },
          "optionValues": [
            {
              "valueName": "string"
            }
          ]
        }
      ],
      "useUnitPrice": true,
      "unitPriceValue": 0,
      "unitPriceText": "string"
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
curl -L 'https://api.commerce.naver.com/external/v2/standard-purchase-option-guides' \
-H 'Accept: application/json;charset=UTF-8' \
-H 'Authorization: Bearer <token>'
```




https://api.commerce.naver.com/external



Parameters

categoryId — queryrequired
