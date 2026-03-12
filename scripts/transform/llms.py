"""llms.txt / llms-full.txt 생성 유틸리티.

llmstxt.org 표준에 따라 AI 진입점 파일과
LLM 전체 컨텍스트 연결 파일을 생성한다.
"""

from __future__ import annotations

import re
from pathlib import Path

from scripts.core.emit import info
from scripts.core.paths import DST_DOCS


def generate_llms_txt(
    results: list[tuple[Path, Path, str]],
    *,
    dst: Path | None = None,
) -> None:
    """docs/llms.txt를 llmstxt.org 표준에 따라 생성한다.

    Args:
        results: (src_path, dest_path, final_content) 튜플 목록
        dst:     출력 루트 디렉터리 (기본값: DST_DOCS)
    """
    _dst = dst or DST_DOCS

    guides: list[str] = []
    endpoints: list[str] = []
    schemas: list[str] = []
    categories: list[str] = []

    for _src_path, dest_path, content in results:
        try:
            rel = dest_path.relative_to(_dst).as_posix()
        except ValueError:
            rel = dest_path.name

        t = re.search(r'^title: "([^"]+)"', content, re.MULTILINE)
        d = re.search(r'^description: "([^"]+)"', content, re.MULTILINE)
        pt = re.search(r"^type: (\S+)", content, re.MULTILINE)
        m = re.search(r"^method: (\S+)", content, re.MULTILINE)
        p = re.search(r"^path: (\S+)", content, re.MULTILINE)

        title_s = t.group(1) if t else dest_path.stem
        desc_s = d.group(1) if d else ""
        type_s = pt.group(1) if pt else "guide"
        method_s = m.group(1) if m else ""
        path_s = p.group(1) if p else ""

        if desc_s:
            entry = f"- [{title_s}]({rel}): {desc_s}"
        else:
            entry = f"- [{title_s}]({rel})"

        if method_s and path_s:
            entry += f" ({method_s} {path_s})"

        if type_s == "guide":
            guides.append(entry)
        elif type_s == "api-endpoint":
            endpoints.append(entry)
        elif type_s == "schema":
            schemas.append(entry)
        elif type_s == "category-index":
            categories.append(entry)

    lines = [
        "# 네이버 커머스API",
        "",
        "> 스마트스토어 주요 기능을 HTTP API로 호출하는 커머스 플랫폼 공개 API 문서.",
        "> OAuth2 Client Credentials 인증 필요. API 버전: 최신.",
        "",
    ]

    if guides:
        lines += ["## 가이드", ""] + guides + [""]
    if endpoints:
        lines += ["## API 엔드포인트", ""] + sorted(endpoints) + [""]
    if schemas:
        lines += ["## 스키마", ""] + schemas + [""]
    if categories:
        lines += ["## Optional", ""] + categories + [""]

    out = _dst / "llms.txt"
    out.write_text("\n".join(lines), encoding="utf-8")
    info(
        "llms_txt",
        file=str(out),
        endpoints=len(endpoints),
        schemas=len(schemas),
        guides=len(guides),
        categories=len(categories),
    )


def generate_llms_full_txt(
    results: list[tuple[Path, Path, str]],
    *,
    dst: Path | None = None,
) -> None:
    """docs/llms-full.txt를 생성한다.

    모든 변환 문서를 하나의 파일로 연결한다.
    LLM 전체 컨텍스트 소비용.

    Args:
        results: (src_path, dest_path, final_content) 튜플 목록
        dst:     출력 루트 디렉터리 (기본값: DST_DOCS)
    """
    _dst = dst or DST_DOCS

    def sort_key(item: tuple) -> tuple:
        try:
            rel = item[1].relative_to(_dst).as_posix()
        except ValueError:
            rel = item[1].name
        if rel.startswith("guide/"):
            return (0, rel)
        elif rel.startswith("api/"):
            return (1, rel)
        elif rel.startswith("schema/"):
            return (2, rel)
        else:
            return (3, rel)

    parts: list[str] = []
    for _src_path, dest_path, content in sorted(results, key=sort_key):
        try:
            rel = dest_path.relative_to(_dst).as_posix()
        except ValueError:
            rel = dest_path.name
        parts.append(f"\n\n<!-- === FILE: {rel} === -->\n")
        parts.append(content)

    out = _dst / "llms-full.txt"
    out.write_text("\n".join(parts), encoding="utf-8")
    size_kb = out.stat().st_size // 1024
    info(
        "llms_full_txt",
        file=str(out),
        documents=len(results),
        size_kb=size_kb,
    )
