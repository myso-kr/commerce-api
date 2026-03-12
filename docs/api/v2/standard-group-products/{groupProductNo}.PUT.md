---
doc-id: "v2-standard-group-products-groupProductNo-put"
title: "(v2) 그룹상품 수정"
description: "비동기로 동작합니다. 요청 결과는 그룹상품 요청 결과 조회 API로 확인할 수 있습니다."
type: api-endpoint
method: PUT
path: /v2/standard-group-products/{groupProductNo}
base-url: https://api.commerce.naver.com/external
category: 기타
tags:
  - put
  - reference
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/update-product-product
---

# (v2) 그룹상품 수정



```
> **PUT** `https://api.commerce.naver.com/external/v2/standard-group-products/{groupProductNo}`
```

비동기로 동작합니다. 요청 결과는 그룹상품 요청 결과 조회 API로 확인할 수 있습니다.

## Request

**PUT** `/v2/standard-group-products/{groupProductNo}`
### Path Parameters

**groupProductNo** integer<int64>required

그룹상품번호

### Body**required**

**groupProduct** 그룹상품 (object)required

그룹상품 정보

**leafCategoryId**리프 카테고리 ID (string)required

상품 등록 및 수정 시 필수입니다.상품 수정 시 카테고리 수정이 가능하며, 특정 조건이 충족되는 카테고리로만 수정할 수 있습니다. 가이드 파일에서 카테고리 수정 가능 조건을 확인해 주세요.
카테고리 수정 시 변경할 카테고리 기준으로 판매옵션 정보를 조회하여 변경할 카테고리에서 허용하는 판매옵션 가이드 ID와 판매옵션 정보를 입력해 주세요.

**name**그룹상품명 (string)required

그룹상품에 공통으로 사용될 명칭으로, 판매 옵션별 상품명의 경우 그룹상품명+판매 옵션값명 조합으로 생성됩니다.

**guideId**판매 옵션 가이드 ID (integer<int64>)required

판매 옵션 가이드(판매 옵션의 조합)의 ID를 입력합니다. 카테고리에서 사용 가능한 판매 옵션 가이드는 카테고리별 판매 옵션 정보 조회 API로 확인할 수 있으며, 카테고리에서 허용하지 않는 가이드 ID는 사용할 수 없습니다.
카테고리를 수정하는 경우 수정할 카테고리에서 허용하는 가이드 ID를 입력해 주세요.
수정 가능 조건 : 그룹상품에 속한 판매옵션 중, 하나라도 등록 완료일 30일 이내이거나, 카테고리 수정일 30일 이내인 경우 수정 가능합니다.
(31일째부터 수정 실패)

**brandName**브랜드명 (string)

**brandId**브랜드 ID (integer<int64>)

**manufacturerName**제조사명 (string)

**itselfProductionProductYn**자체 제작 상품 여부 (boolean)

미입력 시 false로 저장됩니다.

**taxType**부가가치세 타입 코드 (string)

네이버 상품 API에서 부가가치세의 타입을 나타내기 위해 사용하는 코드입니다. 미입력 시 TAX(과세 상품)로 등록됩니다.

- TAX(과세 상품), DUTYFREE(면세 상품), SMALL(영세 상품)

**Possible values:** [`TAX`, `DUTYFREE`, `SMALL`]

**customsTaxType**관부가세 타입 코드 (string)

관부가세 타입을 나타내기 위해 사용하는 코드입니다.

- NOT_APPLICABLE(부과 대상 아님), INCLUDED(관부가세 포함), EXCLUDED(관부가세 미포함)

**Possible values:** [`NOT_APPLICABLE`, `INCLUDED`, `EXCLUDED`]

**saleType**상품 판매 유형 코드 (string)

상품 API에서 상품의 판매 유형을 나타내기 위해 사용하는 코드입니다. 미입력 시 NEW(새 상품)로 등록됩니다.

- NEW(새 상품), OLD(중고 상품)

**Possible values:** [`NEW`, `OLD`]

**minorPurchasable**미성년자 구매 가능 여부 (boolean)required

성인 카테고리인 경우 불가능으로 입력해야 합니다.

**brandCertificationYn**브랜드 인증 여부 (boolean)

**productInfoProvidedNotice** 상품정보제공고시 (object)required

상품 요약 정보

- 상품 등록 및 수정 시 필수

**productInfoProvidedNoticeType**상품정보제공고시 상품군 유형 (string)required

상품 요약 정보를 나타내는 타입입니다. 하위 요소 중 하나를 선택해서 입력해야 하며 입력한 타입의 필드 정보가 등록됩니다.

- WEAR(의류 상품 요약 정보, wear 필드에 정보 입력)
- SHOES(구두/신발 상품 요약 정보, shoes 필드에 정보 입력)
- BAG(가방 상품 요약 정보, bag 필드에 정보 입력)
- FASHION_ITEMS(패션잡화(모자/벨트/액세서리) 상품 요약 정보, fashionItems 필드에 정보 입력)
- SLEEPING_GEAR(침구류/커튼 상품 요약 정보, sleepingGear 필드에 정보 입력)
- FURNITURE(가구(침대/소파/싱크대/DIY제품) 상품 요약 정보, furniture 필드에 정보 입력)
- IMAGE_APPLIANCES(영상가전(TV류) 상품 요약 정보, imageAppliances 필드에 정보 입력)
- HOME_APPLIANCES(가정용 전기제품(냉장고/세탁기/식기세척기/전자레인지) 상품 요약 정보, homeAppliances 필드에 정보 입력)
- SEASON_APPLIANCES(계절가전(에어컨/온풍기) 상품 요약 정보, seasonAppliances 필드에 정보 입력)
- OFFICE_APPLIANCES(사무용기기(컴퓨터/노트북/프린터) 상품 요약 정보, officeAppliances 필드에 정보 입력)
- OPTICS_APPLIANCES(광학기기(디지털카메라/캠코더) 상품 요약 정보, opticsAppliances 필드에 정보 입력)
- MICROELECTRONICS(소형전자(MP3/전자사전 등) 상품 요약 정보, microElectronics 필드에 정보 입력)
- NAVIGATION(내비게이션 상품 요약 정보, navigation 필드에 정보 입력)
- CAR_ARTICLES(자동차용품(자동차부품/기타 자동차용품) 상품 요약 정보, carArticles 필드에 정보 입력)
- MEDICAL_APPLIANCES(의료기기 상품 요약 정보, medicalAppliances 필드에 정보 입력)
- KITCHEN_UTENSILS(주방용품 상품 요약 정보, kitchenUtensils 필드에 정보 입력)
- COSMETIC(화장품 상품 요약 정보, cosmetic 필드에 정보 입력)
- JEWELLERY(귀금속/보석/시계류 상품 요약 정보, jewellery 필드에 정보 입력)
- FOOD(식품(농ㆍ축ㆍ수산물) 상품 요약 정보, food 필드에 정보 입력)
- GENERAL_FOOD(가공식품 상품 요약 정보, generalFood 필드에 정보 입력)
- DIET_FOOD(건강기능식품 상품 요약 정보, dietFood 필드에 정보 입력)
- KIDS(영유아용품 상품 요약 정보, kids 필드에 정보 입력)
- MUSICAL_INSTRUMENT(악기 상품 요약 정보, musicalInstrument 필드에 정보 입력)
- SPORTS_EQUIPMENT(스포츠용품 상품 요약 정보), sportsEquipment 필드에 정보 입력
- BOOKS(서적 상품 요약 정보, books 필드에 정보 입력)
- RENTAL_ETC(물품대여 서비스(서적, 유아용품, 행사용품 등) 상품 요약 정보, rentalEtc 필드에 정보 입력)
- RENTAL_HA(물품대여 서비스(정수기,비데,공기청정기 등) 상품 요약 정보, rentalHa 필드에 정보 입력)
- DIGITAL_CONTENTS(디지털 콘텐츠(음원, 게임, 인터넷강의 등) 상품 요약 정보, digitalContents 필드에 정보 입력)
- GIFT_CARD(상품권/쿠폰 상품 요약 정보, giftCard 필드에 정보 입력)
- MOBILE_COUPON(모바일 쿠폰 상품 요약 정보, mobileCoupon 필드에 정보 입력)
- MOVIE_SHOW(영화/공연 상품 요약 정보, movieShow 필드에 정보 입력)
- ETC_SERVICE(기타 용역 상품 요약 정보, etcService 필드에 정보 입력)
- BIOCHEMISTRY(생활화학제품 요약 정보, biochemistry 필드에 정보 입력)
- BIOCIDAL(살생물제품 요약 정보, biocidal 필드에 정보 입력)
- CELLPHONE(휴대폰 요약 정보, cellPhone 필드에 정보 입력)
- ETC(기타 상품 요약 정보, etc 필드에 정보 입력)

**Possible values:** [`WEAR`, `SHOES`, `BAG`, `FASHION_ITEMS`, `SLEEPING_GEAR`, `FURNITURE`, `IMAGE_APPLIANCES`, `HOME_APPLIANCES`, `SEASON_APPLIANCES`, `OFFICE_APPLIANCES`, `OPTICS_APPLIANCES`, `MICROELECTRONICS`, `CELLPHONE`, `NAVIGATION`, `CAR_ARTICLES`, `MEDICAL_APPLIANCES`, `KITCHEN_UTENSILS`, `COSMETIC`, `JEWELLERY`, `FOOD`, `GENERAL_FOOD`, `DIET_FOOD`, `KIDS`, `MUSICAL_INSTRUMENT`, `SPORTS_EQUIPMENT`, `BOOKS`, `LODGMENT_RESERVATION`, `TRAVEL_PACKAGE`, `AIRLINE_TICKET`, `RENT_CAR`, `RENTAL_HA`, `RENTAL_ETC`, `DIGITAL_CONTENTS`, `GIFT_CARD`, `MOBILE_COUPON`, `MOVIE_SHOW`, `ETC_SERVICE`, `BIOCHEMISTRY`, `BIOCIDAL`, `ETC`]

**wear** 의류 상품정보제공고시 (object)

의류 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**material**제품 소재 (string)required

섬유의 조성 또는 혼용율을 백분율로 표시, 기능성인 경우 성적서 또는 허가서

**Possible values:** `<= 1500 characters`

**color**색상 (string)required

**Possible values:** `<= 200 characters`

**size**치수 (string)required

**Possible values:** `<= 200 characters`

**manufacturer**제조자(사) (string)required

**Possible values:** `<= 200 characters`

**caution**세탁 방법 및 취급 시 주의사항 (string)required

**Possible values:** `<= 1500 characters`

**packDate**제조연월 (string<'yyyy-MM' 형식 입력>)

**Possible values:** `<= 300 characters`

**packDateText**제조연월 직접 입력 (string<packDate를 입력하지 않은 경우에는 필수>)

**Possible values:** `<= 300 characters`

**warrantyPolicy**품질 보증 기준 (string)required

**Possible values:** `<= 1500 characters`

**afterServiceDirector**A/S 책임자와 전화번호 (string)required

**Possible values:** `<= 200 characters`

**shoes** 구두/신발 상품정보제공고시 (object)

구두/신발 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**material**제품의 주 소재 (string)required

운동화인 경우에는 겉감, 안감을 구분하여 표시

**Possible values:** `<= 1500 characters`

**color**색상 (string)required

**Possible values:** `<= 200 characters`

**size**발길이 (string)required

해외사이즈 표기 시 국내사이즈 병행 표기(단위: mm)

**Possible values:** `<= 200 characters`

**height**굽높이 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

굽 재료를 사용하는 여성화에 한함(단위: cm)

**Possible values:** `<= 200 characters`

**manufacturer**제조자(사) (string)required

**Possible values:** `<= 200 characters`

**caution**취급 시 주의사항 (string)required

**Possible values:** `<= 1500 characters`

**warrantyPolicy**품질 보증 기준 (string)required

**Possible values:** `<= 1500 characters`

**afterServiceDirector**A/S 책임자와 전화번호 (string)required

**Possible values:** `<= 200 characters`

**bag** 가방 상품정보제공고시 (object)

가방 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**type**종류 (string)required

**Possible values:** `<= 200 characters`

**material**소재 (string)required

**Possible values:** `<= 1500 characters`

**color**색상 (string)required

**Possible values:** `<= 200 characters`

**size**크기 (string)required

**Possible values:** `<= 200 characters`

**manufacturer**제조자 (string)required

**Possible values:** `<= 200 characters`

**caution**취급 시 주의사항 (string)required

**Possible values:** `<= 1500 characters`

**warrantyPolicy**품질 보증 기준 (string)required

**Possible values:** `<= 1500 characters`

**afterServiceDirector**A/S 책임자와 전화번호 (string)required

**Possible values:** `<= 200 characters`

**fashionItems** 패션잡화(모자/벨트/액세서리) 상품정보제공고시 (object)

패션잡화(모자/벨트/액세서리) 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**type**종류 (string)required

**Possible values:** `<= 200 characters`

**material**소재 (string)required

**Possible values:** `<= 1500 characters`

**size**치수 (string)required

**Possible values:** `<= 200 characters`

**manufacturer**제조자(사) (string)required

**Possible values:** `<= 200 characters`

**caution**취급 시 주의사항 (string)required

**Possible values:** `<= 1500 characters`

**warrantyPolicy**품질 보증 기준 (string)required

**Possible values:** `<= 1500 characters`

**afterServiceDirector**A/S 책임자와 전화번호 (string)required

**Possible values:** `<= 200 characters`

**sleepingGear** 침구류/커튼 상품정보제공고시 (object)

침구류/커튼 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**material**제품 소재 (string)required

섬유의 조성 또는 혼용율을 백분율로 표시, 충전재를 사용한 제품은 충전재를 함께 표기

**Possible values:** `<= 1500 characters`

**color**색상 (string)required

**Possible values:** `<= 200 characters`

**size**치수 (string)required

**Possible values:** `<= 200 characters`

**components**제품 구성 (string)required

**Possible values:** `<= 1000 characters`

**manufacturer**제조자(사) (string)required

**Possible values:** `<= 200 characters`

**caution**세탁 방법 및 취급 시 주의사항 (string)required

**Possible values:** `<= 1500 characters`

**warrantyPolicy**품질 보증 기준 (string)required

**Possible values:** `<= 1500 characters`

**afterServiceDirector**A/S 책임자와 전화번호 (string)required

**Possible values:** `<= 200 characters`

**furniture** 가구(침대/소파/싱크대/DIY제품) 상품정보제공고시 (object)

가구(침대/소파/싱크대/DIY제품) 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**itemName**품명 (string)required

**Possible values:** `<= 50 characters`

**certificationType**KC 인증정보 (string)required

｢전기용품 및 생활용품 안전관리법｣에 따른 공급자적합성확인대상제품에 한함

**Possible values:** `<= 200 characters`

**color**색상 (string)required

**Possible values:** `<= 200 characters`

**components**구성품 (string)required

**Possible values:** `<= 500 characters`

**material**주요 소재 (string)required

**Possible values:** `<= 500 characters`

**manufacturer**제조자(사) (string)required

구성품별 제조자(사)가 다른 경우 각 구성품의 제조자(사)

**Possible values:** `<= 200 characters`

**importer**수입자 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

수입품의 경우 수입자를 함께 표시. 구성품별 제조자가 다른 경우 각 구성품의 수입자

**Possible values:** `<= 200 characters`

**producer**제조국 (string)required

구성품별 제조국이 다른 경우 각 구성품의 제조국

**Possible values:** `<= 200 characters`

**size**크기 (string)required

**Possible values:** `<= 200 characters`

**installedCharge**배송 설치 비용 (string)required

**Possible values:** `<= 200 characters`

**warrantyPolicy**품질 보증 기준 (string)required

**Possible values:** `<= 1500 characters`

**refurb**재공급 사유 및 하자 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

재공급(리퍼브) 가구의 경우 재공급 사유 및 하자 부위 표시(예: 전시 상품으로 식탁 상판 등에 미세한 흠집 있음)

**Possible values:** `<= 200 characters`

**afterServiceDirector**A/S 책임자와 전화번호 (string)required

**Possible values:** `<= 200 characters`

**imageAppliances** 영상가전(TV류) 상품정보제공고시 (object)

영상가전(TV류) 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**itemName**품명 (string)required

**Possible values:** `<= 50 characters`

**modelName**모델명 (string)required

**Possible values:** `<= 50 characters`

**certificationType**KC 인증정보 (string)required

｢전기용품 및 생활용품 안전관리법｣에 따른 안전인증·안전확인·공급자적합성확인대상 제품 및 ｢전파법｣에 따른 적합인증·적합등록 대상 기자재에 한함

**Possible values:** `<= 200 characters`

**ratedVoltage**정격전압 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

**Possible values:** `<= 200 characters`

**powerConsumption**소비전력 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

**Possible values:** `<= 200 characters`

**energyEfficiencyRating**에너지소비효율등급 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

｢에너지이용 합리화법｣에 따른 에너지소비효율등급 표시대상 기자재에 한함

**Possible values:** `<= 200 characters`

**releaseDate**동일 모델의 출시연월 (string<'yyyy-MM' 형식 입력>)

**Possible values:** `<= 300 characters`

**releaseDateText**동일 모델 출시연월일 직접 입력 (string<releaseDate를 입력하지 않은 경우에는 필수>)

**Possible values:** `<= 300 characters`

**manufacturer**제조자(사) (string)required

**Possible values:** `<= 200 characters`

**size**크기, 형태 (string)required

**Possible values:** `<= 200 characters`

**additionalCost**추가 설치 비용 (string)required

**Possible values:** `<= 200 characters`

**displaySpecification**화면 사양 (string)required

화면 크기, 해상도, 화면 비율 등

**Possible values:** `<= 200 characters`

**warrantyPolicy**품질 보증 기준 (string)required

**Possible values:** `<= 1500 characters`

**afterServiceDirector**A/S 책임자와 전화번호 (string)required

**Possible values:** `<= 200 characters`

**homeAppliances** 가정용 전기제품(냉장고/세탁기/식기세척기/전자레인지) 상품정보제공고시 (object)

가정용 전기제품(냉장고/세탁기/식기세척기/전자레인지) 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**itemName**품명 (string)required

**Possible values:** `<= 50 characters`

**modelName**모델명 (string)required

**Possible values:** `<= 50 characters`

**certificationType**KC 인증정보 (string)required

｢전기용품 및 생활용품 안전관리법｣에 따른 안전인증·안전확인·공급자적합성확인대상 제품 및 ｢전파법｣에 따른 적합인증·적합등록 대상 기자재에 한함

**Possible values:** `<= 200 characters`

**ratedVoltage**정격전압 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

**Possible values:** `<= 200 characters`

**powerConsumption**소비전력 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

**Possible values:** `<= 200 characters`

**energyEfficiencyRating**에너지소비효율등급 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

｢에너지이용 합리화법｣에 따른 에너지소비효율등급 표시대상 기자재에 한함

**Possible values:** `<= 200 characters`

**releaseDate**동일 모델의 출시연월 (string<'yyyy-MM' 형식 입력>)

**Possible values:** `<= 300 characters`

**releaseDateText**동일 모델 출시연월일 직접 입력 (string<releaseDate를 입력하지 않은 경우에는 필수>)

**Possible values:** `<= 300 characters`

**manufacturer**제조자(사) (string)required

**Possible values:** `<= 200 characters`

**size**크기, 용량, 형태 (string)required

**Possible values:** `<= 200 characters`

**additionalCost**추가 설치 비용 (string)required

**Possible values:** `<= 200 characters`

**warrantyPolicy**품질 보증 기준 (string)required

**Possible values:** `<= 1500 characters`

**afterServiceDirector**A/S 책임자와 전화번호 (string)required

**Possible values:** `<= 200 characters`

**seasonAppliances** 계절가전(에어컨/온풍기) 상품정보제공고시 (object)

계절가전(에어컨/온풍기) 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**itemName**품명 (string)required

**Possible values:** `<= 50 characters`

**modelName**모델명 (string)required

**Possible values:** `<= 50 characters`

**certificationType**KC 인증정보 (string)required

｢전기용품 및 생활용품 안전관리법｣에 따른 안전인증·안전확인·공급자적합성확인대상 제품 및 ｢전파법｣에 따른 적합인증·적합등록 대상 기자재에 한함

**Possible values:** `<= 200 characters`

**ratedVoltage**정격전압 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

**Possible values:** `<= 200 characters`

**powerConsumption**소비전력 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

**Possible values:** `<= 200 characters`

**energyEfficiencyRating**에너지소비효율등급 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

｢에너지이용 합리화법｣에 따른 에너지소비효율등급 표시대상 기자재에 한함

**Possible values:** `<= 200 characters`

**releaseDate** 동일 모델의 출시연월 (object<'yyyy-MM' 형식 입력>)

**Possible values:** `<= 300 characters`

**year**integer<int32>

**month**string

**Possible values:** [`JANUARY`, `FEBRUARY`, `MARCH`, `APRIL`, `MAY`, `JUNE`, `JULY`, `AUGUST`, `SEPTEMBER`, `OCTOBER`, `NOVEMBER`, `DECEMBER`]

**monthValue**integer<int32>

**leapYear**boolean

**releaseDateText**동일 모델 출시연월 직접 입력 (string<releaseDate를 입력하지 않은 경우에는 필수>)

**Possible values:** `<= 300 characters`

**manufacturer**제조자(사) (string)required

**Possible values:** `<= 200 characters`

**size**크기, 형태 (string)required

실외기 포함

**Possible values:** `<= 200 characters`

**area**냉난방 면적 (string)required

**Possible values:** `<= 200 characters`

**installedCharge**추가 설치 비용 (string)required

**Possible values:** `<= 500 characters`

**warrantyPolicy**품질 보증 기준 (string)required

**Possible values:** `<= 1500 characters`

**afterServiceDirector**A/S 책임자와 전화번호 (string)required

**Possible values:** `<= 200 characters`

**officeAppliances** 사무용기기(컴퓨터/노트북/프린터) 상품정보제공고시 (object)

사무용기기(컴퓨터/노트북/프린터) 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**itemName**품명 (string)required

**Possible values:** `<= 50 characters`

**modelName**모델명 (string)required

**Possible values:** `<= 50 characters`

**certificationType**KC 인증정보 (string)required

｢전기용품 및 생활용품 안전관리법｣에 따른 안전인증·안전확인·공급자적합성확인대상 제품 및 ｢전파법｣에 따른 적합인증·적합등록 대상 기자재에 한함

**Possible values:** `<= 200 characters`

**ratedVoltage**정격전압 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

**Possible values:** `<= 200 characters`

**powerConsumption**소비전력 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

**Possible values:** `<= 200 characters`

**energyEfficiencyRating**에너지소비효율등급 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

｢에너지이용 합리화법｣에 따른 에너지소비효율등급 표시대상 기자재에 한함

**Possible values:** `<= 200 characters`

**releaseDate** 동일 모델의 출시연월 (object<'yyyy-MM' 형식 입력>)

**Possible values:** `<= 300 characters`

**year**integer<int32>

**month**string

**Possible values:** [`JANUARY`, `FEBRUARY`, `MARCH`, `APRIL`, `MAY`, `JUNE`, `JULY`, `AUGUST`, `SEPTEMBER`, `OCTOBER`, `NOVEMBER`, `DECEMBER`]

**monthValue**integer<int32>

**leapYear**boolean

**releaseDateText**동일 모델 출시연월 직접 입력 (string<releaseDate를 입력하지 않은 경우에는 필수>)

**Possible values:** `<= 300 characters`

**manufacturer**제조자(사) (string)required

**Possible values:** `<= 200 characters`

**size**크기 (string)required

**Possible values:** `<= 200 characters`

**weight**무게 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

무게는 노트북 등 휴대형 기기에 한함

**Possible values:** `<= 200 characters`

**specification**주요 사양 (string)required

컴퓨터와 노트북의 경우 성능, 용량, 운영체제 포함 여부 등. 프린터의 경우 인쇄 속도 등.

**Possible values:** `<= 1500 characters`

**warrantyPolicy**품질 보증 기준 (string)required

**Possible values:** `<= 1500 characters`

**afterServiceDirector**A/S 책임자와 전화번호 (string)required

**Possible values:** `<= 200 characters`

**opticsAppliances** 광학기기(디지털카메라/캠코더) 상품정보제공고시 (object)

광학기기(디지털카메라/캠코더) 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**itemName**품명 (string)required

**Possible values:** `<= 50 characters`

**modelName**모델명 (string)required

**Possible values:** `<= 50 characters`

**certificationType**KC 인증정보 (string)required

｢전기용품 및 생활용품 안전관리법｣에 따른 안전인증·안전확인·공급자적합성확인대상 제품 및 ｢전파법｣에 따른 적합인증·적합등록 대상 기자재에 한함

**Possible values:** `<= 200 characters`

**releaseDate**동일 모델의 출시연월 (string<'yyyy-MM' 형식 입력>)

**Possible values:** `<= 300 characters`

**releaseDateText**동일 모델 출시연월 직접 입력 (string<releaseDate를 입력하지 않은 경우에는 필수>)

**Possible values:** `<= 300 characters`

**manufacturer**제조자(사) (string)required

**Possible values:** `<= 200 characters`

**size**크기 (string)required

**Possible values:** `<= 200 characters`

**weight**무게 (string)required

**Possible values:** `<= 200 characters`

**specification**주요 사양 (string)required

컴퓨터와 노트북의 경우 성능, 용량, 운영체제 포함 여부 등. 프린터의 경우 인쇄 속도 등.

**Possible values:** `<= 1500 characters`

**warrantyPolicy**품질 보증 기준 (string)required

**Possible values:** `<= 1500 characters`

**afterServiceDirector**A/S 책임자와 전화번호 (string)required

**Possible values:** `<= 200 characters`

**microElectronics** 소형전자(MP3/전자사전 등) 상품정보제공고시 (object)

소형전자(MP3/전자사전 등) 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**itemName**품명 (string)required

**Possible values:** `<= 50 characters`

**modelName**모델명 (string)required

**Possible values:** `<= 50 characters`

**certificationType**KC 인증정보 (string)required

｢전기용품 및 생활용품 안전관리법｣에 따른 안전인증·안전확인·공급자적합성확인대상 제품 및 ｢전파법｣에 따른 적합인증·적합등록 대상 기자재에 한함

**Possible values:** `<= 200 characters`

**ratedVoltage**정격전압 (string)required

**Possible values:** `<= 200 characters`

**powerConsumption**소비전력 (string)required

**Possible values:** `<= 200 characters`

**releaseDate**출시연월 (string<'yyyy-MM' 형식 입력>)

**Possible values:** `<= 300 characters`

**releaseDateText**동일 모델 출시연월 직접 입력 (string<releaseDate를 입력하지 않은 경우에는 필수>)

**Possible values:** `<= 300 characters`

**manufacturer**제조자(사) (string)required

**Possible values:** `<= 200 characters`

**size**크기 (string)required

**Possible values:** `<= 200 characters`

**weight**무게 (string)required

**Possible values:** `<= 200 characters`

**specification**주요 사양 (string)required

**Possible values:** `<= 1500 characters`

**warrantyPolicy**품질 보증 기준 (string)required

**Possible values:** `<= 1500 characters`

**afterServiceDirector**A/S 책임자와 전화번호 (string)required

**Possible values:** `<= 200 characters`

**navigation** 내비게이션 상품정보제공고시 (object)

내비게이션 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**itemName**품명 (string)required

**Possible values:** `<= 50 characters`

**modelName**모델명 (string)required

**Possible values:** `<= 50 characters`

**certificationType**KC 인증정보 (string)required

｢전기용품 및 생활용품 안전관리법｣에따른 안전인증·안전확인·공급자적합성확인대상 제품 및 ｢전파법｣에 따른 적합인증·적합등록 대상 기자재에 한함

**Possible values:** `<= 200 characters`

**ratedVoltage**정격전압 (string)required

**Possible values:** `<= 200 characters`

**powerConsumption**소비전력 (string)required

**Possible values:** `<= 200 characters`

**releaseDate**동일 모델의 출시연월 (string<'yyyy-MM' 형식 입력>)

**Possible values:** `<= 300 characters`

**releaseDateText**동일 모델 출시연월 직접 입력 (string<releaseDate를 입력하지 않은 경우에는 필수>)

**Possible values:** `<= 300 characters`

**manufacturer**제조자(사) (string)required

**Possible values:** `<= 200 characters`

**size**크기 (string)required

**Possible values:** `<= 200 characters`

**weight**무게 (string)required

**Possible values:** `<= 200 characters`

**specification**주요 사양 (string)required

**Possible values:** `<= 1500 characters`

**updateCost**맵 업데이트 비용 (string)required

**Possible values:** `<= 200 characters`

**freeCostPeriod**무상 기간 (string)required

**Possible values:** `<= 200 characters`

**warrantyPolicy**품질 보증 기준 (string)required

**Possible values:** `<= 1500 characters`

**afterServiceDirector**A/S 책임자와 전화번호 (string)required

**Possible values:** `<= 200 characters`

**carArticles** 자동차용품(자동차부품/기타 자동차용품) 상품정보제공고시 (object)

자동차용품(자동차부품/기타 자동차용품) 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**itemName**품명 (string)required

**Possible values:** `<= 50 characters`

**modelName**모델명 (string)required

**Possible values:** `<= 50 characters`

**releaseDate**동일 모델 출시연월 (string<'yyyy-MM' 형식 입력>)

**Possible values:** `<= 300 characters`

**releaseDateText**동일 모델 출시연월 직접 입력 (string<releaseDate를 입력하지 않은 경우에는 필수>)

**Possible values:** `<= 300 characters`

**certificationType**KC 인증정보 (string)required

｢자동차관리법｣에 따른 부품자기인증 대상 자동차부품 ｢전기용품 및 생활용품 안전관리법｣에 따른 안전인증·안전확인·공급자적합성확인대상제품 및 ｢전파법｣에 따른 적합인증·적합등록 대상 기자재에 한함

**Possible values:** `<= 200 characters`

**caution**제품 사용으로 인한 위험 및 유의사항 (string)required

연료절감장치에 한함

**Possible values:** `<= 200 characters`

**manufacturer**제조자 (string)required

**Possible values:** `<= 200 characters`

**size**크기 (string)required

**Possible values:** `<= 200 characters`

**applyModel**적용 차종 (string)required

**Possible values:** `<= 1000 characters`

**warrantyPolicy**품질 보증 기준 (string)required

**Possible values:** `<= 1500 characters`

**roadWorthyCertification**검사합격증 번호 (string)required

｢대기환경보전법｣에 따른 첨가제·촉매제에 한함

**Possible values:** `<= 50 characters`

**afterServiceDirector**A/S 책임자와 전화번호 (string)required

**Possible values:** `<= 200 characters`

**medicalAppliances** 의료기기 상품정보제공고시 (object)

의료기기 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**itemName**품명 (string)required

**Possible values:** `<= 50 characters`

**modelName**모델명 (string)required

**Possible values:** `<= 50 characters`

**licenceNo**허가·인증·신고번호 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

｢의료기기법｣에 따른 허가·인증·신고 대상 의료기기에 한함

**Possible values:** `<= 30 characters`

**advertisingCertificationType**광고사전심의 필 유무 (string)required

**Possible values:** `<= 200 characters`

**ratedVoltage**정격전압 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

전기용품에 한함

**Possible values:** `<= 1500 characters`

**powerConsumption**소비전력 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

전기용품에 한함

**Possible values:** `<= 200 characters`

**releaseDate**출시연월 (string<'yyyy-MM' 형식 입력>)

**Possible values:** `<= 300 characters`

**releaseDateText**동일 모델 출시연월 직접 입력 (string<releaseDate를 입력하지 않은 경우에는 필수>)

**Possible values:** `<= 300 characters`

**manufacturer**제조자(사) (string)required

**Possible values:** `<= 200 characters`

**purpose**제품의 사용 목적 (string)required

**Possible values:** `<= 500 characters`

**usage**사용 방법 (string)required

**Possible values:** `<= 500 characters`

**caution**취급 시 주의사항 (string)required

**Possible values:** `<= 1500 characters`

**warrantyPolicy**품질 보증 기준 (string)required

**Possible values:** `<= 1500 characters`

**afterServiceDirector**A/S 책임자와 전화번호 (string)required

**Possible values:** `<= 200 characters`

**kitchenUtensils** 주방용품 상품정보제공고시 (object)

주방용품 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**itemName**품명 (string)required

**Possible values:** `<= 50 characters`

**modelName**모델명 (string)required

**Possible values:** `<= 50 characters`

**material**재질 (string)required

**Possible values:** `<= 200 characters`

**component**구성품 (string)required

**Possible values:** `<= 500 characters`

**size**크기 (string)required

**Possible values:** `<= 200 characters`

**releaseDate**출시연월 (string<'yyyy-MM' 형식 입력>)

**Possible values:** `<= 300 characters`

**releaseDateText**동일 모델 출시연월 직접 입력 (string<releaseDate를 입력하지 않은 경우에는 필수>)

**Possible values:** `<= 300 characters`

**manufacturer**제조자(사) (string)required

**Possible values:** `<= 200 characters`

**producer**제조국 (string)required

**Possible values:** `<= 200 characters`

**importDeclaration**수입식품안전관리특별법에 따른 수입신고 (boolean<미입력 시 false로 설정됩니다. true: 수입식품안전관리특별법에 따른 수입신고를 필함. false: 해당 사항 없음>)

｢수입식품안전관리 특별법｣에 따른 수입기구 또는 용기·포장의 경우

**warrantyPolicy**품질 보증 기준 (string)required

**Possible values:** `<= 1500 characters`

**afterServiceDirector**A/S 책임자와 전화번호 (string)required

**Possible values:** `<= 200 characters`

**cosmetic** 화장품 상품정보제공고시 (object)

화장품 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**capacity**내용물의 용량 및 중량 (string)required

**Possible values:** `<= 200 characters`

**specification**제품 주요 사양 (string)required

피부 타입, 색상(호, 번) 등

**Possible values:** `<= 1500 characters`

**expirationDate**사용기한 또는 개봉 후 사용기간 (string<'yyyy-MM' 형식 입력>)

**Possible values:** `<= 300 characters`

**expirationDateText**사용기한 또는 개봉 후 사용기간 직접 입력 (string<expirationDate를 입력하지 않은 경우에는 필수>)

**Possible values:** `<= 300 characters`

**usage**사용 방법 (string)required

**Possible values:** `<= 1500 characters`

**manufacturer**화장품 제조업자 (string)required

**Possible values:** `<= 200 characters`

**producer**제조국 (string)required

**Possible values:** `<= 200 characters`

**distributor**화장품책임판매업자 (string)required

**Possible values:** `<= 200 characters`

**customizedDistributor**맞춤형 화장품판매업자 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

**Possible values:** `<= 200 characters`

**mainIngredient**｢화장품법｣에 따라 기재ㆍ표시하여야 하는 모든 성분 (string)required

**Possible values:** `<= 1500 characters`

**certificationType**｢화장품법｣에 따른 기능성 화장품(미백, 주름개선, 자외선 차단제품 등)의 경우 (string)required

화장품법에 따른 기능성 화장품 심사(또는 보고)를 필함

**Possible values:** `<= 200 characters`

**caution**사용할 때의 주의사항 (string)required

**Possible values:** `<= 1500 characters`

**warrantyPolicy**품질 보증 기준 (string)required

**Possible values:** `<= 1500 characters`

**customerServicePhoneNumber**소비자 상담 관련 전화번호 (string)required

**Possible values:** `<= 30 characters`

**jewellery** 귀금속/보석/시계류 상품정보제공고시 (object)

귀금속/보석/시계류 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**material**소재 (string)required

**Possible values:** `<= 200 characters`

**purity**순도 (string)required

**Possible values:** `<= 200 characters`

**bandMaterial**밴드 재질 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

시계의 경우

**Possible values:** `<= 200 characters`

**weight**중량 (string)required

**Possible values:** `<= 200 characters`

**manufacturer**제조자(사) (string)required

**Possible values:** `<= 200 characters`

**producer**제조국(원산지, 가공지 등이 다를 경우) (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

원산지, 가공지 등이 다를 경우 함께 표기

**Possible values:** `<= 200 characters`

**size**치수 (string)required

**Possible values:** `<= 200 characters`

**caution**착용 시 주의사항 (string)required

**Possible values:** `<= 1500 characters`

**specification**주요 사양 (string)required

귀금속, 보석류의 경우 등급, 시계의 경우 기능, 방수 등

**Possible values:** `<= 1500 characters`

**provideWarranty**보증서 제공 여부 (string)required

**Possible values:** `<= 200 characters`

**warrantyPolicy**품질 보증 기준 (string)required

**Possible values:** `<= 1500 characters`

**afterServiceDirector**A/S 책임자와 전화번호 (string)required

**Possible values:** `<= 200 characters`

**food** 식품(농.축.수산물) 상품정보제공고시 (object)

식품(농수산물) 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**foodItem**품목 또는 명칭 (string)required

**Possible values:** `<= 200 characters`

**weight**포장 단위별 용량(중량), 수량, 크기 (string)required

**Possible values:** `<= 50 characters`

**amount**포장 단위별 수량 (string)required

**Possible values:** `<= 200 characters`

**size**포장 단위별 크기 (string)required

**Possible values:** `<= 200 characters`

**packDate**제조연월일 (string<date>)

**Possible values:** `<= 300 characters`

**packDateText**제조연월일 직접 입력 (string<packDate를 입력하지 않은 경우에는 필수>)

**Possible values:** `<= 300 characters`

**expirationDate**유통기한 (string<date>)deprecated

**Possible values:** `<= 300 characters`

**expirationDateText**유통기한 직접 입력 (string<expirationDate를 입력하지 않은 경우에는 필수>)deprecated

**Possible values:** `<= 300 characters`

**consumptionDate**소비기한 또는 품질유지기한 (string<date>)

**Possible values:** `<= 300 characters`

**consumptionDateText**소비기한 또는 품질유지기한 직접 입력 (string<consumptionDate를 입력하지 않은 경우에는 필수>)

**Possible values:** `<= 300 characters`

**producer**생산자 (string)required

**Possible values:** `<= 200 characters`

**relevantLawContent**세부 품목군별 표시사항 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

농산물

- ｢농수산물 품질관리법｣에 따른 유전자변형농수산물 표시, 지리적 표시 축산물
- 축산법에 따른 등급 표시 등급(1++ 국내산 쇠고기의 경우 ｢소·돼지 식육의 표시방법 및 부위 구분기준｣에 따라 근내지방도 정보를 포함하여 표시), ｢가축 및 축산물 이력관리에 관한 법률｣에 따른 이력관리대상축산물 유무 수입 농수축산물
- 수입식품안전관리특별법에 따른 수입신고를 필함

**Possible values:** `<= 200 characters`

**productComposition**상품 구성 (string)required

**Possible values:** `<= 200 characters`

**keep**보관 방법 또는 취급 방법 (string)required

**Possible values:** `<= 500 characters`

**adCaution**소비자 안전을 위한 주의사항 (string)required

｢식품 등의 표시ㆍ광고에 관한 법률 시행규칙｣ 제5조 및 [별표 2]에 따른 표시사항을 말함

**Possible values:** `<= 500 characters`

**customerServicePhoneNumber**소비자 상담 관련 전화번호 (string)required

**Possible values:** `<= 30 characters`

**generalFood** 가공식품 상품정보제공고시 (object)

가공식품 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**productName**제품명 (string)required

**Possible values:** `<= 200 characters`

**foodType**식품의 유형 (string)required

**Possible values:** `<= 200 characters`

**producer**생산자 (string)required

**Possible values:** `<= 200 characters`

**location**소재지 (string)required

수입품의 경우 생산자, 수입자 및 제조국

**Possible values:** `<= 200 characters`

**packDate**제조연월일 (string<date>)

**Possible values:** `<= 300 characters`

**packDateText**제조연월일 직접 입력 (string<packDate를 입력하지 않은 경우에는 필수>)

**Possible values:** `<= 300 characters`

**expirationDate**유통기한 (string<date>)deprecated

**Possible values:** `<= 300 characters`

**expirationDateText**유통기한 직접 입력 (string<expirationDate를 입력하지 않은 경우에는 필수>)deprecated

**Possible values:** `<= 300 characters`

**consumptionDate**소비기한 또는 품질유지기한 (string<date>)

**Possible values:** `<= 300 characters`

**consumptionDateText**소비기한 또는 품질유지기한 직접 입력 (string<consumptionDate를 입력하지 않은 경우에는 필수>)

**Possible values:** `<= 300 characters`

**weight**포장 단위별 내용물의 용량(중량), 수량 (string)required

**Possible values:** `<= 200 characters`

**amount**포장 단위별 수량 (string)required

**Possible values:** `<= 200 characters`

**ingredients**원재료명(｢농수산물의 원산지 표시 등에 관한 법률｣에 따른 원산지 표시 포함) 및 함량 (string)required

단, 함량의 경우에는 원재료 함량 표시대상 식품에 한함

**Possible values:** `<= 1000 characters`

**nutritionFacts**영양 성분 (string)

영양성분 표시대상 식품에 한함

**Possible values:** `<= 1000 characters`

**geneticallyModified**유전자변형식품에 해당하는 경우의 표시 (boolean)required

**consumerSafetyCaution**소비자안전을 위한 주의사항 (string)required

｢식품 등의 표시ㆍ광고에 관한 법률 시행규칙｣ 제5조 및 [별표 2]에 따른 표시사항을 말함

**Possible values:** `<= 500 characters`

**importDeclarationCheck**수입식품의 경우 신고 필 유무 (boolean<- true: 수입식품안전관리특별법에 따른 수입 신고를 필함
- false: 해당 사항 없음>)required

**customerServicePhoneNumber**소비자 상담 관련 전화번호 (string)required

**Possible values:** `<= 30 characters`

**dietFood** 건강기능식품 상품정보제공고시 (object)

건강기능식품 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**productName**제품명 (string)required

**Possible values:** `<= 200 characters`

**producer**제조업소 (string)required

**Possible values:** `<= 200 characters`

**location**소재지 (string)required

수입품의 경우 수입업소명, 제조업소명 및 수출국명

**Possible values:** `<= 200 characters`

**expirationDate**유통기한 (string<date>)deprecated

**Possible values:** `<= 300 characters`

**expirationDateText**유통기한 직접 입력 (string<expirationDate를 입력하지 않은 경우에는 필수>)deprecated

**Possible values:** `<= 300 characters`

**consumptionDate**소비기한 (string<date>)

**Possible values:** `<= 300 characters`

**consumptionDateText**소비기한 직접 입력 (string<consumptionDate를 입력하지 않은 경우에는 필수>)

**Possible values:** `<= 300 characters`

**storageMethod**보관방법 (string)required

**Possible values:** `<= 200 characters`

**weight**포장 단위별 내용물의 용량(중량), 수량 (string)required

**Possible values:** `<= 200 characters`

**amount**포장 단위별 수량 (string)required

**Possible values:** `<= 200 characters`

**ingredients**원료명 및 함량 (string)required

｢농수산물의 원산지 표시 등에 관한 법률｣에 따른 원산지 표시 포함

**Possible values:** `<= 1000 characters`

**nutritionFacts**영양 정보 (string)required

**Possible values:** `<= 1000 characters`

**specification**기능 정보 (string)required

**Possible values:** `<= 1000 characters`

**cautionAndSideEffect**섭취량, 섭취 방법 및 섭취 시 주의사항 (string)required

**Possible values:** `<= 1000 characters`

**nonMedicinalUsesMessage**질병의 예방 및 치료를 위한 의약품이 아니라는 내용의 문구 (string)required

**Possible values:** `<= 200 characters`

**geneticallyModified**유전자변형건강기능식품에 해당하는 경우의 표시 (boolean)required

**importDeclarationCheck**수입 건강기능식품에 해당하는 경우 (boolean<- true: 수입식품안전관리특별법에 따른 수입 신고를 필함
- false: 해당 사항 없음>)required

**consumerSafetyCaution**소비자안전을 위한 주의사항 (string)required

｢식품 등의 표시ㆍ광고에 관한 법률 시행규칙｣ 제5조 및 [별표 2]에 따른 표시사항을 말함

**Possible values:** `<= 500 characters`

**customerServicePhoneNumber**소비자 상담 관련 전화번호 (string)required

**Possible values:** `<= 30 characters`

**kids** 영유아용품 상품정보제공고시 (object)

어린이제품요약정보 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**itemName**품명 (string)required

**Possible values:** `<= 50 characters`

**modelName**모델명 (string)required

**Possible values:** `<= 50 characters`

**certificationType**KC 인증정보 (string)required

｢어린이제품 안전 특별법｣에 따른 안전인증·안전확인·공급자적합성확인대상 어린이제품에 한함

**Possible values:** `<= 200 characters`

**size**크기 (string)required

**Possible values:** `<= 200 characters`

**weight**중량 (string)required

섬유제품 등의 경우 치수 정보로 대체 가능

**Possible values:** `<= 200 characters`

**color**색상 (string)required

**Possible values:** `<= 200 characters`

**material**재질 (string)required

섬유의 경우 혼용율

**Possible values:** `<= 200 characters`

**recommendedAge**사용 연령 또는 권장 사용 연령 (string)required

**Possible values:** `<= 30 characters`

**releaseDate**동일 모델의 출시연월 (string<'yyyy-MM' 형식 입력>)

**Possible values:** `<= 300 characters`

**releaseDateText**동일 모델 출시연월 직접 입력 (string<releaseDate를 입력하지 않은 경우에는 필수>)

**Possible values:** `<= 300 characters`

**manufacturer**제조자(사) (string)required

**Possible values:** `<= 200 characters`

**caution**취급방법 및 취급 시 주의사항, 안전표시(주의, 경고 등) (string)required

**Possible values:** `<= 1500 characters`

**warrantyPolicy**품질 보증 기준 (string)required

**Possible values:** `<= 1500 characters`

**afterServiceDirector**A/S 책임자와 전화번호 (string)required

**Possible values:** `<= 200 characters`

**numberLimit**크기·체중의 한계 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

착용 또는 탑승용 어린이제품과 같이 크기·체중에 제한이 있는 품목의 경우 반드시 표시

**Possible values:** `<= 200 characters`

**musicalInstrument** 악기 상품정보제공고시 (object)

악기 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**itemName**품명 (string)required

**Possible values:** `<= 50 characters`

**modelName**모델명 (string)required

**Possible values:** `<= 50 characters`

**size**크기 (string)required

**Possible values:** `<= 200 characters`

**color**색상 (string)required

**Possible values:** `<= 200 characters`

**material**재질 (string)required

**Possible values:** `<= 200 characters`

**components**제품 구성 (string)required

**Possible values:** `<= 1000 characters`

**releaseDate**동일 모델의 출시연월 (string<'yyyy-MM' 형식 입력>)

**Possible values:** `<= 300 characters`

**releaseDateText**동일 모델 출시연월 직접 입력 (string<releaseDate를 입력하지 않은 경우에는 필수>)

**Possible values:** `<= 300 characters`

**manufacturer**제조자(사) (string)required

**Possible values:** `<= 200 characters`

**detailContent**상품별 세부 사양 (string)required

**Possible values:** `<= 1000 characters`

**warrantyPolicy**품질 보증 기준 (string)required

**Possible values:** `<= 1500 characters`

**afterServiceDirector**A/S 책임자와 전화번호 (string)required

**Possible values:** `<= 200 characters`

**sportsEquipment** 스포츠용품 상품정보제공고시 (object)

스포츠용품 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**itemName**품명 (string)required

**Possible values:** `<= 50 characters`

**modelName**모델명 (string)required

**Possible values:** `<= 50 characters`

**certificationType**KC 인증정보 (string)required

｢전기용품 및 생활용품 안전관리법｣에 따른 안전인증·안전확인·공급자적합성확인대상 제품에 한함

**Possible values:** `<= 200 characters`

**size**크기 (string)required

**Possible values:** `<= 200 characters`

**weight**중량 (string)required

**Possible values:** `<= 200 characters`

**color**색상 (string)required

**Possible values:** `<= 200 characters`

**material**재질 (string)required

**Possible values:** `<= 200 characters`

**components**제품 구성 (string)required

**Possible values:** `<= 1000 characters`

**releaseDate** 동일 모델의 출시연월 (object<'yyyy-MM' 형식 입력>)

**Possible values:** `<= 300 characters`

**year**integer<int32>

**month**string

**Possible values:** [`JANUARY`, `FEBRUARY`, `MARCH`, `APRIL`, `MAY`, `JUNE`, `JULY`, `AUGUST`, `SEPTEMBER`, `OCTOBER`, `NOVEMBER`, `DECEMBER`]

**monthValue**integer<int32>

**leapYear**boolean

**releaseDateText**동일 모델 출시연월 직접 입력 (string<releaseDate를 입력하지 않은 경우에는 필수>)

**Possible values:** `<= 300 characters`

**manufacturer**제조자(사) (string)required

**Possible values:** `<= 200 characters`

**detailContent**상품별 세부 사양 (string)required

**Possible values:** `<= 1000 characters`

**warrantyPolicy**품질 보증 기준 (string)required

**Possible values:** `<= 1500 characters`

**afterServiceDirector**A/S 책임자와 전화번호 (string)required

**Possible values:** `<= 200 characters`

**books** 서적 상품정보제공고시 (object)

서적 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**title**도서명 (string)required

**Possible values:** `<= 200 characters`

**author**저자 (string)required

**Possible values:** `<= 200 characters`

**publisher**출판사 (string)required

**Possible values:** `<= 200 characters`

**size**크기 (string)required

**Possible values:** `<= 200 characters`

**pages**쪽수 (string)required

**Possible values:** `<= 30 characters`

**components**제품 구성(전집 또는 세트일 경우 낱권 구성, CD 등) (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

전집 또는 세트일경우 낱권 구성, CD 등

**Possible values:** `<= 1000 characters`

**publishDate**발행일 (string<date>)

｢출판문화산업 진흥법｣ 제2조 및 제22조의 규정에 따른 것으로, 매 판을 처음 인쇄한 날을 말함. 단, 매 판을 구분할 때에 오탈자의 변경 등 경미한 변경에 따라 다시 인쇄하는 경우는 제외

**Possible values:** `<= 200 characters`

**publishDateText**발행일 직접 입력 (string<publishDate를 입력하지 않은 경우에는 필수>)

｢출판문화산업 진흥법｣ 제2조 및 제22조의 규정에 따른 것으로, 매 판을 처음 인쇄한 날을 말함. 단, 매 판을 구분할 때에 오탈자의 변경 등 경미한 변경에 따라 다시 인쇄하는 경우는 제외

**Possible values:** `<= 200 characters`

**description**목차 또는 책 소개 (string)required

아동용 학습교재의 경우 사용 연령을 포함

**Possible values:** `<= 1000 characters`

**rentalEtc** 물품대여 서비스(서적, 유아용품, 행사용품 등) 상품정보제공고시 (object)

물품대여 서비스(서적, 유아용품, 행사용품 등) 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**itemName**품명 (string)required

**Possible values:** `<= 50 characters`

**modelName**모델명 (string)required

**Possible values:** `<= 50 characters`

**ownershipTransferCondition**소유권 이전 조건 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

소유권이 이전되는 경우에 한하며, 소유권 이전에 필요한 렌탈 기간 또는 총 렌탈 금액 등 요건을 구체적으로 명시

**Possible values:** `<= 500 characters`

**payingForLossOrDamage**상품의 고장, 분실, 훼손 시 소비자 책임 (string)required

**Possible values:** `<= 200 characters`

**refundPolicyForCancel**중도 해약 시 환불 기준 (string)required

**Possible values:** `<= 500 characters`

**customerServicePhoneNumber**소비자 상담 관련 전화번호 (string)required

**Possible values:** `<= 30 characters`

**rentalHa** 물품대여 서비스(정수기,비데,공기청정기 등) 상품정보제공고시 (object)

물품대여 서비스(정수기,비데,공기청정기 등) 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**itemName**품명 (string)required

**Possible values:** `<= 50 characters`

**modelName**모델명 (string)required

**Possible values:** `<= 50 characters`

**ownershipTransferCondition**소유권 이전 조건 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

소유권이 이전되는 경우에 한하며, 소유권 이전에 필요한 렌탈 기간 또는 총 렌탈 금액 등 요건을 구체적으로 명시

**Possible values:** `<= 500 characters`

**payingForLossOrDamage**상품의 고장, 분실, 훼손 시 소비자 책임 (string)required

**Possible values:** `<= 200 characters`

**refundPolicyForCancel**중도 해약 시 환불 기준 (string)required

**Possible values:** `<= 500 characters`

**customerServicePhoneNumber**소비자 상담 관련 전화번호 (string)required

**Possible values:** `<= 30 characters`

**maintenance**유지보수 조건 (string)

**specification**제품 사양 (string)

**digitalContents** 디지털 콘텐츠(음원, 게임, 인터넷강의 등) 상품정보제공고시 (object)

디지털 콘텐츠 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**producer**제작자 또는 공급자 (string)required

**Possible values:** `<= 50 characters`

**termsOfUse**이용 조건 (string)required

**Possible values:** `<= 500 characters`

**usePeriod**이용 기간 (string)required

**Possible values:** `<= 200 characters`

**medium**상품 제공 방식 (string)required

CD, 다운로드, 실시간 스트리밍 등

**Possible values:** `<= 30 characters`

**requirement**최소 시스템 사양, 필수 소프트웨어 (string)required

**Possible values:** `<= 200 characters`

**cancelationPolicy**청약철회 및 계약의 해제, 해지에 따른 효과 (string)required

**Possible values:** `<= 500 characters`

**customerServicePhoneNumber**소비자 상담 관련 전화번호 (string)required

**Possible values:** `<= 30 characters`

**giftCard** 상품권/쿠폰 상품정보제공고시 (object)

상품권/쿠폰 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**issuer**발행자 (string)required

**Possible values:** `<= 20 characters`

**periodStartDate**유효기간 시작일 (string<date>)

**Possible values:** `<= 200 characters`

**periodEndDate**유효기간 종료일 (string<date>)

**Possible values:** `<= 200 characters`

**periodDays**유효기간(구매일로부터 00일) (integer<int32>)

**Possible values:** `<= 200 characters`

**termsOfUse**이용 조건 (string)required

유효기간 경과 시 보상 기준, 사용 제한 품목 제한 및 기간 등

**Possible values:** `<= 200 characters`

**useStorePlace**이용 가능 매장(장소) (string<useStorePlace, useStoreAddressId, useStoreUrl 셋 중 하나는 필수>)

**Possible values:** `<= 330 characters`

**useStoreAddressId**이용 가능 매장(판매자 주소 ID) (integer<int64>)

**useStoreUrl**이용 가능 매장(URL) (string<useStorePlace, useStoreAddressId, useStoreUrl 셋 중 하나는 필수>)

**Possible values:** `<= 330 characters`

**refundPolicy**잔액 환급 조건 (string)required

**Possible values:** `<= 500 characters`

**customerServicePhoneNumber**소비자 상담 관련 전화번호 (string)required

**Possible values:** `<= 30 characters`

**mobileCoupon** 모바일 쿠폰 상품정보제공고시 (object)

모바일 쿠폰 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**issuer**발행자 (string)required

**Possible values:** `<= 20 characters`

**usableCondition**유효기간, 이용 조건 (string)required

유효기간 경과 시 보상 기준 포함

**Possible values:** `<= 200 characters`

**usableStore**이용 가능 매장 (string)required

**Possible values:** `<= 330 characters`

**cancelationPolicy**환불 조건 및 방법 (string)required

**Possible values:** `<= 200 characters`

**customerServicePhoneNumber**소비자 상담 관련 전화번호 (string)required

**Possible values:** `<= 30 characters`

**movieShow** 영화/공연 상품정보제공고시 (object)

영화/공연 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**sponsor**주최 또는 기획 (string)required

공연에 한함

**Possible values:** `<= 200 characters`

**actor**주연 (string)required

공연에 한함

**Possible values:** `<= 200 characters`

**rating**관람 등급 (string)required

**Possible values:** `<= 200 characters`

**showTime**상영ㆍ공연 시간 (string)required

**Possible values:** `<= 200 characters`

**showPlace**상영ㆍ공연 장소 (string)required

**Possible values:** `<= 200 characters`

**cancelationCondition**예매 취소 조건 (string)required

**Possible values:** `<= 200 characters`

**cancelationPolicy**취소ㆍ환불 방법 (string)required

**Possible values:** `<= 200 characters`

**customerServicePhoneNumber**소비자 상담 관련 전화번호 (string)required

**Possible values:** `<= 30 characters`

**etcService** 기타 용역 상품정보제공고시 (object)

기타 용역 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**serviceProvider**서비스 제공 사업자 (string)required

**Possible values:** `<= 200 characters`

**certificateDetails**법에 의한 인증ㆍ허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항 (string)required

**Possible values:** `<= 200 characters`

**usableCondition**이용 조건 (string)required

이용 가능 기간·장소, 추가 비용 등

**Possible values:** `<= 200 characters`

**cancelationStandard**취소ㆍ중도해약ㆍ해지 조건 및 환불 기준 (string)required

**Possible values:** `<= 200 characters`

**cancelationPolicy**취소ㆍ환불 방법 (string)required

**Possible values:** `<= 200 characters`

**customerServicePhoneNumber**소비자 상담 관련 전화번호 (string)required

**Possible values:** `<= 30 characters`

**biochemistry** 생활화학제품 상품정보제공고시 (object)

생활화학제품 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**productName**품목 및 제품명 (string)required

**Possible values:** `<= 200 characters`

**dosageForm**용도 및 제형 (string)required

표백제의 경우 계열을 함께 표시

**Possible values:** `<= 200 characters`

**packDate**제조연월 (string<'yyyy-MM' 형식 입력>)

**Possible values:** `<= 300 characters`

**packDateText**제조연월 직접 입력 (string<packDate를 입력하지 않은 경우에는 필수>)

**Possible values:** `<= 300 characters`

**expirationDate**유통기한 (string<'yyyy-MM' 형식 입력>)

해당 사항이 없으면 생략하고 expirationDateText에 '해당사항 없음' 입력

**Possible values:** `<= 300 characters`

**expirationDateText**유통기한 직접 입력 (string<expirationDate를 입력하지 않은 경우에는 필수>)

해당 사항이 없으면 '해당사항 없음' 입력

**Possible values:** `<= 300 characters`

**weight**중량·용량·매수·크기 (string)required

**Possible values:** `<= 1500 characters`

**effect**효능ㆍ효과 (string)required

승인 대상 생활화학제품에 한함

**Possible values:** `<= 200 characters`

**importer**수입자 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

수입제품에 한함

**Possible values:** `<= 200 characters`

**producer**제조국 (string)required

**Possible values:** `<= 200 characters`

**manufacturer**제조자(사) (string)required

**Possible values:** `<= 200 characters`

**childProtection**어린이보호포장 대상 제품 여부 (string)required

**Possible values:** `<= 200 characters`

**chemicals**제품에 사용된 화학 물질 명칭 (string)required

｢안전확인대상 생활화학제품 지정 및 안전·표시기준｣ [별표6]에 따른 표시대상 화학물질로서 주요물질, 보존제, 알레르기반응가능물질 등의 명칭

**Possible values:** `<= 200 characters`

**caution**사용상 주의사항 (string)required

**Possible values:** `<= 500 characters`

**safeCriterionNo**안전기준적합확인신고번호 또는 안전확인대상 생활화학제품승인번호 (string)required

화학제품안전법 시행일(경과조치 기간 포함) 이전에 생산·수입된 위해우려제품의 경우 종전 법에 따른 자가 검사번호를 표시

**Possible values:** `<= 200 characters`

**customerServicePhoneNumber**소비자 상담 관련 전화번호 (string)required

**Possible values:** `<= 30 characters`

**biocidal** 살생물제품 상품정보제공고시 (object)

살생물제품 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**productName**제품명 및 살생물제품유형 (string)required

**Possible values:** `<= 200 characters`

**weight**중량 또는 용량 및 표준 사용량 (string)required

**Possible values:** `<= 200 characters`

**effect**효능ㆍ효과 (string)required

**Possible values:** `<= 200 characters`

**rangeOfUse**사용 대상자 및 사용 범위 (string)required

**Possible values:** `<= 200 characters`

**importer**수입자 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

수입제품에 한함

**Possible values:** `<= 200 characters`

**producer**제조국 (string)required

**Possible values:** `<= 200 characters`

**manufacturer**제조자(사) (string)required

**Possible values:** `<= 200 characters`

**childProtection**어린이보호포장 대상 제품 여부 (string)required

**Possible values:** `<= 200 characters`

**harmfulChemicalSubstance**살생물물질, 나노물질, 유해화학물질(또는 중점관리물질)의 명칭 (string)required

**Possible values:** `<= 200 characters`

**maleficence**제품 유해성ㆍ위해성 표시 (string)required

**Possible values:** `<= 200 characters`

**caution**사용 방법 및 사용상 주의사항 (string)required

**Possible values:** `<= 500 characters`

**approvalNumber**승인번호 (string)required

**Possible values:** `<= 200 characters`

**customerServicePhoneNumber**소비자상담 전화번호 (string)required

**Possible values:** `<= 30 characters`

**expirationDate**유통기한 (string<date>)

'yyyy-MM-dd' 형식 입력

**Possible values:** `<= 300 characters`

**expirationDateText**유통기한 직접 입력 (string)

expirationDate를 입력하지 않은 경우에는 필수

**Possible values:** `<= 300 characters`

**cellPhone** 휴대폰 상품정보제공고시 (object)

휴대폰 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**itemName**품목 (string)required

**Possible values:** `<= 50 characters`

**modelName**모델명 (string)required

**Possible values:** `<= 50 characters`

**certificationType**KC 인증정보 (string)required

｢전기용품 및 생활용품 안전관리법｣에 따른 안전인증·안전확인·공급자적합성확인대상 제품 및 ｢전파법｣에 따른 적합인증·적합등록 대상 기자재에 한함

**Possible values:** `<= 50 characters`

**releaseDate**동일 모델의 출시연월 (string<'yyyy-MM' 형식 입력>)

**Possible values:** `<= 300 characters`

**releaseDateText**동일 모델 출시연월일 직접 입력 (string<releaseDate를 입력하지 않은 경우에는 필수>)

**Possible values:** `<= 300 characters`

**manufacturer**제조자(사) (string)required

**Possible values:** `<= 200 characters`

**importer**수입자 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

수입품의 경우 수입자를 함께 표시

**Possible values:** `<= 200 characters`

**producer**제조국 (string)required

**Possible values:** `<= 200 characters`

**size**크기 (string)required

**Possible values:** `<= 50 characters`

**weight**무게 (string)required

**Possible values:** `<= 50 characters`

**telecomType**이동통신사 (string)required

**Possible values:** `<= 50 characters`

**joinProcess**가입절차 (string)required

**Possible values:** `<= 50 characters`

**extraBurden**소비자의 추가적인 부담사항 (string)required

가입비, 유심카드 구입비 등 추가로 부담하여야 할 금액, 부가서비스, 의무사용기간, 위약금 등

**Possible values:** `<= 50 characters`

**specification**주요 사양 (string)required

**Possible values:** `<= 500 characters`

**warrantyPolicy**품질 보증 기준 (string)required

**Possible values:** `<= 500 characters`

**afterServiceDirector**A/S 책임자와 전화번호 (string)required

**Possible values:** `<= 200 characters`

**etc** 기타 재화 상품정보제공고시 (object)

기타 재화 상품정보제공고시

**returnCostReason**제품하자/오배송에 따른 청약철회 조항 (string)required

제품하자ㆍ오배송 등에 따른 청약철회 등의 경우 청약철회 등의 기한 및 통신판매업자가 부담하는 반품 비용 등에 관한 정보. 미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.)
- 1 (상품상세 참조)

**noRefundReason**제품하자가 아닌 소비자의 단순변심에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.)
- 1 (상품상세 참조)

**qualityAssuranceStandard**재화 등의 교환ㆍ반품ㆍ보증 조건 및 품질 보증 기준 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**compensationProcedure**대금을 환불받기 위한 방법과 환불이 지연될 경우 지연배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적인 조건·절차 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 15%의 지연배상금을 판매자에게 청구할 수 있습니다.)
- 1 (상품상세 참조)

**troubleShootingContents**소비자피해보상의 처리, 재화 등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁 처리에 관한 사항 (string)required

미입력 시 상품상세 참조로 입력됩니다.

- 0 (소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.)
- 1 (상품상세 참조)

**itemName**품명 (string)required

**Possible values:** `<= 50 characters`

**modelName**모델명 (string)required

**Possible values:** `<= 50 characters`

**certificateDetails**법에 의한 인증, 허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항 (string<해당 사항이 없으면 이 요소를 삭제하고 전송합니다.>)

**Possible values:** `<= 500 characters`

**manufacturer**제조자(사) (string)required

**Possible values:** `<= 200 characters`

**afterServiceDirector**A/S 책임자 (string)

**Possible values:** `<= 200 characters`

**customerServicePhoneNumber**소비자 상담 관련 전화번호 (string<afterServiceDirector를 입력하지 않은 경우에는 필수>)

**Possible values:** `<= 30 characters`

**afterServiceInfo** A/S정보 (object)required

A/S 정보

**afterServiceTelephoneNumber**A/S 전화번호 (string)required

**afterServiceGuideContent**A/S 안내 (string)required

**sellerCommentContent**판매자 특이 사항 (string)

판매자 특이 사항이 있는 경우 입력합니다.

**supplementProductInfo** 추가 상품 정보 (object)

추가 상품 정보

**sortType**추가 상품 정렬 구분 코드 (string)

미입력 시 기본값인 등록순(CREATE)으로 저장됩니다.

- CREATE(등록순), ABC(가나다순), LOW_PRICE(낮은 가격순), HIGH_PRICE(높은 가격순)

**Possible values:** [`CREATE`, `ABC`, `LOW_PRICE`, `HIGH_PRICE`]

**supplementProducts** 추가 상품 (object)[]

**id**추가 상품 ID (integer<int64>)

**groupName**추가 상품 그룹명 (string)required

추가 상품명

**name**추가 상품명 (string)required

추가 상품값

**price**추가 상품가 (integer<int32>)

미입력 시 0원으로 입력됩니다.

**Possible values:** `<= 999999990`

**stockQuantity**재고 수량 (integer<int32>)

미입력 시 0개로 입력됩니다.

**Possible values:** `<= 99999999`

**sellerManagementCode**판매자 관리 코드 (string)

**usable**사용 여부 (boolean)

미입력 시 true로 입력됩니다.

**seoInfo** SEO(Search engine optimization) 정보 (object)

SEO(Search engine optimization) 정보

**pageTitle**페이지 타이틀 (string)

**Possible values:** `<= 100 characters`

**metaDescription**메타 정보 (string)

**Possible values:** `<= 160 characters`

**sellerTags** KrExternalApiTagInfoVo.product (object)[]

**code**태그 ID. 직접 입력의 경우에는 ID가 존재하지 않습니다. (integer<int64>)

**text**태그명 (string)required

**commonDetailContent**그룹상품 공통 상품 상세 정보 (string)

그룹상품 하위의 모든 상품에 동일한 상품 상세 정보를 입력/수정하는 경우 사용합니다.
상품별로 상품 상세 정보를 다르게 설정하려면 상품 상세 정보 임시 저장 API에서 반환받은 tempId를 specificProducts 하위의 detailContentTempId에 입력하여 등록해야 합니다.
그룹상품 조회 API에서는 그룹상품에 공통 등록된 상품 상세 정보만 반환되며, 그룹 내 상품별 상품 상세 정보가 다르게 설정된 경우에는 기존의 개별 상품 조회 API로 조회해야 합니다.
그룹상품 수정 API에서는 생략할 수 있으며, 생략 시 기존에 저장된 그룹상품 공통 상품 상세 정보가 유지됩니다.

**productSize** 상품 사이즈 (object)

사이즈 정보

**sizeTypeNo**사이즈 타입 번호 (integer<int64>)

**sizeAttributes** 상세 사이즈 정보 (object)[]required

**name**상품 상세 사이즈 항목 이름 (string)required

**sizeValues** 사이즈 값 (object)[]required

**sizeValueTypeNo**사이즈 값 타입 번호 (integer<int64>)required

**value**사이즈 값 (number<double>)required

**productFashionModels** 패션모델 정보 (object)[]

**modelId**패션모델 ID (integer<int64>)required

**specificProducts** 그룹상품 (object)[]required

같은 그룹상품으로 등록할 판매 옵션 상품의 목록입니다. 등록하고자 하는 상품 수만큼 반복하여 입력합니다.
판매옵션은 카테고리에 따라 옵션값 조합 개수를 기준으로 최대 20개 또는 100개까지 등록할 수 있습니다. 카테고리를 수정하는 경우 수정할 카테고리 기준 판매옵션 상품 개수가 적용됩니다.

**originProductNo**원상품번호 (integer<int64>)

상품등록이 완료된 후 반환되는 값으로, 등록API에서는 원상품번호 항목은 입력하지 않아야 합니다. (입력 시 error)
그룹상품수정API에서는 기존에 그룹상품에 등록되어 있는 원상품번호는 수정여부와 무관하게 모두 필수로 입력해야 합니다.
원상품번호의 입력여부를 조정하여, 기존 상품의 정보를 수정하거나, 신규 옵션을 추가할 수 있습니다.
기존에 스마트스토어에 등록되어 있는 상품을 그룹에 신규 옵션으로 추가하는 기능은 API에서는 제공되지 않고, 스마트스토어 센터에서만 제공됩니다.
기존의 상품을 그룹에서 해제하는 기능은 API와 스마트스토어 센터 모두 제공하고 있지 않습니다.

- 신규 옵션 추가: 원상품번호 null로 입력
- 기존 옵션 유지 또는 수정: 기존 원상품번호 그대로 모두 입력

**standardPurchaseOptions** 판매 옵션 정보 (object)[]required

상품의 판매 옵션 정보를 입력합니다.
판매 옵션 가이드에서 허용하는 판매 옵션만 등록 가능하며, 등록하고자 하는 판매 옵션 만큼 반복하여 입력합니다.
카테고리를 수정하는 경우 수정할 카테고리 기준 판매 옵션 정보를 조회하여 해당 카테고리에서 허용하는 판매 옵션 정보를 입력해 주세요.

**optionId**판매옵션 ID (integer<int64>)required

판매옵션의 ID를 입력합니다.

판매옵션 가이드와 일치하는 판매옵션 정보를 입력해야 하며, 가이드에서 허용하지 않는 옵션이 포함되어 있거나, 가이드 내 옵션이 누락된 경우에는 상품 등록/수정이 불가능합니다.

guideId(판매옵션 가이드 ID) 수정 시, 판매옵션 ID도 수정해주세요.

**valueName**판매 옵션값명 (string)required

판매 옵션에 해당하는 판매 옵션값의 이름을 입력합니다(최대 20자). 단위가 존재하는 숫자형 판매 옵션의 경우 숫자+단위 조합으로 입력해야 하며, 판매 옵션별로 허용되는 단위는 카테고리별 판매 옵션 정보 조회 API로 확인할 수 있습니다.
수정 가능 조건 : 그룹상품에 속한 판매옵션 중, 하나라도 등록 완료일 30일 이내이거나, 카테고리 수정일 30일 이내인 경우 수정 가능합니다.
(31일째부터 수정 실패)

**valueOrder**판매 옵션값 순서 (integer<int32>)

상품의 상세 페이지 등에서 텍스트형 판매 옵션의 판매 옵션값 순서를 직접 지정하는 경우에 사용합니다. 동일한 판매 옵션값에는 동일한 순서 값을 입력해야 합니다.
숫자형 판매 옵션의 경우, 입력된 값은 무시되며 판매 옵션값이 오름차순으로 정렬됩니다.

**colorCodes**색상 코드 (string)[]

색상칩으로 표시될 색상의 Hex코드를 입력합니다. (#000000 형식, 최대 2개 입력 가능)
판매옵션별 색상칩 사용 여부는 판매옵션 정보 조회API를 통해 확인할 수 있고, 동일한 판매옵션값은 동일한 색상코드값이 입력되어야 합니다.
색상칩은 일부 상품에만 등록할 수는 없고, 그룹상품 하위 전체 상품에 등록하거나, 전체 상품에 해제하는 것만 가능합니다.
색상칩 사용 대상인 판매옵션에 한해 사용되며, 이외에는 입력된 값이 삭제됩니다.

**salePrice**판매가 (number)required

**Possible values:** `<= 999999990`

**productLogistics** 물류사 정보 (object)[]

**logisticsCompanyId**물류사 ID (string)required

네이버 풀필먼트 서비스를 이용 중인 경우 입력할 수 있으며, (판매자 풀필먼트)물류사 연동 정보 조회 API로 확인한 물류사 ID를 입력합니다.

**logisticsCenterId**물류센터 ID(deprecated) (string)deprecated

**skuYn**SKU생성여부 (boolean)

- 네이버 풀필먼트 서비스를 이용 중인 경우 입력할 수 있으며, 이용권한이 없는 계정에 입력된 값은 무시됩니다.
- 재고관리 메뉴에 신규 SKU를 생성하려는 경우 Y를 입력합니다.
- 상품 등록 시 SKU 생성여부를 입력하지 않으면 N으로 등록됩니다.
- 상품 수정 시 SKU 생성여부를 입력하지 않으면 기존값이 유지됩니다. (상품 수정 시 요청된 N은 무시됩니다.)

**stockQuantity**재고 수량 (integer<int32>)

상품 등록 시 필수이며, 등록 시 재고를 1 이상으로 입력해야 합니다.
수정 시에는 그룹상품에 신규 판매옵션을 추가하는 경우(origninProductNo이 null)에는 해당 상품의 재고를 1 이상으로 입력해야 하며,
기존에 판매옵션으로 등록되어 있던 상품을 수정하는 경우(origninProductNo이 null이 아닌 경우)에는 해당 상품의 재고 수량을 입력하지 않으면 스마트스토어 데이터베이스에 저장된 현재 재고 값이 변하지 않고, 0으로 입력하면 상품은 품절상태로 저장됩니다.

**Possible values:** `<= 99999999`

**modelInfo** 상품 모델 정보 (object)

**modelId**상품 모델 ID (integer<int64>)

**modelName**상품 모델명 (string)

**manufactureDefineNo**품번 (string)

제조사에서 상품에 부여한 고유 상품코드/모델번호 정보입니다. (예시 : NT750XGR-A51A)

품번 입력 대상 카테고리에 대해서만 입력 가능하며, 품번 입력 대상 카테고리가 아닌 경우 입력된 값은 무시됩니다.

**immediateDiscountPolicy** 판매자 기본 할인 정책 (object)

mobileDiscountMethod로 설정한 값은 무시됩니다. 추후 오류 응답이 반환될 수 있으므로 discountMethod를 사용하세요.

**discountMethod** 할인 혜택 (object)

할인 혜택

**value**할인 값 (number)required

할인 단위에 따른 값을 입력합니다.

- 예: 정율 10%이면 10, 정액 100원이면 100

**Possible values:** `>= 1` and `<= 10000000`

**unitType**할인 단위 (string)required

할인 단위 타입. PERCENT, WON만 입력 가능합니다.

- PERCENT(정율), WON(정액)

**Possible values:** [`PERCENT`, `WON`, `YEN`, `COUNT`]

**startDate**할인 시작일 (string<date-time>)

매 시각 00, 10, 20, 30, 40, 50분으로만 설정 가능합니다. 'yyyy-MM-dd'T'HH:mm[:ss][.SSS]XXX' 형식으로 입력합니다.

**endDate**할인 종료일 (string<date-time>)

매 시각 09, 19, 29, 39, 49, 59분으로만 설정 가능합니다. 'yyyy-MM-dd'T'HH:mm[:ss][.SSS]XXX' 형식으로 입력합니다.

**reservedDiscountPolicy** 예약 할인 정책 (object)

예약 할인 정책

**discountMethod** 예약 할인 혜택 (object)

예약 할인 혜택

**value**할인 값 (number)required

할인 단위에 따른 값을 입력합니다.

- 예: 정율 10%이면 10, 정액 100원이면 100

**Possible values:** `>= 1` and `<= 10000000`

**unitType**할인 단위 (string)required

할인 단위 타입. PERCENT, WON만 입력 가능합니다.

- PERCENT(정율), WON(정액)

**Possible values:** [`PERCENT`, `WON`, `YEN`, `COUNT`]

**startDate**할인 시작일 (string<date-time>)

매 시각 00, 10, 20, 30, 40, 50분으로만 설정 가능합니다. 'yyyy-MM-dd'T'HH:mm[:ss][.SSS]XXX' 형식으로 입력합니다.

**endDate**할인 종료일 (string<date-time>)

매 시각 09, 19, 29, 39, 49, 59분으로만 설정 가능합니다. 'yyyy-MM-dd'T'HH:mm[:ss][.SSS]XXX' 형식으로 입력합니다.

**customerBenefit** 그룹상품 고객 혜택 정보 (object)

**purchasePointPolicy** 상품 구매 포인트 정책 (object)

판매자 상품 구매 포인트 정책

**value**상품 구매 포인트 값 (number)required

포인트 단위에 따른 값을 입력합니다.

- 예: 정율 10%이면 10, 정액 100원이면 100

**unitType**상품 구매 포인트 단위 (string)required

상품 구매 포인트 단위 타입. PERCENT, WON만 입력 가능합니다.

- PERCENT(정율), WON(정액)

**Possible values:** [`PERCENT`, `WON`, `YEN`, `COUNT`]

**startDate**적립 시작일 (string<date>)

'yyyy-MM-dd' 형식 입력

**endDate**적립 종료일 (string<date>)

시작일을 입력한 경우 필수. 'yyyy-MM-dd' 형식 입력.

**reviewPointPolicy** 구매평 포인트 정책 (object)

판매자 상품 리뷰 포인트 정책

**textReviewPoint**텍스트 리뷰 포인트 (integer<int32>)

텍스트 리뷰 작성 시 적립되는 네이버페이 포인트

**photoVideoReviewPoint**포토/동영상 리뷰 포인트 (integer<int32>)

포토/동영상 리뷰 작성 시 적립되는 네이버페이 포인트

**afterUseTextReviewPoint**한 달 사용 텍스트 리뷰 포인트 (integer<int32>)

한 달 사용 텍스트 리뷰 작성 시 적립되는 네이버페이 포인트

**afterUsePhotoVideoReviewPoint**한 달 사용 포토/동영상 리뷰 포인트 (integer<int32>)

한 달 사용 포토/동영상 리뷰 작성 시 적립되는 네이버페이 포인트

**storeMemberReviewPoint**알림받기 동의/소식알림(톡톡친구) 회원 리뷰 추가 적립 포인트 (integer<int32>)

알림받기 동의/톡톡친구 회원이 상품 리뷰, 한 달 사용 리뷰 작성 시 추가 적립되는 네이버페이 포인트

- 텍스트 리뷰나 포토/동영상 리뷰 구분 없이 1회만 지급

**startDate**적립 시작일 (string<date>)

네이버페이 포인트 유효기간 시작일. 'yyyy-MM-dd' 형식 입력.

**endDate**적립 종료일 (string<date>)

네이버페이 포인트 유효기간 종료일. 시작일을 입력한 경우 필수. 'yyyy-MM-dd' 형식 입력.

**freeInterestPolicy** 무이자 할부 정책 (object)

무이자 할부 정책

**value**무이자 할부 개월 수 (integer<int32>)required

**startDate**무이자 할부 시작일 (string<date>)

'yyyy-MM-dd' 형식 입력

**endDate**무이자 할부 종료일 (string<date>)

시작일을 입력한 경우 필수. 'yyyy-MM-dd' 형식 입력.

**giftPolicy** 사은품 정책 (object)

사은품 정책

**presentContent**사은품 (string)

사은품 내용

**multiPurchaseDiscountPolicy** 복수 구매 할인 정책 (object)

판매자 복수 구매 할인 정책

**discountMethod** 복수 구매 할인 혜택 (object)

복수 구매 할인 혜택

**value**할인 값 (number)required

할인 단위에 따른 값을 입력합니다.

- 예: 정율 10%이면 10, 정액 100원이면 100

**Possible values:** `>= 1` and `<= 10000000`

**unitType**할인 단위 (string)required

할인 단위 타입. PERCENT, WON만 입력 가능합니다.

- PERCENT(정율), WON(정액)

**Possible values:** [`PERCENT`, `WON`, `YEN`, `COUNT`]

**startDate**할인 시작일 (string<date>)

복수 구매 할인의 경우 날짜로만 지정됩니다. 'yyyy-MM-dd' 형식으로 입력합니다.

**endDate**할인 종료일 (string<date>)

복수 구매 할인의 경우 날짜로만 지정됩니다. 'yyyy-MM-dd' 형식으로 입력합니다.

**orderValue**주문 금액(수량) 값 (number)required

**orderValueUnitType**주문 금액(수량) 단위 (string)required

COUNT, WON만 입력 가능합니다.

- COUNT(개수), WON(정액)

**Possible values:** [`PERCENT`, `WON`, `YEN`, `COUNT`]

**eventPhraseCont**이벤트 문구(홍보 문구 대체) (string)

**images** 상품 이미지 (object)required

상품 이미지로 대표 이미지(1000x1000픽셀 권장)와 최대 9개의 추가 이미지 목록을 제공할 수 있습니다. 대표 이미지는 필수이고 추가 이미지는 선택 사항입니다.
**이미지 URL은 반드시 상품 이미지 다건 등록 API로 이미지를 업로드하고 반환받은 URL 값을 입력해야 합니다.**

**representativeImage** 이미지 (object)required

**url**이미지 URL (string)required

**optionalImages** 이미지 (object)[]

추가 이미지 목록. 최대 9개. 이미지 URL은 반드시 상품 이미지 다건 등록 API로 이미지를 업로드하고 반환받은 URL 값을 입력해야 합니다.

**url**이미지 URL (string)required

**productAttributes** 상품 속성 목록 (object)[]

**attributeSeq**속성 ID (integer<int64>)

**attributeValueSeq**속성값 ID (integer<int64>)required

**attributeRealValue**속성 실제 값 (string)

범위형인 경우 입력합니다. 범위형처럼 속성의 특정 값을 지정할 수 없을 때 사용합니다.

**attributeRealValueUnitCode**속성 실제 값 단위 코드 (string)

범위형인 경우 입력합니다.

**deliveryInfo** 배송 정보 (object)

배송 방식 및 배송비 등을 설정할 수 있습니다. 입력하지 않으면 배송 없는 상품으로 등록됩니다.
지금배달 상품은 등록이 등록할 수 없습니다.

**deliveryType**배송 방법 유형 코드 (string)required

네이버 상품 API에서 배송 방법 유형을 나타내기 위해 사용하는 코드입니다.

- DELIVERY(택배, 소포, 등기), DIRECT(직접배송(화물배달))
- 네이버 풀필먼트 상품, 배송 속성 SELLER_GUARANTEE(N판매자배송), 배송속성 HOPE_SELLER_GUARANTEE(N희망일배송)인 경우 배송 방법은 DELIVERY(택배, 소포, 등기)만 허용됩니다.

**Possible values:** [`DELIVERY`, `DIRECT`]

**deliveryAttributeType**배송 속성 타입 코드 (string)required

네이버 상품 API에서 배송 속성 타입을 나타내기 위해 사용하는 코드입니다.
네이버 풀필먼트 상품은 OPTION_TODAY(옵션별 오늘출발)을 설정할 수 없습니다.

- 상품 등록/수정 시: NORMAL(일반 배송), TODAY(오늘출발), OPTION_TODAY(옵션별 오늘출발), HOPE(희망일배송), TODAY_ARRIVAL(당일배송(지금배달 관련 기능)), DAWN_ARRIVAL(새벽배송(지금배달 관련 기능)), ARRIVAL_GUARANTEE(N배송), SELLER_GUARANTEE(N판매자배송), HOPE_SELLER_GUARANTEE(N희망일배송)
- 상품 일괄 수정 시: NORMAL(일반 배송), TODAY(오늘출발), HOPE(희망일배송), SELLER_GUARANTEE(N판매자배송), HOPE_SELLER_GUARANTEE(N희망일배송)
- 렌탈상품 등록/수정 시: NORMAL(일반 배송), HOPE(희망일배송)
- 그룹상품 등록/수정 시: NORMAL(일반 배송), TODAY(오늘 출발), HOPE(희망일배송), ARRIVAL_GUARANTEE (N배송), SELLER_GUARANTEE(N판매자배송), HOPE_SELLER_GUARANTEE (N희망일배송)

**Possible values:** [`NORMAL`, `TODAY`, `OPTION_TODAY`, `HOPE`, `TODAY_ARRIVAL`, `DAWN_ARRIVAL`, `ARRIVAL_GUARANTEE`, `SELLER_GUARANTEE`, `HOPE_SELLER_GUARANTEE`, `QUICK`, `PICKUP`, `QUICK_PICKUP`]

**deliveryCompany**택배사 (string)

DELIVERY(택배, 소포, 등기)일 때 필수 입력

- 주문 > 발주/발송 처리 > 발송 처리 API의 택배사 코드(deliveryCompanyCode)를 참고하여 코드값을 입력합니다.
- 배송 속성이 SELLER_GUARANTEE(N판매자배송), HOPE_SELLER_GUARANTEE(N희망일배송)인 경우 판매자정보 > 판매자 물류 > 물류사 연동 정보 조회API에서 해당하는 deliveryTypes(배송속성)의 logisticsCompanyId(물류사ID)를 상품API의 deliveryCompany(택배사)에 입력합니다.

**outboundLocationId**판매자 창고 ID (string)

배송 속성이 SELLER_GURANTEE(N판매자배송), HOPE_SELLER_GUARANTEE(N희망일배송)인 경우 필수입력이며, 그 밖의 배송속성에 입력된 판매자 창고ID값은 무시됩니다.
판매자정보 > 판매자물류 > 판매자 창고 정보 조회API에서 해당하는 deliveryType(배송속성)의 창고ID를 입력합니다.

**deliveryBundleGroupUsable**묶음배송 가능 여부 (boolean)

묶음배송 그룹 코드가 존재하는 경우 자동으로 true로 설정됩니다.
배송속성이 HOPE_SELLER_GUARANTEE(N희망일배송)인 경우 묶음배송 설정이 불가합니다.

**deliveryBundleGroupId**묶음배송 그룹 코드 (integer<int64>)

묶음배송 가능이 true이고 묶음배송 그룹 코드가 null이면 기본 그룹으로 저장됩니다.(배송 속성이 ARRIVAL_GUARANTEE인 경우 제외)

**quickServiceAreas**string[]

퀵서비스 배송 지역 코드입니다.
네이버 풀필먼트 상품, N희망일배송 상품은 퀵서비스를 설정할 수 없습니다.

- SEOUL(서울 전지역), GYEONGGI(경기 전지역), GOYANG(경기 고양), GOCHON(경기 고촌), GONJIAM(경기 곤지암), GWACHEON(경기 과천), GWANGMYEONG(경기 광명), GYEONGGIGWANGJU(경기 광주), GYOMUN(경기 교문리), GURI(경기 구리), GUSEONG(경기 구성), GUNPO(경기 군포), GIMPO(경기 김포), BUCHEON(경기 부천), BUNDANG(경기 분당), SEONGNAM(경기 성남), SUWON(경기 수원), SUJI(경기 수지), SIHEUNG(경기 시흥), ANSAN(경기 안산), ANYANG(경기 안양), YONGIN(경기 용인), UIWANG(경기 의왕), UIJEONGBU(경기 의정부), ICHEON(경기 이천), ILSAN(경기 일산), JICHUK(경기 지축), PAJU(경기 파주), HANAM(경기 하남), GWANGJU(광주 전지역), DAEGU(대구 전지역), DAEJEON(대전 전지역), BUSAN(부산 전지역), ULSAN(울산 전지역), INCHEON(인천 전지역)

**Possible values:** [`SEOUL`, `GYEONGGI`, `GOYANG`, `GOCHON`, `GONJIAM`, `GWACHEON`, `GWANGMYEONG`, `GYEONGGIGWANGJU`, `GYOMUN`, `GURI`, `GUSEONG`, `GUNPO`, `GIMPO`, `BUCHEON`, `BUNDANG`, `SEONGNAM`, `SUWON`, `SUJI`, `SIHEUNG`, `ANSAN`, `ANYANG`, `YONGIN`, `UIWANG`, `UIJEONGBU`, `ICHEON`, `ILSAN`, `JICHUK`, `PAJU`, `HANAM`, `GWANGJU`, `DAEGU`, `DAEJEON`, `BUSAN`, `ULSAN`, `INCHEON`]

**visitAddressId**방문 수령 주소록 ID (integer<int64>)

방문 수령 주소 코드.
네이버 풀필먼트 상품, N희망일배송 상품은 방문 수령을 설정할 수 없습니다.

**deliveryFee** 배송비 정보 (object)required

배송비 정보

**deliveryFeeType**배송비 타입 (string)

배송비 타입을 입력하지 않으면 FREE(무료)로 설정됩니다.

- FREE(무료), CONDITIONAL_FREE(조건부 무료), PAID(유료), UNIT_QUANTITY_PAID(수량별), RANGE_QUANTITY_PAID(구간별)
- 렌탈상품 등록/수정 시: FREE(무료), PAID(유료)

**Possible values:** [`FREE`, `CONDITIONAL_FREE`, `PAID`, `UNIT_QUANTITY_PAID`, `RANGE_QUANTITY_PAID`]

**baseFee**기본 배송비 (integer<int32>)

**Possible values:** `<= 100000`

**freeConditionalAmount**무료 조건 금액 (integer<int32>)

배송비 유형이 '조건부 무료'일 경우 입력합니다.

**Possible values:** `<= 999999990`

**repeatQuantity**기본 배송비 반복 부과 수량 (integer<int32>)

반복 수량. 배송비 유형이 '수량별 부과 - 반복 구간'일 경우 입력합니다.

**secondBaseQuantity**배송비 조건 2구간 수량 (integer<int32>)

2구간 최소 수량. 배송비 유형이 '수량별 부과 - 구간 직접 설정'일 경우 입력합니다.

**secondExtraFee**배송비 조건 2구간 수량 초과 시 추가 배송비 (integer<int32>)

2구간 추가 배송비. 배송비 유형이 '수량별 부과 - 구간 직접 설정'일 경우 입력합니다.

**thirdBaseQuantity**배송비 조건 3구간 수량 (integer<int32>)

3구간 최소 수량. 배송비 유형이 '수량별 부과 - 구간 직접 설정'일 경우 입력합니다.

**thirdExtraFee**배송비 조건 3구간 초과 시 추가 배송비 (integer<int32>)

3구간 추가 배송비. 배송비 유형이 '수량별 부과 - 구간 직접 설정'일 경우 입력합니다.

**deliveryFeePayType**배송비 결제 방식 코드 (string)

네이버 상품 API에서 배송비 결제 방식을 나타내기 위해 사용하는 코드입니다.

- COLLECT(착불), PREPAID(선결제), COLLECT_OR_PREPAID(착불 또는 선결제)

**Possible values:** [`COLLECT`, `PREPAID`, `COLLECT_OR_PREPAID`]

**deliveryFeeByArea** 지역별 추가 배송비 (object)

지역별 추가 배송비

**deliveryAreaType**지역별 추가 배송비 권역 코드 (string)required

묶음배송 그룹 등록 시 지역별 추가 배송비 권역을 입력하기 위한 코드입니다.
묶음배송 가능 여부가 true인 경우 묶음배송 그룹에 설정된 값이 적용됩니다.(배송 속성이 ARRIVAL_GUARANTEE인 경우 제외).

- AREA_2(내륙/제주 및 도서산간 지역으로 구분(2권역)), AREA_3(내륙/제주/제주 외 도서산간 지역으로 구분(3권역))

**Possible values:** [`AREA_2`, `AREA_3`]

**area2extraFee**2권역 추가 배송비 (integer<int32>)

2권역인 경우 "제주 및 도서산간" 지역 추가 배송비.
3권역인 경우 "제주" 지역 추가 배송비.
묶음배송 가능 여부가 true인 경우 묶음배송 그룹에 설정된 값이 적용됩니다.(배송 속성이 ARRIVAL_GUARANTEE인 경우 제외).

**Possible values:** `<= 200000`

**area3extraFee**3권역 추가 배송비 (integer<int32>)

"제주 외 도서산간" 지역 추가 배송비. deliveryAreaType이 3권역인 경우 필수.
묶음배송 가능 여부가 true인 경우 묶음배송 그룹에 설정된 값이 적용됩니다.(배송 속성이 ARRIVAL_GUARANTEE인 경우 제외).

**Possible values:** `<= 200000`

**differentialFeeByArea**지역별 차등 배송비 정보 (string)

**claimDeliveryInfo** 클레임(반품/교환) 정보 (object)required

클레임(반품/교환) 정보

**returnDeliveryCompanyPriorityType**반품 택배사 우선순위 타입 (string)

미입력 시 '기본 반품 택배사(PRIMARY)'로 설정됩니다.

**Possible values:** [`PRIMARY`, `SECONDARY_1`, `SECONDARY_2`, `SECONDARY_3`, `SECONDARY_4`, `SECONDARY_5`, `SECONDARY_6`, `SECONDARY_7`, `SECONDARY_8`, `SECONDARY_9`]

**returnDeliveryFee**반품 배송비 (integer<int32>)required

**Possible values:** `<= 1000000`

**exchangeDeliveryFee**교환 배송비 (integer<int32>)required

**Possible values:** `<= 1000000`

**shippingAddressId**출고지 주소록 번호 (integer<int64>)

배송 속성이 ARRIVAL_GUARANTEE(N배송)인 경우 null로 입력합니다.

**returnAddressId**반품/교환지 주소록 번호 (integer<int64>)

**freeReturnInsuranceYn**반품안심케어 설정 (boolean)

**installation**설치 여부 (boolean)

배송 속성이 HOPE_SELLER_GUARANTEE(N희망일배송)인 경우에만 필수. 미입력 시 false로 설정됩니다. 그 외 배송 속성에 입력한 경우 무시됩니다.

**installationFee**별도 설치비 유무 (boolean)

설치 여부가 false이면 별도 설치비 유무는 입력한 값에 관계 없이 false로 설정됩니다.

**expectedDeliveryPeriodType**주문 제작 상품 발송 예정일 타입 코드 (string)

ETC는 상품 수정에만 사용 가능하며, 이미 저장된 '주문 후 예상 발송 기간' 값이 존재하거나 '직접 입력형'인 경우 설정 가능합니다.

- ETC(직접 입력형), TWO(선택형: 2일), THREE(선택형: 3일), FOUR(선택형: 4일), FIVE(선택형: 5일), SIX(선택형: 6일), SEVEN(선택형: 7일), EIGHT(선택형: 8일), NINE(선택형: 9일), TEN(선택형: 10일), ELEVEN(선택형: 11일), TWELVE(선택형: 12일), THIRTEEN(선택형: 13일 ), FOURTEEN(선택형: 14일)

**Possible values:** [`ETC`, `TWO`, `THREE`, `FOUR`, `FIVE`, `SIX`, `SEVEN`, `EIGHT`, `NINE`, `TEN`, `ELEVEN`, `TWELVE`, `THIRTEEN`, `FOURTEEN`]

**expectedDeliveryPeriodDirectInput**발송 예정일 직접 입력 값 (string)

**todayStockQuantity**오늘출발 상품 재고 수량 (integer<int32>)

**customProductAfterOrderYn**주문 확인 후 제작 상품 여부 (boolean)

**hopeDeliveryGroupId**희망일배송 그룹 번호 (integer<int64>)

배송 속성 타입 코드가 희망일배송이고 희망일배송 그룹 번호가 Null이면 기본 그룹으로 저장됩니다.

**businessCustomsClearanceSaleYn**사업자 통관 판매 여부 (boolean)

출고지 주소가 해외인 경우에만 적용됩니다. 미입력 시 false로 입력됩니다.

**saleStartDate**판매 시작 일시 (string<date-time>)

매 시각 00분으로만 설정 가능합니다. 'yyyy-MM-dd'T'HH:mm[:ss][.SSS]XXX' 형식으로 입력합니다.

**saleEndDate**판매 종료 일시 (string<date-time>)

매 시각 59분으로만 설정 가능합니다. 'yyyy-MM-dd'T'HH:mm[:ss][.SSS]XXX' 형식으로 입력합니다.

**productCertificationInfos** 인증 정보 목록 (object)[]

'어린이제품 인증 대상' 카테고리 상품인 경우 필수

**certificationInfoId**인증 유형 ID (integer<int64>)required

**certificationKindType**인증 정보 종류 코드 (string)

인증 정보 종류 필드에 설정 가능한 코드입니다. 미입력 시 ETC로 저장됩니다.

- KC_CERTIFICATION(KC 인증), CHILD_CERTIFICATION(어린이제품 인증), GREEN_PRODUCTS(친환경 인증), OVERSEAS(구매대행(구매대행 선택 시 인증 정보 필수 등록)), PARALLEL_IMPORT(병행수입(병행수입 선택 시 인증 정보 필수 등록)), ETC(기타 인증)

**Possible values:** [`KC_CERTIFICATION`, `CHILD_CERTIFICATION`, `GREEN_PRODUCTS`, `PARALLEL_IMPORT`, `OVERSEAS`, `ETC`]

**name**인증 기관명 (string)required

어린이제품/생활용품/전기용품 공급자적합성 유형인 경우 비필수

**certificationNumber**인증번호 (string)required

어린이제품/생활용품/전기용품 공급자적합성 유형인 경우 비필수

**certificationMark**인증마크 사용 여부 (boolean)

미입력 시 false로 저장됩니다.

**companyName**인증 상호명 (string)

인증 유형이 방송통신기자재 적합인증/적합등록/잠정인증, 어린이제품 안전인증/안전확인인 경우 필수

**certificationDate**인증 일자 (string<date>)

'yyyy-MM-dd' 형식 입력

**certificationTargetExcludeContent** 인증 대상 제외 여부 정보 (object)

인증 대상 제외 여부 정보

**childCertifiedProductExclusionYn**어린이제품 인증 대상 제외 여부 (boolean)

어린이제품 인증 대상 카테고리 상품인 경우 필수. 미입력 시 false로 저장됩니다.

**kcExemptionType**KC 면제 대상 타입 코드 (string)

안전기준준수, 구매대행, 병행수입인 경우 필수 입력

- SAFE_CRITERION(안전기준준수대상(안전기준준수대상 예외 카테고리가 아닌 경우에도 설정 가능, 식품 카테고리 외)), OVERSEAS(구매대행), PARALLEL_IMPORT(병행수입)

**Possible values:** [`OVERSEAS`, `SAFE_CRITERION`, `PARALLEL_IMPORT`]

**kcCertifiedProductExclusionYn**KC 상품 인증 대상 제외 타입 (string)

'KC 인증 대상' 카테고리 상품인 경우 필수, 미입력 시 FALSE로 저장됩니다.

- TRUE(KC 인증 대상 아님), FALSE(KC 인증 대상), KC_EXEMPTION_OBJECT(안전기준준수, 구매대행, 병행수입인 경우 필수 입력)

**Possible values:** [`FALSE`, `KC_EXEMPTION_OBJECT`, `TRUE`]

**greenCertifiedProductExclusionYn**친환경 인증 대상 제외 여부 (boolean)

'친환경 인증 대상' 카테고리 상품인 경우 필수, 미입력 시 false로 저장됩니다.

**purchaseQuantityInfo** 구매 수량 설정 정보 (object)

구매 수량 정보

**maxPurchaseQuantityPerId**1인 최대 구매 수량 (integer<int32>)

**Possible values:** `<= 10000`

**maxPurchaseQuantityPerOrder**1회 최대 구매 수량 (integer<int32>)

**Possible values:** `<= 99999999`

**sellerCodeInfo** 판매자 코드 정보 (object)

판매자 코드 정보

**sellerManagementCode**판매자 관리 코드 (string)

**sellerBarcode**판매자 바코드 (string)

**sellerCustomCode1**판매자 내부 코드 1 (string)

판매자가 내부에서 사용하는 코드

**sellerCustomCode2**판매자 내부 코드 2 (string)

판매자가 내부에서 사용하는 코드

**detailContentTempId**상품별 상품상세 정보 임시ID (integer<int64>)

그룹상품 하위의 상품들에 서로 다른 상품상세 정보를 입력/수정하는 경우 사용합니다.
'상품상세 임시저장 API'를 활용하여 등록하고자 하는 상품상세 정보를 먼저 등록한 뒤, 반환받은 tempId를 그룹상품 등록/수정API의 detailContentTempId에 입력합니다. (발급받은 tempId는 1시간 동안 유효합니다.)
그룹상품 등록 시, 상품상세 정보는 commonDetailContent 또는 detailContentTempId를 사용하여 필수로 입력해야 하며, detailContentTempId를 사용하는 경우에는 그룹상품 하위 모든 상품에 값이 입력되어 있어야 합니다. (일부 상품에만 입력 불가)
그룹상품 수정API에서 값이 생략된 경우에는 기존에 저장되어 있던 그룹상품의 상품별 상품상세 정보가 유지됩니다.
그룹상품 내 모든 상품에 동일한 상품상세 정보를 입력/수정하는 경우에는 commonDetailContent를 사용할 수 있으며, commonDetailContent와 detailTempId가 모두 입력된 경우에는 commonDetailContent가 우선적으로 등록됩니다.

**originAreaInfo** 원산지 정보 (object)required

원산지 정보

**originAreaCode**원산지 상세 지역 코드 (string)required

- 00(국산), 01(원양산), 02(수입산), 03(기타-상세 설명에 표시), 04(기타-직접 입력), 05(원산지 표기 의무 대상 아님)

**importer**수입사명 (string)

수입산인 경우 필수

**content**원산지 표시 내용 (string)

originAreaCode가 '기타: 직접 입력'인 경우 필수

**plural**복수 원산지 여부 (boolean)

원산지가 다른 상품을 같이 등록하는지 여부. 미입력 시 false로 저장됩니다.

**customProductYn**맞춤제작 상품여부 (boolean)

**manufactureDate**제조일자 (string<date>)

인증 유형이 방송통신기자재 적합인증/적합등록/잠정인증인 경우 필수
'yyyy-MM-dd' 형식 입력.

**validDate**유효일자 (string<date>)

'yyyy-MM-dd' 형식 입력.

**releaseDate**출시일자 (string<date>)

최초 1회만 입력 가능(수정/삭제 불가능). 'yyyy-MM-dd' 형식 입력. 브랜드스토어 대상 한정.
'yyyy-MM-dd' 형식 입력.

**purchaseReviewInfo** 구매평 정보 (object)

리뷰 노출 설정 정보

**purchaseReviewExposure**리뷰 노출 여부 (boolean)

구매평 노출 설정 가능 카테고리일 경우(식품)에만 유효하며 그 외에는 true로 설정됩니다. 미입력 시 true로 저장됩니다.

**reviewUnExposeReason**리뷰 미노출 사유 (string)

리뷰 노출 여부가 true일 경우 빈 값으로 저장됩니다.
리뷰 노출 여부가 false일 경우 리뷰 미노출 사유를 입력해야 합니다.

**unitCapacity** 단위용량 (object)

단위 가격

**unitPriceYn**단위 가격 사용 여부 (boolean)

**totalCapacityValue**총 용량 (number)

**unitCapacity**표시 용량 (integer<int32>)

**indicationUnit**표시 단위 (string)

**smartstoreChannelProduct** 스마트스토어 그룹 채널 상품 (object)

**channelProductNo**채널 상품번호 (integer<int64>)

상품 등록이 완료된 후 반환되는 값으로, 기존에 그룹상품에 등록되어 있던 상품을 수정하는 경우에 입력합니다.
상품 등록 시점 또는 그룹상품 수정 API에서 신규 판매 옵션을 추가하는 경우에는 입력된 값이 무시됩니다.

**storeKeepExclusiveProduct**알림받기 동의 회원 전용 상품 여부 (boolean)

미입력 시 false로 저장됩니다.

**naverShoppingRegistration**네이버 쇼핑 등록 여부 (boolean)required

네이버 쇼핑 광고주가 아닌 경우에는 false로 저장됩니다.

**promotionText**추가 문구 (string)

등록 시 상품명 앞에 노출되며, 추가 문구를 포함한 노출 상품명은 최대 100자까지 입력 가능합니다.

**channelProductDisplayStatusType**전시 상태 코드(스마트스토어 채널 전용) (string)required

ON, SUSPENSION만 입력 가능합니다.

- WAIT(전시 대기), ON(전시 중), SUSPENSION(전시 중지)

**Possible values:** [`WAIT`, `ON`, `SUSPENSION`]

**windowChannelProduct** 윈도 그룹 채널상품 (object)

**channelProductNo**채널 상품번호 (integer<int64>)

상품 등록이 완료된 후 반환되는 값으로, 기존에 그룹상품에 등록되어 있던 상품을 수정하는 경우에 입력합니다.
상품 등록 시점 또는 그룹상품 수정 API에서 신규 판매 옵션을 추가하는 경우에는 입력된 값이 무시됩니다.

**storeKeepExclusiveProduct**알림받기 동의 회원 전용 상품 여부 (boolean)

미입력 시 false로 저장됩니다.

**naverShoppingRegistration**네이버 쇼핑 등록 여부 (boolean)required

네이버 쇼핑 광고주가 아닌 경우에는 false로 저장됩니다.

**promotionText**추가 문구 (string)

등록 시 상품명 앞에 노출되며, 추가 문구를 포함한 노출 상품명은 최대 100자까지 입력 가능합니다.

**smartstoreGroupChannel** 스마트스토어 그룹상품 공통 채널 정보 (object)

**bbsSeq**콘텐츠 게시글 일련번호 (integer<int64>)

공지사항

**windowGroupChannel** 윈도 그룹상품 채널 정보 (object)

**bbsSeq**콘텐츠 게시글 일련번호 (integer<int64>)

공지사항

**channelNo**윈도 채널 상품 채널 번호 (integer<int64>)required

전시할 윈도 채널 선택

**best**베스트 여부(윈도 채널 전용) (boolean)

미입력 시 false로 저장됩니다.

## Responses

**PUT** `/v2/standard-group-products/{groupProductNo}` — 응답
성공

**progress** 그룹상품 요청 진행 상황 (object)

**state**요청 결과 (string)

- QUEUED: 상품 등록/수정 대기 중
- IN PROGRESS: 상품 등록/수정 진행 중
- COMPLETED: 상품 등록/수정 완료
- ALREADY_RESERVED: 동일 계정에서 이미 다른 요청이 진행 중
- FAILED: 상품 등록/수정 실패
- ERROR: 시스템 오류

**Possible values:** [`QUEUED`, `IN_PROGRESS`, `COMPLETED`, `ALREADY_RESERVED`, `ERROR`, `FAILED`]

**invalidInputs** 잘못된 입력값 목록 (object)[]

**name**string

**type**string

**message**string

**errorMessage**잘못된 입력값 메세지 (string)

**progress**요청 진행률 (integer<int32>)

**requestId**요청 ID (string)

요청을 식별하기 위한 고유 ID입니다. 처리 상태와 진행 상황을 조회할 수 있습니다.

**groupProductNo**그룹상품번호 (integer<int64>)

**productNos** 그룹상품 등록/수정 상품번호 응답 (object)[]

**originProductNo**원상품번호 (integer<int64>)

**smartstoreChannelProductNo**스마트스토어 채널 상품번호 (integer<int64>)

**windowChannelProductNo**윈도 채널 상품번호 (integer<int64>)

**standardPurchaseOptionsIds** 그룹상품 판매옵션정보 응답 (object)[]

**originProductNo**원상품번호 (integer<int64>)

**standardPurchaseOptionsIds** 판매옵션정보 (object)[]

**optionId**판매옵션 ID (integer<int64>)

**valueName**판매 옵션값명 (string)

```json
{
  "progress": {
    "state": "QUEUED",
    "invalidInputs": [
      {
        "name": "string",
        "type": "string",
        "message": "string"
      }
    ],
    "errorMessage": "string",
    "progress": 0
  },
  "requestId": "string",
  "groupProductNo": 0,
  "productNos": [
    {
      "originProductNo": 0,
      "smartstoreChannelProductNo": 0,
      "windowChannelProductNo": 0
    }
  ],
  "standardPurchaseOptionsIds": [
    {
      "originProductNo": 0,
      "standardPurchaseOptionsIds": [
        {
          "optionId": 0,
          "valueName": "string"
        }
      ]
    }
  ]
}
```

리디렉션  
- code : PERMANENT_REDIRECT

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

**name**string

**type**string

**message**string

**timestamp**string<date-time>

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "type": "string",
      "message": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z"
}
```

