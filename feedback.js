// Initialisiere EmailJS korrekt mit deinem Public Key
(function () {
  emailjs.init("4cIfzeTVyX4E8clHQ"); // Ersetze dies durch deinen tatsächlichen Public Key von EmailJS
})();

// Funktion zum Senden von Feedback
function sendFeedback(event) {
  event.preventDefault(); // Verhindert das Standardverhalten des Formulars

  const username = document.getElementById("username").value || "Anonym"; // Standardwert für Namen
  const feedbackMessage = document.getElementById("feedbackMessage").value; // Feedback-Nachricht abrufen

  // Sende Feedback über EmailJS
  emailjs.send("service_vuehx0e", "template_pqiq0kk", {
    username: username, // Benutzername an die Vorlage senden
    message: feedbackMessage, // Nachricht an die Vorlage senden
  })
    .then((response) => {
      console.log("Feedback gesendet!", response.status, response.text); // Erfolgsnachricht in der Konsole
      alert("Danke für dein Feedback!"); // Erfolgsmeldung für den Benutzer
      document.getElementById("feedbackForm").reset(); // Formular zurücksetzen
    })
    .catch((error) => {
      console.error("Fehler beim Senden des Feedbacks:", error); // Fehler in der Konsole protokollieren
      alert("Etwas ist schiefgelaufen. Bitte versuche es später erneut."); // Fehlermeldung für den Benutzer
    });
}
