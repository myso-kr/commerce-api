"""lint 커맨드 — CONVENTION.md 규칙 기반 문서 린트 검사기.

사용:
    python cli.py lint [--summary] [--dst PATH]
"""

from __future__ import annotations

import argparse
import time
from pathlib import Path

from scripts.core.emit import set_cmd, info, warn, error
from scripts.core.paths import DST_DOCS, OUTPUT_DIRS
from scripts.lint.rules import lint_file, Issue

LEVEL_ERROR = "ERROR"
LEVEL_WARN = "WARN"
LEVEL_INFO = "INFO"


def run(args: argparse.Namespace) -> int:
    """lint 커맨드 진입점.

    Returns:
        0 — ERROR 없음
        1 — ERROR 1건 이상
    """
    set_cmd("lint")

    dst = Path(args.dst) if getattr(args, "dst", None) else DST_DOCS
    summary_only: bool = getattr(args, "summary", False)

    # 검사 대상 파일 수집
    md_files: list[Path] = []
    for d in OUTPUT_DIRS:
        actual = dst / d.relative_to(DST_DOCS) if dst != DST_DOCS else d
        if actual.exists():
            md_files.extend(actual.rglob("*.md"))

    if not md_files:
        error("start", msg="검사 대상 없음", dst=str(dst))
        return 1

    total = len(md_files)
    info("start", total=total, dst=str(dst))

    t0 = time.monotonic()
    all_issues: list[Issue] = []

    for path in sorted(md_files):
        issues = lint_file(path, dst=dst)
        for iss in issues:
            level = iss.level.lower()
            emit_fn = error if iss.level == LEVEL_ERROR else (warn if iss.level == LEVEL_WARN else info)
            emit_fn(
                "issue",
                code=iss.code,
                file=iss.file,
                message=iss.message,
            )
        all_issues.extend(issues)

    elapsed_ms = int((time.monotonic() - t0) * 1000)
    errors_n = sum(1 for i in all_issues if i.level == LEVEL_ERROR)
    warns_n = sum(1 for i in all_issues if i.level == LEVEL_WARN)
    infos_n = sum(1 for i in all_issues if i.level == LEVEL_INFO)

    # 코드별 집계
    code_counts: dict[str, int] = {}
    for iss in all_issues:
        code_counts[iss.code] = code_counts.get(iss.code, 0) + 1

    info(
        "done",
        files=total,
        issues=len(all_issues),
        errors=errors_n,
        warns=warns_n,
        infos=infos_n,
        by_code=code_counts,
        elapsed_ms=elapsed_ms,
        ok=(errors_n == 0),
    )

    return 0 if errors_n == 0 else 1
