# Sarnaste platvormide turuülevaade

Kuupäev: 2026-04-08

## Eesmärk

Selle ülevaate eesmärk on kaardistada, kas olemas on meie kavandatavale lahendusele sarnaseid platvorme, sealhulgas avatud lähtekoodiga alternatiive või osalisi ehitusplokke.

Uurimisküsimused:

- kas turul on olemas otsene funktsionaalne vaste
- kas olemasolevat open-source koodi saab meie projektis kasutada
- millistes osades on meie lahendus turul eristuv

## Lühike järeldus

Turul on olemas mitu osalist analoogi, kuid ei leitud üht valmis platvormi, mis ühendaks korraga:

- juhitud protokollivormi
- õppija/admini workflow
- 3D või VR stseeni
- hindamise ja auditilogid
- AI-juhendamise

Kõige realistlikum järeldus on, et meie projekt ei ole “veel üks VR-koolitus”, vaid protseduuriliselt korrektne, auditeeritav ja laiendatav õppe- ning protokolliplatvorm.

## Kõige lähedasemad kommerts- ja tooteanaloogid

### ForensicXR

Allikas: <https://forensicxr.com/>

Tugevused:

- forensika ja uurimiskoolituse suunitlus
- 3D või mixed reality stseenide kasutus
- mõõdetavad õpitulemused
- stseenipõhine treening

Olulisus meie jaoks:

- kõige lähem funktsionaalne analoog kogu turupildis
- eriti tugev võrdluspunkt 3D stseenide ja uurimisworkflow mõttes

Piirang:

- avaliku info põhjal ei paista olevat keskmes ametliku protokolli range vormitäitmine ja backend-first auditiloogika

### VictoryXR CSI & Forensics

Allikas: <https://www.victoryxr.com/csi-forensics/>

Tugevused:

- VR-põhine CSI ja forensika õpe
- selge hariduslik simulatsioonikeskkond

Olulisus meie jaoks:

- hea võrdluspunkt õppimise ja simulatsiooni kihile

Piirang:

- paistab olevat rohkem immersiivne õppekeskkond kui rangelt protokolli- ja workflow-keskne tööplatvorm

### VirTra

Allikad:

- <https://www.virtra.com/law-enforcement/>
- <https://www.virtra.com/training/>

Tugevused:

- küps õiguskaitse simulatsioon
- de-eskalatsiooni ja otsustusoskuste treening
- stsenaariumipõhine hindamine

Olulisus meie jaoks:

- tugev võrdluspunkt õiguskaitse treeningplatvormina

Piirang:

- fookus on taktikal ja otsustamisel, mitte protokolli täitmise ja dokumenteerimise töövoogudel

### Axon VR

Allikas: <https://www.axon.com/products/vr>

Tugevused:

- immersiivne õiguskaitse väljaõpe
- AI-juhitud dialoogi kasutus
- tugev situatsiooniline treening

Olulisus meie jaoks:

- väga oluline võrdluspunkt AI-juhendamise ja VR-kihi jaoks

Piirang:

- ei paista lahendavat ametliku protokolli täitmist, dokumenteerimist ega moodulipõhist protseduuriplatvormi küsimust

## Open-source ja avatud koodiga ehitusplokid

### LMS ja õppeplatvormid

#### Open edX

Allikad:

- <https://openedx.org/>
- <https://github.com/openedx/edx-platform>

Tugevused:

- küps open-source õppeplatvorm
- rollid, kursused, sisu, õpiteekonnad

Hinnang:

- hea võrdlus- ja referentsplatvorm
- liiga suur ja liiga LMS-keskne, et võtta meie süsteemi tuumikuks

#### Moodle

Allikad:

- <https://moodle.com/>
- <https://github.com/moodle/moodle>
- <https://moodle.org/plugins/block_exacomp>

Tugevused:

- väga paindlik open-source LMS
- tugev pluginaökosüsteem
- kompetentsipõhise hindamise võimalused

Hinnang:

- hea inspiratsioon õppe ja hindamise kihile
- ei sobi hästi meie backend-first protseduuriplatvormi tuumikuks

#### Canvas LMS

Allikas: <https://github.com/instructure/canvas-lms>

Hinnang:

- tugev avatud koodiga LMS
- pigem klassikaline kursusehaldus kui protseduuriline tööplatvorm

#### Forma LMS

Allikad:

- <https://formalms.org/>
- <https://github.com/formalms/formalms>

Hinnang:

