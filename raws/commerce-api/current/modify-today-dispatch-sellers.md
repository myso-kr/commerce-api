# 오늘출발 정보 설정

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/modify-today-dispatch-sellers

# 오늘출발 정보 설정

```
POST

## /v1/seller/this-day-dispatch
```

오늘출발 정보를 설정하는 API입니다. 당일 배송 설정, 휴무일을 설정할 수 있습니다. 설정 대상 판매자 번호에 대한 인증 토큰이 필요합니다.

휴무 요일은 옵션 필드로, 생략이 가능합니다. 토요일, 일요일은 휴무 요일로 설정할 수 없습니다.

설정 사유는 옵션 필드로, 생략이 가능합니다.

## Request[​](#request "Direct link to Request")

- application/json

### Body**required**

**basisHour**integer<int32>required

당일 배송 설정 시간 시

**basisMinute**integer<int32>required

당일 배송 설정 시간 분

**holidayOfTheWeek**WeekDayType.sellers (string)

휴무 요일

- `MONDAY`: 월요일
- `TUESDAY`: 화요일
- `WEDNESDAY`: 수요일
- `THURSDAY`: 목요일
- `FRIDAY`: 금요일

**Possible values:** [`SUNDAY`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`]

**sellerHolidays**string[]

판매자 휴무일 목록

**reason**stringrequired

설정 사유

## Responses[​](#responses "Direct link to Responses")

- 204
- 400
- 401
- 403
- 404
- 500

성공

## Bad Request

---

| 코드 | 설명 |
| --- | --- |
| GENERAL\_ERROR | 처리되지 않은 오류 |

---

- application/json

- Schema
- Example (auto)

**Schema**

**object**object

```json
{}
```

## Unauthorized

---

| 코드 | 설명 |
| --- | --- |
| UNAUTHORIZED | 접근 권한이 없음 |

---

- application/json

- Schema
- Example (auto)

**Schema**

**object**object

```json
{}
```

## Forbidden

---

| 코드 | 설명 |
| --- | --- |
| ROLE\_NOT\_FOUND | 권한 없음 |
| PROVISION\_NOT\_FOUND | 약관 동의 필요 |
| INVALID\_CHANNEL\_STATUS | 유효하지 않는 채널 상태 |
| INVALID\_STORE\_STATUS | 유효하지 않은 스토어 상태 |
| INVALID\_REPRESENT\_STATUS | 유효하지 않은 대표 상태 |
| INVALID\_MEMBER\_STATUS | 유효하지 않은 회원 상태 |
| INVALID\_INTERLOCK\_STATUS | 유효하지 않은 연동 상태 |
| RESOURCE\_NOT\_AVAILABLE | 접근할 수 없는 자원 |

---

- application/json

- Schema
- Example (auto)

**Schema**

**object**object

```json
{}
```

## Not Found

---

| 코드 | 설명 |
| --- | --- |
| CHANNEL\_NOT\_FOUND | 유효하지 않은 채널 번호 |
| STORE\_NOT\_FOUND | 유효하지 않은 스토어 번호 |
| REPRESENT\_NOT\_FOUND | 유효하지 않은 대표 번호 |
| MEMBER\_NOT\_FOUND | 유효하지 않은 회원 번호 |
| INTERLOCK\_NOT\_FOUND | 연동 정보 없음 |

---

- application/json

- Schema
- Example (auto)

**Schema**

**object**object

```json
{}
```

## Internal Server Error

---

| 코드 | 설명 |
| --- | --- |
| PARSING\_FAIL | 유효하지 않은 JSON 문법 |
| SERDES\_FAIL | 직렬화/역직렬화 실패 |
| ENCDEC\_FAIL | 암/복호화 실패 |
| GENERAL\_ERROR | 처리되지 않은 오류 |

---

- application/json

- Schema
- Example (auto)

**Schema**

**object**object

```json
{}
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
curl -L 'https://api.commerce.naver.com/external/v1/seller/this-day-dispatch' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{
  "basisHour": 0,
  "basisMinute": 0,
  "holidayOfTheWeek": "SUNDAY",
  "sellerHolidays": [
    "string"
  ],
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
  "basisHour": 0,
  "basisMinute": 0,
  "holidayOfTheWeek": "SUNDAY",
  "sellerHolidays": [
    "string"
  ],
  "reason": "string"
}
```
