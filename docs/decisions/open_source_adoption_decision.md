# Open-Source ehitusplokkide kasutamise otsus

Kuupäev: 2026-04-08

Seotud uurimus:

- `docs/product/market_research_similar_platforms.md`

## Eesmärk

Määratleda, milliseid olemasolevaid open-source komponente võib selle projekti arenduses kasutada, milliseid ei tohi võtta süsteemi tuumikuks ning millised osad tuleb kindlasti ise programmeerida.

## Otsuse kokkuvõte

Me ei võta olemasolevat LMS-i, low-code platvormi ega õiguskaitse treeningtoodet oma süsteemi põhialuseks.

Meie strateegia on:

- kasutada väikeseid ja hästi piiritletud open-source ehitusplokke
- hoida domeeniloogika, protokolli reeglid ja audit meie enda koodis
- käsitleda 3D/VR, vormide renderdust ja state machine’i tehnilise alusena, mitte äriloogika allikana

## Heaks kiidetud kasutusvaldkonnad

### 1. Vormi renderdus ja skeemipõhine UI

Lubatud kandidaadid:

- `react-jsonschema-form`
- `JSON Forms`

Lubatud kasutusulatus:

- protokolli sammude dünaamiline renderdamine
- skeemipõhiste väljade kuvamine
- baastaseme kliendipoolne valideerimine

Piirang:

- vormimootor ei määra ise protseduurireegleid
- serveripoolne tõde peab jääma meie backendisse

### 2. Workflow tehniline alus

Lubatud kandidaat:

- `transitions`

Lubatud kasutusulatus:

- olekumasina tehniline teostus
- sammude üleminekute kirjeldamine
- workflow teenuse sisemine infrastruktuur

Piirang:

- konkreetne sammuloogika, õigused ja blokeerivad tingimused tuleb kirjutada meie enda domeenikihis

### 3. 3D veebivaade

Lubatud kandidaadid:

- `three.js`
- `@react-three/fiber`

Lubatud kasutusulatus:

- 3D viewer
- markerid, hotspotid ja mudeli interaktsioon
- mudeli visualiseerimine õppija vaates

Piirang:

- 3D kiht ei tohi hakata omama protseduurilist äriloogikat
- seos 3D objekti ja protokollisammu vahel peab tulema meie enda andmemudelist

### 4. Tulevane WebXR või VR prototüüp

Lubatud kandidaat:

- `A-Frame`

Tulevane kandidaat:

- `UltimateXR`, kui ehitame eraldi Unity kliendi

Piirang:

- VR on laiendus, mitte tuum
- sama workflow ja domeen peab jääma sõltumatuks sellest, kas klient on veeb või VR

## Ei ole lubatud süsteemi tuumikuks

Neid võib kasutada ainult võrdlusena, inspiratsioonina või võimaliku tulevase integratsioonina.

### LMS-id

- `Open edX`
- `Moodle`
- `Canvas LMS`
- `Forma LMS`

Põhjus:

- liiga suured ja vales vormis platvormid meie protseduuripõhise süsteemi jaoks
- toovad kaasa liigset keerukust
- ei lahenda meie protokolli- ja auditituuma

### Low-code ja source-available protsessitööriistad

- `Budibase`
- `n8n`
- `Camunda 8`

Põhjus:

- litsentsi- või toodestamisrisk
- vale abstraktsioonitase meie backend-first domeenituuma jaoks

### Õiguskaitse treeningtooted

- `ForensicXR`
- `VirTra`
- `Axon VR`
- `VictoryXR`

Põhjus:

- need on võrdluspunktid, mitte koodi allikad
- eesmärk on ehitada oma platvorm, mitte sõltuda suletud tootelahendustest

## Osad, mis tuleb kindlasti ise programmeerida

### 1. Domeenituum

Tuleb ise programmeerida:

- kasutaja, rolli ja õiguste mudel
- õppemoodulid
- stsenaariumid
- 3D varade metaandmed
- protokollimallid
- protokolliinstantsid
- sammud ja üleminekud
- auditilogid

### 2. Protokolli äriloogika

Tuleb ise programmeerida:

- millal samm on lubatud
- millal samm on blokeeritud
- millised andmed on kohustuslikud
- millised hoiatused tuleb kasutajale näidata
- kuidas mooduli reeglid erinevad

### 3. Valideerimiskiht

Tuleb ise programmeerida:

- serveripoolne valideerimine
- väljadevahelised reeglid
- sisulised kontrollid
- sammupõhine kontroll enne edasi liikumist
- esitamise eelne koondkontroll

### 4. Ametliku dokumendi eksport

Tuleb ise programmeerida:

- DOCX või PDF väljundi koostamine
- väljade maping ametlikule vormile
- lõppdokumendi lukustamine
- versioonihaldus

### 5. Audit ja traceability

Tuleb ise programmeerida:

- kes tegi muudatuse
- millal muudatus tehti
- milline oli muudatuse sisu
- millal toimus esitamine
- kuidas AI soovitus logiti

### 6. 3D ja protokolli sidumine

Tuleb ise programmeerida:

- seos 3D objekti ja protokollisammu vahel
- mudeli oleku mõju vormile
- sama andmemudeli jagamine veebikliendi ja võimaliku VR kliendi vahel

### 7. AI guardrailid

Tuleb ise programmeerida:

- AI rolli piirid
- AI sisendi ja väljundi leping
- audititav logi AI päringute ja vastuste jaoks
- reegel, et AI ei asenda äriloogikat

### 8. Mooduliplatvorm

Tuleb ise programmeerida:

- moodulimanifest
- mooduliregister
- mooduli sammude, tekstide ja reeglite laadimine
- mitme õppemooduli tugi sama tuuma peal

## Esialgne tehniline soovitus

Praeguse projekti jaoks sobivaim kombinatsioon on:

- frontend: olemasolev `Next.js` + `React`
- vormikihis üks kandidaat `react-jsonschema-form` või `JSON Forms`
- backend workflow tehnilise alusena `transitions`
- 3D kihis `three.js` + `@react-three/fiber`
- VR prototüüp alles hilisemas etapis, vajadusel `A-Frame`

## Otsuse mõju repo ja arhitektuuri tasemel

See otsus tähendab, et:

- repo tuumik jääb meie enda koodiks
- välised teegid liituvad adapterite või tehniliste alamkihtidena
- ükski väline platvorm ei tohi hakata dikteerima meie domeenimudelit
- kogu kriitiline protseduuriloogika peab jääma backend-first põhimõtte alla

## Järgmine praktiline samm

Enne sõltuvuste lisamist tuleb iga valitud open-source ehitusploki jaoks teha lühike tehniline sobivushinnang:

- kasutuskoht süsteemis
- litsentsi sobivus
- adapteri piir
- eemaldatavus või asendatavus
