# 희망일배송 그룹 다건 조회

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-hope-delivery-group-list-product

# 희망일배송 그룹 다건 조회

```
GET

## /v1/product-delivery-info/hope-delivery-groups
```

희망일배송 그룹 목록을 조회합니다.

## Request[​](#request "Direct link to Request")

### Query Parameters

**name** string

희망일배송 그룹 이름. LIKE '희망일배송 그룹 이름%' 검색

**baseGroup** boolean

기본 그룹 여부

**usable** boolean

사용 여부

**page** integer<int32>

페이지 번호. 첫 번째 페이지 번호는 1입니다.

**Default value:** `1`

**size** integer<int32>

페이지 크기. 페이지당 100건까지 조회할 수 있습니다.

**Default value:** `50`

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

**contents** 희망일배송 그룹 정보 구조체 (object)[]

- Array [

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

- DOWN\_FIRST\_FLOOR(1층까지 내림), COLLECT\_SELLER(수거)

**Possible values:** [`DOWN_FIRST_FLOOR`, `COLLECT_SELLER`]

**hopeDeliveryGroupDays** 배송 희망일자 목록 (object)[]required

- Array [

**id**배송 희망일자 ID (integer<int64>)

**regionName**지역명 (string)required

**usable**사용 여부 (boolean)required

**hopeStartDay**배송 희망일자 시작일 (integer<int32>)

**hopeEndDay**배송 희망일자 종료일 (integer<int32>)

**expectationDeliveryFee**예상 배송비 (integer<int32>)

**Possible values:** `<= 100000`

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
curl -L 'https://api.commerce.naver.com/external/v1/product-delivery-info/hope-delivery-groups' \
-H 'Accept: application/json;charset=UTF-8' \
-H 'Authorization: Bearer <token>'
```

Request Collapse all

Base URL

Edit

https://api.commerce.naver.com/external

Auth

Bearer Token

ParametersShow optional parameters

name — query

baseGroup — query

---truefalse

usable — query

---truefalse

page — query

size — query
