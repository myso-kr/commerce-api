---
doc-id: "v1-products-origin-products-originProductNo-change-status-put"
title: "판매 상태 변경"
description: "원상품의 판매 상태를 변경합니다."
type: api-endpoint
method: PUT
path: /v1/products/origin-products/{originProductNo}/change-status
base-url: https://api.commerce.naver.com/external
category: 상품
tags:
  - product
  - put
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/read-channel-product-product
---

# 판매 상태 변경



```
> **PUT** `https://api.commerce.naver.com/external/v1/products/origin-products/{originProductNo}/change-status`
```

원상품의 판매 상태를 변경합니다.

## Request

**PUT** `/v1/products/origin-products/{originProductNo}/change-status`
### Path Parameters

**originProductNo** integer<int64>required

원상품번호

### Body**required**

**statusType**상품 판매 상태 코드 (string)required

변경하려는 상품 판매 상태

- SALE(판매 중), OUTOFSTOCK(품절), SUSPENSION(판매 중지)
  현재 상태에 따라 변경 가능한 상태는 다음과 같습니다.
- SALE(판매 중) → OUTOFSTOCK(품절)으로 변경(재고 수량은 0으로 변경됨)
- SUSPENSION(판매 중지), OUTOFSTOCK(품절) → SALE(판매 중)로 변경(품절에서 판매 중으로 변경 시 재고 수량 입력 필수)
- SALE(판매 중), OUTOFSTOCK(품절), WAIT(판매대기) → SUSPENSION(판매 중지)으로 변경

상품의 재고 수량이 0인 경우 상태는 전달된 값과 무관하게 OUTOFSTCOK(품절) 상태를 유지합니다.
단, 현재 상태가 SUSPENSION(판매 중지)이면 전송된 재고 수량이 0이어도 SUSPENSION(판매 중지)으로 유지됩니다.

**Possible values:** [`WAIT`, `SALE`, `OUTOFSTOCK`, `UNADMISSION`, `REJECTION`, `SUSPENSION`, `CLOSE`, `PROHIBITION`, `DELETE`]

**saleStartDate**판매 시작 일시 (string<date-time>)

'yyyy-MM-dd'T'HH:mm[:ss][.SSS]XXX' 형식으로 입력합니다.

**saleEndDate**판매 종료 일시 (string<date-time>)

'yyyy-MM-dd'T'HH:mm[:ss][.SSS]XXX' 형식으로 입력합니다.

**stockQuantity**재고 수량 (integer<int64>)

변경하려는 재고 수량

**Possible values:** `<= 99999999`

## Responses

**PUT** `/v1/products/origin-products/{originProductNo}/change-status` — 응답
성공

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
curl -L -X PUT 'https://api.commerce.naver.com/external/v1/products/origin-products/:originProductNo/change-status' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json;charset=UTF-8' \
-H 'Authorization: Bearer <token>' \
-d '{
  "statusType": "WAIT",
  "saleStartDate": "2024-07-29T15:51:28.071Z",
  "saleEndDate": "2024-07-29T15:51:28.071Z",
  "stockQuantity": 0
}'
```




https://api.commerce.naver.com/external



Parameters

originProductNo — pathrequired

Body required

```json
{
  "statusType": "WAIT",
  "saleStartDate": "2024-07-29T15:51:28.071Z",
  "saleEndDate": "2024-07-29T15:51:28.071Z",
  "stockQuantity": 0
}
```
