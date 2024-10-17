const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

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

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswer = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswer) return;
        acceptingAnswer = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
            parseInt(selectedAnswer) === currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(Correct_Bonus);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
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
