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
import Login from '../pages/Login';
import Register from '../pages/Register';
import MyPage from '../pages/MyPage';
import Statistics from '../pages/Statistics';
import ForgotPassword from '../pages/ForgotPassword';
import CharacterSimulation from '../pages/CharacterSimulation';
import CharacterCapture from '../pages/CharacterCapture';



const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/character/:name" element={<CharacterSearch />} />
                <Route path="/character/simulation/:name" element={<CharacterSimulation />} />
                <Route path="/Capture" element={<CharacterCapture />} />
                <Route path="/" element={<Home />} />
                <Route path="/sassagae" element={<SassagaeCrawler />} />
                <Route path="/about" element={<About />} />
                <Route path="/discord/callback" element={<DiscordCallback />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="*" element={<NotFound />} />

            </Routes>
            <Footer />
        </Router>
    );
};

export default AppRouter;
