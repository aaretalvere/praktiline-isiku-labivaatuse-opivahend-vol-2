# Praktiline Isiku Läbivaatuse Õpivahend

Monorepo isiku läbivaatuse õppelähenduse arendamiseks. Projekti alus on laiendatav platvorm, kus backend on tõeallikas, AI on juhendav kiht ja õppemoodulid on eraldatud tuumikust.

## Repo struktuur

- `apps/` käivitatavad rakendused, sh veeb ja API
- `modules/` õppemoodulite sisu ja konfiguratsioon
- `packages/` jagatud teegid ja domeeniloogika
- `infra/` lokaalne infra ja käivitusseaded
- `docs/` aktiivne markdown-dokumentatsioon
- `reference/` ajaloolised lähtefailid, Wordi dokumendid ja code-packid
- `tests/` integratsiooni- ja e2e-testid

## Olulised dokumendid

- aktiivne tehniline spetsifikatsioon: `docs/architecture/terviklik_tehniline_spec.md`
- tootmisse viivad märkused: `docs/plans/IMPLEMENTATION_NOTES.md`

## Käivitamine

### Infra
```bash
docker compose -f infra/docker-compose.yml up -d
```

### API
```bash
cd apps/api
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn src.main:app --reload --port 8000
```

### Web
```bash
cd apps/web
npm install
npm run dev
```

## Olulised endpointid

- `GET /api/v1/health`
- `GET /api/v1/modules`
- `POST /api/v1/protocols`
- `POST /api/v1/protocols/{protocol_id}/next`

## Staatus

Repo sisaldab töö algstruktuuri. Järgmised sammud on andmemudeli lukustamine, API täiendamine, workflow-tuuma valmis ehitamine ja esimese reaalse frontendi voo tegemine.
