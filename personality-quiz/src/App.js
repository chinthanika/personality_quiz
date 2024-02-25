import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import logo from './logo.svg';
import './App.css';
import Quiz from './Quiz/Quiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
