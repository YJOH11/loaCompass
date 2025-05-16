import React from "react";

const WelcomeBanner = () => (
  <div className="mb-8 rounded-lg overflow-hidden shadow-2xl border-2 border-amber-600/30 relative">
    {/* 메인 배경 이미지 */}
    <div 
      className="p-8 md:p-12 relative"
      style={{ 
        backgroundImage: `url('https://www.playlostark.com/en-us/news/articles/june-2023-release-notes/images/LA_S3_Banner_1920x1080.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '380px'
      }}
    >
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-transparent"></div>
      
      {/* 상단 장식 */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400"></div>
      
      {/* 로스트아크 로고 */}
      <div className="absolute -top-8 right-8 transform hover:scale-105 transition-transform duration-300" style={{ width: "20rem", height: "20rem" }}>
        <div className="relative w-full h-full">
          <div className="absolute inset-0 animate-pulse bg-amber-400/20 rounded-full filter blur-xl"></div>
          <img 
            src="/로고.png" 
            alt="Lost Ark Logo" 
            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]"
          />
        </div>
      </div>


      
      {/* 콘텐츠 */}
      <div className="max-w-3xl relative z-10">
        <div className="flex flex-col pl-6 border-l-4 border-amber-500 mb-8 mt-2">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-300 tracking-wide leading-tight drop-shadow-lg mb-3">
            로침반에 오신 것을<br/>환영합니다
          </h1>
          <p className="text-lg md:text-xl text-blue-100 leading-relaxed drop-shadow-md">
            아크라시아의 모험가여! 최신 업데이트, 이벤트 정보,<br/>그리고 다양한 로스트아크 게임 콘텐츠를 한 곳에서 만나보세요.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mt-8">
          {/* 로그인 버튼 - 로스트아크 스타일 */}
          <a 
            href="/login" 
            className="px-8 py-3 bg-gradient-to-b from-blue-800 to-blue-900 text-amber-300 font-medium rounded-md hover:from-blue-700 hover:to-blue-800 transition border-2 border-amber-500/50 shadow-lg flex items-center justify-center min-w-[160px]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            로그인
          </a>
          
          {/* 회원가입 버튼 - 로스트아크 스타일 */}
          <a 
            href="/register" 
            className="px-8 py-3 bg-gradient-to-b from-amber-600 to-amber-800 text-white font-medium rounded-md hover:from-amber-500 hover:to-amber-700 transition border-2 border-amber-400/50 shadow-lg flex items-center justify-center min-w-[160px]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
            회원가입
          </a>
        </div>
      </div>
      
      {/* 하단 테마 요소 */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-900/90 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400"></div>
      
    </div>
  </div>
);

export default WelcomeBanner;