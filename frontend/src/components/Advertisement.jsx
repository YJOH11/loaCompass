import React from 'react';

const Advertisement = () => {
    return (
        <div className="w-full max-w-[220px] bg-white shadow-lg rounded-xl overflow-hidden text-center text-sm border border-gray-200">
            {/* 상단 광고 표시 */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-1">
                📢 광고
            </div>

            {/* 본문 콘텐츠 */}
            <div className="p-4 space-y-2">
                <p className="font-semibold text-gray-800 text-base">
                    지금 내 캐릭터를 홍보하세요!
                </p>
                <p className="text-gray-600 text-xs">
                    이 영역은 실제 광고 홍보용으로 사용됩니다.
                </p>
                <a
                    href="https://your-promotion-link.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-500 text-white py-1 px-3 rounded text-sm transition"
                >
                    자세히 보기 &gt;
                </a>
            </div>

            {/* 푸터 (선택 사항) */}
            <div className="bg-gray-50 text-gray-400 text-xs py-2 border-t">
                광고 배너 영역
            </div>
        </div>
    );
};

export default Advertisement;
