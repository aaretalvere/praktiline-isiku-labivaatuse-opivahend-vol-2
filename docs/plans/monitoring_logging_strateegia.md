Monitoring & Logging strateegia

Praktilise isiku läbivaatuse õpivahend – production vaade koos selgitustega

Dokumendi eesmärk. Määrata, mida süsteemis jälgitakse, miks seda jälgitakse, kes andmeid kasutab ning kuidas logimine toetab tehnilist töökindlust, auditit, turvalisust ja õppeanalüütikat. See dokument on järgmine kiht pärast spetsifikatsiooni, traceability ja testiraamistikku: ta aitab vastata küsimusele „mis päriselus toimub?”

# 1. Põhimõtted

Jälgimine peab olema backend-first: lõplik tõde kasutaja tegevuste, workflow olekute, valideerimisvigade ja ekspordisündmuste kohta tuleb serverist, mitte ainult kliendi telemeetriast.

Tehniline monitooring ja pedagoogiline analüütika tuleb hoida loogiliselt eristatud. Kõik, mis on vajalik töökindluseks ja auditiks, tuleb logida sõltumata sellest, kas seda kasutatakse õppeanalüütikas.

AI-ga seotud hoiatused tuleb logida eraldi, sest need ei ole samad mis süsteemivead. Näiteks inference-warning ei tähenda, et süsteem on rikkis; see tähendab, et õppija sõnastus vajab tähelepanu.

Logimine peab olema minimaalselt piisav: koguda tuleb see, mis on vajalik töökindluse, turvalisuse, auditi ja arenduse jaoks, kuid vältida tuleb põhjendamatut andmete kuhjamist.

# 2. Miks monitooringut vaja on

Ilma monitooringuta on raske eristada kolme eri olukorda: süsteemne tõrge, kasutaja eksimus ja didaktiliselt ootuspärane raskuskoht.

Ilma logideta ei saa tõendada, kas workflow rikkus süsteem, kasutaja või vale konfiguratsioon.

Õppevahendi puhul on eriti oluline näha, millistes sammudes õppijad järjekindlalt takerduvad, sest see võib viidata kas ebaselgele juhisele, liiga rangele validatorile või sisulisele õpiraskusele.

# 3. Monitooringu põhidomeenid

# 4. Soovitatud logisündmused

# 5. Metrics ja alerting

## 5.1 Tehnilised alert’id

5xx veamäär ületab kokkulepitud läve.

Autosave success rate langeb alla ohutu piiri.

Resume endpointi vead kasvavad järsult.

Ekspordi nurjumised ületavad tavapärast määra.

## 5.2 Sisulised / pedagoogilised indikaatorid

Mõnes sammus kasvab inference-warning’ute määr ebatavaliselt suureks.

Mõne välja puhul tekib korduv submission-block, mis võib viidata halvale juhisele või ebaselgele vormiloogikale.

Õppijad katkestavad töö järjekindlalt samas etapis; see võib viidata kas UI probleemile või didaktilisele raskuskohale.

# 6. Dashboard’i soovituslik ülesehitus

# 7. Andmekaitse ja minimaalne logimispõhimõte

Logides tuleb eelistada tehnilisi identifikaatoreid ja sündmusekoodi. Vältida tuleb põhjendamatut tundliku sisu dubleerimist logidesse.

Kirjeldusväljade täielikku sisu ei ole mõistlik panna üldistesse rakenduslogidesse; vajadusel tuleb kasutada eraldi, rangema ligipääsuga audit- või AIInteraction kihti.

Õppeanalüütika vaated peaksid eelistama agregeeritud andmeid. Õppejõule on tavaliselt olulisem trend kui üksiku õppija detailne toorlogi.

# 8. Soovitatud rakendusjärjekord

1. Määra standardne event schema kõigile põhisündmustele.

2. Lisa backendis struktureeritud logimine workflow, validate, submit, export ja access-control kihtidesse.

3. Seo auditilogid ja rakenduslogid loogiliselt, kuid hoia need eraldi eesmärgi järgi.

4. Loo minimaalsed dashboard’id: tehniline, workflow, valideerimine.

5. Seejärel lisa õppeanalüütika vaade, mis kasutab juba kogutud sündmusi.

# 9. Kokkuvõte

Monitoring & logging strateegia on vajalik, sest see muudab süsteemi päriskasutuse nähtavaks. Sinu projekti puhul ei piisa ainult serveri tööoleku jälgimisest; vaja on eristada tehnilisi tõrkeid, workflow probleeme, kasutajavigu ja didaktilisi raskuskohti. Hästi üles ehitatud monitooring toetab korraga arendust, auditit, turvet ja õppe kvaliteedi parandamist.