잘못된 요청  
- code : BAD_REQUEST

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

**name**string

**type**string

**message**string

**timestamp**string<date-time>

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "type": "string",
      "message": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z"
}
```

인가되지 않은 요청  
- code : UNAUTHORIZED

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

**name**string

**type**string

**message**string

**timestamp**string<date-time>

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "type": "string",
      "message": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z"
}
```

권한 없음  
- code : FORBIDDEN

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

**name**string

**type**string

**message**string

**timestamp**string<date-time>

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "type": "string",
      "message": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z"
}
```

데이터 없음  
- code : NOT_FOUND

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

**name**string

**type**string

**message**string

**timestamp**string<date-time>

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "type": "string",
      "message": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z"
}
```

내부 서버 오류  
- code : INTERNAL_SERVER_ERROR

**code**string

**message**string

**invalidInputs** 잘못된 입력값 목록 (object)[]

**name**string

**type**string

**message**string

**timestamp**string<date-time>

```json
{
  "code": "string",
  "message": "string",
  "invalidInputs": [
    {
      "name": "string",
      "type": "string",
      "message": "string"
    }
  ],
  "timestamp": "2024-07-29T15:51:28.071Z"
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
curl -L -X PUT 'https://api.commerce.naver.com/external/v2/standard-group-products/:groupProductNo' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json;charset=UTF-8' \
-H 'Authorization: Bearer <token>' \
-d '{
  "groupProduct": {
    "leafCategoryId": "string",
    "name": "string",
    "guideId": 0,
    "brandName": "string",
    "brandId": 0,
    "manufacturerName": "string",
    "itselfProductionProductYn": true,
    "taxType": "TAX",
    "customsTaxType": "NOT_APPLICABLE",
    "saleType": "NEW",
    "minorPurchasable": true,
    "brandCertificationYn": true,
    "productInfoProvidedNotice": {
      "productInfoProvidedNoticeType": "WEAR",
      "wear": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "material": "string",
        "color": "string",
        "size": "string",
        "manufacturer": "string",
        "caution": "string",
        "packDate": "string",
        "packDateText": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "shoes": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "material": "string",
        "color": "string",
        "size": "string",
        "height": "string",
        "manufacturer": "string",
        "caution": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "bag": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "type": "string",
        "material": "string",
        "color": "string",
        "size": "string",
        "manufacturer": "string",
        "caution": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "fashionItems": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "type": "string",
        "material": "string",
        "size": "string",
        "manufacturer": "string",
        "caution": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "sleepingGear": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "material": "string",
        "color": "string",
        "size": "string",
        "components": "string",
        "manufacturer": "string",
        "caution": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "furniture": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "certificationType": "string",
        "color": "string",
        "components": "string",
        "material": "string",
        "manufacturer": "string",
        "importer": "string",
        "producer": "string",
        "size": "string",
        "installedCharge": "string",
        "warrantyPolicy": "string",
        "refurb": "string",
        "afterServiceDirector": "string"
      },
      "imageAppliances": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "certificationType": "string",
        "ratedVoltage": "string",
        "powerConsumption": "string",
        "energyEfficiencyRating": "string",
        "releaseDate": "string",
        "releaseDateText": "string",
        "manufacturer": "string",
        "size": "string",
        "additionalCost": "string",
        "displaySpecification": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "homeAppliances": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "certificationType": "string",
        "ratedVoltage": "string",
        "powerConsumption": "string",
        "energyEfficiencyRating": "string",
        "releaseDate": "string",
        "releaseDateText": "string",
        "manufacturer": "string",
        "size": "string",
        "additionalCost": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "seasonAppliances": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "certificationType": "string",
        "ratedVoltage": "string",
        "powerConsumption": "string",
        "energyEfficiencyRating": "string",
        "releaseDate": {
          "year": 0,
          "month": "JANUARY",
          "monthValue": 0,
          "leapYear": true
        },
        "releaseDateText": "string",
        "manufacturer": "string",
        "size": "string",
        "area": "string",
        "installedCharge": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "officeAppliances": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "certificationType": "string",
        "ratedVoltage": "string",
        "powerConsumption": "string",
        "energyEfficiencyRating": "string",
        "releaseDate": {
          "year": 0,
          "month": "JANUARY",
          "monthValue": 0,
          "leapYear": true
        },
        "releaseDateText": "string",
        "manufacturer": "string",
        "size": "string",
        "weight": "string",
        "specification": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "opticsAppliances": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "certificationType": "string",
        "releaseDate": "string",
        "releaseDateText": "string",
        "manufacturer": "string",
        "size": "string",
        "weight": "string",
        "specification": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "microElectronics": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "certificationType": "string",
        "ratedVoltage": "string",
        "powerConsumption": "string",
        "releaseDate": "string",
        "releaseDateText": "string",
        "manufacturer": "string",
        "size": "string",
        "weight": "string",
        "specification": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "navigation": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "certificationType": "string",
        "ratedVoltage": "string",
        "powerConsumption": "string",
        "releaseDate": "string",
        "releaseDateText": "string",
        "manufacturer": "string",
        "size": "string",
        "weight": "string",
        "specification": "string",
        "updateCost": "string",
        "freeCostPeriod": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "carArticles": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "releaseDate": "string",
        "releaseDateText": "string",
        "certificationType": "string",
        "caution": "string",
        "manufacturer": "string",
        "size": "string",
        "applyModel": "string",
        "warrantyPolicy": "string",
        "roadWorthyCertification": "string",
        "afterServiceDirector": "string"
      },
      "medicalAppliances": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "licenceNo": "string",
        "advertisingCertificationType": "string",
        "ratedVoltage": "string",
        "powerConsumption": "string",
        "releaseDate": "string",
        "releaseDateText": "string",
        "manufacturer": "string",
        "purpose": "string",
        "usage": "string",
        "caution": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "kitchenUtensils": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "material": "string",
        "component": "string",
        "size": "string",
        "releaseDate": "string",
        "releaseDateText": "string",
        "manufacturer": "string",
        "producer": "string",
        "importDeclaration": true,
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "cosmetic": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "capacity": "string",
        "specification": "string",
        "expirationDate": "string",
        "expirationDateText": "string",
        "usage": "string",
        "manufacturer": "string",
        "producer": "string",
        "distributor": "string",
        "customizedDistributor": "string",
        "mainIngredient": "string",
        "certificationType": "string",
        "caution": "string",
        "warrantyPolicy": "string",
        "customerServicePhoneNumber": "string"
      },
      "jewellery": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "material": "string",
        "purity": "string",
        "bandMaterial": "string",
        "weight": "string",
        "manufacturer": "string",
        "producer": "string",
        "size": "string",
        "caution": "string",
        "specification": "string",
        "provideWarranty": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "food": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "foodItem": "string",
        "weight": "string",
        "amount": "string",
        "size": "string",
        "packDate": "2024-07-29",
        "packDateText": "string",
        "consumptionDate": "2024-07-29",
        "consumptionDateText": "string",
        "producer": "string",
        "relevantLawContent": "string",
        "productComposition": "string",
        "keep": "string",
        "adCaution": "string",
        "customerServicePhoneNumber": "string"
      },
      "generalFood": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "productName": "string",
        "foodType": "string",
        "producer": "string",
        "location": "string",
        "packDate": "2024-07-29",
        "packDateText": "string",
        "consumptionDate": "2024-07-29",
        "consumptionDateText": "string",
        "weight": "string",
        "amount": "string",
        "ingredients": "string",
        "nutritionFacts": "string",
        "geneticallyModified": true,
        "consumerSafetyCaution": "string",
        "importDeclarationCheck": true,
        "customerServicePhoneNumber": "string"
      },
      "dietFood": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "productName": "string",
        "producer": "string",
        "location": "string",
        "consumptionDate": "2024-07-29",
        "consumptionDateText": "string",
        "storageMethod": "string",
        "weight": "string",
        "amount": "string",
        "ingredients": "string",
        "nutritionFacts": "string",
        "specification": "string",
        "cautionAndSideEffect": "string",
        "nonMedicinalUsesMessage": "string",
        "geneticallyModified": true,
        "importDeclarationCheck": true,
        "consumerSafetyCaution": "string",
        "customerServicePhoneNumber": "string"
      },
      "kids": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "certificationType": "string",
        "size": "string",
        "weight": "string",
        "color": "string",
        "material": "string",
        "recommendedAge": "string",
        "releaseDate": "string",
        "releaseDateText": "string",
        "manufacturer": "string",
        "caution": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string",
        "numberLimit": "string"
      },
      "musicalInstrument": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "size": "string",
        "color": "string",
        "material": "string",
        "components": "string",
        "releaseDate": "string",
        "releaseDateText": "string",
        "manufacturer": "string",
        "detailContent": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "sportsEquipment": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "certificationType": "string",
        "size": "string",
        "weight": "string",
        "color": "string",
        "material": "string",
        "components": "string",
        "releaseDate": {
          "year": 0,
          "month": "JANUARY",
          "monthValue": 0,
          "leapYear": true
        },
        "releaseDateText": "string",
        "manufacturer": "string",
        "detailContent": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "books": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "title": "string",
        "author": "string",
        "publisher": "string",
        "size": "string",
        "pages": "string",
        "components": "string",
        "publishDate": "2024-07-29",
        "publishDateText": "string",
        "description": "string"
      },
      "rentalEtc": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "ownershipTransferCondition": "string",
        "payingForLossOrDamage": "string",
        "refundPolicyForCancel": "string",
        "customerServicePhoneNumber": "string"
      },
      "rentalHa": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "ownershipTransferCondition": "string",
        "payingForLossOrDamage": "string",
        "refundPolicyForCancel": "string",
        "customerServicePhoneNumber": "string",
        "maintenance": "string",
        "specification": "string"
      },
      "digitalContents": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "producer": "string",
        "termsOfUse": "string",
        "usePeriod": "string",
        "medium": "string",
        "requirement": "string",
        "cancelationPolicy": "string",
        "customerServicePhoneNumber": "string"
      },
      "giftCard": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "issuer": "string",
        "periodStartDate": "2024-07-29",
        "periodEndDate": "2024-07-29",
        "periodDays": 0,
        "termsOfUse": "string",
        "useStorePlace": "string",
        "useStoreAddressId": 0,
        "useStoreUrl": "string",
        "refundPolicy": "string",
        "customerServicePhoneNumber": "string"
      },
      "mobileCoupon": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "issuer": "string",
        "usableCondition": "string",
        "usableStore": "string",
        "cancelationPolicy": "string",
        "customerServicePhoneNumber": "string"
      },
      "movieShow": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "sponsor": "string",
        "actor": "string",
        "rating": "string",
        "showTime": "string",
        "showPlace": "string",
        "cancelationCondition": "string",
        "cancelationPolicy": "string",
        "customerServicePhoneNumber": "string"
      },
      "etcService": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "serviceProvider": "string",
        "certificateDetails": "string",
        "usableCondition": "string",
        "cancelationStandard": "string",
        "cancelationPolicy": "string",
        "customerServicePhoneNumber": "string"
      },
      "biochemistry": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "productName": "string",
        "dosageForm": "string",
        "packDate": "string",
        "packDateText": "string",
        "expirationDate": "string",
        "expirationDateText": "string",
        "weight": "string",
        "effect": "string",
        "importer": "string",
        "producer": "string",
        "manufacturer": "string",
        "childProtection": "string",
        "chemicals": "string",
        "caution": "string",
        "safeCriterionNo": "string",
        "customerServicePhoneNumber": "string"
      },
      "biocidal": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "productName": "string",
        "weight": "string",
        "effect": "string",
        "rangeOfUse": "string",
        "importer": "string",
        "producer": "string",
        "manufacturer": "string",
        "childProtection": "string",
        "harmfulChemicalSubstance": "string",
        "maleficence": "string",
        "caution": "string",
        "approvalNumber": "string",
        "customerServicePhoneNumber": "string",
        "expirationDate": "2024-07-29",
        "expirationDateText": "string"
      },
      "cellPhone": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "certificationType": "string",
        "releaseDate": "string",
        "releaseDateText": "string",
        "manufacturer": "string",
        "importer": "string",
        "producer": "string",
        "size": "string",
        "weight": "string",
        "telecomType": "string",
        "joinProcess": "string",
        "extraBurden": "string",
        "specification": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "etc": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "certificateDetails": "string",
        "manufacturer": "string",
        "afterServiceDirector": "string",
        "customerServicePhoneNumber": "string"
      }
    },
    "afterServiceInfo": {
      "afterServiceTelephoneNumber": "string",
      "afterServiceGuideContent": "string"
    },
    "sellerCommentContent": "string",
    "supplementProductInfo": {
      "sortType": "CREATE",
      "supplementProducts": [
        {
          "id": 0,
          "groupName": "string",
          "name": "string",
          "price": 0,
          "stockQuantity": 0,
          "sellerManagementCode": "string",
          "usable": true
        }
      ]
    },
    "seoInfo": {
      "pageTitle": "string",
      "metaDescription": "string",
      "sellerTags": [
        {
          "code": 0,
          "text": "string"
        }
      ]
    },
    "commonDetailContent": "string",
    "productSize": {
      "sizeTypeNo": 0,
      "sizeAttributes": [
        {
          "name": "string",
          "sizeValues": [
            {
              "sizeValueTypeNo": 0,
              "value": 0
            }
          ]
        }
      ],
      "productFashionModels": [
        {
          "modelId": 0
        }
      ]
    },
    "specificProducts": [
      {
        "originProductNo": 0,
        "standardPurchaseOptions": [
          {
            "optionId": 0,
            "valueName": "string",
            "valueOrder": 0,
            "colorCodes": [
              "string"
            ]
          }
        ],
        "salePrice": 0,
        "productLogistics": [
          {
            "logisticsCompanyId": "string"
          }
        ],
        "skuYn": true,
        "stockQuantity": 0,
        "modelInfo": {
          "modelId": 0,
          "modelName": "string"
        },
        "manufactureDefineNo": "string",
        "immediateDiscountPolicy": {
          "discountMethod": {
            "value": 0,
            "unitType": "PERCENT",
            "startDate": "2024-07-29T15:51:28.071Z",
            "endDate": "2024-07-29T15:51:28.071Z"
          }
        },
        "reservedDiscountPolicy": {
          "discountMethod": {
            "value": 0,
            "unitType": "PERCENT",
            "startDate": "2024-07-29T15:51:28.071Z",
            "endDate": "2024-07-29T15:51:28.071Z"
          }
        },
        "customerBenefit": {
          "purchasePointPolicy": {
            "value": 0,
            "unitType": "PERCENT",
            "startDate": "2024-07-29",
            "endDate": "2024-07-29"
          },
          "reviewPointPolicy": {
            "textReviewPoint": 0,
            "photoVideoReviewPoint": 0,
            "afterUseTextReviewPoint": 0,
            "afterUsePhotoVideoReviewPoint": 0,
            "storeMemberReviewPoint": 0,
            "startDate": "2024-07-29",
            "endDate": "2024-07-29"
          },
          "freeInterestPolicy": {
            "value": 0,
            "startDate": "2024-07-29",
            "endDate": "2024-07-29"
          },
          "giftPolicy": {
            "presentContent": "string"
          },
          "multiPurchaseDiscountPolicy": {
            "discountMethod": {
              "value": 0,
              "unitType": "PERCENT",
              "startDate": "2024-07-29",
              "endDate": "2024-07-29"
            },
            "orderValue": 0,
            "orderValueUnitType": "PERCENT"
          },
          "eventPhraseCont": "string"
        },
        "images": {
          "representativeImage": {
            "url": "string"
          },
          "optionalImages": [
            {
              "url": "string"
            }
          ]
        },
        "productAttributes": [
          {
            "attributeSeq": 0,
            "attributeValueSeq": 0,
            "attributeRealValue": "string",
            "attributeRealValueUnitCode": "string"
          }
        ],
        "deliveryInfo": {
          "deliveryType": "DELIVERY",
          "deliveryAttributeType": "NORMAL",
          "deliveryCompany": "string",
          "outboundLocationId": "string",
          "deliveryBundleGroupUsable": true,
          "deliveryBundleGroupId": 0,
          "quickServiceAreas": [
            "SEOUL"
          ],
          "visitAddressId": 0,
          "deliveryFee": {
            "deliveryFeeType": "FREE",
            "baseFee": 0,
            "freeConditionalAmount": 0,
            "repeatQuantity": 0,
            "secondBaseQuantity": 0,
            "secondExtraFee": 0,
            "thirdBaseQuantity": 0,
            "thirdExtraFee": 0,
            "deliveryFeePayType": "COLLECT",
            "deliveryFeeByArea": {
              "deliveryAreaType": "AREA_2",
              "area2extraFee": 0,
              "area3extraFee": 0
            },
            "differentialFeeByArea": "string"
          },
          "claimDeliveryInfo": {
            "returnDeliveryCompanyPriorityType": "PRIMARY",
            "returnDeliveryFee": 0,
            "exchangeDeliveryFee": 0,
            "shippingAddressId": 0,
            "returnAddressId": 0,
            "freeReturnInsuranceYn": true
          },
          "installation": true,
          "installationFee": true,
          "expectedDeliveryPeriodType": "ETC",
          "expectedDeliveryPeriodDirectInput": "string",
          "todayStockQuantity": 0,
          "customProductAfterOrderYn": true,
          "hopeDeliveryGroupId": 0,
          "businessCustomsClearanceSaleYn": true
        },
        "saleStartDate": "2024-07-29T15:51:28.071Z",
        "saleEndDate": "2024-07-29T15:51:28.071Z",
        "productCertificationInfos": [
          {
            "certificationInfoId": 0,
            "certificationKindType": "KC_CERTIFICATION",
            "name": "string",
            "certificationNumber": "string",
            "certificationMark": true,
            "companyName": "string",
            "certificationDate": "2024-07-29"
          }
        ],
        "certificationTargetExcludeContent": {
          "childCertifiedProductExclusionYn": true,
          "kcExemptionType": "OVERSEAS",
          "kcCertifiedProductExclusionYn": "FALSE",
          "greenCertifiedProductExclusionYn": true
        },
        "purchaseQuantityInfo": {
          "maxPurchaseQuantityPerId": 0,
          "maxPurchaseQuantityPerOrder": 0
        },
        "sellerCodeInfo": {
          "sellerManagementCode": "string",
          "sellerBarcode": "string",
          "sellerCustomCode1": "string",
          "sellerCustomCode2": "string"
        },
        "detailContentTempId": 0,
        "originAreaInfo": {
          "originAreaCode": "string",
          "importer": "string",
          "content": "string",
          "plural": true
        },
        "customProductYn": true,
        "manufactureDate": "2024-07-29",
        "validDate": "2024-07-29",
        "releaseDate": "2024-07-29",
        "purchaseReviewInfo": {
          "purchaseReviewExposure": true,
          "reviewUnExposeReason": "string"
        },
        "unitCapacity": {
          "unitPriceYn": true,
          "totalCapacityValue": 0,
          "unitCapacity": 0,
          "indicationUnit": "string"
        },
        "smartstoreChannelProduct": {
          "channelProductNo": 0,
          "storeKeepExclusiveProduct": true,
          "naverShoppingRegistration": true,
          "promotionText": "string",
          "channelProductDisplayStatusType": "WAIT"
        },
        "windowChannelProduct": {
          "channelProductNo": 0,
          "storeKeepExclusiveProduct": true,
          "naverShoppingRegistration": true,
          "promotionText": "string"
        }
      }
    ],
    "smartstoreGroupChannel": {
      "bbsSeq": 0
    },
    "windowGroupChannel": {
      "bbsSeq": 0,
      "channelNo": 0,
      "best": true
    }
  }
}'
```




