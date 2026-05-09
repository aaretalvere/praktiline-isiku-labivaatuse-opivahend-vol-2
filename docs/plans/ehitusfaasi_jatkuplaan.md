Ehitusfaasi jätkuplaan ja järgmise tööetapi kirjeldus
Dokumenteeritud tegevuskaart pärast arhitektuuri, andmemudeli, API ja repo skeletoni etappe

# 1. Kus me praegu oleme
Seniste tööde tulemusel on paigas arhitektuuri põhimõtted, rollid, õigused, olekud, protokolli workflow, UI/UX orkestreerimise loogika, andmebaasi skeemi lähtekuju, API spetsifikatsioon, mooduliregistri põhimõtted ning monorepo ja arendusrepo skeletoni kirjeldus. Edasi liigume ehitusfaasi, kus eesmärk ei ole enam ainult kirjeldada süsteemi, vaid luua reaalselt käivituv tuumiklahendus.
# 2. Järgmise ehitusfaasi eesmärk
Järgmise etapi eesmärk on rajada esimene käivitatav tehniline alus, mille peale saab hakata lisama ametliku isiku läbivaatuse protokolli täielikku workflow'd, 3D viewer'i, AI juhendavat kihti ja hilisemaid lisamooduleid. Selle etapi lõpuks peab süsteem suutma käivituda, ühendada andmebaasiga, laadida esimese õppemooduli manifesti ning luua ja hoida protokolli minimaalses kujus.
# 3. Mida selles etapis päriselt ehitame
• Monorepo bootstrap koos tööruumide, juurkausta skriptide ja keskkonnafailide struktuuriga.
• Backend API skeleton, mis käivitub ja pakub versioonitud route'e.
• Esimene andmebaasi migratsioonipakett koos tuumiktabelitega.
• Esimene moodulimanifest isiku läbivaatuse õppemooduli jaoks.
• Workflow mootori minimaalne sammuloogika.
• Frontend skeleton, mis kuvab vähemalt sissepääsuvaate ja protokolli sammuvaate.
• Mock- või placeholder-tasemel AI endpoint, ilma et AI juhiks süsteemi tõeloogikat.
# 4. Etapi väljundid

# 5. Ehitusjärjekord
## 5.1 Monorepo bootstrap
• Luua juurkausta package manageri workspace konfiguratsioon.
• Luua apps/web, apps/api ja vajadusel apps/worker.
• Luua packages/shared-types ja packages/config.
• Luua modules/isiku-labivaatus ning infra/docker-compose failid.
• Lisada juurkausta README, .env.example ja arendusskriptid.
## 5.2 Backend API skeleton
• Luua FastAPI entrypoint ja /api/v1/health endpoint.
• Jaotada kood mooduliteks: auth, users, protocols, models, modules, ai.
• Lisada konfiguratsiooni- ja andmebaasikiht.
• Luua algsed request/response skeemid, isegi kui osa neist on veel minimaalsed.
## 5.3 Andmebaasi migratsioonide algpakett
• Alguses luua ainult kõige vajalikumad tabelid: users, roles või role assignments, protocols, module_registry, audit_logs.
• Jätta protokolli detailväljad alguses payload- või jsonb-põhiseks, et vältida liiga varast üleliigset jäikust.
• Lisada Alembic konfiguratsioon ja esimene migratsioon.
• Lisada seemneandmed vähemalt ühe admin-kasutaja ja ühe moodulikirjega.
## 5.4 Moodulimanifest
• Kirjeldada mooduli id, nimi, versioon, toetatud rollid, sammud, state machine ja validator hook'ide viited.
• Esimese moodulina lisada isiku läbivaatuse moodul.
• Jätta manifesti sisse koht tulevaste liideste jaoks, näiteks VR-capabilities või alternate viewer adapters.
## 5.5 Workflow core
• Lisada teenus, mis laeb mooduli manifesti ja leiab järgmise sammu.
• Siduda protokolli current_step ja state backendi püsiloogikaga.
• Tagada, et uus protokoll tekib ainult siis, kui aktiivset protokolli ei ole.
• Hoida AI sellest etapist lahus: backend jääb ainsaks tõeallikaks.
## 5.6 Frontend skeleton
• Luua õppija avaleht või dashboard.
• Luua esimene protokolli sammuvaade, kus kuvatakse current_step ja saab liikuda järgmisele sammule.
• Integreerida minimaalne API fetch kliendiga.
• Hoida kujundus alguses lihtne, kuid rollipõhine navigeerimine peab olema kohe eristatav.
# 6. Definition of Done selle etapi jaoks
• Monorepo installeerub ühe käsuga.
• Backend käivitub lokaalselt ja vastab vähemalt health-check päringule.
• PostgreSQL ühendus töötab ning migratsioonid jooksevad lõpuni.
• Esimene moodulimanifest laetakse süsteemi käivitamisel või päringu ajal edukalt.
• Saab luua protokolli minimaalses vormis ning talletada current_step ja state.
• Frontend kuvab vähemalt ühe sammu ning suhtleb backendiga.
• Ükski neist põhifunktsioonidest ei sõltu AI vastusest.
# 7. Mis tuleb kohe pärast seda etappi
Kui foundation build on tehtud, algab järgmine sisuline ehitusfaas: production workflow realiseerimine. Seal viime süsteemi sisse ametliku isiku läbivaatuse protokolli kogu väljade loogika, tingimusliku valideerimise, automaatse salvestamise, esitamise, lukustamise ja dokumendiekspordi. Alles pärast seda on mõistlik lisada AI juhendaja ning seejärel 3D viewer'i täismahus integratsioon.
# 8. Tulevikulaienduste valmisolek
• Vanglateenistuse või korrakaitsepolitsei õppematerjal lisatakse uue moodulina, mitte olemasolevat moodulit ümber kirjutades.
• VR-liides lisatakse eraldi kliendina või viewer-adapterina, kasutades samu 3D varasid ja sama workflow teenust.
• Õpetaja roll lisatakse rolliõiguste ja mooduliõiguste kihis, mitte eraldi rakendusena.
• AI tagasiside moodul lisatakse pärast seda, kui vormiline workflow on stabiilne.
# 9. Riskid ja kontrollpunktid

# 10. Soovitatud järgmine praktiline tegevus
Järgmine praktiline ehitustegevus on kirjutada välja starter-kood: monorepo juurfailid, API skeleton, moodulimanifesti esmane fail ja andmebaasi migratsioonide algpakett. Seda on mõistlik teha eraldi dokumenteeritud etapina ning paralleelselt võib ette valmistada ka esimesed repo README juhised.