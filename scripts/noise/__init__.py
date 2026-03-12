"""noise 커맨드 — 잔여 노이즈 패턴 검사.

사용:
    python cli.py noise [--dst PATH]
"""

from __future__ import annotations

import argparse
import time
from pathlib import Path

from scripts.core.emit import set_cmd, info
from scripts.core.paths import DST_DOCS
from scripts.noise.checks import (
    count_output_files,
    check_escaped_underscores,
    check_docusaurus_links,
    check_raw_method_blocks,
    check_ui_tabs,
    check_direct_link_anchor,
)


def run(args: argparse.Namespace) -> int:
    """noise 커맨드 진입점.

    Returns:
        0 — 노이즈 없음
        1 — 노이즈 1건 이상
    """
    set_cmd("noise")

    dst = Path(args.dst) if getattr(args, "dst", None) else DST_DOCS

    if not dst.exists():
        from scripts.core.emit import error
        error("start", msg=f"docs 디렉터리가 없음: {dst}", ok=False)
        return 1

    t0 = time.monotonic()
    info("start", dst=str(dst))

    count_output_files(dst)
    outside = check_escaped_underscores(dst)
    docusaurus = check_docusaurus_links(dst)
    raw_methods = check_raw_method_blocks(dst)
    ui_tabs = check_ui_tabs(dst)
    direct_links = check_direct_link_anchor(dst)

    elapsed_ms = int((time.monotonic() - t0) * 1000)
    total_noise = outside + docusaurus + raw_methods + ui_tabs + direct_links
    info(
        "done",
        escaped_underscores=outside,
        docusaurus_links=docusaurus,
        raw_method_blocks=raw_methods,
        ui_tabs=ui_tabs,
        direct_link_anchors=direct_links,
        total_noise=total_noise,
        elapsed_ms=elapsed_ms,
        ok=(total_noise == 0),
    )

    return 0 if total_noise == 0 else 1
