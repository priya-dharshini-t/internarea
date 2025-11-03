// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2uU926I6Ba_qfsMHw6pj8Qi_8pzkQGkw",
  authDomain: "internarea-53e9d.firebaseapp.com",
  projectId: "internarea-53e9d",
  storageBucket: "internarea-53e9d.appspot.com",
  messagingSenderId: "262244681520",
  appId: "1:262244681520:web:e8257b77198c93165b2af5",
  measurementId: "G-GLM5R34T1F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Firestore
const db = getFirestore(app);

// Storage
const storage = getStorage(app); // <-- initialize storage here

// Optional: Recaptcha for phone auth
const setupRecaptcha = () => {
  if (typeof window !== "undefined" && !window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container", 
      { size: "invisible", callback: (response) => console.log("reCAPTCHA solved", response) }, 
      auth
    );
    window.recaptchaVerifier.render().catch(console.error);
  }
};

export { auth, provider, setupRecaptcha, db, storage }; // <-- now storage is defined
