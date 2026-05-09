Praktilise isiku läbivaatuse õpivahendi
terviklik tehniline tegevuskaart
Dokumenteeritud plaan tervikliku, laiendatava ja töötava lahenduse ehitamiseks
Lähtekoht: ametliku isiku läbivaatuse protokolli digitaalne õppelahendus,
mida saab hiljem laiendada uute õppemoodulite, liideste ja VR-vaatega.


# 1. Senise töö kokkuvõte
Paika on pandud rollid, õigused, olekud, protokolli workflow ja UI/UX orkestreerimise põhimõtted.
Õppija täidab ametlikule vormile vastavat protokolli juhitud sammudena.
Üks protokoll on seotud ühe 3D-mudeliga ning kasutajal võib korraga olla ainult üks aktiivne protokoll.
Backend peab jääma süsteemi tõeallikaks; AI ei tohi asendada äriloogikat ega õiguslikke reegleid.
Arhitektuur peab toetama hilisemaid mooduleid, uusi rolle, uusi protokolle ja uusi liideseid.
# 2. Sihtarhitektuur
Esitluskiht: veebiliides õppijale, adminile ja hiljem õpetajale; 3D viewer; tulevikus VR-vaade.
Rakendusloogika kiht: workflow mootor, õigused, valideerimine, olekud, dokumendi koostamine.
Domeeni- ja sisu kiht: õppemoodulid, protokollimallid, sammud, reeglid, juhendustekstid, hoiatusreeglid.
Andmekiht: kasutajad, rollid, mudelid, protokollid, lisad, logid, versioonid, sessioonid.
Integratsioonikiht: AI teenus, failisalvestus, dokumendieksport, autentimisteenused, hilisemad VR ja välisliidesed.
# 3. Arhitektuuriprintsiibid
Õppemoodulipõhisus: süsteem peab toetama mitut õppematerjali, mitte ainult üht protokolli.
Konfiguratsioon enne koodi: uued workflow’d, vormid ja rollipiirangud peavad olema kirjeldatavad ilma tuumikut ümber kirjutamata.
Backend-first: kõik kriitilised otsused tehakse backendis, mitte promptis ega ainult UI-s.
Adapteripõhisus: 3D-sisu, dokumendieksport ja AI tuleb ühendada vahetatavate adapteritega.
Audit ja jälgitavus: kõik olulised muudatused, rollimuutused ja esitamise sündmused logitakse.
# 4. Domeenimudel ja põhiobjektid
Süsteemi tuum tuleb modelleerida üldise õppeplatvormina. Järgmine olemite jaotus võimaldab tulevikus lisada uusi mooduleid ja liideseid ilma tuumikut lõhkumata.
# 5. Etappide kaupa ehitamise plaan
# 6. Iga etapi konkreetsed väljundid
## Etapp 0 – spetsifikatsioon
Domeenimudeli dokument
Andmebaasi skeem v1 ja laiendatavuse märkused v2 jaoks
API spetsifikatsioon
Workflow register ja validator-reeglid
AI teenuse leping ning rollipiirid
## Etapp 1 – backend
Projektistruktuur ja teenusekihid
Andmebaasi migratsioonid
Autentimise ja autoriseerimise mehhanism
Workflow engine ja protocol service
Audit ja logimine
## Etapp 2 – frontend
Rollipõhine navigeerimine
Õppija mudelikataloog ja protokolli täitmise vaated
Admini põhipaneel
Ülevaate- ja esitamisvaade
## Etapp 3 – AI ja laiendused
Juhendav agent
Validator-reeglite AI tugi
Mooduliregister uute õppematerjalide lisamiseks
Adapteriliides VR ja muude klientide jaoks
# 7. Soovitatud koodistruktuur
Praktilise ehitamise huvides soovitan hoida frontend, backend, domeenireeglid ja integratsioonid selgelt lahus.
# 8. Tegevuskava koodi kirjutamise alustamiseks
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
# 9. Tulevikulaienduste strateegia
# 10. Riskid ja kontrollpunktid
Risk: liiga palju loogikat viiakse prompti. Vastus: backend jääb alati tõeallikaks.
Risk: ametlik vorm moondub UI-s. Vastus: andmemudel ja eksport peavad järgima vormi struktuuri.
Risk: üksiklahendus muutub ummikuks. Vastus: ehita moodulipõhine platvorm.
Risk: 3D ja VR tehakse liiga varakult liiga tihedalt seotud. Vastus: kasuta adaptereid ja metaandmeid.
Risk: AI hakkab tegema järeldusi protokolli sisus. Vastus: AI roll piirata juhendamise ja hoiatustega.
# 11. Lõppsoovitus
Järgmine praktiline töö peaks olema nelja alusdokumendi koostamine: (1) domeenimudel ja olemite kaart, (2) andmebaasi skeem, (3) API spetsifikatsioon, (4) mooduliregister ja AI teenuse leping. Nende põhjal saab kohe alustada backend skeletoni ja frontendi tuuma kirjutamist. Alles pärast töötava tuumiklahenduse valmimist tuleks lisada juhendav AI ning seejärel mooduli- ja VR-laiendused.