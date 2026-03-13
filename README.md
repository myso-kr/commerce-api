# naver-commerce-api-docs-cli

Naver Commerce API Center 문서를 LLM 친화적인 정규화 Markdown corpus로 제공하는 retrieval-first CLI입니다.  
패키지에는 정규화된 `docs/`가 동봉되며, 모든 출력은 JSONL 형식으로 stdout에 기록됩니다.

> 기본 원칙: `ask -> api -> implementation`

성공한 명령은 `done` 뒤에 `guide` 이벤트를 추가로 출력합니다. 이 이벤트는 호출한 agent가 다음 단계에서 무엇을 해야 하는지 바로 설명합니다.

## TL;DR

- 일반적인 `npx` 사용은 `ask`, `api`만으로 충분합니다.
- 최신 upstream 문서가 꼭 필요할 때만 `sync --latest`를 사용합니다.
- `scrape`, `scrape-api`는 maintainer 전용이며 `--maintainer` 없이는 실행되지 않습니다.
- 조회 명령은 가장 가까운 상위 프로젝트의 정규화된 `docs/`를 먼저 찾고, 없으면 managed cache, 마지막으로 번들 `docs/`를 사용합니다.

## Quick Start

가장 일반적인 사용 예시는 아래 세 가지입니다.

```bash
npx naver-commerce-api-docs-cli ask "smartstore 인증하려면 어떻게 해야해?"
npx naver-commerce-api-docs-cli api --path /v2/products --method POST --body
npx naver-commerce-api-docs-cli init --target codex,cursor
```

upstream 문서가 실제로 변경되어 최신 corpus가 필요할 때만:

```bash
npx naver-commerce-api-docs-cli sync --latest
```

short alias를 쓰고 싶다면:

```bash
npx --package naver-commerce-api-docs-cli ncad ask --format compact "smartstore 인증"
```

## 어떤 명령을 써야 하나

| 상황 | 먼저 쓸 명령 | 설명 |
| --- | --- | --- |
| 자연어 질문 | `ask` | guide/api/category/schema를 함께 검색해 ranked evidence를 반환 |
| 정확한 endpoint 확인 | `api` | `--path + --method` 또는 `--doc-id` 기반 exact lookup |
| llms 산출물 생성 | `llms` | `docs/` 기준 `llms.txt`, `llms-full.txt` 생성 |
| corpus 검증 | `validate` 또는 `check all` | `lint + review + noise` |
| agent 설정 설치 | `init` | `AGENTS.md`와 target별 skill/rule 파일 설치 |
| upstream 최신화 | `sync --latest` | managed cache만 갱신, 일반 조회에는 불필요 |
| raw crawl/debug | `scrape --maintainer`, `scrape-api --maintainer` | maintainer 전용 |

간단한 의사결정 흐름:

```text
문서 질문인가?
  -> ask
정확한 경로/메서드가 필요한가?
  -> api
프로젝트 corpus가 깨졌는가?
  -> validate
upstream 문서가 실제로 바뀌었는가?
  -> sync --latest
crawler/debug가 필요한 maintainer 작업인가?
  -> scrape* --maintainer
```

## 실행 가드

보수적으로 막아둔 명령은 아래와 같습니다.

| 명령 | 요구 플래그 | 이유 |
| --- | --- | --- |
| `sync` | `--latest` | 불필요한 최신화와 네트워크 갱신 방지 |
| `scrape` | `--maintainer` | raw crawl은 일반 agent workflow가 아님 |
| `scrape-api` | `--maintainer` | deep crawl은 maintainer/debug 전용 |

무플래그로 호출하면 네트워크 작업 대신 JSONL `guide`가 출력되고, `ask -> api -> sync --latest` 같은 안전한 다음 단계를 안내합니다.

## Docs 탐색 우선순위

조회/검사 명령(`ask`, `api`, `review`, `noise`, `lint`)은 아래 순서로 corpus를 찾습니다.

1. 현재 작업 디렉터리에서 위로 올라가며 가장 가까운 상위 프로젝트의 정규화된 `docs/`
2. CLI managed cache의 synced `docs/`
3. 패키지에 번들된 `docs/`

중요한 점:

