import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import QuestionBank from './component/QuestionBank';


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/firestore';
import 'firebase/storage';


function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyBMI8NB7eyXQPyLHE71uYORXTxwFE8hZBE",
    authDomain: "question-paper-generator-8e829.firebaseapp.com",
    projectId: "question-paper-generator-8e829",
    storageBucket: "question-paper-generator-8e829.appspot.com",
    messagingSenderId: "1029704276927",
    appId: "1:1029704276927:web:9d97551809c089c1629f0a",
    measurementId: "G-ZYG2NRQEVV"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  



  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<QuestionBank />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
