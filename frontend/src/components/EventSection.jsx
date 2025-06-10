// components/EventSection.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventSection = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 목업 이벤트 데이터 (API 연결 전 테스트용)
    const mockEvents = [
        {
            id: 1,
            title: '로스트아크 7월 이벤트',
            imageUrl: 'https://cdn-lostark.game.onstove.com/uploadfiles/banner/c2a00f7a8ae240e3aebed893c3729c3f.jpg',
            url: 'https://lostark.game.onstove.com/Promotion/Reward/240207',
        },
        {
            id: 2,
            title: '숨겨진 재미를 찾아서',
            imageUrl: 'https://cdn-lostark.game.onstove.com/uploadfiles/banner/c88d8f024a5d4a66a5f8a98af90f89ec.jpg',
            url: 'https://lostark.game.onstove.com/Promotion/Reward/240208',
        },
        {
            id: 3,
            title: '여름 업데이트 기념 출석 체크',
            imageUrl: 'https://cdn-lostark.game.onstove.com/uploadfiles/banner/d14057f7075d4b05b07aed8e7f0a0b7f.jpg',
            url: 'https://lostark.game.onstove.com/Promotion/Reward/240209',
        }
    ];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await axios.get('api/events');
                setEvents(response.data);
                setError(null);
            } catch (err) {
                console.error('이벤트 데이터를 가져오는 중 오류 발생:', err);
                setError('이벤트 정보를 불러올 수 없습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // API에서 데이터를 가져오지 못했을 경우 목업 데이터 사용
    const displayEvents = events.length > 0 ? events : mockEvents;

    return (
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-800 dark:to-blue-700">
                <h2 className="text-xl font-bold text-white flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                    진행중인 로스트아크 이벤트
                </h2>
                <a
                    href="https://lostark.game.onstove.com/News/Event/Now"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white hover:text-blue-200 transition-colors duration-200 flex items-center"
                >
                    <span>모든 이벤트 보기</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </div>

            <div className="p-6">
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : error && events.length === 0 ? (
                    <div className="text-center text-red-500 dark:text-red-400 py-4 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                ) : displayEvents.length === 0 ? (
                    <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        이벤트 정보를 불러올 수 없습니다.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayEvents.map((event) => (
                            <a
                                key={event.id}
                                href={event.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="aspect-[16/9] relative overflow-hidden">
                                    <img
                                        src={event.imageUrl}
                                        alt={event.title || '이벤트 이미지'}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                                    <h3 className="text-sm font-medium text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                                        {event.title || '로스트아크 이벤트'}
                                    </h3>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventSection;
