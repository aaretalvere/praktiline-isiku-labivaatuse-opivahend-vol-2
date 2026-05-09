Koodistruktuur ja arendusrepo skeleton
Tehniline tööplaan isiku läbivaatuse õpivahendi ning tulevaste õppemoodulite arenduseks


Dokument lähtub varasemalt kokku lepitud rolli-, oleku-, workflow- ja UI/UX orchestrationi põhimõtetest ning ametliku isiku läbivaatuse protokolli vormi struktuurist.
# 1. Eesmärk ja projekteerimispõhimõtted
Selle dokumendi eesmärk on viia eelnevad arhitektuuriotsused konkreetse koodibaasi ülesehituseni. Tulemus peab võimaldama esmalt valmis ehitada töötava õppemooduli süüteomenetluse tõendi kogumise kontekstis ning hiljem lisada uusi mooduleid, uusi rolle, teisi dokumente, 3D/VR liideseid ja väliseid integratsioone ilma tuumikut ümber kirjutamata.
• Backend on süsteemi tõeallikas: õigused, olekud, workflow, valideerimine, audit ja eksport peavad olema backendis.
• AI on eraldi juhendav kiht: ta ei tohi määrata õigusi, olekuid ega lõplikke menetluslikke otsuseid.
• 3D sisu, workflow ja esitlusliides peavad olema lahus: sama 3D vara peab olema kasutatav nii veebis kui ka hilisemas VR vaates.
• Õppemoodulid peavad olema registripõhised: isiku läbivaatuse moodul on esimene, mitte viimane moodul.
• Dokumendimallid peavad olema hallatavad eraldi: ametlik protokollivorm peab säilima süsteemis kontrollitud struktuurina.
# 2. Soovitatud repo strateegia
Parim lähtekoht on monorepo. See hoiab ühe koha peal nii backendi, frontendi, jagatud skeemid, moodulite registri kui ka infrastruktuuri. Kuna süsteem hakkab sisaldama mitut kasutajaliidest ja mitut laiendust, annab monorepo kõige puhtama arendusvoo.
• Ühine versioonihaldus ja branchimudel kogu platvormile.
• Jagatud tüübid, OpenAPI lepingud ja ühised reeglid on hallatavad ühest kohast.
• Moodulite ja pluginate lisamine ei tekita eraldi laiali valgunud repode hulka.
• Hiljem saab samas repos hoida ka VR kliendi või õpetaja vaate.
# 3. Monorepo kõrgtaseme struktuur
repo/
  apps/
    web-student/
    web-admin/
| web-teacher/ | # tulevane |
| --- | --- |
| vr-client/ | # tulevane |
| api/ |
| worker/ |
| packages/ |
| domain/ |
| workflow-engine/ |
| module-registry/ |
| protocol-templates/ |
| ai-contracts/ |
| ui-contracts/ |
| shared-types/ |
| shared-config/ |
| auth/ |
| validation/ |
| audit/ |
| docs-export/ |
| assets-3d/ |
| sdk/ |
| modules/ |
| personal-inspection/ |
| prison-search-training/ | # tulevane |
| public-order-observation/ | # tulevane |
| infra/ |
| docker/ |
| db/ |
| ci/ |
| monitoring/ |
| docs/ |
| architecture/ |
| api/ |
| modules/ |
| decisions/ |
| scripts/ |
| setup/ |
| migration/ |
| seed/ |
| qa/ |
| Selle jaotuse mõte on lihtne: rakendused on kasutajale nähtavad kliendid ja teenused; packages sisaldab tuumloogikat; modules sisaldab õppemoodulite konfiguratsiooni ja reegleid; infra kirjeldab käituskeskkonda; docs hoiab arhitektuuriotsused koos. |
| # 4. Apps kausta kirjeldus |

