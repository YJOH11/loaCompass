// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center space-y-8">
            <h1 className="text-4xl font-bold">로침반</h1>

            <div className="space-x-4">
                <button
                    onClick={() => navigate('/sassagae')}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg shadow"
                >
                    📰 사사게 게시판 검색
                </button>

                <button
                    onClick={() => navigate('/user')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow"
                >
                    👤 유저 검색하기
                </button>
            </div>
        </div>
    );
};

export default Home;
