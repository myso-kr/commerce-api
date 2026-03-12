# 상품/마케팅 채널 카테고리(소)별 API

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/product-category-channel-report-using-get-bizdata-stats

# 상품/마케팅 채널 카테고리(소)별 API

```
GET

## /v1/bizdata-stats/channels/:channelNo/sales/product-marketing/category
```

[브랜드스토어 전용] 카테고리(소)별로 최대 50개의 마케팅 채널별 결제 데이터를 결제액 기준 상위 15개 카테고리에 대해 제공합니다.

## Request[​](#request "Direct link to Request")

### Path Parameters

**channelNo** stringrequired

조회 채널 번호

### Query Parameters

**startDate** stringrequired

조회 시작일

**endDate** stringrequired

조회 종료일

## Responses[​](#responses "Direct link to Responses")

- 200
- 400
- 401
- 403
- 500

OK

- \*/\*

- Schema
- Example (auto)

**Schema**

**rows** ProductCategoryChannelReportRow (object)[]

상품/마케팅 채널 카테고리(소)별 채널 분석 항목 목록

- Array [

**channelName**string

채널명

**payAmount**number<double>

결제 금액

**smallCategory**string

상품 카테고리(소)

- ]

```json
{
  "rows": [
    {
      "channelName": "string",
      "payAmount": 0,
      "smallCategory": "string"
    }
  ]
}
```

Bad Request

- \*/\*

- Schema
- Example (auto)

**Schema**

**code**string

오류 코드

**Possible values:** [`E400S00`, `E400S01`, `E400S02`, `E400S03`, `E400S98`, `E400S99`, `E401A01`, `E403A01`, `E404S00`, `E500A01`, `E500S00`, `E500S99`]

**message**string

오류 메시지

**timestamp**string

오류 시간

**traceId**string

Trace ID

```json
{
  "code": "E400S00",
  "message": "string",
  "timestamp": "string",
  "traceId": "string"
}
```

Unauthorized

- \*/\*

- Schema
- Example (auto)

**Schema**

**code**string

오류 코드

**Possible values:** [`E400S00`, `E400S01`, `E400S02`, `E400S03`, `E400S98`, `E400S99`, `E401A01`, `E403A01`, `E404S00`, `E500A01`, `E500S00`, `E500S99`]

**message**string

오류 메시지

**timestamp**string

오류 시간

**traceId**string

Trace ID

```json
{
  "code": "E400S00",
  "message": "string",
  "timestamp": "string",
  "traceId": "string"
}
```

Forbidden

- \*/\*

- Schema
- Example (auto)

**Schema**

**code**string

오류 코드

**Possible values:** [`E400S00`, `E400S01`, `E400S02`, `E400S03`, `E400S98`, `E400S99`, `E401A01`, `E403A01`, `E404S00`, `E500A01`, `E500S00`, `E500S99`]

**message**string

오류 메시지

**timestamp**string

오류 시간

**traceId**string

Trace ID

```json
{
  "code": "E400S00",
  "message": "string",
  "timestamp": "string",
  "traceId": "string"
}
```

Internal Server Error

- \*/\*

- Schema
- Example (auto)

**Schema**

**code**string

오류 코드

**Possible values:** [`E400S00`, `E400S01`, `E400S02`, `E400S03`, `E400S98`, `E400S99`, `E401A01`, `E403A01`, `E404S00`, `E500A01`, `E500S00`, `E500S99`]

**message**string

오류 메시지

**timestamp**string

오류 시간

**traceId**string

Trace ID

```json
{
  "code": "E400S00",
  "message": "string",
  "timestamp": "string",
  "traceId": "string"
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
curl -L 'https://api.commerce.naver.com/external/v1/bizdata-stats/channels/:channelNo/sales/product-marketing/category' \
-H 'Accept: */*' \
-H 'Authorization: Bearer <token>'
```

Request Collapse all

Base URL

Edit

https://api.commerce.naver.com/external

Auth

Bearer Token

Parameters

channelNo — pathrequired

startDate — queryrequired

endDate — queryrequired
