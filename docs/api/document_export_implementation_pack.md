Järgmine ehitusetapp: dokumendiekspordi kiht (DOCX + PDF)
Production-taseme tegevusplaan, tööpaketid, väljundmudel ja koodipaketi skeleton
Selle etapi eesmärk on realiseerida dokumendiekspordi kiht nii, et süsteemi payload teisendatakse ametlikule isiku läbivaatuse protokolli vormile vastavaks väljundiks. Etapi tulemusel peab backend suutma luua DOCX-väljundi, valmistada ette PDF-väljundi ning pakkuda kasutajale locked-protokolli allalaadimist kontrollitud ja jälgitaval kujul.
# 1. Etapi tööpaketid
# 2. Payload -> vormi mapping
# 3. API endpointid
# 4. Tehniline ehitusjärjekord
Defineeri export context service ja fikseeritud render model.
Loo export_files tabel ning registry service.
Lisa DOCX export service ja selle template-fill skeleton.
Lisa PDF pipeline skeleton.
Lisa protocol export endpointid ja owner/admin kontrollid.
Seo export_created ja export_downloaded sündmused auditilogidega.
Valmista ette frontend vaade eksporditud failide kuvamiseks.
# 5. Riskid ja kontrollpunktid
Payloadi ja ametliku vormi väljade vahel ei tohi olla nimetuste triivi. Selle vältimiseks kasutatakse ühte fikseeritud export context skeemi.
DOCX template ei tohi olla käsitsi muudetav viisil, mis rikub mappingu. Malli versioon tuleb lukustada ja versioneerida.
PDF väljund ei tohi sõltuda ainult kasutajaliidese HTML-st. Väljund tekib kontrollitud serveripoolsest voost.
Locked protokolli eksport ei tohi kasutada reaalajas muudetavat payloadi. Aluseks võetakse kontrollitud readonly/export context.
Ekspordiõigused ei tohi põhineda ainult failinimel või URL-il. Allalaadimine kontrollib owner/admin õigusi iga päringu ajal.
# 6. Definition of Done
Export context service loob ühtse render model struktuuri.
DOCX generaator suudab luua vähemalt ühe korrektse protokollifaili.
PDF voog on dokumenteeritud ja skeleton-realiseeritud.
Ekspordifaili metaandmed salvestatakse süsteemis.
Export endpointid kontrollivad owner/admin õigusi.
Auditilogid salvestavad vähemalt export_created ja export_downloaded sündmused.
Etapi kohta on loodud DOCX, PDF ja koodipaketi ZIP.
# 7. Koodipaketi sisu
apps/api/src/services/export_context_service.py
apps/api/src/services/docx_export_service.py
apps/api/src/services/pdf_export_service.py
apps/api/src/services/export_registry_service.py
apps/api/src/api/v1/routes/protocol_exports.py
apps/api/src/models/export_file.py
modules/isiku-labivaatus/export_mapping.json
apps/web/src/app/protocol/[id]/exports/page.tsx
apps/api/tests/test_export_context.py