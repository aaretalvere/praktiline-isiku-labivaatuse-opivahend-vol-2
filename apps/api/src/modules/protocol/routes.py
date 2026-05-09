from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.core.database import get_db
from src.modules.protocol.schemas import ProtocolCreate, ProtocolResponse, ProtocolStepUpdate
from src.modules.protocol.service import (
    ProtocolValidationError,
    advance_protocol_step,
    build_protocol_response,
    create_protocol,
    get_protocol,
    go_to_previous_step,
    save_protocol_step,
)

router = APIRouter()


@router.post("", response_model=ProtocolResponse)
def create_protocol_endpoint(payload: ProtocolCreate, db: Session = Depends(get_db)):
    protocol = create_protocol(db, payload.user_id, payload.model_id, payload.module_id)
    return ProtocolResponse.model_validate(build_protocol_response(protocol))


@router.get("/{protocol_id}", response_model=ProtocolResponse)
def get_protocol_endpoint(protocol_id: str, db: Session = Depends(get_db)):
    protocol = get_protocol(db, protocol_id)
    if not protocol:
        raise HTTPException(status_code=404, detail="Protocol not found")
    return ProtocolResponse.model_validate(build_protocol_response(protocol))


@router.post("/{protocol_id}/steps", response_model=ProtocolResponse)
def save_protocol_step_endpoint(
    protocol_id: str,
    payload: ProtocolStepUpdate,
    db: Session = Depends(get_db),
):
    try:
        protocol = save_protocol_step(db, protocol_id, payload.step_key, payload.values)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    if not protocol:
        raise HTTPException(status_code=404, detail="Protocol not found")
    return ProtocolResponse.model_validate(build_protocol_response(protocol))


@router.post("/{protocol_id}/next", response_model=ProtocolResponse)
def next_protocol_step(protocol_id: str, db: Session = Depends(get_db)):
    try:
        protocol = advance_protocol_step(db, protocol_id)
    except ProtocolValidationError as exc:
        raise HTTPException(
            status_code=400,
            detail={
                "message": exc.message,
                "field_errors": exc.field_errors,
            },
        ) from exc
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    if not protocol:
        raise HTTPException(status_code=404, detail="Protocol not found")
    return ProtocolResponse.model_validate(build_protocol_response(protocol))


@router.post("/{protocol_id}/previous", response_model=ProtocolResponse)
def previous_protocol_step(protocol_id: str, db: Session = Depends(get_db)):
    protocol = go_to_previous_step(db, protocol_id)
    if not protocol:
        raise HTTPException(status_code=404, detail="Protocol not found")
    return ProtocolResponse.model_validate(build_protocol_response(protocol))
