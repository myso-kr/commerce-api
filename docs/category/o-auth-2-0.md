---
doc-id: "category-o-auth-2-0"
title: "OAuth 2.0"
description: "OAuth 2.0 관련 API 문서를 모아둔 카테고리 인덱스입니다. 주요 문서: 인증 토큰 발급 요청."
type: category-index
category: 인증
tags:
  - auth
  - category
  - oauth2
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/o-auth-2-0
---

# OAuth 2.0

OAuth 2.0 API

## 관련 문서

| 문서 | 설명 |
|------|------|
| [인증 토큰 발급 요청](../api/v1/oauth2/token.POST.md) | API 활용을 위한 인증 토큰을 발급/갱신 요청합니다.동일 리소스(type과 account_id에 따라)에는 하나의 인증 토큰의 발급되며 인증 토큰의 유효 시간은 3시간(10,800초)입니다. 발급된 인증 토큰이 존재하는 경우 남은 유효 시간이 30분 이상이면 기존 인증 토큰이 반환되고 30분 미만이면 새로운 인증 토큰이 발급됩니다. 새로운 인증 토큰이 발급된 경우에도 유효 시간이 만료되기 전까지는 기존 인증 토큰을 사용할 수 있습니다. |
