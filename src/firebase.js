// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Required for side-effects
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMI8NB7eyXQPyLHE71uYORXTxwFE8hZBE",
  authDomain: "question-paper-generator-8e829.firebaseapp.com",
  databaseURL: "https://question-paper-generator-8e829-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "question-paper-generator-8e829",
  storageBucket: "question-paper-generator-8e829.appspot.com",
  messagingSenderId: "1029704276927",
  appId: "1:1029704276927:web:9d97551809c089c1629f0a",
  measurementId: "G-ZYG2NRQEVV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage();
export const firestore = getFirestore(app);
