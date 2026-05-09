import uuid
from datetime import datetime
from typing import Any

from sqlalchemy.orm import Session

from src.db.models.audit_log import AuditLog
from src.db.models.protocol import Protocol
from src.modules.protocol.module_loader import load_manifest
from src.modules.protocol.schemas import ProtocolReviewSummary, ProtocolStepDefinition
from src.modules.protocol.workflow import (
    get_next_step,
    get_previous_step,
    get_step_definition,
    get_step_definitions,
    validate_step,
)


class ProtocolValidationError(ValueError):
    def __init__(self, message: str, *, field_errors: dict[str, list[str]]) -> None:
        super().__init__(message)
        self.message = message
        self.field_errors = field_errors


def build_validation_error_detail(protocol: Protocol) -> dict[str, object]:
    manifest = load_manifest(protocol.module_id)
    validation = validate_step(protocol.current_step, protocol.payload or {}, manifest)
    step_definition = get_step_definition(protocol.current_step, manifest)
    field_labels = {
        field.key: field.label for field in step_definition.fields
    } if step_definition else {}

    issues: list[str] = []
    field_errors: dict[str, list[str]] = {}

    for field_key in validation.missing_fields:
        label = field_labels.get(field_key, field_key)
        field_errors[field_key] = ["Kohustuslik vaartus on puudu."]
        issues.append(f"{label}: kohustuslik vaartus on puudu.")

    for field_key, messages in validation.validation_errors.items():
        label = field_labels.get(field_key, field_key)
        field_errors[field_key] = messages
        issues.append(f"{label}: {' '.join(messages)}")

    if not issues:
        issues.append("Aktiivne samm on puudulik.")

    return {
        "message": " | ".join(issues),
        "field_errors": field_errors,
    }


def write_audit_log(
    db: Session,
    *,
    entity_type: str,
    entity_id: str,
    action: str,
    actor_id: str | None,
    details: dict[str, Any] | None = None,
) -> None:
    audit_log = AuditLog(
        id=str(uuid.uuid4()),
        entity_type=entity_type,
        entity_id=entity_id,
        action=action,
        actor_id=actor_id,
        details=details or {},
        created_at=datetime.utcnow(),
    )
    db.add(audit_log)


def create_protocol(db: Session, user_id: str, model_id: str, module_id: str) -> Protocol:
    protocol = Protocol(
        id=str(uuid.uuid4()),
        user_id=user_id,
        model_id=model_id,
        module_id=module_id,
        state="draft",
        current_step="model_selection",
        payload={"model_selection": {"model_id": model_id}},
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    db.add(protocol)
    write_audit_log(
        db,
        entity_type="protocol",
        entity_id=protocol.id,
        action="protocol.created",
        actor_id=user_id,
        details={"module_id": module_id, "model_id": model_id},
    )
    db.commit()
    db.refresh(protocol)
    return protocol


def get_protocol(db: Session, protocol_id: str) -> Protocol | None:
    return db.get(Protocol, protocol_id)


def save_protocol_step(
    db: Session,
    protocol_id: str,
    step_key: str,
    values: dict[str, Any],
) -> Protocol | None:
    protocol = get_protocol(db, protocol_id)
    if not protocol:
        return None

    manifest = load_manifest(protocol.module_id)
    if get_step_definition(step_key, manifest) is None:
        raise ValueError(f"Unknown step: {step_key}")

    current_payload = dict(protocol.payload or {})
    step_payload = dict(current_payload.get(step_key, {}))
    step_payload.update(values)

    if step_key == "model_selection" and step_payload.get("model_id"):
        protocol.model_id = str(step_payload["model_id"])

    current_payload[step_key] = step_payload
    protocol.payload = current_payload
    protocol.state = "in_progress"
    protocol.updated_at = datetime.utcnow()

    db.add(protocol)
    write_audit_log(
        db,
        entity_type="protocol",
        entity_id=protocol.id,
        action="protocol.step_saved",
        actor_id=protocol.user_id,
        details={"step_key": step_key, "saved_keys": sorted(step_payload.keys())},
    )
    db.commit()
    db.refresh(protocol)
    return protocol


def advance_protocol_step(db: Session, protocol_id: str) -> Protocol | None:
    protocol = get_protocol(db, protocol_id)
    if not protocol:
        return None

    manifest = load_manifest(protocol.module_id)
    validation = validate_step(protocol.current_step, protocol.payload or {}, manifest)
    if not validation.is_complete:
        detail = build_validation_error_detail(protocol)
        raise ProtocolValidationError(
            str(detail["message"]),
            field_errors=detail["field_errors"],  # type: ignore[arg-type]
        )

    next_step = get_next_step(protocol.current_step, manifest["steps"])
    if next_step:
        previous_step = protocol.current_step
        protocol.current_step = next_step
        protocol.state = "review" if next_step == "review" else "in_progress"
        protocol.updated_at = datetime.utcnow()
        db.add(protocol)
        write_audit_log(
            db,
            entity_type="protocol",
            entity_id=protocol.id,
            action="protocol.step_advanced",
            actor_id=protocol.user_id,
            details={"from_step": previous_step, "to_step": next_step},
        )
        db.commit()
        db.refresh(protocol)
    return protocol


def go_to_previous_step(db: Session, protocol_id: str) -> Protocol | None:
    protocol = get_protocol(db, protocol_id)
    if not protocol:
        return None

    manifest = load_manifest(protocol.module_id)
    previous_step = get_previous_step(protocol.current_step, manifest["steps"])
    if previous_step:
        current_step = protocol.current_step
        protocol.current_step = previous_step
        protocol.state = "in_progress"
        protocol.updated_at = datetime.utcnow()
        db.add(protocol)
        write_audit_log(
            db,
            entity_type="protocol",
            entity_id=protocol.id,
            action="protocol.step_reverted",
            actor_id=protocol.user_id,
            details={"from_step": current_step, "to_step": previous_step},
        )
        db.commit()
        db.refresh(protocol)
    return protocol


def build_review_summary(protocol: Protocol) -> ProtocolReviewSummary:
    manifest = load_manifest(protocol.module_id)
    step_keys = manifest["steps"]
    missing_by_step = [
        validate_step(step_key, protocol.payload or {}, manifest)
        for step_key in step_keys
        if step_key != "review"
    ]
    completed_steps = sum(1 for item in missing_by_step if item.is_complete)
    return ProtocolReviewSummary(
        is_ready_for_review=all(item.is_complete for item in missing_by_step),
        completed_steps=completed_steps,
        total_steps=len(missing_by_step),
        missing_by_step=missing_by_step,
    )


def build_protocol_response(protocol: Protocol) -> dict[str, Any]:
    manifest = load_manifest(protocol.module_id)
    steps: list[ProtocolStepDefinition] = get_step_definitions(manifest)
    return {
        "id": protocol.id,
        "user_id": protocol.user_id,
        "model_id": protocol.model_id,
        "module_id": protocol.module_id,
        "state": protocol.state,
        "current_step": protocol.current_step,
        "payload": protocol.payload or {},
        "created_at": protocol.created_at,
        "updated_at": protocol.updated_at,
        "steps": [step.model_dump() for step in steps],
        "current_step_definition": (
            get_step_definition(protocol.current_step, manifest).model_dump()
            if get_step_definition(protocol.current_step, manifest)
            else None
        ),
        "review_summary": build_review_summary(protocol).model_dump(),
    }
