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
let wrongAnswers = 0; // Zählt die falschen Antworten

// Fragen-Array
let questions = [];

// Konstanten
const Correct_Bonus = 5;
let Max_Questions = 20; // Standardmäßig auf 20 für den Querbeet-Modus

// Spielmodus und Kategorie aus localStorage laden
let gameMode = localStorage.getItem('selectedGameMode');
let selectedJsonFile = localStorage.getItem('selectedJsonFile');

// Überprüfen, ob eine Kategorie und ein Spielmodus ausgewählt wurden
if (!selectedJsonFile || !gameMode) {
  alert("Bitte wähle zuerst eine Kategorie und dann einen Spielmodus.");
  window.location.href = "Category.html"; // Zurück zur Kategoriewahl
}

// Spielmodi-Konfiguration basierend auf dem ausgewählten Modus
switch (gameMode) {
  case "classic":
    Max_Questions = 15;
    break;
  case "challenger":
    Max_Questions = 50; // Herausforderungsmodus
    break;
  case "endless":
    Max_Questions = Infinity; // Endlosmodus: keine Begrenzung
    break;
  case "querbeet":
    Max_Questions = 20; // Querbeet-Modus
    break;
  default:
    Max_Questions = 15; // Standardwert falls kein Modus gewählt wurde
}

function loadQuestions() {
  // Lade die Fragen aus der ausgewählten JSON-Datei
  fetch(selectedJsonFile)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Fehler beim Laden von ${selectedJsonFile}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(loadedQuestions => {
        questions = loadedQuestions;
        console.log("Geladene Fragen:", questions); // Debugging-Log
        startGame();
      })
      .catch(error => console.error("Fehler beim Laden der JSON-Datei:", error));
}

// Spiel starten
function startGame() {
  questionCounter = 0;
  score = 0;
  wrongAnswers = 0;
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

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswer) return;
    acceptingAnswer = false;

    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    // Prüfe, ob die Antwort korrekt ist
    const isCorrect = selectedChoice.dataset.correct === "true";
    const classToApply = isCorrect ? "correct" : "incorrect";

    if (!isCorrect) {
      wrongAnswers++; // Zählt die Fehlversuche

      // Wenn die Antwort falsch ist, zeige die richtige Antwort
      const correctChoice = choices.find(choice => choice.dataset.correct === "true");
      correctChoice.classList.add("correct"); // Markiere die richtige Antwort

      // Überprüfe, ob 3 falsche Antworten gegeben wurden
      if (gameMode === "challenger" && wrongAnswers >= 3) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("end.html"); // Spielende bei 3 Fehlern im Herausforderungsmodus
      }
    }

    selectedChoice.parentElement.classList.add(classToApply);

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
