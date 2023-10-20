// import firebase from './firebase';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    // Firebase config
    apiKey: "AIzaSyBMI8NB7eyXQPyLHE71uYORXTxwFE8hZBE",
    authDomain: "question-paper-generator-8e829.firebaseapp.com",
    databaseURL: "https://question-paper-generator-8e829-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "question-paper-generator-8e829",
    storageBucket: "question-paper-generator-8e829.appspot.com",
    messagingSenderId: "1029704276927",
    appId: "1:1029704276927:web:9d97551809c089c1629f0a",
    measurementId: "G-ZYG2NRQEVV"
};

const app = initializeApp(firebaseConfig);

export default app;