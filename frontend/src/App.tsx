import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import LandingPage from './pages/landingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/landingPage" element={<LandingPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
