---
doc-id: "v1-product-delivery-info-hope-delivery-groups-post"
title: "희망일배송 그룹 등록"
description: "hopeDeliveryGroup 희망일배송 그룹 정보 구조체 (object)required"
type: api-endpoint
method: POST
path: /v1/product-delivery-info/hope-delivery-groups
base-url: https://api.commerce.naver.com/external
category: 기타
tags:
  - post
  - reference
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/create-hope-delivery-group-product
---

# 희망일배송 그룹 등록



```
> **POST** `https://api.commerce.naver.com/external/v1/product-delivery-info/hope-delivery-groups`
```

희망일배송 그룹 등록

## Request

**POST** `/v1/product-delivery-info/hope-delivery-groups`
### Body**required**

**hopeDeliveryGroup** 희망일배송 그룹 정보 구조체 (object)required

희망일배송 그룹
이 구조체는 상품의 배송 정보 중 희망일배송 그룹 정보 데이터를 표현하는 구조체입니다.
희망일배송 그룹 정보는 희망일배송 설정 상품에만 적용 가능하며 희망일배송 설정은 일부 판매자에 한하여 지정 조건에서만 설정이 가능합니다.

- 이 구조체는 API 호출에 대한 요청/응답 모두에서 사용합니다.
- 구조체의 객체 1개는 희망일배송 그룹 1개를 표현합니다.
- 이 구조체는 아래 API에서 사용합니다.
  - 희망일배송 그룹 다건 조회, 희망일배송 그룹 등록, 희망일배송 그룹 단건 조회, 희망일배송 그룹 수정
    이 구조체는 상품의 배송 정보 중 희망일배송 그룹 정보 데이터를 표현하는 구조체입니다.
    희망일배송 그룹 정보는 희망일배송 설정 상품에만 적용 가능하며 희망일배송 설정은 일부 판매자에 한하여 지정 조건에서만 설정이 가능합니다.
- 이 구조체는 API 호출에 대한 요청/응답 모두에서 사용합니다.
- 구조체의 객체 1개는 희망일배송 그룹 1개를 표현합니다.
- 이 구조체는 아래 API에서 사용합니다.
  - 희망일배송 그룹 다건 조회, 희망일배송 그룹 등록, 희망일배송 그룹 단건 조회, 희망일배송 그룹 수정

**id**희망일배송 그룹 ID (integer<int64>)

**name**희망일배송 그룹명 (string)required

**usable**사용 여부 (boolean)required

**baseGroup**기본 희망일배송 그룹 여부 (boolean)required

**hopeGroupStartTime**배송 희망시간 시작 시각 (integer<int32>)

**hopeGroupEndTime**배송 희망시간 종료 시각 (integer<int32>)

**regularHolidays**정기휴무 요일 목록 (string)[]

- SUNDAY(일요일), MONDAY(월요일), TUESDAY(화요일), WEDNESDAY(수요일), THURSDAY(목요일), FRIDAY(금요일), SATURDAY(토요일)

**Possible values:** [`SUNDAY`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`]

**ladderTruckUseComment**사다리차 이용 시 입력 사항 (string)

**productRemovalType**기존 상품 철거/수거 타입 (string)

- DOWN_FIRST_FLOOR(1층까지 내림), COLLECT_SELLER(수거)

**Possible values:** [`DOWN_FIRST_FLOOR`, `COLLECT_SELLER`]

**hopeDeliveryGroupDays** 배송 희망일자 목록 (object)[]required

**id**배송 희망일자 ID (integer<int64>)

**regionName**지역명 (string)required

**usable**사용 여부 (boolean)required

**hopeStartDay**배송 희망일자 시작일 (integer<int32>)

**hopeEndDay**배송 희망일자 종료일 (integer<int32>)

**expectationDeliveryFee**예상 배송비 (integer<int32>)

**Possible values:** `<= 100000`

## Responses

**POST** `/v1/product-delivery-info/hope-delivery-groups` — 응답
성공

**groupId**배송 그룹 일련번호 (integer<int64>)

```json
{
  "groupId": 0
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
curl -L 'https://api.commerce.naver.com/external/v1/product-delivery-info/hope-delivery-groups' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json;charset=UTF-8' \
-H 'Authorization: Bearer <token>' \
-d '{
  "hopeDeliveryGroup": {
    "id": 0,
    "name": "string",
    "usable": true,
    "baseGroup": true,
    "hopeGroupStartTime": 0,
    "hopeGroupEndTime": 0,
    "regularHolidays": [
      "SUNDAY"
    ],
    "ladderTruckUseComment": "string",
    "productRemovalType": "DOWN_FIRST_FLOOR",
    "hopeDeliveryGroupDays": [
      {
        "id": 0,
        "regionName": "string",
        "usable": true,
        "hopeStartDay": 0,
        "hopeEndDay": 0,
        "expectationDeliveryFee": 0
      }
    ]
  }
}'
```




https://api.commerce.naver.com/external



Body required

```json
{
  "hopeDeliveryGroup": {
    "id": 0,
    "name": "string",
    "usable": true,
    "baseGroup": true,
    "hopeGroupStartTime": 0,
    "hopeGroupEndTime": 0,
    "regularHolidays": [
      "SUNDAY"
    ],
    "ladderTruckUseComment": "string",
    "productRemovalType": "DOWN_FIRST_FLOOR",
    "hopeDeliveryGroupDays": [
      {
        "id": 0,
        "regionName": "string",
        "usable": true,
        "hopeStartDay": 0,
        "hopeEndDay": 0,
        "expectationDeliveryFee": 0
      }
    ]
  }
}
```
