// Initialisiere EmailJS mit deinem Public Key
(function () {
  emailjs.init("4cIfzeTVyX4E8clHQ"); // Ersetze mit deinem tatsächlichen Public Key
})();

// Funktion zum Senden von Feedback
function sendFeedback(event) {
  event.preventDefault(); // Verhindert das Standardverhalten des Formulars

  const username = document.getElementById("username").value; // Benutzername abrufen
  const feedbackMessage = document.getElementById("feedbackMessage").value; // Feedback-Nachricht abrufen

  // E-Mail über EmailJS senden
  emailjs.send("service_vuehx0e", "template_pqiq0kk", {
    username: username,
    message: feedbackMessage,
  })
    .then((response) => {
      console.log("Feedback gesendet!", response.status, response.text);
      alert("Danke für dein Feedback!"); // Erfolgsmeldung für den Benutzer
      document.getElementById("feedbackForm").reset(); // Formular zurücksetzen
    })
    .catch((error) => {
      console.error("Fehler beim Senden des Feedbacks:", error);
      alert("Etwas ist schiefgelaufen. Bitte versuche es später erneut.");
    });
}
