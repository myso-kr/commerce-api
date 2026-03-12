---
doc-id: "v1-seller-addressbooks-for-page-get"
title: "주소록 목록 조회"
description: "주소록을 페이징 형식의 목록으로 조회하는 API입니다. 조회 대상 판매자 번호에 대한 인증 토큰이 필요합니다."
type: api-endpoint
method: GET
path: /v1/seller/addressbooks-for-page
base-url: https://api.commerce.naver.com/external
category: 판매자정보
tags:
  - get
  - seller
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-page-addresses-sellers
---

# 주소록 목록 조회



```
> **GET** `https://api.commerce.naver.com/external/v1/seller/addressbooks-for-page`
```

주소록을 페이징 형식의 목록으로 조회하는 API입니다. 조회 대상 판매자 번호에 대한 인증 토큰이 필요합니다.

페이지당 데이터 개수는 100개로 고정되어 있습니다.

## Request

**GET** `/v1/seller/addressbooks-for-page`
### Query Parameters

**page** integer<int32>

조회하는 페이지 번호(1~N)

**Default value:** `1`

## Responses

**GET** `/v1/seller/addressbooks-for-page` — 응답
성공

**addressBooks** ExternalAddressBookVO.sellers (object)[]

주소록 목록

**addressBookNo**integer<int64>

주소록 번호

**name**string

이름

**addressType**AddressBookType.sellers (string)

주소록 유형

- `REPRESENTATIVE`: 사업장
- `BUSINESS`: 추가 사업장
- `GENERAL`: 일반
- `RELEASE`: 출고지
- `REFUND_OR_EXCHANGE`: 반품/교환지
- `LOGISTICS_CENTER_RELEASE`: 물류센터 출고지
- `LOGISTICS_CENTER_REFUND_OR_EXCHANGE`: 물류센터 반품/교환지
- `OVERSEAS_BANK`: 해외 정산 계좌 은행

**Possible values:** [`REPRESENTATIVE`, `BUSINESS`, `GENERAL`, `RELEASE`, `REFUND_OR_EXCHANGE`, `LOGISTICS_CENTER_RELEASE`, `LOGISTICS_CENTER_REFUND_OR_EXCHANGE`, `OVERSEAS_BANK`]

**postalCode**string

우편번호

**baseAddress**string

기본 주소

**detailAddress**string

상세 주소

**address**string

전체 주소

**phoneNumber1**string

연락처 1

**phoneNumber2**string

연락처 2

**hasLocation**boolean

Location 포함 여부

**roadNameAddress**boolean

도로명 주소 여부

**overseasAddress**boolean

해외 주소 여부

**page**integer<int32>

현재 페이지

**totalPage**integer<int32>

전체 페이지 수

```json
{
  "addressBooks": [
    {
      "addressBookNo": 0,
      "name": "string",
      "addressType": "REPRESENTATIVE",
      "postalCode": "string",
      "baseAddress": "string",
      "detailAddress": "string",
      "address": "string",
      "phoneNumber1": "string",
      "phoneNumber2": "string",
      "hasLocation": true,
      "roadNameAddress": true,
      "overseasAddress": true
    }
  ],
  "page": 0,
  "totalPage": 0
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
curl -L 'https://api.commerce.naver.com/external/v1/seller/addressbooks-for-page' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>'
```




https://api.commerce.naver.com/external



ParametersShow optional parameters

page — query
