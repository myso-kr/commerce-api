"""docs/ 전체 품질 검토 체크 함수 모음.

8개 체크 함수가 JSONL emit으로 결과를 출력한다.
"""

from __future__ import annotations

import re
from pathlib import Path
from typing import Iterator

try:
    import yaml
    _HAVE_YAML = True
except ImportError:
    _HAVE_YAML = False

from scripts.core.emit import info, warn, error
from scripts.core.paths import DST_DOCS

REQUIRED_FM_ALL = {"doc-id", "title", "description", "type", "status", "updated", "source"}
REQUIRED_FM_API = {"method", "path", "base-url", "category", "tags"}


# ── 파싱 헬퍼 ────────────────────────────────────────────────────────────────

def parse_frontmatter(content: str) -> tuple[dict, str]:
    """YAML frontmatter 파싱. (fm_dict, body) 반환."""
    if not content.startswith("---"):
        return {}, content
    end = content.find("\n---", 3)
    if end == -1:
        return {}, content
    fm_raw = content[3:end].strip()
    body = content[end + 4:].strip()
    if _HAVE_YAML:
        try:
            fm = yaml.safe_load(fm_raw) or {}
        except Exception:
            fm = {}
    else:
        # 단순 라인 파싱 폴백
        fm = {}
        for line in fm_raw.splitlines():
            m = re.match(r"^([a-zA-Z_-]+):\s*(.*)", line)
            if m:
                fm[m.group(1)] = m.group(2).strip().strip('"')
    return fm, body


def _iter_md(docs: Path) -> Iterator[Path]:
    """docs/ 하위 모든 .md 파일을 순회한다."""
    yield from sorted(docs.rglob("*.md"))


# ── 1. 파일 수 / 구조 ────────────────────────────────────────────────────────

def check_structure(docs: Path) -> None:
    dirs = {"api": docs / "api", "schema": docs / "schema",
            "category": docs / "category", "guide": docs / "guide"}
    total = 0
    counts: dict[str, int] = {}
    for name, d in dirs.items():
        files = sorted(d.rglob("*.md")) if d.exists() else []
        counts[name] = len(files)
        total += len(files)

    info("structure", total=total, **counts)

    for fname in ("llms.txt", "llms-full.txt"):
        p = docs / fname
        if p.exists():
            info("llms_file", file=fname, size=p.stat().st_size)
        else:
            warn("llms_file", file=fname, msg="파일 없음", ok=False)


# ── 2. 내부 링크 유효성 ───────────────────────────────────────────────────────

def check_links(docs: Path) -> int:
    """내부 링크(dead link) 검사. 발견된 dead link 수 반환."""
    dead = 0
    checked = 0
    link_pat = re.compile(r"\[([^\]]*)\]\(([^)#\s][^)\s]*)\)")

    for md in _iter_md(docs):
        content = md.read_text(encoding="utf-8")
        _, body = parse_frontmatter(content)
        for m in link_pat.finditer(body):
            href = m.group(2)
            if href.startswith(("http", "mailto", "#")):
                continue
            target = (md.parent / href).resolve()
            checked += 1
            if not target.exists():
                try:
                    rel = str(md.relative_to(docs))
                except ValueError:
                    rel = str(md)
                warn("dead_link", file=rel, href=href, ok=False)
                dead += 1

    info("links_done", checked=checked, dead=dead, ok=(dead == 0))
    return dead


# ── 3. frontmatter 완전성 ─────────────────────────────────────────────────────

def check_frontmatter(docs: Path) -> None:
    missing_required = 0
    missing_api = 0

    for md in _iter_md(docs):
        content = md.read_text(encoding="utf-8")
        fm, _ = parse_frontmatter(content)
        try:
            rel = str(md.relative_to(docs))
        except ValueError:
            rel = str(md)

        if not fm:
            warn("frontmatter", file=rel, msg="frontmatter 없음", ok=False)
            missing_required += 1
            continue

        page_type = fm.get("type", "")
        # guide 타입에서는 source 필드 없어도 허용
        required = REQUIRED_FM_ALL - ({"source"} if page_type == "guide" else set())
        missing = required - set(fm.keys())
        if missing:
            warn("frontmatter", file=rel,
                 msg=f"필수 필드 누락: {sorted(missing)}", ok=False)
            missing_required += 1

        if page_type == "api-endpoint":
            m2 = REQUIRED_FM_API - set(fm.keys())
            if m2:
                warn("frontmatter_api", file=rel,
                     msg=f"API 전용 필드 누락: {sorted(m2)}", ok=False)
                missing_api += 1

    info("frontmatter_done",
         missing_required=missing_required,
         missing_api=missing_api,
         ok=(missing_required == 0 and missing_api == 0))


# ── 4. 내용 이상 패턴 ────────────────────────────────────────────────────────

