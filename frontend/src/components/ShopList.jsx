import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShopList = () => {
    const [shopItems, setShopItems] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/shop-selenium")
            .then(res => setShopItems(res.data))
            .catch(err => console.error("상점 데이터 로드 실패:", err));
    }, []);

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">🛒 마리샵</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {shopItems.map((item, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <img src={item.image} alt={item.title} className="w-full h-32 object-contain mb-2" />
                        <div className="font-semibold">{item.title}</div>
                        {item.time && <div className="text-sm text-gray-500">{item.time}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopList;
