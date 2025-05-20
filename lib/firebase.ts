import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDatDAYizZiTTDiCgE9GL_jPanYpRZHzDQ",
  authDomain: "agrivest-24.firebaseapp.com",
  projectId: "agrivest-24",
  storageBucket: "agrivest-24.firebasestorage.app",
  messagingSenderId: "918709886192",
  appId: "1:918709886192:web:0fa8ed8c131951faadb635",
  measurementId: "G-2ZD3KKMF7H"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
