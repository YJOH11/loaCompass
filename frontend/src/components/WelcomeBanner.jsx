import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const WelcomeBanner = () => {
  const [user, setUser] = useState(null);

  // 로그인 상태 체크 함수
  const checkLoginStatus = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    // 초기 로그인 상태 체크
    checkLoginStatus();

    // localStorage 변경 감지
    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        checkLoginStatus();
      }
    };

    // 로그아웃 이벤트 감지
    const handleLogoutEvent = () => {
      setUser(null);
    };

    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('userLoggedOut', handleLogoutEvent);

    // 주기적으로 로그인 상태 체크 (1초마다)
    const interval = setInterval(checkLoginStatus, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('userLoggedOut', handleLogoutEvent);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="mb-8 rounded-lg overflow-hidden shadow-2xl border-2 border-amber-400/30 relative">
      {/* 메인 배경 이미지 */}
      <div 
        className="p-8 md:p-12 relative"
        style={{ 
          backgroundImage: `url('/배너이미지.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '350px'
        }}
      >
        {/* 오버레이 - 투명도 낮춤 */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent"></div>
        
        {/* 상단 장식 */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-amber-400 to-amber-400"></div>
        
        {/* 콘텐츠 */}
        <div className="max-w-3xl relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-amber-400 tracking-wide leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] mb-3">
            아크라시아의 모험가님에게
          </h1>
          <p className="text-lg md:text-xl text-white font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            안녕하세요{user ? ` ${user.nickname || user.username}님` : ' 모험가님'}, <br/>
            로침반에서 최신 업데이트와 이벤트 정보,<br/>그리고 다양한 로스트아크 게임 콘텐츠를 한 곳에서 만나보세요.
          </p>
          
          {/* 버튼을 첫 줄 텍스트 너비에 맞춤 */}
          {!user && (
            <div className="flex gap-4 mt-8" style={{ width: 'fit-content' }}>
              {/* 로그인 버튼 - 로스트아크 스타일 */}
              <Link 
                to="/login" 
                className="w-[140px] px-4 py-2.5 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-medium rounded-md transition shadow-lg flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                로그인
              </Link>
              
              {/* 회원가입 버튼 - 로스트아크 스타일 */}
              <Link 
                to="/register" 
                className="w-[140px] px-4 py-2.5 bg-gradient-to-b from-amber-400 to-amber-500 text-white font-medium rounded-md hover:from-amber-300 hover:to-amber-400 transition shadow-lg flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
                회원가입
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* 하단 테마 요소 */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-amber-400 to-amber-400"></div>
    </div>
  );
};

export default WelcomeBanner;
