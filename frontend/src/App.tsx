import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import LandingPage from './pages/landingPage';
import CatsPage from './pages/catsPage';
import EventsPage from './pages/eventsPage';
import CalenderPage from './pages/calenderPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/landingPage" element={<LandingPage/>}/>
        <Route path="/catsPage" element={<CatsPage />} />
        <Route path="/eventsPage" element={<EventsPage />} />
        <Route path="/calenderPage" element={<CalenderPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
