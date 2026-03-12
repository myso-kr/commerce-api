import fs from "node:fs";
import path from "node:path";
import { error, info, setCmd, verbose, warn } from "../core/emit.js";
import { emitGuide } from "../core/guide.js";
import { loadInitTemplates } from "./templates.js";

const SKILL_NAME = "naver-commerce-api-docs-cli";
const BLOCK_PREFIX = "naver-commerce-api-docs-cli:init";
const LEGACY_BLOCK_PREFIX = "naver-commerce-api-docs:init";
const SUPPORTED_TARGETS = [
  "codex",
  "claude",
  "cursor",
  "gemini",
  "antigravity",
] as const;

type InitTarget = (typeof SUPPORTED_TARGETS)[number];
type FileAction = "created" | "updated" | "appended" | "unchanged";

export interface InitOpts {
  target?: string | string[];
  root?: string;
}

interface InitState {
  root: string;
  targets: InitTarget[];
  created: number;
  updated: number;
  appended: number;
  unchanged: number;
  files: string[];
}

export function run(opts: InitOpts): number {
  setCmd("init");

  const root = path.resolve(opts.root ?? process.cwd());
  const targets = parseTargets(opts.target);
  if (targets.length === 0) {
    error("usage", {
      msg: `--target 는 all 또는 ${SUPPORTED_TARGETS.join(", ")} 중 하나여야 합니다.`,
      ok: false,
    });
    return 1;
  }

  let templates;
  try {
    templates = loadInitTemplates();
  } catch (err: unknown) {
    error("templates", {
      msg: err instanceof Error ? err.message : String(err),
      ok: false,
    });
    return 1;
  }

  const state: InitState = {
    root,
    targets,
    created: 0,
    updated: 0,
    appended: 0,
    unchanged: 0,
    files: [],
  };

  verbose("start", {
    root,
    targets,
  });

  fs.mkdirSync(root, { recursive: true });

  if (targets.includes("codex") || targets.includes("antigravity")) {
    writeOwnedFile(
      state,
      path.join(root, ".agents", "skills", SKILL_NAME, "SKILL.md"),
      templates.codexSkill,
    );
  }

  if (targets.includes("claude")) {
    writeOwnedFile(
      state,
      path.join(root, ".claude", "skills", SKILL_NAME, "SKILL.md"),
      templates.claudeSkill,
    );
  }

  if (targets.includes("gemini")) {
    writeOwnedFile(
      state,
      path.join(root, ".gemini", "skills", SKILL_NAME, "SKILL.md"),
      templates.geminiSkill,
    );
  }

  if (targets.includes("cursor")) {
    writeOwnedFile(
      state,
      path.join(root, ".cursor", "rules", `${SKILL_NAME}.mdc`),
      templates.cursorRule,
    );
  }

  if (targets.includes("codex") || targets.includes("cursor") || targets.includes("antigravity")) {
    upsertSharedBlock(
      state,
      path.join(root, "AGENTS.md"),
      "agents",
      templates.agentsBlock,
    );
  }

  if (targets.includes("claude")) {
    upsertSharedBlock(
      state,
      path.join(root, "CLAUDE.md"),
      "claude",
      templates.claudeBlock,
    );
  }

  if (targets.includes("gemini")) {
    upsertSharedBlock(
      state,
      path.join(root, "GEMINI.md"),
      "gemini",
      templates.geminiBlock,
    );
  }

  if (targets.includes("antigravity")) {
    warn("target_inferred", {
      target: "antigravity",
      mode: "compat",
      detail: "공식 Antigravity skill 경로 문서를 찾지 못해 .agents/skills 와 AGENTS.md 기반 호환 모드로 설치했습니다.",
    });
  }

  info("done", {
    root,
    targets,
    created: state.created,
    updated: state.updated,
    appended: state.appended,
    unchanged: state.unchanged,
    files: state.files,
    ok: true,
  });
  emitGuide({
    use_for: "Use the installed agent files to route Naver Commerce API tasks to this CLI from the target project.",
    next_steps: [
      "Commit the generated agent files if this project should keep them under version control.",
      "Run `npx naver-commerce-api-docs-cli ask \"<question>\"` in the target project to verify retrieval against bundled docs.",
      "Run `npx naver-commerce-api-docs-cli api --path <path> --method <METHOD> --body` for exact endpoint grounding.",
      "Request `npx naver-commerce-api-docs-cli sync` only when upstream developer docs changed and the managed cache corpus must be refreshed.",
    ],
    caution: targets.includes("antigravity")
      ? "Antigravity support is compatibility mode based on .agents/skills and AGENTS.md."
      : undefined,
    artifacts: state.files,
  });
  return 0;
}

