/**
 * review 커맨드 — docs/ 전체 품질 검토.
 */

import fs from "node:fs";
import { setCmd, info, error, verbose } from "../core/emit.js";
import { emitGuide } from "../core/guide.js";
import { resolveReadableDocsRoot } from "../core/paths.js";
import {
  checkStructure,
  checkLinks,
  checkFrontmatter,
  checkContent,
  checkLlms,
  checkCategoryLinks,
  checkDocIdUniqueness,
  checkApiFormat,
} from "./checks.js";

export interface ReviewOpts {
  dst?: string;
  guide?: boolean;
}

export function run(opts: ReviewOpts): number {
  setCmd("review");
  const shouldEmitGuide = opts.guide ?? true;

  const docs = resolveReadableDocsRoot(opts.dst);

  if (!fs.existsSync(docs)) {
    error("start", { msg: `docs 디렉터리가 없음: ${docs}`, ok: false });
    return 1;
  }

  const t0 = performance.now();
  verbose("start", { dst: docs });

  checkStructure(docs);
  const dead = checkLinks(docs);
  checkFrontmatter(docs);
  checkContent(docs);
  checkLlms(docs);
  checkCategoryLinks(docs);
  checkDocIdUniqueness(docs);
  checkApiFormat(docs);

  const elapsedMs = Math.round(performance.now() - t0);
  info("done", { elapsed_ms: elapsedMs, ok: dead === 0 });
  if (shouldEmitGuide) {
    emitGuide({
      use_for: "Use review results as a structural quality gate for dead links, frontmatter, doc ids, and content completeness.",
      next_steps: [
        `Run \`noise --dst ${docs}\` to check leftover rendering noise.`,
        `Run \`ask --dst ${docs} --format compact "<question>"\` to verify retrieval quality on the reviewed corpus.`,
        "Investigate any WARN or ERROR events before publishing the docs as agent-facing context.",
      ],
      caution:
        dead !== 0
          ? "Dead links or structural issues can mislead downstream agents even when retrieval succeeds."
          : undefined,
    });
  }

  return dead === 0 ? 0 : 1;
}
