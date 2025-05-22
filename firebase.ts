// firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics"; // Ensure this import is also at the top

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

// Initialize Firebase and export the app instance as 'firebaseApp'
// This makes it available for import by other files like admin.tsx
export const firebaseApp = initializeApp(firebaseConfig);

// Get other Firebase services using the initialized app
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

// Only initialize analytics in the browser to prevent issues during server-side rendering (SSR)
// The `import` statement for `firebase/analytics` should be at the top with other imports.
if (typeof window !== "undefined") {
  getAnalytics(firebaseApp);
}

// You can also export other services as needed, but firebaseApp, db, and auth are common.
