import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import QuestionBank from './component/QuestionBank';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuestionBank/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
