import React from 'react';

const Advertisement = () => {
    return (
        <div className="mb-6">
            <div className="bg-white rounded-md shadow-md overflow-hidden text-center text-sm w-full max-w-[160px]">
                {/* 헤더 */}
                <div className="p-2">
                    <div className="text-red-600 font-bold">거품없는 가격</div>
                    <div className="font-bold mb-2">쿠팡 특가</div>
                    <a
                        href="https://www.coupang.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-1 px-2 rounded w-[80%] mx-auto transition"
                    >
                        바로가기 &gt;
                    </a>
                </div>

                {/* 이미지 */}
                <div className="border-t border-gray-200 p-2 flex justify-center items-center">
                    <img
                        src="/세탁기.png"
                        alt="광고"
                        className="max-w-[140px] w-full h-auto object-contain"
                    />
                </div>

                {/* 푸터 */}
                <div className="border-t border-gray-200 p-2 flex justify-between items-center text-xs">
                    <span>광고</span>
                    <a
                        href="https://www.coupang.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-500 transition"
                    >
                        주문하기 &gt;
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Advertisement;
