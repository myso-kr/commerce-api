---
doc-id: "v1-commerce-solutions-subscriptions-unsubscription-approve-put"
title: "사용 해지 승인"
description: "사용 해지 승인(개별 솔루션 사용에만 동작)"
type: api-endpoint
method: PUT
path: /v1/commerce-solutions/subscriptions/unsubscription/approve
base-url: https://api.commerce.naver.com/external
category: 커머스솔루션
tags:
  - commerce-solution
  - put
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/approve-unsubscription-merchant
---

# 사용 해지 승인



```
> **PUT** `https://api.commerce.naver.com/external/v1/commerce-solutions/subscriptions/unsubscription/approve`
```

사용 해지 승인(개별 솔루션 사용에만 동작)

## Request

**PUT** `/v1/commerce-solutions/subscriptions/unsubscription/approve`
### Query Parameters

**accountUid** stringrequired

## Responses

**PUT** `/v1/commerce-solutions/subscriptions/unsubscription/approve` — 응답
사용 해지 승인 성공

**accountUid**계정 UID (string)

계정 UID

**solutionId**string

솔루션 ID

**status**사용 상태 (string)

사용 상태

**Possible values:** [`SUBSCRIBING`, `WAITING_SUBSCRIPTION`, `ON_EXAMINATION`, `UNSUBSCRIBED`, `WAITING_UNSUBSCRIPTION`, `ON_PAYMENT_FAIL`, `CANCEL_SUBSCRIPTION`]

**accountMappingId**계정 매핑 ID (string)

솔루션 개발사에서 자체 관리하는 계정 매핑 ID

```json
{
  "accountUid": "string",
  "solutionId": "string",
  "status": "SUBSCRIBING",
  "accountMappingId": "string"
}
```

## Bad Request

---

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| BAD_REQUEST | 잘못된 요청 |  |
| NOTTING_TO_CHANGE | 변경할 사항이 없음 |  |
| CHANGE_COUNT_LIMIT | 변경 횟수 초과 |  |
| NOT_ALLOW_AFTER_UNSUBSCRIPTION | 해지 후 허락되지 않은 요청 |  |
| NOT_ALLOW_AFTER_PAYMENT | 다음 회차 결제 이후 허락되지 않은 요청 |  |
| INVALID_REQUEST_CONDITION | 유효하지 않은 조건 |  |
| INACTIVE_SOLUTION_REQUESTED | 비정상 상태인 솔루션에 대한 요청 |  |
| INVALID_SOLUTION | 유효하지 않은 솔루션에 대한 요청 |  |
| NOT_SUBSCRIBING | 사용하지 않는 솔루션에 대한 요청 |  |
| NOT_ACCOUNT_AUTHENTICATION | 미인증 계정 |  |
| INVALID_INPUT | 유효하지 않은 입력 |  |

---

**code**string

오류 코드

**message**string

오류 메시지

**invalidInputs** InvalidInput.merchant (object)[]

유효성 검사 오류

- 400(Bad Request) 상태 코드와 함께 활용

**name**string

유효성 검사 오류가 발생한 필드/경로 변수/파라미터 이름

**message**string

유효성 검사 메시지

**timestamp**string<date-time>

오류 발생 시간

**Example:** `2020-04-27T19:21:38.774Z`

**traceId**string

해당 요청에 대한 Trace ID

**Example:** `44c1eec345d4d446`

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "message": "string"
    }
  ],
  "timestamp": "2020-04-27T19:21:38.774Z",
  "traceId": "44c1eec345d4d446"
}
```

## Unauthorized

---

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| INVALID_USER | 유효하지 않은 사용자 |  |
| INVALID_SELLER_TOKEN | 유효하지 않은 SELLER 토큰 |  |
| EXPIRED_SELLER_TOKEN | 만료된 SELLER 토큰 |  |

---

**code**string

오류 코드

**message**string

오류 메시지

**invalidInputs** InvalidInput.merchant (object)[]

유효성 검사 오류

- 400(Bad Request) 상태 코드와 함께 활용

**name**string

유효성 검사 오류가 발생한 필드/경로 변수/파라미터 이름

**message**string

유효성 검사 메시지

**timestamp**string<date-time>

오류 발생 시간

**Example:** `2020-04-27T19:21:38.774Z`

**traceId**string

해당 요청에 대한 Trace ID

