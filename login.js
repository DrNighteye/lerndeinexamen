// Event-Listener für das Absenden des Formulars
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars (Seitenreload)

    // Benutzereingaben abrufen
    const username = document.getElementById('username').value; // Wert des Benutzernamens
    const password = document.getElementById('password').value; // Wert des Passworts
    const message = document.getElementById('message'); // Referenz zum Meldungsabschnitt

    // Überprüfen der Anmeldedaten
    // Hier kannst du die Logik anpassen (z.B. an einen Server senden)
    if (username === "admin" && password === "passwort") {
        message.textContent = "Erfolgreich angemeldet!"; // Erfolgsnachricht
        message.style.color = "green"; // Textfarbe für Erfolgsnachricht
    } else {
        message.textContent = "Ungültiger Benutzername oder Passwort!"; // Fehlermeldung
        message.style.color = "red"; // Textfarbe für Fehlermeldung
    }
});
