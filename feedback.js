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
