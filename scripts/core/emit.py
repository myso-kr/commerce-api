"""JSONL structured output emitter.

모든 CLI 커맨드에서 공유하는 JSONL 출력 유틸리티.
한 줄에 JSON 객체 하나를 출력하는 JSON Lines 형식.

사용 예:
    from scripts.core.emit import set_cmd, info, warn, error

    set_cmd("transform")
    info("start", src=str(src), count=197)
    info("file", file="foo.md", type="api-endpoint", ok=True)
    error("file", file="bar.md", ok=False, msg="parse error")
    info("done", ok=195, errors=2, elapsed_ms=3400)
"""

from __future__ import annotations

import json
import sys
from datetime import datetime, timezone

# 현재 실행 중인 커맨드 이름 (set_cmd()로 설정)
_CMD: str = "cli"


def set_cmd(cmd: str) -> None:
    """현재 커맨드 이름을 설정한다. 각 커맨드 run() 진입 시 호출."""
    global _CMD
    _CMD = cmd


def _now() -> str:
    """ISO 8601 UTC 타임스탬프 (밀리초 포함)."""
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"


def emit(level: str, event: str, cmd: str | None = None, **data) -> None:
    """JSONL 한 줄을 stdout에 출력한다.

    Args:
        level: "INFO" | "WARN" | "ERROR"
        event: 이벤트 이름 (예: "start", "file", "issue", "done")
        cmd:   커맨드 이름. None이면 전역 _CMD 사용.
        **data: 추가 필드 (JSON 직렬화 가능해야 함)
    """
    obj: dict = {
        "ts": _now(),
        "level": level,
        "cmd": cmd or _CMD,
        "event": event,
        **data,
    }
    sys.stdout.write(json.dumps(obj, ensure_ascii=False) + "\n")
    sys.stdout.flush()


# ── 레벨별 단축 함수 ──────────────────────────────────────────────────────────

def info(event: str, **data) -> None:
    """INFO 레벨 JSONL 출력."""
    emit("INFO", event, **data)


def warn(event: str, **data) -> None:
    """WARN 레벨 JSONL 출력."""
    emit("WARN", event, **data)


def error(event: str, **data) -> None:
    """ERROR 레벨 JSONL 출력."""
    emit("ERROR", event, **data)
