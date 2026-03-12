import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";
import { resolveLegacyManagedStateRootsFor, resolveManagedDocsRoot } from "../src/core/paths.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CLI = path.join(ROOT, "dist", "cli.js");

async function runCli(args: string[], opts: { cwd?: string } = {}) {
  const originalArgv = [...process.argv];
  const originalCwd = process.cwd();
  const originalExitCode = process.exitCode;
  const originalStdoutWrite = process.stdout.write.bind(process.stdout);
  const originalStderrWrite = process.stderr.write.bind(process.stderr);
  let stdout = "";
  let stderr = "";

  process.stdout.write = ((chunk: string | Uint8Array, encoding?: BufferEncoding | ((err?: Error) => void), callback?: (err?: Error) => void) => {
    stdout += stringifyChunk(chunk, encoding);
    if (typeof encoding === "function") encoding();
    if (typeof callback === "function") callback();
    return true;
  }) as typeof process.stdout.write;
  process.stderr.write = ((chunk: string | Uint8Array, encoding?: BufferEncoding | ((err?: Error) => void), callback?: (err?: Error) => void) => {
    stderr += stringifyChunk(chunk, encoding);
    if (typeof encoding === "function") encoding();
    if (typeof callback === "function") callback();
    return true;
  }) as typeof process.stderr.write;

  try {
    if (opts.cwd) process.chdir(opts.cwd);
    const cliModule = await import(`${pathToFileURL(CLI).href}?test=${Math.random()}`);
    const status = await cliModule.run([process.execPath, CLI, ...args]);
    return { status, stdout, stderr };
  } finally {
    process.argv = originalArgv;
    process.chdir(originalCwd);
    process.exitCode = originalExitCode;
    process.stdout.write = originalStdoutWrite;
    process.stderr.write = originalStderrWrite;
  }
}

function parseJsonLines(stdout: string) {
  return stdout
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line) as Record<string, unknown>);
}

function stringifyChunk(
  chunk: string | Uint8Array,
  encoding?: BufferEncoding | ((err?: Error) => void),
) {
  if (typeof chunk === "string") return chunk;
  return chunk.toString(typeof encoding === "string" ? encoding : undefined);
}

function makeTempDir(prefix: string) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

async function withTempManagedEnv<T>(root: string, run: () => Promise<T> | T): Promise<T> {
  const prevLocalAppData = process.env.LOCALAPPDATA;
  const prevXdgCacheHome = process.env.XDG_CACHE_HOME;
  const prevHome = process.env.HOME;
  const prevUserProfile = process.env.USERPROFILE;

  process.env.LOCALAPPDATA = root;
  process.env.XDG_CACHE_HOME = root;
  process.env.HOME = root;
  process.env.USERPROFILE = root;

  try {
    return await run();
  } finally {
    if (prevLocalAppData === undefined) delete process.env.LOCALAPPDATA;
    else process.env.LOCALAPPDATA = prevLocalAppData;

    if (prevXdgCacheHome === undefined) delete process.env.XDG_CACHE_HOME;
    else process.env.XDG_CACHE_HOME = prevXdgCacheHome;

    if (prevHome === undefined) delete process.env.HOME;
    else process.env.HOME = prevHome;

    if (prevUserProfile === undefined) delete process.env.USERPROFILE;
    else process.env.USERPROFILE = prevUserProfile;
  }
}

