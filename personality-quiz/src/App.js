import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';


import logo from './logo.svg';
import './App.css';
import Quiz from './Quiz/Quiz';
import Results from './Quiz/Results';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Quiz />} />
        <Route path = "/results"element = {<Results />}/>
        <Route path="/results/:personalityType" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