- 아무 `docs/` 디렉터리나 읽지 않습니다.
- `api`, `schema`, `category`, `guide` 중 하나가 있거나 `llms.txt`, `llms-full.txt`가 있는 경우만 정규화 corpus로 인정합니다.
- 따라서 하위 패키지 디렉터리에서 실행해도, 상위 루트에 올바른 `docs/`가 있으면 그 corpus를 우선 사용합니다.

## 출력 계약

모든 명령은 JSONL을 stdout에 출력합니다.

```json
{"ts":"...Z","level":"INFO","cmd":"ask","event":"match", ...}
{"ts":"...Z","level":"INFO","cmd":"ask","event":"done", ...}
{"ts":"...Z","level":"INFO","cmd":"ask","event":"guide", ...}
```

출력 필터:

- 기본값: 결과 중심 이벤트만 출력
- `--verbose`: 단계별 요약 INFO 이벤트 포함
- `--debug`: `--verbose` + per-file / per-page DEBUG 이벤트 포함

## 핵심 명령

### `ask`

- 기본 진입점입니다.
- `guide`, `api`, `category`, `schema`를 함께 검색합니다.
- frontmatter `keywords`와 `guide/sitemap.md` 구조 인덱스를 활용합니다.
- 최종 답변은 CLI가 아니라 호출한 LLM이 결정해야 합니다.

예시:

```bash
npx naver-commerce-api-docs-cli ask "smartstore 인증하려면 어떻게 해야해?"
npx naver-commerce-api-docs-cli ask --format compact "상품 등록은 어떻게 해?"
npx naver-commerce-api-docs-cli ask --body --limit 2 "oauth2 토큰 발급"
```

### `api`

- exact grounding용 명령입니다.
- 구현 전에 `--path + --method` 또는 `--doc-id`로 확인하는 흐름을 권장합니다.

예시:

```bash
npx naver-commerce-api-docs-cli api --path /v2/products --method POST --body
npx naver-commerce-api-docs-cli api --doc-id v2-products-post
npx naver-commerce-api-docs-cli api --query "group상품" --limit 3
```

### `sync --latest`

- upstream 개발문서가 변경되었을 때만 사용합니다.
- 기본 출력 위치는 현재 프로젝트가 아니라 CLI managed cache입니다.
- 일반 작업 디렉터리를 오염시키지 않습니다.

예시:

```bash
npx naver-commerce-api-docs-cli sync --latest
npx naver-commerce-api-docs-cli source sync --latest
```

### `scrape --maintainer`, `scrape-api --maintainer`

- maintainer 전용 raw crawl/debug 명령입니다.
- 일반적인 agent 질의, 코드 생성, SDK 구현의 첫 단계로 사용하면 안 됩니다.

예시:

```bash
node dist/cli.js scrape --maintainer
node dist/cli.js scrape-api --maintainer
node dist/cli.js scrape-api --maintainer --out raws/commerce-api/current --dst docs
node dist/cli.js scrape-api --maintainer --no-normalize
```

## 명령 그룹

| 그룹 | 역할 |
| --- | --- |
| `docs/*` | 조회와 LLM ingest 산출물 생성 |
| `source/*` | raw 수집과 정규화 |
| `check/*` | 검증 파이프라인 |
| `agent/*` | agent 환경 설치 |

단축 명령:

- `normalize`
- `validate`
- `sync`

예시:

```bash
node dist/cli.js docs ask --format compact "smartstore 인증"
node dist/cli.js docs api --path /v2/products --method POST
node dist/cli.js source normalize --src raws/commerce-api/current --dst docs
node dist/cli.js check all
node dist/cli.js agent init
```

## Agent Init

`init`은 현재 프로젝트에 LLM agent용 설정 파일을 설치합니다.

특징:

- 모든 타깃에서 `AGENTS.md` managed block을 공통 설치
- 기존 `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`는 전체 overwrite가 아니라 managed block만 append/update
- 이전 `naver-commerce-api-docs:init:*` block이 있으면 새 prefix로 migration
- 템플릿 본문은 코드가 아니라 루트 [SKILLS.md](./SKILLS.md)에서 로드
- 기본 출력도 `start -> file -> done -> guide` 순서의 JSONL

예시:

```bash
npx naver-commerce-api-docs-cli init
npx naver-commerce-api-docs-cli init --target codex,claude,cursor,gemini,antigravity
npx naver-commerce-api-docs-cli init --target codex --root ../my-agent-project
```

