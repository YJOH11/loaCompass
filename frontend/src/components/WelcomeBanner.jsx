import React from "react";


const WelcomeBanner = () => (
<div className="mb-8 rounded-lg overflow-hidden shadow-lg">
    <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 text-white p-8 md:p-12">
        <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">로침반에 오신 것을 환영합니다</h1>
            <p className="text-lg md:text-xl opacity-90 mb-6">최신 업데이트, 이벤트 정보, 그리고 다양한 로스트아크 관련 게임 콘텐츠를 만나보세요.</p>

            <div className="flex gap-4">
                <a href="/login" className="px-6 py-2 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 transition">
                    로그인
                </a>
                <a href="/register" className="px-6 py-2 bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-600 transition">
                    회원가입
                </a>
            </div>
        </div>
    </div>
</div>);
export default WelcomeBanner;