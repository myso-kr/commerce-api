"""Naver Commerce API Docs — 통합 CLI 진입점.

모든 커맨드가 JSONL(JSON Lines) 형식으로 stdout에 출력된다.

사용법:
    python -m scripts.cli <command> [options]
    python scripts/cli.py <command> [options]

커맨드:
    transform   raws/ → docs/ 변환
    lint        docs/ 린트 검사 (CONVENTION.md 규칙)
    review      docs/ 전체 품질 검토 (dead link, frontmatter 등)
    noise       잔여 노이즈 패턴 검사
    scrape      apicenter 최상위 docs 스크래핑
    scrape-api  commerce-api 심층 BFS 크롤링

출력 형식 (JSONL):
    {"ts": "...", "level": "INFO|WARN|ERROR", "cmd": "...", "event": "...", ...}
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

# python scripts/cli.py 로 직접 실행할 때 프로젝트 루트가 sys.path에 없으면
# 'scripts.xxx' 임포트가 실패한다. __file__ 기준으로 루트를 삽입한다.
_PROJECT_ROOT = Path(__file__).resolve().parent.parent
if str(_PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(_PROJECT_ROOT))


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="cli",
        description="Naver Commerce API Docs CLI (JSONL output)",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    sub = parser.add_subparsers(dest="command", metavar="<command>")
    sub.required = True

    # ── transform ────────────────────────────────────────────────────────────
    p_tr = sub.add_parser(
        "transform",
        help="raws/ → docs/ 변환",
        description="raws/ 하위 Markdown을 CONVENTION.md 규칙에 따라 변환한다.",
    )
    p_tr.add_argument(
        "--src",
        metavar="PATH",
        help="소스 디렉터리 (기본값: raws/commerce-api/current)",
    )
    p_tr.add_argument(
        "--dst",
        metavar="PATH",
        help="출력 루트 디렉터리 (기본값: docs/)",
    )

    # ── lint ──────────────────────────────────────────────────────────────────
    p_lint = sub.add_parser(
        "lint",
        help="docs/ 린트 검사",
        description="CONVENTION.md 규칙 기반으로 docs/ 하위 파일을 검사한다.",
    )
    p_lint.add_argument(
        "--dst",
        metavar="PATH",
        help="문서 루트 디렉터리 (기본값: docs/)",
    )
    p_lint.add_argument(
        "--summary",
        action="store_true",
        help="코드별 요약만 출력 (상세 목록 생략)",
    )

    # ── review ────────────────────────────────────────────────────────────────
    p_rev = sub.add_parser(
        "review",
        help="docs/ 전체 품질 검토",
        description="파일 구조, 내부 링크, frontmatter, 내용 이상 등을 종합 검토한다.",
    )
    p_rev.add_argument(
        "--dst",
        metavar="PATH",
        help="문서 루트 디렉터리 (기본값: docs/)",
    )

    # ── noise ─────────────────────────────────────────────────────────────────
    p_noise = sub.add_parser(
        "noise",
        help="잔여 노이즈 패턴 검사",
        description="변환 후에도 남아있는 Docusaurus 아티팩트·노이즈 패턴을 검사한다.",
    )
    p_noise.add_argument(
        "--dst",
        metavar="PATH",
        help="문서 루트 디렉터리 (기본값: docs/)",
    )

    # ── scrape ────────────────────────────────────────────────────────────────
    p_scrape = sub.add_parser(
        "scrape",
        help="apicenter 최상위 docs 스크래핑",
        description="Playwright로 apicenter 최상위 /docs 페이지를 수집한다.",
    )
    p_scrape.add_argument(
        "--out",
        metavar="PATH",
        help="저장 디렉터리 (기본값: raws/)",
    )

    # ── scrape-api ────────────────────────────────────────────────────────────
    p_scrape_api = sub.add_parser(
        "scrape-api",
        help="commerce-api 심층 BFS 크롤링",
        description="BFS로 /docs/commerce-api/current/** 를 전체 수집한다.",
    )
    p_scrape_api.add_argument(
        "--out",
        metavar="PATH",
        help="저장 디렉터리 (기본값: raws/commerce-api/current/)",
    )

    return parser


def main() -> None:
    parser = _build_parser()
    args = parser.parse_args()

    if args.command == "transform":
        from scripts.transform import run
    elif args.command == "lint":
        from scripts.lint import run
    elif args.command == "review":
        from scripts.review import run
    elif args.command == "noise":
        from scripts.noise import run
    elif args.command == "scrape":
        from scripts.scrape import run
    elif args.command == "scrape-api":
        from scripts.scrape_api import run
    else:
        parser.print_help()
        sys.exit(1)

    sys.exit(run(args))


if __name__ == "__main__":
    main()
