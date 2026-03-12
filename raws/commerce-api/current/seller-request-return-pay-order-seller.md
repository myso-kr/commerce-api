# 반품 요청

> 원문: https://apicenter.commerce.naver.com/docs/commerce-api/current/seller-request-return-pay-order-seller

# 반품 요청

```
POST

## /v1/pay-order/seller/product-orders/:productOrderId/claim/return/request
```

1건의 상품 주문에 대해 반품 요청합니다.

## Request[​](#request "Direct link to Request")

### Path Parameters

**productOrderId** stringrequired

상품 주문 번호

**Example:** 2022040521691951

- application/json

### Body**required**

반품 요청 Request Object

**returnReason**requestReturnClaimReason.pay-order-seller (string)required

클레임 요청 사유. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| INTENT\_CHANGED | 구매 의사 취소 |  |
| COLOR\_AND\_SIZE | 색상 및 사이즈 변경 |  |
| WRONG\_ORDER | 다른 상품 잘못 주문 |  |
| PRODUCT\_UNSATISFIED | 서비스 불만족 |  |
| DELAYED\_DELIVERY | 배송 지연 |  |
| SOLD\_OUT | 상품 품절 |  |
| DROPPED\_DELIVERY | 배송 누락 |  |
| BROKEN | 상품 파손 |  |
| INCORRECT\_INFO | 상품 정보 상이 |  |
| WRONG\_DELIVERY | 오배송 |  |
| WRONG\_OPTION | 색상 등 다른 상품 잘못 배송 |  |

**collectDeliveryMethod**deliveryMethod.pay-order-seller (string)required

배송 방법 코드. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DELIVERY | 택배, 등기, 소포 |  |
| GDFW\_ISSUE\_SVC | 굿스플로 송장 출력 |  |
| VISIT\_RECEIPT | 방문 수령 |  |
| DIRECT\_DELIVERY | 직접 전달 |  |
| QUICK\_SVC | 퀵서비스 |  |
| NOTHING | 배송 없음 |  |
| RETURN\_DESIGNATED | 지정 반품 택배 |  |
| RETURN\_DELIVERY | 일반 반품 택배 |  |
| RETURN\_INDIVIDUAL | 직접 반송 |  |
| RETURN\_MERCHANT | 판매자 직접 수거(장보기 전용) |  |
| UNKNOWN | 알 수 없음(예외 처리에 사용) |  |

**Example:** `DELIVERY`

**collectDeliveryCompany**deliveryCompanyCode.pay-order-seller (string)

