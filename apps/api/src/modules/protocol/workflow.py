from datetime import datetime
from zoneinfo import ZoneInfo

from src.modules.protocol.schemas import ProtocolStepDefinition, StepValidationSummary


TALLINN_TZ = ZoneInfo("Europe/Tallinn")


def get_step_definitions(manifest: dict) -> list[ProtocolStepDefinition]:
    raw_steps = manifest.get("step_definitions", [])
    return [ProtocolStepDefinition.model_validate(step) for step in raw_steps]


def get_step_definition(step_key: str, manifest: dict) -> ProtocolStepDefinition | None:
    for step in get_step_definitions(manifest):
        if step.key == step_key:
            return step
    return None


def get_next_step(current_step: str, steps: list[str]) -> str | None:
    if current_step not in steps:
        return steps[0] if steps else None
    index = steps.index(current_step)
    return steps[index + 1] if index + 1 < len(steps) else None


def get_previous_step(current_step: str, steps: list[str]) -> str | None:
    if current_step not in steps:
        return None
    index = steps.index(current_step)
    return steps[index - 1] if index > 0 else None


def parse_datetime_local(value: str) -> datetime | None:
    normalized = value.strip()
    if not normalized:
        return None
    for parser in (
        lambda item: datetime.fromisoformat(item),
        lambda item: datetime.strptime(item, "%d.%m.%Y %H:%M"),
        lambda item: datetime.strptime(item, "%d/%m/%Y %H:%M"),
    ):
        try:
            return parser(normalized)
        except ValueError:
            continue
    return None


def parse_date(value: str) -> datetime | None:
    normalized = value.strip()
    if not normalized:
        return None
    for parser in (
        lambda item: datetime.fromisoformat(item),
        lambda item: datetime.strptime(item, "%Y-%m-%d"),
        lambda item: datetime.strptime(item, "%d.%m.%Y"),
        lambda item: datetime.strptime(item, "%d/%m/%Y"),
    ):
        try:
            return parser(normalized)
        except ValueError:
            continue
    return None


def parse_time(value: str) -> datetime | None:
    normalized = value.strip()
    if not normalized:
        return None
    for parser in ("%H:%M", "%H.%M"):
        try:
            return datetime.strptime(normalized, parser)
        except ValueError:
            continue
    return None


def parse_date_and_time(date_value: str, time_value: str) -> datetime | None:
    parsed_date = parse_date(date_value)
    parsed_time = parse_time(time_value)
    if parsed_date is None or parsed_time is None:
        return None
    return parsed_date.replace(
        hour=parsed_time.hour,
        minute=parsed_time.minute,
        second=0,
        microsecond=0,
    )


def add_validation_error(
    validation_errors: dict[str, list[str]],
    field_key: str,
    message: str,
) -> None:
    field_errors = validation_errors.setdefault(field_key, [])
    if message not in field_errors:
        field_errors.append(message)


def validate_step(step_key: str, payload: dict, manifest: dict) -> StepValidationSummary:
    definition = get_step_definition(step_key, manifest)
    if definition is None:
        return StepValidationSummary(step_key=step_key, is_complete=True, missing_fields=[])

    step_payload = payload.get(step_key, {})
    missing_fields: list[str] = []
    validation_errors: dict[str, list[str]] = {}
    now = datetime.now(TALLINN_TZ)

    for field in definition.fields:
        value = step_payload.get(field.key)
        normalized_value = value.strip() if isinstance(value, str) else value

        if field.required:
            if value is None:
                missing_fields.append(field.key)
                continue
            if isinstance(value, str) and not normalized_value:
                missing_fields.append(field.key)
                continue

        if value is None or (isinstance(value, str) and not normalized_value):
            continue

        if field.key == "action_date":
            action_time_value = step_payload.get("action_time")
            if action_time_value is None or (
                isinstance(action_time_value, str) and not action_time_value.strip()
            ):
                continue

            parsed_date = parse_date(str(value))
            parsed_time = parse_time(str(action_time_value))

            if parsed_date is not None and parsed_time is None:
                add_validation_error(
                    validation_errors,
                    "action_time",
                    "Sisesta kellaaeg 24h kujul tt:mm.",
                )
                continue

            parsed_action_moment = parse_date_and_time(str(value), str(action_time_value))
            if parsed_action_moment is None:
                add_validation_error(
                    validation_errors,
                    "action_time",
                    "Sisesta kellaaeg 24h kujul tt:mm.",
                )
            elif parsed_action_moment.replace(tzinfo=TALLINN_TZ) > now:
                add_validation_error(
                    validation_errors,
                    "action_time",
                    "Uurimistoimingu kellaaeg ei tohi koos valitud kuupaevaga olla tulevikus.",
                )

        for rule in field.validation_rules:
            if rule == "not_in_future_datetime":
                parsed = parse_datetime_local(str(value))
                if parsed is None:
                    add_validation_error(
                        validation_errors,
                        field.key,
                        "Sisesta kuupaev ja kellaaeg kujul pp.kk.aaaa tt:mm.",
                    )
                elif parsed.replace(tzinfo=TALLINN_TZ) > now:
                    add_validation_error(
                        validation_errors,
                        field.key,
                        "Vaartus ei tohi olla tulevikus.",
                    )
            elif rule == "not_in_future_date":
                parsed = parse_date(str(value))
                if parsed is None:
                    add_validation_error(
                        validation_errors,
                        field.key,
                        "Sisesta kuupaev kujul pp.kk.aaaa.",
                    )
                elif parsed.date() > now.date():
                    add_validation_error(
                        validation_errors,
                        field.key,
                        "Kuupaev ei tohi olla tulevikus.",
                    )

    return StepValidationSummary(
        step_key=step_key,
        is_complete=len(missing_fields) == 0 and len(validation_errors) == 0,
        missing_fields=missing_fields,
        validation_errors=validation_errors,
    )
