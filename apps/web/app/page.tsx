"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, CSSProperties, FormEvent, ReactNode } from "react";

import {
  ApiError,
  createProtocol,
  getHealth,
  getModules,
  nextProtocolStep,
  previousProtocolStep,
  saveProtocolStep,
} from "../lib/api";
import type { ModuleManifest, ProtocolResponse } from "../lib/api";

const defaultUserId = "demo-user-1";
const defaultModelId = "demo-model-1";

type ProtocolPayload = Record<string, Record<string, string>>;

const cardStyle: CSSProperties = {
  border: "1px solid #d8dee9",
  borderRadius: 8,
  padding: 20,
  background: "#ffffff",
  boxShadow: "0 12px 40px rgba(15, 23, 42, 0.08)",
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #cbd5e1",
  marginTop: 6,
};

function getDisplayInputType(fieldType: string) {
  if (fieldType === "date" || fieldType === "time") {
    return "text";
  }
  return fieldType;
}

function getPlaceholder(fieldType: string) {
  if (fieldType === "date") {
    return "pp.kk.aaaa";
  }
  if (fieldType === "time") {
    return "tt:mm";
  }
  return undefined;
}

function getStepValue(
  payload: ProtocolPayload,
  stepKey: string,
  fieldKey: string,
  fallback = "",
) {
  const value = payload[stepKey]?.[fieldKey];
  return value?.trim() ? value : fallback;
}

function PreviewValue({ children }: { children: ReactNode }) {
  const isEmpty = children === "" || children === null || children === undefined;
  return (
    <span style={isEmpty ? emptyPreviewValueStyle : undefined}>
      {isEmpty ? "täitmata" : children}
    </span>
  );
}

function PreviewLine({ label, children }: { label: string; children: ReactNode }) {
  return (
    <p style={previewLineStyle}>
      <strong>{label}</strong> <PreviewValue>{children}</PreviewValue>
    </p>
  );
}

