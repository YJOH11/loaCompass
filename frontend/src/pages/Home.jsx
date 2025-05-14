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
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow bg-white text-black dark:bg-black dark:text-white p-6">
                {/* 로스트아크 이벤트 섹션 */}
                <div className="mb-8 bg-black text-white p-4 rounded">
                    <h2 className="text-2xl font-bold mb-4 text-center border-b border-gray-700 pb-2">진행중인 로스트아크 이벤트</h2>

                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-400 dark:border-white"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 dark:text-red-400 py-4">{error}</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map(event => (
                                <a
                                    key={event.id}
                                    href={event.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cursor-pointer hover:opacity-90 transition-opacity"
                                >
                                    <div className="relative overflow-hidden rounded shadow">
                                        <img
                                            src={event.imageUrl}
                                            alt={event.title}
                                            className="w-full object-cover"
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

                {/* 업데이트 & 마리샵 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
                        <UpdateList />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
                        <ShopList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
