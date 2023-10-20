import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import QuestionBank from './QuestionBank.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styling/QuestionBank.css'
import LoginPage from './LoginPage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<QuestionBank />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
