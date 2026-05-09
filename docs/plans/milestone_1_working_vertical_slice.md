# Milestone 1: esimene töötav vertikaallõik

Kuupäev: 2026-04-10

## Eesmärk

Selle milestone'i eesmärk oli saada tööle esimene otsast lõpuni kasutusvoog, mis tõestab, et platvormi põhituum toimib:

- frontend töötab
- backend töötab
- andmebaas töötab
- moodul loetakse manifestist
- protokolli saab luua
- sammudes saab edasi ja tagasi liikuda
- kohustuslike väljade kontroll toimub serveris

## Mis on valmis

### 1. Arenduskeskkond

Töötav keskkond sai käima `GitHub Codespaces` sees.

Kinnitatud on:

- `Next.js` frontend käivitub
- `FastAPI` backend käivitub
- `PostgreSQL` jookseb `docker compose` kaudu
- Alembicu migratsioonid rakenduvad
- frontend ja backend suhtlevad läbi proxydatud `/api/v1` tee

### 2. Moodulipõhine workflow alus

Esimese õppemooduli manifest sisaldab nüüd:

- sammude loendit
- sammude pealkirju ja kirjeldusi
- sammupõhiseid välju
- kohustuslike väljade märgistust

See võimaldab vormi ja workflow'd käsitleda konfiguratsioonipõhiselt, mitte ainult käsitsi koodi sisse kirjutatuna.

### 3. Backendi protokollivoo tuum

Töötab järgmine:

- protokolli loomine
- protokolli pärimine
- sammu andmete salvestamine
- järgmisele sammule liikumine
- eelmisele sammule liikumine
- sammupõhine valideerimine
- review-summary koostamine

### 4. Frontendi minimaalne õppija vaade

Töötab järgmine:

- API tervise kontroll
- moodulite laadimine
- uue protokolli loomine
- aktiivse sammu väljade kuvamine
- sammu salvestamine
- edasi-tagasi liikumine
- review kokkuvõtte kuvamine

## Kinnitatud käsitsi testid

Codespacesis kontrolliti käsitsi järgmised stsenaariumid:

1. frontend avaneb brauseris
2. backend vastab `health` päringule
3. moodulid tagastatakse API-st
4. protokolli loomine töötab
5. esimese sammu andmed kuvatakse
6. järgmisele sammule liikumine töötab
7. kohustuslikud väljad blokeerivad edasi liikumise
8. eelmisele sammule liikumine töötab

## Tehnilised märkused

### 1. Codespaces-spetsiifiline proxy

Codespacesi brauserivaates ei töötanud frontend usaldusväärselt otse `localhost:8000` aadressiga. Selle tõttu lisati:

- `apps/web/lib/api.ts` kasutama suhtelist baasteed `/api/v1`
- `apps/web/next.config.js` rewrite seadistus
- `apps/web/app/api/v1/[...path]/route.ts` proxy route

See oli vajalik, et frontend ja backend suhtleksid brauseris stabiilselt.

### 2. Python moodulitee

Alembicu ja API käivitamisel oli vajalik määrata `PYTHONPATH`, et `src` moodul leitaks õigesti.

### 3. GitHubi veebiuploadi piirangud

Arenduse käigus selgus, et:

- tühjad kaustad ei lähe GitHubi veebiuploaderiga üles
- genereeritud failid tuli `.gitignore` abil välja jätta
- Codespacesis tehtud muudatused tuli eraldi commit'i ja pushiga GitHubi salvestada

## Mis on veel puudu

See milestone ei tähenda veel valmis toodet. Puudu on vähemalt:

- auditilogid
- päris kasutajate ja õiguste mudel
- DOCX/PDF eksport
- sisukam review vaade
- sisendandmete parem UX ja eestikeelne viimistlus
- automaattestid
- 3D viewer sidumine päris andmetega
- AI juhendav kiht

## Järgmine soovitatud arendusblokk

Järgmine mõistlik samm on ehitada Milestone 2, mille keskmes on töökindlam protokollivoo tuum.

Soovituslik fookus:

1. auditilogid protokolli loomisele, salvestusele ja sammumuutusele
2. review vaate parandamine ja puuduvate väljade selgem UX
3. andmemudeli täpsustamine protokolli sammude jaoks
4. esimesed automaattestid backend workflow jaoks

## Kokkuvõte

Milestone 1 eesmärk sai täidetud. Platvormi esimene töötav vertikaallõik on olemas ja kinnitatud käsitsi testidega. See annab tugeva aluse järgmisteks arendusetappideks, sest nüüd on olemas toimiv ühendus kasutajaliidese, API, andmebaasi ja moodulipõhise workflow vahel.
