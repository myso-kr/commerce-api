---
doc-id: "v1-seller-channels-get"
title: "계정으로 채널 정보 조회"
description: "계정 하위의 채널 정보를 조회하는 API입니다. 조회 대상 판매자 번호에 대한 인증 토큰이 필요합니다."
type: api-endpoint
method: GET
path: /v1/seller/channels
base-url: https://api.commerce.naver.com/external
category: 판매자정보
tags:
  - get
  - seller
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-channels-by-account-no-sellers
---

# 계정으로 채널 정보 조회



```
> **GET** `https://api.commerce.naver.com/external/v1/seller/channels`
```

계정 하위의 채널 정보를 조회하는 API입니다. 조회 대상 판매자 번호에 대한 인증 토큰이 필요합니다.

## Responses

**GET** `/v1/seller/channels` — 응답
성공

**channelNo**integer<int64>

채널 번호

**channelType**string

채널 유형

**Possible values:** [`STOREFARM`, `WINDOW`]

**name**string

채널명

**url**string

채널 URL

**representativeImageUrl**string

대표 이미지 URL

**talkTalkAccountId**string

톡톡 계정 아이디
채널에 연결된 톡톡 채널이 노출 상태인 경우 톡톡 계정 아이디를 제공합니다.

```json
{
  "channelNo": 0,
  "channelType": "STOREFARM",
  "name": "string",
  "url": "string",
  "representativeImageUrl": "string",
  "talkTalkAccountId": "string"
}
```

## Bad Request

---

| 코드 | 설명 |
| --- | --- |
| GENERAL_ERROR | 처리되지 않은 오류 |

---

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

**object**object

```json
{}
```

## Forbidden

---

| 코드 | 설명 |
| --- | --- |
| ROLE_NOT_FOUND | 권한 없음 |
| PROVISION_NOT_FOUND | 약관 동의 필요 |
| INVALID_CHANNEL_STATUS | 유효하지 않는 채널 상태 |
| INVALID_STORE_STATUS | 유효하지 않은 스토어 상태 |
| INVALID_REPRESENT_STATUS | 유효하지 않은 대표 상태 |
| INVALID_MEMBER_STATUS | 유효하지 않은 회원 상태 |
| INVALID_INTERLOCK_STATUS | 유효하지 않은 연동 상태 |
| RESOURCE_NOT_AVAILABLE | 접근할 수 없는 자원 |

---

**object**object

```json
{}
```

## Not Found

---

| 코드 | 설명 |
| --- | --- |
| CHANNEL_NOT_FOUND | 유효하지 않은 채널 번호 |
| STORE_NOT_FOUND | 유효하지 않은 스토어 번호 |
| REPRESENT_NOT_FOUND | 유효하지 않은 대표 번호 |
| MEMBER_NOT_FOUND | 유효하지 않은 회원 번호 |
| INTERLOCK_NOT_FOUND | 연동 정보 없음 |

---

**object**object

```json
{}
```

## Internal Server Error

---

| 코드 | 설명 |
| --- | --- |
| PARSING_FAIL | 유효하지 않은 JSON 문법 |
| SERDES_FAIL | 직렬화/역직렬화 실패 |
| ENCDEC_FAIL | 암/복호화 실패 |
| GENERAL_ERROR | 처리되지 않은 오류 |

---

**object**object

```json
{}
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
curl -L 'https://api.commerce.naver.com/external/v1/seller/channels' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>'
```




https://api.commerce.naver.com/external
