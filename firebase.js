// Firebase SDKs importieren
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";


// Firebase-Konfiguration
const firebaseConfig = {
    apiKey: "AIzaSyBcgYwEx3sSlwbchNY5ZOaUgBHYLCh6Uu4",
    authDomain: "dbquiz-d688f.firebaseapp.com",
    databaseURL: "https://dbquiz-d688f-default-rtdb.firebaseio.com/",  // Realtime Database URL
    projectId: "dbquiz-d688f",
    storageBucket: "dbquiz-d688f.appspot.com",
    messagingSenderId: "891393186621",
    appId: "1:891393186621:web:f87229ddd0d85fec888354",
    measurementId: "G-LLBTVHMWFX"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Benutzer-Login-Funktion
export function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

// Benutzerregistrierung
export function registerUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

// Beispiel: Daten in die Realtime Database schreiben
export function writeUserData(userId, name, email) {
    set(ref(database, 'users/' + userId), {
        username: name,
        email: email
    });
}

//Daten aus der Realtime Database lesen
export function getUserData(userId) {
    const dbRef = ref(database);
    return get(child(dbRef, `users/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}
