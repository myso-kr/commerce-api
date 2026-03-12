/**
 * transform 커맨드 — raws/ → docs/ 변환.
 */

import fs from "node:fs";
import path from "node:path";
import { debug, error as emitError, info, setCmd, verbose } from "../core/emit.js";
import { emitGuide } from "../core/guide.js";
import { resolveWritableDocsRoot, resolveWritableRawsRoot } from "../core/paths.js";
import {
  detectPageType,
  extractMethodAndPath,
  extractSourceUrl,
  extractTitle,
  extractBaseUrl,
  extractDescription,
  makeDestPath,
  BASE_URL,
  buildStemDestMap,
} from "./converter.js";
import {
  getCategoryAndTags,
  guessCategoryFromContent,
  makeDocId,
  buildFrontmatter,
} from "./frontmatter.js";
import {
  removeSourceLine,
  dedupH1,
  removeDirectLinks,
  removeUiTabs,
  removeApplicationTypeLines,
  removeStatusCodeList,
  removeSchemaLabels,
  removeWebUiWidget,
  removeAuthBoilerplate,
  convertMethodBlock,
  addH2Context,
  removeArrayNotation,
  fixEscapedUnderscores,
  fixBareCodeBlocks,
  dedupRepeatedParagraphs,
  ensureCategoryIndexIntro,
  cleanBlankLines,
} from "./fixes.js";
import {
  convertCategoryLinkCards,
  fixDocusaurusLinks,
  fixGuideIndexLinks,
} from "./links.js";
import {
  generateLlmsTxtFromDocs,
  generateLlmsFullTxtFromDocs,
  type TransformResult,
} from "./llms.js";

export interface TransformOpts {
  src?: string;
  dst?: string;
}

// ── 단일 파일 변환 ─────────────────────────────────────────────────────────────

export function transformFile(
  srcPath: string,
  stemMap: Map<string, string>,
  opts: { src?: string; dst?: string } = {},
): [string, string] | null {
  const _src = opts.src ?? resolveWritableRawsRoot();
  const _dst = opts.dst ?? resolveWritableDocsRoot();

  const content = fs.readFileSync(srcPath, "utf-8");
  const rel = path.relative(_src, srcPath).replace(/\\/g, "/");
  const srcName = path.basename(srcPath);

  // 1. 페이지 타입 감지
  const pageType = detectPageType(content, rel);

  // 2. 메타데이터 추출
  const title = extractTitle(content);
  const sourceUrl =
    extractSourceUrl(content) ||
    "https://apicenter.commerce.naver.com/docs/commerce-api/current";
  const [method, rawApiPath] = extractMethodAndPath(content);
  const apiPath = rawApiPath.replace(/:([a-zA-Z][a-zA-Z0-9_]*)/g, "{$1}");
  const baseUrl = method ? extractBaseUrl(content) : BASE_URL;

  let category: string;
  let tags: string[];

  if (pageType === "api-endpoint") {
    [category, tags] = getCategoryAndTags(apiPath);
    if (!tags.includes(method.toLowerCase())) tags.push(method.toLowerCase());
  } else {
    [category, tags] = guessCategoryFromContent(content, title);
    if (pageType === "schema" && !tags.includes("schema")) tags = ["schema", ...tags];
    if (pageType === "category-index" && !tags.includes("category")) tags.push("category");
  }

  const docId = makeDocId(pageType, apiPath, method, sourceUrl, title);
  const description = extractDescription(content, title, pageType);
  const dest = makeDestPath(pageType, apiPath, method, srcName, { dst: _dst });

  // 3. 콘텐츠 변환
  let body = content;
  body = removeSourceLine(body);
  body = dedupH1(body);
  body = removeDirectLinks(body);
  body = removeUiTabs(body);
  body = removeApplicationTypeLines(body);
  body = removeStatusCodeList(body);
  body = removeSchemaLabels(body);
  body = removeWebUiWidget(body);
  body = removeAuthBoilerplate(body);

  if (pageType === "api-endpoint" && method && apiPath) {
    body = convertMethodBlock(body, method, apiPath, baseUrl, rawApiPath);
    body = addH2Context(body, method, apiPath);
  }

  body = removeArrayNotation(body);
  body = fixEscapedUnderscores(body);
  body = fixBareCodeBlocks(body);

  if (pageType === "category-index") {
    body = convertCategoryLinkCards(body, dest, stemMap, { dst: _dst });
    body = ensureCategoryIndexIntro(body, title);
  }
  body = fixDocusaurusLinks(body, dest, stemMap, { dst: _dst });
  body = dedupRepeatedParagraphs(body);
  body = cleanBlankLines(body);

  // 4. frontmatter 생성
  const frontmatter = buildFrontmatter(
    docId, title, description, pageType, method, apiPath,
    baseUrl, category, tags, sourceUrl,
  );

  // 5. 기존 frontmatter 제거
  let stripped = body.trimStart();
  if (stripped.startsWith("---")) {
    const end = stripped.indexOf("\n---\n", 3);
    if (end !== -1) stripped = stripped.slice(end + 5);
    body = stripped;
  }

  const final = frontmatter + "\n\n" + body.replace(/^\n+/, "");
  return [dest, final];
}

