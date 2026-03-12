/**
 * 링크 변환 유틸리티.
 */

import fs from "node:fs";
import path from "node:path";
import { resolveWritableDocsRoot } from "../core/paths.js";

// ── /docs/... URL → 상대 경로 변환 ────────────────────────────────────────────

export function docusaurusUrlToRel(
  url: string,
  destDir: string,
  stemMap?: Map<string, string>,
  opts: { dst?: string } = {},
): string {
  const dst = opts.dst ? path.resolve(opts.dst) : resolveWritableDocsRoot();

  // 앵커 분리
  let anchor = "";
  if (url.includes("#")) {
    const idx = url.indexOf("#");
    let frag = url.slice(idx + 1);
    url = url.slice(0, idx);
    if (frag.endsWith(".md")) frag = frag.slice(0, -3);
    anchor = "#" + frag;
  }

  const relTarget = url.slice(6); // "/docs/" 제거
  let target: string;

  if (relTarget.includes("/schemas/")) {
    const name = relTarget.split("/").pop()!;
    target = path.join(dst, "schema", name + ".md");
  } else {
    const name = relTarget.split("/").pop()!;
    const catPath = path.join(dst, "category", name + ".md");
    if (fs.existsSync(catPath)) {
      target = catPath;
    } else if (stemMap && stemMap.has(name)) {
      target = stemMap.get(name)!;
    } else {
      return `https://apicenter.commerce.naver.com${url}${anchor}`;
    }
  }

  try {
    const rel = path.relative(destDir, target).replace(/\\/g, "/");
    return rel + anchor;
  } catch {
    return url + anchor;
  }
}

// ── 카테고리 링크 카드 → Markdown 테이블 ──────────────────────────────────────

export function convertCategoryLinkCards(
  content: string,
  destPath: string,
  stemMap?: Map<string, string>,
  opts: { dst?: string } = {},
): string {
  const destDir = path.dirname(destPath);
  const pattern =
    /\[\s*##\s+(?:[^\s]+\s+)?([^\n]+?)\s*(?:\n\s*\n([\s\S]*?))?\]\((\/docs\/[^\s)]+)\)/gu;

  const matches = [...content.matchAll(pattern)];
  if (matches.length === 0) return content;

  const rows = ["| 문서 | 설명 |", "|------|------|"];
  for (const m of matches) {
    const title = m[1].trim();
    const desc = (m[2] ?? "").trim().replace(/\n/g, " ");
    const url = m[3];
    const rel = docusaurusUrlToRel(url, destDir, stemMap, opts);
    rows.push(`| [${title}](${rel}) | ${desc} |`);
  }

  const table = `## 관련 문서\n\n${rows.join("\n")}\n`;
  const start = matches[0].index!;
  const end = matches[matches.length - 1].index! + matches[matches.length - 1][0].length;
  return content.slice(0, start) + table + content.slice(end);
}

// ── 일반 /docs/... 링크 변환 ─────────────────────────────────────────────────

export function fixDocusaurusLinks(
  content: string,
  destPath: string,
  stemMap?: Map<string, string>,
  opts: { dst?: string } = {},
): string {
  const destDir = path.dirname(destPath);
  return content.replace(
    /\]\((\/docs\/[^\s)"]+)([^)]*)\)/g,
    (_match, rawPath: string, rest: string) => {
      const rel = docusaurusUrlToRel(rawPath, destDir, stemMap, opts);
      return `](${rel}${rest})`;
    },
  );
}

// ── guide/_index.md 링크 수정 ─────────────────────────────────────────────────

export function fixGuideIndexLinks(
  guideIndexPath: string,
  srcToDest: Map<string, string>,
): void {
  const content = fs.readFileSync(guideIndexPath, "utf-8");
  const guideDir = path.dirname(guideIndexPath);

  const fixed = content.replace(
    /\[([^\]]+)\]\((\.[^)]+\.md)\)/g,
    (_match, text: string, url: string) => {
      const stem = url
        .replace(/^\.\//, "")
        .replace(/\.md$/, "")
        .split("/")
        .pop()!;
      if (srcToDest.has(stem)) {
        const rel = path.relative(guideDir, srcToDest.get(stem)!).replace(/\\/g, "/");
        return `[${text}](${rel})`;
      }
      return _match;
    },
  );

  fs.writeFileSync(guideIndexPath, fixed, "utf-8");
}
