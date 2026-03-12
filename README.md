# naver-commerce-api-docs-cli

Naver Commerce API Center 문서를 스크래핑하고, 정규화된 Markdown으로 변환하고, 조회/검증까지 수행하는 CLI입니다. npm 패키지에는 정규화된 `docs/`가 함께 포함되며, 모든 결과는 JSONL 형식으로 stdout에 출력됩니다.

성공한 명령은 `done` 뒤에 `guide` 이벤트를 추가로 출력합니다. 이 이벤트는 호출한 agent가 다음 단계에서 어떤 후속 명령을 쓰면 되는지 설명합니다.

## 요구 사항

- Node.js 18+
- npm 10+

## 로컬 개발

```bash
npm install
npm run check
npm run build
node dist/cli.js --help
```

Playwright 기반 명령어(`sync`, `scrape`, `scrape-api`)를 사용할 때만 브라우저 설치가 필요합니다.

```bash
npx playwright install chromium
```

## 명령어

flat 명령은 유지하면서, agent가 쓰기 쉬운 그룹 명령과 최소 alias만 함께 제공합니다. 배포 패키지에는 정규화된 `docs/`가 동봉되므로, 일반적인 `npx` 사용자나 agent는 별도 scrape 없이 바로 조회를 시작하면 됩니다. 이후 `sync`가 필요해도 기본값은 현재 프로젝트가 아니라 CLI managed cache를 갱신합니다.

```bash
node dist/cli.js ask smartstore 인증하려면 어떻게 해야해
node dist/cli.js ask --format compact smartstore 인증하려면 어떻게 해야해
node dist/cli.js init
node dist/cli.js init --target codex,claude,cursor,gemini,antigravity
node dist/cli.js api --path /v2/products --method POST
node dist/cli.js api --query "group상품" --limit 5
node dist/cli.js api --doc-id v2-products-post
node dist/cli.js llms
node dist/cli.js transform
node dist/cli.js normalize
node dist/cli.js lint --summary
node dist/cli.js validate
node dist/cli.js lint --fix --src raws/commerce-api/current --dst docs --summary
node dist/cli.js review
node dist/cli.js noise
node dist/cli.js sync
node dist/cli.js scrape
node dist/cli.js scrape-api
node dist/cli.js scrape-api --out raws/commerce-api/current --dst docs
node dist/cli.js scrape-api --no-normalize
node dist/cli.js docs api --path /v2/products --method POST
node dist/cli.js docs ask --format compact smartstore 인증하려면 어떻게 해야해
node dist/cli.js source normalize --src raws/commerce-api/current --dst docs
node dist/cli.js source sync
node dist/cli.js check all
node dist/cli.js agent init
node dist/cli.js review --verbose
node dist/cli.js transform --debug
```

권장 구조는 아래처럼 보면 됩니다.

- `docs/*`: 조회와 LLM ingest 산출물 생성
- `source/*`: raw 수집과 정규화
- `check/*`: 검증 파이프라인
- `agent/*`: agent 환경 설치
- 단축 명령: `normalize`, `sync`, `validate`

일반 사용 흐름은 아래 두 단계면 충분합니다.

- 조회: `ask`, `api`
- 최신 동기화가 정말 필요할 때만: `sync`

`scrape`와 `scrape-api`는 기본적으로 raw 문서를 수집한 뒤 `docs/`에 정규화된 경로와 포맷으로 다시 적재합니다. 기존 정규화 산출물(`docs/api`, `docs/schema`, `docs/category`, `docs/guide`, `llms*.txt`)은 새 결과로 동기화되도록 먼저 정리합니다.

`lint --fix`는 지정한 raw source를 기준으로 `docs/`를 다시 정규화한 뒤 lint를 수행합니다. 현재 저장된 `docs/`를 정규화 구조로 재동기화할 때는 `raws/commerce-api/current`를 `--src`로 주면 됩니다.

출력 필터는 다음처럼 사용할 수 있습니다.