// ── 메인 파이프라인 ────────────────────────────────────────────────────────────

export function run(opts: TransformOpts): number {
  setCmd("transform");

  const src = opts.src ? path.resolve(opts.src) : resolveWritableRawsRoot();
  const dst = opts.dst ? path.resolve(opts.dst) : resolveWritableDocsRoot();

  if (!fs.existsSync(src)) {
    emitError("start", { src, msg: `소스 디렉터리 없음: ${src}` });
    return 1;
  }

  const mdFiles = walkMd(src);
  info("start", { src, dst, count: mdFiles.length });

  // stem → dest 맵 구축
  debug("stem_map", { msg: "stem→dest 맵 구축 중" });
  const stemMap = buildStemDestMap(src, dst);
  debug("stem_map_done", { count: stemMap.size });

  const t0 = performance.now();
  const results: TransformResult[] = [];
  const errorsList: Array<[string, string]> = [];
  const srcToDest = new Map<string, string>();
  const typeCounts: Record<string, number> = {};
  const total = mdFiles.length;

  for (let i = 0; i < mdFiles.length; i++) {
    const srcPath = mdFiles[i];
    const rel = path.relative(src, srcPath).replace(/\\/g, "/");
    try {
      const result = transformFile(srcPath, stemMap, { src, dst });
      if (!result) continue;
      const [destPath, content] = result;

      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.writeFileSync(destPath, content, "utf-8");
      results.push([srcPath, destPath, content]);
      srcToDest.set(path.basename(srcPath, ".md"), destPath);

      const m = content.match(/^type: (\S+)/m);
      const pageType = m ? m[1] : "unknown";
      typeCounts[pageType] = (typeCounts[pageType] ?? 0) + 1;

      debug("file", {
        idx: i + 1,
        total,
        src: rel,
        dest: path.relative(dst, destPath).replace(/\\/g, "/"),
        type: pageType,
        ok: true,
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      emitError("file", { idx: i + 1, total, src: rel, ok: false, msg });
      errorsList.push([srcPath, msg]);
    }
  }

  // guide/_index.md 링크 수정
  const guideIndex = path.join(dst, "guide", "_index.md");
  if (fs.existsSync(guideIndex)) {
    fixGuideIndexLinks(guideIndex, srcToDest);
    verbose("fix_guide_index", {
      file: path.relative(dst, guideIndex).replace(/\\/g, "/"),
    });
  }

  // llms.txt / llms-full.txt 생성
  if (results.length > 0) {
    generateLlmsTxtFromDocs({ dst });
    generateLlmsFullTxtFromDocs({ dst });
  }

  const elapsed = Math.round(performance.now() - t0);
  info("done", {
    ok: results.length,
    errors: errorsList.length,
    elapsed_ms: elapsed,
    types: typeCounts,
  });
  emitGuide({
    use_for: "Use the generated docs directory as the normalized corpus for ask, api, review, noise, and llms workflows.",
    next_steps: [
      `Run \`review --dst ${dst}\` to validate links, frontmatter, and doc ids.`,
      `Run \`noise --dst ${dst}\` to detect leftover UI artifacts in the transformed markdown.`,
      `Run \`ask --dst ${dst} --format compact "<question>"\` or \`api --dst ${dst} --path <path> --method <METHOD>\` to verify retrieval.`,
    ],
    caution:
      errorsList.length > 0
        ? "Transformation errors mean some source markdown did not land in the normalized corpus."
        : undefined,
    artifacts: ["docs/**", "llms.txt", "llms-full.txt"],
  });

  return errorsList.length > 0 ? 1 : 0;
}

function walkMd(dir: string): string[] {
  const result: string[] = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) result.push(...walkMd(full));
    else if (e.isFile() && e.name.endsWith(".md")) result.push(full);
  }
  return result.sort();
}
