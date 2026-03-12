# 일별 정산 내역 조회

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/find-daily-settle-pay-settle

# 일별 정산 내역 조회

```
GET

## /v1/pay-settle/settle/daily
```

일별 정산 내역 조회

## Request[​](#request "Direct link to Request")

### Query Parameters

**startDate** string<date>required

시작일

**Example:** 2022-01-01

**endDate** string<date>required

종료일

**Example:** 2022-02-01

**pageNumber** integer<int32>required

페이지 번호

**Example:** 1

**Possible values:** `>= 1`

**pageSize** integer<int32>required

페이지 크기(1000 이하)

**Example:** 10

**Possible values:** `<= 1000`

## Responses[​](#responses "Direct link to Responses")

- 200
- 400
- 500

OK

- application/json

- Schema
- Example (auto)

**Schema**

**elements** CommerceDailySettle.pay-settle (object)[]required

- Array [

**settleBasisStartDate**정산 기준 시작일 (string<date>)nullable

정산 기준 시작일(yyyy-MM-dd)

**settleBasisEndDate**정산 기준 종료일 (string<date>)nullable

정산 기준 종료일(yyyy-MM-dd)

**settleExpectDate**정산 예정일 (string<date>)nullable

정산 예정일(yyyy-MM-dd)

**settleCompleteDate**정산 완료일 (string<date>)nullable

정산 완료일(yyyy-MM-dd)

**settleAmount**정산 금액 (number)nullable

정산 금액

**paySettleAmount**결제 정산 금액 (number)nullable

결제 정산 금액(=정산 기준 금액)

**commissionSettleAmount**수수료 정산 금액 (number)nullable

수수료 정산 금액

**benefitSettleAmount**혜택 정산 금액 (number)nullable

혜택 정산 금액

**deductionRestoreSettleAmount**공제 환급 정산 금액 (number)nullable

공제 환급 정산 금액

**payHoldbackAmount**지급 보류 금액 (number)nullable

지급 보류 금액

**minusChargeAmount**마이너스 충전금 상계 금액 (number)nullable

마이너스 충전금 상계 금액

**differenceSettleAmount**차액 정산 금액 (number)nullable

차액 정산 금액

**returnCareSettleAmount**반품안심케어 정산 금액 (number)required

반품안심케어 정산 금액

**normalSettleAmount**일반 정산 금액 (number)nullable

일반 정산 금액

**quickSettleAmount**빠른정산 금액 (number)nullable

빠른정산 금액

**preferentialCommissionAmount**우대 수수료 환급 금액 (number)nullable

우대 수수료 환급 금액

**settlementLimitAmount**한도 보류/해제 금액 (number)nullable

한도 보류/해제 금액

**settleMethodType**정산 방법 (string)nullable

정산 방법(계좌 이체, 충전금)

- ACCOUNT(계좌 이체)
- CHARGE\_AMT(충전금)

**Possible values:** [`ACCOUNT`, `CHARGE_AMT`]

**bankType**은행 (string)nullable

은행

- KDB(산업은행)
- IBK(기업은행)
- KB(KB국민은행)
- KEB\_OLD(외환은행)
- SUHYUP(수협은행)
- KOREAEXIM(수출입은행)
- NH(NH농협은행)
- LNH(지역농.축협)
- WOORI(우리은행)
- SC(SC제일은행)
- CITI(한국씨티은행)
- IM(iM뱅크)
- BUSAN(부산은행)
- KWANGJU(광주은행)
- JEJU(제주은행)
- JEONBUK(전북은행)
- KYONGNAM(경남은행)
- SAEMAUL(새마을금고)
- SHINHYUP(신협)
- FSB(저축은행)
- HSBC(HSBC은행)
- BOA(BOA은행)
- NFCF(산림조합중앙회)
- POST(우체국)
- KEB\_HANA(하나은행)
- SHINHAN(신한은행)
- KBANK(케이뱅크)
- KKOBANK(카카오뱅크)
- TOSS(토스뱅크)
- DAISHIN\_BANK(대신저축은행)
- SBISB(에스비아이저축은행)
- HK\_BANK(에이치케이저축은행)
- WELCOME\_BANK(웰컴저축은행)
- SHINHAN\_SAVING(신한저축은행)
- DONGYANG\_SEC(유안타증권)
- HYNDAI\_SEC(KB증권)
- IBK\_IVST\_SEC(IBK투자증권)
- MIRAEASSET(미래에셋대우)
- MIRAEASSET\_DAEWOO(미래에셋대우)
- SANSUNG\_SEC(삼성증권)
- HANGKOOK\_IVST\_SEC(한국투자증권)
- WOORI\_IVST\_SEC(NH투자증권)
- KYOBO\_IVST\_SEC(교보증권)
- HI\_IVST\_SEC(하이투자증권)
- HMC\_IVST\_SEC(현대자증권)
- SK\_SEC(SK증권)
- DAESHIN\_SEC(대신증권)
- HANWHA\_SEC(한화투자증권)
- HANA\_DAETOO\_SEC(하나금융투자)
- SHINHAN\_IVST(신한금융투자)
- DONGBU\_SEC(DB금융투자)
- EUGENE\_IVST\_SEC(유진투자증권)
- MERITZ\_SEC(메리츠증권)
- BOOKOOK\_SEC(부국증권)
- SHINYOUNG\_SEC(신영증권)
- LIG\_IVST\_SEC(케이프투자증권)
- KSFC(한국증권금융)
- JP\_MORGAN(제이피모간체이스)
- DEUTSCHE\_BANK(도이치은행)
- BNP(비엔피파리바은행)
- ICBC(중국공상은행)
- NH\_NONGHYUP\_SEC(NH농협증권)
- KIWOOM\_IVST\_SEC(키움증권)
- EBEST\_IVST\_SEC(이베스트투자증권)

**Possible values:** [`KDB`, `IBK`, `KB`, `KEB_OLD`, `SUHYUP`, `KOREAEXIM`, `NH`, `LNH`, `WOORI`, `SC`, `CITI`, `IM`, `BUSAN`, `KWANGJU`, `JEJU`, `JEONBUK`, `KYONGNAM`, `SAEMAUL`, `SHINHYUP`, `FSB`, `HSBC`, `DEUTSCHE_BANK`, `JP_MORGAN`, `BOA`, `BNP`, `ICBC`, `NFCF`, `POST`, `KEB_HANA`, `SHINHAN`, `KBANK`, `KKOBANK`, `TOSS`, `DAISHIN_BANK`, `SBISB`, `HK_BANK`, `WELCOME_BANK`, `SHINHAN_SAVING`, `DONGYANG_SEC`, `HYNDAI_SEC`, `IBK_IVST_SEC`, `MIRAEASSET`, `MIRAEASSET_DAEWOO`, `SANSUNG_SEC`, `HANGKOOK_IVST_SEC`, `WOORI_IVST_SEC`, `KYOBO_IVST_SEC`, `HI_IVST_SEC`, `HMC_IVST_SEC`, `KIWOOM_IVST_SEC`, `EBEST_IVST_SEC`, `SK_SEC`, `DAESHIN_SEC`, `HANWHA_SEC`, `HANA_DAETOO_SEC`, `SHINHAN_IVST`, `DONGBU_SEC`, `EUGENE_IVST_SEC`, `MERITZ_SEC`, `NH_NONGHYUP_SEC`, `BOOKOOK_SEC`, `SHINYOUNG_SEC`, `LIG_IVST_SEC`, `KSFC`]

**depositorName**예금주 (string)nullable

예금주

**accountNo**계좌 번호 (string)nullable

계좌 번호

**merchantId**가맹점 ID (string)nullable

가맹점 ID

**merchantName**가맹점명 (string)nullable

가맹점명

- ]

