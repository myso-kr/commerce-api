/**
 * lint 커맨드 — CONVENTION.md 규칙 기반 문서 린트 검사기.
 */

import fs from "node:fs";
import path from "node:path";
import { setCmd, info, warn, error, verbose } from "../core/emit.js";
import { emitGuide } from "../core/guide.js";
import {
  resolveOutputDirs,
  resolveReadableDocsRoot,
  resolveWritableDocsRoot,
  resolveWritableRawsRoot,
} from "../core/paths.js";
import { normalizeScrapedDocs } from "../pipeline/normalize.js";
import { lintFile, type Issue } from "./rules.js";

export interface LintOpts {
  src?: string;
  dst?: string;
  summary?: boolean;
  fix?: boolean;
  guide?: boolean;
}

export function run(opts: LintOpts): number {
  setCmd("lint");
  const fix = opts.fix ?? false;
  const shouldEmitGuide = opts.guide ?? true;
  const src = resolveWritableRawsRoot(opts.src);
  const dst = fix ? resolveWritableDocsRoot(opts.dst) : resolveReadableDocsRoot(opts.dst);
  const summaryOnly = opts.summary ?? false;

  if (fix) {
    verbose("fix_start", { src, dst, clean: true });
    const fixCode = normalizeScrapedDocs({
      cmd: "lint",
      src,
      dst,
      clean: true,
    });
    setCmd("lint");
    if (fixCode !== 0) {
      error("fix_done", { src, dst, ok: false });
      return fixCode;
    }
    verbose("fix_done", { src, dst, ok: true });
  }

  // 검사 대상 파일 수집
  const mdFiles: string[] = [];
  for (const dir of resolveOutputDirs(dst)) {
    if (fs.existsSync(dir)) {
      collectMd(dir, mdFiles);
    }
  }

  if (!mdFiles.length) {
    error("start", { msg: "검사 대상 없음", dst });
    return 1;
  }

  const total = mdFiles.length;
  verbose("start", { total, dst });

  const t0 = performance.now();
  const allIssues: Issue[] = [];

  for (const filePath of mdFiles.sort()) {
    const issues = lintFile(filePath, dst);
    if (!summaryOnly) {
      for (const iss of issues) {
        const emitFn = iss.level === "ERROR" ? error : iss.level === "WARN" ? warn : info;
        emitFn("issue", { code: iss.code, file: iss.file, message: iss.message });
      }
    }
    allIssues.push(...issues);
  }

  const elapsedMs = Math.round(performance.now() - t0);
  const errorsN = allIssues.filter(i => i.level === "ERROR").length;
  const warnsN  = allIssues.filter(i => i.level === "WARN").length;
  const infosN  = allIssues.filter(i => i.level === "INFO").length;

  const byCode: Record<string, number> = {};
  for (const iss of allIssues) byCode[iss.code] = (byCode[iss.code] ?? 0) + 1;

  info("done", { files: total, issues: allIssues.length, errors: errorsN, warns: warnsN, infos: infosN, by_code: byCode, elapsed_ms: elapsedMs, ok: errorsN === 0 });
  if (shouldEmitGuide) {
    emitGuide({
      use_for: "Use lint results as a convention gate before publishing or handing docs to an agent workflow.",
      next_steps: buildLintNextSteps({ fix, src, dst, errorsN }),
      caution:
        errorsN > 0
          ? "Lint errors should be resolved before relying on the normalized docs as an agent-facing corpus."
          : undefined,
      artifacts: ["docs/**", "llms.txt", "llms-full.txt"],
    });
  }

  return errorsN === 0 ? 0 : 1;
}

function collectMd(dir: string, out: string[]): void {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectMd(full, out);
    else if (entry.isFile() && entry.name.endsWith(".md")) out.push(full);
  }
}

function buildLintNextSteps(opts: {
  fix: boolean;
  src: string;
  dst: string;
  errorsN: number;
}): string[] {
  if (!opts.fix && opts.errorsN > 0) {
    return [
      `Run \`lint --fix --src ${opts.src} --dst ${opts.dst}\` to rebuild normalized docs from raw source.`,
      `Run \`review --dst ${opts.dst}\` after lint errors are cleared.`,
      `Run \`noise --dst ${opts.dst}\` to verify rendering cleanliness.`,
    ];
  }

  return [
    `Run \`review --dst ${opts.dst}\` for structure, link, and frontmatter validation.`,
    `Run \`noise --dst ${opts.dst}\` for post-transform cleanliness checks.`,
    `Run \`ask --dst ${opts.dst} --format compact "<question>"\` to verify agent retrieval against the normalized docs.`,
  ];
}