function ProtocolPreview({ protocol, liveValues }: { protocol: ProtocolResponse | null; liveValues: Record<string, string> }) {
  const payload: ProtocolPayload = protocol
    ? {
        ...protocol.payload,
        [protocol.current_step]: liveValues,
      }
    : {};

  const location = getStepValue(payload, "protocol_meta", "location");
  const actionDate = getStepValue(payload, "protocol_meta", "action_date");
  const actionTime = getStepValue(payload, "protocol_meta", "action_time");
  const officerRole = getStepValue(payload, "author", "officer_role");
  const officerName = getStepValue(payload, "author", "officer_name");
  const personName = getStepValue(payload, "person", "person_name");
  const personIdCode = getStepValue(payload, "person", "person_id_code");
  const birthDate = getStepValue(payload, "person", "birth_date");

  return (
    <section style={{ ...cardStyle, minHeight: 640 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "start" }}>
        <div>
          <h2 style={{ marginTop: 0, marginBottom: 6 }}>Protokolli eelvaade</h2>
          <p style={{ margin: 0, color: "#64748b", lineHeight: 1.5 }}>
            Lisa 56 ametliku vormi järgi koostatud töövaade.
          </p>
        </div>
        <span style={previewBadgeStyle}>mustand</span>
      </div>

      <article style={documentPreviewStyle}>
        <div style={{ borderBottom: "1px solid #cbd5e1", paddingBottom: 12, marginBottom: 18 }}>
          <p style={{ ...previewLineStyle, textTransform: "uppercase", letterSpacing: 0.8 }}>
            Asutusesiseseks kasutamiseks
          </p>
          <PreviewLine label="Märge tehtud:">jpp algus</PreviewLine>
          <PreviewLine label="Juurdepääsupiirang kehtib kuni:">kehtib kuni</PreviewLine>
          <PreviewLine label="Alus:">AvTS § 35 lg 1 p 1, 12</PreviewLine>
          <PreviewLine label="Teabevaldaja:">MENETLEJA</PreviewLine>
        </div>

        <h3 style={documentTitleStyle}>Isiku läbivaatuse protokoll</h3>
        <PreviewLine label="kriminaalasjas nr">{getStepValue(payload, "protocol_meta", "case_number")}</PreviewLine>
        <p style={previewLineStyle}>
          <PreviewValue>{actionDate}</PreviewValue>{", "}<PreviewValue>{location}</PreviewValue>
        </p>
        <PreviewLine label="Uurimistoimingu algus:">{actionTime ? `kell ${actionTime}` : ""}</PreviewLine>

        <p style={previewParagraphStyle}>
          <PreviewValue>{[officerRole, officerName].filter(Boolean).join(" ")}</PreviewValue>
          {" juhindudes KrMS §dest 83, 88 ja 146, teostas isiku läbivaatuse:"}
        </p>

        <PreviewLine label="Isiku nimi:">
          {[personName, personIdCode, birthDate].filter(Boolean).join(", ")}
        </PreviewLine>
        <PreviewLine label="Uurimistoimingus osaleb:">
          {getStepValue(payload, "participants", "participants_present")}
        </PreviewLine>
        <PreviewLine label="Uurimistoimingus osaleb tõlk">
          {getStepValue(payload, "translator", "translator_used")}
        </PreviewLine>
        <div style={signatureLineStyle}>________________________</div>
        <p style={{ ...previewLineStyle, textAlign: "center" }}>(tõlgi allkiri)</p>

        <PreviewLine label="Kasutatud tehnikavahendid:">
          {getStepValue(payload, "tools", "tools_used")}
        </PreviewLine>

        <h4 style={sectionTitleStyle}>Läbivaatusega tuvastati:</h4>
        <PreviewLine label="Kuriteojälgede kirjeldus:">
          {getStepValue(payload, "crime_traces", "crime_traces_found")}
        </PreviewLine>
        <PreviewLine label="Eritunnuste kirjeldus:">
          {getStepValue(payload, "special_features", "special_features")}
        </PreviewLine>
        <PreviewLine label="Avastatud objektid:">
          {getStepValue(payload, "objects", "objects_found")}
        </PreviewLine>
        <PreviewLine label="Märkused protokolli kohta:">
          {getStepValue(payload, "notes", "notes")}
        </PreviewLine>
        <PreviewLine label="Protokolli lisad:">
          {getStepValue(payload, "attachments", "attachments")}
        </PreviewLine>

        <p style={previewParagraphStyle}>
          Uurimistoimingus osalejaile (välja arvatud kahtlustatavale) on selgitatud, et vastavalt KrMS § 214 võib kohtueelse menetluse andmeid avaldada üksnes prokuratuuri loal ja tema määratud ulatuses.
        </p>
        <p style={previewParagraphStyle}>
          Kaitsja on kohustatud hoidma saladuses talle kriminaalmenetluse käigus õigusabi andmisel teatavaks saanud andmeid.
        </p>

        <PreviewLine label="Uurimistoimingu lõpp:">{getStepValue(payload, "protocol_meta", "end_time")}</PreviewLine>
        <div style={signaturesGridStyle}>
          <span>koostaja nimi</span>
          <span>tõlgi nimi</span>
          <span>läbivaadatud isiku nimi</span>
          <span>kohtuarsti nimi</span>
        </div>
        <p style={previewParagraphStyle}>
          Uurimistoimingust osa võtnud menetlusseisund ja nimi keeldus protokollile alla kirjutamast, sest märgitakse keeldumise põhjus.
        </p>
        <PreviewLine label="Koostaja:">{officerName}</PreviewLine>
      </article>
    </section>
  );
}