택배사 코드. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| CJGLS | CJ대한통운 |  |
| HYUNDAI | 롯데택배 |  |
| HANJIN | 한진택배 |  |
| KGB | 로젠택배 |  |
| EPOST | 우체국택배 |  |
| MTINTER | 엠티인터내셔널 |  |
| 1004HOME | 1004HOME |  |
| TWOFASTEXPRESS | 2FAST익스프레스 |  |
| ACE | ACEexpress |  |
| ACIEXPRESS | ACI |  |
| ADCAIR | ADC항운택배 |  |
| AIRWAY | AIRWAY익스프레스 |  |
| APEX | APEX |  |
| ARAMEX | ARAMEX |  |
| ARGO | ARGO |  |
| AIRBOY | AirboyExpress |  |
| KOREXG | CJ대한통운(국제택배) |  |
| CUPARCEL | CU편의점택배 |  |
| CWAYEXPRESS | CwayExpress |  |
| DHL | DHL |  |
| DHLDE | DHL(독일) |  |
| DHLGLOBALMAIL | DHLGlobalMail |  |
| DPD | DPD |  |
| ECMSEXPRESS | ECMSExpress |  |
| EFS | EFS |  |
| EMS | EMS |  |
| EZUSA | EZUSA |  |
| EUROPARCEL | EuroParcel |  |
| FEDEX | FEDEX |  |
| GOP | GOP당일택배 |  |
| GOS | GOS당일택배 |  |
| GPSLOGIX | GPSLOGIX |  |
| GSFRESH | GSFresh |  |
| GSIEXPRESS | GSI익스프레스 |  |
| GSMNTON | GSMNTON |  |
| GSPOSTBOX | GSPostbox퀵 |  |
| CVSNET | GSPostbox택배 |  |
| GS더프레시 | GSTHEFRESH |  |
| GTSLOGIS | GTS로지스 |  |
| HYBRID | HI택배 |  |
| HY | HY |  |
| IK | IK물류 |  |
| KGLNET | KGL네트웍스 |  |
| KT | KT EXPRESS |  |
| LGE | LG전자배송센터 |  |
| LTL | LTL |  |
| NDEXKOREA | NDEX KOREA |  |
| SBGLS | SBGLS |  |
| SFEX | SFexpress |  |
| SLX | SLX택배 |  |
| SSG | SSG |  |
| TNT | TNT |  |
| LOGISPARTNER | UFO로지스 |  |
| UPS | UPS |  |
| USPS | USPS |  |
| WIZWA | WIZWA |  |
| YJSWORLD | YJS글로벌 |  |
| YJS | YJS글로벌(영국) |  |
| YUNDA | YUNDAEXPRESS |  |
| IPARCEL | i-parcel |  |
| KY | 건영복합물류 |  |
| KUNYOUNG | 건영택배 |  |
| KDEXP | 경동택배 |  |
| KIN | 경인택배 |  |
| KORYO | 고려택배 |  |
| GDSP | 골드스넵스 |  |
| KOKUSAI | 국제익스프레스 |  |
| GOODTOLUCK | 굿투럭 |  |
| NAEUN | 나은물류 |  |
| NOGOK | 노곡물류 |  |
| NONGHYUP | 농협택배 |  |
| HANAROMART | 농협하나로마트 |  |
| DAELIM | 대림통운 |  |
| DAESIN | 대신택배 |  |
| DAEWOON | 대운글로벌 |  |
| THEBAO | 더바오 |  |
| DODOFLEX | 도도플렉스 |  |
| DONGGANG | 동강물류 |  |
| DONGJIN | 동진특송 |  |
| CHAINLOGIS | 두발히어로당일택배 |  |
| DRABBIT | 딜리래빗 |  |
| JMNP | 딜리박스 |  |
| ONEDAYLOGIS | 라스트마일 |  |
| LINEEXP | 라인익스프레스 |  |
| ROADSUNEXPRESS | 로드썬익스프레스 |  |
| LOGISVALLEY | 로지스밸리 |  |
| POOLATHOME | 로지스올홈케어(풀앳홈) |  |
| LOTOS | 로토스 |  |
| HLCGLOBAL | 롯데글로벌로지스(국제택배) |  |
| LOTTECHILSUNG | 롯데칠성 |  |
| MDLOGIS | 모든로지스(SLO) |  |
| DASONG | 물류대장 |  |
| BABABA | 바바바로지스 |  |
| BANPOOM | 반품구조대 |  |
| VALEX | 발렉스 |  |
| SHIPNERGY | 배송하기좋은날 |  |
| PANTOS | LX판토스 |  |
| VROONG | 부릉 |  |
| BRIDGE | 브릿지로지스 |  |
| EKDP | 삼다수가정배송 |  |
| SELC | 삼성전자물류 |  |
| SEORIM | 서림물류 |  |
| SWGEXP | 성원글로벌 |  |
| SUNGHUN | 성훈물류 |  |
| SEBANG | 세방택배 |  |
| SMARTLOGIS | 스마트로지스 |  |
| SPARKLE | 스파클직배송 |  |
| SPASYS1 | 스페이시스원 |  |
| CRLX | 시알로지텍 |  |
| ANYTRACK | 애니트랙 |  |
| ABOUTPET | 어바웃펫 |  |
| ESTHER | 에스더쉬핑 |  |
| VENDORPIA | 벤더피아 |  |
| ACTCORE | 에이씨티앤코아 |  |
| HKHOLDINGS | 에이치케이홀딩스 |  |
| NTLPS | 엔티엘피스 |  |
| TODAYPICKUP | 카카오T당일배송 |  |
| RUSH | 오늘회러쉬 |  |
| ALLIN | 올인닷컴 |  |
| ALLTAKOREA | 올타코리아 |  |
| WIDETECH | 와이드테크 |  |
| YONGMA | 용마로지스 |  |
| DCOMMERCE | 우리동네커머스 |  |
| WEVILL | 우리동네택배 |  |
| HONAM | 우리택배 |  |
| WOORIHB | 우리한방택배 |  |
| WOOJIN | 우진인터로지스 |  |
| REGISTPOST | 우편등기 |  |
| WOONGJI | 웅지익스프레스 |  |
| WARPEX | 워펙스 |  |
| WINION | 위니온로지스 |  |
| WIHTYOU | 위드유당일택배 |  |
| WEMOVE | 위무브 |  |
| UFREIGHT | 유프레이트코리아 |  |
| EUNHA | 은하쉬핑 |  |
| INNOS | 이노스(올인닷컴) |  |
| EMARTEVERYDAY | 이마트에브리데이 |  |
| ESTLA | 이스트라 |  |
| ETOMARS | 이투마스 |  |
| GENERALPOST | 일반우편 |  |
| ILSHIN | 일신모닝택배 |  |
| ILYANG | 일양로지스 |  |
| GNETWORK | 자이언트 |  |
| ZENIEL | 제니엘시스템 |  |
| JLOGIST | 제이로지스트 |  |
| GENIEGO | 지니고당일특급 |  |
| GDAKOREA | 지디에이코리아 |  |
| GHSPEED | 지에이치스피드 |  |
| JIKGUMOON | 직구문 |  |
| CHUNIL | 천일택배 |  |
| CHOROC | 초록마을(외부연동) |  |
| CHOROCMAEUL | 초록마을(네이버직연동) |  |
| COSHIP | 캐나다쉬핑 |  |
| KJT | 케이제이티 |  |
| QRUN | 큐런 |  |
| CUBEFLOW | 큐브플로우 |  |
| QXPRESS | 트랙스로지스 |  |
| HEREWEGO | 탱고앤고 |  |
| TOMATO | 토마토앱 |  |
| TODAY | 투데이 |  |
| TSG | 티에스지로지스 |  |
| TEAMFRESH | 팀프레시 |  |
| PATEK | 파테크해운상공 |  |
| XINPATEK | 파테크해운항공 |  |
| PANASIA | 판월드로지스틱 |  |
| PANSTAR | 팬스타국제특송(PIEX) |  |
| FOREVER | 퍼레버택배 |  |
| PULMUONE | 풀무원(로지스밸리) |  |
| FREDIT | 프레딧 |  |
| FRESHMATES | 프레시메이트 |  |
| KURLY | 컬리넥스트마일 |  |
| PINGPONG | 핑퐁 |  |
| HOWSER | 하우저 |  |
| HIVECITY | 하이브시티 |  |
| HANDALUM | 한달음택배 |  |
| HANDEX | 한덱스 |  |
| HANMI | 한미포스트 |  |
| HANSSEM | 한샘 |  |
| HANWOORI | 한우리물류 |  |
| HPL | 한의사랑택배 |  |
| HDEXP | 합동택배 |  |
| HERWUZUG | 허우적 |  |
| GLOVIS | 현대글로비스 |  |
| HOMEINNO | 홈이노베이션로지스 |  |
| HOMEPICKTODAY | 홈픽오늘도착 |  |
| HOMEPICK | 홈픽택배 |  |
| HOMEPLUSDELIVERY | 홈플러스 |  |
| HOMEPLUSEXPRESS | 홈플러스익스프레스 |  |
| CARGOPLEASE | 화물을부탁해 |  |
| HWATONG | 화통 |  |
| CH1 | 기타택배 |  |
| LETUS | 바로스 |  |
| LETUS3PL | 레터스 |  |
| CASA | 신세계까사 |  |
| GCS | 지씨에스 |  |
| GKGLOBAL | 지케이글로벌 |  |
| BRCH | 비알씨에이치 |  |
| DNDN | 든든택배 |  |
| GONELO | 고넬로 |  |
| JCLS | JCLS |  |
| JWTNL | JWTNL |  |
| GS25 | GS편의점(퀵배달용) |  |
| CU | CU편의점(퀵배달용) |  |

