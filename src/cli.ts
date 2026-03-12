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
  addOutputOptions(program);

  program
    .name("naver-commerce-api-docs-cli")
    .description("Naver Commerce API Docs CLI (JSONL output)")
    .version(readVersion());

  program.hook("preAction", (_thisCommand, actionCommand) => {
    const options =
      typeof actionCommand.optsWithGlobals === "function"
        ? actionCommand.optsWithGlobals()
        : program.opts();
    setOutputMode(options.debug ? "debug" : options.verbose ? "verbose" : "default");
  });

  // ── api ─────────────────────────────────────────────────────────────────────
  addOutputOptions(program
    .command("ask")
    .description("자연어 질문을 guide/api 문서 기준으로 검색하고 근거 문서를 반환")
    .argument("<question...>", "질문 문장")
    .option("--dst <path>", "문서 루트 디렉터리 (기본값: ./docs, 없으면 패키지 내 docs/)")
    .option("--limit <number>", "최대 반환 수 (기본값: 3)")
    .option("--format <mode>", "출력 포맷 (default|compact, 기본값: default)")
    .option("--body", "매치 문서 본문 포함")
    .action(async (question, opts) => {
      const { run } = await import("./ask/index.js");
      process.exitCode = run(question, opts);
    }));

  // ── init ───────────────────────────────────────────────────────────────────
  addOutputOptions(program
    .command("init")
    .description("LLM agent 환경용 skill/rule/context 파일 설치")
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

  addOutputOptions(program
    .command("sync")
    .description("최신 개발문서 동기화 (managed cache에 수집 + 정규화 + validate)")
    .option("--out <path>", "저장 디렉터리 (기본값: CLI managed cache/raws/commerce-api/current)")
    .option("--dst <path>", "정규화된 문서 루트 디렉터리 (기본값: CLI managed cache/docs)")
    .option("--summary", "validate 단계에서 lint 요약만 출력 (기본값: true)")
    .action(async (opts) => {
      const { run } = await import("./sync/index.js");
      process.exitCode = await run({
        out: opts.out,
        dst: opts.dst,
        summary: opts.summary ?? true,
      });
    }));

  addOutputOptions(program
    .command("normalize")
    .description("transform shortcut (raws/ -> docs/ 정규화)")
    .option("--src <path>", "소스 디렉터리 (기본값: ./raws/commerce-api/current)")
    .option("--dst <path>", "출력 루트 디렉터리 (기본값: ./docs)")
    .action(async (opts) => {
      const { run } = await import("./transform/index.js");
      process.exitCode = run({ src: opts.src, dst: opts.dst });
    }));

  addOutputOptions(program
    .command("validate")
    .description("lint + review + noise shortcut")
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
  addOutputOptions(program
    .command("api")
    .description("docs/api 문서를 조회하고 반환")
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
    }));

  // ── llms ────────────────────────────────────────────────────────────────────
  addOutputOptions(program
    .command("llms")
    .description("docs/ 기준 llms.txt 및 llms-full.txt를 새로 생성")
    .option("--dst <path>", "문서 루트 디렉터리 (기본값: ./docs)")
    .action(async (opts) => {
      const { run } = await import("./llms/index.js");
      process.exitCode = run(opts);
    }));

  // ── transform ───────────────────────────────────────────────────────────────
  addOutputOptions(program
    .command("transform")
    .description("raws/ → docs/ 변환")
    .option("--src <path>", "소스 디렉터리 (기본값: ./raws/commerce-api/current)")
    .option("--dst <path>", "출력 루트 디렉터리 (기본값: ./docs)")
    .action(async (opts) => {
      const { run } = await import("./transform/index.js");
      process.exitCode = run({ src: opts.src, dst: opts.dst });
    }));

  // ── lint ────────────────────────────────────────────────────────────────────
  addOutputOptions(program
    .command("lint")
    .description("docs/ 린트 검사 (CONVENTION.md 규칙)")
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
    .description("docs/ 전체 품질 검토")
    .option("--dst <path>", "문서 루트 디렉터리 (기본값: ./docs, 없으면 패키지 내 docs/)")
    .action(async (opts) => {
      const { run } = await import("./review/index.js");
      process.exitCode = run({ dst: opts.dst });
    }));

  // ── noise ───────────────────────────────────────────────────────────────────
  addOutputOptions(program
    .command("noise")
    .description("잔여 노이즈 패턴 검사")
    .option("--dst <path>", "문서 루트 디렉터리 (기본값: ./docs, 없으면 패키지 내 docs/)")
    .action(async (opts) => {
      const { run } = await import("./noise/index.js");
      process.exitCode = run({ dst: opts.dst });
    }));

  // ── scrape ──────────────────────────────────────────────────────────────────
  addOutputOptions(program
    .command("scrape")
    .description("apicenter 최상위 docs 스크래핑 (playwright 필요)")
    .option("--out <path>", "저장 디렉터리 (기본값: ./raws)")
    .option("--dst <path>", "정규화된 문서 루트 디렉터리 (기본값: ./docs)")
    .option("--no-normalize", "raw 문서만 수집하고 정규화는 생략")
    .action(async (opts) => {
      const { run } = await import("./scrape/index.js");
      process.exitCode = await run({
        out: opts.out,
        dst: opts.dst,
        normalize: opts.normalize,
      });
    }));

  // ── scrape-api ──────────────────────────────────────────────────────────────
  addOutputOptions(program
    .command("scrape-api")
    .description("commerce-api 심층 BFS 크롤링 (playwright 필요)")
    .option("--out <path>", "저장 디렉터리 (기본값: ./raws/commerce-api/current)")
    .option("--dst <path>", "정규화된 문서 루트 디렉터리 (기본값: ./docs)")
    .option("--no-normalize", "raw 문서만 수집하고 정규화는 생략")
    .action(async (opts) => {
      const { run } = await import("./scrape-api/index.js");
      process.exitCode = await run({
        out: opts.out,
        dst: opts.dst,
        normalize: opts.normalize,
      });
    }));

  const docsCmd = program.command("docs").description("문서 조회/생성 관련 그룹");
  addOutputOptions(docsCmd
    .command("ask")
    .description("자연어 질문을 guide/api 문서 기준으로 검색하고 근거 문서를 반환")
    .argument("<question...>", "질문 문장")
    .option("--dst <path>", "문서 루트 디렉터리 (기본값: ./docs, 없으면 패키지 내 docs/)")
    .option("--limit <number>", "최대 반환 수 (기본값: 3)")
    .option("--format <mode>", "출력 포맷 (default|compact, 기본값: default)")
    .option("--body", "매치 문서 본문 포함")
    .action(async (question, opts) => {
      const { run } = await import("./ask/index.js");
      process.exitCode = run(question, opts);
    }));
  addOutputOptions(docsCmd
    .command("api")
    .description("docs/api 문서를 조회하고 반환")
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
    }));
  addOutputOptions(docsCmd
    .command("llms")
    .description("docs/ 기준 llms.txt 및 llms-full.txt를 새로 생성")
    .option("--dst <path>", "문서 루트 디렉터리 (기본값: ./docs)")
    .action(async (opts) => {
      const { run } = await import("./llms/index.js");
      process.exitCode = run(opts);
    }));

  const sourceCmd = program.command("source").description("raw/source 수집 및 정규화 그룹");
  addOutputOptions(sourceCmd
    .command("scrape")
    .description("apicenter 최상위 docs 스크래핑 (playwright 필요)")
    .option("--out <path>", "저장 디렉터리 (기본값: ./raws)")
    .option("--dst <path>", "정규화된 문서 루트 디렉터리 (기본값: ./docs)")
    .option("--no-normalize", "raw 문서만 수집하고 정규화는 생략")
    .action(async (opts) => {
      const { run } = await import("./scrape/index.js");
      process.exitCode = await run({
        out: opts.out,
        dst: opts.dst,
        normalize: opts.normalize,
      });
    }));
  addOutputOptions(sourceCmd
    .command("sync")
    .description("최신 개발문서 동기화 (managed cache에 수집 + 정규화 + validate)")
    .option("--out <path>", "저장 디렉터리 (기본값: CLI managed cache/raws/commerce-api/current)")
    .option("--dst <path>", "정규화된 문서 루트 디렉터리 (기본값: CLI managed cache/docs)")
    .option("--summary", "validate 단계에서 lint 요약만 출력 (기본값: true)")
    .action(async (opts) => {
      const { run } = await import("./sync/index.js");
      process.exitCode = await run({
        out: opts.out,
        dst: opts.dst,
        summary: opts.summary ?? true,
      });
    }));
  addOutputOptions(sourceCmd
    .command("normalize")
    .description("raws/ -> docs/ 정규화")
    .option("--src <path>", "정규화 소스 디렉터리 (기본값: ./raws/commerce-api/current)")
    .option("--dst <path>", "문서 루트 디렉터리 (기본값: ./docs)")
    .action(async (opts) => {
      const { run } = await import("./transform/index.js");
      process.exitCode = run({
        src: opts.src,
        dst: opts.dst,
      });
    }));

  const checkCmd = program.command("check").description("검증 그룹");
  addOutputOptions(checkCmd
    .command("all")
    .description("lint + review + noise")
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
    .description("docs/ 린트 검사 (CONVENTION.md 규칙)")
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
    .description("docs/ 전체 품질 검토")
    .option("--dst <path>", "문서 루트 디렉터리 (기본값: ./docs, 없으면 패키지 내 docs/)")
    .action(async (opts) => {
      const { run } = await import("./review/index.js");
      process.exitCode = run({ dst: opts.dst });
    }));
  addOutputOptions(checkCmd
    .command("noise")
    .description("잔여 노이즈 패턴 검사")
    .option("--dst <path>", "문서 루트 디렉터리 (기본값: ./docs, 없으면 패키지 내 docs/)")
    .action(async (opts) => {
      const { run } = await import("./noise/index.js");
      process.exitCode = run({ dst: opts.dst });
    }));

  const agentCmd = program.command("agent").description("agent 환경 연동 그룹");
  addOutputOptions(agentCmd
    .command("init")
    .description("LLM agent 환경용 skill/rule/context 파일 설치")
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

if (process.argv[1] && path.resolve(process.argv[1]) === CLI_FILE) {
  run()
    .then((code) => {
      process.exitCode = code;
    })
    .catch((err: unknown) => {
      process.stderr.write(String(err) + "\n");
      process.exit(1);
    });
}
