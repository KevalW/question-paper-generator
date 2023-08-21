import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import QuestionBank from './component/QuestionBank';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
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
