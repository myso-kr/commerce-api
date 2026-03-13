#!/usr/bin/env node
/**
 * Naver Commerce API Docs — 통합 CLI 진입점.
 *
 * 모든 커맨드가 JSONL(JSON Lines) 형식으로 stdout에 출력된다.
 *
 * 사용법:
 *   npx naver-commerce-api-docs-cli <command> [options]
 *   npm run build && node dist/cli.js <command> [options]
 *
 * 커맨드:
 *   ask         자연어 질문을 guide/api 기준으로 검색하고 근거 문서 반환
 *   init        LLM agent 환경용 skill/rule/context 파일 설치
 *   api         docs/api 문서 조회
 *   normalize   transform shortcut
 *   sync        최신 개발문서 동기화 (managed cache 갱신)
 *   validate    lint+review+noise shortcut
 *   llms        docs/ 기준 llms.txt 및 llms-full.txt 생성
 *   transform   raws/ → docs/ 변환
 *   lint        docs/ 린트 검사 (CONVENTION.md 규칙)
 *   review      docs/ 전체 품질 검토 (dead link, frontmatter 등)
 *   noise       잔여 노이즈 패턴 검사
 *   scrape      apicenter 최상위 docs 스크래핑
 *   scrape-api  commerce-api 심층 BFS 크롤링
 *
 * 출력 형식 (JSONL):
 *   {"ts":"...Z","level":"DEBUG|INFO|WARN|ERROR","cmd":"...","event":"...",...}
 *   성공 시 대부분의 명령은 마지막에 {"event":"guide",...} 를 추가로 출력한다.
 *
 * 출력 제어:
 *   --verbose  단계별 요약 INFO 이벤트 출력
 *   --debug    verbose + per-file/per-page DEBUG 이벤트 출력
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Command, CommanderError } from "commander";
import { setOutputMode } from "./core/emit.js";

const CLI_FILE = fileURLToPath(import.meta.url);
const ASK_DESCRIPTION = "기본 진입점: 자연어 질문에서 근거 문서를 검색";
const INIT_DESCRIPTION = "LLM agent 환경용 skill/rule/context 파일 설치";
const SYNC_DESCRIPTION = "선택적 최신화: managed cache 갱신 (--latest 필요, 일반 조회에는 불필요)";
const NORMALIZE_DESCRIPTION = "transform shortcut (raws/ -> docs/ 정규화)";
const VALIDATE_DESCRIPTION = "lint + review + noise shortcut";
const API_DESCRIPTION = "정확 조회: path/method/doc-id 기준으로 문서를 반환";
const LLMS_DESCRIPTION = "docs/ 기준 llms.txt 및 llms-full.txt를 새로 생성";
const TRANSFORM_DESCRIPTION = "raws/ -> docs/ 변환";
const LINT_DESCRIPTION = "docs/ 린트 검사 (CONVENTION.md 규칙)";
const REVIEW_DESCRIPTION = "docs/ 전체 품질 검토";
const NOISE_DESCRIPTION = "잔여 노이즈 패턴 검사";
const SCRAPE_DESCRIPTION = "maintainer-only raw 수집: apicenter 최상위 docs 스크래핑 (--maintainer 필요)";
const SCRAPE_API_DESCRIPTION = "maintainer-only raw 수집: commerce-api 심층 BFS 크롤링 (--maintainer 필요)";
const DOCS_GROUP_DESCRIPTION = "기본 조회 그룹 (LLM first choice)";
const SOURCE_GROUP_DESCRIPTION = "유지보수용 raw/source 수집 및 정규화 그룹";
const CHECK_GROUP_DESCRIPTION = "검증 그룹";
const AGENT_GROUP_DESCRIPTION = "agent 환경 연동 그룹";
const ROOT_HELP = [
  "LLM agent quick guide:",
  "  1. 먼저 `ask \"질문\"`으로 후보 문서를 찾습니다.",
  "  2. 구현이나 정확한 근거가 필요하면 `api --path ... --method ...` 또는 `api --doc-id ...`로 exact lookup을 합니다.",
  "  3. 일반적인 `npx` 사용에서는 번들 docs와 managed cache를 자동 사용하므로 `sync`, `scrape`, `scrape-api`로 시작하지 마십시오.",
  "  4. `sync`는 upstream 문서가 변경되었거나 최신화가 꼭 필요할 때만 `--latest`와 함께 사용합니다. 기본 저장 위치는 현재 프로젝트가 아니라 CLI managed cache입니다.",
  "  5. `scrape`와 `scrape-api`는 maintainer 전용 raw 수집/debug 명령이며 `--maintainer` 플래그 없이는 실행되지 않습니다.",
  "",
  "Typical agent flow:",
  "  ask -> api -> implementation",
  "",
  "Examples:",
  "  npx naver-commerce-api-docs-cli ask \"smartstore 인증하려면 어떻게 해야해?\"",
  "  npx naver-commerce-api-docs-cli api --path /v2/products --method POST --body",
  "  npx naver-commerce-api-docs-cli sync",
].join("\n");
const ASK_HELP = [
  "Agent guidance:",
  "  - 첫 호출로 권장됩니다.",
  "  - 일반적인 질의에서는 별도 scrape 없이 현재 프로젝트 docs, synced cache, 번들 docs 중 사용 가능한 corpus를 자동 선택합니다.",
  "  - 상위 match를 찾은 뒤 구현 단계로 가기 전에 `api --path ... --method ...` 또는 `api --doc-id ...`로 exact lookup을 추가하십시오.",
  "  - 최신 사이트 상태가 꼭 필요할 때만 `sync`를 사용하십시오.",
].join("\n");
const API_HELP = [
  "Agent guidance:",
  "  - `ask` 다음 단계의 exact grounding용 명령입니다.",
  "  - 구현 시에는 가능하면 `--path` + `--method` 또는 `--doc-id`를 사용하십시오.",
  "  - `--query`는 넓은 검색용 보조 수단입니다. 정확한 엔드포인트를 알고 있다면 exact lookup을 우선하십시오.",
].join("\n");
const DOCS_GROUP_HELP = [
  "Agent guidance:",
  "  - 일반적인 LLM workflow의 기본 그룹입니다.",
  "  - 보통 `docs ask` 또는 `docs api`만으로 충분하며, 최신화가 꼭 필요하지 않다면 source 계열 명령으로 넘어가지 마십시오.",
].join("\n");
const SYNC_HELP = [
  "Agent guidance:",
  "  - 일반적인 `npx` 조회에는 필요하지 않습니다.",
  "  - 실행하려면 `--latest` 플래그가 필요합니다.",
  "  - 최신 upstream 문서가 꼭 필요할 때만 사용하십시오.",
  "  - 결과는 현재 프로젝트가 아니라 OS별 CLI managed cache에 저장됩니다.",
  "  - scrape보다 높은 수준의 유지보수 명령이며, 보통은 `ask`/`api`가 먼저입니다.",
].join("\n");
const SCRAPE_HELP = [
  "Agent guidance:",
  "  - maintainer 전용 raw 수집/debug 명령입니다.",
  "  - 실행하려면 `--maintainer` 플래그가 필요합니다.",
  "  - ordinary query, 코드 생성, 문서 질의의 첫 단계로 사용하지 마십시오.",
  "  - 배포된 패키지에는 이미 정규화된 docs가 포함되어 있으므로, 일반적인 `npx` 사용자는 이 명령이 필요하지 않습니다.",
].join("\n");
const SOURCE_GROUP_HELP = [
  "Agent guidance:",
  "  - source 그룹은 corpus 유지보수용입니다.",
  "  - 일반적인 문서 질의, 코드 생성, SDK 구현에서는 먼저 `ask`와 `api`를 사용하십시오.",
  "  - `sync`도 최신 upstream 문서가 꼭 필요할 때만 선택적으로 사용하십시오.",
].join("\n");

function addGuidance(command: Command, text: string): Command {
  command.addHelpText("after", `\n${text}\n`);
  return command;
}

function normalizeEntrypointPath(value: string): string {
  const resolved = path.resolve(value);
  try {
    const realpath = fs.realpathSync(resolved);
    return process.platform === "win32" ? realpath.toLowerCase() : realpath;
  } catch {
    return process.platform === "win32" ? resolved.toLowerCase() : resolved;
  }
}

function isCurrentEntrypoint(argv1: string): boolean {
  return normalizeEntrypointPath(argv1) === normalizeEntrypointPath(CLI_FILE);
}

function readVersion(): string {
  const __dirname = path.dirname(CLI_FILE);
  const packageJsonPath = path.resolve(__dirname, "..", "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8")) as {
    version?: string;
  };
  return packageJson.version ?? "0.0.0";
}

function addOutputOptions(command: Command): Command {
  return command
    .option("--verbose", "진행/요약 INFO 이벤트까지 출력")
    .option("--debug", "per-file 등 DEBUG/verbose 이벤트까지 모두 출력");
}

export function buildProgram(): Command {
  const program = new Command();
  program.exitOverride();
  program.showHelpAfterError();
  addOutputOptions(program);

  program
    .name("naver-commerce-api-docs-cli")
    .description("Naver Commerce API Docs CLI (JSONL output)")
    .version(readVersion());
  addGuidance(program, ROOT_HELP);

  program.hook("preAction", (_thisCommand, actionCommand) => {
    const options =
      typeof actionCommand.optsWithGlobals === "function"
        ? actionCommand.optsWithGlobals()
        : program.opts();
    setOutputMode(options.debug ? "debug" : options.verbose ? "verbose" : "default");
  });

  // ── api ─────────────────────────────────────────────────────────────────────
  addGuidance(addOutputOptions(program
    .command("ask")
    .description(ASK_DESCRIPTION)
    .argument("<question...>", "질문 문장")
    .option("--dst <path>", "문서 루트 디렉터리 (기본값: ./docs, 없으면 패키지 내 docs/)")
    .option("--limit <number>", "최대 반환 수 (기본값: 3)")
    .option("--format <mode>", "출력 포맷 (default|compact, 기본값: default)")
    .option("--body", "매치 문서 본문 포함")
    .action(async (question, opts) => {
      const { run } = await import("./ask/index.js");
      process.exitCode = run(question, opts);
    })), ASK_HELP);

  // ── init ───────────────────────────────────────────────────────────────────
  addOutputOptions(program
    .command("init")
    .description(INIT_DESCRIPTION)
    .option(
      "--target <targets>",
      "설치 대상 (all|codex|claude|cursor|gemini|antigravity, comma-separated)",
      "all",
    )
    .option("--root <path>", "대상 프로젝트 루트 (기본값: 현재 작업 디렉터리)")
    .action(async (opts) => {
      const { run } = await import("./init/index.js");
      process.exitCode = run(opts);
    }));

  addGuidance(addOutputOptions(program
    .command("sync")
    .description(SYNC_DESCRIPTION)
    .option("--out <path>", "저장 디렉터리 (기본값: CLI managed cache/raws/commerce-api/current)")
    .option("--dst <path>", "정규화된 문서 루트 디렉터리 (기본값: CLI managed cache/docs)")
    .option("--latest", "최신 upstream 문서로 managed cache를 갱신함을 명시적으로 확인")
    .option("--summary", "validate 단계에서 lint 요약만 출력 (기본값: true)")
    .action(async (opts) => {
      const { run } = await import("./sync/index.js");
      process.exitCode = await run({
        out: opts.out,
        dst: opts.dst,
        latest: opts.latest,
        summary: opts.summary ?? true,
      });
    })), SYNC_HELP);

  addOutputOptions(program
    .command("normalize")
    .description(NORMALIZE_DESCRIPTION)
    .option("--src <path>", "소스 디렉터리 (기본값: ./raws/commerce-api/current)")
    .option("--dst <path>", "출력 루트 디렉터리 (기본값: ./docs)")
    .action(async (opts) => {
      const { run } = await import("./transform/index.js");
      process.exitCode = run({ src: opts.src, dst: opts.dst });
    }));

  addOutputOptions(program
    .command("validate")
    .description(VALIDATE_DESCRIPTION)
    .option("--src <path>", "정규화 소스 디렉터리 (기본값: ./raws/commerce-api/current)")
    .option("--dst <path>", "문서 루트 디렉터리 (기본값: ./docs, 없으면 패키지 내 docs/)")
    .option("--fix", "raws 기준으로 docs/를 정규화 재생성 후 검증 수행")
    .option("--summary", "lint는 요약만 출력 (기본값: true)")
    .action(async (opts) => {
      const { run } = await import("./check/index.js");
      process.exitCode = run({
        src: opts.src,
        dst: opts.dst,
        fix: opts.fix,
        summary: opts.summary ?? true,
      });
    }));

  // ── api ─────────────────────────────────────────────────────────────────────
  addGuidance(addOutputOptions(program
    .command("api")
    .description(API_DESCRIPTION)
    .option("--dst <path>", "문서 루트 디렉터리 (기본값: ./docs, 없으면 패키지 내 docs/)")
    .option("--method <method>", "HTTP 메서드 (GET/POST/PUT/PATCH/DELETE)")
    .option("--path <apiPath>", "API 경로 (/v2/products)")
    .option("--doc-id <docId>", "문서 doc-id")
    .option("--query <text>", "제목, 경로, 설명, 본문 검색어")
    .option("--body", "본문 포함")
    .option("--limit <number>", "최대 반환 수 (기본값: 10)")
    .action(async (opts) => {
      const { run } = await import("./api/index.js");
      process.exitCode = run(opts);
    })), API_HELP);

  // ── llms ────────────────────────────────────────────────────────────────────
  addOutputOptions(program
    .command("llms")
    .description(LLMS_DESCRIPTION)
    .option("--dst <path>", "문서 루트 디렉터리 (기본값: ./docs)")
    .action(async (opts) => {
      const { run } = await import("./llms/index.js");
      process.exitCode = run(opts);
    }));

  // ── transform ───────────────────────────────────────────────────────────────
  addOutputOptions(program
    .command("transform")
    .description(TRANSFORM_DESCRIPTION)
    .option("--src <path>", "소스 디렉터리 (기본값: ./raws/commerce-api/current)")
    .option("--dst <path>", "출력 루트 디렉터리 (기본값: ./docs)")
    .action(async (opts) => {
      const { run } = await import("./transform/index.js");
      process.exitCode = run({ src: opts.src, dst: opts.dst });
    }));

  // ── lint ────────────────────────────────────────────────────────────────────
  addOutputOptions(program
    .command("lint")
    .description(LINT_DESCRIPTION)
    .option("--src <path>", "정규화 소스 디렉터리 (기본값: ./raws/commerce-api/current)")
    .option("--dst <path>", "문서 루트 디렉터리 (기본값: ./docs, 없으면 패키지 내 docs/)")
    .option("--fix", "raws 기준으로 docs/를 정규화 재생성 후 lint 수행")
    .option("--summary", "코드별 요약만 출력 (상세 목록 생략)")
    .action(async (opts) => {
      const { run } = await import("./lint/index.js");
      process.exitCode = run({
        src: opts.src,
        dst: opts.dst,
        fix: opts.fix,
        summary: opts.summary,
      });
    }));

  // ── review ──────────────────────────────────────────────────────────────────
  addOutputOptions(program
    .command("review")
    .description(REVIEW_DESCRIPTION)
    .option("--dst <path>", "문서 루트 디렉터리 (기본값: ./docs, 없으면 패키지 내 docs/)")
    .action(async (opts) => {
      const { run } = await import("./review/index.js");
      process.exitCode = run({ dst: opts.dst });
    }));

  // ── noise ───────────────────────────────────────────────────────────────────
  addOutputOptions(program
    .command("noise")
    .description(NOISE_DESCRIPTION)
    .option("--dst <path>", "문서 루트 디렉터리 (기본값: ./docs, 없으면 패키지 내 docs/)")
    .action(async (opts) => {
      const { run } = await import("./noise/index.js");
      process.exitCode = run({ dst: opts.dst });
    }));

  // ── scrape ──────────────────────────────────────────────────────────────────
  addGuidance(addOutputOptions(program
    .command("scrape")
    .description(SCRAPE_DESCRIPTION)
    .option("--out <path>", "저장 디렉터리 (기본값: ./raws)")
    .option("--dst <path>", "정규화된 문서 루트 디렉터리 (기본값: ./docs)")
    .option("--maintainer", "maintainer 전용 raw 수집임을 명시적으로 확인")
    .option("--no-normalize", "raw 문서만 수집하고 정규화는 생략")
    .action(async (opts) => {
      const { run } = await import("./scrape/index.js");
      process.exitCode = await run({
        out: opts.out,
        dst: opts.dst,
        normalize: opts.normalize,
        maintainer: opts.maintainer,
      });
    })), SCRAPE_HELP);

  // ── scrape-api ──────────────────────────────────────────────────────────────
  addGuidance(addOutputOptions(program
    .command("scrape-api")
    .description(SCRAPE_API_DESCRIPTION)
    .option("--out <path>", "저장 디렉터리 (기본값: ./raws/commerce-api/current)")
    .option("--dst <path>", "정규화된 문서 루트 디렉터리 (기본값: ./docs)")
    .option("--maintainer", "maintainer 전용 raw 수집임을 명시적으로 확인")
    .option("--no-normalize", "raw 문서만 수집하고 정규화는 생략")
    .action(async (opts) => {
      const { run } = await import("./scrape-api/index.js");
      process.exitCode = await run({
        out: opts.out,
        dst: opts.dst,
        normalize: opts.normalize,
        maintainer: opts.maintainer,
      });
    })), SCRAPE_HELP);

  const docsCmd = program.command("docs").description(DOCS_GROUP_DESCRIPTION);
  addGuidance(docsCmd, DOCS_GROUP_HELP);
  addGuidance(addOutputOptions(docsCmd
    .command("ask")
    .description(ASK_DESCRIPTION)
    .argument("<question...>", "질문 문장")
    .option("--dst <path>", "문서 루트 디렉터리 (기본값: ./docs, 없으면 패키지 내 docs/)")
    .option("--limit <number>", "최대 반환 수 (기본값: 3)")
    .option("--format <mode>", "출력 포맷 (default|compact, 기본값: default)")
    .option("--body", "매치 문서 본문 포함")
    .action(async (question, opts) => {
      const { run } = await import("./ask/index.js");
      process.exitCode = run(question, opts);
    })), ASK_HELP);
  addGuidance(addOutputOptions(docsCmd
    .command("api")
    .description(API_DESCRIPTION)
    .option("--dst <path>", "문서 루트 디렉터리 (기본값: ./docs, 없으면 패키지 내 docs/)")
    .option("--method <method>", "HTTP 메서드 (GET/POST/PUT/PATCH/DELETE)")
    .option("--path <apiPath>", "API 경로 (/v2/products)")
    .option("--doc-id <docId>", "문서 doc-id")
    .option("--query <text>", "제목, 경로, 설명, 본문 검색어")
    .option("--body", "본문 포함")
    .option("--limit <number>", "최대 반환 수 (기본값: 10)")
    .action(async (opts) => {
      const { run } = await import("./api/index.js");
      process.exitCode = run(opts);
    })), API_HELP);
  addOutputOptions(docsCmd
    .command("llms")
    .description(LLMS_DESCRIPTION)
    .option("--dst <path>", "문서 루트 디렉터리 (기본값: ./docs)")
    .action(async (opts) => {
      const { run } = await import("./llms/index.js");
      process.exitCode = run(opts);
    }));

  const sourceCmd = program.command("source").description(SOURCE_GROUP_DESCRIPTION);
  addGuidance(sourceCmd, SOURCE_GROUP_HELP);
  addGuidance(addOutputOptions(sourceCmd
    .command("scrape")
    .description(SCRAPE_DESCRIPTION)
    .option("--out <path>", "저장 디렉터리 (기본값: ./raws)")
    .option("--dst <path>", "정규화된 문서 루트 디렉터리 (기본값: ./docs)")
    .option("--maintainer", "maintainer 전용 raw 수집임을 명시적으로 확인")
    .option("--no-normalize", "raw 문서만 수집하고 정규화는 생략")
    .action(async (opts) => {
      const { run } = await import("./scrape/index.js");
      process.exitCode = await run({
        out: opts.out,
        dst: opts.dst,
        normalize: opts.normalize,
        maintainer: opts.maintainer,
      });
    })), SCRAPE_HELP);
  addGuidance(addOutputOptions(sourceCmd
    .command("sync")
    .description(SYNC_DESCRIPTION)
    .option("--out <path>", "저장 디렉터리 (기본값: CLI managed cache/raws/commerce-api/current)")
    .option("--dst <path>", "정규화된 문서 루트 디렉터리 (기본값: CLI managed cache/docs)")
    .option("--latest", "최신 upstream 문서로 managed cache를 갱신함을 명시적으로 확인")
    .option("--summary", "validate 단계에서 lint 요약만 출력 (기본값: true)")
    .action(async (opts) => {
      const { run } = await import("./sync/index.js");
      process.exitCode = await run({
        out: opts.out,
        dst: opts.dst,
        latest: opts.latest,
        summary: opts.summary ?? true,
      });
    })), SYNC_HELP);
  addOutputOptions(sourceCmd
    .command("normalize")
    .description(NORMALIZE_DESCRIPTION)
    .option("--src <path>", "정규화 소스 디렉터리 (기본값: ./raws/commerce-api/current)")
    .option("--dst <path>", "문서 루트 디렉터리 (기본값: ./docs)")
    .action(async (opts) => {
      const { run } = await import("./transform/index.js");
      process.exitCode = run({
        src: opts.src,
        dst: opts.dst,
      });
    }));

  const checkCmd = program.command("check").description(CHECK_GROUP_DESCRIPTION);
  addOutputOptions(checkCmd
    .command("all")
    .description(VALIDATE_DESCRIPTION)
    .option("--src <path>", "정규화 소스 디렉터리 (기본값: ./raws/commerce-api/current)")
    .option("--dst <path>", "문서 루트 디렉터리 (기본값: ./docs, 없으면 패키지 내 docs/)")
    .option("--fix", "raws 기준으로 docs/를 정규화 재생성 후 검증 수행")
    .option("--summary", "lint는 요약만 출력 (기본값: true)")
    .action(async (opts) => {
      const { run } = await import("./check/index.js");
      process.exitCode = run({
        src: opts.src,
        dst: opts.dst,
        fix: opts.fix,
        summary: opts.summary ?? true,
      });
    }));
  addOutputOptions(checkCmd
    .command("lint")
    .description(LINT_DESCRIPTION)
    .option("--src <path>", "정규화 소스 디렉터리 (기본값: ./raws/commerce-api/current)")
    .option("--dst <path>", "문서 루트 디렉터리 (기본값: ./docs, 없으면 패키지 내 docs/)")
    .option("--fix", "raws 기준으로 docs/를 정규화 재생성 후 lint 수행")
    .option("--summary", "코드별 요약만 출력 (상세 목록 생략)")
    .action(async (opts) => {
      const { run } = await import("./lint/index.js");
      process.exitCode = run({
        src: opts.src,
        dst: opts.dst,
        fix: opts.fix,
        summary: opts.summary,
      });
    }));
  addOutputOptions(checkCmd
    .command("review")
    .description(REVIEW_DESCRIPTION)
    .option("--dst <path>", "문서 루트 디렉터리 (기본값: ./docs, 없으면 패키지 내 docs/)")
    .action(async (opts) => {
      const { run } = await import("./review/index.js");
      process.exitCode = run({ dst: opts.dst });
    }));
  addOutputOptions(checkCmd
    .command("noise")
    .description(NOISE_DESCRIPTION)
    .option("--dst <path>", "문서 루트 디렉터리 (기본값: ./docs, 없으면 패키지 내 docs/)")
    .action(async (opts) => {
      const { run } = await import("./noise/index.js");
      process.exitCode = run({ dst: opts.dst });
    }));

  const agentCmd = program.command("agent").description(AGENT_GROUP_DESCRIPTION);
  addOutputOptions(agentCmd
    .command("init")
    .description(INIT_DESCRIPTION)
    .option(
      "--target <targets>",
      "설치 대상 (all|codex|claude|cursor|gemini|antigravity, comma-separated)",
      "all",
    )
    .option("--root <path>", "대상 프로젝트 루트 (기본값: 현재 작업 디렉터리)")
    .action(async (opts) => {
      const { run } = await import("./init/index.js");
      process.exitCode = run(opts);
    }));

  return program;
}

export async function run(argv: string[] = process.argv): Promise<number> {
  const program = buildProgram();
  setOutputMode("default");
  process.exitCode = undefined;
  try {
    await program.parseAsync(argv);
    return process.exitCode ?? 0;
  } catch (error: unknown) {
    if (error instanceof CommanderError) return error.exitCode;
    throw error;
  }
}

if (process.argv[1] && isCurrentEntrypoint(process.argv[1])) {
  run()
    .then((code) => {
      process.exitCode = code;
    })
    .catch((err: unknown) => {
      process.stderr.write(String(err) + "\n");
      process.exit(1);
    });
}
