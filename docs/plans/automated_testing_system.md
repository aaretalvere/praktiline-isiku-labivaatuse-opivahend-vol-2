Automaatsete testide süsteem (pytest + CI)
Isiku läbivaatuse õpivahend

1. Eesmärk

Kirjeldada automaatse testimise ülesehitus, mis valideerib API, workflow, valideerimise, AI hoiatused ja ekspordi. Süsteem peab olema integreeritav CI toruga, et iga muudatus oleks kontrollitud.

2. Testistruktuur

Testid jaotatakse kolme tasemesse: unit, integration ja end-to-end. See tagab, et nii väiksemad komponendid kui ka kogu süsteem töötavad koos õigesti.

3. Näidis pytest test

Näide testist, mis kontrollib, et protokolli ei saa esitada ilma kohustuslike väljadeta.

def test_submit_without_required_fields(client):
    response = client.post("/api/v1/protocols/{id}/workflow/submit")
    assert response.status_code == 422

4. CI pipeline

CI peab jooksutama testid automaatselt iga commit'i ja pull request'i korral. See tagab, et süsteem ei lagune arenduse käigus.

name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - checkout
      - install dependencies
      - run tests

5. Kommentaarid

Automaatne testimine on vajalik, et tagada süsteemi stabiilsus, õiguslik korrektsus ja didaktiline usaldusväärsus. Ilma testideta võib süsteem hakata tootma valeid juhiseid või lubada vigaseid protokolle.