# 5. Packages kausta jaotus
## domain
Kirjeldab süsteemi põhiobjektid ja ärireeglite tuuma.
• User, Role, LearningModule, Scenario, Asset3D, ProtocolTemplate, ProtocolInstance, Attachment, AuditLog.
• Ei sisalda UI-koodi ega konkreetseid HTTP endpoint'e.
## workflow-engine
Viib sammupõhised workflow'd andmepõhiselt ellu.
• Loeb mooduli sammud registrist.
• Kontrollib eeltingimusi, järgmisi samme, valideerimisreegleid ja olekuüleminekuid.
## module-registry
Hoiab moodulite manifestid, lubatud rollid, sammud, dokumentimallid ja adapteriseosed.
• Esimene kanne on personal-inspection.
• Hiljem lisanduvad prison-search-training ja public-order-observation.
## protocol-templates
Sisaldab ametlike dokumentide digitaalsed mallid, väljardefinitsioonid ja ekspordikaardistused.
• Ametlik protokolli struktuur peab olema siin kontrollitult hallatav.
## validation
Formaalsed kontrollreeglid, tingimuslikud väljad, järeldusliku sõnastuse hoiatustriggerid.
• Backend validator ja AI hoiatusreeglid lähtuvad samadest lähtereglitest.
## ai-contracts
AI assistendi süsteemipromptid, sammupõhised juhised ja JSON-vastuse skeemid.
• AI käitumine peab olema eraldi versioonitav.
## ui-contracts
UI/UX orchestrationi kirjeldused ja vaadete lubatud tegevused.
• Aitab hoida web-student, web-admin ja hiljem vr-client loogiliselt kooskõlas.
## docs-export
DOCX/PDF loomine, lõppdokumendi koostamine, ekspordifailide metaandmed.
• Valmis protokoll peab olema eksportitav kontrollitud kujul.
## assets-3d
3D varade metaandmed, formaadid, võimekused ja adapteriliidesed.
• Veebivaade ja VR vaade tarbivad sama asset API-t.
## audit
Auditilogid, sündmused, logimise poliitikad.
• Kasutatakse nii õppija kui admini tegevuste jälgimisel.
# 6. Mooduli kausta soovitatud sisemine struktuur
modules/
  personal-inspection/
    module.json
    roles.json
    workflows/
      protocol-workflow.json
      admin-workflow.json
    templates/
      personal-inspection-protocol.template.json
      export-map.json
    validation/
      required-fields.json
      warning-rules.json
    ai/
      assistant-system.txt
      step-guidance/
        01-model-selection.txt
        02-metadata.txt
        ...
    ui/
      view-map.json
      actions.json
    assets/
      categories.json
      demo-seeds.json
Selle lahenduse tugevus on see, et moodul ei ole backendi koodi sisse kõvasti sisse ehitatud. Mooduli manifest määrab, millised workflow'd, mallid, rollid, hoiatustekstid ja vaated sellele moodulile rakenduvad.
# 7. API rakenduse soovitatud kaustastruktuur
apps/api/
  src/
    main.py
    config/
    api/
      routers/
        auth.py
        users.py
        modules.py
        models.py
        protocols.py
        workflow.py
        exports.py
        ai.py
        audit.py
    services/
      auth_service.py
      module_service.py
      model_service.py
      protocol_service.py
      workflow_service.py
      export_service.py
      ai_service.py
      audit_service.py
    domain_adapters/
    repositories/
    schemas/
    db/
      models/
      migrations/
      seed/
    security/
    tests/
Oluline põhimõte: routers võtab HTTP päringud vastu, services teostab rakendusloogika, repositories suhtleb andmebaasiga, schemas kirjeldab sisend/väljund lepingud. Workflow teenus peab tarbima module-registry ja protocol-templates pakette, mitte hoidma reegleid ise dubleeritult.
# 8. Frontendi rakenduste soovitatud struktuur
apps/web-student/
  src/
    app/
    pages/
    modules/
      personal-inspection/
        views/
        components/
        hooks/
        api/
    shared/
      layout/
      auth/
      forms/
      viewer/
      state/
      utils/
    tests/

apps/web-admin/
  src/
    app/
    pages/
    modules/
      personal-inspection/
        model-management/
        protocol-management/
        user-management/
        logs/
    shared/
      layout/
      auth/
      tables/
      forms/
      utils/
    tests/
