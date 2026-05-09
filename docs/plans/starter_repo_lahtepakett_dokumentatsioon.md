Starter-repo lähtepakett ja ehitusetapi dokumentatsioon
Etapp: esimene töötav tehniline skeleton

# 1. Eesmärk
Selle etapi eesmärk on viia projekt kirjelduste tasandilt esimese käivituva koodibaasini. Tulemus ei ole veel valmis õpivahend, vaid tehniline vundament, mille peale saab hakata ehitama ametliku isiku läbivaatuse protokolli täitmise töövoogu, valideerimist, eksporti ja AI juhendavat kihti.
# 2. Valminud artefakt
ZIP-pakett: opivahend-starter-repo.zip
Sisu: monorepo skeleton, FastAPI API, Next.js web app, PostgreSQL docker-compose, Alembic algstruktuur, esimene moodulimanifest
Otstarve: käivitatav lähtepunkt arenduse alustamiseks ja järgmise production-etapi sisend
# 3. Repo struktuur
# 4. Selles etapis loodud põhifailid
README.md - käivitamise juhend ja peamised endpointid
pnpm-workspace.yaml - workspace jaotus
infra/docker-compose.yml - PostgreSQL teenus
apps/api/src/main.py - API entrypoint
apps/api/src/api/v1/router.py - peamine router
apps/api/src/core/database.py - SQLAlchemy ühendus
apps/api/src/db/models/user.py - kasutaja mudel
apps/api/src/db/models/protocol.py - protokolli mudel
apps/api/src/modules/protocol/* - protokolli loomine, sammude liikumine, manifesti laadimine
apps/api/alembic/versions/0001_init.py - esimene migratsioon
apps/web/app/page.tsx - minimaalne veebivaade
modules/isiku-labivaatus/manifest.json - esimese mooduli sammud
# 5. Mis juba töötab
GET /api/v1/health tervisekontroll
GET /api/v1/modules moodulimanifestide nimekiri
POST /api/v1/protocols uue protokolli loomine
GET /api/v1/protocols/{id} protokolli lugemine
POST /api/v1/protocols/{id}/next järgmise sammu leidmine manifesti põhjal
Frontendi alus, mis kontrollib API tööolekut
# 6. Teadlikud piirangud selles etapis
Autentimist ei ole veel rakendatud
Role-based access control on alles järgmise etapi töö
Protokolli payload on veel üldine JSON, mitte ametliku vormi detailne andmestruktuur
Valideerimine on minimaalne
DOCX/PDF eksport puudub
AI teenus puudub ja on veel ainult planeeritud
# 7. Definition of Done
Repo struktuur on olemas ja loogiliselt jaotatud
Andmebaasi teenus käivitub docker-compose abil
API käivitub ja health endpoint vastab
Alembic algstruktuur ja esimene migratsioon on olemas
Moodulimanifest laetakse failist
Protokolli current_step liigub manifesti järgi järgmisesse sammu
Frontend saab API tööolekut kuvada
# 8. Järgmine ehitusetapp
Järgmine etapp on production-taseme protokolli workflow. Selles tuleb ametliku isiku läbivaatuse protokolli väljad viia süsteemi detailseteks sammudeks ja valideerimisreegliteks, lisada autosave, auditilogid, rollid ning read-only lõppvaade. Alles pärast seda on mõistlik lisada AI juhendav kiht ja dokumendi eksport.
# 9. Soovitatud tööjärjekord järgmiseks etapiks
Täpsusta Protocol payload skeem ametliku vormi plokkide kaupa
Lisa users, roles, audit_logs ja model_assets seosed
Rakenda sammupõhine valideerimine
Rakenda autosave ja aktiivse protokolli kontroll
Lisa admin ja student õigused backendis
Ehita frontendis sammude navigeerimine ja veateadete kuvamine
Seejärel lisa DOCX/PDF eksport