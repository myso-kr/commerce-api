"""scrape 커맨드 — 최상위 docs/ 페이지 스크래퍼.

사용:
    python cli.py scrape [--out PATH]
"""

from __future__ import annotations

import argparse
import asyncio
import time
from pathlib import Path

from scripts.core.emit import set_cmd, info, warn, error

BASE_URL = "https://apicenter.commerce.naver.com"
START_URL = f"{BASE_URL}/docs/introduction"
DEFAULT_OUTPUT = Path(__file__).parent.parent.parent / "raws"


async def _main(output_dir: Path) -> int:
    from playwright.async_api import async_playwright
    from scripts.scrape.browser import (
        collect_nav_links,
        page_to_markdown,
        url_to_filepath,
    )

    output_dir.mkdir(parents=True, exist_ok=True)

    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent=(
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/122.0.0.0 Safari/537.36"
            )
        )
        page = await context.new_page()

        try:
            info("start", url=START_URL, out=str(output_dir))
            await page.goto(START_URL, wait_until="networkidle", timeout=30000)
            await page.wait_for_timeout(3000)

            links = await collect_nav_links(page)

            if not links:
                debug_path = output_dir / "__debug_page.html"
                debug_path.write_text(await page.content(), encoding="utf-8")
                error("no_links", debug=str(debug_path), ok=False)
                return 1

            info("links_found", count=len(links))

            # 인덱스 저장
            index_lines = [
                "# Naver Commerce API Center - 문서 목록",
                "",
                f"수집일: {time.strftime('%Y-%m-%dT%H:%M:%S')}",
                "",
            ]
            for item in links:
                index_lines.append(f"- [{item['title']}]({item['url']})")
            (output_dir / "_index.md").write_text(
                "\n".join(index_lines), encoding="utf-8"
            )

            total = len(links)
            errors_list: list[dict] = []

            for i, item in enumerate(links, 1):
                url, title = item["url"], item["title"]
                try:
                    content = await page_to_markdown(page, url, title)
                    file_path = url_to_filepath(url, output_dir)
                    file_path.parent.mkdir(parents=True, exist_ok=True)
                    file_path.write_text(content, encoding="utf-8")
                    info("page", idx=i, total=total, url=url,
                         file=str(file_path.relative_to(output_dir)), ok=True)
                except Exception as e:
                    err_msg = str(e)
                    error("page", idx=i, total=total, url=url,
                          msg=err_msg, ok=False)
                    errors_list.append({"url": url, "title": title, "error": err_msg})

                await page.wait_for_timeout(700)

            if errors_list:
                error_lines = ["# 오류 목록", ""]
                for e in errors_list:
                    error_lines.append(f"- [{e['title']}]({e['url']}): {e['error']}")
                (output_dir / "_errors.md").write_text(
                    "\n".join(error_lines), encoding="utf-8"
                )

            ok_count = total - len(errors_list)
            info("done", ok=ok_count, errors=len(errors_list), total=total,
                 out=str(output_dir))
            return 0 if not errors_list else 1

        finally:
            await browser.close()


def run(args: argparse.Namespace) -> int:
    """scrape 커맨드 진입점."""
    set_cmd("scrape")

    out = Path(args.out) if getattr(args, "out", None) else DEFAULT_OUTPUT
    return asyncio.run(_main(out))
