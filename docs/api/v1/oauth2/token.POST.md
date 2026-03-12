---
doc-id: "v1-oauth2-token-post"
title: "인증 토큰 발급 요청"
description: "API 활용을 위한 인증 토큰을 발급/갱신 요청합니다. 동일 리소스(type과 account_id에 따라)에는 하나의 인증 토큰의 발급되며 인증 토큰의 유효 시간은 3시간(10,800초)입니다. 발급된 인증 토큰이 존재하는 경우 남은 유효 시간이 30분 이상이면 기존 인증 토큰이 반환되고 30분 미만이면 새로운 인증 토큰이 발급됩니다."
type: api-endpoint
method: POST
path: /v1/oauth2/token
base-url: https://api.commerce.naver.com/external
category: 인증
tags:
  - auth
  - oauth2
  - post
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/exchange-sellers-auth
---

# 인증 토큰 발급 요청



```
> **POST** `https://api.commerce.naver.com/external/v1/oauth2/token`
```

API 활용을 위한 인증 토큰을 발급/갱신 요청합니다.  
동일 리소스(type과 account_id에 따라)에는 하나의 인증 토큰의 발급되며 인증 토큰의 유효 시간은 3시간(10,800초)입니다. 발급된 인증 토큰이 존재하는 경우 남은 유효 시간이 30분 이상이면 기존 인증 토큰이 반환되고 30분 미만이면 새로운 인증 토큰이 발급됩니다. 새로운 인증 토큰이 발급된 경우에도 유효 시간이 만료되기 전까지는 기존 인증 토큰을 사용할 수 있습니다.

## Request

**POST** `/v1/oauth2/token`
### Body**required**

**client_id**stringrequired

제공된 애플리케이션 ID

**Example:** `7dMvteboKNHwyRremLXXXX`

**timestamp**integer<int64>required

전자서명 생성 시 사용된 밀리초(millisecond) 단위의 Unix 시간. 5분간 유효

**Example:** `1706671059230`

**grant_type**stringrequired

OAuth2 인증 방식.   
- 고정값 client_credentials 사용

**Example:** `client_credentials`

**Possible values:** [`client_credentials`]

**client_secret_sign**stringrequired

[전자서명 생성 방법](https://apicenter.commerce.naver.com/docs/auth#%EC%A0%84%EC%9E%90%EC%84%9C%EB%AA%85)을 따라 생성된 전자서명

**Example:** `JDJhJDA0JFFLTG5vdTFEMmNTSDE5UGlhMzBiY3VNbE5FSGVCaHhUS3Uuajc0VmZ3TlNiOFhxVzNhXXXX`

**type**stringrequired

인증 토큰 발급 타입. SELF인 경우 자기 자신의 리소스, SELLER인 경우 관련 판매자의 리소스에 대한 발급.

**Example:** `SELLER`

**Possible values:** [`SELLER`, `SELF`]

**account_id**string

type이 SELLER인 경우 입력해야 하는 판매자 ID 혹은 판매자 UID

**Example:** `ncp_2sRZTWJVbDtHPoz9OXXXX`

## Responses

**POST** `/v1/oauth2/token` — 응답
발급 성공 결과

**access_token**string

인증 토큰

**expires_in**integer<int64>

인증 유효 기간(초)

**token_type**string

인증 토큰 종류

```json
{
  "access_token": "string",
  "expires_in": 0,
  "token_type": "string"
}
```

유효성 검사 오류

**code**string

오류 코드

**message**string

오류 메시지

**timestamp**string<date-time>

오류 발생 일시

**invalidInputs**InvalidInput.sellers-auth (object)[]

유효하지 않은 항목 목록. 400(Bad Request), 403(Forbidden) 상태 코드와 함께 활용.

**data**object

추가 데이터 정보

```json
{
  "code": "string",
  "message": "string",
  "timestamp": "2024-07-29T15:51:28.071Z",
  "invalidInputs": [
    {}
  ],
  "data": {}
}
```

접근 권한 오류

**code**string

오류 코드

**message**string

오류 메시지

**timestamp**string<date-time>

오류 발생 일시

**invalidInputs**InvalidInput.sellers-auth (object)[]

유효하지 않은 항목 목록. 400(Bad Request), 403(Forbidden) 상태 코드와 함께 활용.

**data**object

추가 데이터 정보

```json
{
  "code": "string",
  "message": "string",
  "timestamp": "2024-07-29T15:51:28.071Z",
  "invalidInputs": [
    {}
  ],
  "data": {}
}
```

일시적인 내부 시스템 오류

**code**string

오류 코드

**message**string

오류 메시지

**timestamp**string<date-time>

오류 발생 일시

**invalidInputs**InvalidInput.sellers-auth (object)[]

유효하지 않은 항목 목록. 400(Bad Request), 403(Forbidden) 상태 코드와 함께 활용.

**data**object

추가 데이터 정보

```json
{
  "code": "string",
  "message": "string",
  "timestamp": "2024-07-29T15:51:28.071Z",
  "invalidInputs": [
    {}
  ],
  "data": {}
}
```



```bash
curl -L -X POST 'https://api.commerce.naver.com/external/v1/oauth2/token' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-H 'Accept: application/json'
```




https://api.commerce.naver.com/external

Body required

client_idrequired

timestamprequired

grant_typerequired

---client_credentials

client_secret_signrequired

typerequired

---SELLERSELF

account_id
