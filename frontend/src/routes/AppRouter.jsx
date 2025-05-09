// src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import CharacterSearch from '../pages/CharacterSearch'
import SassagaeCrawler from '../pages/SassagaeCrawler'
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import DiscordCallback from "../pages/DiscordCallback.jsx";

const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/character/:name" element={<CharacterSearch />} />
                <Route path="/" element={<Home />} />
               {/* <Route path="/user" element={<CharacterSearch />} />*/}
                <Route path="/sassagae" element={<SassagaeCrawler />} />
                <Route path="/about" element={<About />} />
                <Route path="/discord/callback" element={<DiscordCallback />} />
                <Route path="*" element={<NotFound />} />

            </Routes>
            <Footer />
        </Router>
    );
};

export default AppRouter;
