# 외부 개발사 자체 결제 내역 전송

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/send-transaction-external-merchant

# 외부 개발사 자체 결제 내역 전송

```
POST

## /v1/commerce-solutions/external-transactions
```

외부 개발사 자체 결제 내역 전송

## Request[​](#request "Direct link to Request")

- application/json

### Body**required**

**transactionType**거래 타입 (string)required

거래 타입

**Possible values:** [`PAYMENT`, `REFUND`]

**solutionId**솔루션 ID (string)required

솔루션 ID

**paymentId**솔루션사 거래 ID (string)required

솔루션사 거래 ID

**accountUid**계정 UID (string)required

계정 UID

**totalAmount**거래 금액(VAT 포함) (number)required

거래 금액(VAT 포함)

**paymentConfirmDate**결제 완료 일시 (string<date-time>)required

결제 완료 일시

**Example:** `2024-08-21T10:00:00.001+09:00`

**paymentModel**거래 모델 (string)required

거래 모델

**Possible values:** [`ONETIME`, `USAGE`, `MONTHLY`, `YEARLY`, `ETC`]

**paymentMethod**거래 결제 수단 (string)

거래 결제 수단

**Possible values:** [`CARD`, `DIGITAL`, `CASH`, `ETC`]

**originalPaymentId**원거래 ID (string)

원거래 ID

**round**현재 회차 (integer<int32>)

현재 회차

**roundStartDate**현재 회차 시작일 (string<date-time>)

현재 회차 시작일

**Example:** `2024-08-21T10:00:00.001+09:00`

**roundEndDate**현재 회차 종료일 (string<date-time>)

현재 회차 종료일

**Example:** `2024-08-22T10:00:00.001+09:00`

**planId**요금제 ID (string)

요금제 ID

**reason**사유 (string)

사유

## Responses[​](#responses "Direct link to Responses")

- 200
- 400
- 401
- 402
- 403
- 404
- 406
- 409
- 500
- 503

외부 개발사 자체 결제 내역 전송 성공

- application/json

- Schema
- Example (auto)

**Schema**

**paymentId**솔루션사 거래 ID (string)required

솔루션사 거래 ID

**transactionId**거래 ID (string)required

거래 ID

```json
{
  "paymentId": "string",
  "transactionId": "string"
}
```

## Bad Request

---

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| BAD\_REQUEST | 잘못된 요청 |  |
| NOTTING\_TO\_CHANGE | 변경할 사항이 없음 |  |
| CHANGE\_COUNT\_LIMIT | 변경 횟수 초과 |  |
| NOT\_ALLOW\_AFTER\_UNSUBSCRIPTION | 해지 후 허락되지 않은 요청 |  |
| NOT\_ALLOW\_AFTER\_PAYMENT | 다음 회차 결제 이후 허락되지 않은 요청 |  |
| INVALID\_REQUEST\_CONDITION | 유효하지 않은 조건 |  |
| INACTIVE\_SOLUTION\_REQUESTED | 비정상 상태인 솔루션에 대한 요청 |  |
| INVALID\_SOLUTION | 유효하지 않은 솔루션에 대한 요청 |  |
| NOT\_SUBSCRIBING | 사용하지 않는 솔루션에 대한 요청 |  |
| NOT\_ACCOUNT\_AUTHENTICATION | 미인증 계정 |  |
| INVALID\_INPUT | 유효하지 않은 입력 |  |

---

- application/json

- Schema
- Example (auto)

**Schema**

**code**string

오류 코드

**message**string

오류 메시지

**invalidInputs** InvalidInput.merchant (object)[]

유효성 검사 오류

- 400(Bad Request) 상태 코드와 함께 활용

- Array [

**name**string

유효성 검사 오류가 발생한 필드/경로 변수/파라미터 이름

**message**string

유효성 검사 메시지

- ]

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
| INVALID\_USER | 유효하지 않은 사용자 |  |
| INVALID\_SELLER\_TOKEN | 유효하지 않은 SELLER 토큰 |  |
| EXPIRED\_SELLER\_TOKEN | 만료된 SELLER 토큰 |  |

---

- application/json

- Schema
- Example (auto)

**Schema**

**code**string