**Example:** `44c1eec345d4d446`

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "message": "string"
    }
  ],
  "timestamp": "2020-04-27T19:21:38.774Z",
  "traceId": "44c1eec345d4d446"
}
```

## Payment Required

---

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| BIZ_WALLET_USE_ERROR | 비즈월렛 오류 |  |

---

**code**string

오류 코드

**message**string

오류 메시지

**invalidInputs** InvalidInput.merchant (object)[]

유효성 검사 오류

- 400(Bad Request) 상태 코드와 함께 활용

**name**string

유효성 검사 오류가 발생한 필드/경로 변수/파라미터 이름

**message**string

유효성 검사 메시지

**timestamp**string<date-time>

오류 발생 시간

**Example:** `2020-04-27T19:21:38.774Z`

**traceId**string

해당 요청에 대한 Trace ID

**Example:** `44c1eec345d4d446`

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "message": "string"
    }
  ],
  "timestamp": "2020-04-27T19:21:38.774Z",
  "traceId": "44c1eec345d4d446"
}
```

## Forbidden

---

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| ABNORMAL_ACCOUNT_STATUS | 비정상 계정으로 접근 |  |
| ACCOUNT_ID_CHANGED | 요청과 다른 계정으로 접근 |  |
| SOLUTION_CHANGED | 유효하지 않은 솔루션 |  |
| NOT_SUBSCRIBABLE_SOLUTION_TYPE | 사용 불가능한 솔루션 유형 |  |
| NOT_AUTHORIZED_ACCOUNT_ROLE | 인가되지 않은 계정 |  |
| UNAUTHORIZED | 인가되지 않음 |  |
| ONLY_BETA_GRADE_AVAILABLE | 베타 요금제에서만 가능 |  |
| JUDGMENT_STATUS_IS_ACQUISITION | 양도 양수 상태의 계정 |  |
| REQUEST_SUBSCRIPTION_REQUIRED | 솔루션 사용 신청 필요 |  |
| ALREADY_SUBSCRIBING | 이미 사용 중인 솔루션 |  |
| NOT_ALLOWED_REFERER | 유효하지 않은 리퍼러 |  |
| NOT_ALLOWED_ACCOUNT | 유효하지 않은 계정 |  |
| NOT_ALLOWED_BUSINESS_TYPE | 유효하지 않은 비즈니스 타입 |  |
| NOT_ALLOWED_BRAND_STORE | 유효하지 않은 브랜드 스토어 |  |
| NOT_ALLOWED_REPRESENT_TYPE | 유효하지 않은 대표 타입 |  |
| NOT_ALLOWED_CHANNEL_TYPE | 유효하지 않은 채널 타입 |  |
| NOT_ALLOWED_GOOD_SERVICE | 유효하지 않은 굿서비스 |  |
| NOT_ALLOWED_SALE_ACTION_GRADE | 유효하지 않은 스토어 등급 |  |
| SUBSCRIBING_USER_EXISTS | 현재 사용자가 존재하여 애플리케이션 변경 불가 |  |

---

**code**string

오류 코드

**message**string

오류 메시지

**invalidInputs** InvalidInput.merchant (object)[]

유효성 검사 오류

- 400(Bad Request) 상태 코드와 함께 활용

**name**string

유효성 검사 오류가 발생한 필드/경로 변수/파라미터 이름

**message**string

유효성 검사 메시지

**timestamp**string<date-time>

오류 발생 시간

**Example:** `2020-04-27T19:21:38.774Z`

**traceId**string

해당 요청에 대한 Trace ID

**Example:** `44c1eec345d4d446`

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "message": "string"
    }
  ],
  "timestamp": "2020-04-27T19:21:38.774Z",
  "traceId": "44c1eec345d4d446"
}
```

## Not Found

---

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| NOT_FOUND | 발견되지 않음 |  |
| DATA_NOT_EXIST | 존재하지 않는 데이터 |  |
| SUBSCRIPTION_NOT_FOUND | 유효하지 않은 솔루션 사용 |  |
| SOLUTION_NOT_FOUND | 유효하지 않은 솔루션 |  |

---

**code**string

오류 코드

**message**string

오류 메시지

**invalidInputs** InvalidInput.merchant (object)[]

유효성 검사 오류

- 400(Bad Request) 상태 코드와 함께 활용

**name**string

유효성 검사 오류가 발생한 필드/경로 변수/파라미터 이름

**message**string

유효성 검사 메시지

**timestamp**string<date-time>

오류 발생 시간

**Example:** `2020-04-27T19:21:38.774Z`

**traceId**string

해당 요청에 대한 Trace ID

**Example:** `44c1eec345d4d446`

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "message": "string"
    }
  ],
  "timestamp": "2020-04-27T19:21:38.774Z",
  "traceId": "44c1eec345d4d446"
}
```

