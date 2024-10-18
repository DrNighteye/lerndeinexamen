function sendFeedback(event) {
  event.preventDefault(); // Verhindert das Standardverhalten des Formulars

  const username = document.getElementById("username").value; // Benutzername abrufen
  const feedbackMessage = document.getElementById("feedbackMessage").value; // Feedback-Nachricht abrufen

  // Hier könntest du einen E-Mail-Service verwenden, um das Feedback zu senden.
  // Zum Beispiel: EmailJS oder ein Backend-Service, um die E-Mail zu versenden.

  console.log("Feedback gesendet!");
  console.log("Name:", username);
  console.log("Feedback:", feedbackMessage);

  // Nachricht an den Benutzer
  alert("Danke für dein Feedback!");

  // Formular zurücksetzen
  document.getElementById("feedbackForm").reset();
}

// Füge diesen Code in deine feedback.js ein

// Initialisiere EmailJS mit deiner User ID
(function() {
  emailjs.init("4cIfzeTVyX4E8clHQ"); // Ersetze 'YOUR_USER_ID' durch deine tatsächliche User ID von EmailJS
})();

function sendFeedback(event) {
  event.preventDefault(); // Verhindert das Standardverhalten des Formulars

  const username = document.getElementById("username").value; // Benutzername abrufen
  const feedbackMessage = document.getElementById("feedbackMessage").value; // Feedback-Nachricht abrufen

  // E-Mail senden
  emailjs.send("service_yz2lxio", "template_pqiq0kk", {
    username: username,
    message: feedbackMessage
  })
    .then((response) => {
      console.log("Feedback gesendet!", response.status, response.text);
      alert("Danke für dein Feedback!"); // Bestätigung für den Benutzer
      document.getElementById("feedbackForm").reset(); // Formular zurücksetzen
    }, (error) => {
      console.error("Fehler beim Senden des Feedbacks: ", error);
      alert("Etwas ist schiefgelaufen. Bitte versuche es später erneut.");
    });
}