Frontendis tasub eelistada moodulipõhist vaadete paigutust. See teeb hilisema õpetaja vaate või uue mooduli lisamise lihtsaks ning hoiab isiku läbivaatuse kliendikomponendid koos.
# 9. Kriitilised jagatud lepingud
• shared-types: jagatud DTO-d, enumid, olekud, rollid, event tüübid.
• OpenAPI või sellest genereeritud kliendid: frontend ja VR klient peavad tarbima sama lepingut.
• workflow step contract: step_key, title, required_fields, validators, next_rules, allowed_actions.
• module manifest contract: module_key, supported_roles, workflows, templates, ui_map, ai_contracts.
• asset contract: asset_id, format, capabilities, layers, poses, preview, source.
# 10. Infrastruktuuri ja DevOps-i skeleton
infra/
  docker/
    api.Dockerfile
    web-student.Dockerfile
    web-admin.Dockerfile
    worker.Dockerfile
    compose.dev.yml
  db/
    migrations/
    init/
  ci/
    github-actions/
      lint.yml
      test.yml
      build.yml
      release.yml
  monitoring/
    logging/
    metrics/
    tracing/
Arendusalguses piisab Docker Compose'ist, kuid kaustastruktuur tuleks teha kohe selline, et hiljem saab minna konteinerorkestratsiooni või pilveplatvormi peale ilma repo loogikat muutmata.
# 11. Testimise ja kvaliteedi skeleton
• Unit testid packages tasemel: validatorid, workflow reeglid, mooduliregister, dokumendikaardistused.
• API integratsioonitestid: autentimine, protokolli loomine, sammu salvestamine, esitamine, lukustamine.
• Frontend E2E testid: mudeli valik, protokolli täitmine, jätkamine, allalaadimine.
• Dokumendi regressioonikontroll: ekspordi väljund peab vastama mallile.
• Audititestid: kriitilised adminitoimingud peavad alati logisse jõudma.
# 12. Soovitatud branch- ja release-mudel
• main - tootmisvalmis haru.
• develop - koondharu aktiivseks arenduseks, kui meeskond on suurem.
• feature/* - mooduli, teenuse või vaate põhine arendusharu.
• release/* - vajadusel stabiilse väljalaske ettevalmistus.
• Iga mooduli struktuurimuudatus peab käima koos docs/decisions kirje või ADR dokumendiga.
# 13. Soovitatud arendusjärjekord repo skeletoni loomiseks

# 14. Tulevikulaienduste valmidus
• Õpetaja roll lisandub eraldi web-teacher rakendusena või õpetaja moodulina olemasolevas admin kliendis.
• Vanglateenistuse ja korrakaitsepolitsei õppematerjalid lisanduvad uute moodulitena modules kausta, mitte uue tuumikuna.
• VR klient peab kasutama sama module-registry registrit, sama asset contract'it ja sama workflow API-t.
• Kui tulevikus lisandub sisuline õppetagasiside, tuleb see eraldada AI feedback mooduliks, mitte segada protokolli põhivalidaatoriga.
# 15. Esimese päris koodisprindi soovitatud backlog
• Luua monorepo skeleton ja CI lint/test toru.
• Luua api teenuse tervisekontroll, autentimise raam ja põhikonfiguratsioon.
• Luua personal-inspection mooduli manifest ja workflow fail.
• Luua protokolli andmemudel ja migratsioonid.
• Luua web-student avaleht, autentimine ja mooduli avamine.
• Luua üks otselõikeline API rada: loo protokoll -> salvesta samm -> lae protokoll tagasi.
• Luua web-admin minimaalne mudelihalduse ja protokollivaate skeleton.
# 16. Kokkuvõte
Õige koodistruktuuri eesmärk ei ole üksnes praeguse isiku läbivaatuse õppematerjali valmimine. Eesmärk on ehitada platvorm, mille esimene töötav moodul lahendab praeguse õppevajaduse, kuid mille sees on juba olemas kohad uutele dokumentidele, uutele rollidele, uutele õppestsenaariumidele, uutele liidestele ja VR kasutusele. Sellepärast peab repo skeleton olema algusest peale moodulipõhine, teenuste kaupa lahutatud ja registripõhine.