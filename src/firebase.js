// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyA90TFWaj25Pe2Vt1bKtELiqGoHhlALxXQ",
    authDomain: "pawcare-2335.firebaseapp.com",
    projectId: "pawcare-2335",
    storageBucket: "pawcare-2335.appspot.com",
    messagingSenderId: "1061358980617",
    appId: "1:1061358980617:web:185a2ef31918bdebc0f2d8",
    databaseURL: "https://pawcare-2335-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Realtime Database
const database = getDatabase(app);

// Firebase Authentication
const auth = getAuth(app);

// Export for use in components
export { database, ref, onValue, auth };
