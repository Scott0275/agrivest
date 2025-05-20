// firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDatDAYizZiTTDiCgE9GL_jPanYpRZHzDQ",
  authDomain: "agrivest-24.firebaseapp.com",
  projectId: "agrivest-24",
  storageBucket: "agrivest-24.firebasestorage.app",
  messagingSenderId: "918709886192",
  appId: "1:918709886192:web:0fa8ed8c131951faadb635",
  measurementId: "G-2ZD3KKMF7H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Only initialize analytics in the browser
if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics }) => {
    getAnalytics(app);
  });
}

export { db, auth };