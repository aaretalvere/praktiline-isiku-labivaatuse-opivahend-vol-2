# Laptopi paigaldusnõuded arenduseks

## Projekti lühikirjeldus

See projekt on praktilise isiku läbivaatuse õppelahendus, mille eesmärk on toetada ametliku protokolli juhitud täitmist digitaalses vormis. Tehniliselt on see laiendatav õppemoodulite platvorm, kus:

- `web` on kasutajaliides õppijale ja hiljem ka adminile ning õpetajale
- `api` haldab workflow'd, valideerimist, andmeid ja eksporti
- backend on peamine tõeallikas
- AI on juhendav kiht, mitte äriloogika asendaja
- lahendus peab olema hiljem laiendatav uute õppemoodulite, rollide ja liidestega

Praegune koodibaas kasutab:

- `Next.js` + `React` frontendi jaoks
- `FastAPI` + `SQLAlchemy` + `Alembic` backendi jaoks
- `PostgreSQL` andmebaasina
- `Docker Compose` kohaliku infrastruktuuri käivitamiseks

## Vajalik tarkvara

Allolev tarkvara peaks olema arendaja laptopis paigaldatud enne projekti käivitamist.

### 1. Git

Eesmärk: versioonihaldus ja repo kloonimine.

Soovitus:
- installida viimane stabiilne `Git for Windows`

### 2. Node.js LTS

Eesmärk: Next.js frontendi käivitamine, paketihaldus ja build.

Nõue:
- `Node.js LTS`
- `npm` tuleb Node paigaldusega kaasa

Soovituslik versioon:
- `Node 22 LTS` või uuem toetatud LTS haru

### 3. Python

Eesmärk: FastAPI backendi käivitamine, virtuaalkeskkond, migratsioonid ja arendustööriistad.

Nõue:
- `Python 3.12` või `Python 3.13`

Oluline:
- Python peab olema reaalselt paigaldatud, mitte ainult Windows Store'i stub
- `python` käsk peab toimima terminalis

### 4. PostgreSQL või Dockeri kaudu andmebaas

Eesmärk: rakenduse püsivad andmed.

Valikud:
- eelistatud: `Docker Desktop`, millega käivitatakse andmebaas `docker compose` abil
- alternatiiv: lokaalselt paigaldatud `PostgreSQL`

Soovitus:
- standardse arenduse jaoks kasutada `Docker Desktop` varianti

### 5. Docker Desktop

Eesmärk: kohaliku infrastruktuuri, eriti andmebaasi, lihtne käivitamine.

Nõue:
- `Docker Desktop` Windowsile
- `docker` ja `docker compose` peavad terminalis töötama

### 6. Koodiredaktor

Eesmärk: mugav arendustöö.

Soovitus:
- `Visual Studio Code`

Soovituslikud lisad:
- Python
- Pylance
- ESLint
- Prettier
- Docker

## Soovituslik lisatarkvara

Need ei ole alati kohustuslikud, aga teevad arenduse lihtsamaks.

### 1. Postman või Bruno

Eesmärk: API endpointide testimine.

### 2. pgAdmin või DBeaver

Eesmärk: PostgreSQL andmebaasi vaatamine ja kontroll.

### 3. pnpm

Eesmärk: monorepo paketihaldus, kui otsustame `pnpm-workspace.yaml` aktiivselt kasutusele võtta.

Märge:
- praegu saab frontendi ka `npm` abil käivitada
- tulevikus võime standardiseerida `pnpm` peale

## Miinimumnimekiri, milleta projekt ei käivitu

Kui eesmärk on ainult projekt lokaalselt käima saada, siis minimaalselt on vaja:

1. `Git`
2. `Node.js LTS`
3. `Python 3.12+`
4. `Docker Desktop`

## Kontrollnimekiri IT meeskonnale

Pärast paigaldust peaks arendaja masinas töötama järgmised käsud:

```powershell
git --version
node -v
npm -v
python --version
docker --version
docker compose version
```

## Projekti käivitamise alused pärast paigaldust

### Infra

```powershell
docker compose -f infra/docker-compose.yml up -d
```

### API

```powershell
cd apps/api
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn src.main:app --reload --port 8000
```

### Web

```powershell
cd apps/web
npm install
npm run dev
```

## Märkused IT tiimile

- Windows PATH peab sisaldama Node.js ja Pythoni paigaldusi
- Pythoni paigaldusel tuleks lubada valik, mis lisab Pythoni PATH-i
- kui turvapoliitika piirab Docker Desktopi kasutust, tuleb eraldi otsustada, kas kasutada kohalikku PostgreSQL paigaldust
- projektis on nii frontend kui backend, seega ainult ühe keele runtime'ist ei piisa