오류 코드

**message**string

오류 메시지

**invalidInputs** InvalidInput.merchant (object)[]

유효성 검사 오류

- 400(Bad Request) 상태 코드와 함께 활용

- Array [

**name**string

유효성 검사 오류가 발생한 필드/경로 변수/파라미터 이름

**message**string

유효성 검사 메시지

- ]

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
| BIZ\_WALLET\_USE\_ERROR | 비즈월렛 오류 |  |

---

- application/json

- Schema
- Example (auto)

**Schema**

**code**string

오류 코드

**message**string

오류 메시지

**invalidInputs** InvalidInput.merchant (object)[]

유효성 검사 오류

- 400(Bad Request) 상태 코드와 함께 활용

- Array [

**name**string

유효성 검사 오류가 발생한 필드/경로 변수/파라미터 이름

**message**string

유효성 검사 메시지

- ]

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
| ABNORMAL\_ACCOUNT\_STATUS | 비정상 계정으로 접근 |  |
| ACCOUNT\_ID\_CHANGED | 요청과 다른 계정으로 접근 |  |
| SOLUTION\_CHANGED | 유효하지 않은 솔루션 |  |
| NOT\_SUBSCRIBABLE\_SOLUTION\_TYPE | 사용 불가능한 솔루션 유형 |  |
| NOT\_AUTHORIZED\_ACCOUNT\_ROLE | 인가되지 않은 계정 |  |
| UNAUTHORIZED | 인가되지 않음 |  |
| ONLY\_BETA\_GRADE\_AVAILABLE | 베타 요금제에서만 가능 |  |
| JUDGMENT\_STATUS\_IS\_ACQUISITION | 양도 양수 상태의 계정 |  |
| REQUEST\_SUBSCRIPTION\_REQUIRED | 솔루션 사용 신청 필요 |  |
| ALREADY\_SUBSCRIBING | 이미 사용 중인 솔루션 |  |
| NOT\_ALLOWED\_REFERER | 유효하지 않은 리퍼러 |  |
| NOT\_ALLOWED\_ACCOUNT | 유효하지 않은 계정 |  |
| NOT\_ALLOWED\_BUSINESS\_TYPE | 유효하지 않은 비즈니스 타입 |  |
| NOT\_ALLOWED\_BRAND\_STORE | 유효하지 않은 브랜드 스토어 |  |
| NOT\_ALLOWED\_REPRESENT\_TYPE | 유효하지 않은 대표 타입 |  |
| NOT\_ALLOWED\_CHANNEL\_TYPE | 유효하지 않은 채널 타입 |  |
| NOT\_ALLOWED\_GOOD\_SERVICE | 유효하지 않은 굿서비스 |  |
| NOT\_ALLOWED\_SALE\_ACTION\_GRADE | 유효하지 않은 스토어 등급 |  |
| SUBSCRIBING\_USER\_EXISTS | 현재 사용자가 존재하여 애플리케이션 변경 불가 |  |

---

- application/json

- Schema
- Example (auto)

**Schema**

**code**string

오류 코드

**message**string

오류 메시지

**invalidInputs** InvalidInput.merchant (object)[]

유효성 검사 오류

- 400(Bad Request) 상태 코드와 함께 활용

- Array [

**name**string

유효성 검사 오류가 발생한 필드/경로 변수/파라미터 이름

**message**string

유효성 검사 메시지

- ]

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
| NOT\_FOUND | 발견되지 않음 |  |
| DATA\_NOT\_EXIST | 존재하지 않는 데이터 |  |
| SUBSCRIPTION\_NOT\_FOUND | 유효하지 않은 솔루션 사용 |  |
| SOLUTION\_NOT\_FOUND | 유효하지 않은 솔루션 |  |

---

- application/json

- Schema
- Example (auto)

**Schema**

**code**string

오류 코드

**message**string

오류 메시지

**invalidInputs** InvalidInput.merchant (object)[]

유효성 검사 오류

- 400(Bad Request) 상태 코드와 함께 활용

- Array [

**name**string

유효성 검사 오류가 발생한 필드/경로 변수/파라미터 이름

**message**string

유효성 검사 메시지

- ]

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
| BLOCK\_TIME | 허용되지 않은 시간 |  |
| PREVENT\_REJOIN\_SAME\_DAY | 당일 재가입 금지 |  |

