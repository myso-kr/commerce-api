"""YAML frontmatter 생성 및 카테고리/태그 매핑.

API 경로 prefix → (카테고리, 태그 목록) 매핑과
스키마/카테고리 인덱스용 키워드 기반 추론을 제공한다.
"""

from __future__ import annotations

import re
from datetime import date

TODAY = date.today().isoformat()

# ── API 경로 → 카테고리 매핑 (우선순위 순, 긴 prefix 먼저) ──────────────────

PATH_TO_CATEGORY: list[tuple[str, str, list[str]]] = [
    ("/v1/oauth2",             "인증",            ["auth", "oauth2"]),
    ("/v1/pay-order",          "주문",            ["order"]),
    ("/v2/products",           "상품",            ["product"]),
    ("/v1/products",           "상품",            ["product"]),
    ("/v1/pay-settle",         "정산",            ["settle"]),
    ("/v1/contents",           "문의",            ["inquiry"]),
    ("/v1/bizdata-stats",      "API데이터솔루션", ["stats"]),
    ("/v1/customer-data",      "API데이터솔루션", ["stats"]),
    ("/v1/commerce-solutions", "커머스솔루션",    ["commerce-solution"]),
    ("/v1/seller",             "판매자정보",      ["seller"]),
    ("/v1/pay-user",           "판매자정보",      ["seller"]),
    ("/v1/logistics",          "물류",            ["logistics"]),
    ("/v1/nfa",                "물류",            ["logistics"]),
    ("/v1/delivery",           "물류",            ["logistics"]),
    ("/v1/hope-delivery",      "물류",            ["logistics"]),
]

SCHEMA_CATEGORY_HINTS: dict[str, tuple[str, list[str]]] = {
    "고객-문의": ("문의",  ["inquiry", "schema"]),
    "상품-문의": ("문의",  ["inquiry", "schema"]),
    "원상품":    ("상품",  ["product", "schema"]),
    "스마트스토어": ("상품", ["product", "schema"]),
    "쇼핑윈도":  ("상품",  ["product", "schema"]),
    "공지사항":  ("상품",  ["product", "schema"]),
    "묶음배송":  ("물류",  ["logistics", "schema"]),
    "희망일배송": ("물류", ["logistics", "schema"]),
    "반품":      ("물류",  ["logistics", "schema"]),
    "배송":      ("물류",  ["logistics", "schema"]),
    "주문":      ("주문",  ["order", "schema"]),
    "정산":      ("정산",  ["settle", "schema"]),
}

CATEGORY_TO_TAGS: dict[str, list[str]] = {
    "인증":           ["auth", "oauth2"],
    "주문":           ["order"],
    "상품":           ["product"],
    "정산":           ["settle"],
    "문의":           ["inquiry"],
    "API데이터솔루션": ["stats"],
    "커머스솔루션":    ["commerce-solution"],
    "판매자정보":      ["seller"],
    "물류":           ["logistics"],
}

DOMAIN_KEYWORDS: dict[str, list[str]] = {
    "주문":           ["주문", "발송", "교환", "반품", "취소"],
    "상품":           ["상품", "SKU", "브랜드", "옵션"],
    "정산":           ["정산", "부가세", "세금"],
    "문의":           ["문의", "답변"],
    "API데이터솔루션": ["통계", "분석", "리포트", "bizdata"],
    "커머스솔루션":    ["커머스솔루션", "비즈월렛"],
    "판매자정보":      ["판매자", "셀러"],
    "물류":           ["물류", "배송", "택배", "NFA", "SKU"],
    "인증":           ["인증", "토큰", "OAuth"],
}


# ── 카테고리 / 태그 추론 ──────────────────────────────────────────────────────

def get_category_and_tags(api_path: str) -> tuple[str, list[str]]:
    """API 경로에서 카테고리와 태그를 결정한다."""
    for prefix, cat, tags in PATH_TO_CATEGORY:
        if api_path.startswith(prefix):
            return cat, list(tags)
    return "기타", ["reference"]


def guess_category_from_content(
    content: str, title: str
) -> tuple[str, list[str]]:
    """스키마/카테고리 인덱스 페이지의 카테고리를 콘텐츠 기반으로 추론한다."""
    for key, (cat, tags) in SCHEMA_CATEGORY_HINTS.items():
        if key in title or key in content[:200]:
            return cat, list(tags)
    for cat, keywords in DOMAIN_KEYWORDS.items():
        for kw in keywords:
            if kw in title:
                return cat, list(CATEGORY_TO_TAGS.get(cat, ["reference"]))
    return "기타", ["reference"]


# ── doc-id 생성 ───────────────────────────────────────────────────────────────

def make_doc_id(
    page_type: str,
    api_path: str,
    method: str,
    source_url: str,
    title: str,
) -> str:
    """페이지 고유 식별자(doc-id)를 생성한다."""
    if page_type == "api-endpoint" and api_path:
        parts = [
            p.replace("{", "").replace("}", "")
            for p in api_path.strip("/").split("/")
            if p
        ]
        return "-".join(parts) + f"-{method.lower()}"
    slug = source_url.rstrip("/").split("/")[-1] if source_url else title
    slug = re.sub(r"[^a-zA-Z0-9가-힣\-]", "-", slug).strip("-")
    prefix = {
        "schema": "schema",
        "category-index": "category",
        "guide": "guide",
    }.get(page_type, "doc")
    return f"{prefix}-{slug}"


# ── frontmatter 빌드 ──────────────────────────────────────────────────────────

def build_frontmatter(
    doc_id: str,
    title: str,
    description: str,
    page_type: str,
    method: str,
    api_path: str,
    base_url: str,
    category: str,
    tags: list[str],
    source_url: str,
) -> str:
    """YAML frontmatter 문자열을 생성한다."""
    lines = ["---"]
    lines.append(f'doc-id: "{doc_id}"')
    safe_title = title.replace('"', '\\"')
    safe_desc = description.replace('"', '\\"')
    lines.append(f'title: "{safe_title}"')
    lines.append(f'description: "{safe_desc}"')
    lines.append(f"type: {page_type}")
    if page_type == "api-endpoint" and method:
        lines.append(f"method: {method}")
        lines.append(f"path: {api_path}")
        lines.append(f"base-url: {base_url}")
    lines.append(f"category: {category}")
    lines.append("tags:")
    for tag in sorted(set(tags)):
        lines.append(f"  - {tag}")
    lines.append("status: stable")
    lines.append(f'updated: "{TODAY}"')
    if source_url:
        lines.append(f"source: {source_url}")
    lines.append("---")
    return "\n".join(lines)