export default function HomePage() {
  const [health, setHealth] = useState("checking");
  const [modules, setModules] = useState<ModuleManifest[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState("isiku-labivaatus");
  const [userId, setUserId] = useState(defaultUserId);
  const [modelId, setModelId] = useState(defaultModelId);
  const [protocol, setProtocol] = useState<ProtocolResponse | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [error, setError] = useState<string | null>(null);
  const [busyAction, setBusyAction] = useState<string | null>(null);

  useEffect(() => {
    async function loadInitialData() {
      try {
        const [healthResult, modulesResult] = await Promise.all([getHealth(), getModules()]);
        setHealth(healthResult.status);
        setModules(modulesResult.items);
        if (modulesResult.items[0]?.id) {
          setSelectedModuleId(modulesResult.items[0].id);
        }
      } catch (loadError) {
        setHealth("offline");
        setError(loadError instanceof Error ? loadError.message : "Initial load failed");
      }
    }

    void loadInitialData();
  }, []);

  useEffect(() => {
    const stepKey = protocol?.current_step;
    if (!protocol || !stepKey) {
      setFormValues({});
      return;
    }
    setFormValues(protocol.payload[stepKey] ?? {});
  }, [protocol]);

  async function withBusyState(action: string, callback: () => Promise<void>) {
    setBusyAction(action);
    setError(null);
    try {
      await callback();
    } catch (actionError) {
      if (
        actionError instanceof ApiError &&
        actionError.detailData &&
        typeof actionError.detailData === "object" &&
        "field_errors" in actionError.detailData
      ) {
        const validationDetail = actionError.detailData as {
          field_errors?: Record<string, string[]>;
        };
        setFieldErrors(validationDetail.field_errors ?? {});
      }
      setError(actionError instanceof Error ? actionError.message : "Unexpected error");
    } finally {
      setBusyAction(null);
    }
  }

  async function handleCreateProtocol(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await withBusyState("create", async () => {
      const created = await createProtocol({
        user_id: userId,
        model_id: modelId,
        module_id: selectedModuleId,
      });
      setFieldErrors({});
      setProtocol(created);
    });
  }

  async function handleSaveStep() {
    if (!protocol) {
      return;
    }
    await withBusyState("save", async () => {
      const saved = await saveProtocolStep(protocol.id, {
        step_key: protocol.current_step,
        values: formValues,
        autosave: true,
      });
      setFieldErrors({});
      setProtocol(saved);
    });
  }

  async function handleNextStep() {
    if (!protocol) {
      return;
    }
    await withBusyState("next", async () => {
      const saved = await saveProtocolStep(protocol.id, {
        step_key: protocol.current_step,
        values: formValues,
        autosave: true,
      });
      setFieldErrors({});
      setProtocol(saved);
      const next = await nextProtocolStep(saved.id);
      setProtocol(next);
    });
  }

  async function handlePreviousStep() {
    if (!protocol) {
      return;
    }
    await withBusyState("previous", async () => {
      const previous = await previousProtocolStep(protocol.id);
      setFieldErrors({});
      setProtocol(previous);
    });
  }

  const currentStep = protocol?.current_step_definition;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #eef6ff 0%, #f8fafc 45%, #ffffff 100%)",
        color: "#0f172a",
        padding: "32px 20px 48px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1380, margin: "0 auto", display: "grid", gap: 20 }}>
        <section style={{ ...cardStyle, background: "#0f172a", color: "#f8fafc" }}>
          <p style={{ margin: 0, opacity: 0.75, letterSpacing: 1.2, textTransform: "uppercase" }}>
            Praktiline õppelahendus
          </p>
          <h1 style={{ margin: "10px 0 8px", fontSize: 38 }}>
            Isiku läbivaatuse protokolli esimene töövoog
          </h1>
          <p style={{ margin: 0, maxWidth: 760, lineHeight: 1.6, color: "#cbd5e1" }}>
            See vaade lubab luua protokolli, täita sammud, liikuda töövoos edasi-tagasi ja vaadata üle, kuidas sisestatud andmed ametliku vormi loogikas paiknevad.
          </p>
        </section>

        <section style={{ display: "grid", gap: 20, gridTemplateColumns: "minmax(300px, 0.75fr) minmax(420px, 1fr) minmax(460px, 1.1fr)", alignItems: "start" }}>
          <div style={{ display: "grid", gap: 20 }}>
            <section style={cardStyle}>
              <h2 style={{ marginTop: 0 }}>Keskkonna seis</h2>
              <p style={{ marginBottom: 4 }}>
                API tervis: <strong>{health}</strong>
              </p>
              <p style={{ margin: 0 }}>Leitud mooduleid: {modules.length}</p>
            </section>

            <section style={cardStyle}>
              <h2 style={{ marginTop: 0 }}>Alusta uut protokolli</h2>
              <form onSubmit={handleCreateProtocol} style={{ display: "grid", gap: 14 }}>
                <label>
                  Moodul
                  <select
                    value={selectedModuleId}
                    onChange={(event) => setSelectedModuleId(event.target.value)}
                    style={inputStyle}
                  >
                    {modules.map((moduleItem) => (
                      <option key={moduleItem.id} value={moduleItem.id}>
                        {moduleItem.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Demo kasutaja ID
                  <input
                    value={userId}
                    onChange={(event) => setUserId(event.target.value)}
                    style={inputStyle}
                  />
                </label>

                <label>
                  3D mudeli ID
                  <input
                    value={modelId}
                    onChange={(event) => setModelId(event.target.value)}
                    style={inputStyle}
                  />
                </label>

                <button type="submit" disabled={busyAction !== null} style={primaryButtonStyle}>
                  {busyAction === "create" ? "Loon protokolli..." : "Loo protokoll"}
                </button>
              </form>
            </section>

            <section style={cardStyle}>
              <h2 style={{ marginTop: 0 }}>Review kokkuvõte</h2>
              {!protocol?.review_summary ? (
                <p style={{ margin: 0 }}>Kokkuvõte ilmub pärast protokolli loomist.</p>
              ) : (
                <div style={{ display: "grid", gap: 10 }}>
                  <p style={{ margin: 0 }}>
                    Valmis review&apos;ks:{" "}
                    <strong>{protocol.review_summary.is_ready_for_review ? "jah" : "veel mitte"}</strong>
                  </p>
                  <p style={{ margin: 0 }}>
                    Valmis samme: {protocol.review_summary.completed_steps}/{protocol.review_summary.total_steps}
                  </p>
                  {protocol.review_summary.missing_by_step.map((stepSummary) => (
                    <div
                      key={stepSummary.step_key}
                      style={{
                        borderRadius: 8,
                        padding: 12,
                        background: stepSummary.is_complete ? "#ecfdf5" : "#fff7ed",
                      }}
                    >
                      <strong>{stepSummary.step_key}</strong>
                      <div style={{ marginTop: 4 }}>
                        {stepSummary.is_complete
                          ? "Samm on täidetud."
                          : [
                              stepSummary.missing_fields.length
                                ? `Puudub: ${stepSummary.missing_fields.join(", ")}`
                                : null,
                              ...Object.entries(stepSummary.validation_errors).map(
                                ([fieldKey, messages]) => `${fieldKey}: ${messages.join(" ")}`,
                              ),
                            ]
                              .filter(Boolean)
                              .join(" | ")}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <section style={{ ...cardStyle, minHeight: 640 }}>
            <h2 style={{ marginTop: 0 }}>Aktiivne protokoll</h2>
            {!protocol || !currentStep ? (
              <p style={{ margin: 0 }}>
                Loo vasakul uus protokoll. Seejärel saad sammud läbi teha otse siit vaatest.
              </p>
            ) : (
              <div style={{ display: "grid", gap: 18 }}>
                <div style={{ borderRadius: 8, padding: 16, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <p style={{ margin: 0 }}>
                    <strong>Protokoll:</strong> {protocol.id}
                  </p>
                  <p style={{ margin: "8px 0 0" }}>
                    <strong>Staatus:</strong> {protocol.state}
                  </p>
                  <p style={{ margin: "8px 0 0" }}>
                    <strong>Aktiivne samm:</strong> {currentStep.title} ({protocol.current_step})
                  </p>
                </div>

                <div>
                  <h3 style={{ marginBottom: 6 }}>{currentStep.title}</h3>
                  <p style={{ marginTop: 0, color: "#475569" }}>{currentStep.description}</p>
                </div>

                <div style={{ display: "grid", gap: 14 }}>
                  {currentStep.fields.length === 0 ? (
                    <div style={{ borderRadius: 8, padding: 14, background: "#eff6ff", color: "#1d4ed8" }}>
                      Sellel sammul ei ole eraldi välju. Kasuta review kokkuvõtet ja liigu edasi või tagasi.
                    </div>
                  ) : (
                    currentStep.fields.map((field) => {
                      const commonProps = {
                        value: formValues[field.key] ?? "",
                        onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                          const nextValue = event.target.value;
                          setFormValues((current) => ({ ...current, [field.key]: nextValue }));
                          setFieldErrors((current) => {
                            if (!(field.key in current)) {
                              return current;
                            }
                            const nextErrors = { ...current };
                            delete nextErrors[field.key];
                            return nextErrors;
                          });
                        },
                        style: {
                          ...inputStyle,
                          borderColor: fieldErrors[field.key] ? "#dc2626" : "#cbd5e1",
                          background: fieldErrors[field.key] ? "#fef2f2" : "#ffffff",
                        },
                        placeholder: getPlaceholder(field.type),
                      };

                      return (
                        <label key={field.key}>
                          {field.label}
                          {field.required ? " *" : ""}
                          {field.type === "textarea" ? (
                            <textarea rows={4} {...commonProps} />
                          ) : (
                            <input type={getDisplayInputType(field.type)} {...commonProps} />
                          )}
                          {fieldErrors[field.key]?.length ? (
                            <div style={{ marginTop: 6, color: "#b91c1c", fontSize: 14 }}>
                              {fieldErrors[field.key].join(" ")}
                            </div>
                          ) : null}
                        </label>
                      );
                    })
                  )}
                </div>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button type="button" onClick={handlePreviousStep} disabled={busyAction !== null} style={secondaryButtonStyle}>
                    {busyAction === "previous" ? "Liigun tagasi..." : "Eelmine samm"}
                  </button>
                  <button type="button" onClick={handleSaveStep} disabled={busyAction !== null} style={secondaryButtonStyle}>
                    {busyAction === "save" ? "Salvestan..." : "Salvesta samm"}
                  </button>
                  <button type="button" onClick={handleNextStep} disabled={busyAction !== null} style={primaryButtonStyle}>
                    {busyAction === "next" ? "Liigun edasi..." : "Järgmine samm"}
                  </button>
                </div>

                {error ? (
                  <div style={{ borderRadius: 8, padding: 14, background: "#fef2f2", color: "#b91c1c" }}>
                    {error}
                  </div>
                ) : null}
              </div>
            )}
          </section>

          <ProtocolPreview protocol={protocol} liveValues={formValues} />
        </section>
      </div>
    </main>
  );
}

const primaryButtonStyle: CSSProperties = {
  border: 0,
  borderRadius: 8,
  padding: "12px 18px",
  background: "#0f766e",
  color: "#ffffff",
  cursor: "pointer",
  fontWeight: 600,
};

const secondaryButtonStyle: CSSProperties = {
  ...primaryButtonStyle,
  background: "#e2e8f0",
  color: "#0f172a",
};

const previewBadgeStyle: CSSProperties = {
  borderRadius: 8,
  border: "1px solid #cbd5e1",
  padding: "4px 8px",
  color: "#475569",
  fontSize: 13,
  textTransform: "uppercase",
};

const documentPreviewStyle: CSSProperties = {
  marginTop: 18,
  padding: 22,
  border: "1px solid #cbd5e1",
  borderRadius: 8,
  background: "#fffdf7",
  color: "#111827",
  fontFamily: "Georgia, 'Times New Roman', serif",
  lineHeight: 1.55,
};

const documentTitleStyle: CSSProperties = {
  margin: "0 0 14px",
  textAlign: "center",
  fontSize: 22,
};

const sectionTitleStyle: CSSProperties = {
  margin: "20px 0 8px",
  fontSize: 16,
};

const previewLineStyle: CSSProperties = {
  margin: "0 0 8px",
};

const previewParagraphStyle: CSSProperties = {
  margin: "14px 0",
};

const emptyPreviewValueStyle: CSSProperties = {
  color: "#94a3b8",
  fontStyle: "italic",
};

const signatureLineStyle: CSSProperties = {
  margin: "16px auto 4px",
  maxWidth: 220,
  textAlign: "center",
};

const signaturesGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 8,
  margin: "18px 0",
  color: "#475569",
  fontSize: 14,
};
