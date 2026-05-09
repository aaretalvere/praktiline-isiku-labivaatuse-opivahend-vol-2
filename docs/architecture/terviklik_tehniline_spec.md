
100%
📋 Document Outline
1. Senise töö kokkuvõte
2. Sihtarhitektuur
3. Arhitektuuriprintsiibid
4. Domeenimudel ja põhiobjektid
5. Etappide kaupa ehitamise plaan
6. Iga etapi konkreetsed väljundid
Etapp 0 – spetsifikatsioon
Etapp 1 – backend
Etapp 2 – frontend
Etapp 3 – AI ja laiendused
7. Soovitatud koodistruktuur
8. Tegevuskava koodi kirjutamise alustamiseks
9. Tulevikulaienduste strateegia
10. Riskid ja kontrollpunktid
11. Lõppsoovitus
Praktilise isiku läbivaatuse õpivahendi
terviklik tehniline tegevuskaart

Dokumenteeritud plaan tervikliku, laiendatava ja töötava lahenduse ehitamiseks


Lähtekoht: ametliku isiku läbivaatuse protokolli digitaalne õppelahendus,
mida saab hiljem laiendada uute õppemoodulite, liideste ja VR-vaatega.

Põhisoovitus: ehita õppeplatvormi tuum, mitte üksikprotokolli äpp. Tõde peab asuma backendis; AI on juhendav kiht; 3D-sisu, workflow ja liides peavad olema lahus. Esimene moodul on isiku läbivaatuse õppematerjal, kuid arhitektuur peab toetama hiljem vanglateenistuse, korrakaitsepolitsei ja VR-liidese lisamist.

1. Senise töö kokkuvõte
Paika on pandud rollid, õigused, olekud, protokolli workflow ja UI/UX orkestreerimise põhimõtted.
Õppija täidab ametlikule vormile vastavat protokolli juhitud sammudena.
Üks protokoll on seotud ühe 3D-mudeliga ning kasutajal võib korraga olla ainult üks aktiivne protokoll.
Backend peab jääma süsteemi tõeallikaks; AI ei tohi asendada äriloogikat ega õiguslikke reegleid.
Arhitektuur peab toetama hilisemaid mooduleid, uusi rolle, uusi protokolle ja uusi liideseid.
2. Sihtarhitektuur
Esitluskiht: veebiliides õppijale, adminile ja hiljem õpetajale; 3D viewer; tulevikus VR-vaade.
Rakendusloogika kiht: workflow mootor, õigused, valideerimine, olekud, dokumendi koostamine.
Domeeni- ja sisu kiht: õppemoodulid, protokollimallid, sammud, reeglid, juhendustekstid, hoiatusreeglid.
Andmekiht: kasutajad, rollid, mudelid, protokollid, lisad, logid, versioonid, sessioonid.
Integratsioonikiht: AI teenus, failisalvestus, dokumendieksport, autentimisteenused, hilisemad VR ja välisliidesed.
3. Arhitektuuriprintsiibid
Õppemoodulipõhisus: süsteem peab toetama mitut õppematerjali, mitte ainult üht protokolli.
Konfiguratsioon enne koodi: uued workflow’d, vormid ja rollipiirangud peavad olema kirjeldatavad ilma tuumikut ümber kirjutamata.
Backend-first: kõik kriitilised otsused tehakse backendis, mitte promptis ega ainult UI-s.
Adapteripõhisus: 3D-sisu, dokumendieksport ja AI tuleb ühendada vahetatavate adapteritega.
Audit ja jälgitavus: kõik olulised muudatused, rollimuutused ja esitamise sündmused logitakse.
4. Domeenimudel ja põhiobjektid
Süsteemi tuum tuleb modelleerida üldise õppeplatvormina. Järgmine olemite jaotus võimaldab tulevikus lisada uusi mooduleid ja liideseid ilma tuumikut lõhkumata.

Objekt

Eesmärk

Märkus laiendatavuse jaoks

User

Kasutajakonto ja profiil

Hilisemad rollid: õpetaja, prison_trainer, police_instructor, vr_operator

Role / Permission

Rollid ja õigused

Soovitatav mooduli- ja tegevuspõhine õiguste mudel

LearningModule

Õppematerjali tüüp

Nt isiku läbivaatus, vanglateenistus, korrakaitse

Scenario

Konkreetne õppeülesanne või juhtum

Saab siduda 3D-mudeli, juhiste ja hindamisreeglitega

Asset3D

3D-vara koos metaandmetega

Peab töötama nii veebis kui hiljem VR-is

ProtocolTemplate

Ametlik või õppeline vormimall

Võimaldab lisada uusi protokolle ja dokumente

ProtocolInstance

Kasutaja konkreetne täidetav dokument

Sisaldab olekut, current_step’i ja payload’i

ProtocolStep

Sammu definitsioon workflow’s

Preconditions, validators, transition rules

Attachment

Lisad ja objektid

Skeemid, joonised, näitlik materjal, failid

AuditLog

Jälgitavus ja kontroll

Adminitoimingud, esitamine, kopeerimine, rollimuutus

AIInteraction

AI-päringud ja vastused

Hiljem kasutatav analüüsiks ja parandamiseks

Session

Kasutussessioon või VR-sessioon

Valmidus mitmele liidesele

5. Etappide kaupa ehitamise plaan
Etapp

Nimi

Põhisisu

Tulemus

Etapp 0

Lõplik spetsifikatsioon

Domeenikaart, andmemudel, API piirid, moodulistrateegia, AI rolli piirid

Allkirjastatud tehniline alus, millelt kood algab

Etapp 1

Backend tuum

Autentimine, rollid, kasutajad, mudelid, protokollid, workflow engine, auditilogid

Töötav API ja olekuloogika

