from fastapi import APIRouter

router = APIRouter()

@router.get("")
def list_models():
    return {
        "items": [
            {
                "id": "model-001",
                "name": "Demo 3D mudel",
                "state": "ready"
            }
        ]
    }
