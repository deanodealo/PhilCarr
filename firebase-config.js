// firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZxLjMZTYTOLBunk56HqyHkLyPJsQUtjA",
  authDomain: "philcarr-20ac0.firebaseapp.com",
  projectId: "philcarr-20ac0",
  storageBucket: "philcarr-20ac0.firebasestorage.app",
  messagingSenderId: "770728636073",
  appId: "1:770728636073:web:d2bddbee786446c37d03b8",
  measurementId: "G-XRCH682RNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
