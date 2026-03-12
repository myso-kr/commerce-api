"""잔여 노이즈 패턴 검사 함수 모음.

변환된 출력 디렉터리(api/, schema/, category/, guide/)만 검사한다.
각 함수는 JSONL emit으로 결과를 출력하고 발견 건수를 반환한다.
"""

from __future__ import annotations

import re
from pathlib import Path
from typing import Iterator

from scripts.core.emit import info, warn
from scripts.core.paths import DST_DOCS, OUTPUT_DIRS


def _iter_output_md(docs: Path) -> Iterator[Path]:
    """변환된 출력 파일만 순회한다."""
    for d in OUTPUT_DIRS:
        actual = docs / d.relative_to(DST_DOCS) if docs != DST_DOCS else d
        if actual.exists():
            yield from sorted(actual.rglob("*.md"))


def _is_in_code_block(content: str, match_start: int) -> bool:
    """매치 위치가 펜스드 코드블록 내부인지 확인한다."""
    before = content[:match_start]
    fences = re.findall(r"^```", before, re.MULTILINE)
    return len(fences) % 2 == 1


# ── 1. escaped_underscore ────────────────────────────────────────────────────

def check_escaped_underscores(docs: Path) -> int:
    """코드블록 외부의 \\_ 를 검사한다.

    Returns:
        코드블록 외부에 있는 \\_ 총 건수
    """
    pattern = re.compile(r"\\_")
    total_outside = 0
    total_inside = 0
    files_with_outside = 0

    for md in _iter_output_md(docs):
        content = md.read_text(encoding="utf-8")
        matches = list(pattern.finditer(content))
        if not matches:
            continue

        outside = [m for m in matches if not _is_in_code_block(content, m.start())]
        inside = [m for m in matches if _is_in_code_block(content, m.start())]

        total_outside += len(outside)
        total_inside += len(inside)

        if outside:
            files_with_outside += 1
            try:
                rel = str(md.relative_to(docs))
            except ValueError:
                rel = str(md)
            warn(
                "escaped_underscore",
                file=rel,
                count_outside=len(outside),
                count_inside=len(inside),
                ok=False,
            )

    info(
        "escaped_underscores_done",
        total_outside=total_outside,
        total_inside=total_inside,
        files=files_with_outside,
        ok=(total_outside == 0),
    )
    return total_outside


# ── 2. docusaurus_link ───────────────────────────────────────────────────────

def check_docusaurus_links(docs: Path) -> int:
    """본문에 /docs/... 링크가 남아있는지 검사한다.

    Returns:
        /docs/ 링크가 잔존하는 파일 수
    """
    pattern = re.compile(r"\]\(/docs/[^\s)\"]+\)")
    fm_pattern = re.compile(r"^description:.*?/docs/", re.MULTILINE)
    files_found = 0

    for md in _iter_output_md(docs):
        content = md.read_text(encoding="utf-8")
        parts = content.split("---", 2)
        body = parts[2] if len(parts) >= 3 else content
        try:
            rel = str(md.relative_to(docs))
        except ValueError:
            rel = str(md)

        matches = list(pattern.finditer(body))
        if matches:
            files_found += 1
            warn(
                "docusaurus_link",
                file=rel,
                count=len(matches),
                ok=False,
            )

        if fm_pattern.search(content):
            warn(
                "docusaurus_link_fm",
                file=rel,
                msg="frontmatter description에 /docs/ 링크",
                ok=False,
            )

    info("docusaurus_links_done", files=files_found, ok=(files_found == 0))
    return files_found


# ── 3. raw_method_block ───────────────────────────────────────────────────────

def check_raw_method_blocks(docs: Path) -> int:
    """HTTP 메서드 코드블록이 미변환 상태로 남아있는지 검사한다.

    Returns:
        raw method block이 있는 파일 수
    """
    pattern = re.compile(r"^```\s*\n(GET|POST|PUT|DELETE|PATCH)\s+/", re.MULTILINE)
    files_found = 0

    for md in _iter_output_md(docs):
        content = md.read_text(encoding="utf-8")
        matches = list(pattern.finditer(content))
        if matches:
            files_found += 1
            try:
                rel = str(md.relative_to(docs))
            except ValueError:
                rel = str(md)
            warn(
                "raw_method_block",
                file=rel,
                count=len(matches),
                ok=False,
            )

    info("raw_method_blocks_done", files=files_found, ok=(files_found == 0))
    return files_found


# ── 4. ui_tabs ────────────────────────────────────────────────────────────────

def check_ui_tabs(docs: Path) -> int:
    """Docusaurus UI 탭 아티팩트가 남아있는지 검사한다.

    Returns:
        UI 탭 아티팩트가 있는 파일 총 수 (패턴 중복 포함)
    """
    patterns = [
        (r":::tabs", "Docusaurus tabs directive"),
        (r"import Tabs", "import Tabs"),
        (r"<TabItem", "TabItem JSX"),
        (r"\[\u200b\]", "invisible space in link"),
    ]
    total_files = 0

    for pattern_str, label in patterns:
        pattern = re.compile(pattern_str)
        found = 0
        for md in _iter_output_md(docs):
            content = md.read_text(encoding="utf-8")
            if pattern.search(content):
                found += 1
                try:
                    rel = str(md.relative_to(docs))
                except ValueError:
                    rel = str(md)
                warn("ui_tab", file=rel, pattern=label, ok=False)
        info("ui_tab_pattern", pattern=label, files=found, ok=(found == 0))
        total_files += found

    return total_files


# ── 5. direct_link_anchor ────────────────────────────────────────────────────

def check_direct_link_anchor(docs: Path) -> int:
    """'Direct link to' 앵커 아티팩트가 남아있는지 검사한다.

    Returns:
        'Direct link to'가 있는 파일 수
    """
    pattern = re.compile(r"Direct link to")
    files_found = 0

    for md in _iter_output_md(docs):
        content = md.read_text(encoding="utf-8")
        matches = list(pattern.finditer(content))
        if matches:
            files_found += 1
            try:
                rel = str(md.relative_to(docs))
            except ValueError:
                rel = str(md)
            warn(
                "direct_link_anchor",
                file=rel,
                count=len(matches),
                ok=False,
            )

    info("direct_link_anchors_done", files=files_found, ok=(files_found == 0))
    return files_found


# ── 6. 파일 수 통계 ──────────────────────────────────────────────────────────

def count_output_files(docs: Path) -> None:
    """출력 디렉터리별 파일 수를 emit한다."""
    counts: dict[str, int] = {}
    total = 0
    for d in OUTPUT_DIRS:
        actual = docs / d.relative_to(DST_DOCS) if docs != DST_DOCS else d
        if actual.exists():
            count = len(list(actual.rglob("*.md")))
            counts[d.name] = count
            total += count
    info("file_count", total=total, **counts)
