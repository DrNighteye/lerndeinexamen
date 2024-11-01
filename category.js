function selectCategory(category) {
  let jsonFile;

  switch (category) {
    case 'Neurologie Teil 1':
      jsonFile = 'neurologieTeil1.json';
      break;
    case 'Neurologie Teil 2':
      jsonFile = 'neurologieTeil2.json';
      break;
    case 'Neurologie Teil 3':
      jsonFile = 'neurologieTeil3.json';
      break;
    case 'Orthopädie':
      jsonFile = 'Orthopädie.json';
      break;
    case 'Chirurgie': // Korrigierte Schreibweise
      jsonFile = 'Chirurgie.json';
      break;
    case 'Kardiologie':
      jsonFile = 'Kardiologie.json'; // Hier ist der richtige Dateiname
      break;
    case 'Sensibilitätsstörungen':
      jsonFile = 'sensibilitaetsstoerungen.json';
      break;
    case 'Geriatrie':
      jsonFile = 'geriatrie.json';
      break;
    case 'Psychiatrie':
      jsonFile = 'psychiatrie.json';
      break;
    case 'Pädiatrie':
      jsonFile = 'paediatrie.json';
      break;
    case 'Weitere SKL Fächer':
      jsonFile = 'weitereSklFaecher.json';
      break;
    default:
      console.error("Kategorie nicht gefunden:", category);
      return;
  }

  console.log("Ausgewählte JSON-Datei für Kategorie:", category, "->", jsonFile);

  // Speichere die ausgewählte JSON-Datei im localStorage
  localStorage.setItem('selectedJsonFile', jsonFile);

  // Weiterleitung zur Spielseite
  window.location.href = 'GAME.html';
}
