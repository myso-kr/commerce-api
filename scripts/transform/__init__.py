"""transform 커맨드 패키지.

크롤링된 원본 Markdown(raws/)을 CONVENTION.md 규칙에 따라
구조화된 docs/ 디렉터리로 변환한다.

Entry point:
    run(args) — cli.py에서 호출
"""

from __future__ import annotations

import os
import re
import sys
import time
from pathlib import Path

from scripts.core.emit import set_cmd, info, warn, error as emit_error
from scripts.core.paths import SRC_RAWS, DST_DOCS

from .converter import (
    detect_page_type,
    extract_method_and_path,
    extract_source_url,
    extract_title,
    extract_base_url,
    extract_description,
    make_dest_path,
    _build_stem_dest_map,
)
from .frontmatter import (
    get_category_and_tags,
    guess_category_from_content,
    make_doc_id,
    build_frontmatter,
)
from .fixes import (
    remove_source_line,
    dedup_h1,
    remove_direct_links,
    remove_ui_tabs,
    remove_application_type_lines,
    remove_status_code_list,
    remove_schema_labels,
    remove_web_ui_widget,
    remove_auth_boilerplate,
    convert_method_block,
    add_h2_context,
    remove_array_notation,
    fix_escaped_underscores,
    fix_bare_code_blocks,
    dedup_repeated_paragraphs,
    clean_blank_lines,
)
from .links import (
    convert_category_link_cards,
    fix_docusaurus_links,
    _fix_guide_index_links,
)
from .llms import generate_llms_txt, generate_llms_full_txt

# ── SRC / DST는 args로 오버라이드 가능 ────────────────────────────────────────
SRC: Path = SRC_RAWS
DST: Path = DST_DOCS


def transform_file(
    src_path: Path,
    stem_map: dict[str, Path] | None = None,
    *,
    src: Path | None = None,
    dst: Path | None = None,
) -> tuple[Path, str] | None:
    """단일 소스 파일을 변환한다. (dest_path, final_content) 또는 None 반환."""
    _src = src or SRC
    _dst = dst or DST

    content = src_path.read_text(encoding="utf-8")
    rel = str(src_path.relative_to(_src)).replace("\\", "/")
    src_name = src_path.name

    # 1. 페이지 타입 감지
    page_type = detect_page_type(content, rel)

    # 2. 메타데이터 추출
    title = extract_title(content)
    source_url = (
        extract_source_url(content)
        or "https://apicenter.commerce.naver.com/docs/commerce-api/current"
    )
    method, raw_api_path = extract_method_and_path(content)
    api_path = re.sub(r":([a-zA-Z][a-zA-Z0-9_]*)", r"{\1}", raw_api_path)

    from .converter import BASE_URL as _BASE_URL
    base_url = extract_base_url(content) if method else _BASE_URL

    if page_type == "api-endpoint":
        category, tags = get_category_and_tags(api_path)
        method_tag = method.lower()
        if method_tag not in tags:
            tags.append(method_tag)
    else:
        category, tags = guess_category_from_content(content, title)
        if page_type == "schema" and "schema" not in tags:
            tags = ["schema"] + tags
        if page_type == "category-index" and "category" not in tags:
            tags.append("category")

    doc_id = make_doc_id(page_type, api_path, method, source_url, title)
    description = extract_description(content, title, page_type)

    # 3. 출력 경로 계산
    dest = make_dest_path(page_type, api_path, method, src_name, dst=_dst)

    # 4. 콘텐츠 변환
    content = remove_source_line(content)
    content = dedup_h1(content)
    content = remove_direct_links(content)
    content = remove_ui_tabs(content)
    content = remove_application_type_lines(content)
    content = remove_status_code_list(content)
    content = remove_schema_labels(content)
    content = remove_web_ui_widget(content)
    content = remove_auth_boilerplate(content)

    if page_type == "api-endpoint" and method and api_path:
        content = convert_method_block(content, method, api_path, base_url, raw_api_path)
        content = add_h2_context(content, method, api_path)

    content = remove_array_notation(content)
    content = fix_escaped_underscores(content)
    content = fix_bare_code_blocks(content)

    if page_type == "category-index":
        content = convert_category_link_cards(content, dest, stem_map, dst=_dst)
    content = fix_docusaurus_links(content, dest, stem_map, dst=_dst)
    content = dedup_repeated_paragraphs(content)
    content = clean_blank_lines(content)

    # 5. frontmatter 생성
    frontmatter = build_frontmatter(
        doc_id, title, description, page_type, method, api_path,
        base_url, category, tags, source_url,
    )

    # 6. 기존 frontmatter 제거
    stripped = content.lstrip()
    if stripped.startswith("---"):
        end = stripped.find("\n---\n", 3)
        if end != -1:
            stripped = stripped[end + 5:]
        content = stripped

    final = frontmatter + "\n\n" + content.lstrip("\n")
    return dest, final


