// src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';

import Home from '../pages/Home';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import CharacterSearch from '../pages/CharacterSearch';
import SassagaeCrawler from '../pages/SassagaeCrawler';
import BoardList from '../pages/BoardList';
import BoardWrite from '../pages/BoardWrite';
import BoardDetail from '../pages/BoardDetail';
import BoardEdit from '../pages/BoardEdit';
import DiscordCallback from '../pages/DiscordCallback';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MyPage from '../pages/MyPage';
import Statistics from '../pages/Statistics';
import ForgotPassword from '../pages/ForgotPassword';
import CharacterSimulation from '../pages/CharacterSimulation';
import AIAssistant from '../pages/AIAssistant';

import Navbar from '../components/Navbar';



const AppRouter = () => {
    return (
        <BrowserRouter>

            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/character/:name" element={<CharacterSearch />} />
                    <Route path="/sassagae" element={<SassagaeCrawler />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/boards" element={<BoardList />} />
                    <Route path="/boards/write" element={<BoardWrite />} />
                    <Route path="/boards/:id" element={<BoardDetail />} />
                    <Route path="/boards/:id/edit" element={<BoardEdit />} />
                    <Route path="/discord/callback" element={<DiscordCallback />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/statistics" element={<Statistics />} />
                    <Route path="/ai-assistant" element={<AIAssistant />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
