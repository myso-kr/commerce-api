# 계정 정보 조회

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-account-info-by-account-no-sellers

# 계정 정보 조회

```
GET

## /v1/seller/account
```

계정 정보를 조회하는 API입니다. 조회 대상 판매자 번호에 대한 인증 토큰이 필요합니다.

## Responses[​](#responses "Direct link to Responses")

- 200
- 400
- 401
- 403
- 404
- 500

성공

- application/json

- Schema
- Example (auto)

**Schema**

**accountId**string

계정 ID

**accountUid**string

계정 UID

**grade**string

판매자 등급

```json
{
  "accountId": "string",
  "accountUid": "string",
  "grade": "string"
}
```

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
curl -L 'https://api.commerce.naver.com/external/v1/seller/account' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>'
```

Request Collapse all

Base URL

Edit

https://api.commerce.naver.com/external

Auth

Bearer Token