# ── 메인 파이프라인 ────────────────────────────────────────────────────────────

def run(args) -> int:
    """transform 커맨드 실행. 0=성공, 1=오류."""
    set_cmd("transform")
    global SRC, DST

    src = Path(args.src) if hasattr(args, "src") and args.src else SRC_RAWS
    dst = Path(args.dst) if hasattr(args, "dst") and args.dst else DST_DOCS

    if not src.exists():
        emit_error("start", src=str(src), msg=f"소스 디렉터리 없음: {src}")
        return 1

    md_files = sorted(src.rglob("*.md"))
    info("start", src=str(src), dst=str(dst), count=len(md_files))

    # stem → dest 사전 구축
    info("stem_map", event="stem_map", msg="stem→dest 맵 구축 중")
    stem_map = _build_stem_dest_map_with_paths(src, dst)
    info("stem_map_done", count=len(stem_map))

    t0 = time.perf_counter()
    results: list[tuple[Path, Path, str]] = []
    errors_list: list[tuple[Path, str]] = []
    src_to_dest: dict[str, Path] = {}
    type_counts: dict[str, int] = {}

    total = len(md_files)
    for i, src_path in enumerate(md_files, 1):
        rel = str(src_path.relative_to(src))
        try:
            result = transform_file(src_path, stem_map, src=src, dst=dst)
            if result is None:
                continue
            dest_path, content = result

            dest_path.parent.mkdir(parents=True, exist_ok=True)
            dest_path.write_text(content, encoding="utf-8")
            results.append((src_path, dest_path, content))
            src_to_dest[src_path.stem] = dest_path

            m = re.search(r"^type: (\S+)", content, re.MULTILINE)
            page_type = m.group(1) if m else "unknown"
            type_counts[page_type] = type_counts.get(page_type, 0) + 1

            info("file", idx=i, total=total, src=rel,
                 dest=str(dest_path.relative_to(dst)), type=page_type, ok=True)

        except Exception as e:
            import traceback
            emit_error("file", idx=i, total=total, src=rel, ok=False, msg=str(e),
                       traceback=traceback.format_exc())
            errors_list.append((src_path, str(e)))

    # guide/_index.md 링크 수정
    guide_index = dst / "guide" / "_index.md"
    if guide_index.exists():
        _fix_guide_index_links(guide_index, src_to_dest)
        info("fix_guide_index", file=str(guide_index.relative_to(dst)))

    # llms.txt / llms-full.txt 생성
    if results:
        generate_llms_txt(results, dst=dst)
        generate_llms_full_txt(results, dst=dst)

    elapsed = int((time.perf_counter() - t0) * 1000)
    info("done",
         ok=len(results),
         errors=len(errors_list),
         elapsed_ms=elapsed,
         types=type_counts)

    return 1 if errors_list else 0


def _build_stem_dest_map_with_paths(src: Path, dst: Path) -> dict[str, Path]:
    """src/dst를 명시적으로 받는 stem→dest 맵 구축."""
    mapping: dict[str, Path] = {}
    for src_path in src.rglob("*.md"):
        try:
            content = src_path.read_text(encoding="utf-8")
            rel = str(src_path.relative_to(src)).replace("\\", "/")
            page_type = detect_page_type(content, rel)
            method, raw_api_path = extract_method_and_path(content)
            api_path = re.sub(r":([a-zA-Z][a-zA-Z0-9_]*)", r"{\1}", raw_api_path)
            dest = make_dest_path(page_type, api_path, method, src_path.name, dst=dst)
            mapping[src_path.stem] = dest
        except Exception:
            pass
    return mapping
