import fs from "node:fs";
import path from "node:path";
import { setCmd, info, error, verbose } from "../core/emit.js";
import { emitGuide } from "../core/guide.js";
import { parseFrontmatter } from "../core/frontmatter.js";
import { resolveReadableDocsRoot } from "../core/paths.js";

export interface ApiLookupOpts {
  dst?: string;
  method?: string;
  path?: string;
  docId?: string;
  query?: string;
  body?: boolean;
  limit?: number | string;
}

interface ApiDoc {
  filePath: string;
  relFile: string;
  frontmatter: Record<string, unknown>;
  body: string;
}

export function run(opts: ApiLookupOpts): number {
  setCmd("api");

  const docsRoot = resolveReadableDocsRoot(opts.dst);
  const apiDir = path.join(docsRoot, "api");
  const method = opts.method?.toUpperCase();
  const apiPath = opts.path;
  const docId = opts.docId;
  const query = opts.query?.trim().toLowerCase();
  const limit = parseLimit(opts.limit);

  if (!fs.existsSync(apiDir)) {
    error("start", { msg: `docs/api 디렉터리가 없음: ${apiDir}`, ok: false });
    return 1;
  }

  if (!docId && !apiPath && !query) {
    error("usage", {
      msg: "--doc-id, --path, --query 중 하나는 반드시 지정해야 합니다.",
      ok: false,
    });
    return 1;
  }

  verbose("start", {
    dst: docsRoot,
    api_dir: apiDir,
    method: method ?? null,
    path: apiPath ?? null,
    doc_id: docId ?? null,
    query: query ?? null,
    limit,
  });

  const docs = loadApiDocs(apiDir, docsRoot);
  const matches = docs.filter((doc) => matchesDoc(doc, { method, apiPath, docId, query }));

  if (matches.length === 0) {
    error("not_found", {
      method: method ?? null,
      path: apiPath ?? null,
      doc_id: docId ?? null,
      query: query ?? null,
      ok: false,
    });
    return 1;
  }

  const includeBody = opts.body === true || matches.length === 1;
  for (const doc of matches.slice(0, limit)) {
    const fm = doc.frontmatter;
    info("match", {
      file: doc.relFile,
      doc_id: asString(fm["doc-id"]),
      title: asString(fm["title"]),
      method: asString(fm["method"]),
      path: asString(fm["path"]),
      description: asString(fm["description"]),
      category: asString(fm["category"]),
      tags: toStringArray(fm["tags"]),
      source: asString(fm["source"]),
      body: includeBody ? doc.body : undefined,
    });
  }

  info("done", {
    matched: matches.length,
    returned: Math.min(matches.length, limit),
    truncated: matches.length > limit,
    include_body: includeBody,
    ok: true,
  });
  emitGuide({
    use_for: "Use returned API documents as exact grounding for endpoint paths, request fields, and response examples.",
    next_steps: buildApiNextSteps(matches, includeBody),
    caution:
      matches.length > 1
        ? "Multiple endpoints matched. Narrow with --doc-id or an exact --path/--method pair before generating the final answer."
        : undefined,
    artifacts: matches.slice(0, limit).map((doc) => doc.relFile),
  });
  return 0;
}

function loadApiDocs(apiDir: string, docsRoot: string): ApiDoc[] {
  return walkMd(apiDir).map((filePath) => {
    const content = fs.readFileSync(filePath, "utf-8");
    const [frontmatter, body] = parseFrontmatter(content);
    return {
      filePath,
      relFile: path.relative(docsRoot, filePath).replace(/\\/g, "/"),
      frontmatter,
      body,
    };
  });
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

function matchesDoc(
  doc: ApiDoc,
  filters: { method?: string; apiPath?: string; docId?: string; query?: string },
): boolean {
  const fm = doc.frontmatter;
  const docMethod = asString(fm["method"]).toUpperCase();
  const docPath = asString(fm["path"]);
  const docId = asString(fm["doc-id"]);

  if (asString(fm["type"]) !== "api-endpoint") return false;
  if (filters.method && docMethod !== filters.method) return false;
  if (filters.apiPath && docPath !== filters.apiPath) return false;
  if (filters.docId && docId !== filters.docId) return false;
  if (!filters.query) return true;

  const haystacks = [
    doc.relFile,
    asString(fm["title"]),
    docPath,
    asString(fm["description"]),
    doc.body,
  ].map((value) => value.toLowerCase());

  return haystacks.some((value) => value.includes(filters.query!));
}

function parseLimit(limit: number | string | undefined): number {
  if (typeof limit === "number" && Number.isInteger(limit) && limit > 0) return limit;
  if (typeof limit === "string") {
    const parsed = Number.parseInt(limit, 10);
    if (Number.isInteger(parsed) && parsed > 0) return parsed;
  }
  return 10;
}

function buildApiNextSteps(matches: ApiDoc[], includeBody: boolean): string[] {
  const first = matches[0];
  const fm = first?.frontmatter ?? {};
  const method = asString(fm["method"]);
  const apiPath = asString(fm["path"]);
  const steps: string[] = [];

  if (!includeBody && method && apiPath) {
    steps.push(`Run \`api --path ${apiPath} --method ${method} --body\` for full markdown grounding.`);
  }
  steps.push("Use `ask --format compact \"<question>\"` when the agent needs broader guide/category context around this endpoint.");
  steps.push("Request `sync` only if the upstream developer docs changed and the bundled package docs are no longer sufficient.");
  return steps;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function toStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}
