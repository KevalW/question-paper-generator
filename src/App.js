import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import QuestionBank from './component/QuestionBank.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styling/QuestionBank.css'
import LoginPage from './component/LoginPage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<QuestionBank />}></Route>
          <Route path="/k" element={<LoginPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
