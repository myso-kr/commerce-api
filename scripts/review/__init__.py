"""review 커맨드 — docs/ 전체 품질 검토.

사용:
    python cli.py review [--dst PATH]
"""

from __future__ import annotations

import argparse
import time
from pathlib import Path

from scripts.core.emit import set_cmd, info
from scripts.core.paths import DST_DOCS
from scripts.review.checks import (
    check_structure,
    check_links,
    check_frontmatter,
    check_content,
    check_llms,
    check_category_links,
    check_doc_id_uniqueness,
    check_api_format,
)


def run(args: argparse.Namespace) -> int:
    """review 커맨드 진입점.

    Returns:
        0 — dead link 없음
        1 — dead link 1건 이상
    """
    set_cmd("review")

    dst = Path(args.dst) if getattr(args, "dst", None) else DST_DOCS

    if not dst.exists():
        from scripts.core.emit import error
        error("start", msg=f"docs 디렉터리가 없음: {dst}", ok=False)
        return 1

    t0 = time.monotonic()
    info("start", dst=str(dst))

    check_structure(dst)
    dead = check_links(dst)
    check_frontmatter(dst)
    check_content(dst)
    check_llms(dst)
    check_category_links(dst)
    check_doc_id_uniqueness(dst)
    check_api_format(dst)

    elapsed_ms = int((time.monotonic() - t0) * 1000)
    info("done", elapsed_ms=elapsed_ms, ok=(dead == 0))

    return 0 if dead == 0 else 1
