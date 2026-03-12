/**
 * 페이지 타입 감지 및 메타데이터 추출.
 */

import fs from "node:fs";
import path from "node:path";
import { resolveWritableDocsRoot, resolveWritableRawsRoot } from "../core/paths.js";

// ── 상수 ──────────────────────────────────────────────────────────────────────

export const BASE_URL = "https://api.commerce.naver.com/external";

// ── 정규식 ────────────────────────────────────────────────────────────────────

const METHOD_BLOCK_RE =
  /^```\s*\n(GET|POST|PUT|DELETE|PATCH)\s*\n\n## (\/[^\n]+?)\s*\n```/ms;
const PLAIN_METHOD_BLOCK_RE =
  /(?:^|\n)(GET|POST|PUT|DELETE|PATCH)\s*\n\s*\n## (\/[^\n]+?)\s*(?:\n|$)/m;

const CATEGORY_LINK_RE = /\[## [📄🗃️]/u;

// ── 페이지 타입 감지 ──────────────────────────────────────────────────────────

export function detectPageType(content: string, relPath: string): string {
  const decodedRelPath = safeDecode(relPath);
  if (decodedRelPath.includes("schemas/")) return "schema";
  if (decodedRelPath.includes("구조체") && decodedRelPath.endsWith(".md")) return "schema";
  if (METHOD_BLOCK_RE.test(content) || PLAIN_METHOD_BLOCK_RE.test(content)) return "api-endpoint";
  if (CATEGORY_LINK_RE.test(content)) return "category-index";
  const stem = path.basename(decodedRelPath, ".md");
  if (/^[가-힣\-]+$/.test(stem)) return "category-index";
  return "guide";
}

// ── 메타데이터 추출 ───────────────────────────────────────────────────────────

export function extractMethodAndPath(content: string): [string, string] {
  const m = content.match(METHOD_BLOCK_RE);
  if (m) return [m[1].trim(), m[2].trim()];
  const plain = content.match(PLAIN_METHOD_BLOCK_RE);
  if (plain) return [plain[1].trim(), plain[2].trim()];
  return ["", ""];
}

export function extractSourceUrl(content: string): string {
  const m = content.match(/^> 원문: (https?:\/\/\S+)/m);
  return m ? m[1].trim() : "";
}

export function extractTitle(content: string): string {
  const m = content.match(/^# (.+)$/m);
  return m ? m[1].trim() : "";
}

export function extractBaseUrl(content: string): string {
  let m = content.match(/curl[^\n]*?'(https:\/\/[^/\s]+\/[^/\s]+)(?:\/|')/);
  if (m) return m[1];
  m = content.match(/Base URL\s*\nEdit\s*\n(https?:\/\/\S+)/);
  if (m) return m[1].trim();
  return BASE_URL;
}

export function extractDescription(
  content: string,
  title: string,
  pageType: string,
): string {
  if (pageType === "category-index") {
    return extractCategoryDescription(content, title);
  }

  const lines = content.split("\n");
  let inCode = false;
  const candidateLines: string[] = [];

  for (const line of lines) {
    const stripped = line.trim();
    if (stripped.startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    if (!stripped) {
      if (candidateLines.length > 0) break;
      continue;
    }
    if (stripped.startsWith("#")) continue;
    if (stripped.startsWith("> 원문:")) continue;
    if (stripped.startsWith("[##")) continue;
    if (stripped.includes("](/docs/")) continue;
    if (/^- (curl|java|Schema|Example)/.test(stripped)) continue;
    if (stripped.includes("Direct link to")) continue;
    if (stripped.includes("Collapse all") || stripped.includes("Base URL")) continue;
    if (stripped.startsWith("- application/")) continue;
    if (/^- \d{3}$/.test(stripped)) continue;
    if (stripped.length < 10) continue;
    if (
      stripped === title ||
      stripped.replace(/[。.]\s*$/, "") === title.replace(/[。.]\s*$/, "")
    )
      continue;

    let clean = stripped.replace(/\*\*([^*]+)\*\*/g, "$1");
    clean = clean.replace(/`([^`]+)`/g, "$1");
    clean = clean.replace(/\\_/g, "_");
    candidateLines.push(clean);
    if (candidateLines.join(" ").length > 120) break;
  }

  if (candidateLines.length > 0) {
    let desc = candidateLines.join(" ");
    if (desc.length > 200) {
      const idx = desc.lastIndexOf(".", 200);
      if (idx > 80) {
        desc = desc.slice(0, idx + 1);
      } else {
        desc = desc.slice(0, 200).trimEnd() + "...";
      }
    }
    return desc;
  }
  return title;
}

function extractCategoryDescription(content: string, title: string): string {
  const cardTitles = [...content.matchAll(
    /\[\s*##\s+(?:[^\s]+\s+)?([^\n]+?)\s*(?:\n\s*\n[\s\S]*?)?\]\(\/docs\/[^\s)]+\)/gu,
  )].map((match) => match[1].trim());

  if (cardTitles.length === 0) {
    return `${title} 관련 API 문서를 모아둔 카테고리 인덱스입니다.`;
  }

  if (cardTitles.length === 1) {
    return `${title} 관련 API 문서를 모아둔 카테고리 인덱스입니다. 주요 문서: ${cardTitles[0]}.`;
  }

  const headline = cardTitles.slice(0, 2).join(", ");
  const extra = cardTitles.length > 2 ? ` 외 ${cardTitles.length - 2}건` : "";
  return `${title} 관련 API 문서를 모아둔 카테고리 인덱스입니다. 주요 문서: ${headline}${extra}.`;
}

// ── 출력 경로 계산 ────────────────────────────────────────────────────────────

export function makeDestPath(
  pageType: string,
  apiPath: string,
  method: string,
  srcName: string,
  opts: { dst?: string } = {},
): string {
  const dst = opts.dst ?? resolveWritableDocsRoot();
  const normalizedSrcName = safeDecode(srcName);
  if (pageType === "api-endpoint" && apiPath && method) {
    const clean = apiPath.replace(/^\//, "");
    const lastSlash = clean.lastIndexOf("/");
    if (lastSlash !== -1) {
      const parent = clean.slice(0, lastSlash);
      const lastSeg = clean.slice(lastSlash + 1);
      return path.join(dst, "api", parent, `${lastSeg}.${method}.md`);
    }
    return path.join(dst, "api", `${clean}.${method}.md`);
  }
  if (pageType === "schema") return path.join(dst, "schema", normalizedSrcName);
  if (pageType === "category-index") return path.join(dst, "category", normalizedSrcName);
  return path.join(dst, "guide", normalizedSrcName);
}

export function buildStemDestMap(
  src?: string,
  dst?: string,
): Map<string, string> {
  const _src = src ?? resolveWritableRawsRoot();
  const mapping = new Map<string, string>();

  function walk(dir: string): void {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.isFile() && e.name.endsWith(".md")) {
        try {
          const content = fs.readFileSync(full, "utf-8");
          const rel = path.relative(_src, full).replace(/\\/g, "/");
          const pageType = detectPageType(content, rel);
          const [method, rawApiPath] = extractMethodAndPath(content);
          const apiPath = rawApiPath.replace(/:([a-zA-Z][a-zA-Z0-9_]*)/g, "{$1}");
          const dest = makeDestPath(pageType, apiPath, method, e.name, { dst });
          mapping.set(path.basename(e.name, ".md"), dest);
        } catch {
          // ignore
        }
      }
    }
  }

  if (fs.existsSync(_src)) walk(_src);
  return mapping;
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
