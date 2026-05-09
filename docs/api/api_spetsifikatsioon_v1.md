API spetsifikatsioon v1
Õppeplatvormi rakendusliidese kirjeldus, mis toetab veebiklienti, hilisemaid liideseid ja moodulipõhist laiendamist.


# 1. API disaini põhimõtted
REST API on v1 jaoks kõige selgem ja arendajale kõige paremini hallatav valik.
Kõik vastused peavad kandma mooduli- ja kasutajakonteksti.
Workflow kontroll peab toimuma serveris.
AI teenus kutsutakse välja eraldi API teenuse kaudu; see ei kirjuta otse andmebaasi.
Hiljem võib lisada WebSocketi või event API VR ja reaalaja juhendamise jaoks.
# 2. Ressursid

# 3. Auth API

Soovituslik auth vastus sisaldab vähemalt: user, global_role, module_permissions, active_module_context.
# 4. Modules ja assets API

# 5. Protokollide API

# 6. Workflow API

# 7. Admin API

# 8. AI API

# 9. Soovituslikud request/response põhimustrid
## 9.1 Protokolli loomine
Request: moduleId, templateId, asset3dId
Response: protocolId, state, currentStepKey, allowedActions, nextView
## 9.2 Sammu salvestamine
Request: stepKey, payload, autosave=true|false
Response: validationSummary, savedAt, currentState, nextAllowedActions
## 9.3 Ülevaade
Response peab koondama puuduvad väljad, blokeerivad vead, hoiatused ja esitatava dokumendivaate.
# 10. Veakoodid ja standardvastused

# 11. Versioneerimine ja integratsioonid
Kõik endpointid tuleb versioonida prefiksiga /api/v1/.
VR klient või muu tulevane liides kasutab sama workflow API-d, mitte eraldi äriloogikat.
Kui hiljem lisandub õppeinfosüsteemi või identiteedihalduse liides, lisatakse see auth- ja user-teenuste taha adapterina.