describe("CLI smoke", () => {
  it("exposes major commands in help", async () => {
    const result = await runCli(["--help"]);
    expect(result.status).toBe(0);
    expect(result.stdout).toMatch(/Usage: naver-commerce-api-docs-cli /);
    expect(result.stdout).toMatch(/ask \[options\] <question\.\.\.>/);
    expect(result.stdout).toMatch(/init \[options\]/);
    expect(result.stdout).toMatch(/api \[options\]/);
    expect(result.stdout).toMatch(/normalize \[options\]/);
    expect(result.stdout).toMatch(/sync \[options\]/);
    expect(result.stdout).toMatch(/validate \[options\]/);
    expect(result.stdout).toMatch(/llms \[options\]/);
    expect(result.stdout).toMatch(/transform \[options\]/);
    expect(result.stdout).toMatch(/docs/);
    expect(result.stdout).toMatch(/source/);
    expect(result.stdout).toMatch(/check/);
    expect(result.stdout).toMatch(/agent/);
  });

  it("returns ranked evidence for a natural-language auth question", async () => {
    const result = await runCli(["ask", "smartstore", "인증하려면", "어떻게", "해야해?"]);
    expect(result.status).toBe(0);

    const events = parseJsonLines(result.stdout);
    const matches = events.filter((event) => event.event === "match");
    const files = matches.map((event) => String(event.file));
    const tokenDoc = matches.find((event) => event.file === "api/v1/oauth2/token.POST.md");
    const done = events.find((event) => event.event === "done");
    const guide = events.find((event) => event.event === "guide");

    expect(events.some((event) => event.event === "answer")).toBe(false);
    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0]?.rank).toBe(1);
    expect(files).toContain("api/v1/oauth2/token.POST.md");
    expect(Number(tokenDoc?.rank ?? 999)).toBeLessThanOrEqual(3);
    expect(tokenDoc?.method).toBe("POST");
    expect(tokenDoc?.path).toBe("/v1/oauth2/token");
    expect(done?.question).toBe("smartstore 인증하려면 어떻게 해야해?");
    expect(guide?.audience).toBe("agent");
  });

  it("prioritizes the product creation endpoint for product creation questions", async () => {
    const result = await runCli([
      "ask",
      "--format",
      "compact",
      "Which API endpoint creates a new product in Naver Commerce?",
      "Include the exact POST path, request body media type, and auth requirements.",
    ]);
    expect(result.status).toBe(0);

    const events = parseJsonLines(result.stdout);
    const matches = events.filter((event) => event.event === "match");
    const guide = events.find((event) => event.event === "guide");

    expect(matches[0]?.file).toBe("api/v2/products.POST.md");
    expect(matches[0]?.method).toBe("POST");
    expect(matches[0]?.path).toBe("/v2/products");
    expect(Array.isArray(guide?.next_steps)).toBe(true);
    expect((guide?.next_steps as string[])[0]).toContain("api --path /v2/products --method POST --body");
  });

  it("runs correctly through a linked node_modules-style cli path", () => {
    const tmpRoot = makeTempDir("naver-commerce-api-docs-linked-cli-");
    const linkedRoot = path.join(tmpRoot, "pkg");
    fs.symlinkSync(ROOT, linkedRoot, process.platform === "win32" ? "junction" : "dir");

    const result = spawnSync(
      process.execPath,
      [path.join(linkedRoot, "dist", "cli.js"), "ask", "smartstore", "인증하려면", "어떻게", "해야해?"],
      {
        cwd: tmpRoot,
        encoding: "utf-8",
      },
    );

    expect(result.status).toBe(0);
    const events = parseJsonLines(result.stdout);
    expect(events.some((event) => event.event === "match")).toBe(true);
    expect(events.some((event) => event.event === "guide")).toBe(true);
  });

  it("emits rewritten token details for ask in verbose mode", async () => {
    const result = await runCli(["ask", "--verbose", "smartstore", "인증하려면", "어떻게", "해야해?"]);
    expect(result.status).toBe(0);

    const events = parseJsonLines(result.stdout);
    const start = events.find((event) => event.event === "start");

    expect(start).toBeTruthy();
    expect(Array.isArray(start?.expanded_tokens)).toBe(true);
    expect(start?.expanded_tokens).toContain("oauth2");
  });

  it("returns a compact ask payload when requested", async () => {
    const result = await runCli([
      "ask",
      "--format",
      "compact",
      "--limit",
      "1",
      "smartstore",
      "인증하려면",
      "어떻게",
      "해야해?",
    ]);
    expect(result.status).toBe(0);

    const events = parseJsonLines(result.stdout);
    const match = events.find((event) => event.event === "match");
    const done = events.find((event) => event.event === "done");
    const guide = events.find((event) => event.event === "guide");

    expect(match).toBeTruthy();
    expect(match?.rank).toBe(1);
    expect(match?.file).toBe("api/v1/oauth2/token.POST.md");
    expect(match?.path).toBe("/v1/oauth2/token");
    expect(match?.excerpt).toBeTruthy();
    expect("tags" in (match ?? {})).toBe(false);
    expect("description" in (match ?? {})).toBe(false);
    expect("score" in (match ?? {})).toBe(false);
    expect("matched_terms" in (match ?? {})).toBe(false);
    expect("source" in (match ?? {})).toBe(false);
    expect(done?.format).toBe("compact");
    expect(guide?.audience).toBe("agent");
  });

  it("installs agent files and appends an existing AGENTS.md block", async () => {
    const tmpRoot = makeTempDir("naver-commerce-api-docs-init-");
    const existingAgents = path.join(tmpRoot, "AGENTS.md");
    fs.writeFileSync(
      existingAgents,
      [
        "# Existing instructions",
        "",
        "<!-- naver-commerce-api-docs:init:agents:start -->",
        "legacy block",
        "<!-- naver-commerce-api-docs:init:agents:end -->",
        "",
      ].join("\n"),
      "utf-8",
    );

    const first = await runCli([
      "init",
      "--target",
      "codex,claude,cursor,gemini,antigravity",
      "--root",
      tmpRoot,
    ]);
    expect(first.status).toBe(0);

    const agentsContent = fs.readFileSync(existingAgents, "utf-8");
    expect(agentsContent).toMatch(/^# Existing instructions/m);
    expect(agentsContent).toMatch(/naver-commerce-api-docs-cli:init:agents:start/);
    expect(agentsContent).not.toMatch(/naver-commerce-api-docs:init:agents:start/);
    expect(
      fs.existsSync(path.join(tmpRoot, ".agents", "skills", "naver-commerce-api-docs-cli", "SKILL.md")),
    ).toBe(true);
    const codexSkill = fs.readFileSync(
      path.join(tmpRoot, ".agents", "skills", "naver-commerce-api-docs-cli", "SKILL.md"),
      "utf-8",
    );
    expect(codexSkill).toMatch(/Use the final `guide` event/);
    expect(
      fs.existsSync(path.join(tmpRoot, ".claude", "skills", "naver-commerce-api-docs-cli", "SKILL.md")),
    ).toBe(true);
    expect(
      fs.existsSync(path.join(tmpRoot, ".gemini", "skills", "naver-commerce-api-docs-cli", "SKILL.md")),
    ).toBe(true);
    expect(
      fs.existsSync(path.join(tmpRoot, ".cursor", "rules", "naver-commerce-api-docs-cli.mdc")),
    ).toBe(true);
    expect(fs.existsSync(path.join(tmpRoot, "CLAUDE.md"))).toBe(true);
    expect(fs.existsSync(path.join(tmpRoot, "GEMINI.md"))).toBe(true);

    const firstEvents = parseJsonLines(first.stdout);
    const fileEvents = firstEvents.filter((event) => event.event === "file");
    expect(firstEvents.some((event) => event.event === "start")).toBe(true);
    expect(fileEvents.length).toBeGreaterThan(0);
    expect(fileEvents.some((event) => event.action === "created" || event.action === "appended")).toBe(true);
    expect(
      firstEvents.some(
        (event) => event.event === "target_inferred" && event.target === "antigravity",
      ),
    ).toBe(true);
    expect(firstEvents.some((event) => event.event === "guide")).toBe(true);
    expect(codexSkill).toMatch(/do not start by reading repository source code/i);
    expect(codexSkill).toMatch(/do not inspect `node_modules\/naver-commerce-api-docs-cli\/`/i);
    expect(codexSkill).toMatch(/subprocess-only tool/i);

    const second = await runCli([
      "init",
      "--target",
      "codex,cursor",
      "--root",
      tmpRoot,
    ]);
    expect(second.status).toBe(0);

    const updatedAgentsContent = fs.readFileSync(existingAgents, "utf-8");
    expect(
      updatedAgentsContent.match(/naver-commerce-api-docs-cli:init:agents:start/g)?.length ?? 0,
    ).toBe(1);
  });

  it("installs AGENTS.md even for a claude-only target", async () => {
    const tmpRoot = makeTempDir("naver-commerce-api-docs-init-claude-");

    const result = await runCli([
      "init",
      "--target",
      "claude",
      "--root",
      tmpRoot,
    ]);
    expect(result.status).toBe(0);

    const agentsPath = path.join(tmpRoot, "AGENTS.md");
    const claudePath = path.join(tmpRoot, "CLAUDE.md");

    expect(fs.existsSync(agentsPath)).toBe(true);
    expect(fs.existsSync(claudePath)).toBe(true);

    const agentsContent = fs.readFileSync(agentsPath, "utf-8");
    expect(agentsContent).toMatch(/AGENTS\.md.*highest-priority local workflow rule/i);
    expect(agentsContent).toMatch(/Do not use web search or external browsing/i);
    expect(agentsContent).toMatch(/Do not inspect `node_modules\/naver-commerce-api-docs-cli\/` directly for evidence/i);
  });

  it("finds an exact API document match", async () => {
    const result = await runCli(["api", "--path", "/v2/products", "--method", "POST"]);
    expect(result.status).toBe(0);

    const events = parseJsonLines(result.stdout);
    const match = events.find((event) => event.event === "match");
    const guide = events.find((event) => event.event === "guide");

    expect(match).toBeTruthy();
    expect(match?.doc_id).toBe("v2-products-post");
    expect(match?.method).toBe("POST");
    expect(match?.path).toBe("/v2/products");
    expect(String(match?.body ?? "")).toMatch(/# \(v2\) 상품 등록/);
    expect(guide?.audience).toBe("agent");
  });

  it("supports docs api as a grouped alias", async () => {
    const result = await runCli(["docs", "api", "--path", "/v2/products", "--method", "POST"]);
    expect(result.status).toBe(0);

    const events = parseJsonLines(result.stdout);
    const match = events.find((event) => event.event === "match");

    expect(match?.doc_id).toBe("v2-products-post");
    expect(match?.path).toBe("/v2/products");
  });

  it("returns multiple matches without body by default", async () => {
    const result = await runCli([
      "api",
      "--path",
      "/v2/standard-group-products/{groupProductNo}",
      "--limit",
      "2",
    ]);
    expect(result.status).toBe(0);

    const events = parseJsonLines(result.stdout);
    const matches = events.filter((event) => event.event === "match");
    const done = events.find((event) => event.event === "done");

    expect(matches).toHaveLength(2);
    expect(matches.every((event) => !("body" in event))).toBe(true);
    expect(done).toBeTruthy();
    expect(done?.matched).toBe(3);
    expect(done?.returned).toBe(2);
    expect(done?.truncated).toBe(true);
  });

  it("returns a usage error without a selector", async () => {
    const result = await runCli(["api"]);
    expect(result.status).toBe(1);

    const events = parseJsonLines(result.stdout);
    expect(events.at(-1)?.event).toBe("usage");
  });

  it("returns not_found for an unknown doc id", async () => {
    const result = await runCli(["api", "--doc-id", "missing-doc-id"]);
    expect(result.status).toBe(1);

    const events = parseJsonLines(result.stdout);
    expect(events.at(-1)?.event).toBe("not_found");
  });

  it("falls back to bundled docs when cwd/docs is missing", async () => {
    const tmpRoot = makeTempDir("naver-commerce-api-docs-bundled-");
    const tmpManagedRoot = makeTempDir("naver-commerce-api-docs-empty-cache-");
    await withTempManagedEnv(tmpManagedRoot, async () => {
      const result = await runCli(
        ["api", "--path", "/v2/products", "--method", "POST"],
        { cwd: tmpRoot },
      );

      expect(result.status).toBe(0);
      const events = parseJsonLines(result.stdout);
      expect(events.some((event) => event.event === "match")).toBe(true);
    });
  });

  it("prefers managed synced cache docs over bundled docs when cwd/docs is missing", async () => {
    const tmpRoot = makeTempDir("naver-commerce-api-docs-managed-read-");
    const tmpManagedRoot = makeTempDir("naver-commerce-api-docs-managed-cache-");
    await withTempManagedEnv(tmpManagedRoot, async () => {
      const managedDocsRoot = resolveManagedDocsRoot();
      const managedFile = path.join(managedDocsRoot, "api", "v2", "products.POST.md");
      fs.mkdirSync(path.dirname(managedFile), { recursive: true });

      const bundledFile = path.join(ROOT, "docs", "api", "v2", "products.POST.md");
      const managedContent = fs
        .readFileSync(bundledFile, "utf-8")
        .replace("# (v2) 상품 등록", "# (v2) 상품 등록 [managed-cache]");
      fs.writeFileSync(managedFile, managedContent, "utf-8");

      const result = await runCli(
        ["api", "--path", "/v2/products", "--method", "POST"],
        { cwd: tmpRoot },
      );

      expect(result.status).toBe(0);
      const events = parseJsonLines(result.stdout);
      const match = events.find((event) => event.event === "match");
      expect(String(match?.body ?? "")).toContain("[managed-cache]");
    });
  });

  it("ships bundled docs in the published package contract", () => {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(ROOT, "package.json"), "utf-8"),
    ) as { name?: string; files?: string[]; bin?: Record<string, string> };
    expect(packageJson.name).toBe("naver-commerce-api-docs-cli");
    expect(packageJson.files).toContain("docs");
    expect(packageJson.bin?.["naver-commerce-api-docs-cli"]).toBe("./dist/cli.js");
    expect(packageJson.bin?.["naver-commerce-api-docs"]).toBeUndefined();
    expect(packageJson.bin?.ncad).toBe("./dist/cli.js");
    expect(fs.existsSync(path.join(ROOT, "docs", "api"))).toBe(true);
    expect(fs.existsSync(path.join(ROOT, "docs", "assets"))).toBe(false);
    expect(fs.existsSync(path.join(ROOT, "docs", "index.html"))).toBe(false);
    expect(fs.existsSync(path.join(ROOT, "docs", "2.0.0-RC.js"))).toBe(false);
  });

  it("falls back to legacy managed cache docs when present", async () => {
    const tmpRoot = makeTempDir("naver-commerce-api-docs-legacy-managed-read-");
    const tmpManagedRoot = makeTempDir("naver-commerce-api-docs-legacy-managed-cache-");
    await withTempManagedEnv(tmpManagedRoot, async () => {
      const [legacyManagedRoot] = resolveLegacyManagedStateRootsFor();
      const legacyFile = path.join(legacyManagedRoot, "docs", "api", "v2", "products.POST.md");
      fs.mkdirSync(path.dirname(legacyFile), { recursive: true });

      const bundledFile = path.join(ROOT, "docs", "api", "v2", "products.POST.md");
      const legacyContent = fs
        .readFileSync(bundledFile, "utf-8")
        .replace("# (v2) 상품 등록", "# (v2) 상품 등록 [legacy-managed-cache]");
      fs.writeFileSync(legacyFile, legacyContent, "utf-8");

      const result = await runCli(
        ["api", "--path", "/v2/products", "--method", "POST"],
        { cwd: tmpRoot },
      );

      expect(result.status).toBe(0);
      const events = parseJsonLines(result.stdout);
      const match = events.find((event) => event.event === "match");
      expect(String(match?.body ?? "")).toContain("[legacy-managed-cache]");
    });
  });

  it("generates fresh llms artifacts from a docs directory", async () => {
    const tmpRoot = makeTempDir("naver-commerce-api-docs-llms-");
    const docsRoot = path.join(tmpRoot, "docs");

    fs.mkdirSync(path.join(docsRoot, "api", "v2"), { recursive: true });
    fs.mkdirSync(path.join(docsRoot, "guide"), { recursive: true });
    fs.copyFileSync(
      path.join(ROOT, "docs", "api", "v2", "products.POST.md"),
      path.join(docsRoot, "api", "v2", "products.POST.md"),
    );
    fs.copyFileSync(
      path.join(ROOT, "docs", "guide", "커머스api.md"),
      path.join(docsRoot, "guide", "커머스api.md"),
    );

    const result = await runCli(["llms", "--dst", docsRoot]);
    expect(result.status).toBe(0);
    expect(fs.existsSync(path.join(docsRoot, "llms.txt"))).toBe(true);
    expect(fs.existsSync(path.join(docsRoot, "llms-full.txt"))).toBe(true);

    const llmsTxt = fs.readFileSync(path.join(docsRoot, "llms.txt"), "utf-8");
    const llmsFullTxt = fs.readFileSync(path.join(docsRoot, "llms-full.txt"), "utf-8");
    expect(llmsTxt).toMatch(/## API 엔드포인트/);
    expect(llmsFullTxt).toMatch(/<!-- === FILE: api\/v2\/products\.POST\.md === -->/);
    expect(parseJsonLines(result.stdout).some((event) => event.event === "guide")).toBe(true);
  });

  it("creates docs output and llms artifacts from a source directory", async () => {
    const tmpRoot = makeTempDir("naver-commerce-api-docs-transform-");
    const srcRoot = path.join(tmpRoot, "raws");
    const dstRoot = path.join(tmpRoot, "docs");

    fs.mkdirSync(srcRoot, { recursive: true });
    fs.copyFileSync(
      path.join(ROOT, "raws", "commerce-api", "current", "create-product-product.md"),
      path.join(srcRoot, "create-product-product.md"),
    );

    const result = await runCli(["transform", "--src", srcRoot, "--dst", dstRoot]);
    expect(result.status).toBe(0);
    expect(fs.existsSync(path.join(dstRoot, "api", "v2", "products.POST.md"))).toBe(true);
    expect(fs.existsSync(path.join(dstRoot, "llms.txt"))).toBe(true);
    expect(fs.existsSync(path.join(dstRoot, "llms-full.txt"))).toBe(true);
    expect(parseJsonLines(result.stdout).some((event) => event.event === "guide")).toBe(true);
  });

  it("supports source normalize as a grouped alias", async () => {
    const tmpRoot = makeTempDir("naver-commerce-api-docs-source-normalize-");
    const srcRoot = path.join(tmpRoot, "raws");
    const dstRoot = path.join(tmpRoot, "docs");

    fs.mkdirSync(srcRoot, { recursive: true });
    fs.copyFileSync(
      path.join(ROOT, "raws", "commerce-api", "current", "create-product-product.md"),
      path.join(srcRoot, "create-product-product.md"),
    );

    const result = await runCli(["source", "normalize", "--src", srcRoot, "--dst", dstRoot]);
    expect(result.status).toBe(0);
    expect(fs.existsSync(path.join(dstRoot, "api", "v2", "products.POST.md"))).toBe(true);
    expect(fs.existsSync(path.join(dstRoot, "llms.txt"))).toBe(true);
  });

  it("uses cwd-relative defaults for transform output", async () => {
    const tmpRoot = makeTempDir("naver-commerce-api-docs-cwd-transform-");
    const srcRoot = path.join(tmpRoot, "raws", "commerce-api", "current");
    const dstRoot = path.join(tmpRoot, "docs");

    fs.mkdirSync(srcRoot, { recursive: true });
    fs.copyFileSync(
      path.join(ROOT, "raws", "commerce-api", "current", "create-product-product.md"),
      path.join(srcRoot, "create-product-product.md"),
    );

    const result = await runCli(["transform"], { cwd: tmpRoot });
    expect(result.status).toBe(0);
    expect(fs.existsSync(path.join(dstRoot, "api", "v2", "products.POST.md"))).toBe(true);
    expect(fs.existsSync(path.join(dstRoot, "llms.txt"))).toBe(true);
  });

  it("rebuilds docs from raw source when lint --fix is used", async () => {
    const tmpRoot = makeTempDir("naver-commerce-api-docs-lint-fix-");
    const srcRoot = path.join(tmpRoot, "raws");
    const dstRoot = path.join(tmpRoot, "docs");

    fs.mkdirSync(srcRoot, { recursive: true });
    fs.mkdirSync(path.join(dstRoot, "category"), { recursive: true });
    fs.writeFileSync(path.join(dstRoot, "category", "stale.md"), "# stale\n", "utf-8");
    fs.copyFileSync(
      path.join(ROOT, "raws", "commerce-api", "current", "create-product-product.md"),
      path.join(srcRoot, "create-product-product.md"),
    );

    const result = await runCli([
      "lint",
      "--fix",
      "--src",
      srcRoot,
      "--dst",
      dstRoot,
      "--summary",
      "--verbose",
    ]);

    expect(result.status).toBe(0);
    expect(fs.existsSync(path.join(dstRoot, "category", "stale.md"))).toBe(false);
    expect(fs.existsSync(path.join(dstRoot, "api", "v2", "products.POST.md"))).toBe(true);
    expect(fs.existsSync(path.join(dstRoot, "llms.txt"))).toBe(true);

    const events = parseJsonLines(result.stdout);
    expect(events.some((event) => event.event === "fix_start")).toBe(true);
    expect(events.some((event) => event.event === "fix_done" && event.ok === true)).toBe(true);
    assert.equal(events.at(-2)?.event, "done");
    assert.equal(events.at(-1)?.event, "guide");
  });

  it("filters verbose and debug events", async () => {
    const defaultApi = await runCli(["api", "--path", "/v2/products", "--method", "POST"]);
    const verboseApi = await runCli(["api", "--path", "/v2/products", "--method", "POST", "--verbose"]);

    const defaultEvents = parseJsonLines(defaultApi.stdout);
    const verboseEvents = parseJsonLines(verboseApi.stdout);

    expect(defaultEvents.some((event) => event.event === "start")).toBe(false);
    expect(verboseEvents.some((event) => event.event === "start")).toBe(true);

    const tmpRoot = makeTempDir("naver-commerce-api-docs-debug-");
    const srcRoot = path.join(tmpRoot, "raws", "commerce-api", "current");
    fs.mkdirSync(srcRoot, { recursive: true });
    fs.copyFileSync(
      path.join(ROOT, "raws", "commerce-api", "current", "create-product-product.md"),
      path.join(srcRoot, "create-product-product.md"),
    );

    const defaultTransform = await runCli(["transform"], { cwd: tmpRoot });
    const debugTransform = await runCli(["transform", "--debug"], { cwd: tmpRoot });

    expect(parseJsonLines(defaultTransform.stdout).some((event) => event.event === "file")).toBe(false);
    expect(
      parseJsonLines(debugTransform.stdout).some(
        (event) => event.event === "file" && event.level === "DEBUG",
      ),
    ).toBe(true);
  });

  it("supports validate as a consolidated validation shortcut", async () => {
    const result = await runCli(["validate"]);
    expect(result.status).toBe(0);

    const events = parseJsonLines(result.stdout);
    const guides = events.filter((event) => event.event === "guide");
    const checkDone = events.find((event) => event.event === "done" && event.cmd === "check");

    expect(checkDone?.ok).toBe(true);
    expect(guides).toHaveLength(1);
    expect(guides[0]?.audience).toBe("agent");
  });

  it("does not classify a missing child exit code as a demo-loop failure", () => {
    const loopScript = fs.readFileSync(path.join(ROOT, "scripts", "demo-codex-loop.ps1"), "utf-8");
    expect(loopScript).toContain("if ($null -ne $ChildResult.ExitCode -and $ChildResult.ExitCode -ne 0)");
  });

  it("requires ask and exact api lookups before demo-loop file generation", () => {
    const loopScript = fs.readFileSync(path.join(ROOT, "scripts", "demo-codex-loop.ps1"), "utf-8");
    expect(loopScript).toContain('api --path /v1/oauth2/token --method POST --body');
    expect(loopScript).toContain('api --path /v2/products --method POST --body');
    expect(loopScript).toContain('api --path /v1/products/search --method POST --body');
    expect(loopScript).toContain('GROUNDING_COMPLETE');
    expect(loopScript).toContain('started writing files before the token api lookup completed');
    expect(loopScript).toContain('started writing files before the product api lookup completed');
    expect(loopScript).toContain('started writing files before the product search api lookup completed');
    expect(loopScript).toContain('started writing files before emitting GROUNDING_COMPLETE');
  });

  it("checks internal-import violations against command events instead of raw skill text", () => {
    const loopScript = fs.readFileSync(path.join(ROOT, "scripts", "demo-codex-loop.ps1"), "utf-8");
    expect(loopScript).toContain('$commandExecutionTexts = New-Object System.Collections.Generic.List[string]');
    expect(loopScript).toContain('$commandText = $commandExecutionTexts -join "`n"');
    expect(loopScript).toContain("if ($commandText -match 'naver-commerce-api-docs-cli[\\\\/\\\\\\\\]+dist");
  });

  it("ships a deeper demo mission template for auth-create-search flows", () => {
    const taskTemplate = fs.readFileSync(
      path.join(ROOT, "scripts", "demo-template", "CODEX_TASK.md"),
      "utf-8",
    );
    expect(taskTemplate).toContain("POST /v1/products/search");
    expect(taskTemplate).toContain("GROUNDING_COMPLETE");
    expect(taskTemplate).toContain("searchProducts({ token, criteria, fetchImpl })");
    expect(taskTemplate).toContain("createAndVerifyProduct({ auth, productPayload, fetchImpl })");
  });

  it("uses non-isolated node tests for demo reproducibility in restricted environments", () => {
    const demoPackagePath = path.join(ROOT, "demo", "package.json");
    const templatePackageJson = fs.readFileSync(
      path.join(ROOT, "scripts", "demo-template", "package.json"),
      "utf-8",
    );
    const loopScript = fs.readFileSync(path.join(ROOT, "scripts", "demo-codex-loop.ps1"), "utf-8");

    if (fs.existsSync(demoPackagePath)) {
      const demoPackageJson = fs.readFileSync(demoPackagePath, "utf-8");
      expect(demoPackageJson).toContain('--test-isolation=none');
    }
    expect(templatePackageJson).toContain('--test-isolation=none');
    expect(loopScript).toContain('& node --test --test-isolation=none');
  });

  it("completes lint, review, and noise without crashing", async () => {
    for (const args of [["lint", "--summary"], ["review"], ["noise"]]) {
      const result = await runCli(args);
      expect([0, 1]).toContain(result.status);
      expect(result.stdout).toMatch(/"event":"done"/);
      expect(result.stdout).toMatch(/"event":"guide"/);
      expect(result.stderr).toBe("");
    }
  });
});
