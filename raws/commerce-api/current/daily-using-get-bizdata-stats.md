# 오늘 보고서 API

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/daily-using-get-bizdata-stats

# 오늘 보고서 API

```
GET

## /v1/bizdata-stats/channels/:channelNo/realtime/daily
```

[브랜드스토어 전용] 오늘 스토어의 거래 정보를 실시간으로 제공합니다(1시간 단위).

## Request[​](#request "Direct link to Request")

### Path Parameters

**channelNo** stringrequired

조회 채널 번호

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

**numInteraction**number<double>

유입 수

**numInteractionsByChannel** DimensionAndMetric (object)[]

채널별 유입 수

- Array [

**dimension**string

집계 필드

**metric**number<double>

집계 수치

**rate**number<double>

비율 정보. 비율 값을 전달하는 경우 해당 필드 전달

- ]

**numInteractionsByHour** DimensionAndMetric (object)[]

시간별 유입 수

- Array [

**dimension**string

집계 필드

**metric**number<double>

집계 수치

**rate**number<double>

비율 정보. 비율 값을 전달하는 경우 해당 필드 전달

- ]

**payAmount**number<double>

결제 금액

**payAmountByHour** DimensionAndMetric (object)[]

시간별 결제 금액

- Array [

**dimension**string

집계 필드

**metric**number<double>

집계 수치

**rate**number<double>

비율 정보. 비율 값을 전달하는 경우 해당 필드 전달

- ]

**payAmountByProduct** DimensionAndMetric (object)[]

상품별 결제 금액 상위 10

- Array [

**dimension**string

집계 필드

**metric**number<double>

집계 수치

**rate**number<double>

비율 정보. 비율 값을 전달하는 경우 해당 필드 전달

- ]

```json
{
  "numInteraction": 0,
  "numInteractionsByChannel": [
    {
      "dimension": "string",
      "metric": 0,
      "rate": 0
    }
  ],
  "numInteractionsByHour": [
    {
      "dimension": "string",
      "metric": 0,
      "rate": 0
    }
  ],
  "payAmount": 0,
  "payAmountByHour": [
    {
      "dimension": "string",
      "metric": 0,
      "rate": 0
    }
  ],
  "payAmountByProduct": [
    {
      "dimension": "string",
      "metric": 0,
      "rate": 0
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
curl -L 'https://api.commerce.naver.com/external/v1/bizdata-stats/channels/:channelNo/realtime/daily' \
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
