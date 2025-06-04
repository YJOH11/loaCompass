import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Ranking = () => {
    const [rankings, setRankings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/rankings')
            .then(response => setRankings(response.data))
            .catch(error => console.error('랭킹 불러오기 실패:', error));
    }, []);

    const handleClick = (nickname) => {
        navigate(`/character/${encodeURIComponent(nickname)}`);
    };

    return (
        <div className="min-h-screen bg-transparent">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">캐릭터 랭킹 (TOP 50)</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full table-fixed divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="w-16 px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">순위</th>
                                    <th className="w-1/4 px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">닉네임</th>
                                    <th className="w-1/6 px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">서버</th>
                                    <th className="w-1/4 px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">직업</th>
                                    <th className="w-1/6 px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">아이템 레벨</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {rankings.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                            랭킹 정보가 없습니다.
                                        </td>
                                    </tr>
                                ) : (
                                    rankings.map((r, i) => (
                                        <tr
                                            key={r.rank}
                                            className={`cursor-pointer 
                        ${i % 2 === 0
                                                    ? 'bg-white dark:bg-gray-800'
                                                    : 'bg-gray-50 dark:bg-gray-700'} 
                        hover:bg-gray-100 dark:hover:bg-gray-600`}
                                            onClick={() => handleClick(r.characterName)}
                                        >
                                            <td className="px-4 py-4 text-center text-sm text-gray-700 dark:text-gray-300">{r.rank}</td>
                                            <td
                                                className="px-4 py-4 text-center text-sm font-semibold text-blue-500 dark:text-blue-300 hover:underline hover:text-blue-700 dark:hover:text-blue-100 transition-colors duration-200 tracking-wide"
                                            >
                                                {r.characterName}
                                            </td>

                                            <td className="px-4 py-4 text-center text-sm text-gray-700 dark:text-gray-300">{r.serverName}</td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-700 dark:text-gray-300">{r.characterClass}</td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-700 dark:text-gray-300">{r.itemLevel.toFixed(2)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ranking;
