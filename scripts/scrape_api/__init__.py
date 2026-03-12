"""scrape-api 커맨드 — Commerce API BFS 크롤러.

사용:
    python cli.py scrape-api [--out PATH]
"""

from __future__ import annotations

import argparse
import asyncio
from pathlib import Path

from scripts.core.emit import set_cmd, info

DEFAULT_OUTPUT = (
    Path(__file__).parent.parent.parent
    / "raws"
    / "commerce-api"
    / "current"
)


async def _main(output_dir: Path) -> int:
    from playwright.async_api import async_playwright
    from scripts.scrape_api.crawler import crawl

    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent=(
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/122.0.0.0 Safari/537.36"
            )
        )
        try:
            saved, errors = await crawl(context, output_dir)
        finally:
            await browser.close()

    info("done", saved=saved, errors=errors, out=str(output_dir),
         ok=(errors == 0))
    return 0 if errors == 0 else 1


def run(args: argparse.Namespace) -> int:
    """scrape-api 커맨드 진입점."""
    set_cmd("scrape-api")

    out = Path(args.out) if getattr(args, "out", None) else DEFAULT_OUTPUT
    info("start", out=str(out))
    return asyncio.run(_main(out))
