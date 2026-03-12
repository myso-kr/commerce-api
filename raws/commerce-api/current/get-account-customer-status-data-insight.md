# 고객 현황(계정) API

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/get-account-customer-status-data-insight

# 고객 현황(계정) API

```
GET

## /v1/customer-data/customer-status/account/statistics
```

[브랜드스토어 전용] 스토어의 일별 고객 현황 데이터를 제공합니다.

## Request[​](#request "Direct link to Request")

### Query Parameters

**startDate** string<yyyy-MM-dd>required

조회 시작일. 최대 18개월 전.

**Example:** 2023-01-01

**endDate** string<yyyy-MM-dd>required

조회 종료일. 최소 1일 전.

**Example:** 2023-01-01

## Responses[​](#responses "Direct link to Responses")

- 200
- 400
- 401
- 404
- 500

OK

- application/json;charset=UTF-8

- Schema
- Example (auto)

**Schema**

- Array [

**aggregateDate**stringrequired

집계일. yyyy-MM-dd 형식.

**purchaseStats** CustomerPurchaseStats.data-insight (object)required

주문 고객 통계

**customerCount**integer<int64>

전체 고객 수

**newCustomerCount**integer<int64>

신규 고객 수

**existCustomerCount**integer<int64>

기존 고객 수

**newCustomerRatio**number<double>

신규 고객 비율

**existCustomerRatio**number<double>

기존 고객 비율

**purchaseCount**integer<int64>

전체 주문 건수

**refundCount**integer<int64>

전체 환불 건수

**malePurchaseStats** malePurchaseSchema.data-insight (object)required

남성 구매 통계

**ratio**number<double>

구매 비율

**femalePurchaseStats** femalePurchaseSchema.data-insight (object)required

여성 구매 통계

**ratio**number<double>

구매 비율

**agePurchaseStats** AgePurchaseStats.data-insight (object)required

연령대별 구매 통계

**teenage** teenagePurchaseSchema.data-insight (object)

10대 구매 통계

**malePurchaseStats** malePurchaseSchema.data-insight (object)

남성 구매 통계

**ratio**number<double>

구매 비율

**femalePurchaseStats** femalePurchaseSchema.data-insight (object)

여성 구매 통계

**ratio**number<double>

구매 비율

**early20s** early20sPurchaseSchema.data-insight (object)

20대 초반 구매 통계

**malePurchaseStats** malePurchaseSchema.data-insight (object)

남성 구매 통계

**ratio**number<double>

구매 비율

**femalePurchaseStats** femalePurchaseSchema.data-insight (object)

여성 구매 통계

**ratio**number<double>

구매 비율

**late20s** late20sPurchaseSchema.data-insight (object)

20대 후반 구매 통계

**malePurchaseStats** malePurchaseSchema.data-insight (object)

남성 구매 통계

**ratio**number<double>

구매 비율

**femalePurchaseStats** femalePurchaseSchema.data-insight (object)

여성 구매 통계

**ratio**number<double>

구매 비율

**early30s** early30sPurchaseSchema.data-insight (object)

30대 초반 구매 통계

**malePurchaseStats** malePurchaseSchema.data-insight (object)

남성 구매 통계

**ratio**number<double>

구매 비율

**femalePurchaseStats** femalePurchaseSchema.data-insight (object)

여성 구매 통계

**ratio**number<double>

구매 비율

**late30s** late30sPurchaseSchema.data-insight (object)

30대 후반 구매 통계

**malePurchaseStats** malePurchaseSchema.data-insight (object)

남성 구매 통계

**ratio**number<double>

구매 비율

**femalePurchaseStats** femalePurchaseSchema.data-insight (object)

여성 구매 통계

**ratio**number<double>

구매 비율

**early40s** early40sPurchaseSchema.data-insight (object)

40대 초반 구매 통계

**malePurchaseStats** malePurchaseSchema.data-insight (object)

남성 구매 통계

**ratio**number<double>

구매 비율

**femalePurchaseStats** femalePurchaseSchema.data-insight (object)

여성 구매 통계

**ratio**number<double>

구매 비율

**late40s** late40sPurchaseSchema.data-insight (object)

40대 후반 구매 통계

**malePurchaseStats** malePurchaseSchema.data-insight (object)

남성 구매 통계

**ratio**number<double>

구매 비율

**femalePurchaseStats** femalePurchaseSchema.data-insight (object)

여성 구매 통계

**ratio**number<double>

구매 비율

**early50s** early50sPurchaseSchema.data-insight (object)

50대 초반 구매 통계

**malePurchaseStats** malePurchaseSchema.data-insight (object)

남성 구매 통계

**ratio**number<double>

구매 비율

**femalePurchaseStats** femalePurchaseSchema.data-insight (object)

여성 구매 통계

**ratio**number<double>

구매 비율

**late50s** late50sPurchaseSchema.data-insight (object)

50대 후반 구매 통계

**malePurchaseStats** malePurchaseSchema.data-insight (object)

남성 구매 통계

**ratio**number<double>

구매 비율

**femalePurchaseStats** femalePurchaseSchema.data-insight (object)

여성 구매 통계

**ratio**number<double>

구매 비율

**senior** seniorPurchaseSchema.data-insight (object)

60대 이상 구매 통계

**malePurchaseStats** malePurchaseSchema.data-insight (object)

남성 구매 통계

**ratio**number<double>

구매 비율

**femalePurchaseStats** femalePurchaseSchema.data-insight (object)

여성 구매 통계

**ratio**number<double>

구매 비율

**interestStats** InterestStats.data-insight (object)required

관심 고객 통계

**interestCustomer**integer<int64>

관심 고객 수(누적)

**interestCustomerFluctuation**integer<int64>

관심 고객 수(증감)

**notificationCustomer**integer<int64>

알림 고객 수(누적)

**notificationCustomerFluctuation**integer<int64>

알림 고객 수(증감)

**normalGrade** NormalGrade.data-insight (object)required

고객 등급

**silver**integer<int64>

실버 고객 수

**gold**integer<int64>

골드 고객 수

**vip**integer<int64>

VIP 고객 수

**vvip**integer<int64>

VVIP 고객 수

**loungeStats** LoungeStats.data-insight (object)required

라운지 고객 등급

**totalCount**integer<int64>

전체 등급 수

**incrementCount**integer<int64>

전체 등급 변동

**joinCount**integer<int64>

신규 등급 추가

**leaveCount**integer<int64>

등급 제외

**level1Count**integer<int64>

레벨 1 등급 수

**level2Count**integer<int64>

레벨 2 등급 수

**level3Count**integer<int64>

레벨 3 등급 수

**level4Count**integer<int64>

레벨 4 등급 수

**level5Count**integer<int64>

레벨 5 등급 수

**periodType**stringrequired

집계 기간. `daily`.

**isNotProvided**booleanrequired

통계 제공 여부. 집계 고객 수가 10건 미만인 경우 미제공

- ]

