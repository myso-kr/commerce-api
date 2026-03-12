# 묶음배송 그룹 다건 조회

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-delivery-bundle-group-list-product

# 묶음배송 그룹 다건 조회

```
GET

## /v1/product-delivery-info/bundle-groups
```

묶음배송 그룹 코드 목록을 조회합니다. 묶음배송 그룹명을 입력하지 않으면 전체 목록을 조회합니다. 판매자 등록 후 판매자센터에 접속하지 않은 상태로 API를 호출하는 판매자의 경우 '기본 묶음배송 그룹'이 자동으로 등록됩니다.

## Request[​](#request "Direct link to Request")

### Query Parameters

**name** string

묶음배송 그룹 이름. LIKE '묶음배송 그룹 이름%' 검색

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

**contents** 묶음배송 그룹 정보 구조체 (object)[]

- Array [

**id**묶음배송 그룹 일련번호 (integer<int64>)

등록 요청인 경우에는 입력값이 무시됩니다.

**name**묶음배송 그룹명 (string)required

**usable**사용 여부 (boolean)required

기본 그룹인 경우 자동으로 true로 설정됩니다.

**baseGroup**기본 묶음배송 그룹 여부 (boolean)required

기본 그룹으로 지정 여부. 미입력 시 false로 설정됩니다.

**deliveryFeeChargeMethodType**배송비 계산 방식 코드 (string)required

묶음배송 그룹 등록 시 배송비 계산 방식을 입력하기 위한 코드입니다.

- MIN(묶음배송 그룹에서 가장 작은 배송비로 부과), MAX(묶음배송 그룹에서 가장 큰 배송비로 부과)

**Possible values:** [`MIN`, `MAX`]

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
      "deliveryFeeChargeMethodType": "MIN",
      "deliveryFeeByArea": {
        "deliveryAreaType": "AREA_2",
        "area2extraFee": 0,
        "area3extraFee": 0
      }
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
curl -L 'https://api.commerce.naver.com/external/v1/product-delivery-info/bundle-groups' \
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