- 기본값: 결과 중심 JSONL만 출력
- `--verbose`: 단계별 요약 INFO 이벤트까지 출력
- `--debug`: `--verbose`에 더해 per-file / per-page DEBUG 이벤트까지 출력

## npx 사용 방식

배포 패키지는 `docs/`를 함께 포함하므로, 설치 직후 조회형 명령은 바로 사용할 수 있습니다.

```bash
npx naver-commerce-api-docs-cli --help
npx naver-commerce-api-docs-cli init
npx naver-commerce-api-docs-cli init --target codex,cursor
npx naver-commerce-api-docs-cli ask smartstore 인증하려면 어떻게 해야해
npx naver-commerce-api-docs-cli ask --format compact smartstore 인증하려면 어떻게 해야해
npx naver-commerce-api-docs-cli api --path /v2/products --method POST
npx naver-commerce-api-docs-cli normalize
npx naver-commerce-api-docs-cli validate
npx naver-commerce-api-docs-cli docs api --path /v2/products --method POST
npx naver-commerce-api-docs-cli check all
npx naver-commerce-api-docs-cli api --query "group상품" --limit 3
npx naver-commerce-api-docs-cli review
npx naver-commerce-api-docs-cli noise
npx naver-commerce-api-docs-cli review --verbose
npx naver-commerce-api-docs-cli transform --debug
```

기본 경로 규칙은 아래와 같습니다.

- 자연어 질문 명령(`ask`): guide/api/category/schema를 함께 검색하고 랭킹된 근거 match를 반환합니다.
- `ask`는 휴리스틱 검색기입니다. 최종 답변은 이 결과를 호출한 LLM이 스스로 결정해야 합니다. 애매하면 `api --path`, `api --query`, 매치 파일 본문 확인으로 보강해야 합니다.
- `ask --format compact`를 쓰면 `tags`, `description`, `score`, `matched_terms`, `source`를 생략한 짧은 근거만 반환합니다. `--body`를 함께 주면 compact에서도 본문은 포함됩니다.
- 배포 패키지는 정규화된 `docs/`를 함께 동봉합니다. 로컬 `./docs`가 없으면 번들 문서를 바로 사용하므로, 일반적인 조회에는 `sync`가 필요하지 않습니다.
- 조회/검사 명령(`ask`, `api`, `review`, `noise`, `lint`): 현재 작업 디렉터리에 `./docs`가 있으면 우선 사용하고, 없으면 CLI managed cache의 synced `docs/`, 마지막으로 패키지 번들 `docs/`를 사용합니다.
- 생성 명령(`llms`, `transform`, `lint --fix`, `scrape`, `scrape-api`): 현재 작업 디렉터리 기준 `./docs`, `./raws/...`를 기본 경로로 사용합니다.
- `sync`: upstream 개발문서가 바뀌었을 때만 raw 수집, 정규화, validate를 한 번에 수행합니다. 기본 출력은 현재 프로젝트가 아니라 CLI managed cache이므로 일반 작업 디렉터리를 오염시키지 않습니다.

managed cache 기본 경로는 OS별로 아래를 따릅니다.

- Windows: `%LOCALAPPDATA%\naver-commerce-api-docs-cli`
- macOS: `~/Library/Caches/naver-commerce-api-docs-cli`
- Linux: `$XDG_CACHE_HOME/naver-commerce-api-docs-cli` 또는 `~/.cache/naver-commerce-api-docs-cli`

실행 이름은 아래처럼 구분됩니다.

- 패키지명: `naver-commerce-api-docs-cli`
- 기본 실행명: `naver-commerce-api-docs-cli`
- short alias: `ncad`

`npx`로 1회 실행할 때는 패키지명을 써야 합니다. short alias는 설치 후 로컬/전역 bin에서 바로 쓰거나, `npx --package naver-commerce-api-docs-cli ncad ...` 형태로 사용할 수 있습니다.

즉, LLM agent는 조회만 필요하면 바로 다음처럼 사용할 수 있습니다.

