/**
 * YAML frontmatter 생성 및 카테고리/태그 매핑.
 */

// ── API 경로 → 카테고리 매핑 ──────────────────────────────────────────────────

export const PATH_TO_CATEGORY: Array<[string, string, string[]]> = [
  ["/v1/oauth2",             "인증",            ["auth", "oauth2"]],
  ["/v1/pay-order",          "주문",            ["order"]],
  ["/v2/products",           "상품",            ["product"]],
  ["/v1/products",           "상품",            ["product"]],
  ["/v1/pay-settle",         "정산",            ["settle"]],
  ["/v1/contents",           "문의",            ["inquiry"]],
  ["/v1/bizdata-stats",      "API데이터솔루션", ["stats"]],
  ["/v1/customer-data",      "API데이터솔루션", ["stats"]],
  ["/v1/commerce-solutions", "커머스솔루션",    ["commerce-solution"]],
  ["/v1/seller",             "판매자정보",      ["seller"]],
  ["/v1/pay-user",           "판매자정보",      ["seller"]],
  ["/v1/logistics",          "물류",            ["logistics"]],
  ["/v1/nfa",                "물류",            ["logistics"]],
  ["/v1/delivery",           "물류",            ["logistics"]],
  ["/v1/hope-delivery",      "물류",            ["logistics"]],
];

const SCHEMA_CATEGORY_HINTS: Record<string, [string, string[]]> = {
  "고객-문의": ["문의",  ["inquiry", "schema"]],
  "상품-문의": ["문의",  ["inquiry", "schema"]],
  "원상품":    ["상품",  ["product", "schema"]],
  "스마트스토어": ["상품", ["product", "schema"]],
  "쇼핑윈도":  ["상품",  ["product", "schema"]],
  "공지사항":  ["상품",  ["product", "schema"]],
  "묶음배송":  ["물류",  ["logistics", "schema"]],
  "희망일배송": ["물류", ["logistics", "schema"]],
  "반품":      ["물류",  ["logistics", "schema"]],
  "배송":      ["물류",  ["logistics", "schema"]],
  "주문":      ["주문",  ["order", "schema"]],
  "정산":      ["정산",  ["settle", "schema"]],
};

const CATEGORY_TO_TAGS: Record<string, string[]> = {
  "인증":           ["auth", "oauth2"],
  "주문":           ["order"],
  "상품":           ["product"],
  "정산":           ["settle"],
  "문의":           ["inquiry"],
  "API데이터솔루션": ["stats"],
  "커머스솔루션":    ["commerce-solution"],
  "판매자정보":      ["seller"],
  "물류":           ["logistics"],
};

const DOMAIN_KEYWORDS: Record<string, string[]> = {
  "주문":           ["주문", "발송", "교환", "반품", "취소"],
  "상품":           ["상품", "SKU", "브랜드", "옵션", "제조사", "카탈로그", "모델"],
  "정산":           ["정산", "부가세", "세금"],
  "문의":           ["문의", "답변"],
  "API데이터솔루션": ["통계", "분석", "리포트", "bizdata"],
  "커머스솔루션":    ["커머스솔루션", "비즈월렛"],
  "판매자정보":      ["판매자", "셀러"],
  "물류":           ["물류", "배송", "택배", "NFA", "SKU"],
  "인증":           ["인증", "토큰", "OAuth"],
};

// ── 카테고리 / 태그 추론 ──────────────────────────────────────────────────────

export function getCategoryAndTags(apiPath: string): [string, string[]] {
  for (const [prefix, cat, tags] of PATH_TO_CATEGORY) {
    if (apiPath.startsWith(prefix)) return [cat, [...tags]];
  }
  return ["기타", ["reference"]];
}

export function guessCategoryFromContent(
  content: string,
  title: string,
): [string, string[]] {
  for (const [key, [cat, tags]] of Object.entries(SCHEMA_CATEGORY_HINTS)) {
    if (title.includes(key) || content.slice(0, 200).includes(key)) {
      return [cat, [...tags]];
    }
  }
  for (const [cat, keywords] of Object.entries(DOMAIN_KEYWORDS)) {
    for (const kw of keywords) {
      if (title.includes(kw)) {
        return [cat, [...(CATEGORY_TO_TAGS[cat] ?? ["reference"])]];
      }
    }
  }
  return ["기타", ["reference"]];
}

// ── doc-id 생성 ───────────────────────────────────────────────────────────────

export function makeDocId(
  pageType: string,
  apiPath: string,
  method: string,
  sourceUrl: string,
  title: string,
): string {
  if (pageType === "api-endpoint" && apiPath) {
    const parts = apiPath
      .replace(/^\//, "")
      .split("/")
      .filter(Boolean)
      .map((p) => p.replace(/[{}]/g, ""));
    return parts.join("-") + `-${method.toLowerCase()}`;
  }
  let slug = sourceUrl ? sourceUrl.replace(/\/$/, "").split("/").pop()! : title;
  slug = slug.replace(/[^a-zA-Z0-9가-힣\-]/g, "-").replace(/^-+|-+$/g, "");
  const prefix =
    pageType === "schema"
      ? "schema"
      : pageType === "category-index"
        ? "category"
        : pageType === "guide"
          ? "guide"
          : "doc";
  return `${prefix}-${slug}`;
}

// ── frontmatter 빌드 ──────────────────────────────────────────────────────────

export function buildFrontmatter(
  docId: string,
  title: string,
  description: string,
  pageType: string,
  method: string,
  apiPath: string,
  baseUrl: string,
  category: string,
  tags: string[],
  sourceUrl: string,
): string {
  const today = new Date().toISOString().slice(0, 10);
  const safeTitle = title.replace(/"/g, '\\"');
  const safeDesc = description.replace(/"/g, '\\"');

  const lines: string[] = ["---"];
  lines.push(`doc-id: "${docId}"`);
  lines.push(`title: "${safeTitle}"`);
  lines.push(`description: "${safeDesc}"`);
  lines.push(`type: ${pageType}`);
  if (pageType === "api-endpoint" && method) {
    lines.push(`method: ${method}`);
    lines.push(`path: ${apiPath}`);
    lines.push(`base-url: ${baseUrl}`);
  }
  lines.push(`category: ${category}`);
  lines.push("tags:");
  for (const tag of [...new Set(tags)].sort()) {
    lines.push(`  - ${tag}`);
  }
  lines.push("status: stable");
  lines.push(`updated: "${today}"`);
  if (sourceUrl) lines.push(`source: ${sourceUrl}`);
  lines.push("---");

  return lines.join("\n");
}