```json
[
  {
    "aggregateDate": "string",
    "purchaseStats": {
      "customerCount": 0,
      "newCustomerCount": 0,
      "existCustomerCount": 0,
      "newCustomerRatio": 0,
      "existCustomerRatio": 0,
      "purchaseCount": 0,
      "refundCount": 0
    },
    "malePurchaseStats": {
      "ratio": 0
    },
    "femalePurchaseStats": {
      "ratio": 0
    },
    "agePurchaseStats": {
      "teenage": {
        "malePurchaseStats": {
          "ratio": 0
        },
        "femalePurchaseStats": {
          "ratio": 0
        }
      },
      "early20s": {
        "malePurchaseStats": {
          "ratio": 0
        },
        "femalePurchaseStats": {
          "ratio": 0
        }
      },
      "late20s": {
        "malePurchaseStats": {
          "ratio": 0
        },
        "femalePurchaseStats": {
          "ratio": 0
        }
      },
      "early30s": {
        "malePurchaseStats": {
          "ratio": 0
        },
        "femalePurchaseStats": {
          "ratio": 0
        }
      },
      "late30s": {
        "malePurchaseStats": {
          "ratio": 0
        },
        "femalePurchaseStats": {
          "ratio": 0
        }
      },
      "early40s": {
        "malePurchaseStats": {
          "ratio": 0
        },
        "femalePurchaseStats": {
          "ratio": 0
        }
      },
      "late40s": {
        "malePurchaseStats": {
          "ratio": 0
        },
        "femalePurchaseStats": {
          "ratio": 0
        }
      },
      "early50s": {
        "malePurchaseStats": {
          "ratio": 0
        },
        "femalePurchaseStats": {
          "ratio": 0
        }
      },
      "late50s": {
        "malePurchaseStats": {
          "ratio": 0
        },
        "femalePurchaseStats": {
          "ratio": 0
        }
      },
      "senior": {
        "malePurchaseStats": {
          "ratio": 0
        },
        "femalePurchaseStats": {
          "ratio": 0
        }
      }
    },
    "interestStats": {
      "interestCustomer": 0,
      "interestCustomerFluctuation": 0,
      "notificationCustomer": 0,
      "notificationCustomerFluctuation": 0
    },
    "normalGrade": {
      "silver": 0,
      "gold": 0,
      "vip": 0,
      "vvip": 0
    },
    "loungeStats": {
      "totalCount": 0,
      "incrementCount": 0,
      "joinCount": 0,
      "leaveCount": 0,
      "level1Count": 0,
      "level2Count": 0,
      "level3Count": 0,
      "level4Count": 0,
      "level5Count": 0
    },
    "periodType": "string",
    "isNotProvided": true
  }
]
```