---

- application/json

- Schema
- Example (auto)

**Schema**

**code**string

오류 코드

**message**string

오류 메시지

**invalidInputs** InvalidInput.merchant (object)[]

유효성 검사 오류

- 400(Bad Request) 상태 코드와 함께 활용

- Array [

**name**string

유효성 검사 오류가 발생한 필드/경로 변수/파라미터 이름

**message**string

유효성 검사 메시지

- ]

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
| CONDITION\_CHANGED | 유효하지 않은 조건 |  |
| DUPLICATE\_SUBSCRIBE | 중복 사용 불가 |  |
| DUPLICATED\_RESOURCE | 중복 불가 |  |

---

- application/json

- Schema
- Example (auto)

**Schema**

**code**string

오류 코드

**message**string

오류 메시지

**invalidInputs** InvalidInput.merchant (object)[]

유효성 검사 오류

- 400(Bad Request) 상태 코드와 함께 활용

- Array [

**name**string

유효성 검사 오류가 발생한 필드/경로 변수/파라미터 이름

**message**string

유효성 검사 메시지

- ]

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
| CRYPTO\_FAILURE | 암호화/복호화 실패 |  |
| DATABASE\_ERROR | 데이터베이스 오류 |  |
| DATA\_ERROR | 유효하지 않은 데이터 |  |
| INVALID\_DATA\_STATUS | 유효하지 않은 상태의 데이터 |  |
| INVALID\_INPUT\_DATA | 유효하지 않은 입력 데이터 |  |
| NETWORK\_ERROR | 네트워크 오류 |  |
| BILL\_ERROR | 유효하지 않은 청구서 |  |
| UNKNOWN\_ERROR | 미확인 오류 |  |

---

- application/json

- Schema
- Example (auto)

**Schema**

**code**string

오류 코드

**message**string

오류 메시지

**invalidInputs** InvalidInput.merchant (object)[]

유효성 검사 오류

- 400(Bad Request) 상태 코드와 함께 활용

- Array [

**name**string

유효성 검사 오류가 발생한 필드/경로 변수/파라미터 이름

**message**string

유효성 검사 메시지

- ]

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
| DATABASE\_ROS | 데이터베이스가 읽기 모드 전용 |  |

---

- application/json

- Schema
- Example (auto)

**Schema**

**code**string

오류 코드

**message**string

오류 메시지

**invalidInputs** InvalidInput.merchant (object)[]

유효성 검사 오류

- 400(Bad Request) 상태 코드와 함께 활용

- Array [

**name**string

유효성 검사 오류가 발생한 필드/경로 변수/파라미터 이름

**message**string

유효성 검사 메시지

- ]

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
curl -L 'https://api.commerce.naver.com/external/v1/commerce-solutions/external-transactions' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{
  "transactionType": "PAYMENT",
  "solutionId": "string",
  "paymentId": "string",
  "accountUid": "string",
  "totalAmount": 0,
  "paymentConfirmDate": "2024-08-21T10:00:00.001+09:00",
  "paymentModel": "ONETIME",
  "paymentMethod": "CARD",
  "originalPaymentId": "string",
  "round": 0,
  "roundStartDate": "2024-08-21T10:00:00.001+09:00",
  "roundEndDate": "2024-08-22T10:00:00.001+09:00",
  "planId": "string",
  "reason": "string"
}'
```

Request Collapse all

Base URL

Edit

https://api.commerce.naver.com/external

Auth

Bearer Token

Body required

```json
{
  "transactionType": "PAYMENT",
  "solutionId": "string",
  "paymentId": "string",
  "accountUid": "string",
  "totalAmount": 0,
  "paymentConfirmDate": "2024-08-21T10:00:00.001+09:00",
  "paymentModel": "ONETIME",
  "paymentMethod": "CARD",
  "originalPaymentId": "string",
  "round": 0,
  "roundStartDate": "2024-08-21T10:00:00.001+09:00",
  "roundEndDate": "2024-08-22T10:00:00.001+09:00",
  "planId": "string",
  "reason": "string"
}
```
