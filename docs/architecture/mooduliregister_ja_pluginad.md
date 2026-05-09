Mooduliregister ja pluginate kirjeldus
Laiendatavuse raamistik, mille abil lisada uusi õppematerjale, rolle, kuvamisliideseid ja 3D/VR adaptereid.


# 1. Põhimõte
Õppematerjal kirjeldatakse moodulina, mitte kõvakodeeritud erijuhuna.
Iga moodul kasutab sama tuumikut: kasutajad, õigused, workflow mootor, 3D varad, AI teenus, eksport.
Moodul võib lisada oma protokollimalli, sammud, valideerimisreeglid, AI juhiste komplekti ja kuvamisadapterid.
# 2. Mooduliregistri struktuur

# 3. Mooduli koostisosad

# 4. Pluginate tüübid

# 5. Esimene aktiivne moodul
Kood: personal_search_ee
Valdkond: süüteomenetluses tõendi kogumise õppematerjal
Vormi alus: isiku läbivaatuse protokoll
Vajalikud pluginad: workflow, validation, ai, export, web viewer
# 6. Tulevikumoodulid

# 7. Viewer adapteri põhimõte
3D vara ja selle metaandmed on tuumikandmetes.
Viewer plugin otsustab, kuidas sama vara kuvatakse.
web_viewer kasutab hiirt ja tavaliidest; vr_viewer kasutab ruumilist interaktsiooni, kuid sama asset_id ja capabilities infot.
Seega VR ei vaja uut andmemudelit, vaid uut adapterit ja uut kliendirakendust.
# 8. Mooduli registri soovituslik JSON skeem
{
  "code": "personal_search_ee",
  "type": "protocol_based",
  "version": "1.0.0",
  "capabilities": ["3d_viewer", "attachments", "ai_guidance", "doc_export"],
  "plugins": {
    "workflow": "personal_search_workflow_v1",
    "validation": ["required_fields_v1", "non_inferential_language_v1"],
    "viewer": ["web_viewer_v1"],
    "ai": ["guidance_v1", "field_help_v1"],
    "export": ["protocol_docx_export_v1", "protocol_pdf_export_v1"]
  }
}
# 9. Mooduli laadimise loogika
Kasutaja valib või süsteem määrab aktiivse mooduli.
Backend loeb mooduli registrist lubatud pluginad ja seaded.
Frontend küsib moodulilt nähtavad vaated, sammud ja lubatud tegevused.
AI teenus saab igas päringus kaasa mooduli koodi, sammu võtme ja rolli.
# 10. Laiendatavuse kontrollnimekiri
Kas uus õppemoodul saab kasutada olemasolevat auth ja audit kihti?
Kas uus moodul saab lisanduda uue workflow plugina kaudu?
Kas uus viewer saab kasutada sama asset registryt?
Kas uus AI moodul kasutab sama ai_interactions logimist?
Kas eksport jääb eraldi pluginaks, mitte workflow koodi osaks?
# 11. Rakenduslik soovitus
V1-s ei ole vaja teha tehniliselt keerukat dünaamilist pluginate mootorit. Piisab sellest, et mooduliregister, workflow definitsioonid, valideerimisreeglid ja viewer-adapterid on koodis selgelt lahutatud ning kasutavad ühtseid liideseid. Kui platvorm töötab mitme mooduliga, saab need hiljem tõsta konfiguratsiooni- või registripõhiseks.