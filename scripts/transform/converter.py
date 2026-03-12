"""페이지 타입 감지 및 메타데이터 추출.

크롤링된 원본 Markdown에서:
- 페이지 타입 감지 (api-endpoint / schema / category-index / guide)
- 제목, 설명, source URL, HTTP method/path 추출
- 출력 파일 경로(dest_path) 계산
"""

from __future__ import annotations

import re
from pathlib import Path

from scripts.core.paths import SRC_RAWS, DST_DOCS

# ── 상수 ──────────────────────────────────────────────────────────────────────

BASE_URL = "https://api.commerce.naver.com/external"

# ── 정규식 ────────────────────────────────────────────────────────────────────

METHOD_BLOCK_RE = re.compile(
    r"^```\s*\n(GET|POST|PUT|DELETE|PATCH)\s*\n\n## (/.+?)\s*\n```",
    re.MULTILINE,
)
CATEGORY_LINK_RE = re.compile(r"\[## [📄🗃️]")


# ── 페이지 타입 감지 ──────────────────────────────────────────────────────────

def detect_page_type(content: str, rel_path: str) -> str:
    """원본 Markdown 콘텐츠와 상대 경로로 페이지 타입을 감지한다.

    Returns:
        "api-endpoint" | "schema" | "category-index" | "guide"
    """
    if "schemas/" in rel_path:
        return "schema"
    if "구조체" in rel_path and rel_path.endswith(".md"):
        return "schema"
    if METHOD_BLOCK_RE.search(content):
        return "api-endpoint"
    if CATEGORY_LINK_RE.search(content):
        return "category-index"
    stem = Path(rel_path).stem
    if re.match(r"^[가-힣\-]+$", stem):
        return "category-index"
    return "guide"


# ── 메타데이터 추출 ───────────────────────────────────────────────────────────

def extract_method_and_path(content: str) -> tuple[str, str]:
    """HTTP 메서드 코드블록에서 (method, path)를 추출한다."""
    m = METHOD_BLOCK_RE.search(content)
    if m:
        return m.group(1).strip(), m.group(2).strip()
    return "", ""


def extract_source_url(content: str) -> str:
    """'> 원문: URL' 줄에서 URL을 추출한다."""
    m = re.search(r"^> 원문: (https?://\S+)", content, re.MULTILINE)
    return m.group(1).strip() if m else ""


def extract_title(content: str) -> str:
    """첫 번째 H1 제목을 추출한다."""
    m = re.search(r"^# (.+)$", content, re.MULTILINE)
    return m.group(1).strip() if m else ""


def extract_base_url(content: str) -> str:
    """curl 예제 또는 Base URL 블록에서 API base URL을 추출한다."""
    m = re.search(
        r"curl[^\n]*?'(https://[^/\s]+/[^/\s]+)(?:/|')",
        content,
    )
    if m:
        return m.group(1)
    m = re.search(r"Base URL\s*\nEdit\s*\n(https?://\S+)", content)
    if m:
        return m.group(1).strip()
    return BASE_URL


def extract_description(content: str, title: str, page_type: str) -> str:
    """첫 번째 의미 있는 단락에서 설명을 추출한다 (최대 200자)."""
    lines = content.split("\n")
    in_code = False
    candidate_lines: list[str] = []

    for line in lines:
        stripped = line.strip()
        if stripped.startswith("```"):
            in_code = not in_code
            continue
        if in_code:
            continue
        if not stripped:
            if candidate_lines:
                break
            continue
        # 노이즈 줄 스킵
        if stripped.startswith("#"):
            continue
        if stripped.startswith("> 원문:"):
            continue
        if stripped.startswith(("- curl", "- java", "- Schema", "- Example")):
            continue
        if "Direct link to" in stripped:
            continue
        if "Collapse all" in stripped or "Base URL" in stripped:
            continue
        if stripped.startswith("- application/"):
            continue
        if re.match(r"^- \d{3}$", stripped):
            continue
        if len(stripped) < 10:
            continue
        # 제목과 동일한 줄 스킵 (Docusaurus artifact)
        if stripped == title or stripped.rstrip("。.") == title.rstrip("。."):
            continue
        # 마크다운 서식 제거
        clean = re.sub(r"\*\*([^*]+)\*\*", r"\1", stripped)
        clean = re.sub(r"`([^`]+)`", r"\1", clean)
        clean = clean.replace("\\_", "_")
        candidate_lines.append(clean)
        if len(" ".join(candidate_lines)) > 120:
            break

    if candidate_lines:
        desc = " ".join(candidate_lines)
        if len(desc) > 200:
            idx = desc.rfind(".", 0, 200)
            if idx > 80:
                desc = desc[: idx + 1]
            else:
                desc = desc[:200].rstrip() + "..."
        return desc
    return title


# ── 출력 경로 계산 ────────────────────────────────────────────────────────────

def make_dest_path(
    page_type: str,
    api_path: str,
    method: str,
    src_name: str,
    *,
    dst: Path | None = None,
) -> Path:
    """변환 출력 파일의 절대 경로를 계산한다."""
    _dst = dst or DST_DOCS
    if page_type == "api-endpoint" and api_path and method:
        clean = api_path.strip("/")
        parent_parts = clean.rsplit("/", 1)
        if len(parent_parts) == 2:
            parent, last_seg = parent_parts
            return _dst / "api" / parent / f"{last_seg}.{method}.md"
        else:
            return _dst / "api" / f"{clean}.{method}.md"
    elif page_type == "schema":
        return _dst / "schema" / src_name
    elif page_type == "category-index":
        return _dst / "category" / src_name
    else:
        return _dst / "guide" / src_name


def _build_stem_dest_map(
    src: Path | None = None,
    dst: Path | None = None,
) -> dict[str, Path]:
    """소스 파일을 사전 스캔하여 {src_stem: dest_path} 매핑을 빌드한다.

    _docusaurus_url_to_rel()에서 /docs/... URL을 실제 출력 경로로 해석하는 데 사용.
    """
    _src = src or SRC_RAWS
    mapping: dict[str, Path] = {}
    for src_path in _src.rglob("*.md"):
        try:
            content = src_path.read_text(encoding="utf-8")
            rel = str(src_path.relative_to(_src)).replace("\\", "/")
            page_type = detect_page_type(content, rel)
            method, raw_api_path = extract_method_and_path(content)
            api_path = re.sub(r":([a-zA-Z][a-zA-Z0-9_]*)", r"{\1}", raw_api_path)
            dest = make_dest_path(page_type, api_path, method, src_path.name, dst=dst)
            mapping[src_path.stem] = dest
        except Exception:
            pass
    return mapping