https://api.commerce.naver.com/external



Parameters

groupProductNo — pathrequired

Body required

```json
{
  "groupProduct": {
    "leafCategoryId": "string",
    "name": "string",
    "guideId": 0,
    "brandName": "string",
    "brandId": 0,
    "manufacturerName": "string",
    "itselfProductionProductYn": true,
    "taxType": "TAX",
    "customsTaxType": "NOT_APPLICABLE",
    "saleType": "NEW",
    "minorPurchasable": true,
    "brandCertificationYn": true,
    "productInfoProvidedNotice": {
      "productInfoProvidedNoticeType": "WEAR",
      "wear": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "material": "string",
        "color": "string",
        "size": "string",
        "manufacturer": "string",
        "caution": "string",
        "packDate": "string",
        "packDateText": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "shoes": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "material": "string",
        "color": "string",
        "size": "string",
        "height": "string",
        "manufacturer": "string",
        "caution": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "bag": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "type": "string",
        "material": "string",
        "color": "string",
        "size": "string",
        "manufacturer": "string",
        "caution": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "fashionItems": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "type": "string",
        "material": "string",
        "size": "string",
        "manufacturer": "string",
        "caution": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "sleepingGear": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "material": "string",
        "color": "string",
        "size": "string",
        "components": "string",
        "manufacturer": "string",
        "caution": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "furniture": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "certificationType": "string",
        "color": "string",
        "components": "string",
        "material": "string",
        "manufacturer": "string",
        "importer": "string",
        "producer": "string",
        "size": "string",
        "installedCharge": "string",
        "warrantyPolicy": "string",
        "refurb": "string",
        "afterServiceDirector": "string"
      },
      "imageAppliances": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "certificationType": "string",
        "ratedVoltage": "string",
        "powerConsumption": "string",
        "energyEfficiencyRating": "string",
        "releaseDate": "string",
        "releaseDateText": "string",
        "manufacturer": "string",
        "size": "string",
        "additionalCost": "string",
        "displaySpecification": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "homeAppliances": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "certificationType": "string",
        "ratedVoltage": "string",
        "powerConsumption": "string",
        "energyEfficiencyRating": "string",
        "releaseDate": "string",
        "releaseDateText": "string",
        "manufacturer": "string",
        "size": "string",
        "additionalCost": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "seasonAppliances": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "certificationType": "string",
        "ratedVoltage": "string",
        "powerConsumption": "string",
        "energyEfficiencyRating": "string",
        "releaseDate": {
          "year": 0,
          "month": "JANUARY",
          "monthValue": 0,
          "leapYear": true
        },
        "releaseDateText": "string",
        "manufacturer": "string",
        "size": "string",
        "area": "string",
        "installedCharge": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "officeAppliances": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "certificationType": "string",
        "ratedVoltage": "string",
        "powerConsumption": "string",
        "energyEfficiencyRating": "string",
        "releaseDate": {
          "year": 0,
          "month": "JANUARY",
          "monthValue": 0,
          "leapYear": true
        },
        "releaseDateText": "string",
        "manufacturer": "string",
        "size": "string",
        "weight": "string",
        "specification": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "opticsAppliances": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "certificationType": "string",
        "releaseDate": "string",
        "releaseDateText": "string",
        "manufacturer": "string",
        "size": "string",
        "weight": "string",
        "specification": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "microElectronics": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "certificationType": "string",
        "ratedVoltage": "string",
        "powerConsumption": "string",
        "releaseDate": "string",
        "releaseDateText": "string",
        "manufacturer": "string",
        "size": "string",
        "weight": "string",
        "specification": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "navigation": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "certificationType": "string",
        "ratedVoltage": "string",
        "powerConsumption": "string",
        "releaseDate": "string",
        "releaseDateText": "string",
        "manufacturer": "string",
        "size": "string",
        "weight": "string",
        "specification": "string",
        "updateCost": "string",
        "freeCostPeriod": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "carArticles": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "releaseDate": "string",
        "releaseDateText": "string",
        "certificationType": "string",
        "caution": "string",
        "manufacturer": "string",
        "size": "string",
        "applyModel": "string",
        "warrantyPolicy": "string",
        "roadWorthyCertification": "string",
        "afterServiceDirector": "string"
      },
      "medicalAppliances": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "licenceNo": "string",
        "advertisingCertificationType": "string",
        "ratedVoltage": "string",
        "powerConsumption": "string",
        "releaseDate": "string",
        "releaseDateText": "string",
        "manufacturer": "string",
        "purpose": "string",
        "usage": "string",
        "caution": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "kitchenUtensils": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "material": "string",
        "component": "string",
        "size": "string",
        "releaseDate": "string",
        "releaseDateText": "string",
        "manufacturer": "string",
        "producer": "string",
        "importDeclaration": true,
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "cosmetic": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "capacity": "string",
        "specification": "string",
        "expirationDate": "string",
        "expirationDateText": "string",
        "usage": "string",
        "manufacturer": "string",
        "producer": "string",
        "distributor": "string",
        "customizedDistributor": "string",
        "mainIngredient": "string",
        "certificationType": "string",
        "caution": "string",
        "warrantyPolicy": "string",
        "customerServicePhoneNumber": "string"
      },
      "jewellery": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "material": "string",
        "purity": "string",
        "bandMaterial": "string",
        "weight": "string",
        "manufacturer": "string",
        "producer": "string",
        "size": "string",
        "caution": "string",
        "specification": "string",
        "provideWarranty": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "food": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "foodItem": "string",
        "weight": "string",
        "amount": "string",
        "size": "string",
        "packDate": "2024-07-29",
        "packDateText": "string",
        "consumptionDate": "2024-07-29",
        "consumptionDateText": "string",
        "producer": "string",
        "relevantLawContent": "string",
        "productComposition": "string",
        "keep": "string",
        "adCaution": "string",
        "customerServicePhoneNumber": "string"
      },
      "generalFood": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "productName": "string",
        "foodType": "string",
        "producer": "string",
        "location": "string",
        "packDate": "2024-07-29",
        "packDateText": "string",
        "consumptionDate": "2024-07-29",
        "consumptionDateText": "string",
        "weight": "string",
        "amount": "string",
        "ingredients": "string",
        "nutritionFacts": "string",
        "geneticallyModified": true,
        "consumerSafetyCaution": "string",
        "importDeclarationCheck": true,
        "customerServicePhoneNumber": "string"
      },
      "dietFood": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "productName": "string",
        "producer": "string",
        "location": "string",
        "consumptionDate": "2024-07-29",
        "consumptionDateText": "string",
        "storageMethod": "string",
        "weight": "string",
        "amount": "string",
        "ingredients": "string",
        "nutritionFacts": "string",
        "specification": "string",
        "cautionAndSideEffect": "string",
        "nonMedicinalUsesMessage": "string",
        "geneticallyModified": true,
        "importDeclarationCheck": true,
        "consumerSafetyCaution": "string",
        "customerServicePhoneNumber": "string"
      },
      "kids": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "certificationType": "string",
        "size": "string",
        "weight": "string",
        "color": "string",
        "material": "string",
        "recommendedAge": "string",
        "releaseDate": "string",
        "releaseDateText": "string",
        "manufacturer": "string",
        "caution": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string",
        "numberLimit": "string"
      },
      "musicalInstrument": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "size": "string",
        "color": "string",
        "material": "string",
        "components": "string",
        "releaseDate": "string",
        "releaseDateText": "string",
        "manufacturer": "string",
        "detailContent": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "sportsEquipment": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "certificationType": "string",
        "size": "string",
        "weight": "string",
        "color": "string",
        "material": "string",
        "components": "string",
        "releaseDate": {
          "year": 0,
          "month": "JANUARY",
          "monthValue": 0,
          "leapYear": true
        },
        "releaseDateText": "string",
        "manufacturer": "string",
        "detailContent": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "books": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "title": "string",
        "author": "string",
        "publisher": "string",
        "size": "string",
        "pages": "string",
        "components": "string",
        "publishDate": "2024-07-29",
        "publishDateText": "string",
        "description": "string"
      },
      "rentalEtc": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "ownershipTransferCondition": "string",
        "payingForLossOrDamage": "string",
        "refundPolicyForCancel": "string",
        "customerServicePhoneNumber": "string"
      },
      "rentalHa": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "ownershipTransferCondition": "string",
        "payingForLossOrDamage": "string",
        "refundPolicyForCancel": "string",
        "customerServicePhoneNumber": "string",
        "maintenance": "string",
        "specification": "string"
      },
      "digitalContents": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "producer": "string",
        "termsOfUse": "string",
        "usePeriod": "string",
        "medium": "string",
        "requirement": "string",
        "cancelationPolicy": "string",
        "customerServicePhoneNumber": "string"
      },
      "giftCard": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "issuer": "string",
        "periodStartDate": "2024-07-29",
        "periodEndDate": "2024-07-29",
        "periodDays": 0,
        "termsOfUse": "string",
        "useStorePlace": "string",
        "useStoreAddressId": 0,
        "useStoreUrl": "string",
        "refundPolicy": "string",
        "customerServicePhoneNumber": "string"
      },
      "mobileCoupon": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "issuer": "string",
        "usableCondition": "string",
        "usableStore": "string",
        "cancelationPolicy": "string",
        "customerServicePhoneNumber": "string"
      },
      "movieShow": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "sponsor": "string",
        "actor": "string",
        "rating": "string",
        "showTime": "string",
        "showPlace": "string",
        "cancelationCondition": "string",
        "cancelationPolicy": "string",
        "customerServicePhoneNumber": "string"
      },
      "etcService": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "serviceProvider": "string",
        "certificateDetails": "string",
        "usableCondition": "string",
        "cancelationStandard": "string",
        "cancelationPolicy": "string",
        "customerServicePhoneNumber": "string"
      },
      "biochemistry": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "productName": "string",
        "dosageForm": "string",
        "packDate": "string",
        "packDateText": "string",
        "expirationDate": "string",
        "expirationDateText": "string",
        "weight": "string",
        "effect": "string",
        "importer": "string",
        "producer": "string",
        "manufacturer": "string",
        "childProtection": "string",
        "chemicals": "string",
        "caution": "string",
        "safeCriterionNo": "string",
        "customerServicePhoneNumber": "string"
      },
      "biocidal": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "productName": "string",
        "weight": "string",
        "effect": "string",
        "rangeOfUse": "string",
        "importer": "string",
        "producer": "string",
        "manufacturer": "string",
        "childProtection": "string",
        "harmfulChemicalSubstance": "string",
        "maleficence": "string",
        "caution": "string",
        "approvalNumber": "string",
        "customerServicePhoneNumber": "string",
        "expirationDate": "2024-07-29",
        "expirationDateText": "string"
      },
      "cellPhone": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "certificationType": "string",
        "releaseDate": "string",
        "releaseDateText": "string",
        "manufacturer": "string",
        "importer": "string",
        "producer": "string",
        "size": "string",
        "weight": "string",
        "telecomType": "string",
        "joinProcess": "string",
        "extraBurden": "string",
        "specification": "string",
        "warrantyPolicy": "string",
        "afterServiceDirector": "string"
      },
      "etc": {
        "returnCostReason": "string",
        "noRefundReason": "string",
        "qualityAssuranceStandard": "string",
        "compensationProcedure": "string",
        "troubleShootingContents": "string",
        "itemName": "string",
        "modelName": "string",
        "certificateDetails": "string",
        "manufacturer": "string",
        "afterServiceDirector": "string",
        "customerServicePhoneNumber": "string"
      }
    },
    "afterServiceInfo": {
      "afterServiceTelephoneNumber": "string",
      "afterServiceGuideContent": "string"
    },
    "sellerCommentContent": "string",
    "supplementProductInfo": {
      "sortType": "CREATE",
      "supplementProducts": [
        {
          "id": 0,
          "groupName": "string",
          "name": "string",
          "price": 0,
          "stockQuantity": 0,
          "sellerManagementCode": "string",
          "usable": true
        }
      ]
    },
    "seoInfo": {
      "pageTitle": "string",
      "metaDescription": "string",
      "sellerTags": [
        {
          "code": 0,
          "text": "string"
        }
      ]
    },
    "commonDetailContent": "string",
    "productSize": {
      "sizeTypeNo": 0,
      "sizeAttributes": [
        {
          "name": "string",
          "sizeValues": [
            {
              "sizeValueTypeNo": 0,
              "value": 0
            }
          ]
        }
      ],
      "productFashionModels": [
        {
          "modelId": 0
        }
      ]
    },
    "specificProducts": [
      {
        "originProductNo": 0,
        "standardPurchaseOptions": [
          {
            "optionId": 0,
            "valueName": "string",
            "valueOrder": 0,
            "colorCodes": [
              "string"
            ]
          }
        ],
        "salePrice": 0,
        "productLogistics": [
          {
            "logisticsCompanyId": "string"
          }
        ],
        "skuYn": true,
        "stockQuantity": 0,
        "modelInfo": {
          "modelId": 0,
          "modelName": "string"
        },
        "manufactureDefineNo": "string",
        "immediateDiscountPolicy": {
          "discountMethod": {
            "value": 0,
            "unitType": "PERCENT",
            "startDate": "2024-07-29T15:51:28.071Z",
            "endDate": "2024-07-29T15:51:28.071Z"
          }
        },
        "reservedDiscountPolicy": {
          "discountMethod": {
            "value": 0,
            "unitType": "PERCENT",
            "startDate": "2024-07-29T15:51:28.071Z",
            "endDate": "2024-07-29T15:51:28.071Z"
          }
        },
        "customerBenefit": {
          "purchasePointPolicy": {
            "value": 0,
            "unitType": "PERCENT",
            "startDate": "2024-07-29",
            "endDate": "2024-07-29"
          },
          "reviewPointPolicy": {
            "textReviewPoint": 0,
            "photoVideoReviewPoint": 0,
            "afterUseTextReviewPoint": 0,
            "afterUsePhotoVideoReviewPoint": 0,
            "storeMemberReviewPoint": 0,
            "startDate": "2024-07-29",
            "endDate": "2024-07-29"
          },
          "freeInterestPolicy": {
            "value": 0,
            "startDate": "2024-07-29",
            "endDate": "2024-07-29"
          },
          "giftPolicy": {
            "presentContent": "string"
          },
          "multiPurchaseDiscountPolicy": {
            "discountMethod": {
              "value": 0,
              "unitType": "PERCENT",
              "startDate": "2024-07-29",
              "endDate": "2024-07-29"
            },
            "orderValue": 0,
            "orderValueUnitType": "PERCENT"
          },
          "eventPhraseCont": "string"
        },
        "images": {
          "representativeImage": {
            "url": "string"
          },
          "optionalImages": [
            {
              "url": "string"
            }
          ]
        },
        "productAttributes": [
          {
            "attributeSeq": 0,
            "attributeValueSeq": 0,
            "attributeRealValue": "string",
            "attributeRealValueUnitCode": "string"
          }
        ],
        "deliveryInfo": {
          "deliveryType": "DELIVERY",
          "deliveryAttributeType": "NORMAL",
          "deliveryCompany": "string",
          "outboundLocationId": "string",
          "deliveryBundleGroupUsable": true,
          "deliveryBundleGroupId": 0,
          "quickServiceAreas": [
            "SEOUL"
          ],
          "visitAddressId": 0,
          "deliveryFee": {
            "deliveryFeeType": "FREE",
            "baseFee": 0,
            "freeConditionalAmount": 0,
            "repeatQuantity": 0,
            "secondBaseQuantity": 0,
            "secondExtraFee": 0,
            "thirdBaseQuantity": 0,
            "thirdExtraFee": 0,
            "deliveryFeePayType": "COLLECT",
            "deliveryFeeByArea": {
              "deliveryAreaType": "AREA_2",
              "area2extraFee": 0,
              "area3extraFee": 0
            },
            "differentialFeeByArea": "string"
          },
          "claimDeliveryInfo": {
            "returnDeliveryCompanyPriorityType": "PRIMARY",
            "returnDeliveryFee": 0,
            "exchangeDeliveryFee": 0,
            "shippingAddressId": 0,
            "returnAddressId": 0,
            "freeReturnInsuranceYn": true
          },
          "installation": true,
          "installationFee": true,
          "expectedDeliveryPeriodType": "ETC",
          "expectedDeliveryPeriodDirectInput": "string",
          "todayStockQuantity": 0,
          "customProductAfterOrderYn": true,
          "hopeDeliveryGroupId": 0,
          "businessCustomsClearanceSaleYn": true
        },
        "saleStartDate": "2024-07-29T15:51:28.071Z",
        "saleEndDate": "2024-07-29T15:51:28.071Z",
        "productCertificationInfos": [
          {
            "certificationInfoId": 0,
            "certificationKindType": "KC_CERTIFICATION",
            "name": "string",
            "certificationNumber": "string",
            "certificationMark": true,
            "companyName": "string",
            "certificationDate": "2024-07-29"
          }
        ],
        "certificationTargetExcludeContent": {
          "childCertifiedProductExclusionYn": true,
          "kcExemptionType": "OVERSEAS",
          "kcCertifiedProductExclusionYn": "FALSE",
          "greenCertifiedProductExclusionYn": true
        },
        "purchaseQuantityInfo": {
          "maxPurchaseQuantityPerId": 0,
          "maxPurchaseQuantityPerOrder": 0
        },
        "sellerCodeInfo": {
          "sellerManagementCode": "string",
          "sellerBarcode": "string",
          "sellerCustomCode1": "string",
          "sellerCustomCode2": "string"
        },
        "detailContentTempId": 0,
        "originAreaInfo": {
          "originAreaCode": "string",
          "importer": "string",
          "content": "string",
          "plural": true
        },
        "customProductYn": true,
        "manufactureDate": "2024-07-29",
        "validDate": "2024-07-29",
        "releaseDate": "2024-07-29",
        "purchaseReviewInfo": {
          "purchaseReviewExposure": true,
          "reviewUnExposeReason": "string"
        },
        "unitCapacity": {
          "unitPriceYn": true,
          "totalCapacityValue": 0,
          "unitCapacity": 0,
          "indicationUnit": "string"
        },
        "smartstoreChannelProduct": {
          "channelProductNo": 0,
          "storeKeepExclusiveProduct": true,
          "naverShoppingRegistration": true,
          "promotionText": "string",
          "channelProductDisplayStatusType": "WAIT"
        },
        "windowChannelProduct": {
          "channelProductNo": 0,
          "storeKeepExclusiveProduct": true,
          "naverShoppingRegistration": true,
          "promotionText": "string"
        }
      }
    ],
    "smartstoreGroupChannel": {
      "bbsSeq": 0
    },
    "windowGroupChannel": {
      "bbsSeq": 0,
      "channelNo": 0,
      "best": true
    }
  }
}
```
