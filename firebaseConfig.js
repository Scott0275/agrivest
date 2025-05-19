// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);