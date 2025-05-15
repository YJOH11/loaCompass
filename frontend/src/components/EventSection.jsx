// components/EventSection.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventSection = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                    진행중인 로스트아크 이벤트
                </h2>
                <a
                    href="https://lostark.game.onstove.com/News/Event/Now"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:no-underline"

                    > 모든 이벤트 보기
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
