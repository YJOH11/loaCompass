import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/notice')
            .then(res => setNotices(res.data))
            .catch(err => console.error(err));
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

            <h1 className="text-2xl font-bold mb-4">📢 로스트아크 공지사항</h1>
            <ul className="space-y-2">
                {notices.map((notice, index) => (
                    <li key={index}>
                        <a
                            href={notice.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            {notice.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
