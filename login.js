// Funktion, um den Benutzer über Firebase einzuloggen
function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Firebase-Authentifizierung verwenden
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            // Erfolgreich eingeloggt
            const user = userCredential.user;
            console.log('Benutzer eingeloggt:', user);
            document.getElementById('message').innerText = "Erfolgreich eingeloggt!";
            // Optional: Weiterleitung zu einer anderen Seite
            window.location.href = 'index.html';
        })
        .catch(error => {
            // Fehler beim Einloggen
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Fehler beim Login:', errorMessage);
            document.getElementById('message').innerText = "Fehler: " + errorMessage;
        });
}
