from fastapi import APIRouter

from src.modules.protocol.routes import router as protocol_router
from src.modules.user.routes import router as user_router
from src.modules.model.routes import router as model_router
from src.modules.protocol.module_routes import router as module_router

api_router = APIRouter()

@api_router.get("/health")
def health():
    return {"status": "ok"}

api_router.include_router(user_router, prefix="/users", tags=["users"])
api_router.include_router(model_router, prefix="/models", tags=["models"])
api_router.include_router(protocol_router, prefix="/protocols", tags=["protocols"])
api_router.include_router(module_router, prefix="/modules", tags=["modules"])