Bad request

- application/json;charset=UTF-8

- Schema
- Example (auto)

**Schema**

**code**stringrequired

**message**stringrequired

**debugMessage**stringrequired

**invalidInputs** GWInvalidDetail.data-insight (object)[]required

- Array [

**name**stringrequired

**message**stringrequired

**type**stringrequired

- ]

**timestamp**string<date-time>required

**traceId**stringrequired

```json
{
  "code": "string",
  "message": "string",
  "debugMessage": "string",
  "invalidInputs": [
    {
      "name": "string",
      "message": "string",
      "type": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z",
  "traceId": "string"
}
```

Unauthorized

- application/json;charset=UTF-8

- Schema
- Example (auto)

**Schema**

**code**stringrequired

**message**stringrequired

**debugMessage**stringrequired

**invalidInputs** GWInvalidDetail.data-insight (object)[]required

- Array [

**name**stringrequired

**message**stringrequired

**type**stringrequired

- ]

**timestamp**string<date-time>required

**traceId**stringrequired

```json
{
  "code": "string",
  "message": "string",
  "debugMessage": "string",
  "invalidInputs": [
    {
      "name": "string",
      "message": "string",
      "type": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z",
  "traceId": "string"
}
```

Not found

- application/json;charset=UTF-8

- Schema
- Example (auto)

**Schema**

**code**stringrequired

**message**stringrequired

**debugMessage**stringrequired

**invalidInputs** GWInvalidDetail.data-insight (object)[]required

- Array [

**name**stringrequired

**message**stringrequired

**type**stringrequired

- ]

**timestamp**string<date-time>required

**traceId**stringrequired

```json
{
  "code": "string",
  "message": "string",
  "debugMessage": "string",
  "invalidInputs": [
    {
      "name": "string",
      "message": "string",
      "type": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z",
  "traceId": "string"
}
```

Internal Server Error

- application/json;charset=UTF-8

- Schema
- Example (auto)

**Schema**

**code**stringrequired

**message**stringrequired

**debugMessage**stringrequired

**invalidInputs** GWInvalidDetail.data-insight (object)[]required

- Array [

**name**stringrequired

**message**stringrequired

**type**stringrequired

- ]

**timestamp**string<date-time>required

**traceId**stringrequired

```json
{
  "code": "string",
  "message": "string",
  "debugMessage": "string",
  "invalidInputs": [
    {
      "name": "string",
      "message": "string",
      "type": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z",
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
curl -L 'https://api.commerce.naver.com/external/v1/customer-data/customer-status/account/statistics' \
-H 'Accept: application/json;charset=UTF-8' \
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
