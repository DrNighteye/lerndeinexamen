// Funktion zur Benutzerregistrierung in Firebase
function registerUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const message = document.getElementById('message');


    // Überprüfen, ob Passwort und Bestätigungspasswort übereinstimmen
    if (password !== confirmPassword) {
        message.innerText = "Passwörter stimmen nicht überein!";
        return;
    } else if (password === confirmPassword){
        message.innerText = "Registrierung erfolgreich.";
        return window.location.href= "login.html";
    }

    // Benutzer in Firebase registrieren
    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            // Erfolgreich registriert
            const user = userCredential.user;
            console.log('Benutzer registriert:', user);
            message.innerText = "Erfolgreich registriert!";
            // Optional: Weiterleitung zu einer anderen Seite nach erfolgreicher Registrierung
            // window.location.href = 'dashboard.html';
        })
        .catch(error => {
            // Fehler bei der Registrierung
            const errorMessage = error.message;
            console.error('Fehler bei der Registrierung:', errorMessage);
            message.innerText = "Fehler: " + errorMessage;
        });
}
