import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [updates, setUpdates] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/update")
            .then(res => setUpdates(res.data))
            .catch(err => console.error("업데이트 불러오기 실패:", err));
    }, []);

    return (
        <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white p-6">
            <div className="space-x-4 mb-6">
                <button
                    onClick={() => navigate('/sassagae')}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg shadow"
                >
                    📰 사사게 게시판 검색
                </button>
            </div>

            <h2 className="text-2xl font-bold mb-4">🛠 로스트아크 업데이트</h2>
                {updates.map((item, index) => (
                    <li key={index}>
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                           {item.title}
                        </a>
                    </li>

                ))}
        </div>
    )
};

export default Home;
