import React, { useState, useEffect } from 'react';
import UpdateList from '../components/UpdateList';
import ShopList from '../components/ShopList';
import axios from 'axios';


function Home() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8080/api/events');
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



    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="flex-grow p-6">
                <div className="max-w-6xl mx-auto">
                    {/* 로스트아크 커뮤니티 환영 배너 */}
                    <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                        <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 text-white p-8 md:p-12">
                            <div className="max-w-3xl">
                                <h1 className="text-3xl md:text-4xl font-bold mb-4">로침반에 오신 것을 환영합니다</h1>
                                <p className="text-lg md:text-xl opacity-90 mb-6">최신 업데이트, 이벤트 정보, 그리고 다양한 로스트아크 관련 게임 콘텐츠를 만나보세요.</p>
                            
                            </div>
                        </div>
                    </div>

                    {/* 로스트아크 이벤트 섹션 */}
                    <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <div className="flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                                진행중인 로스트아크 이벤트
                            </h2>
                            <a href="/events" className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                                모든 이벤트 보기
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>

                        <div className="p-6">
                            {loading ? (
                                <div className="flex justify-center items-center h-40">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-400 dark:border-white"></div>
                                </div>
                            ) : error ? (
                                <div className="text-center text-red-500 dark:text-red-400 py-4">{error}</div>
                            ) : events.length === 0 ? (
                                <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                                    이벤트 정보를 불러올 수 없습니다.
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {events.map(event => (
                                        <a
                                            key={event.id}
                                            href={event.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
                                        >
                                            <div className="relative overflow-hidden">
                                                <img
                                                    src={event.imageUrl}
                                                    alt={event.title}
                                                    className="w-full h-40 object-cover"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs py-2 px-2">
                                                    <p className="text-center font-medium">{event.period}</p>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 업데이트 & 마리샵 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 최신 업데이트 */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                            <div className="flex items-center px-6 py-4 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-700 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                </svg>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">최신 업데이트</h3>
                            </div>
                            <div className="p-4">
                                <UpdateList />
                            </div>
                        </div>

                        {/* 마리샵 정보 */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                            <div className="flex items-center px-6 py-4 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-700 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                </svg>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">마리샵 정보</h3>
                            </div>
                            <div className="p-4">
                                <ShopList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
