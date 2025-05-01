// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DarkToggle from "../components/DarkToggle.jsx";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">



            <div className="space-x-4">
                <button
                    onClick={() => navigate('/sassagae')}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg shadow"
                >
                    📰 사사게 게시판 검색
                </button>
            </div>
        </div>
    );
};

export default Home;
