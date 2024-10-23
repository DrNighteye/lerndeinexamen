// Holen der Popups
var loginModal = document.getElementById('loginModal');
var registerModal = document.getElementById('registerModal');

// Holen der Buttons, die die Popups öffnen
var openLoginBtn = document.getElementById('openLoginBtn');
var openRegisterBtn = document.getElementById('openRegisterBtn');

// Holen der Schließen-Buttons (X)
var closeLoginBtn = document.getElementById('closeLogin');
var closeRegisterBtn = document.getElementById('closeRegister');

// Öffnen des Login-Popups beim Klicken auf den Login-Button
openLoginBtn.onclick = function() {
    loginModal.style.display = 'block';
}

// Öffnen des Registrierungs-Popups beim Klicken auf den Registrieren-Button
openRegisterBtn.onclick = function() {
    registerModal.style.display = 'block';
}

// Schließen des Login-Popups beim Klicken auf (X)
closeLoginBtn.onclick = function() {
    loginModal.style.display = 'none';
}

// Schließen des Registrierungs-Popups beim Klicken auf (X)
closeRegisterBtn.onclick = function() {
    registerModal.style.display = 'none';
}

// Schließen des Popups, wenn der Benutzer außerhalb des Popups klickt
window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = 'none';
    }
    if (event.target == registerModal) {
        registerModal.style.display = 'none';
    }
}
