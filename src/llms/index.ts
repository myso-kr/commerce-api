import fs from "node:fs";
import { setCmd, info, error, verbose } from "../core/emit.js";
import { emitGuide } from "../core/guide.js";
import { resolveWritableDocsRoot } from "../core/paths.js";
import { generateLlmsFullTxtFromDocs, generateLlmsTxtFromDocs } from "../transform/llms.js";

export interface LlmsOpts {
  dst?: string;
}

export function run(opts: LlmsOpts): number {
  setCmd("llms");
  const dst = resolveWritableDocsRoot(opts.dst);

  if (!fs.existsSync(dst)) {
    error("start", { msg: `docs 디렉터리가 없음: ${dst}`, ok: false });
    return 1;
  }

  verbose("start", { dst });
  generateLlmsTxtFromDocs({ dst });
  generateLlmsFullTxtFromDocs({ dst });
  info("done", {
    dst,
    files: ["llms.txt", "llms-full.txt"],
    ok: true,
  });
  emitGuide({
    use_for: "Use llms.txt for lightweight catalog retrieval and llms-full.txt when the agent needs full markdown grounding.",
    next_steps: [
      `Index \`${dst}/llms.txt\` for overview retrieval.`,
      `Index \`${dst}/llms-full.txt\` when the agent needs one-file full-context ingestion.`,
      "Regenerate these files after transform, lint --fix, or scrape-based doc updates.",
    ],
    artifacts: ["llms.txt", "llms-full.txt"],
  });
  return 0;
}
