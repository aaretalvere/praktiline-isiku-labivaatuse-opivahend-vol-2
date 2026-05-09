Arendusfaas: Esimene töötav koodibaas (Foundation Build)
# Eesmärk
Luua süsteemi esimene töötav versioon, mis sisaldab monorepo struktuuri, backend API skeletonit, andmebaasi, workflow loogikat ja minimaalset frontendit.
# Monorepo struktuur
/apps (web, api, worker)
/packages (shared)
/modules (õppemoodulid)
/infra (docker)
/docs
/scripts
# Backend API
FastAPI põhine teenus, millel on versioonitud API (/api/v1), moodulipõhine struktuur ja eraldi routerid.
# Andmebaas
PostgreSQL + SQLAlchemy. Esimesed tabelid: users, protocols. Migratsioonid Alembicu abil.
# Mooduliregister
JSON manifest, mis kirjeldab õppemooduli samme ja loogikat. Esimene moodul: isiku läbivaatuse protokoll.
# Workflow engine
Lihtne sammude liikumise loogika: current_step → next_step. Tugineb moodulimanifestile.
# Frontend
Next.js skeleton, mis kuvab protokolli sammud ja suhtleb backendiga.
# AI integratsioon
Esialgu placeholder endpoint. AI lisatakse hiljem juhendava kihina.
# Definition of Done
API töötab, DB töötab, protokoll luuakse, sammud vahetuvad, frontend kuvab andmeid.
# Järgmine etapp
Valideerimine, täielik protokolli vorm, autosave, AI agent, dokumentide eksport.