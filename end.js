const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || []; // Setze Default-Wert auf leeres Array
const Max_High_Scores = 5; // Korrektur des Tippfehlers
console.log(highScores);

finalScore.innerText = `Dein Score: ${mostRecentScore}`; // Text aktualisieren

// Event Listener für die Eingabe des Benutzernamens
username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value; // Button aktivieren, wenn ein Benutzername eingegeben wird
});

// Funktion zum Speichern des Scores
const saveHighScore = (e) => {
    console.log("Clicked the save BTN!"); // Debugging-Zweck
    e.preventDefault(); // Verhindert das Standardverhalten des Formulars

    const score = {
        score: mostRecentScore, // Verwende den tatsächlichen Score
        username: username.value, // Benutzername
    };

    highScores.push(score); // Füge den neuen Score zur Liste hinzu
    highScores.sort((a, b) => b.score - a.score); // Sortiere die Scores absteigend
    highScores.splice(Max_High_Scores); // Halte nur die besten Max_High_Scores

    localStorage.setItem("highScores", JSON.stringify(highScores)); // Speichern im Local Storage

    console.log(highScores); // Debugging-Zweck
    window.location.assign("highscores.html"); // Weiterleitung zur Highscore-Seite
};

// Event Listener für den Save Button
saveScoreBtn.addEventListener("click", saveHighScore);
