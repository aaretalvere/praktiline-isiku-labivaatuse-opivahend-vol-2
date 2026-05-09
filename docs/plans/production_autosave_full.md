Production Etapp: Autosave, Audit, Role, Read-only, Copy-flow, Export Context
# Eesmärk
Luua täielik ja tootmiskõlbulik protokolli töövoog, mis toetab autosave’i, taastamist, auditilogimist, rangeid õiguste kontrolle, lukustatud olekut ning dokumendieksporti ettevalmistavat andmemudelit.
# Detailne funktsionaalne ulatus
Autosave: iga sammu muutus salvestatakse automaatselt
Resume: kasutaja saab jätkata viimasest sammust
Auditilogid: kõik tegevused logitakse
Role/owner kontroll: ainult omanik või admin pääseb ligi
Locked olek: protokolli ei saa muuta
Copy-flow: locked protokollist luuakse uus draft
Export context: payload kaardistatakse dokumendiväljundiks
# API endpointid
# Definition of Done
Autosave töötab iga sammu järel
Resume taastab korrektse oleku
Auditilogid tekivad
Locked ei ole muudetav
Copy-flow töötab
Export context valmis