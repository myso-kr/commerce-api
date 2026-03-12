---
doc-id: "v1-bizdata-stats-channels-channelNo-marketing-website-detail-get"
title: "웹사이트 채널 API"
description: "[브랜드스토어 전용] 조회 기간 내 웹사이트 채널을 통한 유입 및 결제 성과를 유입 수 기준 상위 1000개 제공합니다."
type: api-endpoint
method: GET
path: /v1/bizdata-stats/channels/{channelNo}/marketing/website/detail
base-url: https://api.commerce.naver.com/external
category: API데이터솔루션
tags:
  - get
  - stats
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/website-channel-report-using-get-bizdata-stats
---

# 웹사이트 채널 API



```
> **GET** `https://api.commerce.naver.com/external/v1/bizdata-stats/channels/{channelNo}/marketing/website/detail`
```

[브랜드스토어 전용] 조회 기간 내 웹사이트 채널을 통한 유입 및 결제 성과를 유입 수 기준 상위 1000개 제공합니다.

## Request

**GET** `/v1/bizdata-stats/channels/{channelNo}/marketing/website/detail`
### Path Parameters

**channelNo** stringrequired

조회 채널 번호

### Query Parameters

**startDate** stringrequired

조회 시작일

**endDate** stringrequired

조회 종료일

## Responses

**GET** `/v1/bizdata-stats/channels/{channelNo}/marketing/website/detail` — 응답
OK

- \*/\*



**rows** WebsiteChannelReportRow (object)[]

웹사이트 채널 항목

**deviceCategory**string

채널 속성

**numInteractions**number<double>

유입 수

**numPurchases**number<double>

결제 수

**numUsers**number<double>

유입 고객 수

**payAmount**number<double>

결제 금액

**pv**number<double>

페이지 수

**refDomain**string

채널 상세

```json
{
  "rows": [
    {
      "deviceCategory": "string",
      "numInteractions": 0,
      "numPurchases": 0,
      "numUsers": 0,
      "payAmount": 0,
      "pv": 0,
      "refDomain": "string"
    }
  ]
}
```

Bad Request

- \*/\*



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
curl -L 'https://api.commerce.naver.com/external/v1/bizdata-stats/channels/:channelNo/marketing/website/detail' \
-H 'Accept: */*' \
-H 'Authorization: Bearer <token>'
```




https://api.commerce.naver.com/external



Parameters

channelNo — pathrequired

startDate — queryrequired

endDate — queryrequired
