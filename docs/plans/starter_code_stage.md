Starter-koodi lähtepakett (Stage: Code Initialization)
# Eesmärk
Luua esmane töötav koodibaas, mis sisaldab monorepo struktuuri, API skeletonit, andmebaasi ühendust ja moodulimanifesti laadimist.
# Monorepo bootstrap
Luua kaustastruktuur: apps/, packages/, modules/, infra/. Seadistada pnpm workspace.
# API skeleton
Luua FastAPI projekt, lisada /health endpoint ja versioonitud router /api/v1.
# Andmebaasi ühendus
Seadistada PostgreSQL ühendus SQLAlchemy kaudu ning testida ühendust.
# Migratsioonid
Algatada Alembic, luua esimene migratsioon users ja protocols tabelitega.
# Moodulimanifest
Luua JSON fail modules/isiku-labivaatus/manifest.json ning loader backendis.
# Workflow core
Rakendada lihtne sammude liikumine manifesti põhjal.
# Frontend skeleton
Luua Next.js app ja testida API ühendust.
# Definition of Done
API töötab, DB ühendus olemas, migratsioonid tehtud, manifest laeb, üks workflow samm töötab.