// src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import CharacterSearch from '../pages/CharacterSearch'
import SassagaeCrawler from '../pages/SassagaeCrawler'
import CharacterDetailPage from '../pages/CharacterDetailPage'

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user" element={<CharacterSearch />} />
                <Route path="/sassagae" element={<SassagaeCrawler />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/character/:name" element={<CharacterDetailPage />} />

            </Routes>
        </Router>
    );
};

export default AppRouter;