function parseTargets(input: string | string[] | undefined): InitTarget[] {
  const rawValues = Array.isArray(input) ? input : [input ?? "all"];
  const values = rawValues
    .flatMap((value) => value.split(/[,\s]+/))
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (values.includes("all")) return [...SUPPORTED_TARGETS];

  const targets = values.filter(isInitTarget);
  if (targets.length !== values.length) return [];
  return [...new Set(targets)];
}

function isInitTarget(value: string): value is InitTarget {
  return SUPPORTED_TARGETS.includes(value as InitTarget);
}

function writeOwnedFile(state: InitState, filePath: string, content: string): void {
  const next = normalizeTrailingNewline(content);
  const current = readTextFile(filePath);
  const action: FileAction = current === null ? "created" : current === next ? "unchanged" : "updated";

  if (action !== "unchanged") {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, next, "utf-8");
  }

  recordAction(state, filePath, action);
}

function upsertSharedBlock(
  state: InitState,
  filePath: string,
  blockName: string,
  content: string,
): void {
  const start = `<!-- ${BLOCK_PREFIX}:${blockName}:start -->`;
  const end = `<!-- ${BLOCK_PREFIX}:${blockName}:end -->`;
  const legacyStart = `<!-- ${LEGACY_BLOCK_PREFIX}:${blockName}:start -->`;
  const legacyEnd = `<!-- ${LEGACY_BLOCK_PREFIX}:${blockName}:end -->`;
  const block = normalizeTrailingNewline(`${start}\n${content.trim()}\n${end}\n`);
  const current = readTextFile(filePath);

  let next = block;
  let action: FileAction = "created";

  if (current !== null) {
    const hasManagedBlock = current.includes(start) && current.includes(end);
    const hasLegacyManagedBlock = current.includes(legacyStart) && current.includes(legacyEnd);
    if (hasManagedBlock) {
      next = normalizeTrailingNewline(
        current.replace(new RegExp(`${escapeRegex(start)}[\\s\\S]*?${escapeRegex(end)}\\s*`, "m"), block),
      );
      action = next === current ? "unchanged" : "updated";
    } else if (hasLegacyManagedBlock) {
      next = normalizeTrailingNewline(
        current.replace(
          new RegExp(`${escapeRegex(legacyStart)}[\\s\\S]*?${escapeRegex(legacyEnd)}\\s*`, "m"),
          block,
        ),
      );
      action = next === current ? "unchanged" : "updated";
    } else {
      const trimmed = current.trimEnd();
      next = normalizeTrailingNewline(`${trimmed}${trimmed ? "\n\n" : ""}${block}`);
      action = next === current ? "unchanged" : "appended";
    }
  }

  if (action !== "unchanged") {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, next, "utf-8");
  }

  recordAction(state, filePath, action);
}

function recordAction(state: InitState, filePath: string, action: FileAction): void {
  if (action === "created") state.created += 1;
  else if (action === "updated") state.updated += 1;
  else if (action === "appended") state.appended += 1;
  else state.unchanged += 1;

  state.files.push(relativePath(state.root, filePath));
  verbose("file", {
    file: relativePath(state.root, filePath),
    action,
  });
}

function readTextFile(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}

function relativePath(root: string, filePath: string): string {
  return path.relative(root, filePath).replace(/\\/g, "/");
}

function normalizeTrailingNewline(value: string): string {
  return value.replace(/\r\n/g, "\n").replace(/\s*$/, "\n");
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
