from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field


class ProtocolCreate(BaseModel):
    user_id: str = Field(..., description="Kasutaja ID")
    model_id: str = Field(..., description="3D mudeli ID")
    module_id: str = Field(default="isiku-labivaatus")


class StepField(BaseModel):
    key: str
    label: str
    type: str = "text"
    required: bool = False
    validation_rules: list[str] = Field(default_factory=list)


class ProtocolStepDefinition(BaseModel):
    key: str
    title: str
    description: str | None = None
    fields: list[StepField] = Field(default_factory=list)


class StepValidationSummary(BaseModel):
    step_key: str
    is_complete: bool
    missing_fields: list[str] = Field(default_factory=list)
    validation_errors: dict[str, list[str]] = Field(default_factory=dict)


class ProtocolStepUpdate(BaseModel):
    step_key: str
    values: dict[str, Any] = Field(default_factory=dict)
    autosave: bool = True


class ProtocolReviewSummary(BaseModel):
    is_ready_for_review: bool
    completed_steps: int
    total_steps: int
    missing_by_step: list[StepValidationSummary]


class ProtocolResponse(BaseModel):
    id: str
    user_id: str
    model_id: str
    module_id: str
    state: str
    current_step: str
    payload: dict[str, Any]
    created_at: datetime
    updated_at: datetime
    steps: list[ProtocolStepDefinition] = Field(default_factory=list)
    current_step_definition: ProtocolStepDefinition | None = None
    review_summary: ProtocolReviewSummary | None = None
