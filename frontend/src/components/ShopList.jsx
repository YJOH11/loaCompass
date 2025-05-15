import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ShopList() {
    const [items, setItems] = useState([]);
    const [remainTime, setRemainTime] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    // 시간 문자열을 초(int)로 변환
    const timeToSeconds = (timeStr) => {
        const [h, m, s] = timeStr.split(':').map(Number);
        return h * 3600 + m * 60 + s;
    };

    // 초를 다시 문자열로 변환
    const secondsToTime = (secs) => {
        const h = String(Math.floor(secs / 3600)).padStart(2, '0');
        const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
        const s = String(secs % 60).padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    const fetchShop = async () => {
        try {
            setLoading(true);
            setError(false); // 초기화
            const res = await axios.get('/api/shop');
            setItems(res.data.items);
            setRemainTime(res.data.remainTime);
        } catch (err) {
            console.error('마리샵 로딩 실패:', err);
            setError(true); // 실패 표시
            setItems([]);   // 빈 배열
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShop();
    }, []);

    // 시간 1초씩 줄이기
    useEffect(() => {
        if (!remainTime) return;

        let seconds = timeToSeconds(remainTime);

        const timer = setInterval(() => {
            seconds--;
            if (seconds <= 0) {
                clearInterval(timer);
                fetchShop(); // 시간 다 되면 새로 크롤링
            } else {
                setRemainTime(secondsToTime(seconds));
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [remainTime]);



    return (
        <div className="mb-8">
            {loading ? (
                <div className="flex justify-center items-center h-20">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
                </div>
            ) : error ? (
                <p className="text-center text-red-500">
                    마리샵 API 연결에 실패했습니다. 나중에 다시 시도해주세요.
                </p>
            ) : items.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">
                    현재 입고된 상품이 없습니다.
                </p>
            ) : (
                <>
                    {remainTime && (
                        <div className="text-md font-semibold text-red-500 mb-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            새 상품 입고까지: {remainTime}
                        </div>
                    )}

                    <div className="space-y-3">
                        {items.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                                <div className="flex items-center p-4">
                                    <div className="flex-shrink-0 w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded">
                                        {item.image && <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />}
                                    </div>

                                    <div className="ml-4 flex-grow">
                                        <div className="flex items-center">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.title}</h3>
                                            {item.isNew && (
                                                <span className="ml-2 px-2 py-1 text-xs font-semibold rounded bg-blue-500 text-white">신규</span>
                                            )}
                                            {item.isLimited && (
                                                <span className="ml-2 px-2 py-1 text-xs font-semibold rounded bg-red-500 text-white">한정</span>
                                            )}
                                        </div>

                                        <div className="flex items-center mt-1 space-x-2">
                                            <div className="flex items-center space-x-1">
                                    <span className="text-lg font-semibold text-purple-500">
                                        💎 {item.price}
                                    </span>
                                            </div>

                                            {item.originalPrice && (
                                                <span className="text-sm text-gray-400 line-through">
                                        {item.originalPrice}
                                    </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

        </div>
    );
}

export default ShopList;
