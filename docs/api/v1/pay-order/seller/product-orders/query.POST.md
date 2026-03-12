---
doc-id: "v1-pay-order-seller-product-orders-query-post"
title: "상품 주문 상세 내역 조회"
description: "상품 주문에 대한 상세 상품 주문 내역을 조회합니다. 요청 가능한 상품 주문 번호는 최대 300개입니다."
type: api-endpoint
method: POST
path: /v1/pay-order/seller/product-orders/query
base-url: https://api.commerce.naver.com/external
category: 주문
tags:
  - order
  - post
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/seller-get-product-orders-pay-order-seller
---

# 상품 주문 상세 내역 조회



```
> **POST** `https://api.commerce.naver.com/external/v1/pay-order/seller/product-orders/query`
```

상품 주문에 대한 상세 상품 주문 내역을 조회합니다. 요청 가능한 상품 주문 번호는 최대 300개입니다.

## Request

**POST** `/v1/pay-order/seller/product-orders/query`
### Body**required**

string 배열

**productOrderIds**string[]required

**quantityClaimCompatibility**boolean

수량클레임 변경사항 개발 대응 완료 여부 (수량클레임 변경사항에 대한 개발 대응 완료 시 true 값으로 호출)

## Responses

**POST** `/v1/pay-order/seller/product-orders/query` — 응답
(성공) 상품 주문 내역

**timestamp**string<date-time>

**Example:** `2023-01-16T17:14:51.794+09:00`

**traceId**stringrequired

**data** productOrdersInfo.pay-order-seller (object)[]

**order** orderResponseContent.pay-order-seller (object)

**chargeAmountPaymentAmount**integer

충전금 최종 결제 금액

**checkoutAccumulationPaymentAmount**integer

네이버페이 적립금 최종 결제 금액

**generalPaymentAmount**integer

일반 결제 수단 최종 결제 금액

**naverMileagePaymentAmount**integer

네이버페이 포인트 최종 결제 금액

**orderDate**string<date-time>

주문 일시. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**orderDiscountAmount**integer

주문 할인액

**orderId**string

주문 번호. 20바이트 내외

**ordererId**string

주문자 ID. 20바이트 내외

**ordererName**string

주문자 이름. 300바이트 내외 (선물 주문은 마스킹됨)

**ordererTel**string

주문자 연락처 (선물 주문은 마스킹됨). 45바이트 내외.

**paymentDate**string<date-time>

결제 일시(최종 결제). 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**paymentDueDate**string<date-time>

결제 기한. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**paymentMeans**string

결제 수단. 300바이트 내외

| 결제수단 | 비고 |
| --- | --- |
| 신용카드 |  |
| 신용카드 간편결제 |  |
| 휴대폰 |  |
| 휴대폰 간편결제 |  |
| 계좌 간편결제 |  |
| 무통장입금 |  |
| 포인트/머니결제 |  |
| 패밀리결제 |  |
| 후불결제 |  |

**isDeliveryMemoParticularInput**string

배송 메모 개별 입력 여부. 8바이트 내외

**payLocationType**string

결제 위치 구분(PC/MOBILE). 300바이트 내외

**ordererNo**string

주문자 번호. 20바이트 내외

**payLaterPaymentAmount**integer

후불 결제 최종 결제 금액

**isMembershipSubscribed**boolean

주문시점 멤버십 여부

**productOrder** productOrderResponseContent.pay-order-seller (object)

**claimStatus**claimStatus.pay-order-seller (string)

클레임 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| CANCEL_REQUEST | 취소 요청 |  |
| CANCELING | 취소 처리 중 |  |
| CANCEL_DONE | 취소 처리 완료 |  |
| CANCEL_REJECT | 취소 철회 |  |
| RETURN_REQUEST | 반품 요청 |  |
| EXCHANGE_REQUEST | 교환 요청 |  |
| COLLECTING | 수거 처리 중 |  |
| COLLECT_DONE | 수거 완료 |  |
| EXCHANGE_REDELIVERING | 교환 재배송 중 |  |
| RETURN_DONE | 반품 완료 |  |
| EXCHANGE_DONE | 교환 완료 |  |
| RETURN_REJECT | 반품 철회 |  |
| EXCHANGE_REJECT | 교환 철회 |  |
| PURCHASE_DECISION_HOLDBACK | 구매 확정 보류 |  |
| PURCHASE_DECISION_REQUEST | 구매 확정 요청 |  |
| PURCHASE_DECISION_HOLDBACK_RELEASE | 구매 확정 보류 해제 |  |
| ADMIN_CANCELING | 직권 취소 중 |  |
| ADMIN_CANCEL_DONE | 직권 취소 완료 |  |
| ADMIN_CANCEL_REJECT | 직권 취소 철회 |  |

**claimType**claimType.pay-order-seller (string)

클레임 구분. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| CANCEL | 취소 |  |
| RETURN | 반품 |  |
| EXCHANGE | 교환 |  |
| PURCHASE_DECISION_HOLDBACK | 구매 확정 보류 |  |
| ADMIN_CANCEL | 직권 취소 |  |

**decisionDate**string<date-time>

구매 확정일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**delayedDispatchDetailedReason**string

발송 지연 상세 사유. 4000바이트 내외

**delayedDispatchReason**delayedDispatchReason.pay-order-seller (string)

발송 지연 사유 코드. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| PRODUCT_PREPARE | 상품 준비 중 |  |
| CUSTOMER_REQUEST | 고객 요청 |  |
| CUSTOM_BUILD | 주문 제작 |  |
| RESERVED_DISPATCH | 예약 발송 |  |
| OVERSEA_DELIVERY | 해외 배송 |  |
| ETC | 기타 |  |

**Example:** `PRODUCT_PREPARE`

**deliveryDiscountAmount**integer

배송비 최종 할인액

**deliveryFeeAmount**integer

배송비 합계

**deliveryPolicyType**string

배송비 정책(조건별 무료 등). 250바이트 내외

**expectedDeliveryMethod**deliveryMethod.pay-order-seller (string)

배송 방법 코드. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DELIVERY | 택배, 등기, 소포 |  |
| GDFW_ISSUE_SVC | 굿스플로 송장 출력 |  |
| VISIT_RECEIPT | 방문 수령 |  |
| DIRECT_DELIVERY | 직접 전달 |  |
| QUICK_SVC | 퀵서비스 |  |
| NOTHING | 배송 없음 |  |
| RETURN_DESIGNATED | 지정 반품 택배 |  |
| RETURN_DELIVERY | 일반 반품 택배 |  |
| RETURN_INDIVIDUAL | 직접 반송 |  |
| RETURN_MERCHANT | 판매자 직접 수거(장보기 전용) |  |
| UNKNOWN | 알 수 없음(예외 처리에 사용) |  |

**Example:** `DELIVERY`

**freeGift**string

사은품. 1000바이트 내외

**mallId**string

가맹점 ID. 20바이트 내외

**optionCode**string

옵션 코드. 1000바이트 내외

**optionPrice**integer

옵션 금액

**packageNumber**string

묶음배송 번호. 20바이트 내외

**placeOrderDate**string<date-time>

발주 확인일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**placeOrderStatus**placeOrderStatus.pay-order-seller (string)

발주 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| NOT_YET | 발주 미확인 |  |
| OK | 발주 확인 |  |
| CANCEL | 발주 확인 해제 |  |

**productClass**string

상품 종류(일반/추가 상품 구분). 250바이트 내외

**productDiscountAmount**integer

최초 상품별 할인액

**initialProductDiscountAmount**integer

최초 상품별 할인액

**remainProductDiscountAmount**integer

잔여 상품별 할인액

**groupProductId**number

그룹 상품 번호

**productId**string

채널 상품 번호. 150바이트 내외

**originalProductId**string

원상품 번호. 150바이트 내외

**merchantChannelId**string

채널 번호. 150바이트 내외

**productName**string

상품명. 4000바이트 내외

**productOption**string

상품 옵션(옵션명). 4000바이트 내외

**productOrderId**string

상품 주문 번호. 20바이트 내외

**productOrderStatus**productOrderStatus.pay-order-seller (string)

상품 주문 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| PAYMENT_WAITING | 결제 대기 |  |
| PAYED | 결제 완료 |  |
| DELIVERING | 배송 중 |  |
| DELIVERED | 배송 완료 |  |
| PURCHASE_DECIDED | 구매 확정 |  |
| EXCHANGED | 교환 |  |
| CANCELED | 취소 |  |
| RETURNED | 반품 |  |
| CANCELED_BY_NOPAYMENT | 미결제 취소 |  |

**quantity**integer

최초 수량

**initialQuantity**integer

최초 수량

**remainQuantity**integer

잔여 수량

**sectionDeliveryFee**integer

지역별 추가 배송비

**sellerProductCode**string

판매자 상품 코드(판매자가 임의로 지정). 150바이트 내외

**shippingAddress** shippingAddress.pay-order-seller (object)

**addressType**addressType.pay-order-seller (string)

배송지 타입. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DOMESTIC | 국내 |  |
| FOREIGN | 국외 |  |

**baseAddress**string

기본 주소. 300바이트 내외

**city**string

도시. 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**country**string

국가. 45바이트 내외

**detailedAddress**string

상세 주소. 300바이트 내외

**name**string

이름. 150바이트 내외

**state**string

주(state). 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**tel1**string

연락처 1. 45바이트 내외

**tel2**string

연락처 2. 45바이트 내외

**zipCode**string

우편번호. 45바이트 내외

**isRoadNameAddress**boolean

도로명 주소 여부. 8바이트 내외

**pickupLocationType**pickupLocationType.pay-order-seller (string)

수령 위치. 250바이트 내외
장보기 및 일부 N배송, N희망일배송, N판매자배송 주문에 대해서만 제공됩니다

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| FRONT_OF_DOOR | 문 앞 |  |
| MANAGEMENT_OFFICE | 경비실 보관 |  |
| DIRECT_RECEIVE | 직접 수령 |  |
| OTHER | 기타 |  |

**Possible values:** [`FRONT_OF_DOOR`, `MANAGEMENT_OFFICE`, `DIRECT_RECEIVE`, `OTHER`]

**pickupLocationContent**string

수령 위치. 300바이트 내외
장보기 및 일부 N배송, N희망일배송, N판매자배송 주문에 대해서만 제공됩니다.

**entryMethod**entryMethod.pay-order-seller (string)

출입 방법. 250바이트 내외
장보기 및 일부 N배송, N희망일배송, N판매자배송 주문에 대해서만 제공됩니다.

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| LOBBY_PW | 공동현관 비밀번호 입력 |  |
| MANAGEMENT_OFFICE | 경비실 호출 |  |
| FREE | 자유 출입 가능 |  |
| OTHER | 기타 출입 방법 |  |

**Possible values:** [`LOBBY_PW`, `MANAGEMENT_OFFICE`, `FREE`, `OTHER`]

**entryMethodContent**string

출입 방법. 300바이트 내외
장보기 및 일부 N배송, N희망일배송, N판매자배송 주문에 대해서만 제공됩니다.

**buildingManagementNo**string

건물 관리 번호. 100바이트 내외

**longitude**string

경도. 50바이트 내외

**latitude**string

위도. 50바이트 내외

**shippingStartDate**string<date-time>

발송 시작일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**shippingDueDate**string<date-time>

발송 기한. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**shippingFeeType**string

배송비 형태(선불/착불/무료). 250바이트 내외

**shippingMemo**string

배송 메모. 4000바이트 내외

**takingAddress** 판매자 출고지 주소 (object)

**addressType**addressType.pay-order-seller (string)

배송지 타입. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DOMESTIC | 국내 |  |
| FOREIGN | 국외 |  |

**baseAddress**string

기본 주소. 300바이트 내외

**city**string

도시. 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**country**string

국가. 45바이트 내외

**detailedAddress**string

상세 주소. 300바이트 내외

**name**string

이름. 150바이트 내외

**state**string

주(state). 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**tel1**string

연락처 1. 45바이트 내외

**tel2**string

연락처 2. 45바이트 내외

**zipCode**string

우편번호. 45바이트 내외

**isRoadNameAddress**boolean

도로명 주소 여부. 8바이트 내외

**totalPaymentAmount**integer

최초 결제 금액(할인 적용 후 금액)

**initialPaymentAmount**integer

최초 결제 금액(할인 적용 후 금액)

**remainPaymentAmount**integer

잔여 결제 금액(할인 적용 후 금액)

**totalProductAmount**integer

최초 주문 금액(할인 적용 전 금액)

**initialProductAmount**integer

최초 주문 금액(할인 적용 전 금액)

**remainProductAmount**integer

잔여 주문 금액(할인 적용 전 금액)

**unitPrice**integer

상품 가격

**sellerBurdenDiscountAmount**integer

판매자 부담 할인액

**commissionRatingType**string

수수료 과금 구분(결제 수수료/(구)판매 수수료/채널 수수료). 250바이트 내외

**commissionPrePayStatus**commissionPrePayStatus.pay-order-seller (string)

수수료 선결제 상태 구분. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| GENERAL_PRD | 일반 상품 |  |
| PRE_PAY_PRD_NO_PAY | 선차감(차감 전) |  |
| PRE_PAY_PRD_PAYED | 선차감(차감 후) |  |

**paymentCommission**integer

결제 수수료

**saleCommission**integer

(구)판매 수수료

**expectedSettlementAmount**integer

정산 예정 금액

**inflowPath**string

유입 경로(검색광고(SA)/공동구매/밴드/네이버 쇼핑/네이버 쇼핑 외). 250바이트 내외

**inflowPathAdd**string

유입 경로 추가 정보. 250바이트 내외

**itemNo**string

옵션 상품이나 추가 상품 등록 시 자동 생성된 아이템 번호로, 옵션 상품, 추가 상품을 구분하는 고유한 값. OptionCode와 동일한 값을 입력합니다. 1000바이트 내외

**optionManageCode**string

옵션 상품이나 추가 상품 등록 시 판매자가 별도로 입력한 옵션 관리 코드. 옵션 상품이나 추가 상품인 경우에 입력합니다. 1000바이트 내외

**sellerCustomCode1**string

판매자가 내부에서 사용하는 코드. 1000바이트 내외

**sellerCustomCode2**string

판매자가 내부에서 사용하는 코드. 1000바이트 내외

**claimId**string

클레임 번호. 20바이트 내외

**channelCommission**integer

채널 수수료

**individualCustomUniqueCode**string

구매자 개인통관고유부호. 구매 확정, 교환, 반품, 취소, 미결제 취소 상태의 거래 종료 주문에서는 노출되지 않습니다. 300바이트 내외

**productImediateDiscountAmount**integer

상품별 즉시 할인 금액

**initialProductImmediateDiscountAmount**integer

최초 상품별 즉시 할인 금액

**remainProductImmediateDiscountAmount**integer

잔여 상품별 즉시 할인 금액

**productProductDiscountAmount**integer

상품별 상품 할인 쿠폰 금액

**initialProductProductDiscountAmount**integer

최초 상품별 상품 할인 쿠폰 금액

**remainProductProductDiscountAmount**integer

잔여 상품별 상품 할인 쿠폰 금액

**productMultiplePurchaseDiscountAmount**integer

상품별 복수 구매 할인 금액

**sellerBurdenImediateDiscountAmount**integer

판매자 부담 즉시 할인 금액

**initialSellerBurdenImmediateDiscountAmount**integer

최초 판매자 부담 즉시 할인 금액

**remainSellerBurdenImmediateDiscountAmount**integer

잔여 판매자 부담 즉시 할인 금액

**sellerBurdenProductDiscountAmount**integer

판매자 부담 상품 할인 쿠폰 금액

**initialSellerBurdenProductDiscountAmount**integer

최초 판매자 부담 상품 할인 쿠폰 금액

**remainSellerBurdenProductDiscountAmount**integer

잔여 판매자 부담 상품 할인 쿠폰 금액

**sellerBurdenMultiplePurchaseDiscountAmount**integer

판매자 부담 복수 구매 할인 금액

**knowledgeShoppingSellingInterlockCommission**integer

네이버 쇼핑 매출 연동 수수료

**giftReceivingStatus**giftReceivingStatus.pay-order-seller (string)

선물 수락 상태 구분. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| WAIT_FOR_RECEIVING | 수락 대기(배송지 입력 대기) |  |
| RECEIVED | 수락 완료 |  |

**sellerBurdenStoreDiscountAmount**integer

판매자 부담 스토어 할인 금액

**sellerBurdenMultiplePurchaseDiscountType**multiplePurchaseDiscountType.pay-order-seller (string)

판매자 부담 복수 구매 할인 타입. 250바이트 내외

**Possible values:** [`IGNORE_QUANTITY`, `QUANTITY`]

**logisticsCompanyId**string

물류사 코드. 45바이트 내외

**logisticsCenterId**string

물류센터 코드. 45바이트 내외

**skuMappings** skuMapping.pay-order-seller (object)[]

물류재고정보

**nsId**string

네이버 SKU ID (네이버SKU를 연동한 풀필먼트 상품주문에 한정). 20바이트 내외

**nsBarcode**string

SKU 바코드 (네이버SKU를 연동한 풀필먼트 상품주문에 한정). 100바이트 내외

**pickingQuantityPerOrder**integer

주문당 피킹수량 (네이버SKU를 연동한 풀필먼트 상품주문에 한정).

**hopeDelivery** hopeDelivery.pay-order-seller (object)

**region**string

지역. 100바이트 내외

**additionalFee**integer

배송 희망 지역 설정 배송비

**hopeDeliveryYmd**string

배송 희망일. yyyymmdd 형식의 연월일

**hopeDeliveryHm**string

배송 희망 시간. HHmm 형식의 시간

**changeReason**string

변경 사유. 1000바이트 내외

**changer**string

변경한 사용자(구매자/판매자/판매자 API). 100바이트 내외

**deliveryAttributeType**deliveryAttributeType.pay-order-seller (string)

배송 속성 타입 코드. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| NORMAL | 일반배송 |  |
| TODAY | 오늘출발 |  |
| OPTION_TODAY | 옵션별 오늘출발 |  |
| HOPE | 희망일배송 |  |
| TODAY_ARRIVAL | 당일배송 |  |
| DAWN_ARRIVAL | 새벽배송 |  |
| PRE_ORDER | 예약구매 |  |
| ARRIVAL_GUARANTEE | N배송 |  |
| SELLER_GUARANTEE | N판매자배송 |  |
| HOPE_SELLER_GUARANTEE | N희망일배송 |  |
| PICKUP | 픽업 |  |
| QUICK | 즉시배달 |  |

**expectedDeliveryCompany**deliveryCompanyCode.pay-order-seller (string)

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

**arrivalGuaranteeDate**string<date-time>

배송 도착 보장 일시. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**deliveryTagType**deliveryTagType.pay-order-seller (string)

배송태그타입. 일부 N배송, N희망일배송, N판매자배송 주문에 대해서만 제공됩니다.

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| TODAY | 오늘배송 |  |
| TOMORROW | 내일배송 |  |
| DAWN | 새벽배송 |  |
| SUNDAY | 일요배송 |  |
| STANDARD | D+2이상배송 |  |
| HOPE | 희망일배송 |  |

**taxType**taxType.pay-order-seller (string)

상품 과면세 여부

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| TAXATION | 과세 |  |
| TAX_EXEMPTION | 면세 |  |
| TAX_FREE | 영세 |  |

**storageType**storageType.pay-order-seller (string)

옵션보관유형

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DRY | 상온 |  |
| WET | 냉장 |  |
| FROZEN | 냉동 |  |

**logisticsDirectContracted**boolean

물류직계약여부

**appliedCoupons** appliedCoupon.pay-order-seller (object)[]

쿠폰사용정보

**couponPublishNumber**string

쿠폰 발행 번호

**couponClassCode**couponClassCode.pay-order-seller (string)

쿠폰 유형.

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| NMP_PRD_DCNT | 관리자 상품할인 |  |
| NMP_PRD_DUP_DCNT | 관리자/판매자 상품중복할인 |  |

**couponDiscountAmount**integer

쿠폰 할인 금액

**naverBurdenRatio**integer

네이버 부담률

**appliedCardPromotion** appliedCardPromotion.pay-order-seller (object)

카드 프로모션 적용 정보

**promotionName**string

프로모션 이름. 25바이트 내외

**cardCompanyName**string

카드사 이름. 250바이트 내외

**promotionApplyAmount**integer

프로모션 혜택 금액

**brandCompanyBurdenRatio**integer

판매자/가맹점 분담 비율

**cancel** 취소 (2025년 상반기 중 제거 예정. currentClaim 하위의 동일 오브젝트 사용 권장.) (object)

**claimId**string

클레임 번호. 20바이트 내외

**cancelApprovalDate**string<date-time>

취소 승인일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**cancelCompletedDate**string<date-time>

취소 완료일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**cancelDetailedReason**string

취소 상세 사유. 4000바이트 내외

**cancelReason**claimReason.pay-order-seller (string)

클레임 요청 사유. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| INTENT_CHANGED | 구매 의사 취소 |  |
| COLOR_AND_SIZE | 색상 및 사이즈 변경 |  |
| WRONG_ORDER | 다른 상품 잘못 주문 |  |
| PRODUCT_UNSATISFIED | 서비스 불만족 |  |
| DELAYED_DELIVERY | 배송 지연 |  |
| SOLD_OUT | 상품 품절 |  |
| DROPPED_DELIVERY | 배송 누락 |  |
| NOT_YET_DELIVERY | 미배송 |  |
| BROKEN | 상품 파손 |  |
| INCORRECT_INFO | 상품 정보 상이 |  |
| WRONG_DELIVERY | 오배송 |  |
| WRONG_OPTION | 색상 등 다른 상품 잘못 배송 |  |
| SIMPLE_INTENT_CHANGED | 단순 변심 |  |
| MISTAKE_ORDER | 주문 실수 |  |
| ETC | 기타 | API 에서 지정 불가 |
| DELAYED_DELIVERY_BY_PURCHASER | 배송 지연 |  |
| INCORRECT_INFO_BY_PURCHASER | 상품 정보 상이 |  |
| PRODUCT_UNSATISFIED_BY_PURCHASER | 서비스 불만족 |  |
| NOT_YET_DISCUSSION | 상호 협의가 완료되지 않은 주문 건 |  |
| OUT_OF_STOCK | 재고 부족으로 인한 판매 불가 |  |
| SALE_INTENT_CHANGED | 판매 의사 변심으로 인한 거부 |  |
| NOT_YET_PAYMENT | 구매자의 미결제로 인한 거부 |  |
| NOT_YET_RECEIVE | 상품 미수취 |  |
| WRONG_DELAYED_DELIVERY | 오배송 및 지연 |  |
| BROKEN_AND_BAD | 파손 및 불량 |  |
| RECEIVING_DUE_DATE_OVER | 수락 기한 만료 |  |
| RECEIVER_MISMATCHED | 수신인 불일치 |  |
| GIFT_INTENT_CHANGED | 보내기 취소 |  |
| GIFT_REFUSAL | 선물 거절 |  |
| MINOR_RESTRICTED | 상품 수신 불가 |  |
| RECEIVING_BLOCKED | 상품 수신 불가 |  |
| UNDER_QUANTITY | 주문 수량 미달 |  |
| ASYNC_FAIL_PAYMENT | 결제 승인 실패 |  |
| ASYNC_LONG_WAIT_PAYMENT | 결제 승인 실패 |  |

**claimRequestDate**string<date-time>

클레임 요청일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**claimStatus**claimStatus.pay-order-seller (string)

클레임 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| CANCEL_REQUEST | 취소 요청 |  |
| CANCELING | 취소 처리 중 |  |
| CANCEL_DONE | 취소 처리 완료 |  |
| CANCEL_REJECT | 취소 철회 |  |
| RETURN_REQUEST | 반품 요청 |  |
| EXCHANGE_REQUEST | 교환 요청 |  |
| COLLECTING | 수거 처리 중 |  |
| COLLECT_DONE | 수거 완료 |  |
| EXCHANGE_REDELIVERING | 교환 재배송 중 |  |
| RETURN_DONE | 반품 완료 |  |
| EXCHANGE_DONE | 교환 완료 |  |
| RETURN_REJECT | 반품 철회 |  |
| EXCHANGE_REJECT | 교환 철회 |  |
| PURCHASE_DECISION_HOLDBACK | 구매 확정 보류 |  |
| PURCHASE_DECISION_REQUEST | 구매 확정 요청 |  |
| PURCHASE_DECISION_HOLDBACK_RELEASE | 구매 확정 보류 해제 |  |
| ADMIN_CANCELING | 직권 취소 중 |  |
| ADMIN_CANCEL_DONE | 직권 취소 완료 |  |
| ADMIN_CANCEL_REJECT | 직권 취소 철회 |  |

**refundExpectedDate**string<date-time>

환불 예정일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**refundStandbyReason**string

환불 대기 사유. 300바이트 내외

**refundStandbyStatus**string

환불 대기 상태. 100바이트 내외

**requestChannel**string

접수 채널. 100바이트 내외

**requestQuantity**integer

요청 수량

**return** 반품 (2025년 상반기 중 제거 예정. currentClaim 하위의 동일 오브젝트 사용 권장.) (object)

**claimId**string

클레임 번호. 20바이트 내외

**claimDeliveryFeeDemandAmount**integer

반품 배송비 청구액

**claimDeliveryFeePayMeans**string

반품 배송비 결제 수단. 250바이트 내외

**claimDeliveryFeePayMethod**string

반품 배송비 결제 방법. 250바이트 내외

**claimRequestDate**string<date-time>

클레임 요청일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**claimStatus**claimStatus.pay-order-seller (string)

클레임 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| CANCEL_REQUEST | 취소 요청 |  |
| CANCELING | 취소 처리 중 |  |
| CANCEL_DONE | 취소 처리 완료 |  |
| CANCEL_REJECT | 취소 철회 |  |
| RETURN_REQUEST | 반품 요청 |  |
| EXCHANGE_REQUEST | 교환 요청 |  |
| COLLECTING | 수거 처리 중 |  |
| COLLECT_DONE | 수거 완료 |  |
| EXCHANGE_REDELIVERING | 교환 재배송 중 |  |
| RETURN_DONE | 반품 완료 |  |
| EXCHANGE_DONE | 교환 완료 |  |
| RETURN_REJECT | 반품 철회 |  |
| EXCHANGE_REJECT | 교환 철회 |  |
| PURCHASE_DECISION_HOLDBACK | 구매 확정 보류 |  |
| PURCHASE_DECISION_REQUEST | 구매 확정 요청 |  |
| PURCHASE_DECISION_HOLDBACK_RELEASE | 구매 확정 보류 해제 |  |
| ADMIN_CANCELING | 직권 취소 중 |  |
| ADMIN_CANCEL_DONE | 직권 취소 완료 |  |
| ADMIN_CANCEL_REJECT | 직권 취소 철회 |  |

**collectAddress** 구매자 수거지 주소 (object)

**addressType**addressType.pay-order-seller (string)

배송지 타입. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DOMESTIC | 국내 |  |
| FOREIGN | 국외 |  |

**baseAddress**string

기본 주소. 300바이트 내외

**city**string

도시. 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**country**string

국가. 45바이트 내외

**detailedAddress**string

상세 주소. 300바이트 내외

**name**string

이름. 150바이트 내외

**state**string

주(state). 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**tel1**string

연락처 1. 45바이트 내외

**tel2**string

연락처 2. 45바이트 내외

**zipCode**string

우편번호. 45바이트 내외

**isRoadNameAddress**boolean

도로명 주소 여부. 8바이트 내외

**collectCompletedDate**string<date-time>

수거 완료일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

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

**collectDeliveryMethod**deliveryMethod.pay-order-seller (string)

배송 방법 코드. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DELIVERY | 택배, 등기, 소포 |  |
| GDFW_ISSUE_SVC | 굿스플로 송장 출력 |  |
| VISIT_RECEIPT | 방문 수령 |  |
| DIRECT_DELIVERY | 직접 전달 |  |
| QUICK_SVC | 퀵서비스 |  |
| NOTHING | 배송 없음 |  |
| RETURN_DESIGNATED | 지정 반품 택배 |  |
| RETURN_DELIVERY | 일반 반품 택배 |  |
| RETURN_INDIVIDUAL | 직접 반송 |  |
| RETURN_MERCHANT | 판매자 직접 수거(장보기 전용) |  |
| UNKNOWN | 알 수 없음(예외 처리에 사용) |  |

**Example:** `DELIVERY`

**collectStatus**collectStatus.pay-order-seller (string)

수거 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| NOT_REQUESTED | 수거 미요청 |  |
| COLLECT_REQUEST_TO_AGENT | 수거 지시 완료 |  |
| COLLECT_REQUEST_TO_DELIVERY_COMPANY | 수거 요청 |  |
| COLLECT_WAITING | 택배사 수거 예정 |  |
| DELIVERING | 수거 진행 중 |  |
| DELIVERED | 수거 완료 |  |
| DELIVERY_FAILED | 배송 실패 |  |
| COLLECT_FAILED | 수거 실패 |  |
| WRONG_INVOICE | 오류 송장 |  |
| COLLECT_CANCELED | 수거 취소 |  |

**Example:** `NOT_REQUESTED`

**collectTrackingNumber**string

수거 송장 번호. 100바이트 내외

**etcFeeDemandAmount**integer

기타 비용 청구액

**etcFeePayMeans**string

기타 비용 결제 수단. 250바이트 내외

**etcFeePayMethod**string

기타 비용 결제 방법. 250바이트 내외

**holdbackDetailedReason**string

보류 상세 사유. 4000바이트 내외

**holdbackReason**holdbackReason.pay-order-seller (string)

보류 유형. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| RETURN_DELIVERYFEE | 반품 배송비 청구 |  |
| EXTRAFEEE | 추가 비용 청구 |  |
| RETURN_DELIVERYFEE_AND_EXTRAFEEE | 반품 배송비 + 추가 비용 청구 |  |
| RETURN_PRODUCT_NOT_DELIVERED | 반품 상품 미입고 |  |
| ETC | 기타 사유 |  |
| EXCHANGE_DELIVERYFEE | 교환 배송비 청구 |  |
| EXCHANGE_EXTRAFEE | 추가 교환 비용 청구 |  |
| EXCHANGE_PRODUCT_READY | 교환 상품 준비 중 |  |
| EXCHANGE_PRODUCT_NOT_DELIVERED | 교환 상품 미입고 |  |
| EXCHANGE_HOLDBACK | 교환 구매 확정 보류 |  |
| SELLER_CONFIRM_NEED | 판매자 확인 필요 |  |
| PURCHASER_CONFIRM_NEED | 구매자 확인 필요 |  |
| SELLER_REMIT | 판매자 직접 송금 |  |
| ETC2 | 기타 |  |

**holdbackStatus**holdbackStatus.pay-order-seller (string)

보류 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| HOLDBACK | 보류 중 |  |
| RELEASED | 보류 해제 |  |

**refundExpectedDate**string<date-time>

환불 예정일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**refundStandbyReason**string

환불 대기 사유. 250바이트 내외

**refundStandbyStatus**string

환불 대기 상태. 250바이트 내외

**requestChannel**string

접수 채널. 250바이트 내외

**requestQuantity**integer

요청 수량

**returnDetailedReason**string

반품 상세 사유. 100바이트 내외

**returnReason**claimReason.pay-order-seller (string)

클레임 요청 사유. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| INTENT_CHANGED | 구매 의사 취소 |  |
| COLOR_AND_SIZE | 색상 및 사이즈 변경 |  |
| WRONG_ORDER | 다른 상품 잘못 주문 |  |
| PRODUCT_UNSATISFIED | 서비스 불만족 |  |
| DELAYED_DELIVERY | 배송 지연 |  |
| SOLD_OUT | 상품 품절 |  |
| DROPPED_DELIVERY | 배송 누락 |  |
| NOT_YET_DELIVERY | 미배송 |  |
| BROKEN | 상품 파손 |  |
| INCORRECT_INFO | 상품 정보 상이 |  |
| WRONG_DELIVERY | 오배송 |  |
| WRONG_OPTION | 색상 등 다른 상품 잘못 배송 |  |
| SIMPLE_INTENT_CHANGED | 단순 변심 |  |
| MISTAKE_ORDER | 주문 실수 |  |
| ETC | 기타 | API 에서 지정 불가 |
| DELAYED_DELIVERY_BY_PURCHASER | 배송 지연 |  |
| INCORRECT_INFO_BY_PURCHASER | 상품 정보 상이 |  |
| PRODUCT_UNSATISFIED_BY_PURCHASER | 서비스 불만족 |  |
| NOT_YET_DISCUSSION | 상호 협의가 완료되지 않은 주문 건 |  |
| OUT_OF_STOCK | 재고 부족으로 인한 판매 불가 |  |
| SALE_INTENT_CHANGED | 판매 의사 변심으로 인한 거부 |  |
| NOT_YET_PAYMENT | 구매자의 미결제로 인한 거부 |  |
| NOT_YET_RECEIVE | 상품 미수취 |  |
| WRONG_DELAYED_DELIVERY | 오배송 및 지연 |  |
| BROKEN_AND_BAD | 파손 및 불량 |  |
| RECEIVING_DUE_DATE_OVER | 수락 기한 만료 |  |
| RECEIVER_MISMATCHED | 수신인 불일치 |  |
| GIFT_INTENT_CHANGED | 보내기 취소 |  |
| GIFT_REFUSAL | 선물 거절 |  |
| MINOR_RESTRICTED | 상품 수신 불가 |  |
| RECEIVING_BLOCKED | 상품 수신 불가 |  |
| UNDER_QUANTITY | 주문 수량 미달 |  |
| ASYNC_FAIL_PAYMENT | 결제 승인 실패 |  |
| ASYNC_LONG_WAIT_PAYMENT | 결제 승인 실패 |  |

**returnReceiveAddress** 판매자 교환/반품 수취 주소 (object)

**addressType**addressType.pay-order-seller (string)

배송지 타입. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DOMESTIC | 국내 |  |
| FOREIGN | 국외 |  |

**baseAddress**string

기본 주소. 300바이트 내외

**city**string

도시. 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**country**string

국가. 45바이트 내외

**detailedAddress**string

상세 주소. 300바이트 내외

**name**string

이름. 150바이트 내외

**state**string

주(state). 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**tel1**string

연락처 1. 45바이트 내외

**tel2**string

연락처 2. 45바이트 내외

**zipCode**string

우편번호. 45바이트 내외

**isRoadNameAddress**boolean

도로명 주소 여부. 8바이트 내외

**logisticsCenterId**string

물류센터 ID. 60바이트

**returnCompletedDate**string<date-time>

반품 완료일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**holdbackConfigDate**string<date-time>

보류 설정일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**holdbackConfigurer**string

보류 설정자(구매자/판매자/관리자/시스템). 250바이트 내외

**holdbackReleaseDate**string<date-time>

보류 해제일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**holdbackReleaser**string

보류 해제자(구매자/판매자/관리자/시스템). 250바이트 내외

**claimDeliveryFeeProductOrderIds**string

반품 배송비 묶음 청구 상품 주문 번호(여러 개면 쉼표로 구분). 4000바이트 내외

**claimDeliveryFeeDiscountAmount**integer

반품 배송비 할인액

**remoteAreaCostChargeAmount**integer

반품 도서산간 배송비

**membershipsArrivalGuaranteeClaimSupportingAmount**integer

멤버십N배송 지원금액

**returnImageUrl**string[]

반품이미지 URL

**claimDeliveryFeeSupportType**claimDeliveryFeeSupportType.pay-order-seller (string)

클레임배송비지원타입

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| MEMBERSHIP_ARRIVAL_GUARANTEE | 멤버십도착보장 |  |
| MEMBERSHIP_KURLY | 멤버십컬리N마트 |  |

**claimDeliveryFeeSupportAmount**integer

클레임배송비지원금액

**exchange** 교환 (2025년 상반기 중 제거 예정. currentClaim 하위의 동일 오브젝트 사용 권장.) (object)

**claimId**string

클레임 번호. 20바이트 내외

**claimDeliveryFeeDemandAmount**integer

교환 배송비 청구액

**claimDeliveryFeePayMeans**string

교환 배송비 결제 수단. 100바이트 내외

**claimDeliveryFeePayMethod**string

교환 배송비 결제 방법. 100바이트 내외

**claimRequestDate**string<date-time>

클레임 요청일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**claimStatus**claimStatus.pay-order-seller (string)

클레임 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| CANCEL_REQUEST | 취소 요청 |  |
| CANCELING | 취소 처리 중 |  |
| CANCEL_DONE | 취소 처리 완료 |  |
| CANCEL_REJECT | 취소 철회 |  |
| RETURN_REQUEST | 반품 요청 |  |
| EXCHANGE_REQUEST | 교환 요청 |  |
| COLLECTING | 수거 처리 중 |  |
| COLLECT_DONE | 수거 완료 |  |
| EXCHANGE_REDELIVERING | 교환 재배송 중 |  |
| RETURN_DONE | 반품 완료 |  |
| EXCHANGE_DONE | 교환 완료 |  |
| RETURN_REJECT | 반품 철회 |  |
| EXCHANGE_REJECT | 교환 철회 |  |
| PURCHASE_DECISION_HOLDBACK | 구매 확정 보류 |  |
| PURCHASE_DECISION_REQUEST | 구매 확정 요청 |  |
| PURCHASE_DECISION_HOLDBACK_RELEASE | 구매 확정 보류 해제 |  |
| ADMIN_CANCELING | 직권 취소 중 |  |
| ADMIN_CANCEL_DONE | 직권 취소 완료 |  |
| ADMIN_CANCEL_REJECT | 직권 취소 철회 |  |

**collectAddress** 구매자 수거지 주소 (object)

**addressType**addressType.pay-order-seller (string)

배송지 타입. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DOMESTIC | 국내 |  |
| FOREIGN | 국외 |  |

**baseAddress**string

기본 주소. 300바이트 내외

**city**string

도시. 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**country**string

국가. 45바이트 내외

**detailedAddress**string

상세 주소. 300바이트 내외

**name**string

이름. 150바이트 내외

**state**string

주(state). 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**tel1**string

연락처 1. 45바이트 내외

**tel2**string

연락처 2. 45바이트 내외

**zipCode**string

우편번호. 45바이트 내외

**isRoadNameAddress**boolean

도로명 주소 여부. 8바이트 내외

**collectCompletedDate**string<date-time>

수거 완료일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

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

**collectDeliveryMethod**deliveryMethod.pay-order-seller (string)

배송 방법 코드. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DELIVERY | 택배, 등기, 소포 |  |
| GDFW_ISSUE_SVC | 굿스플로 송장 출력 |  |
| VISIT_RECEIPT | 방문 수령 |  |
| DIRECT_DELIVERY | 직접 전달 |  |
| QUICK_SVC | 퀵서비스 |  |
| NOTHING | 배송 없음 |  |
| RETURN_DESIGNATED | 지정 반품 택배 |  |
| RETURN_DELIVERY | 일반 반품 택배 |  |
| RETURN_INDIVIDUAL | 직접 반송 |  |
| RETURN_MERCHANT | 판매자 직접 수거(장보기 전용) |  |
| UNKNOWN | 알 수 없음(예외 처리에 사용) |  |

**Example:** `DELIVERY`

**collectStatus**collectStatus.pay-order-seller (string)

수거 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| NOT_REQUESTED | 수거 미요청 |  |
| COLLECT_REQUEST_TO_AGENT | 수거 지시 완료 |  |
| COLLECT_REQUEST_TO_DELIVERY_COMPANY | 수거 요청 |  |
| COLLECT_WAITING | 택배사 수거 예정 |  |
| DELIVERING | 수거 진행 중 |  |
| DELIVERED | 수거 완료 |  |
| DELIVERY_FAILED | 배송 실패 |  |
| COLLECT_FAILED | 수거 실패 |  |
| WRONG_INVOICE | 오류 송장 |  |
| COLLECT_CANCELED | 수거 취소 |  |

**Example:** `NOT_REQUESTED`

**collectTrackingNumber**string

수거 송장 번호. 100바이트 내외

**etcFeeDemandAmount**integer

기타 비용 청구액

**etcFeePayMeans**string

기타 비용 결제 수단. 100바이트 내외

**etcFeePayMethod**string

기타 비용 결제 방법. 100바이트 내외

**exchangeDetailedReason**string

교환 상세 사유. 4000바이트 내외

**exchangeReason**claimReason.pay-order-seller (string)

클레임 요청 사유. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| INTENT_CHANGED | 구매 의사 취소 |  |
| COLOR_AND_SIZE | 색상 및 사이즈 변경 |  |
| WRONG_ORDER | 다른 상품 잘못 주문 |  |
| PRODUCT_UNSATISFIED | 서비스 불만족 |  |
| DELAYED_DELIVERY | 배송 지연 |  |
| SOLD_OUT | 상품 품절 |  |
| DROPPED_DELIVERY | 배송 누락 |  |
| NOT_YET_DELIVERY | 미배송 |  |
| BROKEN | 상품 파손 |  |
| INCORRECT_INFO | 상품 정보 상이 |  |
| WRONG_DELIVERY | 오배송 |  |
| WRONG_OPTION | 색상 등 다른 상품 잘못 배송 |  |
| SIMPLE_INTENT_CHANGED | 단순 변심 |  |
| MISTAKE_ORDER | 주문 실수 |  |
| ETC | 기타 | API 에서 지정 불가 |
| DELAYED_DELIVERY_BY_PURCHASER | 배송 지연 |  |
| INCORRECT_INFO_BY_PURCHASER | 상품 정보 상이 |  |
| PRODUCT_UNSATISFIED_BY_PURCHASER | 서비스 불만족 |  |
| NOT_YET_DISCUSSION | 상호 협의가 완료되지 않은 주문 건 |  |
| OUT_OF_STOCK | 재고 부족으로 인한 판매 불가 |  |
| SALE_INTENT_CHANGED | 판매 의사 변심으로 인한 거부 |  |
| NOT_YET_PAYMENT | 구매자의 미결제로 인한 거부 |  |
| NOT_YET_RECEIVE | 상품 미수취 |  |
| WRONG_DELAYED_DELIVERY | 오배송 및 지연 |  |
| BROKEN_AND_BAD | 파손 및 불량 |  |
| RECEIVING_DUE_DATE_OVER | 수락 기한 만료 |  |
| RECEIVER_MISMATCHED | 수신인 불일치 |  |
| GIFT_INTENT_CHANGED | 보내기 취소 |  |
| GIFT_REFUSAL | 선물 거절 |  |
| MINOR_RESTRICTED | 상품 수신 불가 |  |
| RECEIVING_BLOCKED | 상품 수신 불가 |  |
| UNDER_QUANTITY | 주문 수량 미달 |  |
| ASYNC_FAIL_PAYMENT | 결제 승인 실패 |  |
| ASYNC_LONG_WAIT_PAYMENT | 결제 승인 실패 |  |

**holdbackDetailedReason**string

보류 상세 사유. 4000바이트 내외

**holdbackReason**holdbackReason.pay-order-seller (string)

보류 유형. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| RETURN_DELIVERYFEE | 반품 배송비 청구 |  |
| EXTRAFEEE | 추가 비용 청구 |  |
| RETURN_DELIVERYFEE_AND_EXTRAFEEE | 반품 배송비 + 추가 비용 청구 |  |
| RETURN_PRODUCT_NOT_DELIVERED | 반품 상품 미입고 |  |
| ETC | 기타 사유 |  |
| EXCHANGE_DELIVERYFEE | 교환 배송비 청구 |  |
| EXCHANGE_EXTRAFEE | 추가 교환 비용 청구 |  |
| EXCHANGE_PRODUCT_READY | 교환 상품 준비 중 |  |
| EXCHANGE_PRODUCT_NOT_DELIVERED | 교환 상품 미입고 |  |
| EXCHANGE_HOLDBACK | 교환 구매 확정 보류 |  |
| SELLER_CONFIRM_NEED | 판매자 확인 필요 |  |
| PURCHASER_CONFIRM_NEED | 구매자 확인 필요 |  |
| SELLER_REMIT | 판매자 직접 송금 |  |
| ETC2 | 기타 |  |

**holdbackStatus**holdbackStatus.pay-order-seller (string)

보류 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| HOLDBACK | 보류 중 |  |
| RELEASED | 보류 해제 |  |

**reDeliveryMethod**deliveryMethod.pay-order-seller (string)

배송 방법 코드. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DELIVERY | 택배, 등기, 소포 |  |
| GDFW_ISSUE_SVC | 굿스플로 송장 출력 |  |
| VISIT_RECEIPT | 방문 수령 |  |
| DIRECT_DELIVERY | 직접 전달 |  |
| QUICK_SVC | 퀵서비스 |  |
| NOTHING | 배송 없음 |  |
| RETURN_DESIGNATED | 지정 반품 택배 |  |
| RETURN_DELIVERY | 일반 반품 택배 |  |
| RETURN_INDIVIDUAL | 직접 반송 |  |
| RETURN_MERCHANT | 판매자 직접 수거(장보기 전용) |  |
| UNKNOWN | 알 수 없음(예외 처리에 사용) |  |

**Example:** `DELIVERY`

**reDeliveryStatus**deliveryStatus.pay-order-seller (string)

배송 상세 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| COLLECT_REQUEST | 수거 요청 |  |
| COLLECT_WAIT | 수거 대기 |  |
| COLLECT_CARGO | 집화 |  |
| DELIVERY_COMPLETION | 배송 완료 |  |
| DELIVERING | 배송중 |  |
| DELIVERY_FAIL | 배송 실패 |  |
| WRONG_INVOICE | 오류 송장 |  |
| COLLECT_CARGO_FAIL | 집화 실패 |  |
| COLLECT_CARGO_CANCEL | 집화 취소 |  |
| NOT_TRACKING | 배송 추적 없음 |  |

**Example:** `COLLECT_REQUEST`

**reDeliveryCompany**deliveryCompanyCode.pay-order-seller (string)

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

**reDeliveryTrackingNumber**string

재배송 송장 번호. 100바이트 내외

**reDeliveryAddress** 구매자 재배송지 주소 (object)

**addressType**addressType.pay-order-seller (string)

배송지 타입. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DOMESTIC | 국내 |  |
| FOREIGN | 국외 |  |

**baseAddress**string

기본 주소. 300바이트 내외

**city**string

도시. 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**country**string

국가. 45바이트 내외

**detailedAddress**string

상세 주소. 300바이트 내외

**name**string

이름. 150바이트 내외

**state**string

주(state). 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**tel1**string

연락처 1. 45바이트 내외

**tel2**string

연락처 2. 45바이트 내외

**zipCode**string

우편번호. 45바이트 내외

**isRoadNameAddress**boolean

도로명 주소 여부. 8바이트 내외

**requestChannel**string

접수 채널. 100바이트 내외

**requestQuantity**integer

요청 수량

**returnReceiveAddress** 판매자 교환/반품 수취 주소 (object)

**addressType**addressType.pay-order-seller (string)

배송지 타입. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DOMESTIC | 국내 |  |
| FOREIGN | 국외 |  |

**baseAddress**string

기본 주소. 300바이트 내외

**city**string

도시. 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**country**string

국가. 45바이트 내외

**detailedAddress**string

상세 주소. 300바이트 내외

**name**string

이름. 150바이트 내외

**state**string

주(state). 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**tel1**string

연락처 1. 45바이트 내외

**tel2**string

연락처 2. 45바이트 내외

**zipCode**string

우편번호. 45바이트 내외

**isRoadNameAddress**boolean

도로명 주소 여부. 8바이트 내외

**logisticsCenterId**string

물류센터 ID. 60바이트

**holdbackConfigDate**string<date-time>

보류 설정일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**holdbackConfigurer**string

보류 설정자(구매자/판매자/관리자/시스템). 100바이트 내외

**holdbackReleaseDate**string<date-time>

보류 해제일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**holdbackReleaser**string

보류 해제자(구매자/판매자/관리자/시스템). 100바이트 내외

**claimDeliveryFeeProductOrderIds**string

교환 배송비 묶음 청구 상품 주문 번호(여러 개면 쉼표로 구분). 4000바이트 내외

**reDeliveryOperationDate**string<date-time>

재배송 처리일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**claimDeliveryFeeDiscountAmount**integer

교환 배송비 할인액

**remoteAreaCostChargeAmount**integer

교환 도서산간 배송비

**membershipsArrivalGuaranteeClaimSupportingAmount**integer

멤버십N배송 지원금액

**exchangeImageUrl**string[]

교환이미지 URL

**claimDeliveryFeeSupportType**claimDeliveryFeeSupportType.pay-order-seller (string)

클레임배송비지원타입

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| MEMBERSHIP_ARRIVAL_GUARANTEE | 멤버십도착보장 |  |
| MEMBERSHIP_KURLY | 멤버십컬리N마트 |  |

**claimDeliveryFeeSupportAmount**integer

클레임배송비지원금액

**beforeClaim** beforeClaimResponseContent.pay-order-seller (object)

**exchange** exchangeResponseContent.pay-order-seller (object)

**claimId**string

클레임 번호. 20바이트 내외

**claimDeliveryFeeDemandAmount**integer

교환 배송비 청구액

**claimDeliveryFeePayMeans**string

교환 배송비 결제 수단. 100바이트 내외

**claimDeliveryFeePayMethod**string

교환 배송비 결제 방법. 100바이트 내외

**claimRequestDate**string<date-time>

클레임 요청일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**claimStatus**claimStatus.pay-order-seller (string)

클레임 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| CANCEL_REQUEST | 취소 요청 |  |
| CANCELING | 취소 처리 중 |  |
| CANCEL_DONE | 취소 처리 완료 |  |
| CANCEL_REJECT | 취소 철회 |  |
| RETURN_REQUEST | 반품 요청 |  |
| EXCHANGE_REQUEST | 교환 요청 |  |
| COLLECTING | 수거 처리 중 |  |
| COLLECT_DONE | 수거 완료 |  |
| EXCHANGE_REDELIVERING | 교환 재배송 중 |  |
| RETURN_DONE | 반품 완료 |  |
| EXCHANGE_DONE | 교환 완료 |  |
| RETURN_REJECT | 반품 철회 |  |
| EXCHANGE_REJECT | 교환 철회 |  |
| PURCHASE_DECISION_HOLDBACK | 구매 확정 보류 |  |
| PURCHASE_DECISION_REQUEST | 구매 확정 요청 |  |
| PURCHASE_DECISION_HOLDBACK_RELEASE | 구매 확정 보류 해제 |  |
| ADMIN_CANCELING | 직권 취소 중 |  |
| ADMIN_CANCEL_DONE | 직권 취소 완료 |  |
| ADMIN_CANCEL_REJECT | 직권 취소 철회 |  |

**collectAddress** 구매자 수거지 주소 (object)

**addressType**addressType.pay-order-seller (string)

배송지 타입. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DOMESTIC | 국내 |  |
| FOREIGN | 국외 |  |

**baseAddress**string

기본 주소. 300바이트 내외

**city**string

도시. 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**country**string

국가. 45바이트 내외

**detailedAddress**string

상세 주소. 300바이트 내외

**name**string

이름. 150바이트 내외

**state**string

주(state). 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**tel1**string

연락처 1. 45바이트 내외

**tel2**string

연락처 2. 45바이트 내외

**zipCode**string

우편번호. 45바이트 내외

**isRoadNameAddress**boolean

도로명 주소 여부. 8바이트 내외

**collectCompletedDate**string<date-time>

수거 완료일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

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

**collectDeliveryMethod**deliveryMethod.pay-order-seller (string)

배송 방법 코드. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DELIVERY | 택배, 등기, 소포 |  |
| GDFW_ISSUE_SVC | 굿스플로 송장 출력 |  |
| VISIT_RECEIPT | 방문 수령 |  |
| DIRECT_DELIVERY | 직접 전달 |  |
| QUICK_SVC | 퀵서비스 |  |
| NOTHING | 배송 없음 |  |
| RETURN_DESIGNATED | 지정 반품 택배 |  |
| RETURN_DELIVERY | 일반 반품 택배 |  |
| RETURN_INDIVIDUAL | 직접 반송 |  |
| RETURN_MERCHANT | 판매자 직접 수거(장보기 전용) |  |
| UNKNOWN | 알 수 없음(예외 처리에 사용) |  |

**Example:** `DELIVERY`

**collectStatus**collectStatus.pay-order-seller (string)

수거 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| NOT_REQUESTED | 수거 미요청 |  |
| COLLECT_REQUEST_TO_AGENT | 수거 지시 완료 |  |
| COLLECT_REQUEST_TO_DELIVERY_COMPANY | 수거 요청 |  |
| COLLECT_WAITING | 택배사 수거 예정 |  |
| DELIVERING | 수거 진행 중 |  |
| DELIVERED | 수거 완료 |  |
| DELIVERY_FAILED | 배송 실패 |  |
| COLLECT_FAILED | 수거 실패 |  |
| WRONG_INVOICE | 오류 송장 |  |
| COLLECT_CANCELED | 수거 취소 |  |

**Example:** `NOT_REQUESTED`

**collectTrackingNumber**string

수거 송장 번호. 100바이트 내외

**etcFeeDemandAmount**integer

기타 비용 청구액

**etcFeePayMeans**string

기타 비용 결제 수단. 100바이트 내외

**etcFeePayMethod**string

기타 비용 결제 방법. 100바이트 내외

**exchangeDetailedReason**string

교환 상세 사유. 4000바이트 내외

**exchangeReason**claimReason.pay-order-seller (string)

클레임 요청 사유. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| INTENT_CHANGED | 구매 의사 취소 |  |
| COLOR_AND_SIZE | 색상 및 사이즈 변경 |  |
| WRONG_ORDER | 다른 상품 잘못 주문 |  |
| PRODUCT_UNSATISFIED | 서비스 불만족 |  |
| DELAYED_DELIVERY | 배송 지연 |  |
| SOLD_OUT | 상품 품절 |  |
| DROPPED_DELIVERY | 배송 누락 |  |
| NOT_YET_DELIVERY | 미배송 |  |
| BROKEN | 상품 파손 |  |
| INCORRECT_INFO | 상품 정보 상이 |  |
| WRONG_DELIVERY | 오배송 |  |
| WRONG_OPTION | 색상 등 다른 상품 잘못 배송 |  |
| SIMPLE_INTENT_CHANGED | 단순 변심 |  |
| MISTAKE_ORDER | 주문 실수 |  |
| ETC | 기타 | API 에서 지정 불가 |
| DELAYED_DELIVERY_BY_PURCHASER | 배송 지연 |  |
| INCORRECT_INFO_BY_PURCHASER | 상품 정보 상이 |  |
| PRODUCT_UNSATISFIED_BY_PURCHASER | 서비스 불만족 |  |
| NOT_YET_DISCUSSION | 상호 협의가 완료되지 않은 주문 건 |  |
| OUT_OF_STOCK | 재고 부족으로 인한 판매 불가 |  |
| SALE_INTENT_CHANGED | 판매 의사 변심으로 인한 거부 |  |
| NOT_YET_PAYMENT | 구매자의 미결제로 인한 거부 |  |
| NOT_YET_RECEIVE | 상품 미수취 |  |
| WRONG_DELAYED_DELIVERY | 오배송 및 지연 |  |
| BROKEN_AND_BAD | 파손 및 불량 |  |
| RECEIVING_DUE_DATE_OVER | 수락 기한 만료 |  |
| RECEIVER_MISMATCHED | 수신인 불일치 |  |
| GIFT_INTENT_CHANGED | 보내기 취소 |  |
| GIFT_REFUSAL | 선물 거절 |  |
| MINOR_RESTRICTED | 상품 수신 불가 |  |
| RECEIVING_BLOCKED | 상품 수신 불가 |  |
| UNDER_QUANTITY | 주문 수량 미달 |  |
| ASYNC_FAIL_PAYMENT | 결제 승인 실패 |  |
| ASYNC_LONG_WAIT_PAYMENT | 결제 승인 실패 |  |

**holdbackDetailedReason**string

보류 상세 사유. 4000바이트 내외

**holdbackReason**holdbackReason.pay-order-seller (string)

보류 유형. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| RETURN_DELIVERYFEE | 반품 배송비 청구 |  |
| EXTRAFEEE | 추가 비용 청구 |  |
| RETURN_DELIVERYFEE_AND_EXTRAFEEE | 반품 배송비 + 추가 비용 청구 |  |
| RETURN_PRODUCT_NOT_DELIVERED | 반품 상품 미입고 |  |
| ETC | 기타 사유 |  |
| EXCHANGE_DELIVERYFEE | 교환 배송비 청구 |  |
| EXCHANGE_EXTRAFEE | 추가 교환 비용 청구 |  |
| EXCHANGE_PRODUCT_READY | 교환 상품 준비 중 |  |
| EXCHANGE_PRODUCT_NOT_DELIVERED | 교환 상품 미입고 |  |
| EXCHANGE_HOLDBACK | 교환 구매 확정 보류 |  |
| SELLER_CONFIRM_NEED | 판매자 확인 필요 |  |
| PURCHASER_CONFIRM_NEED | 구매자 확인 필요 |  |
| SELLER_REMIT | 판매자 직접 송금 |  |
| ETC2 | 기타 |  |

**holdbackStatus**holdbackStatus.pay-order-seller (string)

보류 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| HOLDBACK | 보류 중 |  |
| RELEASED | 보류 해제 |  |

**reDeliveryMethod**deliveryMethod.pay-order-seller (string)

배송 방법 코드. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DELIVERY | 택배, 등기, 소포 |  |
| GDFW_ISSUE_SVC | 굿스플로 송장 출력 |  |
| VISIT_RECEIPT | 방문 수령 |  |
| DIRECT_DELIVERY | 직접 전달 |  |
| QUICK_SVC | 퀵서비스 |  |
| NOTHING | 배송 없음 |  |
| RETURN_DESIGNATED | 지정 반품 택배 |  |
| RETURN_DELIVERY | 일반 반품 택배 |  |
| RETURN_INDIVIDUAL | 직접 반송 |  |
| RETURN_MERCHANT | 판매자 직접 수거(장보기 전용) |  |
| UNKNOWN | 알 수 없음(예외 처리에 사용) |  |

**Example:** `DELIVERY`

**reDeliveryStatus**deliveryStatus.pay-order-seller (string)

배송 상세 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| COLLECT_REQUEST | 수거 요청 |  |
| COLLECT_WAIT | 수거 대기 |  |
| COLLECT_CARGO | 집화 |  |
| DELIVERY_COMPLETION | 배송 완료 |  |
| DELIVERING | 배송중 |  |
| DELIVERY_FAIL | 배송 실패 |  |
| WRONG_INVOICE | 오류 송장 |  |
| COLLECT_CARGO_FAIL | 집화 실패 |  |
| COLLECT_CARGO_CANCEL | 집화 취소 |  |
| NOT_TRACKING | 배송 추적 없음 |  |

**Example:** `COLLECT_REQUEST`

**reDeliveryCompany**deliveryCompanyCode.pay-order-seller (string)

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

**reDeliveryTrackingNumber**string

재배송 송장 번호. 100바이트 내외

**reDeliveryAddress** 구매자 재배송지 주소 (object)

**addressType**addressType.pay-order-seller (string)

배송지 타입. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DOMESTIC | 국내 |  |
| FOREIGN | 국외 |  |

**baseAddress**string

기본 주소. 300바이트 내외

**city**string

도시. 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**country**string

국가. 45바이트 내외

**detailedAddress**string

상세 주소. 300바이트 내외

**name**string

이름. 150바이트 내외

**state**string

주(state). 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**tel1**string

연락처 1. 45바이트 내외

**tel2**string

연락처 2. 45바이트 내외

**zipCode**string

우편번호. 45바이트 내외

**isRoadNameAddress**boolean

도로명 주소 여부. 8바이트 내외

**requestChannel**string

접수 채널. 100바이트 내외

**requestQuantity**integer

요청 수량

**returnReceiveAddress** 판매자 교환/반품 수취 주소 (object)

**addressType**addressType.pay-order-seller (string)

배송지 타입. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DOMESTIC | 국내 |  |
| FOREIGN | 국외 |  |

**baseAddress**string

기본 주소. 300바이트 내외

**city**string

도시. 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**country**string

국가. 45바이트 내외

**detailedAddress**string

상세 주소. 300바이트 내외

**name**string

이름. 150바이트 내외

**state**string

주(state). 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**tel1**string

연락처 1. 45바이트 내외

**tel2**string

연락처 2. 45바이트 내외

**zipCode**string

우편번호. 45바이트 내외

**isRoadNameAddress**boolean

도로명 주소 여부. 8바이트 내외

**logisticsCenterId**string

물류센터 ID. 60바이트

**holdbackConfigDate**string<date-time>

보류 설정일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**holdbackConfigurer**string

보류 설정자(구매자/판매자/관리자/시스템). 100바이트 내외

**holdbackReleaseDate**string<date-time>

보류 해제일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**holdbackReleaser**string

보류 해제자(구매자/판매자/관리자/시스템). 100바이트 내외

**claimDeliveryFeeProductOrderIds**string

교환 배송비 묶음 청구 상품 주문 번호(여러 개면 쉼표로 구분). 4000바이트 내외

**reDeliveryOperationDate**string<date-time>

재배송 처리일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**claimDeliveryFeeDiscountAmount**integer

교환 배송비 할인액

**remoteAreaCostChargeAmount**integer

교환 도서산간 배송비

**membershipsArrivalGuaranteeClaimSupportingAmount**integer

멤버십N배송 지원금액

**exchangeImageUrl**string[]

교환이미지 URL

**claimDeliveryFeeSupportType**claimDeliveryFeeSupportType.pay-order-seller (string)

클레임배송비지원타입

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| MEMBERSHIP_ARRIVAL_GUARANTEE | 멤버십도착보장 |  |
| MEMBERSHIP_KURLY | 멤버십컬리N마트 |  |

**claimDeliveryFeeSupportAmount**integer

클레임배송비지원금액

**currentClaim** currentClaimResponseContent.pay-order-seller (object)

**cancel** cancelResponseContent.pay-order-seller (object)

**claimId**string

클레임 번호. 20바이트 내외

**cancelApprovalDate**string<date-time>

취소 승인일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**cancelCompletedDate**string<date-time>

취소 완료일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**cancelDetailedReason**string

취소 상세 사유. 4000바이트 내외

**cancelReason**claimReason.pay-order-seller (string)

클레임 요청 사유. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| INTENT_CHANGED | 구매 의사 취소 |  |
| COLOR_AND_SIZE | 색상 및 사이즈 변경 |  |
| WRONG_ORDER | 다른 상품 잘못 주문 |  |
| PRODUCT_UNSATISFIED | 서비스 불만족 |  |
| DELAYED_DELIVERY | 배송 지연 |  |
| SOLD_OUT | 상품 품절 |  |
| DROPPED_DELIVERY | 배송 누락 |  |
| NOT_YET_DELIVERY | 미배송 |  |
| BROKEN | 상품 파손 |  |
| INCORRECT_INFO | 상품 정보 상이 |  |
| WRONG_DELIVERY | 오배송 |  |
| WRONG_OPTION | 색상 등 다른 상품 잘못 배송 |  |
| SIMPLE_INTENT_CHANGED | 단순 변심 |  |
| MISTAKE_ORDER | 주문 실수 |  |
| ETC | 기타 | API 에서 지정 불가 |
| DELAYED_DELIVERY_BY_PURCHASER | 배송 지연 |  |
| INCORRECT_INFO_BY_PURCHASER | 상품 정보 상이 |  |
| PRODUCT_UNSATISFIED_BY_PURCHASER | 서비스 불만족 |  |
| NOT_YET_DISCUSSION | 상호 협의가 완료되지 않은 주문 건 |  |
| OUT_OF_STOCK | 재고 부족으로 인한 판매 불가 |  |
| SALE_INTENT_CHANGED | 판매 의사 변심으로 인한 거부 |  |
| NOT_YET_PAYMENT | 구매자의 미결제로 인한 거부 |  |
| NOT_YET_RECEIVE | 상품 미수취 |  |
| WRONG_DELAYED_DELIVERY | 오배송 및 지연 |  |
| BROKEN_AND_BAD | 파손 및 불량 |  |
| RECEIVING_DUE_DATE_OVER | 수락 기한 만료 |  |
| RECEIVER_MISMATCHED | 수신인 불일치 |  |
| GIFT_INTENT_CHANGED | 보내기 취소 |  |
| GIFT_REFUSAL | 선물 거절 |  |
| MINOR_RESTRICTED | 상품 수신 불가 |  |
| RECEIVING_BLOCKED | 상품 수신 불가 |  |
| UNDER_QUANTITY | 주문 수량 미달 |  |
| ASYNC_FAIL_PAYMENT | 결제 승인 실패 |  |
| ASYNC_LONG_WAIT_PAYMENT | 결제 승인 실패 |  |

**claimRequestDate**string<date-time>

클레임 요청일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**claimStatus**claimStatus.pay-order-seller (string)

클레임 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| CANCEL_REQUEST | 취소 요청 |  |
| CANCELING | 취소 처리 중 |  |
| CANCEL_DONE | 취소 처리 완료 |  |
| CANCEL_REJECT | 취소 철회 |  |
| RETURN_REQUEST | 반품 요청 |  |
| EXCHANGE_REQUEST | 교환 요청 |  |
| COLLECTING | 수거 처리 중 |  |
| COLLECT_DONE | 수거 완료 |  |
| EXCHANGE_REDELIVERING | 교환 재배송 중 |  |
| RETURN_DONE | 반품 완료 |  |
| EXCHANGE_DONE | 교환 완료 |  |
| RETURN_REJECT | 반품 철회 |  |
| EXCHANGE_REJECT | 교환 철회 |  |
| PURCHASE_DECISION_HOLDBACK | 구매 확정 보류 |  |
| PURCHASE_DECISION_REQUEST | 구매 확정 요청 |  |
| PURCHASE_DECISION_HOLDBACK_RELEASE | 구매 확정 보류 해제 |  |
| ADMIN_CANCELING | 직권 취소 중 |  |
| ADMIN_CANCEL_DONE | 직권 취소 완료 |  |
| ADMIN_CANCEL_REJECT | 직권 취소 철회 |  |

**refundExpectedDate**string<date-time>

환불 예정일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**refundStandbyReason**string

환불 대기 사유. 300바이트 내외

**refundStandbyStatus**string

환불 대기 상태. 100바이트 내외

**requestChannel**string

접수 채널. 100바이트 내외

**requestQuantity**integer

요청 수량

**return** returnResponseContent.pay-order-seller (object)

**claimId**string

클레임 번호. 20바이트 내외

**claimDeliveryFeeDemandAmount**integer

반품 배송비 청구액

**claimDeliveryFeePayMeans**string

반품 배송비 결제 수단. 250바이트 내외

**claimDeliveryFeePayMethod**string

반품 배송비 결제 방법. 250바이트 내외

**claimRequestDate**string<date-time>

클레임 요청일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**claimStatus**claimStatus.pay-order-seller (string)

클레임 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| CANCEL_REQUEST | 취소 요청 |  |
| CANCELING | 취소 처리 중 |  |
| CANCEL_DONE | 취소 처리 완료 |  |
| CANCEL_REJECT | 취소 철회 |  |
| RETURN_REQUEST | 반품 요청 |  |
| EXCHANGE_REQUEST | 교환 요청 |  |
| COLLECTING | 수거 처리 중 |  |
| COLLECT_DONE | 수거 완료 |  |
| EXCHANGE_REDELIVERING | 교환 재배송 중 |  |
| RETURN_DONE | 반품 완료 |  |
| EXCHANGE_DONE | 교환 완료 |  |
| RETURN_REJECT | 반품 철회 |  |
| EXCHANGE_REJECT | 교환 철회 |  |
| PURCHASE_DECISION_HOLDBACK | 구매 확정 보류 |  |
| PURCHASE_DECISION_REQUEST | 구매 확정 요청 |  |
| PURCHASE_DECISION_HOLDBACK_RELEASE | 구매 확정 보류 해제 |  |
| ADMIN_CANCELING | 직권 취소 중 |  |
| ADMIN_CANCEL_DONE | 직권 취소 완료 |  |
| ADMIN_CANCEL_REJECT | 직권 취소 철회 |  |

**collectAddress** 구매자 수거지 주소 (object)

**addressType**addressType.pay-order-seller (string)

배송지 타입. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DOMESTIC | 국내 |  |
| FOREIGN | 국외 |  |

**baseAddress**string

기본 주소. 300바이트 내외

**city**string

도시. 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**country**string

국가. 45바이트 내외

**detailedAddress**string

상세 주소. 300바이트 내외

**name**string

이름. 150바이트 내외

**state**string

주(state). 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**tel1**string

연락처 1. 45바이트 내외

**tel2**string

연락처 2. 45바이트 내외

**zipCode**string

우편번호. 45바이트 내외

**isRoadNameAddress**boolean

도로명 주소 여부. 8바이트 내외

**collectCompletedDate**string<date-time>

수거 완료일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

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

**collectDeliveryMethod**deliveryMethod.pay-order-seller (string)

배송 방법 코드. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DELIVERY | 택배, 등기, 소포 |  |
| GDFW_ISSUE_SVC | 굿스플로 송장 출력 |  |
| VISIT_RECEIPT | 방문 수령 |  |
| DIRECT_DELIVERY | 직접 전달 |  |
| QUICK_SVC | 퀵서비스 |  |
| NOTHING | 배송 없음 |  |
| RETURN_DESIGNATED | 지정 반품 택배 |  |
| RETURN_DELIVERY | 일반 반품 택배 |  |
| RETURN_INDIVIDUAL | 직접 반송 |  |
| RETURN_MERCHANT | 판매자 직접 수거(장보기 전용) |  |
| UNKNOWN | 알 수 없음(예외 처리에 사용) |  |

**Example:** `DELIVERY`

**collectStatus**collectStatus.pay-order-seller (string)

수거 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| NOT_REQUESTED | 수거 미요청 |  |
| COLLECT_REQUEST_TO_AGENT | 수거 지시 완료 |  |
| COLLECT_REQUEST_TO_DELIVERY_COMPANY | 수거 요청 |  |
| COLLECT_WAITING | 택배사 수거 예정 |  |
| DELIVERING | 수거 진행 중 |  |
| DELIVERED | 수거 완료 |  |
| DELIVERY_FAILED | 배송 실패 |  |
| COLLECT_FAILED | 수거 실패 |  |
| WRONG_INVOICE | 오류 송장 |  |
| COLLECT_CANCELED | 수거 취소 |  |

**Example:** `NOT_REQUESTED`

**collectTrackingNumber**string

수거 송장 번호. 100바이트 내외

**etcFeeDemandAmount**integer

기타 비용 청구액

**etcFeePayMeans**string

기타 비용 결제 수단. 250바이트 내외

**etcFeePayMethod**string

기타 비용 결제 방법. 250바이트 내외

**holdbackDetailedReason**string

보류 상세 사유. 4000바이트 내외

**holdbackReason**holdbackReason.pay-order-seller (string)

보류 유형. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| RETURN_DELIVERYFEE | 반품 배송비 청구 |  |
| EXTRAFEEE | 추가 비용 청구 |  |
| RETURN_DELIVERYFEE_AND_EXTRAFEEE | 반품 배송비 + 추가 비용 청구 |  |
| RETURN_PRODUCT_NOT_DELIVERED | 반품 상품 미입고 |  |
| ETC | 기타 사유 |  |
| EXCHANGE_DELIVERYFEE | 교환 배송비 청구 |  |
| EXCHANGE_EXTRAFEE | 추가 교환 비용 청구 |  |
| EXCHANGE_PRODUCT_READY | 교환 상품 준비 중 |  |
| EXCHANGE_PRODUCT_NOT_DELIVERED | 교환 상품 미입고 |  |
| EXCHANGE_HOLDBACK | 교환 구매 확정 보류 |  |
| SELLER_CONFIRM_NEED | 판매자 확인 필요 |  |
| PURCHASER_CONFIRM_NEED | 구매자 확인 필요 |  |
| SELLER_REMIT | 판매자 직접 송금 |  |
| ETC2 | 기타 |  |

**holdbackStatus**holdbackStatus.pay-order-seller (string)

보류 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| HOLDBACK | 보류 중 |  |
| RELEASED | 보류 해제 |  |

**refundExpectedDate**string<date-time>

환불 예정일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**refundStandbyReason**string

환불 대기 사유. 250바이트 내외

**refundStandbyStatus**string

환불 대기 상태. 250바이트 내외

**requestChannel**string

접수 채널. 250바이트 내외

**requestQuantity**integer

요청 수량

**returnDetailedReason**string

반품 상세 사유. 100바이트 내외

**returnReason**claimReason.pay-order-seller (string)

클레임 요청 사유. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| INTENT_CHANGED | 구매 의사 취소 |  |
| COLOR_AND_SIZE | 색상 및 사이즈 변경 |  |
| WRONG_ORDER | 다른 상품 잘못 주문 |  |
| PRODUCT_UNSATISFIED | 서비스 불만족 |  |
| DELAYED_DELIVERY | 배송 지연 |  |
| SOLD_OUT | 상품 품절 |  |
| DROPPED_DELIVERY | 배송 누락 |  |
| NOT_YET_DELIVERY | 미배송 |  |
| BROKEN | 상품 파손 |  |
| INCORRECT_INFO | 상품 정보 상이 |  |
| WRONG_DELIVERY | 오배송 |  |
| WRONG_OPTION | 색상 등 다른 상품 잘못 배송 |  |
| SIMPLE_INTENT_CHANGED | 단순 변심 |  |
| MISTAKE_ORDER | 주문 실수 |  |
| ETC | 기타 | API 에서 지정 불가 |
| DELAYED_DELIVERY_BY_PURCHASER | 배송 지연 |  |
| INCORRECT_INFO_BY_PURCHASER | 상품 정보 상이 |  |
| PRODUCT_UNSATISFIED_BY_PURCHASER | 서비스 불만족 |  |
| NOT_YET_DISCUSSION | 상호 협의가 완료되지 않은 주문 건 |  |
| OUT_OF_STOCK | 재고 부족으로 인한 판매 불가 |  |
| SALE_INTENT_CHANGED | 판매 의사 변심으로 인한 거부 |  |
| NOT_YET_PAYMENT | 구매자의 미결제로 인한 거부 |  |
| NOT_YET_RECEIVE | 상품 미수취 |  |
| WRONG_DELAYED_DELIVERY | 오배송 및 지연 |  |
| BROKEN_AND_BAD | 파손 및 불량 |  |
| RECEIVING_DUE_DATE_OVER | 수락 기한 만료 |  |
| RECEIVER_MISMATCHED | 수신인 불일치 |  |
| GIFT_INTENT_CHANGED | 보내기 취소 |  |
| GIFT_REFUSAL | 선물 거절 |  |
| MINOR_RESTRICTED | 상품 수신 불가 |  |
| RECEIVING_BLOCKED | 상품 수신 불가 |  |
| UNDER_QUANTITY | 주문 수량 미달 |  |
| ASYNC_FAIL_PAYMENT | 결제 승인 실패 |  |
| ASYNC_LONG_WAIT_PAYMENT | 결제 승인 실패 |  |

**returnReceiveAddress** 판매자 교환/반품 수취 주소 (object)

**addressType**addressType.pay-order-seller (string)

배송지 타입. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DOMESTIC | 국내 |  |
| FOREIGN | 국외 |  |

**baseAddress**string

기본 주소. 300바이트 내외

**city**string

도시. 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**country**string

국가. 45바이트 내외

**detailedAddress**string

상세 주소. 300바이트 내외

**name**string

이름. 150바이트 내외

**state**string

주(state). 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**tel1**string

연락처 1. 45바이트 내외

**tel2**string

연락처 2. 45바이트 내외

**zipCode**string

우편번호. 45바이트 내외

**isRoadNameAddress**boolean

도로명 주소 여부. 8바이트 내외

**logisticsCenterId**string

물류센터 ID. 60바이트

**returnCompletedDate**string<date-time>

반품 완료일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**holdbackConfigDate**string<date-time>

보류 설정일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**holdbackConfigurer**string

보류 설정자(구매자/판매자/관리자/시스템). 250바이트 내외

**holdbackReleaseDate**string<date-time>

보류 해제일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**holdbackReleaser**string

보류 해제자(구매자/판매자/관리자/시스템). 250바이트 내외

**claimDeliveryFeeProductOrderIds**string

반품 배송비 묶음 청구 상품 주문 번호(여러 개면 쉼표로 구분). 4000바이트 내외

**claimDeliveryFeeDiscountAmount**integer

반품 배송비 할인액

**remoteAreaCostChargeAmount**integer

반품 도서산간 배송비

**membershipsArrivalGuaranteeClaimSupportingAmount**integer

멤버십N배송 지원금액

**returnImageUrl**string[]

반품이미지 URL

**claimDeliveryFeeSupportType**claimDeliveryFeeSupportType.pay-order-seller (string)

클레임배송비지원타입

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| MEMBERSHIP_ARRIVAL_GUARANTEE | 멤버십도착보장 |  |
| MEMBERSHIP_KURLY | 멤버십컬리N마트 |  |

**claimDeliveryFeeSupportAmount**integer

클레임배송비지원금액

**exchange** exchangeResponseContent.pay-order-seller (object)

**claimId**string

클레임 번호. 20바이트 내외

**claimDeliveryFeeDemandAmount**integer

교환 배송비 청구액

**claimDeliveryFeePayMeans**string

교환 배송비 결제 수단. 100바이트 내외

**claimDeliveryFeePayMethod**string

교환 배송비 결제 방법. 100바이트 내외

**claimRequestDate**string<date-time>

클레임 요청일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**claimStatus**claimStatus.pay-order-seller (string)

클레임 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| CANCEL_REQUEST | 취소 요청 |  |
| CANCELING | 취소 처리 중 |  |
| CANCEL_DONE | 취소 처리 완료 |  |
| CANCEL_REJECT | 취소 철회 |  |
| RETURN_REQUEST | 반품 요청 |  |
| EXCHANGE_REQUEST | 교환 요청 |  |
| COLLECTING | 수거 처리 중 |  |
| COLLECT_DONE | 수거 완료 |  |
| EXCHANGE_REDELIVERING | 교환 재배송 중 |  |
| RETURN_DONE | 반품 완료 |  |
| EXCHANGE_DONE | 교환 완료 |  |
| RETURN_REJECT | 반품 철회 |  |
| EXCHANGE_REJECT | 교환 철회 |  |
| PURCHASE_DECISION_HOLDBACK | 구매 확정 보류 |  |
| PURCHASE_DECISION_REQUEST | 구매 확정 요청 |  |
| PURCHASE_DECISION_HOLDBACK_RELEASE | 구매 확정 보류 해제 |  |
| ADMIN_CANCELING | 직권 취소 중 |  |
| ADMIN_CANCEL_DONE | 직권 취소 완료 |  |
| ADMIN_CANCEL_REJECT | 직권 취소 철회 |  |

**collectAddress** 구매자 수거지 주소 (object)

**addressType**addressType.pay-order-seller (string)

배송지 타입. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DOMESTIC | 국내 |  |
| FOREIGN | 국외 |  |

**baseAddress**string

기본 주소. 300바이트 내외

**city**string

도시. 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**country**string

국가. 45바이트 내외

**detailedAddress**string

상세 주소. 300바이트 내외

**name**string

이름. 150바이트 내외

**state**string

주(state). 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**tel1**string

연락처 1. 45바이트 내외

**tel2**string

연락처 2. 45바이트 내외

**zipCode**string

우편번호. 45바이트 내외

**isRoadNameAddress**boolean

도로명 주소 여부. 8바이트 내외

**collectCompletedDate**string<date-time>

수거 완료일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

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

**collectDeliveryMethod**deliveryMethod.pay-order-seller (string)

배송 방법 코드. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DELIVERY | 택배, 등기, 소포 |  |
| GDFW_ISSUE_SVC | 굿스플로 송장 출력 |  |
| VISIT_RECEIPT | 방문 수령 |  |
| DIRECT_DELIVERY | 직접 전달 |  |
| QUICK_SVC | 퀵서비스 |  |
| NOTHING | 배송 없음 |  |
| RETURN_DESIGNATED | 지정 반품 택배 |  |
| RETURN_DELIVERY | 일반 반품 택배 |  |
| RETURN_INDIVIDUAL | 직접 반송 |  |
| RETURN_MERCHANT | 판매자 직접 수거(장보기 전용) |  |
| UNKNOWN | 알 수 없음(예외 처리에 사용) |  |

**Example:** `DELIVERY`

**collectStatus**collectStatus.pay-order-seller (string)

수거 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| NOT_REQUESTED | 수거 미요청 |  |
| COLLECT_REQUEST_TO_AGENT | 수거 지시 완료 |  |
| COLLECT_REQUEST_TO_DELIVERY_COMPANY | 수거 요청 |  |
| COLLECT_WAITING | 택배사 수거 예정 |  |
| DELIVERING | 수거 진행 중 |  |
| DELIVERED | 수거 완료 |  |
| DELIVERY_FAILED | 배송 실패 |  |
| COLLECT_FAILED | 수거 실패 |  |
| WRONG_INVOICE | 오류 송장 |  |
| COLLECT_CANCELED | 수거 취소 |  |

**Example:** `NOT_REQUESTED`

**collectTrackingNumber**string

수거 송장 번호. 100바이트 내외

**etcFeeDemandAmount**integer

기타 비용 청구액

**etcFeePayMeans**string

기타 비용 결제 수단. 100바이트 내외

**etcFeePayMethod**string

기타 비용 결제 방법. 100바이트 내외

**exchangeDetailedReason**string

교환 상세 사유. 4000바이트 내외

**exchangeReason**claimReason.pay-order-seller (string)

클레임 요청 사유. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| INTENT_CHANGED | 구매 의사 취소 |  |
| COLOR_AND_SIZE | 색상 및 사이즈 변경 |  |
| WRONG_ORDER | 다른 상품 잘못 주문 |  |
| PRODUCT_UNSATISFIED | 서비스 불만족 |  |
| DELAYED_DELIVERY | 배송 지연 |  |
| SOLD_OUT | 상품 품절 |  |
| DROPPED_DELIVERY | 배송 누락 |  |
| NOT_YET_DELIVERY | 미배송 |  |
| BROKEN | 상품 파손 |  |
| INCORRECT_INFO | 상품 정보 상이 |  |
| WRONG_DELIVERY | 오배송 |  |
| WRONG_OPTION | 색상 등 다른 상품 잘못 배송 |  |
| SIMPLE_INTENT_CHANGED | 단순 변심 |  |
| MISTAKE_ORDER | 주문 실수 |  |
| ETC | 기타 | API 에서 지정 불가 |
| DELAYED_DELIVERY_BY_PURCHASER | 배송 지연 |  |
| INCORRECT_INFO_BY_PURCHASER | 상품 정보 상이 |  |
| PRODUCT_UNSATISFIED_BY_PURCHASER | 서비스 불만족 |  |
| NOT_YET_DISCUSSION | 상호 협의가 완료되지 않은 주문 건 |  |
| OUT_OF_STOCK | 재고 부족으로 인한 판매 불가 |  |
| SALE_INTENT_CHANGED | 판매 의사 변심으로 인한 거부 |  |
| NOT_YET_PAYMENT | 구매자의 미결제로 인한 거부 |  |
| NOT_YET_RECEIVE | 상품 미수취 |  |
| WRONG_DELAYED_DELIVERY | 오배송 및 지연 |  |
| BROKEN_AND_BAD | 파손 및 불량 |  |
| RECEIVING_DUE_DATE_OVER | 수락 기한 만료 |  |
| RECEIVER_MISMATCHED | 수신인 불일치 |  |
| GIFT_INTENT_CHANGED | 보내기 취소 |  |
| GIFT_REFUSAL | 선물 거절 |  |
| MINOR_RESTRICTED | 상품 수신 불가 |  |
| RECEIVING_BLOCKED | 상품 수신 불가 |  |
| UNDER_QUANTITY | 주문 수량 미달 |  |
| ASYNC_FAIL_PAYMENT | 결제 승인 실패 |  |
| ASYNC_LONG_WAIT_PAYMENT | 결제 승인 실패 |  |

**holdbackDetailedReason**string

보류 상세 사유. 4000바이트 내외

**holdbackReason**holdbackReason.pay-order-seller (string)

보류 유형. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| RETURN_DELIVERYFEE | 반품 배송비 청구 |  |
| EXTRAFEEE | 추가 비용 청구 |  |
| RETURN_DELIVERYFEE_AND_EXTRAFEEE | 반품 배송비 + 추가 비용 청구 |  |
| RETURN_PRODUCT_NOT_DELIVERED | 반품 상품 미입고 |  |
| ETC | 기타 사유 |  |
| EXCHANGE_DELIVERYFEE | 교환 배송비 청구 |  |
| EXCHANGE_EXTRAFEE | 추가 교환 비용 청구 |  |
| EXCHANGE_PRODUCT_READY | 교환 상품 준비 중 |  |
| EXCHANGE_PRODUCT_NOT_DELIVERED | 교환 상품 미입고 |  |
| EXCHANGE_HOLDBACK | 교환 구매 확정 보류 |  |
| SELLER_CONFIRM_NEED | 판매자 확인 필요 |  |
| PURCHASER_CONFIRM_NEED | 구매자 확인 필요 |  |
| SELLER_REMIT | 판매자 직접 송금 |  |
| ETC2 | 기타 |  |

**holdbackStatus**holdbackStatus.pay-order-seller (string)

보류 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| HOLDBACK | 보류 중 |  |
| RELEASED | 보류 해제 |  |

**reDeliveryMethod**deliveryMethod.pay-order-seller (string)

배송 방법 코드. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DELIVERY | 택배, 등기, 소포 |  |
| GDFW_ISSUE_SVC | 굿스플로 송장 출력 |  |
| VISIT_RECEIPT | 방문 수령 |  |
| DIRECT_DELIVERY | 직접 전달 |  |
| QUICK_SVC | 퀵서비스 |  |
| NOTHING | 배송 없음 |  |
| RETURN_DESIGNATED | 지정 반품 택배 |  |
| RETURN_DELIVERY | 일반 반품 택배 |  |
| RETURN_INDIVIDUAL | 직접 반송 |  |
| RETURN_MERCHANT | 판매자 직접 수거(장보기 전용) |  |
| UNKNOWN | 알 수 없음(예외 처리에 사용) |  |

**Example:** `DELIVERY`

**reDeliveryStatus**deliveryStatus.pay-order-seller (string)

배송 상세 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| COLLECT_REQUEST | 수거 요청 |  |
| COLLECT_WAIT | 수거 대기 |  |
| COLLECT_CARGO | 집화 |  |
| DELIVERY_COMPLETION | 배송 완료 |  |
| DELIVERING | 배송중 |  |
| DELIVERY_FAIL | 배송 실패 |  |
| WRONG_INVOICE | 오류 송장 |  |
| COLLECT_CARGO_FAIL | 집화 실패 |  |
| COLLECT_CARGO_CANCEL | 집화 취소 |  |
| NOT_TRACKING | 배송 추적 없음 |  |

**Example:** `COLLECT_REQUEST`

**reDeliveryCompany**deliveryCompanyCode.pay-order-seller (string)

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

**reDeliveryTrackingNumber**string

재배송 송장 번호. 100바이트 내외

**reDeliveryAddress** 구매자 재배송지 주소 (object)

**addressType**addressType.pay-order-seller (string)

배송지 타입. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DOMESTIC | 국내 |  |
| FOREIGN | 국외 |  |

**baseAddress**string

기본 주소. 300바이트 내외

**city**string

도시. 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**country**string

국가. 45바이트 내외

**detailedAddress**string

상세 주소. 300바이트 내외

**name**string

이름. 150바이트 내외

**state**string

주(state). 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**tel1**string

연락처 1. 45바이트 내외

**tel2**string

연락처 2. 45바이트 내외

**zipCode**string

우편번호. 45바이트 내외

**isRoadNameAddress**boolean

도로명 주소 여부. 8바이트 내외

**requestChannel**string

접수 채널. 100바이트 내외

**requestQuantity**integer

요청 수량

**returnReceiveAddress** 판매자 교환/반품 수취 주소 (object)

**addressType**addressType.pay-order-seller (string)

배송지 타입. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DOMESTIC | 국내 |  |
| FOREIGN | 국외 |  |

**baseAddress**string

기본 주소. 300바이트 내외

**city**string

도시. 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**country**string

국가. 45바이트 내외

**detailedAddress**string

상세 주소. 300바이트 내외

**name**string

이름. 150바이트 내외

**state**string

주(state). 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**tel1**string

연락처 1. 45바이트 내외

**tel2**string

연락처 2. 45바이트 내외

**zipCode**string

우편번호. 45바이트 내외

**isRoadNameAddress**boolean

도로명 주소 여부. 8바이트 내외

**logisticsCenterId**string

물류센터 ID. 60바이트

**holdbackConfigDate**string<date-time>

보류 설정일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**holdbackConfigurer**string

보류 설정자(구매자/판매자/관리자/시스템). 100바이트 내외

**holdbackReleaseDate**string<date-time>

보류 해제일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**holdbackReleaser**string

보류 해제자(구매자/판매자/관리자/시스템). 100바이트 내외

**claimDeliveryFeeProductOrderIds**string

교환 배송비 묶음 청구 상품 주문 번호(여러 개면 쉼표로 구분). 4000바이트 내외

**reDeliveryOperationDate**string<date-time>

재배송 처리일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**claimDeliveryFeeDiscountAmount**integer

교환 배송비 할인액

**remoteAreaCostChargeAmount**integer

교환 도서산간 배송비

**membershipsArrivalGuaranteeClaimSupportingAmount**integer

멤버십N배송 지원금액

**exchangeImageUrl**string[]

교환이미지 URL

**claimDeliveryFeeSupportType**claimDeliveryFeeSupportType.pay-order-seller (string)

클레임배송비지원타입

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| MEMBERSHIP_ARRIVAL_GUARANTEE | 멤버십도착보장 |  |
| MEMBERSHIP_KURLY | 멤버십컬리N마트 |  |

**claimDeliveryFeeSupportAmount**integer

클레임배송비지원금액

**completedClaims** completedClaimResponseContent.pay-order-seller (object)[]

**claimType**claimType.pay-order-seller (string)

클레임 구분. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| CANCEL | 취소 |  |
| RETURN | 반품 |  |
| EXCHANGE | 교환 |  |
| PURCHASE_DECISION_HOLDBACK | 구매 확정 보류 |  |
| ADMIN_CANCEL | 직권 취소 |  |

**claimId**string

클레임 번호. 20바이트 내외

**claimStatus**claimStatus.pay-order-seller (string)

클레임 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| CANCEL_REQUEST | 취소 요청 |  |
| CANCELING | 취소 처리 중 |  |
| CANCEL_DONE | 취소 처리 완료 |  |
| CANCEL_REJECT | 취소 철회 |  |
| RETURN_REQUEST | 반품 요청 |  |
| EXCHANGE_REQUEST | 교환 요청 |  |
| COLLECTING | 수거 처리 중 |  |
| COLLECT_DONE | 수거 완료 |  |
| EXCHANGE_REDELIVERING | 교환 재배송 중 |  |
| RETURN_DONE | 반품 완료 |  |
| EXCHANGE_DONE | 교환 완료 |  |
| RETURN_REJECT | 반품 철회 |  |
| EXCHANGE_REJECT | 교환 철회 |  |
| PURCHASE_DECISION_HOLDBACK | 구매 확정 보류 |  |
| PURCHASE_DECISION_REQUEST | 구매 확정 요청 |  |
| PURCHASE_DECISION_HOLDBACK_RELEASE | 구매 확정 보류 해제 |  |
| ADMIN_CANCELING | 직권 취소 중 |  |
| ADMIN_CANCEL_DONE | 직권 취소 완료 |  |
| ADMIN_CANCEL_REJECT | 직권 취소 철회 |  |

**claimRequestDate**string<date-time>

클레임 요청일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**requestChannel**string

접수 채널. 100바이트 내외

**claimRequestDetailContent**string

클레임 상세 사유. 4000바이트 내외

**claimRequestReason**claimReason.pay-order-seller (string)

클레임 요청 사유. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| INTENT_CHANGED | 구매 의사 취소 |  |
| COLOR_AND_SIZE | 색상 및 사이즈 변경 |  |
| WRONG_ORDER | 다른 상품 잘못 주문 |  |
| PRODUCT_UNSATISFIED | 서비스 불만족 |  |
| DELAYED_DELIVERY | 배송 지연 |  |
| SOLD_OUT | 상품 품절 |  |
| DROPPED_DELIVERY | 배송 누락 |  |
| NOT_YET_DELIVERY | 미배송 |  |
| BROKEN | 상품 파손 |  |
| INCORRECT_INFO | 상품 정보 상이 |  |
| WRONG_DELIVERY | 오배송 |  |
| WRONG_OPTION | 색상 등 다른 상품 잘못 배송 |  |
| SIMPLE_INTENT_CHANGED | 단순 변심 |  |
| MISTAKE_ORDER | 주문 실수 |  |
| ETC | 기타 | API 에서 지정 불가 |
| DELAYED_DELIVERY_BY_PURCHASER | 배송 지연 |  |
| INCORRECT_INFO_BY_PURCHASER | 상품 정보 상이 |  |
| PRODUCT_UNSATISFIED_BY_PURCHASER | 서비스 불만족 |  |
| NOT_YET_DISCUSSION | 상호 협의가 완료되지 않은 주문 건 |  |
| OUT_OF_STOCK | 재고 부족으로 인한 판매 불가 |  |
| SALE_INTENT_CHANGED | 판매 의사 변심으로 인한 거부 |  |
| NOT_YET_PAYMENT | 구매자의 미결제로 인한 거부 |  |
| NOT_YET_RECEIVE | 상품 미수취 |  |
| WRONG_DELAYED_DELIVERY | 오배송 및 지연 |  |
| BROKEN_AND_BAD | 파손 및 불량 |  |
| RECEIVING_DUE_DATE_OVER | 수락 기한 만료 |  |
| RECEIVER_MISMATCHED | 수신인 불일치 |  |
| GIFT_INTENT_CHANGED | 보내기 취소 |  |
| GIFT_REFUSAL | 선물 거절 |  |
| MINOR_RESTRICTED | 상품 수신 불가 |  |
| RECEIVING_BLOCKED | 상품 수신 불가 |  |
| UNDER_QUANTITY | 주문 수량 미달 |  |
| ASYNC_FAIL_PAYMENT | 결제 승인 실패 |  |
| ASYNC_LONG_WAIT_PAYMENT | 결제 승인 실패 |  |

**refundExpectedDate**string<date-time>

환불 예정일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**refundStandbyReason**string

환불 대기 사유. 250바이트 내외

**refundStandbyStatus**string

환불 대기 상태. 250바이트 내외

**requestQuantity**integer

클레임 요청 수량

**claimDeliveryFeeDemandAmount**integer

클레임 배송비 청구액

**claimDeliveryFeePayMeans**string

클레임 배송비 결제 수단. 100바이트 내외

**claimDeliveryFeePayMethod**string

클레임 배송비 결제 방법. 100바이트 내외

**returnReceiveAddress** 판매자 교환/반품 수취 주소 (object)

**addressType**addressType.pay-order-seller (string)

배송지 타입. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DOMESTIC | 국내 |  |
| FOREIGN | 국외 |  |

**baseAddress**string

기본 주소. 300바이트 내외

**city**string

도시. 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**country**string

국가. 45바이트 내외

**detailedAddress**string

상세 주소. 300바이트 내외

**name**string

이름. 150바이트 내외

**state**string

주(state). 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**tel1**string

연락처 1. 45바이트 내외

**tel2**string

연락처 2. 45바이트 내외

**zipCode**string

우편번호. 45바이트 내외

**isRoadNameAddress**boolean

도로명 주소 여부. 8바이트 내외

**logisticsCenterId**string

물류센터 ID. 60바이트

**collectAddress** 구매자 수거지 주소 (object)

**addressType**addressType.pay-order-seller (string)

배송지 타입. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DOMESTIC | 국내 |  |
| FOREIGN | 국외 |  |

**baseAddress**string

기본 주소. 300바이트 내외

**city**string

도시. 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**country**string

국가. 45바이트 내외

**detailedAddress**string

상세 주소. 300바이트 내외

**name**string

이름. 150바이트 내외

**state**string

주(state). 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**tel1**string

연락처 1. 45바이트 내외

**tel2**string

연락처 2. 45바이트 내외

**zipCode**string

우편번호. 45바이트 내외

**isRoadNameAddress**boolean

도로명 주소 여부. 8바이트 내외

**collectCompletedDate**string<date-time>

수거 완료일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

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

**collectDeliveryMethod**deliveryMethod.pay-order-seller (string)

배송 방법 코드. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DELIVERY | 택배, 등기, 소포 |  |
| GDFW_ISSUE_SVC | 굿스플로 송장 출력 |  |
| VISIT_RECEIPT | 방문 수령 |  |
| DIRECT_DELIVERY | 직접 전달 |  |
| QUICK_SVC | 퀵서비스 |  |
| NOTHING | 배송 없음 |  |
| RETURN_DESIGNATED | 지정 반품 택배 |  |
| RETURN_DELIVERY | 일반 반품 택배 |  |
| RETURN_INDIVIDUAL | 직접 반송 |  |
| RETURN_MERCHANT | 판매자 직접 수거(장보기 전용) |  |
| UNKNOWN | 알 수 없음(예외 처리에 사용) |  |

**Example:** `DELIVERY`

**collectStatus**collectStatus.pay-order-seller (string)

수거 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| NOT_REQUESTED | 수거 미요청 |  |
| COLLECT_REQUEST_TO_AGENT | 수거 지시 완료 |  |
| COLLECT_REQUEST_TO_DELIVERY_COMPANY | 수거 요청 |  |
| COLLECT_WAITING | 택배사 수거 예정 |  |
| DELIVERING | 수거 진행 중 |  |
| DELIVERED | 수거 완료 |  |
| DELIVERY_FAILED | 배송 실패 |  |
| COLLECT_FAILED | 수거 실패 |  |
| WRONG_INVOICE | 오류 송장 |  |
| COLLECT_CANCELED | 수거 취소 |  |

**Example:** `NOT_REQUESTED`

**collectTrackingNumber**string

수거 송장 번호. 100바이트 내외

**etcFeeDemandAmount**integer

기타 비용 청구액

**etcFeePayMeans**string

기타 비용 결제 수단. 100바이트 내외

**etcFeePayMethod**string

기타 비용 결제 방법. 100바이트 내외

**holdbackDetailedReason**string

보류 상세 사유. 4000바이트 내외

**holdbackReason**holdbackReason.pay-order-seller (string)

보류 유형. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| RETURN_DELIVERYFEE | 반품 배송비 청구 |  |
| EXTRAFEEE | 추가 비용 청구 |  |
| RETURN_DELIVERYFEE_AND_EXTRAFEEE | 반품 배송비 + 추가 비용 청구 |  |
| RETURN_PRODUCT_NOT_DELIVERED | 반품 상품 미입고 |  |
| ETC | 기타 사유 |  |
| EXCHANGE_DELIVERYFEE | 교환 배송비 청구 |  |
| EXCHANGE_EXTRAFEE | 추가 교환 비용 청구 |  |
| EXCHANGE_PRODUCT_READY | 교환 상품 준비 중 |  |
| EXCHANGE_PRODUCT_NOT_DELIVERED | 교환 상품 미입고 |  |
| EXCHANGE_HOLDBACK | 교환 구매 확정 보류 |  |
| SELLER_CONFIRM_NEED | 판매자 확인 필요 |  |
| PURCHASER_CONFIRM_NEED | 구매자 확인 필요 |  |
| SELLER_REMIT | 판매자 직접 송금 |  |
| ETC2 | 기타 |  |

**holdbackStatus**holdbackStatus.pay-order-seller (string)

보류 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| HOLDBACK | 보류 중 |  |
| RELEASED | 보류 해제 |  |

**holdbackConfigDate**string<date-time>

보류 설정일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**holdbackConfigurer**string

보류 설정자(구매자/판매자/관리자/시스템). 250바이트 내외

**holdbackReleaseDate**string<date-time>

보류 해제일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**holdbackReleaser**string

보류 해제자(구매자/판매자/관리자/시스템). 250바이트 내외

**claimDeliveryFeeProductOrderIds**string

클레임 배송비 묶음 청구 상품 주문 번호(여러 개면 쉼표로 구분). 4000바이트 내외

**claimDeliveryFeeDiscountAmount**integer

반품 배송비 할인액

**remoteAreaCostChargeAmount**integer

반품 도서산간 배송비

**claimCompleteOperationDate**string<date-time>

반품 완료일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**claimRequestAdmissionDate**string<date-time>

클레임 승인일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**collectOperationDate**string

배송 일자. 8바이트 내외

**collectStartTime**string

수거 시작 시간. 8바이트 내외

**collectEndTime**string

수거 종료 시간. 8바이트 내외

**collectSlotId**string

수거 슬롯 ID. 100바이트 내외

**reDeliveryAddress** 구매자 재배송지 주소 (object)

**addressType**addressType.pay-order-seller (string)

배송지 타입. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DOMESTIC | 국내 |  |
| FOREIGN | 국외 |  |

**baseAddress**string

기본 주소. 300바이트 내외

**city**string

도시. 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**country**string

국가. 45바이트 내외

**detailedAddress**string

상세 주소. 300바이트 내외

**name**string

이름. 150바이트 내외

**state**string

주(state). 국내 주소에는 빈 문자열('')을 입력합니다. 300바이트 내외

**tel1**string

연락처 1. 45바이트 내외

**tel2**string

연락처 2. 45바이트 내외

**zipCode**string

우편번호. 45바이트 내외

**isRoadNameAddress**boolean

도로명 주소 여부. 8바이트 내외

**reDeliveryMethod**deliveryMethod.pay-order-seller (string)

배송 방법 코드. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DELIVERY | 택배, 등기, 소포 |  |
| GDFW_ISSUE_SVC | 굿스플로 송장 출력 |  |
| VISIT_RECEIPT | 방문 수령 |  |
| DIRECT_DELIVERY | 직접 전달 |  |
| QUICK_SVC | 퀵서비스 |  |
| NOTHING | 배송 없음 |  |
| RETURN_DESIGNATED | 지정 반품 택배 |  |
| RETURN_DELIVERY | 일반 반품 택배 |  |
| RETURN_INDIVIDUAL | 직접 반송 |  |
| RETURN_MERCHANT | 판매자 직접 수거(장보기 전용) |  |
| UNKNOWN | 알 수 없음(예외 처리에 사용) |  |

**Example:** `DELIVERY`

**reDeliveryStatus**deliveryStatus.pay-order-seller (string)

배송 상세 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| COLLECT_REQUEST | 수거 요청 |  |
| COLLECT_WAIT | 수거 대기 |  |
| COLLECT_CARGO | 집화 |  |
| DELIVERY_COMPLETION | 배송 완료 |  |
| DELIVERING | 배송중 |  |
| DELIVERY_FAIL | 배송 실패 |  |
| WRONG_INVOICE | 오류 송장 |  |
| COLLECT_CARGO_FAIL | 집화 실패 |  |
| COLLECT_CARGO_CANCEL | 집화 취소 |  |
| NOT_TRACKING | 배송 추적 없음 |  |

**Example:** `COLLECT_REQUEST`

**reDeliveryCompany**deliveryCompanyCode.pay-order-seller (string)

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

**reDeliveryTrackingNumber**string

재배송 송장 번호. 100바이트 내외

**reDeliveryOperationDate**string<date-time>

재배송 처리일. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**membershipsArrivalGuaranteeClaimSupportingAmount**integer

멤버십N배송 지원금액

**claimDeliveryFeeSupportType**claimDeliveryFeeSupportType.pay-order-seller (string)

클레임배송비지원타입

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| MEMBERSHIP_ARRIVAL_GUARANTEE | 멤버십도착보장 |  |
| MEMBERSHIP_KURLY | 멤버십컬리N마트 |  |

**claimDeliveryFeeSupportAmount**integer

클레임배송비지원금액

**delivery** deliveryResponseContent.pay-order-seller (object)

**deliveredDate**string<date-time>

배송 완료 일시. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**deliveryCompany**deliveryCompanyCode.pay-order-seller (string)

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

**deliveryMethod**deliveryMethod.pay-order-seller (string)

배송 방법 코드. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| DELIVERY | 택배, 등기, 소포 |  |
| GDFW_ISSUE_SVC | 굿스플로 송장 출력 |  |
| VISIT_RECEIPT | 방문 수령 |  |
| DIRECT_DELIVERY | 직접 전달 |  |
| QUICK_SVC | 퀵서비스 |  |
| NOTHING | 배송 없음 |  |
| RETURN_DESIGNATED | 지정 반품 택배 |  |
| RETURN_DELIVERY | 일반 반품 택배 |  |
| RETURN_INDIVIDUAL | 직접 반송 |  |
| RETURN_MERCHANT | 판매자 직접 수거(장보기 전용) |  |
| UNKNOWN | 알 수 없음(예외 처리에 사용) |  |

**Example:** `DELIVERY`

**deliveryStatus**deliveryStatus.pay-order-seller (string)

배송 상세 상태. 250바이트 내외

| 코드 | 설명 | 비고 |
| --- | --- | --- |
| COLLECT_REQUEST | 수거 요청 |  |
| COLLECT_WAIT | 수거 대기 |  |
| COLLECT_CARGO | 집화 |  |
| DELIVERY_COMPLETION | 배송 완료 |  |
| DELIVERING | 배송중 |  |
| DELIVERY_FAIL | 배송 실패 |  |
| WRONG_INVOICE | 오류 송장 |  |
| COLLECT_CARGO_FAIL | 집화 실패 |  |
| COLLECT_CARGO_CANCEL | 집화 취소 |  |
| NOT_TRACKING | 배송 추적 없음 |  |

**Example:** `COLLECT_REQUEST`

**isWrongTrackingNumber**boolean

오류 송장 여부. true는 송장에 오류가 있음을 의미합니다. 8바이트 내외

**pickupDate**string<date-time>

집화 일시. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**sendDate**string<date-time>

발송 일시. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**trackingNumber**string

송장 번호. 100바이트 내외

**wrongTrackingNumberRegisteredDate**string<date-time>

오류 송장 등록 일시. 45바이트 내외

**Example:** `2023-01-16T17:14:51.794+09:00`

**wrongTrackingNumberType**string

오류 사유. 300바이트 내외

```json
{
  "timestamp": "2023-01-16T17:14:51.794+09:00",
  "traceId": "string",
  "data": [
    {
      "order": {
        "chargeAmountPaymentAmount": 0,
        "checkoutAccumulationPaymentAmount": 0,
        "generalPaymentAmount": 0,
        "naverMileagePaymentAmount": 0,
        "orderDate": "2023-01-16T17:14:51.794+09:00",
        "orderDiscountAmount": 0,
        "orderId": "string",
        "ordererId": "string",
        "ordererName": "string",
        "ordererTel": "string",
        "paymentDate": "2023-01-16T17:14:51.794+09:00",
        "paymentDueDate": "2023-01-16T17:14:51.794+09:00",
        "paymentMeans": "string",
        "isDeliveryMemoParticularInput": "string",
        "payLocationType": "string",
        "ordererNo": "string",
        "payLaterPaymentAmount": 0,
        "isMembershipSubscribed": true
      },
      "productOrder": {
        "claimStatus": "string",
        "claimType": "string",
        "decisionDate": "2023-01-16T17:14:51.794+09:00",
        "delayedDispatchDetailedReason": "string",
        "delayedDispatchReason": "PRODUCT_PREPARE",
        "deliveryDiscountAmount": 0,
        "deliveryFeeAmount": 0,
        "deliveryPolicyType": "string",
        "expectedDeliveryMethod": "DELIVERY",
        "freeGift": "string",
        "mallId": "string",
        "optionCode": "string",
        "optionPrice": 0,
        "packageNumber": "string",
        "placeOrderDate": "2023-01-16T17:14:51.794+09:00",
        "placeOrderStatus": "string",
        "productClass": "string",
        "productDiscountAmount": 0,
        "initialProductDiscountAmount": 0,
        "remainProductDiscountAmount": 0,
        "groupProductId": 0,
        "productId": "string",
        "originalProductId": "string",
        "merchantChannelId": "string",
        "productName": "string",
        "productOption": "string",
        "productOrderId": "string",
        "productOrderStatus": "string",
        "quantity": 0,
        "initialQuantity": 0,
        "remainQuantity": 0,
        "sectionDeliveryFee": 0,
        "sellerProductCode": "string",
        "shippingAddress": {
          "addressType": "string",
          "baseAddress": "string",
          "city": "string",
          "country": "string",
          "detailedAddress": "string",
          "name": "string",
          "state": "string",
          "tel1": "string",
          "tel2": "string",
          "zipCode": "string",
          "isRoadNameAddress": true,
          "pickupLocationType": "FRONT_OF_DOOR",
          "pickupLocationContent": "string",
          "entryMethod": "LOBBY_PW",
          "entryMethodContent": "string",
          "buildingManagementNo": "string",
          "longitude": "string",
          "latitude": "string"
        },
        "shippingStartDate": "2023-01-16T17:14:51.794+09:00",
        "shippingDueDate": "2023-01-16T17:14:51.794+09:00",
        "shippingFeeType": "string",
        "shippingMemo": "string",
        "takingAddress": {
          "addressType": "string",
          "baseAddress": "string",
          "city": "string",
          "country": "string",
          "detailedAddress": "string",
          "name": "string",
          "state": "string",
          "tel1": "string",
          "tel2": "string",
          "zipCode": "string",
          "isRoadNameAddress": true
        },
        "totalPaymentAmount": 0,
        "initialPaymentAmount": 0,
        "remainPaymentAmount": 0,
        "totalProductAmount": 0,
        "initialProductAmount": 0,
        "remainProductAmount": 0,
        "unitPrice": 0,
        "sellerBurdenDiscountAmount": 0,
        "commissionRatingType": "string",
        "commissionPrePayStatus": "string",
        "paymentCommission": 0,
        "saleCommission": 0,
        "expectedSettlementAmount": 0,
        "inflowPath": "string",
        "inflowPathAdd": "string",
        "itemNo": "string",
        "optionManageCode": "string",
        "sellerCustomCode1": "string",
        "sellerCustomCode2": "string",
        "claimId": "string",
        "channelCommission": 0,
        "individualCustomUniqueCode": "string",
        "productImediateDiscountAmount": 0,
        "initialProductImmediateDiscountAmount": 0,
        "remainProductImmediateDiscountAmount": 0,
        "productProductDiscountAmount": 0,
        "initialProductProductDiscountAmount": 0,
        "remainProductProductDiscountAmount": 0,
        "productMultiplePurchaseDiscountAmount": 0,
        "sellerBurdenImediateDiscountAmount": 0,
        "initialSellerBurdenImmediateDiscountAmount": 0,
        "remainSellerBurdenImmediateDiscountAmount": 0,
        "sellerBurdenProductDiscountAmount": 0,
        "initialSellerBurdenProductDiscountAmount": 0,
        "remainSellerBurdenProductDiscountAmount": 0,
        "sellerBurdenMultiplePurchaseDiscountAmount": 0,
        "knowledgeShoppingSellingInterlockCommission": 0,
        "giftReceivingStatus": "string",
        "sellerBurdenStoreDiscountAmount": 0,
        "sellerBurdenMultiplePurchaseDiscountType": "IGNORE_QUANTITY",
        "logisticsCompanyId": "string",
        "logisticsCenterId": "string",
        "skuMappings": [
          {
            "nsId": "string",
            "nsBarcode": "string",
            "pickingQuantityPerOrder": 0
          }
        ],
        "hopeDelivery": {
          "region": "string",
          "additionalFee": 0,
          "hopeDeliveryYmd": "string",
          "hopeDeliveryHm": "string",
          "changeReason": "string",
          "changer": "string"
        },
        "deliveryAttributeType": "string",
        "expectedDeliveryCompany": "string",
        "arrivalGuaranteeDate": "2023-01-16T17:14:51.794+09:00",
        "deliveryTagType": "string",
        "taxType": "string",
        "storageType": "string",
        "logisticsDirectContracted": true,
        "appliedCoupons": [
          {
            "couponPublishNumber": "string",
            "couponClassCode": "string",
            "couponDiscountAmount": 0,
            "naverBurdenRatio": 0
          }
        ],
        "appliedCardPromotion": {
          "promotionName": "string",
          "cardCompanyName": "string",
          "promotionApplyAmount": 0,
          "brandCompanyBurdenRatio": 0
        }
      },
      "cancel": {
        "claimId": "string",
        "cancelApprovalDate": "2023-01-16T17:14:51.794+09:00",
        "cancelCompletedDate": "2023-01-16T17:14:51.794+09:00",
        "cancelDetailedReason": "string",
        "cancelReason": "string",
        "claimRequestDate": "2023-01-16T17:14:51.794+09:00",
        "claimStatus": "string",
        "refundExpectedDate": "2023-01-16T17:14:51.794+09:00",
        "refundStandbyReason": "string",
        "refundStandbyStatus": "string",
        "requestChannel": "string",
        "requestQuantity": 0
      },
      "return": {
        "claimId": "string",
        "claimDeliveryFeeDemandAmount": 0,
        "claimDeliveryFeePayMeans": "string",
        "claimDeliveryFeePayMethod": "string",
        "claimRequestDate": "2023-01-16T17:14:51.794+09:00",
        "claimStatus": "string",
        "collectAddress": {
          "addressType": "string",
          "baseAddress": "string",
          "city": "string",
          "country": "string",
          "detailedAddress": "string",
          "name": "string",
          "state": "string",
          "tel1": "string",
          "tel2": "string",
          "zipCode": "string",
          "isRoadNameAddress": true
        },
        "collectCompletedDate": "2023-01-16T17:14:51.794+09:00",
        "collectDeliveryCompany": "string",
        "collectDeliveryMethod": "DELIVERY",
        "collectStatus": "NOT_REQUESTED",
        "collectTrackingNumber": "string",
        "etcFeeDemandAmount": 0,
        "etcFeePayMeans": "string",
        "etcFeePayMethod": "string",
        "holdbackDetailedReason": "string",
        "holdbackReason": "string",
        "holdbackStatus": "string",
        "refundExpectedDate": "2023-01-16T17:14:51.794+09:00",
        "refundStandbyReason": "string",
        "refundStandbyStatus": "string",
        "requestChannel": "string",
        "requestQuantity": 0,
        "returnDetailedReason": "string",
        "returnReason": "string",
        "returnReceiveAddress": {
          "addressType": "string",
          "baseAddress": "string",
          "city": "string",
          "country": "string",
          "detailedAddress": "string",
          "name": "string",
          "state": "string",
          "tel1": "string",
          "tel2": "string",
          "zipCode": "string",
          "isRoadNameAddress": true,
          "logisticsCenterId": "string"
        },
        "returnCompletedDate": "2023-01-16T17:14:51.794+09:00",
        "holdbackConfigDate": "2023-01-16T17:14:51.794+09:00",
        "holdbackConfigurer": "string",
        "holdbackReleaseDate": "2023-01-16T17:14:51.794+09:00",
        "holdbackReleaser": "string",
        "claimDeliveryFeeProductOrderIds": "string",
        "claimDeliveryFeeDiscountAmount": 0,
        "remoteAreaCostChargeAmount": 0,
        "membershipsArrivalGuaranteeClaimSupportingAmount": 0,
        "returnImageUrl": [
          "string"
        ],
        "claimDeliveryFeeSupportType": "string",
        "claimDeliveryFeeSupportAmount": 0
      },
      "exchange": {
        "claimId": "string",
        "claimDeliveryFeeDemandAmount": 0,
        "claimDeliveryFeePayMeans": "string",
        "claimDeliveryFeePayMethod": "string",
        "claimRequestDate": "2023-01-16T17:14:51.794+09:00",
        "claimStatus": "string",
        "collectAddress": {
          "addressType": "string",
          "baseAddress": "string",
          "city": "string",
          "country": "string",
          "detailedAddress": "string",
          "name": "string",
          "state": "string",
          "tel1": "string",
          "tel2": "string",
          "zipCode": "string",
          "isRoadNameAddress": true
        },
        "collectCompletedDate": "2023-01-16T17:14:51.794+09:00",
        "collectDeliveryCompany": "string",
        "collectDeliveryMethod": "DELIVERY",
        "collectStatus": "NOT_REQUESTED",
        "collectTrackingNumber": "string",
        "etcFeeDemandAmount": 0,
        "etcFeePayMeans": "string",
        "etcFeePayMethod": "string",
        "exchangeDetailedReason": "string",
        "exchangeReason": "string",
        "holdbackDetailedReason": "string",
        "holdbackReason": "string",
        "holdbackStatus": "string",
        "reDeliveryMethod": "DELIVERY",
        "reDeliveryStatus": "COLLECT_REQUEST",
        "reDeliveryCompany": "string",
        "reDeliveryTrackingNumber": "string",
        "reDeliveryAddress": {
          "addressType": "string",
          "baseAddress": "string",
          "city": "string",
          "country": "string",
          "detailedAddress": "string",
          "name": "string",
          "state": "string",
          "tel1": "string",
          "tel2": "string",
          "zipCode": "string",
          "isRoadNameAddress": true
        },
        "requestChannel": "string",
        "requestQuantity": 0,
        "returnReceiveAddress": {
          "addressType": "string",
          "baseAddress": "string",
          "city": "string",
          "country": "string",
          "detailedAddress": "string",
          "name": "string",
          "state": "string",
          "tel1": "string",
          "tel2": "string",
          "zipCode": "string",
          "isRoadNameAddress": true,
          "logisticsCenterId": "string"
        },
        "holdbackConfigDate": "2023-01-16T17:14:51.794+09:00",
        "holdbackConfigurer": "string",
        "holdbackReleaseDate": "2023-01-16T17:14:51.794+09:00",
        "holdbackReleaser": "string",
        "claimDeliveryFeeProductOrderIds": "string",
        "reDeliveryOperationDate": "2023-01-16T17:14:51.794+09:00",
        "claimDeliveryFeeDiscountAmount": 0,
        "remoteAreaCostChargeAmount": 0,
        "membershipsArrivalGuaranteeClaimSupportingAmount": 0,
        "exchangeImageUrl": [
          "string"
        ],
        "claimDeliveryFeeSupportType": "string",
        "claimDeliveryFeeSupportAmount": 0
      },
      "beforeClaim": {
        "exchange": {
          "claimId": "string",
          "claimDeliveryFeeDemandAmount": 0,
          "claimDeliveryFeePayMeans": "string",
          "claimDeliveryFeePayMethod": "string",
          "claimRequestDate": "2023-01-16T17:14:51.794+09:00",
          "claimStatus": "string",
          "collectAddress": {
            "addressType": "string",
            "baseAddress": "string",
            "city": "string",
            "country": "string",
            "detailedAddress": "string",
            "name": "string",
            "state": "string",
            "tel1": "string",
            "tel2": "string",
            "zipCode": "string",
            "isRoadNameAddress": true
          },
          "collectCompletedDate": "2023-01-16T17:14:51.794+09:00",
          "collectDeliveryCompany": "string",
          "collectDeliveryMethod": "DELIVERY",
          "collectStatus": "NOT_REQUESTED",
          "collectTrackingNumber": "string",
          "etcFeeDemandAmount": 0,
          "etcFeePayMeans": "string",
          "etcFeePayMethod": "string",
          "exchangeDetailedReason": "string",
          "exchangeReason": "string",
          "holdbackDetailedReason": "string",
          "holdbackReason": "string",
          "holdbackStatus": "string",
          "reDeliveryMethod": "DELIVERY",
          "reDeliveryStatus": "COLLECT_REQUEST",
          "reDeliveryCompany": "string",
          "reDeliveryTrackingNumber": "string",
          "reDeliveryAddress": {
            "addressType": "string",
            "baseAddress": "string",
            "city": "string",
            "country": "string",
            "detailedAddress": "string",
            "name": "string",
            "state": "string",
            "tel1": "string",
            "tel2": "string",
            "zipCode": "string",
            "isRoadNameAddress": true
          },
          "requestChannel": "string",
          "requestQuantity": 0,
          "returnReceiveAddress": {
            "addressType": "string",
            "baseAddress": "string",
            "city": "string",
            "country": "string",
            "detailedAddress": "string",
            "name": "string",
            "state": "string",
            "tel1": "string",
            "tel2": "string",
            "zipCode": "string",
            "isRoadNameAddress": true,
            "logisticsCenterId": "string"
          },
          "holdbackConfigDate": "2023-01-16T17:14:51.794+09:00",
          "holdbackConfigurer": "string",
          "holdbackReleaseDate": "2023-01-16T17:14:51.794+09:00",
          "holdbackReleaser": "string",
          "claimDeliveryFeeProductOrderIds": "string",
          "reDeliveryOperationDate": "2023-01-16T17:14:51.794+09:00",
          "claimDeliveryFeeDiscountAmount": 0,
          "remoteAreaCostChargeAmount": 0,
          "membershipsArrivalGuaranteeClaimSupportingAmount": 0,
          "exchangeImageUrl": [
            "string"
          ],
          "claimDeliveryFeeSupportType": "string",
          "claimDeliveryFeeSupportAmount": 0
        }
      },
      "currentClaim": {
        "cancel": {
          "claimId": "string",
          "cancelApprovalDate": "2023-01-16T17:14:51.794+09:00",
          "cancelCompletedDate": "2023-01-16T17:14:51.794+09:00",
          "cancelDetailedReason": "string",
          "cancelReason": "string",
          "claimRequestDate": "2023-01-16T17:14:51.794+09:00",
          "claimStatus": "string",
          "refundExpectedDate": "2023-01-16T17:14:51.794+09:00",
          "refundStandbyReason": "string",
          "refundStandbyStatus": "string",
          "requestChannel": "string",
          "requestQuantity": 0
        },
        "return": {
          "claimId": "string",
          "claimDeliveryFeeDemandAmount": 0,
          "claimDeliveryFeePayMeans": "string",
          "claimDeliveryFeePayMethod": "string",
          "claimRequestDate": "2023-01-16T17:14:51.794+09:00",
          "claimStatus": "string",
          "collectAddress": {
            "addressType": "string",
            "baseAddress": "string",
            "city": "string",
            "country": "string",
            "detailedAddress": "string",
            "name": "string",
            "state": "string",
            "tel1": "string",
            "tel2": "string",
            "zipCode": "string",
            "isRoadNameAddress": true
          },
          "collectCompletedDate": "2023-01-16T17:14:51.794+09:00",
          "collectDeliveryCompany": "string",
          "collectDeliveryMethod": "DELIVERY",
          "collectStatus": "NOT_REQUESTED",
          "collectTrackingNumber": "string",
          "etcFeeDemandAmount": 0,
          "etcFeePayMeans": "string",
          "etcFeePayMethod": "string",
          "holdbackDetailedReason": "string",
          "holdbackReason": "string",
          "holdbackStatus": "string",
          "refundExpectedDate": "2023-01-16T17:14:51.794+09:00",
          "refundStandbyReason": "string",
          "refundStandbyStatus": "string",
          "requestChannel": "string",
          "requestQuantity": 0,
          "returnDetailedReason": "string",
          "returnReason": "string",
          "returnReceiveAddress": {
            "addressType": "string",
            "baseAddress": "string",
            "city": "string",
            "country": "string",
            "detailedAddress": "string",
            "name": "string",
            "state": "string",
            "tel1": "string",
            "tel2": "string",
            "zipCode": "string",
            "isRoadNameAddress": true,
            "logisticsCenterId": "string"
          },
          "returnCompletedDate": "2023-01-16T17:14:51.794+09:00",
          "holdbackConfigDate": "2023-01-16T17:14:51.794+09:00",
          "holdbackConfigurer": "string",
          "holdbackReleaseDate": "2023-01-16T17:14:51.794+09:00",
          "holdbackReleaser": "string",
          "claimDeliveryFeeProductOrderIds": "string",
          "claimDeliveryFeeDiscountAmount": 0,
          "remoteAreaCostChargeAmount": 0,
          "membershipsArrivalGuaranteeClaimSupportingAmount": 0,
          "returnImageUrl": [
            "string"
          ],
          "claimDeliveryFeeSupportType": "string",
          "claimDeliveryFeeSupportAmount": 0
        },
        "exchange": {
          "claimId": "string",
          "claimDeliveryFeeDemandAmount": 0,
          "claimDeliveryFeePayMeans": "string",
          "claimDeliveryFeePayMethod": "string",
          "claimRequestDate": "2023-01-16T17:14:51.794+09:00",
          "claimStatus": "string",
          "collectAddress": {
            "addressType": "string",
            "baseAddress": "string",
            "city": "string",
            "country": "string",
            "detailedAddress": "string",
            "name": "string",
            "state": "string",
            "tel1": "string",
            "tel2": "string",
            "zipCode": "string",
            "isRoadNameAddress": true
          },
          "collectCompletedDate": "2023-01-16T17:14:51.794+09:00",
          "collectDeliveryCompany": "string",
          "collectDeliveryMethod": "DELIVERY",
          "collectStatus": "NOT_REQUESTED",
          "collectTrackingNumber": "string",
          "etcFeeDemandAmount": 0,
          "etcFeePayMeans": "string",
          "etcFeePayMethod": "string",
          "exchangeDetailedReason": "string",
          "exchangeReason": "string",
          "holdbackDetailedReason": "string",
          "holdbackReason": "string",
          "holdbackStatus": "string",
          "reDeliveryMethod": "DELIVERY",
          "reDeliveryStatus": "COLLECT_REQUEST",
          "reDeliveryCompany": "string",
          "reDeliveryTrackingNumber": "string",
          "reDeliveryAddress": {
            "addressType": "string",
            "baseAddress": "string",
            "city": "string",
            "country": "string",
            "detailedAddress": "string",
            "name": "string",
            "state": "string",
            "tel1": "string",
            "tel2": "string",
            "zipCode": "string",
            "isRoadNameAddress": true
          },
          "requestChannel": "string",
          "requestQuantity": 0,
          "returnReceiveAddress": {
            "addressType": "string",
            "baseAddress": "string",
            "city": "string",
            "country": "string",
            "detailedAddress": "string",
            "name": "string",
            "state": "string",
            "tel1": "string",
            "tel2": "string",
            "zipCode": "string",
            "isRoadNameAddress": true,
            "logisticsCenterId": "string"
          },
          "holdbackConfigDate": "2023-01-16T17:14:51.794+09:00",
          "holdbackConfigurer": "string",
          "holdbackReleaseDate": "2023-01-16T17:14:51.794+09:00",
          "holdbackReleaser": "string",
          "claimDeliveryFeeProductOrderIds": "string",
          "reDeliveryOperationDate": "2023-01-16T17:14:51.794+09:00",
          "claimDeliveryFeeDiscountAmount": 0,
          "remoteAreaCostChargeAmount": 0,
          "membershipsArrivalGuaranteeClaimSupportingAmount": 0,
          "exchangeImageUrl": [
            "string"
          ],
          "claimDeliveryFeeSupportType": "string",
          "claimDeliveryFeeSupportAmount": 0
        }
      },
      "completedClaims": [
        {
          "claimType": "string",
          "claimId": "string",
          "claimStatus": "string",
          "claimRequestDate": "2023-01-16T17:14:51.794+09:00",
          "requestChannel": "string",
          "claimRequestDetailContent": "string",
          "claimRequestReason": "string",
          "refundExpectedDate": "2023-01-16T17:14:51.794+09:00",
          "refundStandbyReason": "string",
          "refundStandbyStatus": "string",
          "requestQuantity": 0,
          "claimDeliveryFeeDemandAmount": 0,
          "claimDeliveryFeePayMeans": "string",
          "claimDeliveryFeePayMethod": "string",
          "returnReceiveAddress": {
            "addressType": "string",
            "baseAddress": "string",
            "city": "string",
            "country": "string",
            "detailedAddress": "string",
            "name": "string",
            "state": "string",
            "tel1": "string",
            "tel2": "string",
            "zipCode": "string",
            "isRoadNameAddress": true,
            "logisticsCenterId": "string"
          },
          "collectAddress": {
            "addressType": "string",
            "baseAddress": "string",
            "city": "string",
            "country": "string",
            "detailedAddress": "string",
            "name": "string",
            "state": "string",
            "tel1": "string",
            "tel2": "string",
            "zipCode": "string",
            "isRoadNameAddress": true
          },
          "collectCompletedDate": "2023-01-16T17:14:51.794+09:00",
          "collectDeliveryCompany": "string",
          "collectDeliveryMethod": "DELIVERY",
          "collectStatus": "NOT_REQUESTED",
          "collectTrackingNumber": "string",
          "etcFeeDemandAmount": 0,
          "etcFeePayMeans": "string",
          "etcFeePayMethod": "string",
          "holdbackDetailedReason": "string",
          "holdbackReason": "string",
          "holdbackStatus": "string",
          "holdbackConfigDate": "2023-01-16T17:14:51.794+09:00",
          "holdbackConfigurer": "string",
          "holdbackReleaseDate": "2023-01-16T17:14:51.794+09:00",
          "holdbackReleaser": "string",
          "claimDeliveryFeeProductOrderIds": "string",
          "claimDeliveryFeeDiscountAmount": 0,
          "remoteAreaCostChargeAmount": 0,
          "claimCompleteOperationDate": "2023-01-16T17:14:51.794+09:00",
          "claimRequestAdmissionDate": "2023-01-16T17:14:51.794+09:00",
          "collectOperationDate": "string",
          "collectStartTime": "string",
          "collectEndTime": "string",
          "collectSlotId": "string",
          "reDeliveryAddress": {
            "addressType": "string",
            "baseAddress": "string",
            "city": "string",
            "country": "string",
            "detailedAddress": "string",
            "name": "string",
            "state": "string",
            "tel1": "string",
            "tel2": "string",
            "zipCode": "string",
            "isRoadNameAddress": true
          },
          "reDeliveryMethod": "DELIVERY",
          "reDeliveryStatus": "COLLECT_REQUEST",
          "reDeliveryCompany": "string",
          "reDeliveryTrackingNumber": "string",
          "reDeliveryOperationDate": "2023-01-16T17:14:51.794+09:00",
          "membershipsArrivalGuaranteeClaimSupportingAmount": 0,
          "claimDeliveryFeeSupportType": "string",
          "claimDeliveryFeeSupportAmount": 0
        }
      ],
      "delivery": {
        "deliveredDate": "2023-01-16T17:14:51.794+09:00",
        "deliveryCompany": "string",
        "deliveryMethod": "DELIVERY",
        "deliveryStatus": "COLLECT_REQUEST",
        "isWrongTrackingNumber": true,
        "pickupDate": "2023-01-16T17:14:51.794+09:00",
        "sendDate": "2023-01-16T17:14:51.794+09:00",
        "trackingNumber": "string",
        "wrongTrackingNumberRegisteredDate": "2023-01-16T17:14:51.794+09:00",
        "wrongTrackingNumberType": "string"
      }
    }
  ]
}
```

(실패) 잘못된 요청

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
curl -L 'https://api.commerce.naver.com/external/v1/pay-order/seller/product-orders/query' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{
  "productOrderIds": [
    "string"
  ],
  "quantityClaimCompatibility": true
}'
```




https://api.commerce.naver.com/external



Body required

- Example (from schema)

```json
{
  "productOrderIds": [
    "string"
  ],
  "quantityClaimCompatibility": true
}
```
