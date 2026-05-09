const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api/v1";

export class ApiError extends Error {
  detailData?: unknown;

  constructor(message: string, detailData?: unknown) {
    super(message);
    this.name = "ApiError";
    this.detailData = detailData;
  }
}

export type ModuleField = {
  key: string;
  label: string;
  type: string;
  required: boolean;
};

export type ProtocolStepDefinition = {
  key: string;
  title: string;
  description?: string | null;
  fields: ModuleField[];
};

export type StepValidationSummary = {
  step_key: string;
  is_complete: boolean;
  missing_fields: string[];
  validation_errors: Record<string, string[]>;
};

export type ProtocolReviewSummary = {
  is_ready_for_review: boolean;
  completed_steps: number;
  total_steps: number;
  missing_by_step: StepValidationSummary[];
};

export type ProtocolResponse = {
  id: string;
  user_id: string;
  model_id: string;
  module_id: string;
  state: string;
  current_step: string;
  payload: Record<string, Record<string, string>>;
  created_at: string;
  updated_at: string;
  steps: ProtocolStepDefinition[];
  current_step_definition: ProtocolStepDefinition | null;
  review_summary: ProtocolReviewSummary | null;
};

export type ModuleManifest = {
  id: string;
  name: string;
  description?: string;
  steps: string[];
};

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    const responseText = await response.text();
    let detailMessage: string | null = null;
    let detailData: unknown = undefined;

    if (responseText) {
      try {
        const parsed = JSON.parse(responseText) as {
          detail?: string | { message?: string; field_errors?: Record<string, string[]> };
        };
        detailData = parsed.detail;
        detailMessage =
          typeof parsed.detail === "string"
            ? parsed.detail
            : parsed.detail?.message ?? responseText;
      } catch {
        detailMessage = responseText;
      }
    }

    throw new ApiError(detailMessage || `Request failed with ${response.status}`, detailData);
  }

  return response.json() as Promise<T>;
}

export async function getHealth() {
  return apiFetch<{ status: string }>("/health");
}

export async function getModules() {
  return apiFetch<{ items: ModuleManifest[] }>("/modules");
}

export async function createProtocol(payload: {
  user_id: string;
  model_id: string;
  module_id: string;
}) {
  return apiFetch<ProtocolResponse>("/protocols", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function saveProtocolStep(
  protocolId: string,
  payload: {
    step_key: string;
    values: Record<string, string>;
    autosave?: boolean;
  },
) {
  return apiFetch<ProtocolResponse>(`/protocols/${protocolId}/steps`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function nextProtocolStep(protocolId: string) {
  return apiFetch<ProtocolResponse>(`/protocols/${protocolId}/next`, {
    method: "POST",
  });
}

export async function previousProtocolStep(protocolId: string) {
  return apiFetch<ProtocolResponse>(`/protocols/${protocolId}/previous`, {
    method: "POST",
  });
}