**collectTrackingNumber**string

수거 송장 번호

**Example:** `D2485799470`

**returnQuantity**integer

반품 수량 (미입력 시 전체수량반품)

## Responses[​](#responses "Direct link to Responses")

- 200
- 400
- 500

(성공/실패) 상품 주문 처리 내역

- application/json

- Schema
- Example (auto)

**Schema**

**timestamp**string<date-time>

**Example:** `2023-01-16T17:14:51.794+09:00`

**traceId**stringrequired

**data** object

**successProductOrderIds**string[]

(성공) 상품 주문 번호

**failProductOrderInfos** object[]

- Array [

**productOrderId**string

(실패) 상품 주문 번호

**code**errorCode.pay-order-seller (string)

## 오류 코드 정의

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| **4000** | 잘못된 요청 파라미터 | 오류 유형.객체명.필드명 |
| **9999** | 기타 | 정의되지 않은 오류 코드 |
| **100001** | 상품 주문을 찾을 수 없음 |  |
| **100003** | 주문을 찾을 수 없음 |  |
| **101009** | 처리 권한이 없는 상품 주문 번호를 요청 |  |
| **101011** | 직계약 상품은 물류사만 발주확인 가능 |  |
| **104105** | 발송 기한 입력 범위 초과 |  |
| **104116** | 배송 방법 변경 필요(배송 없음 주문) |  |
| **104117** | 배송 방법 변경 필요 |  |
| **104118** | 택배사 미입력 |  |
| **104119** | 택배사 코드 확인 |  |
| **104120** | 송장 번호 미입력 |  |
| **104121** | 배송 송장 오류(기사용 송장) |  |
| **104122** | 배송 송장 오류(비유효 송장) |  |
| **104131** | 상품 주문 번호 중복 |  |
| **104133** | 잘못된 요청 |  |
| **104417** | 교환 상태 확인 필요(재배송 처리 불가능 주문 상태) |  |
| **104139** | 조회 가능한 날짜 범위를 초과 |  |
| **104441** | 희망일배송 상품 또는 N희망일배송 상품이 아님 |  |
| **104442** | 상품 주문 상태 확인 필요 |  |
| **104443** | 발주 상태 확인 필요 |  |
| **104444** | 배송 희망일 날짜가 유효하지 않음 |  |
| **104445** | 배송 희망일 변경 가능 날짜 초과 |  |
| **104446** | 기존과 동일한 희망일 배송일시 |  |
| **104138** | 배송 희망일 변경 실패 |  |
| **104449** | 배송 희망일 변경 가능 기간 아님 |  |
| **104450** | N희망일배송 상품은 배송희망시간, 지역 입력 불가 |  |
| **105306** | 변경을 요청한 상태가 기존과 동일 |  |
| **105308** | 직계약 상품은 물류사만 발송처리 가능 |  |
| **105001** | E쿠폰 요청 정보의 상품주문번호가 중복되었습니다. |  |
| **105002** | E쿠폰 발송처리의 인증번호가 유효하지 않습니다. |  |

**message**string

(실패) 메시지

- ]

