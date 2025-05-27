import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import CharacterSearch from '../pages/CharacterSearch'
import SassagaeCrawler from '../pages/SassagaeCrawler'
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import BoardList from '../pages/BoardList';
import BoardWrite from '../pages/BoardWrite';
import BoardDetail from '../pages/BoardDetail';
import BoardEdit from '../pages/BoardEdit';

const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/character/:name" element={<CharacterSearch />} />
                <Route path="/sassagae" element={<SassagaeCrawler />} />
                <Route path="/about" element={<About />} />
                <Route path="/boards" element={<BoardList />} />
                <Route path="/boards/write" element={<BoardWrite />} />
                <Route path="/boards/:id" element={<BoardDetail />} />
                <Route path="/boards/:id/edit" element={<BoardEdit />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default AppRouter;