```bash
npx naver-commerce-api-docs-cli ask smartstore 인증하려면 어떻게 해야해
npx naver-commerce-api-docs-cli ask --format compact smartstore 인증하려면 어떻게 해야해
npx naver-commerce-api-docs-cli api --path /v2/products --method POST --body
npx naver-commerce-api-docs-cli docs api --path /v2/products --method POST
npx --package naver-commerce-api-docs-cli ncad ask --format compact "smartstore 인증"
```

upstream 문서가 실제로 바뀌어서 로컬 corpus를 갱신해야 할 때만 아래처럼 실행하면 됩니다. 기본적으로 CLI managed cache를 갱신하고, 이후 조회 명령은 프로젝트 로컬 `./docs`가 없을 때 그 cache를 자동으로 사용합니다.

```bash
npx naver-commerce-api-docs-cli sync
```

## agent init

`init`은 현재 프로젝트에 LLM agent용 설정 파일을 설치합니다. 기존 `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`가 이미 있으면 전체를 덮어쓰지 않고 `naver-commerce-api-docs-cli:init:*` managed block만 append/update 합니다. 이전 `naver-commerce-api-docs:init:*` block도 있으면 새 prefix로 교체합니다.
설치 템플릿 본문은 코드에 직접 넣지 않고 루트 `SKILLS.md`에서 읽어옵니다.

```bash
npx naver-commerce-api-docs-cli init
npx naver-commerce-api-docs-cli init --target codex,claude,cursor,gemini,antigravity
npx naver-commerce-api-docs-cli init --target codex --root ../my-agent-project
```

설치 대상별 생성 경로는 아래와 같습니다.

- `codex`: `.agents/skills/naver-commerce-api-docs-cli/SKILL.md`, `AGENTS.md`
- `claude`: `.claude/skills/naver-commerce-api-docs-cli/SKILL.md`, `CLAUDE.md`
- `cursor`: `.cursor/rules/naver-commerce-api-docs-cli.mdc`, `AGENTS.md`
- `gemini`: `.gemini/skills/naver-commerce-api-docs-cli/SKILL.md`, `GEMINI.md`
- `antigravity`: `.agents/skills/naver-commerce-api-docs-cli/SKILL.md`, `AGENTS.md`

`antigravity`는 공식 스킬 경로 문서를 확인하지 못해 `.agents/skills` + `AGENTS.md` 호환 모드로 설치합니다.

설치되는 skill/rule 안내문도 동일한 정책을 따릅니다.

- 기본 조회는 `project docs -> synced cache docs -> bundled docs` 순서로 `ask`, `api`
- `sync`는 upstream 개발문서 변경 시에만 요청하고, 기본적으로 managed cache를 갱신

## npm 배포

```bash
npm run check
npm run build
npm pack --dry-run
npm publish --access public
```

필수 조건:

- `npm login` 또는 `npm whoami`가 정상 동작해야 합니다.
- `package.json`의 `name`이 npm registry에서 사용 가능한 이름이어야 합니다.
- `package-lock.json`은 npm 기준으로 함께 관리합니다.

## GitHub Actions 배포

기본 배포 경로는 GitHub Actions입니다. `v*` 형식 태그를 push하면 [publish.yml](.github/workflows/publish.yml)이 아래를 순서대로 수행합니다.

- `npm ci`
- `npm run check`
- `npm run test:cli`
- `npm run build`
- `npm publish --access public`
- GitHub Release 생성
- `npm pack`으로 만든 `*.tgz` tarball을 Release asset으로 업로드

필수 준비:

- GitHub repository secret `NPM_TOKEN`
- npm registry에서 사용 가능한 패키지명
- 배포 버전에 해당하는 git tag push

예시:

```bash
git tag v1.0.0
git push origin v1.0.0
```

## 패키지 구성

- CLI 엔트리포인트: `src/cli.ts`
- 배포 산출물: `dist/**`, `docs/**`
- agent installer 템플릿: `SKILLS.md`
- legacy Python 스크립트: `scripts/**`에 남아 있지만 npm 패키지에는 포함되지 않습니다.