**pagination** Pagination.pay-settle (object)required

**page**integer<int32>

**size**integer<int32>

**totalPages**integer<int32>

**totalElements**integer<int64>

```json
{
  "elements": [
    {
      "settleBasisStartDate": "2024-07-29",
      "settleBasisEndDate": "2024-07-29",
      "settleExpectDate": "2024-07-29",
      "settleCompleteDate": "2024-07-29",
      "settleAmount": 0,
      "paySettleAmount": 0,
      "commissionSettleAmount": 0,
      "benefitSettleAmount": 0,
      "deductionRestoreSettleAmount": 0,
      "payHoldbackAmount": 0,
      "minusChargeAmount": 0,
      "differenceSettleAmount": 0,
      "returnCareSettleAmount": 0,
      "normalSettleAmount": 0,
      "quickSettleAmount": 0,
      "preferentialCommissionAmount": 0,
      "settlementLimitAmount": 0,
      "settleMethodType": "ACCOUNT",
      "bankType": "KDB",
      "depositorName": "string",
      "accountNo": "string",
      "merchantId": "string",
      "merchantName": "string"
    }
  ],
  "pagination": {
    "page": 0,
    "size": 0,
    "totalPages": 0,
    "totalElements": 0
  }
}
```

Bad Request

- application/json

- Schema
- Example

**Schema**

**code**stringrequired

오류 코드

**message**stringrequired

오류 메시지

**invalidInputs** InvalidInput.pay-settle (object)[]

잘못 입력된 필드 값

- Array [

**name**stringrequired

필드명

**message**stringrequired

메시지

**type**stringrequired

오류 타입

- ]

**timestamp**string<date-time>required

처리 시각

**Example:** `2022-09-15T14:00:15.600+09:00`

**traceId**string

트랜잭션 ID

```json
{
  "code": "BAD_REQUEST",
  "message": "잘못된 요청",
  "invalidInputs": [
    {
      "name": "fieldName",
      "message": "잘못된 값입니다.",
      "type": "typeMismatch"
    }
  ],
  "timestamp": "2022-09-01T12:00:00.000+09:00",
  "traceId": "trace-id"
}
```

Internal Server Error

- application/json

- Schema
- Example

**Schema**

**code**stringrequired

오류 코드

**message**stringrequired

오류 메시지

**invalidInputs** InvalidInput.pay-settle (object)[]

잘못 입력된 필드 값

- Array [

**name**stringrequired

필드명

**message**stringrequired

메시지

**type**stringrequired

오류 타입

- ]

**timestamp**string<date-time>required

처리 시각

**Example:** `2022-09-15T14:00:15.600+09:00`

**traceId**string

트랜잭션 ID

```json
{
  "code": "INTERNAL_SERVER_ERROR",
  "message": "내부 서버 오류",
  "invalidInputs": [],
  "timestamp": "2022-09-01T12:00:00.000+09:00",
  "traceId": "trace-id"
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
curl -L 'https://api.commerce.naver.com/external/v1/pay-settle/settle/daily' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>'
```

Request Collapse all

Base URL

Edit

https://api.commerce.naver.com/external

Auth

Bearer Token

Parameters

startDate — queryrequired

endDate — queryrequired

pageNumber — queryrequired

pageSize — queryrequired
