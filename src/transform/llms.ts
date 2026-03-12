/**
 * llms.txt / llms-full.txt 생성 유틸리티.
 */

import fs from "node:fs";
import path from "node:path";
import { verbose } from "../core/emit.js";
import { resolveWritableDocsRoot } from "../core/paths.js";

export type TransformResult = [string, string, string]; // [srcPath, destPath, content]
export interface LlmsDocEntry {
  destPath: string;
  content: string;
}

export function generateLlmsTxt(
  results: TransformResult[],
  opts: { dst?: string } = {},
): void {
  generateLlmsTxtFromEntries(
    results.map(([, destPath, content]) => ({ destPath, content })),
    opts,
  );
}

export function generateLlmsTxtFromDocs(opts: { dst?: string } = {}): void {
  const dst = opts.dst ? path.resolve(opts.dst) : resolveWritableDocsRoot();
  generateLlmsTxtFromEntries(collectDocsEntries(dst), { dst });
}

function generateLlmsTxtFromEntries(
  entries: LlmsDocEntry[],
  opts: { dst?: string } = {},
): void {
  const dst = opts.dst ? path.resolve(opts.dst) : resolveWritableDocsRoot();

  const guides: string[] = [];
  const endpoints: string[] = [];
  const schemas: string[] = [];
  const categories: string[] = [];

  for (const { destPath, content } of entries) {
    let rel: string;
    try {
      rel = path.relative(dst, destPath).replace(/\\/g, "/");
    } catch {
      rel = path.basename(destPath);
    }

    const tMatch = content.match(/^title: "([^"]+)"/m);
    const dMatch = content.match(/^description: "([^"]+)"/m);
    const ptMatch = content.match(/^type: (\S+)/m);
    const mMatch = content.match(/^method: (\S+)/m);
    const pMatch = content.match(/^path: (\S+)/m);

    const titleS = tMatch ? tMatch[1] : path.basename(destPath, ".md");
    const descS = dMatch ? dMatch[1] : "";
    const typeS = ptMatch ? ptMatch[1] : "guide";
    const methodS = mMatch ? mMatch[1] : "";
    const pathS = pMatch ? pMatch[1] : "";

    let entry = descS
      ? `- [${titleS}](${rel}): ${descS}`
      : `- [${titleS}](${rel})`;

    if (methodS && pathS) entry += ` (${methodS} ${pathS})`;

    if (typeS === "guide") guides.push(entry);
    else if (typeS === "api-endpoint") endpoints.push(entry);
    else if (typeS === "schema") schemas.push(entry);
    else if (typeS === "category-index") categories.push(entry);
  }

  const lines: string[] = [
    "# 네이버 커머스API",
    "",
    "> 스마트스토어 주요 기능을 HTTP API로 호출하는 커머스 플랫폼 공개 API 문서.",
    "> OAuth2 Client Credentials 인증 필요. API 버전: 최신.",
    "",
  ];

  if (guides.length) lines.push("## 가이드", "", ...guides, "");
  if (endpoints.length) lines.push("## API 엔드포인트", "", ...endpoints.sort(), "");
  if (schemas.length) lines.push("## 스키마", "", ...schemas, "");
  if (categories.length) lines.push("## Optional", "", ...categories, "");

  const out = path.join(dst, "llms.txt");
  fs.writeFileSync(out, lines.join("\n"), "utf-8");
  verbose("llms_txt", {
    file: out,
    endpoints: endpoints.length,
    schemas: schemas.length,
    guides: guides.length,
    categories: categories.length,
  });
}

export function generateLlmsFullTxt(
  results: TransformResult[],
  opts: { dst?: string } = {},
): void {
  generateLlmsFullTxtFromEntries(
    results.map(([, destPath, content]) => ({ destPath, content })),
    opts,
  );
}

export function generateLlmsFullTxtFromDocs(opts: { dst?: string } = {}): void {
  const dst = opts.dst ? path.resolve(opts.dst) : resolveWritableDocsRoot();
  generateLlmsFullTxtFromEntries(collectDocsEntries(dst), { dst });
}

function generateLlmsFullTxtFromEntries(
  entries: LlmsDocEntry[],
  opts: { dst?: string } = {},
): void {
  const dst = opts.dst ? path.resolve(opts.dst) : resolveWritableDocsRoot();

  function sortKey(item: LlmsDocEntry): [number, string] {
    let rel: string;
    try {
      rel = path.relative(dst, item.destPath).replace(/\\/g, "/");
    } catch {
      rel = item.destPath;
    }
    if (rel.startsWith("guide/")) return [0, rel];
    if (rel.startsWith("api/")) return [1, rel];
    if (rel.startsWith("schema/")) return [2, rel];
    return [3, rel];
  }

  const sorted = [...entries].sort((a, b) => {
    const [an, ak] = sortKey(a);
    const [bn, bk] = sortKey(b);
    return an !== bn ? an - bn : ak.localeCompare(bk);
  });

  const parts: string[] = [];
  for (const { destPath, content } of sorted) {
    let rel: string;
    try {
      rel = path.relative(dst, destPath).replace(/\\/g, "/");
    } catch {
      rel = path.basename(destPath);
    }
    parts.push(`\n\n<!-- === FILE: ${rel} === -->`);
    parts.push(content);
  }

  const out = path.join(dst, "llms-full.txt");
  fs.writeFileSync(out, parts.join("\n"), "utf-8");
  const sizeKb = Math.floor(fs.statSync(out).size / 1024);
  verbose("llms_full_txt", { file: out, documents: entries.length, size_kb: sizeKb });
}

function collectDocsEntries(dst: string): LlmsDocEntry[] {
  const entries: LlmsDocEntry[] = [];
  for (const fullPath of walkMd(dst)) {
    const rel = path.relative(dst, fullPath).replace(/\\/g, "/");
    if (rel.startsWith("llms")) continue;
    entries.push({
      destPath: fullPath,
      content: fs.readFileSync(fullPath, "utf-8"),
    });
  }
  return entries;
}

function walkMd(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walkMd(fullPath));
    else if (entry.isFile() && entry.name.endsWith(".md")) results.push(fullPath);
  }
  return results.sort();
}
