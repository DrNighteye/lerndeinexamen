const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const nextButton = document.createElement("button"); // Button für die nächste Frage

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Fragen-Array
let questions = [];

// Hole die JSON-Datei aus dem localStorage
const jsonFile = localStorage.getItem('selectedJsonFile');

// JSON-Datei laden und das Spiel starten
fetch(jsonFile)
  .then(res => res.json())
  .then(loadedQuestions => {
    questions = loadedQuestions;
    startGame();
  })
  .catch((error) => {
    console.error("Fehler beim Laden der JSON-Datei:", error);
  });

// Konstanten
const Correct_Bonus = 5;
const Max_Questions = 15;

// Spiel starten
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = getRandomQuestion(questions, Max_Questions);
  getNewQuestion();
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getRandomQuestion(questionsArray, num) {
  const shuffled = [...questionsArray].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, num);
}

// Neue Frage holen
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= Max_Questions) {
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign("end.html");
  }

  questionCounter++;
  progressText.innerText = `Frage ${questionCounter}/${Max_Questions}`;
  progressBarFull.style.width = `${(questionCounter / Max_Questions) * 100}%`;

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

  // Füge die korrekte Antwort auch zum Antwort-Array hinzu
  const correctAnswerIndex = currentQuestion.answer; // Korrekter Index
  shuffle(answerChoices); // Mische die Antworten

  choices.forEach((choice, index) => {
    choice.innerText = answerChoices[index]; // Setze die gemischten Antworten
    choice.dataset.number = index + 1; // Aktualisiere den Daten-Index

    // Finde die neue Position der korrekten Antwort
    if (answerChoices[index] === currentQuestion[`choice${correctAnswerIndex}`]) {
      choice.dataset.correct = "true"; // Setze Attribut für die korrekte Antwort
    } else {
      choice.dataset.correct = "false"; // Setze Attribut für falsche Antworten
    }

    choice.classList.remove("correct", "incorrect"); // Entferne vorherige Klassen
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswer = true;

  // Entferne den "Weiter" Button, falls vorhanden
  if (nextButton.parentElement) {
    nextButton.parentElement.removeChild(nextButton);
  }
};

// Eventlistener für die Auswahl der Antworten
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswer) return;
    acceptingAnswer = false;

    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply = selectedChoice.dataset.correct === "true" ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(Correct_Bonus);
    } else {
      // Zeige die richtige Antwort an
      const correctChoice = choices.find(choice => choice.dataset.correct === "true");
      correctChoice.classList.add("correct"); // Markiere die richtige Antwort
    }

    selectedChoice.parentElement.classList.add(classToApply);

    // Füge den "Weiter" Button hinzu
    nextButton.innerText = "Weiter";
    nextButton.classList.add("btn"); // Klasse für den Button hinzufügen
    nextButton.style.marginTop = "20px"; // Abstand hinzufügen
    nextButton.style.width = "20rem"; // Gleiche Breite wie andere Buttons
    nextButton.style.fontSize = "2rem"; // Gleiche Schriftgröße wie andere Buttons

    // Zentriere den Button
    nextButton.style.display = "block"; // Button als Block-Element anzeigen
    nextButton.style.marginLeft = "auto"; // Links automatisch
    nextButton.style.marginRight = "auto"; // Rechts automatisch
    selectedChoice.parentElement.appendChild(nextButton);

    // Event Listener für den "Weiter" Button
    nextButton.addEventListener("click", () => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    });
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

// Eventlistener für "Zur Kategorie"
document.getElementById("categoryButton").addEventListener("click", () => {
  window.location.href = "category.html";
});

// Eventlistener für "Zur Startseite"
document.getElementById("homeButton").addEventListener("click", () => {
  window.location.href = "index.html";
});
