---
doc-id: "v1-options-standard-options-get"
title: "카테고리별 표준형 옵션 조회"
description: "categoryId stringrequired"
type: api-endpoint
method: GET
path: /v1/options/standard-options
base-url: https://api.commerce.naver.com/external
category: 기타
tags:
  - get
  - reference
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-standard-option-by-category-product
---

# 카테고리별 표준형 옵션 조회



```
> **GET** `https://api.commerce.naver.com/external/v1/options/standard-options`
```

카테고리별 표준형 옵션 조회

## Request

**GET** `/v1/options/standard-options`
### Query Parameters

**categoryId** stringrequired

카테고리 ID

## Responses

**GET** `/v1/options/standard-options` — 응답
성공

**useStandardOption**표준형 옵션 사용 여부 (boolean)

**standardOptionCategoryGroups** 표준형 옵션 그룹 (object)[]

**attributeId**속성 ID (integer<int64>)

**attributeName**옵션명 (string)required

옵션 속성명(예: 색상, 사이즈(공통), 사이즈(미국))

**groupName**옵션 그룹명 (string)

(예: 사이즈, 색상)

**imageRegistrationUsable**이미지 등록 가능 여부 (boolean)required

**realValueUsable**value 수정 가능 여부 (boolean)required

**optionSetRequired**표준형 옵션 세트 필수 여부 (boolean)required

**standardOptionAttributes** 카테고리별 표준형 옵션 상세 속성 (object)[]

**attributeId**속성 ID (integer<int64>)required

**attributeValueId**속성값 ID (integer<int64>)required

**attributeValueName**속성값 이름 (string)required

**attributeColorCode**속성 색상 코드 (string)

**imageUrls**표준형 옵션에서 사용할 이미지 URL (string)[]

```json
[
  {
    "useStandardOption": true,
    "standardOptionCategoryGroups": [
      {
        "attributeId": 0,
        "attributeName": "string",
        "groupName": "string",
        "imageRegistrationUsable": true,
        "realValueUsable": true,
        "optionSetRequired": true,
        "standardOptionAttributes": [
          {
            "attributeId": 0,
            "attributeValueId": 0,
            "attributeValueName": "string",
            "attributeColorCode": "string",
            "imageUrls": [
              "string"
            ]
          }
        ]
      }
    ]
  }
]
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
curl -L 'https://api.commerce.naver.com/external/v1/options/standard-options' \
-H 'Accept: application/json;charset=UTF-8' \
-H 'Authorization: Bearer <token>'
```




https://api.commerce.naver.com/external



Parameters

categoryId — queryrequired
