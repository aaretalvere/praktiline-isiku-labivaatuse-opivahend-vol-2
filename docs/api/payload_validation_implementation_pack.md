Payload + Validation Implementation Pack
Production-taseme ehitusetapi dokumentatsioon ja lähtekoodi alus
# Etapi eesmärk
Selles etapis viiakse starter-repo protokolli tuum reaalselt kasutatavasse seisu. Ehituse keskmes on kolm kihti: payload-skeem, valideerimisreeglid ja workflow-ga seotud API endpointid. Süsteemi tõeallikaks jääb backend; AI kiht lisandub hiljem juhendava teenusena.
# Peamised ehitustulemused
Ühtne ProtocolPayload skeem, mis katab ametliku isiku läbivaatuse protokolli plokid.
Field-level, step-level ja submission-level validatorid.
Hoiatusreeglid järeldusliku keele tuvastamiseks kirjeldusväljades.
API endpointid payloadi salvestamiseks, sammu valideerimiseks ja järgmisse sammu liikumiseks.
Autosave jaoks sobiv andmestruktuur ja state-aware update loogika.
Read-only locked-protokolli jaoks vajalikud piirangud backendis.
# Tööpaketid

# Payload-struktuur
Soovitatud payloadi juurstruktuur:

# Valideerimisreeglid
Required: väli peab olema olemas ja tühjaväärtus ei ole lubatud.
Conditional required: väli muutub kohustuslikuks sõltuvalt mõnest teisest väljast või lipust.
Warning: kasutaja võib edasi liikuda, kuid süsteem annab hoiatuse.
Inference-check: kirjeldusväljades tuvastatakse võimalik järelduslik või hüpoteetiline keel.
Submission validation: enne esitamist tehakse kogu payloadi täielik kontroll.
# Olulised otsustusreeglid
Isikuandmete plokis peab olemas olema vähemalt üks väljadest personal_id_code või birth_date.
Tehnikavahendi plokis muutuvad väljad tool_type ja tool_brand kohustuslikuks ainult siis, kui used_tools = true.
Tõlgi plokk on kohustuslik ainult siis, kui translator_present = true.
Kirjeldusväljades ei tohi süsteem teksti automaatselt ümber kirjutada; lubatud on ainult hoiatus.
Locked olekus protokolli ei tohi muuta ühegi save endpointi kaudu.
Aktiivse protokolli puhul ei tohi luua uut protokolli enne, kui olemasolev ei ole lõpetatud või arhiveeritud.
# API endpointid selles etapis

# Lähtekoodipaketi sisu
Pydantic / DTO skeemid protokolli plokkidele.
Validatorite teek required, conditional ja warning kontrollide jaoks.
Inference-check utiliit tüüpsõnade põhjal.
Protocol service näidisfunktsioonid: save_payload, validate_step, move_next, submit_protocol.
FastAPI router payload- ja validation-endpointidega.
Lihtsad testid validatorite ja teenuse põhifunktsioonide jaoks.
# Definition of Done
Payload skeem katab kõik ametliku vormi plokid.
Step validation töötab vähemalt põhisammudel.
Submit endpoint blokeerib esitamist, kui payload on puudulik.
Locked protokolli ei saa muuta backendi kaudu.
Copy endpoint loob uue draft-protokolli.
Etapi kohta on koostatud dokumentatsioon DOCX ja PDF formaadis.