Etapp 2

Frontend tuum

Õppija vaated, admin-vaated, samm-sammuline protokollivorm, ülevaade, allalaadimine

Töötav veebirakendus ilma AI-sõltuvuseta

Etapp 3

3D moodul

Mudelikataloog, viewer, metaandmed, supported features, pose/layer tugi

Praktiline 3D kasutuskogemus veebis

Etapp 4

AI juhendav kiht

Sammuspetsiifiline juhendamine, vormiline kontroll, järeldusliku keele hoiatus

Targem kasutajakogemus ilma äriloogikat AI-le andmata

Etapp 5

Ekspordid ja versioonihaldus

DOCX/PDF väljund, valmis protokolli lukustamine, kopeerimine uueks tööks

Õppeprotsessist tekib korrektne lõppdokument

Etapp 6

Mooduli- ja liidesepõhine laiendatavus

Uued õppemoodulid, õpetaja roll, pluginad, välisliidesed

Süsteem muutub platvormiks

Etapp 7

VR ja eriliidesed

VR viewer adapter, ruumiline interaktsioon, sessioonihaldus

Sama tuum teenindab ka VR-kogemust

6. Iga etapi konkreetsed väljundid
Etapp 0 – spetsifikatsioon
Domeenimudeli dokument
Andmebaasi skeem v1 ja laiendatavuse märkused v2 jaoks
API spetsifikatsioon
Workflow register ja validator-reeglid
AI teenuse leping ning rollipiirid
Etapp 1 – backend
Projektistruktuur ja teenusekihid
Andmebaasi migratsioonid
Autentimise ja autoriseerimise mehhanism
Workflow engine ja protocol service
Audit ja logimine
Etapp 2 – frontend
Rollipõhine navigeerimine
Õppija mudelikataloog ja protokolli täitmise vaated
Admini põhipaneel
Ülevaate- ja esitamisvaade
Etapp 3 – AI ja laiendused
Juhendav agent
Validator-reeglite AI tugi
Mooduliregister uute õppematerjalide lisamiseks
Adapteriliides VR ja muude klientide jaoks
7. Soovitatud koodistruktuur
Praktilise ehitamise huvides soovitan hoida frontend, backend, domeenireeglid ja integratsioonid selgelt lahus.

Kiht / kaust

Sisu

/apps/web

Next.js või muu veebiklient: õppija, admin, hiljem õpetaja vaated

/services/api

FastAPI või Node teenus: auth, users, models, protocols, workflow, export

/domain

Rollid, olekud, reeglid, validatorid, workflow definitsioonid

/modules/person-search

Esimese õppemooduli konfiguratsioon: sammud, tekstid, reeglid, dokumendimall

/integrations/ai

AI adapterid ja promptide kihistus

/integrations/storage

Failid, lisad, dokumendid, 3D-vara

/integrations/vr

Hiljem VR adapter ja sessioonihaldus

/docs

Tehnilised lepingud, API kirjeldus, arhitektuur ja kasutusjuhised

8. Tegevuskava koodi kirjutamise alustamiseks
Allpool on soovitatud tööjärjestus, millega saab minna spetsifikatsioonist töötava süsteemini.

Kirjuta lukku domeenimudel ja olemite kaart.
Koosta andmebaasi skeem ning migratsioonide esimene komplekt.
Kirjelda API endpointid ja andmevahetuse objektid.
Ehita backend skeleton ja autentimine.
Loo workflow engine ning sidu see ametliku protokolli sammudega.
Loo õppija frontend ja admini frontend minimaalses tööversioonis.
Ühenda 3D viewer ning mudelite olekuloogika.
Loo protokolli DOCX/PDF väljund.
Lisa AI juhendav kiht eraldi teenusena.
Valmista ette moodulite register ja adapteriliidesed tulevaste laienduste jaoks.
9. Tulevikulaienduste strateegia
Laiendus

Mida peab tuum juba täna toetama

Soovitus

Õpetaja roll

Moodulipõhine rollimudel, nähtavus protokollidele ja logidele

Ära seo õigusi ainult kahe globaalse rolliga

Vanglateenistuse õppematerjal

Uus LearningModule + oma workflow + omad dokumendid

Ehita mooduliregister varakult

Korrakaitsepolitsei õppematerjal

Scenario- ja template-põhine ülesehitus

Ära seo kogu koodi ühe protokolliga

VR vaade

Asset3D metaandmed, viewer adapter, sessioonihaldus

Hoia 3D sisu esitusest lahus

Sisuline AI tagasiside

AIInteraction logi ja eraldi feedback moodul

Lisa hiljem, mitte tuumikusse

10. Riskid ja kontrollpunktid
Risk: liiga palju loogikat viiakse prompti. Vastus: backend jääb alati tõeallikaks.
Risk: ametlik vorm moondub UI-s. Vastus: andmemudel ja eksport peavad järgima vormi struktuuri.
Risk: üksiklahendus muutub ummikuks. Vastus: ehita moodulipõhine platvorm.
Risk: 3D ja VR tehakse liiga varakult liiga tihedalt seotud. Vastus: kasuta adaptereid ja metaandmeid.
Risk: AI hakkab tegema järeldusi protokolli sisus. Vastus: AI roll piirata juhendamise ja hoiatustega.
11. Lõppsoovitus
Järgmine praktiline töö peaks olema nelja alusdokumendi koostamine: (1) domeenimudel ja olemite kaart, (2) andmebaasi skeem, (3) API spetsifikatsioon, (4) mooduliregister ja AI teenuse leping. Nende põhjal saab kohe alustada backend skeletoni ja frontendi tuuma kirjutamist. Alles pärast töötava tuumiklahenduse valmimist tuleks lisada juhendav AI ning seejärel mooduli- ja VR-laiendused.