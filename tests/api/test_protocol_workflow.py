from pathlib import Path
import json

from src.modules.protocol.service import build_review_summary
from src.modules.protocol.workflow import validate_step


def load_manifest() -> dict:
    manifest_path = (
        Path(__file__).resolve().parents[2] / "modules" / "isiku-labivaatus" / "manifest.json"
    )
    return json.loads(manifest_path.read_text(encoding="utf-8"))


class ProtocolStub:
    def __init__(self, payload: dict):
        self.module_id = "isiku-labivaatus"
        self.payload = payload


def test_validate_step_marks_required_fields_missing():
    manifest = load_manifest()

    result = validate_step("protocol_meta", {}, manifest)

    assert result.is_complete is False
    assert result.missing_fields == ["location", "recorded_at"]


def test_review_summary_counts_completed_steps():
    manifest = load_manifest()
    protocol = ProtocolStub(
        payload={
            "model_selection": {"model_id": "demo-model-1"},
            "protocol_meta": {
                "location": "Tallinn",
                "recorded_at": "2026-04-10T10:15",
            },
        }
    )

    summary = build_review_summary(protocol)

    assert summary.completed_steps == 2
    assert summary.total_steps == len(manifest["steps"]) - 1
    assert summary.is_ready_for_review is False
