import json
from pathlib import Path

MODULES_ROOT = Path(__file__).resolve().parents[5] / "modules"

def load_manifest(module_id: str) -> dict:
    manifest_path = MODULES_ROOT / module_id / "manifest.json"
    with open(manifest_path, "r", encoding="utf-8") as file:
        return json.load(file)

def list_manifests() -> list[dict]:
    manifests = []
    for manifest in MODULES_ROOT.glob("*/manifest.json"):
        with open(manifest, "r", encoding="utf-8") as file:
            manifests.append(json.load(file))
    return manifests
