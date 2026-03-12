---
doc-id: "guide-커머스api"
title: "커머스API"
description: "Version: 2.73.0"
type: guide
category: 기타
tags:
  - reference
status: stable
updated: "2026-03-12"
source: https://apicenter.commerce.naver.com/docs/commerce-api/current/커머스api
---

# 커머스API

Version: 2.73.0



## Authentication

- OAuth 2.0: Client-Credentials

인증 토큰 발급 후 API 요청 시 Authorization 헤더를 추가합니다.

> Authorization: Bearer {인증 토큰}

|  |  |
| --- | --- |
| Security Scheme Type: | oauth2 |
| OAuth Flow (clientCredentials): | Token URL: <https://api.commerce.naver.com/external/v1/oauth2/token>  Scopes:   - N/A: 커머스API는 'scopes' 스펙을 제공하지 않습니다. |
