// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css'
import Navbar from "./components/Navbar.jsx";
import MbtiJobRecommendation from './pages/MbtiJobRecommendation';
import CharacterSearch from './pages/CharacterSearch';
import SassagaeCrawler from './pages/SassagaeCrawler';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/character/:name" element={<CharacterSearch />} />
                <Route path="/mbti-job" element={<MbtiJobRecommendation />} />
                <Route path="/sassagae" element={<SassagaeCrawler />} />
                <Route path="/" element={<CharacterSearch />} />
            </Routes>
        </Router>
    );
}
export default App;
