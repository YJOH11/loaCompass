import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ShopList() {
    const [items, setItems] = useState([]);
    const [remainTime, setRemainTime] = useState('');

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
            const res = await axios.get('http://localhost:8080/api/shop-selenium');
            setItems(res.data.items);
            setRemainTime(res.data.remainTime);
        } catch (err) {
            console.error('마리샵 로딩 실패:', err);
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
        <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">🛒 마리샵</h2>

            {remainTime && (
                <div className="text-lg font-semibold text-red-500 mb-4">
                    ⏳ 다음 입고까지: {remainTime}
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded shadow text-center">
                        <img src={item.image} alt={item.title} className="mx-auto h-24 mb-2" />

                        <div className="font-medium">{item.title}</div>

                        <div className="text-sm text-blue-500">
                            {item.currency} {item.price}
                        </div>

                        {item.originalPrice && (
                            <div className="text-xs text-gray-400 line-through">
                                {item.originalPrice}
                            </div>
                        )}
                    </div>
                ))}

            </div>
        </div>
    );
}

export default ShopList;
