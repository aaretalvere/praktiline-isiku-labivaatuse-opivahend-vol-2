Andmebaasi skeem v1
Õppeplatvormi tuumikskeem, mis toetab isiku läbivaatuse õppematerjali ja hilisemaid laiendusi.


# 1. Modelleerimise põhimõtted
Äriloogika tuum on moodulipõhine: üks platvorm, mitu õppemoodulit.
Protokolli mall ja protokolli instants tuleb hoida eraldi.
3D vara, workflow ja esitlusliides peavad olema lahus.
Auditilogid tuleb siduda kõigi kriitiliste toimingutega.
AI interaktsioonid salvestatakse eraldi, et hilisem analüüs ja kvaliteedikontroll oleks võimalik.
# 2. Põhiobjektid

# 3. Tuumtabelid ja väljad
## 3.1 Users

## 3.2 Roles ja moodulipõhised õigused

## 3.3 Learning modules

## 3.4 Assets 3D

## 3.5 Protocol templates ja sammud

## 3.6 Protocol instances

## 3.7 Protocol values ja lisad

## 3.8 Audit ja AI

# 4. Seoste põhimudel
Ühel kasutajal võib olla mitu protokolli, kuid ainult üks aktiivne protokoll mooduli piires.
Üks protokolli instants on seotud ühe malliga ja ühe 3D varaga.
Üks moodul võib sisaldada mitut stsenaariumi, mitut malli ja mitut 3D vara.
Rollid on globaalsed, kuid õigusi saab täpsustada moodulipõhiselt.
# 5. Normaliseerimise ja laiendatavuse otsused
Protocol values on paindlik tabel, sest tulevikus lisanduvad uued vormid ja väljad.
Template JSON ja rules JSON ei asenda tuumikloogikat, vaid toetavad andmepõhist workflow'd.
VR tugi lisatakse assets_3d.capabilities_json ja eraldi viewer-adapteri kaudu, mitte uue andmemudeli ümberkirjutusega.
Kui hiljem lisandub õpetaja roll, pole vaja users tabelit muuta; piisab rollide ja mooduliõiguste laiendamisest.
# 6. V1 indekseerimise soovitus
users(email) unique
protocol_instances(user_id, state)
protocol_instances(module_id, state)
assets_3d(module_id, state)
audit_logs(target_type, target_id, created_at)
protocol_values(protocol_instance_id, field_key)
# 7. Migratsioonijärjekord
1. roles, users, learning_modules
2. assets_3d, scenarios
3. protocol_templates, protocol_template_steps
4. protocol_instances, protocol_values, protocol_attachments
5. audit_logs, ai_interactions, user_module_permissions