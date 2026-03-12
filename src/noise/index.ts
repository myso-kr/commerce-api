/**
 * noise 커맨드 — 변환 후 잔여 노이즈 패턴 검사.
 */

import fs from "node:fs";
import { setCmd, info, error, verbose } from "../core/emit.js";
import { emitGuide } from "../core/guide.js";
import { resolveReadableDocsRoot } from "../core/paths.js";
import {
  checkEscapedUnderscores,
  checkDocusaurusLinks,
  checkRawMethodBlocks,
  checkUiTabs,
  checkDirectLinkAnchor,
  countOutputFiles,
} from "./checks.js";

export interface NoiseOpts {
  dst?: string;
  guide?: boolean;
}

export function run(opts: NoiseOpts): number {
  setCmd("noise");
  const shouldEmitGuide = opts.guide ?? true;
  const docs = resolveReadableDocsRoot(opts.dst);

  if (!fs.existsSync(docs)) {
    error("start", { msg: `docs 디렉터리가 없음: ${docs}`, ok: false });
    return 1;
  }

  verbose("start", { dst: docs });

  const t0 = performance.now();

  countOutputFiles(docs);

  const escapedUnderscores = checkEscapedUnderscores(docs);
  const docusaurusLinks    = checkDocusaurusLinks(docs);
  const rawMethodBlocks    = checkRawMethodBlocks(docs);
  const uiTabs             = checkUiTabs(docs);
  const directLinkAnchors  = checkDirectLinkAnchor(docs);

  const totalNoise = escapedUnderscores + docusaurusLinks + rawMethodBlocks + uiTabs + directLinkAnchors;
  const elapsedMs  = Math.round(performance.now() - t0);

  info("done", {
    escaped_underscores: escapedUnderscores,
    docusaurus_links: docusaurusLinks,
    raw_method_blocks: rawMethodBlocks,
    ui_tabs: uiTabs,
    direct_link_anchors: directLinkAnchors,
    total_noise: totalNoise,
    elapsed_ms: elapsedMs,
    ok: totalNoise === 0,
  });
  if (shouldEmitGuide) {
    emitGuide({
      use_for: "Use noise results as a rendering-cleanliness gate after transform or lint --fix.",
      next_steps: [
        `Run \`review --dst ${docs}\` if you still need structural validation.`,
        `Run \`llms --dst ${docs}\` after cleanup when you want fresh LLM ingestion artifacts.`,
        `Run \`ask --dst ${docs} --format compact "<question>"\` to spot-check the cleaned corpus.`,
      ],
      caution:
        totalNoise > 0
          ? "Noise issues often leak UI fragments or malformed markdown into agent-facing context."
          : undefined,
    });
  }

  return totalNoise === 0 ? 0 : 1;
}
