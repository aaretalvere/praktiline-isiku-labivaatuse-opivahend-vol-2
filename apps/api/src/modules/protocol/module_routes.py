from fastapi import APIRouter

from src.modules.protocol.module_loader import list_manifests

router = APIRouter()

@router.get("")
def get_modules():
    return {"items": list_manifests()}
