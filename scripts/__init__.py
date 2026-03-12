"""scripts 패키지.

CLI 진입점: scripts/cli.py
    python -m scripts.cli <subcommand> [options]
    python scripts/cli.py <subcommand> [options]

서브커맨드:
    transform   — raws/ → docs/ 변환
    lint        — docs/ 품질 검사
    review      — docs/ 구조·링크 리뷰
    noise       — 변환 노이즈 잔존 검사
    scrape      — 최상위 문서 스크래핑
    scrape-api  — commerce-api BFS 크롤링
"""
