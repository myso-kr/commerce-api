---
doc-id: "v1-pay-user-inquiries-get"
title: "고객 문의 조회"
description: "page integer"
type: api-endpoint
method: GET
path: /v1/pay-user/inquiries
base-url: https://api.commerce.naver.com/external
category: 판매자정보
tags:
  - get
  - seller
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-customer-inquiry-pay-user
---

# 고객 문의 조회



```
> **GET** `https://api.commerce.naver.com/external/v1/pay-user/inquiries`
```

## Request

**GET** `/v1/pay-user/inquiries`
### Query Parameters

**page** integer

조회할 페이지 번호. 1~1000000 사이의 값

**Default value:** `1`

**Possible values:** `>= 1` and `<= 1000000`

**size** integer

페이지 크기. 페이지당 10~200건의 문의를 조회할 수 있습니다.

**Default value:** `10`

**Possible values:** `>= 10` and `<= 200`

**startSearchDate** stringrequired

문의 검색 시작일(yyyy-MM-dd). 문의 검색 시작일부터 문의 검색 종료일까지의 문의를 조회합니다.

**endSearchDate** stringrequired

문의 검색 종료일(yyyy-MM-dd). 문의 검색 시작일부터 문의 검색 종료일까지의 문의를 조회합니다.

**answered** string

답변이 완료된 문의 여부(true/false). 생략 시, 답변 완료 여부에 상관없이 모든 문의를 조회합니다.

## Responses

**GET** `/v1/pay-user/inquiries` — 응답
OK

**totalPages**integer<int32>

**totalElements**integer<int64>

**pageable** PageableObject.pay-user (object)

**pageNumber**integer<int32>

**pageSize**integer<int32>

**sort** SortObject.pay-user (object)

**sorted**boolean

**unsorted**boolean

**empty**boolean

**paged**boolean

**unpaged**boolean

**offset**integer<int64>

**first**boolean

**last**boolean

**number**integer<int32>

**sort** SortObject.pay-user (object)

**sorted**boolean

**unsorted**boolean

**empty**boolean

**numberOfElements**integer<int32>

**size**integer<int32>

**content** 고객 문의 내용 구조체 (object)[]

**inquiryNo**integer<int64>required

문의 번호

**category**string

문의 유형. 상품, 배송, 반품, 교환, 환불, 기타가 존재합니다.

**title**stringrequired

문의 제목

**inquiryContent**stringrequired

문의 내용

**inquiryRegistrationDateTime**string<date-time>required

문의 등록 일시(yyyy-MM-dd'T'HH:mm:ss.SSSXXX)

**answerContentId**integer<int64>

최근 문의 답변 ID

**answerContent**string

최근 문의 답변 내용

**answerTemplateNo**integer<int64>

최근 문의 답변 템플릿 번호

**answerRegistrationDateTime**string<date-time>

최근 문의 답변 등록 일시(yyyy-MM-dd'T'HH:mm:ss.SSSXXX)

**answered**booleanrequired

문의 답변 여부

**orderId**stringrequired

주문 ID

**productNo**string

상품번호

**productOrderIdList**string

상품 주문 ID 목록(여러 개의 상품 주문에 대해 문의했을 경우 각각의 상품 주문 ID가 ','로 구분되어 출력됨)

**productName**string

상품명

**productOrderOption**string

상품 주문 옵션

**customerId**string

구매자 ID

**customerName**stringrequired

구매자 이름

**empty**boolean

```json
{
  "totalPages": 0,
  "totalElements": 0,
  "pageable": {
    "pageNumber": 0,
    "pageSize": 0,
    "sort": {
      "sorted": true,
      "unsorted": true,
      "empty": true
    },
    "paged": true,
    "unpaged": true,
    "offset": 0
  },
  "first": true,
  "last": true,
  "number": 0,
  "sort": {
    "sorted": true,
    "unsorted": true,
    "empty": true
  },
  "numberOfElements": 0,
  "size": 0,
  "content": [
    {
      "inquiryNo": 0,
      "category": "string",
      "title": "string",
      "inquiryContent": "string",
      "inquiryRegistrationDateTime": "2024-07-29T15:51:28.071Z",
      "answerContentId": 0,
      "answerContent": "string",
      "answerTemplateNo": 0,
      "answerRegistrationDateTime": "2024-07-29T15:51:28.071Z",
      "answered": true,
      "orderId": "string",
      "productNo": "string",
      "productOrderIdList": "string",
      "productName": "string",
      "productOrderOption": "string",
      "customerId": "string",
      "customerName": "string"
    }
  ],
  "empty": true
}
```

Bad Request

**code**stringrequired

API 오류 코드

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| 4001 | API 명세에 맞지 않는 입력 값입니다. | invalidInputs 필드가 함께 전달됩니다. |
| 4002 | 조회 시작일이 조회 종료일 이후 날짜일 수 없습니다. |  |
| 4003 | 스마트스토어/가맹점의 경우 최대 365일만 조회 가능합니다. |  |
| 4004 | 페이지 번호가 1보다 작을 수 없습니다. |  |
| 4005 | 페이지 번호가 1000000보다 클 수 없습니다. |  |
| 4006 | 페이지 크기가 10보다 작을 수 없습니다. |  |
| 4007 | 페이지 크기가 200보다 클 수 없습니다. |  |
| 4010 | 스마트스토어/가맹점 인증 정보를 해석할 수 없습니다. |  |
| 4040 | 요청 Path를 찾을 수 없습니다. |  |
| 5000 | 알 수 없는 오류가 발생하였습니다. | 서버 내부에서 발생한 오류이므로 문의 부탁드립니다. |
| 5001 | 스마트스토어/가맹점 인증 정보가 잘못되었습니다. |  |

**message**stringrequired

API 오류 메시지

**traceId**string

API 오류 추적용 ID. 5000 API 오류 코드 발생으로 인한 문의 시 함께 전달 부탁드립니다.

**timestamp**string<date-time>required

API 오류 발생 시간. 5000 API 오류 코드 발생으로 인한 문의 시 함께 전달 부탁드립니다.

**invalidInputs** InputViolation.pay-user (object)[]

API 오류 발생 원인. 4001 API 오류 코드 발생 시 전달되는 정보입니다.

**name**stringrequired

**message**stringrequired

```json
{
  "code": "string",
  "message": "string",
  "traceId": "string",
  "timestamp": "2024-07-29T15:51:28.071Z",
  "invalidInputs": [
    {
      "name": "string",
      "message": "string"
    }
  ]
}
```

Unauthorized

**code**stringrequired

API 오류 코드

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| 4001 | API 명세에 맞지 않는 입력 값입니다. | invalidInputs 필드가 함께 전달됩니다. |
| 4002 | 조회 시작일이 조회 종료일 이후 날짜일 수 없습니다. |  |
| 4003 | 스마트스토어/가맹점의 경우 최대 365일만 조회 가능합니다. |  |
| 4004 | 페이지 번호가 1보다 작을 수 없습니다. |  |
| 4005 | 페이지 번호가 1000000보다 클 수 없습니다. |  |
| 4006 | 페이지 크기가 10보다 작을 수 없습니다. |  |
| 4007 | 페이지 크기가 200보다 클 수 없습니다. |  |
| 4010 | 스마트스토어/가맹점 인증 정보를 해석할 수 없습니다. |  |
| 4040 | 요청 Path를 찾을 수 없습니다. |  |
| 5000 | 알 수 없는 오류가 발생하였습니다. | 서버 내부에서 발생한 오류이므로 문의 부탁드립니다. |
| 5001 | 스마트스토어/가맹점 인증 정보가 잘못되었습니다. |  |

**message**stringrequired

API 오류 메시지

**traceId**string

API 오류 추적용 ID. 5000 API 오류 코드 발생으로 인한 문의 시 함께 전달 부탁드립니다.

**timestamp**string<date-time>required

API 오류 발생 시간. 5000 API 오류 코드 발생으로 인한 문의 시 함께 전달 부탁드립니다.

**invalidInputs** InputViolation.pay-user (object)[]

API 오류 발생 원인. 4001 API 오류 코드 발생 시 전달되는 정보입니다.

**name**stringrequired

**message**stringrequired

```json
{
  "code": "string",
  "message": "string",
  "traceId": "string",
  "timestamp": "2024-07-29T15:51:28.071Z",
  "invalidInputs": [
    {
      "name": "string",
      "message": "string"
    }
  ]
}
```

Not Found

**code**stringrequired

API 오류 코드

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| 4001 | API 명세에 맞지 않는 입력 값입니다. | invalidInputs 필드가 함께 전달됩니다. |
| 4002 | 조회 시작일이 조회 종료일 이후 날짜일 수 없습니다. |  |
| 4003 | 스마트스토어/가맹점의 경우 최대 365일만 조회 가능합니다. |  |
| 4004 | 페이지 번호가 1보다 작을 수 없습니다. |  |
| 4005 | 페이지 번호가 1000000보다 클 수 없습니다. |  |
| 4006 | 페이지 크기가 10보다 작을 수 없습니다. |  |
| 4007 | 페이지 크기가 200보다 클 수 없습니다. |  |
| 4010 | 스마트스토어/가맹점 인증 정보를 해석할 수 없습니다. |  |
| 4040 | 요청 Path를 찾을 수 없습니다. |  |
| 5000 | 알 수 없는 오류가 발생하였습니다. | 서버 내부에서 발생한 오류이므로 문의 부탁드립니다. |
| 5001 | 스마트스토어/가맹점 인증 정보가 잘못되었습니다. |  |

**message**stringrequired

API 오류 메시지

**traceId**string

API 오류 추적용 ID. 5000 API 오류 코드 발생으로 인한 문의 시 함께 전달 부탁드립니다.

**timestamp**string<date-time>required

API 오류 발생 시간. 5000 API 오류 코드 발생으로 인한 문의 시 함께 전달 부탁드립니다.

**invalidInputs** InputViolation.pay-user (object)[]

API 오류 발생 원인. 4001 API 오류 코드 발생 시 전달되는 정보입니다.

**name**stringrequired

**message**stringrequired

```json
{
  "code": "string",
  "message": "string",
  "traceId": "string",
  "timestamp": "2024-07-29T15:51:28.071Z",
  "invalidInputs": [
    {
      "name": "string",
      "message": "string"
    }
  ]
}
```

Method Not Allowed

**code**stringrequired

API 오류 코드

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| 4001 | API 명세에 맞지 않는 입력 값입니다. | invalidInputs 필드가 함께 전달됩니다. |
| 4002 | 조회 시작일이 조회 종료일 이후 날짜일 수 없습니다. |  |
| 4003 | 스마트스토어/가맹점의 경우 최대 365일만 조회 가능합니다. |  |
| 4004 | 페이지 번호가 1보다 작을 수 없습니다. |  |
| 4005 | 페이지 번호가 1000000보다 클 수 없습니다. |  |
| 4006 | 페이지 크기가 10보다 작을 수 없습니다. |  |
| 4007 | 페이지 크기가 200보다 클 수 없습니다. |  |
| 4010 | 스마트스토어/가맹점 인증 정보를 해석할 수 없습니다. |  |
| 4040 | 요청 Path를 찾을 수 없습니다. |  |
| 5000 | 알 수 없는 오류가 발생하였습니다. | 서버 내부에서 발생한 오류이므로 문의 부탁드립니다. |
| 5001 | 스마트스토어/가맹점 인증 정보가 잘못되었습니다. |  |

**message**stringrequired

API 오류 메시지

**traceId**string

API 오류 추적용 ID. 5000 API 오류 코드 발생으로 인한 문의 시 함께 전달 부탁드립니다.

**timestamp**string<date-time>required

API 오류 발생 시간. 5000 API 오류 코드 발생으로 인한 문의 시 함께 전달 부탁드립니다.

**invalidInputs** InputViolation.pay-user (object)[]

API 오류 발생 원인. 4001 API 오류 코드 발생 시 전달되는 정보입니다.

**name**stringrequired

**message**stringrequired

```json
{
  "code": "string",
  "message": "string",
  "traceId": "string",
  "timestamp": "2024-07-29T15:51:28.071Z",
  "invalidInputs": [
    {
      "name": "string",
      "message": "string"
    }
  ]
}
```

Not Acceptable

**string**string

```json
"string"
```

Unsupported Media Type

**code**stringrequired

API 오류 코드

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| 4001 | API 명세에 맞지 않는 입력 값입니다. | invalidInputs 필드가 함께 전달됩니다. |
| 4002 | 조회 시작일이 조회 종료일 이후 날짜일 수 없습니다. |  |
| 4003 | 스마트스토어/가맹점의 경우 최대 365일만 조회 가능합니다. |  |
| 4004 | 페이지 번호가 1보다 작을 수 없습니다. |  |
| 4005 | 페이지 번호가 1000000보다 클 수 없습니다. |  |
| 4006 | 페이지 크기가 10보다 작을 수 없습니다. |  |
| 4007 | 페이지 크기가 200보다 클 수 없습니다. |  |
| 4010 | 스마트스토어/가맹점 인증 정보를 해석할 수 없습니다. |  |
| 4040 | 요청 Path를 찾을 수 없습니다. |  |
| 5000 | 알 수 없는 오류가 발생하였습니다. | 서버 내부에서 발생한 오류이므로 문의 부탁드립니다. |
| 5001 | 스마트스토어/가맹점 인증 정보가 잘못되었습니다. |  |

**message**stringrequired

API 오류 메시지

**traceId**string

API 오류 추적용 ID. 5000 API 오류 코드 발생으로 인한 문의 시 함께 전달 부탁드립니다.

**timestamp**string<date-time>required

API 오류 발생 시간. 5000 API 오류 코드 발생으로 인한 문의 시 함께 전달 부탁드립니다.

**invalidInputs** InputViolation.pay-user (object)[]

API 오류 발생 원인. 4001 API 오류 코드 발생 시 전달되는 정보입니다.

**name**stringrequired

**message**stringrequired

```json
{
  "code": "string",
  "message": "string",
  "traceId": "string",
  "timestamp": "2024-07-29T15:51:28.071Z",
  "invalidInputs": [
    {
      "name": "string",
      "message": "string"
    }
  ]
}
```

Internal Server Error

**code**stringrequired

API 오류 코드

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| 4001 | API 명세에 맞지 않는 입력 값입니다. | invalidInputs 필드가 함께 전달됩니다. |
| 4002 | 조회 시작일이 조회 종료일 이후 날짜일 수 없습니다. |  |
| 4003 | 스마트스토어/가맹점의 경우 최대 365일만 조회 가능합니다. |  |
| 4004 | 페이지 번호가 1보다 작을 수 없습니다. |  |
| 4005 | 페이지 번호가 1000000보다 클 수 없습니다. |  |
| 4006 | 페이지 크기가 10보다 작을 수 없습니다. |  |
| 4007 | 페이지 크기가 200보다 클 수 없습니다. |  |
| 4010 | 스마트스토어/가맹점 인증 정보를 해석할 수 없습니다. |  |
| 4040 | 요청 Path를 찾을 수 없습니다. |  |
| 5000 | 알 수 없는 오류가 발생하였습니다. | 서버 내부에서 발생한 오류이므로 문의 부탁드립니다. |
| 5001 | 스마트스토어/가맹점 인증 정보가 잘못되었습니다. |  |

**message**stringrequired

API 오류 메시지

**traceId**string

API 오류 추적용 ID. 5000 API 오류 코드 발생으로 인한 문의 시 함께 전달 부탁드립니다.

**timestamp**string<date-time>required

API 오류 발생 시간. 5000 API 오류 코드 발생으로 인한 문의 시 함께 전달 부탁드립니다.

**invalidInputs** InputViolation.pay-user (object)[]

API 오류 발생 원인. 4001 API 오류 코드 발생 시 전달되는 정보입니다.

**name**stringrequired

**message**stringrequired

```json
{
  "code": "string",
  "message": "string",
  "traceId": "string",
  "timestamp": "2024-07-29T15:51:28.071Z",
  "invalidInputs": [
    {
      "name": "string",
      "message": "string"
    }
  ]
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
curl -L 'https://api.commerce.naver.com/external/v1/pay-user/inquiries' \
-H 'Accept: application/json;charset=UTF-8' \
-H 'Authorization: Bearer <token>'
```




https://api.commerce.naver.com/external



Parameters

startSearchDate — queryrequired

endSearchDate — queryrequired

Show optional parameters

page — query

size — query

answered — query
