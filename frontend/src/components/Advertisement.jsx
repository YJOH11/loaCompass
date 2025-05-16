import React from 'react';

const Advertisement = ({ position }) => {
    return (
        <div className="mb-8">
            <div className="bg-white rounded-md shadow-md overflow-hidden">
                <div className="text-center p-2 bg-white">
                    <div className="text-red-600 font-bold">거품없는 가격</div>
                    <div className="font-bold mb-2">쿠팡 특가</div>
                    <a href="https://www.coupang.com" target="_blank" rel="noopener noreferrer" className="block bg-blue-500 text-white text-sm py-1 px-2 rounded">
                        바로가기 &gt;
                    </a>
                </div>
                <div className="border-t border-gray-200">
                    <img src="public/세탁기.png" alt="광고" className="w-full" />
                </div>
                <div className="border-t border-gray-200 p-2 flex justify-between items-center">
                    <span className="text-xs">광고</span>
                    <a href="https://www.coupang.com" target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white text-xs py-1 px-2 rounded">
                        주문하기 &gt;
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Advertisement;
