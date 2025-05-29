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
import DiscordCallback from "../pages/DiscordCallback.jsx";
import Login from '../pages/Login';
import Register from '../pages/Register';
import MyPage from '../pages/MyPage';
import Statistics from '../pages/Statistics';
import ForgotPassword from '../pages/ForgotPassword';
import AIAssistant from '../pages/AIAssistant';



const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <Routes>    
                <Route path="/character/:name" element={<CharacterSearch />} />
                <Route path="/" element={<Home />} />
                <Route path="/sassagae" element={<SassagaeCrawler />} />
                <Route path="/about" element={<About />} />
                <Route path="/boards" element={<BoardList />} />
                <Route path="/boards/write" element={<BoardWrite />} />
                <Route path="/boards/:id" element={<BoardDetail />} />
                <Route path="/boards/:id/edit" element={<BoardEdit />} />
                <Route path="/about" element={<About />} />
                <Route path="/discord/callback" element={<DiscordCallback />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default AppRouter;