def check_content(docs: Path) -> None:
    html_pat = re.compile(
        r"<(?:div|span|table|tr|td|th|ul|li|p|br)\b", re.IGNORECASE
    )
    too_short = 0
    no_h1 = 0
    multi_h1 = 0
    has_html = 0

    for md in _iter_md(docs):
        content = md.read_text(encoding="utf-8")
        _, body = parse_frontmatter(content)
        try:
            rel = str(md.relative_to(docs))
        except ValueError:
            rel = str(md)

        if len(body.strip()) < 100:
            warn("content", file=rel, msg="본문 100자 미만", ok=False)
            too_short += 1

        h1s = re.findall(r"^# .+", body, re.MULTILINE)
        if len(h1s) == 0:
            warn("content", file=rel, msg="H1 없음", ok=False)
            no_h1 += 1
        elif len(h1s) > 1:
            warn("content", file=rel, msg=f"H1 중복: {len(h1s)}개", ok=False)
            multi_h1 += 1

        if html_pat.search(body):
            warn("content", file=rel, msg="HTML 태그 잔존", ok=False)
            has_html += 1

    info("content_done",
         too_short=too_short,
         no_h1=no_h1,
         multi_h1=multi_h1,
         has_html=has_html,
         ok=(too_short == 0 and no_h1 == 0 and multi_h1 == 0 and has_html == 0))


# ── 5. llms.txt 정합성 ───────────────────────────────────────────────────────

def check_llms(docs: Path) -> None:
    llms = docs / "llms.txt"
    if not llms.exists():
        error("llms", file="llms.txt", msg="파일 없음", ok=False)
        return

    content = llms.read_text(encoding="utf-8")
    links = re.findall(r"\(([^)]+\.md)\)", content)
    broken = []
    for link in links:
        target = (docs / link).resolve()
        if not target.exists():
            broken.append(link)

    sections = re.findall(r"^## .+", content, re.MULTILINE)
    entries = re.findall(r"^- \[", content, re.MULTILINE)

    if broken:
        for b in broken:
            warn("llms_link", file="llms.txt", href=b, ok=False)

    info("llms_done",
         sections=len(sections),
         entries=len(entries),
         links=len(links),
         broken=len(broken),
         ok=(len(broken) == 0))


# ── 6. 카테고리 인덱스 링크 ──────────────────────────────────────────────────

def check_category_links(docs: Path) -> None:
    cat_dir = docs / "category"
    if not cat_dir.exists():
        warn("category_links", msg="category/ 없음", ok=False)
        return

    total = 0
    dead = 0
    link_pat = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")

    for md in sorted(cat_dir.glob("*.md")):
        content = md.read_text(encoding="utf-8")
        _, body = parse_frontmatter(content)
        try:
            rel = str(md.relative_to(docs))
        except ValueError:
            rel = str(md)
        for m in link_pat.finditer(body):
            href = m.group(2)
            if href.startswith(("http", "#")):
                continue
            total += 1
            target = (md.parent / href).resolve()
            if not target.exists():
                warn("category_link", file=rel, href=href, ok=False)
                dead += 1

    info("category_links_done", total=total, dead=dead, ok=(dead == 0))


# ── 7. doc-id 중복 ───────────────────────────────────────────────────────────

def check_doc_id_uniqueness(docs: Path) -> None:
    id_map: dict[str, list[str]] = {}
    for md in _iter_md(docs):
        content = md.read_text(encoding="utf-8")
        fm, _ = parse_frontmatter(content)
        doc_id = str(fm.get("doc-id", "")) if fm else ""
        if doc_id:
            try:
                rel = str(md.relative_to(docs))
            except ValueError:
                rel = str(md)
            id_map.setdefault(doc_id, []).append(rel)

    dups = {k: v for k, v in id_map.items() if len(v) > 1}
    for did, paths in dups.items():
        warn("doc_id_dup", doc_id=did, files=paths, ok=False)

    info("doc_id_done",
         total=len(id_map),
         duplicates=len(dups),
         ok=(len(dups) == 0))


# ── 8. API 파일 method/path 형식 ─────────────────────────────────────────────

def check_api_format(docs: Path) -> None:
    api_dir = docs / "api"
    if not api_dir.exists():
        warn("api_format", msg="api/ 없음", ok=False)
        return

    valid_methods = {"GET", "POST", "PUT", "PATCH", "DELETE"}
    bad_method = 0
    bad_path = 0

    for md in sorted(api_dir.rglob("*.md")):
        content = md.read_text(encoding="utf-8")
        fm, _ = parse_frontmatter(content)
        if not fm or fm.get("type") != "api-endpoint":
            continue
        try:
            rel = str(md.relative_to(docs))
        except ValueError:
            rel = str(md)
        method = str(fm.get("method", ""))
        path = str(fm.get("path", ""))
        if method not in valid_methods:
            warn("api_method", file=rel, method=method, ok=False)
            bad_method += 1
        if not path.startswith("/"):
            warn("api_path", file=rel, path=path, ok=False)
            bad_path += 1

    info("api_format_done",
         bad_method=bad_method,
         bad_path=bad_path,
         ok=(bad_method == 0 and bad_path == 0))
