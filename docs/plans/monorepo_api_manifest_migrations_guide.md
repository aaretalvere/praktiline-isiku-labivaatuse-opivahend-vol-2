Monorepo bootstrap, API skeleton,
 mooduliregistri manifest ja migratsioonide algpakett
Detailne tehniline kirjeldus järgmise arendusfaasi käivitamiseks

# 1. Roll ja koht tervikplaanis
Need neli osa on esimene praktiline piir, kus dokumenteeritud arhitektuur muutub päris koodiks. Nende eesmärk ei ole veel valmis rakendus, vaid käivitatav alus, mille peale saab järjest lisada protokolli workflow, 3D-vaate, AI juhenduse ja hilisemad laiendused.
• Monorepo bootstrap loob ühise tööruumi, standardid, paketistruktuuri ja käivitusreeglid.
• API skeleton paneb paika päris teenusepiirid, route’id, DTO-d, valideerimiskihi ja moodulijaotuse.
• Mooduliregistri manifest kirjeldab, kuidas esimene õppemoodul laetakse süsteemi ilma äriloogikat koodi sisse kõvasti sidumata.
• Migratsioonide algpakett loob andmebaasi tuumobjektid ja relatsioonid.
# 2. Soovitatud tehnoloogiline baas

# 3. Monorepo bootstrap
Monorepo eesmärk on hoida kõik kriitilised osad ühes versioonihaldatud koodibaasis, kuid samas selgelt eraldatud. See teeb võimalikuks jagatud tüüpide, moodulimanifestide, validatsioonilepingute ja testide kasutamise nii frontendis, backendis kui ka tulevastes adapterites.
## 3.1. Repo juurkausta struktuur

repo/
apps/
web/
api/
worker/
| vr-client/ | # reserveeritud tulevikuks |
| --- | --- |
| packages/ |
| contracts/ |
| module-registry/ |
| ui/ |
| config/ |
| test-utils/ |
| modules/ |
| personal-inspection/ |
| infra/ |
| docker/ |
| ci/ |
| db/ |
| docs/ |
| architecture/ |
| api/ |
| modules/ |
| scripts/ |
| .github/workflows/ |
| package.json |
| pnpm-workspace.yaml |
| turbo.json |
| README.md |
| ## 3.2. Juurkausta failid |

## 3.3. Esmased workspace skriptid

{
"scripts": {
"dev": "turbo run dev --parallel",
"build": "turbo run build",
"lint": "turbo run lint",
"test": "turbo run test",
"typecheck": "turbo run typecheck",
"db:migrate": "pnpm --filter @app/api db:migrate",
"db:seed": "pnpm --filter @app/api db:seed"
}
}
## 3.4. Bootstrap-järjekord
• Loo repo ja workspace.
• Lisa apps/web ja apps/api minimaalsed käivitusprojektid.
• Lisa packages/contracts ja packages/module-registry.
• Lisa modules/personal-inspection esimese manifesti ja sisuplokkidega.
• Lisa infra/db andmebaasi docker-compose või lokaalsete ühenduste skriptid.
• Seadista CI vähemalt lint + test + build kontrolliga.
# 4. API skeleton
API skeleton peab olema piisavalt päris, et selle peale saaks kohe ehitada protokolli workflow, kuid samal ajal mitte veel liiga detailne. Selles etapis pannakse paika moodulijaotus, standardne request/response kuju, autentimine, error handling ja versioonitud route’id.
## 4.1. Apps/api sisemine jaotus

apps/api/
app/
main.py
core/
config.py
security.py
logging.py
errors.py
db/
session.py
base.py
migrations/
schemas/
common.py
routers/
health.py
auth.py
users.py
models.py
protocols.py
modules.py
ai.py
admin.py
services/
auth_service.py
protocol_service.py
workflow_service.py
module_service.py
document_service.py
repositories/
user_repository.py
protocol_repository.py
model_repository.py
module_repository.py
domain/
protocol/
module/
model3d/
audit/
tests/
## 4.2. API põhimoodulid

## 4.3. Route’ide versioonimine

/api/v1/health
/api/v1/auth/login
/api/v1/users/me
/api/v1/modules
/api/v1/modules/{module_key}
/api/v1/models
/api/v1/models/{model_id}
/api/v1/protocols
/api/v1/protocols/{protocol_id}
/api/v1/protocols/{protocol_id}/resume
/api/v1/protocols/{protocol_id}/steps/{step_key}
/api/v1/protocols/{protocol_id}/submit
/api/v1/protocols/{protocol_id}/copy
/api/v1/admin/users
/api/v1/admin/logs
/api/v1/ai/assist
## 4.4. Standardne response-kuju

{
"data": { ... },
"meta": {
"request_id": "uuid",
"version": "v1"
},
"errors": []
}
Vigade korral jääb data tühjaks või puudub ning errors plokk sisaldab masinloetavaid koode.
## 4.5. DTO-de ja skeemide põhimõte
• Igal route’il on eraldi request ja response schema.
• Workflow sammude jaoks kasutatakse module_key + step_key põhist payload validatsiooni.
• Contracts pakett hoiab ühiseid enum’e: role, protocol_state, model_state, module_type.
• Backend ei usalda frontendi poolt saadetud sammuseisundeid ilma serveripoolse kontrollita.
## 4.6. Skeletoni näidisroute