## Not Acceptable

---

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| BLOCK_TIME | 허용되지 않은 시간 |  |
| PREVENT_REJOIN_SAME_DAY | 당일 재가입 금지 |  |

---

**code**string

오류 코드

**message**string

오류 메시지

**invalidInputs** InvalidInput.merchant (object)[]

유효성 검사 오류

- 400(Bad Request) 상태 코드와 함께 활용

**name**string

유효성 검사 오류가 발생한 필드/경로 변수/파라미터 이름

**message**string

유효성 검사 메시지

**timestamp**string<date-time>

오류 발생 시간

**Example:** `2020-04-27T19:21:38.774Z`

**traceId**string

해당 요청에 대한 Trace ID

**Example:** `44c1eec345d4d446`

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "message": "string"
    }
  ],
  "timestamp": "2020-04-27T19:21:38.774Z",
  "traceId": "44c1eec345d4d446"
}
```

## Conflict

---

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| CONDITION_CHANGED | 유효하지 않은 조건 |  |
| DUPLICATE_SUBSCRIBE | 중복 사용 불가 |  |
| DUPLICATED_RESOURCE | 중복 불가 |  |

---

**code**string

오류 코드

**message**string

오류 메시지

**invalidInputs** InvalidInput.merchant (object)[]

유효성 검사 오류

- 400(Bad Request) 상태 코드와 함께 활용

**name**string

유효성 검사 오류가 발생한 필드/경로 변수/파라미터 이름

**message**string

유효성 검사 메시지

**timestamp**string<date-time>

오류 발생 시간

**Example:** `2020-04-27T19:21:38.774Z`

**traceId**string

해당 요청에 대한 Trace ID

**Example:** `44c1eec345d4d446`

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "message": "string"
    }
  ],
  "timestamp": "2020-04-27T19:21:38.774Z",
  "traceId": "44c1eec345d4d446"
}
```

## Internal Server Error

---

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| CRYPTO_FAILURE | 암호화/복호화 실패 |  |
| DATABASE_ERROR | 데이터베이스 오류 |  |
| DATA_ERROR | 유효하지 않은 데이터 |  |
| INVALID_DATA_STATUS | 유효하지 않은 상태의 데이터 |  |
| INVALID_INPUT_DATA | 유효하지 않은 입력 데이터 |  |
| NETWORK_ERROR | 네트워크 오류 |  |
| BILL_ERROR | 유효하지 않은 청구서 |  |
| UNKNOWN_ERROR | 미확인 오류 |  |

---

**code**string

오류 코드

**message**string

오류 메시지

**invalidInputs** InvalidInput.merchant (object)[]

유효성 검사 오류

- 400(Bad Request) 상태 코드와 함께 활용

**name**string

유효성 검사 오류가 발생한 필드/경로 변수/파라미터 이름

**message**string

유효성 검사 메시지

**timestamp**string<date-time>

오류 발생 시간

**Example:** `2020-04-27T19:21:38.774Z`

**traceId**string

해당 요청에 대한 Trace ID

**Example:** `44c1eec345d4d446`

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "message": "string"
    }
  ],
  "timestamp": "2020-04-27T19:21:38.774Z",
  "traceId": "44c1eec345d4d446"
}
```

## Service Unavailable

---

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DATABASE_ROS | 데이터베이스가 읽기 모드 전용 |  |

---

**code**string

오류 코드

**message**string

오류 메시지

**invalidInputs** InvalidInput.merchant (object)[]

유효성 검사 오류

- 400(Bad Request) 상태 코드와 함께 활용

**name**string

유효성 검사 오류가 발생한 필드/경로 변수/파라미터 이름

**message**string

유효성 검사 메시지

**timestamp**string<date-time>

오류 발생 시간

**Example:** `2020-04-27T19:21:38.774Z`

**traceId**string

해당 요청에 대한 Trace ID

**Example:** `44c1eec345d4d446`

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "message": "string"
    }
  ],
  "timestamp": "2020-04-27T19:21:38.774Z",
  "traceId": "44c1eec345d4d446"
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
curl -L -X PUT 'https://api.commerce.naver.com/external/v1/commerce-solutions/subscriptions/unsubscription/approve' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>'
```




https://api.commerce.naver.com/external



Parameters

accountUid — queryrequired