- huvitav corporate-training suund
- ei lahenda meie domeenispetsiifilist protseduuriloogikat

### Vormid, skeemid ja UI ehitusplokid

#### react-jsonschema-form

Allikad:

- <https://github.com/rjsf-team/react-jsonschema-form>
- <https://rjsf-team.github.io/react-jsonschema-form/docs/>

Tugevused:

- JSON Schema põhjal vormide renderdamine
- Reacti ökosüsteem

Hinnang:

- väga sobiv kandidaat protokollivormide renderdamiseks
- ei asenda domeenireegleid ega workflow loogikat

#### JSON Forms

Allikas: <https://github.com/eclipsesource/jsonforms>

Tugevused:

- skeemipõhine vormi-UI
- Reacti tugi

Hinnang:

- väga hea kandidaat konfiguratsioonipõhise vormikihi jaoks

### Workflow ja protsessitehnika

#### transitions

Allikas: <https://github.com/pytransitions/transitions>

Tugevused:

- kerge state machine teek Pythonile
- sobib hästi FastAPI backendi juurde

Hinnang:

- kõige realistlikum open-source ehitusplokk protokolli sammude ja olekute juhtimiseks

#### Temporal

Allikad:

- <https://github.com/temporalio/temporal>
- <https://temporal.io/>

Hinnang:

- tugev durable execution lahendus keerukale orkestreerimisele
- meie praeguses faasis tõenäoliselt liiga raske

#### Camunda 8

Allikas: <https://docs.camunda.io/docs/reference/licenses/>

Hinnang:

- tehniliselt võimas
- litsentsi- ja toodestamise vaates mitte esimene valik meie projekti tuumikuks

### 3D ja VR ehitusplokid

#### three.js

Allikas: <https://github.com/mrdoob/three.js>

Hinnang:

- tugev ja standardne veebipõhine 3D alus
- praktiline valik viewer’i jaoks

#### react-three-fiber

Allikas: <https://github.com/pmndrs/react-three-fiber>

Hinnang:

- väga hea valik, kui jääme React/Next.js suuna juurde

#### A-Frame

Allikad:

- <https://aframe.io/>
- <https://github.com/aframevr/aframe>

Hinnang:

- kasulik WebXR ja kiire VR-prototüüpimise jaoks

#### Babylon.js

Allikas: <https://github.com/BabylonJS/Babylon.js>

Hinnang:

- tugev alternatiiv Three.js maailmale
- sobib siis, kui tahame rohkem engine-tüüpi 3D raamistiku tunnetust

#### UltimateXR

Allikas: <https://www.ultimatexr.io/>

Hinnang:

- huvitav tulevase Unity-põhise VR kliendi jaoks
- praeguse veebituuma jaoks ei ole vajalik

## Akadeemiline ja raamistikutaseme leid

### Open source VR training framework for criminal justice

Allikas: <https://journals.sagepub.com/doi/10.1177/00938548221124128>

Olulisus:

- kõige lähem open-source raamistikutaseme analoog õiguskaitse koolituse poolelt
- kirjeldab veebiserveri, API, operaatorivaate, vestlusmootori ja VR-keskkonna kombinatsiooni

Hinnang:

- tugev arhitektuuriline referents
- mitte valmis tooteplatvorm meie kasutusjuhuks

## Turuvõrdluse põhijäreldused

### Mida olemasolevad lahendused teevad hästi

- immersiivne simulatsioon
- stsenaariumipõhine õppimine
- õiguskaitse treeningu kontekst
- mõõdikud ja õppimise hindamine

### Mida meie lahendus saab teha paremini või teistmoodi

- ametliku protokolli juhitud täitmine
- backend-first audit ja jälgitavus
- dokumenteerimise korrektsus
- ühe platvormi laiendatavus mitmele õppemoodulile
- AI rolli teadlik piiramine juhendamiseks, mitte otsustamiseks

## Kokkuvõte

Turul on olemas tugevad osalised võrdluspunktid ja piisavalt häid open-source ehitusplokke, et mitte alustada täiesti nullist. Samas ei ole olemas ühte valmis avatud lähtekoodiga toodet, mida oleks mõistlik meie projekti tuumikuks võtta.

Kõige mõistlikum tee on:

- ehitada oma domeenituum ise
- kasutada väikseid ja selgeid open-source komponente vormide, workflow-tehnika ja 3D/VR jaoks
- mitte võtta kogu süsteemi aluseks suurt LMS-i ega low-code platvormi