```json
{
  "timestamp": "2023-01-16T17:14:51.794+09:00",
  "traceId": "string",
  "data": {
    "successProductOrderIds": [
      "string"
    ],
    "failProductOrderInfos": [
      {
        "productOrderId": "string",
        "code": "string",
        "message": "string"
      }
    ]
  }
}
```

(실패) 잘못된 요청

- application/json

- Schema
- Example (auto)

**Schema**

**code**errorCode.pay-order-seller (string)

## 오류 코드 정의

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| **4000** | 잘못된 요청 파라미터 | 오류 유형.객체명.필드명 |
| **9999** | 기타 | 정의되지 않은 오류 코드 |
| **100001** | 상품 주문을 찾을 수 없음 |  |
| **100003** | 주문을 찾을 수 없음 |  |
| **101009** | 처리 권한이 없는 상품 주문 번호를 요청 |  |
| **101011** | 직계약 상품은 물류사만 발주확인 가능 |  |
| **104105** | 발송 기한 입력 범위 초과 |  |
| **104116** | 배송 방법 변경 필요(배송 없음 주문) |  |
| **104117** | 배송 방법 변경 필요 |  |
| **104118** | 택배사 미입력 |  |
| **104119** | 택배사 코드 확인 |  |
| **104120** | 송장 번호 미입력 |  |
| **104121** | 배송 송장 오류(기사용 송장) |  |
| **104122** | 배송 송장 오류(비유효 송장) |  |
| **104131** | 상품 주문 번호 중복 |  |
| **104133** | 잘못된 요청 |  |
| **104417** | 교환 상태 확인 필요(재배송 처리 불가능 주문 상태) |  |
| **104139** | 조회 가능한 날짜 범위를 초과 |  |
| **104441** | 희망일배송 상품 또는 N희망일배송 상품이 아님 |  |
| **104442** | 상품 주문 상태 확인 필요 |  |
| **104443** | 발주 상태 확인 필요 |  |
| **104444** | 배송 희망일 날짜가 유효하지 않음 |  |
| **104445** | 배송 희망일 변경 가능 날짜 초과 |  |
| **104446** | 기존과 동일한 희망일 배송일시 |  |
| **104138** | 배송 희망일 변경 실패 |  |
| **104449** | 배송 희망일 변경 가능 기간 아님 |  |
| **104450** | N희망일배송 상품은 배송희망시간, 지역 입력 불가 |  |
| **105306** | 변경을 요청한 상태가 기존과 동일 |  |
| **105308** | 직계약 상품은 물류사만 발송처리 가능 |  |
| **105001** | E쿠폰 요청 정보의 상품주문번호가 중복되었습니다. |  |
| **105002** | E쿠폰 발송처리의 인증번호가 유효하지 않습니다. |  |

