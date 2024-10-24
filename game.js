// DOM-Elemente auswählen
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Fragen-Array
let questions = [];
let jsonFiles = ["chirugie.json", "neurologieTeil2.json", "Orthopädie.json", "neurologieTeil3.json", "questions.json"];

// Konstanten
const Correct_Bonus = 5;
let Max_Questions = 15; // Standardmäßig auf 15 für Classic-Modus

// Spielmodus aus localStorage laden
let gameMode = localStorage.getItem('selectedGameMode');

// Spielmodi-Konfiguration basierend auf dem ausgewählten Modus
switch (gameMode) {
  case "classic":
    Max_Questions = 15; // Classic-Modus mit maximal 15 Fragen
    break;
  case "challenger":
    Max_Questions = 10;// Herausforderungsmodus mit 10 Fragen, als Beispiel
    break;
  case "endless":
    Max_Questions = Infinity; // Endlosmodus: keine Begrenzung
    break;
  case "querbeet":
    Max_Questions = 20; // Querbeet-Modus mit gemischten Kategorien, hier als Beispiel 20 Fragen
    break;
  default:
    Max_Questions = 15; // Standardwert falls kein Modus gewählt wurde
}

// JSON-Dateien laden und das Spiel starten
function loadQuestions() {
  if (gameMode === "endless" || gameMode === "querbeet") {
    // Für den Endless- oder Querbeet-Modus alle JSON-Dateien laden
    Promise.all(jsonFiles.map(file => fetch(file).then(res => res.json())))
        .then(loadedQuestionsArrays => {
          // Alle Fragen aus den verschiedenen Dateien kombinieren
          questions = loadedQuestionsArrays.flat();
          startGame(); // Start des Spiels nach dem Laden der Fragen
        })
        .catch(error => console.error("Fehler beim Laden der JSON-Dateien:", error));
  } else {
    // Falls ein anderer Modus nur eine Datei benötigt, hier Anpassungen vornehmen
    const jsonFile = localStorage.getItem('selectedJsonFile');
    fetch(jsonFile)
        .then(res => res.json())
        .then(loadedQuestions => {
          questions = loadedQuestions;
          startGame();
        })
        .catch(error => console.error("Fehler beim Laden der JSON-Datei:", error));
  }
}

// Spiel starten
function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions]; // Kopiere das Fragen-Array
  getNewQuestion();
}

// Zufällige Frage holen
function getNewQuestion() {
  if ((questionCounter >= Max_Questions && gameMode !== "endless") || availableQuestions.length === 0) {
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign("end.html"); // Spielende
  }

  questionCounter++;
  progressText.innerText = `Frage ${questionCounter}/${gameMode === "endless" ? "∞" : Max_Questions}`; // Frage anzeigen

  // Zufällige Frage auswählen
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  // Antworten in ein Array umwandeln
  const answerChoices = [
    currentQuestion.choice1,
    currentQuestion.choice2,
    currentQuestion.choice3,
    currentQuestion.choice4
  ];

  // Mische die Antworten
  shuffle(answerChoices);

  // Setze die gemischten Antworten und aktualisiere die Daten-Attribute
  choices.forEach((choice, index) => {
    choice.innerText = answerChoices[index]; // Setze die gemischten Antworten
    choice.dataset.number = index + 1; // Aktualisiere den Daten-Index

    // Setze das korrekte Attribut für die richtige Antwort
    if (answerChoices[index] === currentQuestion[`choice${currentQuestion.answer}`]) {
      choice.dataset.correct = "true"; // Setze korrektes Attribut
    } else {
      choice.dataset.correct = "false"; // Setze falsches Attribut
    }

    // Entferne vorherige Klassen, um Farben zurückzusetzen
    choice.classList.remove("correct", "incorrect");
  });

  // Frage aus Pool entfernen, um Wiederholung zu vermeiden
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswer = true;
}

// Funktion zum Mischen des Arrays
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Eventlistener für die Antwort-Buttons
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswer) return;
    acceptingAnswer = false;

    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    // Prüfe, ob die Antwort korrekt ist
    const isCorrect = selectedChoice.dataset.correct === "true";
    const classToApply = isCorrect ? "correct" : "incorrect";

    // Wenn die Antwort falsch ist, zeige die richtige Antwort
    if (!isCorrect) {
      const correctChoice = choices.find(choice => choice.dataset.correct === "true");
      correctChoice.classList.add("correct"); // Markiere die richtige Antwort
    }

    selectedChoice.parentElement.classList.add(classToApply); // Markiere die gewählte Antwort

    // Score erhöhen, wenn die Antwort korrekt ist
    if (isCorrect) {
      incrementScore(Correct_Bonus);
    }

    // Zeige das Feedback und gehe nach einer Sekunde zur nächsten Frage
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      choices.forEach(choice => {
        choice.classList.remove("correct", "incorrect"); // Entferne alle Klassen von den Antwortmöglichkeiten
      });
      getNewQuestion(); // Nächste Frage laden
    }, 1000);
  });
});

// Score erhöhen
function incrementScore(num) {
  score += num;
  scoreText.innerText = score; // Zeige den Score an
}

// Eventlistener für "Zur Kategorie"
document.getElementById("categoryButton").addEventListener("click", () => {
  window.location.href = "Category.html";
});

// Eventlistener für "Zur Startseite"
document.getElementById("homeButton").addEventListener("click", () => {
  window.location.href = "index.html";
});

// Fragen laden und das Spiel starten
loadQuestions();
