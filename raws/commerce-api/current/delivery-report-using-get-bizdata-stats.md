# 배송 통계 API

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/delivery-report-using-get-bizdata-stats

# 배송 통계 API

```
GET

## /v1/bizdata-stats/channels/:channelNo/sales/delivery/detail
```

[브랜드스토어 전용] 배송 유형별 주문량과 배송 현황 데이터를 제공합니다.

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

**deliveryReport** DeliveryReportRow (object)[]

- Array [

**date**string

날짜

**deliveryCompletedCount**number<double>

배송 완료 건수

**deliveryCompletedDueSuccessCount**number<double>

배송 완료일 준수 건수

**deliveryCompletedWithin48HoursCount**number<double>

배송 기간 48시간 내 건수

**deliveryType**string

배송 유형

**dispatchedCount**number<double>

발송 건수

**dispatchedDueSuccessCount**number<double>

발송일 준수 건수

**numPurchases**number<double>

결제 건수

**obligationDeliveryCompletedCount**number<double>

의무 배송 완료 건수

**payAmount**number<double>

결제 금액

**totalDeliveryTime**number<double>

총 배송 기간(ms)

- ]

```json
{
  "deliveryReport": [
    {
      "date": "string",
      "deliveryCompletedCount": 0,
      "deliveryCompletedDueSuccessCount": 0,
      "deliveryCompletedWithin48HoursCount": 0,
      "deliveryType": "string",
      "dispatchedCount": 0,
      "dispatchedDueSuccessCount": 0,
      "numPurchases": 0,
      "obligationDeliveryCompletedCount": 0,
      "payAmount": 0,
      "totalDeliveryTime": 0
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
curl -L 'https://api.commerce.naver.com/external/v1/bizdata-stats/channels/:channelNo/sales/delivery/detail' \
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