**message**string

**timestamp**string<date-time>

**Example:** `2023-01-16T17:14:51.794+09:00`

**traceId**stringrequired

```json
{
  "code": "string",
  "message": "string",
  "timestamp": "2023-01-16T17:14:51.794+09:00",
  "traceId": "string"
}
```

(실패) 서버 내부

- application/json

- Schema
- Example (auto)

**Schema**

**code**errorCode.pay-order-seller (string)

## 오류 코드 정의

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| **4000** | 잘못된 요청 파라미터 | 오류 유형.객체명.필드명 |
| **9999** | 기타 | 정의되지 않은 오류 코드 |
| **100001** | 상품 주문을 찾을 수 없음 |  |
| **100003** | 주문을 찾을 수 없음 |  |
| **101009** | 처리 권한이 없는 상품 주문 번호를 요청 |  |
| **101011** | 직계약 상품은 물류사만 발주확인 가능 |  |
| **104105** | 발송 기한 입력 범위 초과 |  |
| **104116** | 배송 방법 변경 필요(배송 없음 주문) |  |
| **104117** | 배송 방법 변경 필요 |  |
| **104118** | 택배사 미입력 |  |
| **104119** | 택배사 코드 확인 |  |
| **104120** | 송장 번호 미입력 |  |
| **104121** | 배송 송장 오류(기사용 송장) |  |
| **104122** | 배송 송장 오류(비유효 송장) |  |
| **104131** | 상품 주문 번호 중복 |  |
| **104133** | 잘못된 요청 |  |
| **104417** | 교환 상태 확인 필요(재배송 처리 불가능 주문 상태) |  |
| **104139** | 조회 가능한 날짜 범위를 초과 |  |
| **104441** | 희망일배송 상품 또는 N희망일배송 상품이 아님 |  |
| **104442** | 상품 주문 상태 확인 필요 |  |
| **104443** | 발주 상태 확인 필요 |  |
| **104444** | 배송 희망일 날짜가 유효하지 않음 |  |
| **104445** | 배송 희망일 변경 가능 날짜 초과 |  |
| **104446** | 기존과 동일한 희망일 배송일시 |  |
| **104138** | 배송 희망일 변경 실패 |  |
| **104449** | 배송 희망일 변경 가능 기간 아님 |  |
| **104450** | N희망일배송 상품은 배송희망시간, 지역 입력 불가 |  |
| **105306** | 변경을 요청한 상태가 기존과 동일 |  |
| **105308** | 직계약 상품은 물류사만 발송처리 가능 |  |
| **105001** | E쿠폰 요청 정보의 상품주문번호가 중복되었습니다. |  |
| **105002** | E쿠폰 발송처리의 인증번호가 유효하지 않습니다. |  |

**message**string

**timestamp**string<date-time>

**Example:** `2023-01-16T17:14:51.794+09:00`

**traceId**stringrequired

```json
{
  "code": "string",
  "message": "string",
  "timestamp": "2023-01-16T17:14:51.794+09:00",
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
curl -L 'https://api.commerce.naver.com/external/v1/pay-order/seller/product-orders/:productOrderId/claim/return/request' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{
  "returnReason": "string",
  "collectDeliveryMethod": "DELIVERY",
  "collectDeliveryCompany": "string",
  "collectTrackingNumber": "D2485799470",
  "returnQuantity": 0
}'
```

Request Collapse all

Base URL

Edit

https://api.commerce.naver.com/external

Auth

Bearer Token

Parameters

productOrderId — pathrequired

Body required

- Example (from schema)
- ex1

```json
{
  "returnReason": "string",
  "collectDeliveryMethod": "DELIVERY",
  "collectDeliveryCompany": "string",
  "collectTrackingNumber": "D2485799470",
  "returnQuantity": 0
}
```