@router.post("/protocols")
def create_protocol(payload: CreateProtocolRequest, user=Depends(get_current_user)):
# 1. kontrolli aktiivset protokolli
# 2. kontrolli module_key ja model_id
# 3. loo protocol instance olekuga draft
# 4. tagasta protocol + järgmine samm
...
# 5. Mooduliregistri esimene manifest
Mooduliregister on platvormi laiendatavuse tuum. Selle eesmärk on kirjeldada, milline õppemoodul süsteemis olemas on, milliseid rolle see toetab, milline on workflow, millised 3D-varad on lubatud ja millised AI ning valideerimisreeglid selle mooduli juurde kuuluvad.
## 5.1. Registri asukoht

packages/module-registry/
src/
index.ts
types.ts
loaders/
manifests/
personal-inspection.v1.json
## 5.2. Manifesti kohustuslikud plokid

## 5.3. Näidismanifest: personal-inspection.v1.json

{
"module": {
"key": "personal-inspection",
"name": "Isiku läbivaatuse õppemoodul",
"version": "1.0.0",
"status": "active"
},
"roles": ["student", "admin"],
"workflow": {
"protocol_template_key": "personal-inspection-protocol-v1",
"active_protocol_states": ["draft", "in_progress"],
"steps": [
{"key": "select-model", "type": "system"},
{"key": "case-metadata", "type": "form"},
{"key": "officer", "type": "form"},
{"key": "person", "type": "form"},
{"key": "participants", "type": "form"},
{"key": "translator", "type": "conditional"},
{"key": "equipment", "type": "conditional"},
{"key": "trace-description", "type": "text"},
{"key": "distinctive-features", "type": "text"},
{"key": "objects", "type": "text"},
{"key": "remarks", "type": "form"},
{"key": "attachments", "type": "form"},
{"key": "final-details", "type": "form"},
{"key": "review", "type": "system"},
{"key": "submit", "type": "system"}
]
},
"validation": {
"person": {
"required": ["name", "procedure_status", "identity_verification_basis"],
"at_least_one_of": ["personal_id_code", "birth_date"]
}
}
}
## 5.4. Miks manifest on parem kui kõva kood
• Saab lisada uue õppemooduli ilma workflow mootorit ümber kirjutamata.
• Sama engine saab teenindada nii süüteomenetluse, vanglateenistuse kui korrakaitse mooduleid.
• VR või muu liides saab laadida sama mooduli metaandmed, kuid kasutada teist esitluskihti.

# 6. Andmebaasi migratsioonide algpakett
Migratsioonide algpakett loob süsteemi tuumandmemudeli. Eesmärk ei ole kohe katta kõiki tulevasi laiendusi, vaid panna paika need tabelid, mille peale saab kohe ehitada autentimise, mooduliregistri, 3D mudelite loetelu, protokollid ja auditilogi.
## 6.1. Infra/db struktuur

infra/db/
alembic.ini
env.py
versions/
0001_initial_core.py
0002_module_registry.py
0003_protocol_steps.py
seeds/
seed_roles.sql
seed_module_personal_inspection.sql
## 6.2. Esmased tabelid

## 6.3. Algmigratsioonide järjekord
• 0001_initial_core: users, roles, user_roles, audit_logs
• 0002_module_registry: learning_modules, protocol_templates
• 0003_protocol_assets: asset_3d, protocol_instances, protocol_step_data, attachments
• 0004_seed_support: baasrollid ja esimese mooduli register
## 6.4. Skeleton SQLAlchemy mudelite põhimõte

class ProtocolInstance(Base):
__tablename__ = "protocol_instances"

id = Column(UUID, primary_key=True)
user_id = Column(UUID, ForeignKey("users.id"), nullable=False)
module_id = Column(UUID, ForeignKey("learning_modules.id"), nullable=False)
model_id = Column(UUID, ForeignKey("asset_3d.id"), nullable=False)
state = Column(String, nullable=False, default="draft")
current_step_key = Column(String, nullable=True)
is_active = Column(Boolean, nullable=False, default=True)
## 6.5. Seemned ja algandmed
• roles: student, admin
• learning_modules: personal-inspection
• protocol_templates: personal-inspection-protocol-v1
• vajadusel demo 3D mudelid arenduskeskkonna jaoks
# 7. Koodi alustamise tegelik järjekord

# 8. Definition of Done iga osa jaoks
• Monorepo bootstrap on valmis siis, kui üks käsk käivitab lokaalselt web + api teenuse.
• API skeleton on valmis siis, kui route’id, DTO-d, auth middleware ja veastandard on olemas.
• Mooduliregistri esimene manifest on valmis siis, kui backend suudab selle laadida ja sellest workflow alginfot tagastada.
• Migratsioonide algpakett on valmis siis, kui tühi andmebaas saab ühe käsuga skeemi ja seemned.
# 9. Mida mitte teha selles faasis
• Ära vii kogu workflow loogikat frontendi komponentidesse.
• Ära seo AI assistenti otse andmebaasikirjutusega.
• Ära ehita vanglateenistuse või VR laiendusi enne, kui mooduliregister ja workflow tuum töötavad.
• Ära eelda, et üks JSON blob asendab relatsioonilist andmemudelit kõikides kohtades.
# 10. Järgmine praktiline samm pärast seda dokumenti
Kui need neli osa on kinnitatud, on kõige mõistlikum edasi teha juba päris lähtekoodi lähtepakett: repo bootstrap failid, apps/api minimaalsed route’id, esimene manifestifail ja Alembic migratsioonid. See on esimene koht, kus dokumentatsioonist saab käivitatav projekt.