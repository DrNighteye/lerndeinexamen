// Funktion zur Formularüberprüfung bei der Registrierung
document.getElementById('registerForm').addEventListener('submit', function(event) {
    // Felder erfassen
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Überprüfen, ob die Passwörter übereinstimmen
    if (password !== confirmPassword) {
        event.preventDefault(); // Verhindert das Absenden des Formulars
        document.getElementById('message').textContent = "Passwörter stimmen nicht überein."; // Fehlermeldung
        document.getElementById('message').style.color = 'red'; // Stil der Fehlermeldung
    }
});
