// Speichert die ausgewählte Kategorie im localStorage
function selectCategory(category) {
    let jsonFile;

    switch (category) {
        case 'Neurologie Teil 1':
            jsonFile = 'questions.json';
            break;
        case 'Neurologie Teil 2':
            jsonFile = 'neurologieTeil2.json'; // Neue JSON-Datei für Neurologie Teil 2
            break;
        case 'Neurologie Teil 3':
            jsonFile = 'neurologieTeil3.json';
            break;
        case 'Muskeltonusstörungen':
            jsonFile = 'muskeltonus.json';
            break;
        case 'Bewusstseinsstörungen':
            jsonFile = 'bewusstseinsstoerungen.json';
            break;
        case 'Neuropsychologische Syndrome':
            jsonFile = 'neuropsychologie.json';
            break;
        case 'Sensibilitätsstörungen':
            jsonFile = 'sensibilitaetsstoerungen.json';
            break;
        default:
            console.error("Kategorie nicht gefunden");
            return;
    }

    // Speichere die ausgewählte JSON-Datei im localStorage
    localStorage.setItem('selectedJsonFile', jsonFile);

    // Weiterleitung zur Spielseite
    window.location.href = 'GAME.html';
}
