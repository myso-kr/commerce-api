"""링크 변환 유틸리티.

Docusaurus 내부 링크(/docs/...)를 상대 경로로 변환하고,
카테고리 링크 카드를 Markdown 테이블로 변환한다.
"""

from __future__ import annotations

import os
import re
from pathlib import Path

from scripts.core.paths import DST_DOCS


# ── /docs/... URL → 상대 경로 변환 ────────────────────────────────────────────

def _docusaurus_url_to_rel(
    url: str,
    dest_dir: Path,
    stem_map: dict[str, Path] | None = None,
    *,
    dst: Path | None = None,
) -> str:
    """Docusaurus 내부 URL을 dest_dir 기준 상대 경로로 변환한다.

    해석 우선순위:
      1. /schemas/ 포함 URL  → docs/schema/xxx.md
      2. category/ 파일 존재 → docs/category/xxx.md
      3. stem_map 조회        → 실제 변환 출력 경로
      4. 해석 불가           → 외부 URL (https://apicenter.commerce.naver.com...)
    """
    _dst = dst or DST_DOCS

    # 앵커 분리
    anchor = ""
    if "#" in url:
        url, anchor = url.split("#", 1)
        if anchor.endswith(".md"):
            anchor = anchor[:-3]
        anchor = "#" + anchor

    rel_target = url[6:]  # "/docs/" 제거
    if "/schemas/" in rel_target:
        name = rel_target.rsplit("/", 1)[-1]
        target = _dst / "schema" / (name + ".md")
    else:
        name = rel_target.rsplit("/", 1)[-1]
        cat_path = _dst / "category" / (name + ".md")
        if cat_path.exists():
            target = cat_path
        elif stem_map and name in stem_map:
            target = stem_map[name]
        else:
            # 해석 불가 → 외부 URL로 폴백 (dead-link 검사기 통과)
            return f"https://apicenter.commerce.naver.com{url}{anchor}"

    try:
        rel = os.path.relpath(target, dest_dir).replace("\\", "/")
    except ValueError:
        return url + anchor
    return rel + anchor


# ── 카테고리 링크 카드 → Markdown 테이블 ──────────────────────────────────────

def convert_category_link_cards(
    content: str,
    dest_path: Path,
    stem_map: dict[str, Path] | None = None,
    *,
    dst: Path | None = None,
) -> str:
    """Docusaurus 링크 카드 블록을 Markdown 테이블로 변환한다.

    원본 형식:
        [## 📄️ Title

        Description](/docs/path)

    출력 형식:
        | 문서 | 설명 |
        |------|------|
        | [Title](relative/path.md) | Description |
    """
    dest_dir = dest_path.parent
    pattern = re.compile(
        r'\[## (?:📄️|🗃️) ([^\n]+)(?:\n\n([\s\S]*?))?\]\((/docs/[^\s)]+)\)',
    )
    matches = list(pattern.finditer(content))
    if not matches:
        return content

    rows = ["| 문서 | 설명 |", "|------|------|"]
    for m in matches:
        title = m.group(1).strip()
        desc = (m.group(2) or "").strip().replace("\n", " ")
        url = m.group(3)
        rel = _docusaurus_url_to_rel(url, dest_dir, stem_map, dst=dst)
        rows.append(f"| [{title}]({rel}) | {desc} |")

    table = "\n".join(rows) + "\n"
    start = matches[0].start()
    end = matches[-1].end()
    return content[:start] + table + content[end:]


# ── 일반 /docs/... 링크 변환 ─────────────────────────────────────────────────

def fix_docusaurus_links(
    content: str,
    dest_path: Path,
    stem_map: dict[str, Path] | None = None,
    *,
    dst: Path | None = None,
) -> str:
    """본문의 /docs/... 내부 링크를 상대 경로로 변환한다."""
    dest_dir = dest_path.parent

    def replace_link(m: re.Match) -> str:
        raw_path = m.group(1)
        rest = m.group(2)
        rel = _docusaurus_url_to_rel(raw_path, dest_dir, stem_map, dst=dst)
        return f"]({rel}{rest})"

    return re.sub(r"\]\((/docs/[^\s)\"]+)([^)]*)\)", replace_link, content)


# ── guide/_index.md 링크 수정 ─────────────────────────────────────────────────

def _fix_guide_index_links(
    guide_index: Path,
    src_to_dest: dict[str, Path],
) -> None:
    """guide/_index.md의 소스 파일 링크를 변환된 경로로 교체한다.

    스크래퍼가 생성한 _index.md는 원본 파일명(./xxx.md)을 링크로 사용한다.
    변환 후 해당 파일들이 api/, schema/, category/로 이동했으므로
    실제 변환 경로로 링크를 재작성한다.
    """
    content = guide_index.read_text(encoding="utf-8")
    guide_dir = guide_index.parent

    def replace_link(m: re.Match) -> str:
        text = m.group(1)
        url = m.group(2)
        stem = url.removeprefix("./").removesuffix(".md").rsplit("/", 1)[-1]
        if stem in src_to_dest:
            rel = os.path.relpath(src_to_dest[stem], guide_dir).replace("\\", "/")
            return f"[{text}]({rel})"
        return m.group(0)

    fixed = re.sub(r"\[([^\]]+)\]\((\./[^)]+\.md)\)", replace_link, content)
    guide_index.write_text(fixed, encoding="utf-8")