설치 경로:

| target | 생성 경로 |
| --- | --- |
| `codex` | `.agents/skills/naver-commerce-api-docs-cli/SKILL.md`, `AGENTS.md` |
| `claude` | `.claude/skills/naver-commerce-api-docs-cli/SKILL.md`, `CLAUDE.md`, `AGENTS.md` |
| `cursor` | `.cursor/rules/naver-commerce-api-docs-cli.mdc`, `AGENTS.md` |
| `gemini` | `.gemini/skills/naver-commerce-api-docs-cli/SKILL.md`, `GEMINI.md`, `AGENTS.md` |
| `antigravity` | `.agents/skills/naver-commerce-api-docs-cli/SKILL.md`, `AGENTS.md` |

추가 메모:

- `antigravity`는 공식 스킬 경로 문서를 확인하지 못해 호환 모드로 설치합니다.
- 설치된 안내문은 `project docs -> synced cache docs -> bundled docs` 우선순위를 전제로 합니다.
- agent는 `node_modules/naver-commerce-api-docs-cli/` 내부 파일을 직접 읽기보다 `npx naver-commerce-api-docs-cli ...` subprocess 출력(JSONL)을 우선 근거로 사용해야 합니다.

## 개발

요구 사항:

- Node.js 18+
- npm 10+

로컬 개발:

```bash
npm install
npm run check
npm run build
node dist/cli.js --help
```

Playwright 브라우저 설치가 필요한 경우:

```bash
npx playwright install chromium
```

정규화/검증 관련 예시:

```bash
node dist/cli.js transform
node dist/cli.js normalize
node dist/cli.js lint --summary
node dist/cli.js validate
node dist/cli.js lint --fix --src raws/commerce-api/current --dst docs --summary
node dist/cli.js review
node dist/cli.js noise
node dist/cli.js review --verbose
node dist/cli.js transform --debug
```

## Demo

`demo/`는 고정 샘플이 아니라 반복 검증 때 매번 새로 생성되는 scratch workspace입니다.  
`demo 초기화 -> init -> validate -> Codex child -> 로그 수집 -> 재시작` 루프는 [scripts/demo-codex-loop.ps1](./scripts/demo-codex-loop.ps1)로 자동화합니다.

```bash
pwsh -File ./scripts/demo-codex-loop.ps1 -Action run
npm run demo:status
npm run demo:stop
```

## 배포

### npm 수동 배포

```bash
npm run check
npm run build
npm pack --dry-run
npm publish --access public
```

필수 조건:

- `npm login` 또는 `npm whoami` 정상 동작
- `package.json` 패키지명이 registry에서 사용 가능
- `package-lock.json`은 npm 기준으로 관리

### GitHub Actions 배포

`v*` 태그를 push하면 [publish.yml](./.github/workflows/publish.yml)이 아래를 수행합니다.

- `npm ci`
- `npm run check`
- `npm run test:cli`
- `npm run build`
- `npm publish --access public`
- GitHub Release 생성 및 tarball 업로드

예시:

```bash
git tag v1.0.0
git push origin v1.0.0
```

필수 준비:

- GitHub repository secret `NPM_TOKEN`
- npm registry에서 사용 가능한 패키지명

## 런타임 경로

managed cache 기본 경로:

- Windows: `%LOCALAPPDATA%\naver-commerce-api-docs-cli`
- macOS: `~/Library/Caches/naver-commerce-api-docs-cli`
- Linux: `$XDG_CACHE_HOME/naver-commerce-api-docs-cli` 또는 `~/.cache/naver-commerce-api-docs-cli`

실행 이름:

- 패키지명: `naver-commerce-api-docs-cli`
- 기본 실행명: `naver-commerce-api-docs-cli`
- short alias: `ncad`

## 패키지 구성

- CLI 엔트리포인트: `src/cli.ts`
- 배포 산출물: `dist/**`, `docs/**`
- agent installer 템플릿: `SKILLS.md`
- 저장소 raw 원본: `raws/**`
- 저장소 정규화 문서: `docs/api/**`, `docs/schema/**`, `docs/category/**`, `docs/guide/**`, `docs/llms*.txt`
