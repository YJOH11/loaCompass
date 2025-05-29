// components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import DarkToggle from "./DarkToggle.jsx";
import CharacterSearchInput from './CharacterSearchInput';
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // 로컬 스토리지에서 사용자 정보 가져오기
    const loadUserFromStorage = () => {
        // 일반 로그인 확인
        const storedUser = localStorage.getItem('user');
        // 디스코드 로그인 확인
        const discordUser = localStorage.getItem('discordUser');
        
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else if (discordUser) {
            // 디스코드 사용자 정보도 확인
            const parsedDiscordUser = JSON.parse(discordUser);
            setUser({
                id: parsedDiscordUser.id,
                username: parsedDiscordUser.username,
                discriminator: parsedDiscordUser.discriminator,
                email: parsedDiscordUser.email,
                avatar: parsedDiscordUser.avatar
            });
        } else {
            setUser(null);
        }
    };

    // 컴포넌트 마운트 시와 경로 변경 시 사용자 정보 확인
    useEffect(() => {
        loadUserFromStorage();
    }, [location.pathname]); // 경로가 변경될 때마다 실행

    // 추가: 로컬 스토리지 변경 이벤트 감지
    useEffect(() => {
        const handleStorageChange = () => {
            loadUserFromStorage();
        };
        
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // 로그아웃 처리
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('discordUser'); // 디스코드 사용자 정보도 삭제
        
        // 로컬 스토리지 이벤트 강제 발생 (다른 탭/창에서 변경 감지)
        window.dispatchEvent(new Event('storage'));
        
        setUser(null);
        navigate('/');
    };

    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem("favoriteHistory");
        return stored ? JSON.parse(stored) : [];
    });

    const handleFavoriteToggle = (name, isNowFavorite) => {
        const updated = isNowFavorite
            ? [name, ...favorites.filter(n => n !== name)]
            : favorites.filter(n => n !== name);
        setFavorites(updated);
        localStorage.setItem("favoriteHistory", JSON.stringify(updated));
    };


    return (
        <nav className="w-full bg-white dark:bg-gray-900 text-black dark:text-white">
            {/* 첫 번째 줄 */}
            <div className="max-w-9xl mx-auto px-8">
                <div className="flex items-center justify-between py-3">
                    {/* 로고와 검색바 그룹 */}
                    <div className="flex items-center flex-1">
                        <div className="flex-1 mx-1 pl-48">
                            <div className="w-full flex items-center gap-6 mr-4">
                                <div className="text-2xl font-bold whitespace-nowrap">
                                    <Link to="/" className="flex items-center group transition-colors duration-200">
                                        <div className="flex items-center">
                                            <div className="relative w-7 h-7 mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" 
                                                    className="w-full h-full text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-all duration-300" 
                                                    viewBox="0 0 24 24" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    strokeWidth="2" 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round"
                                                >
                                                    {/* 외부 원 */}
                                                    <circle className="opacity-20" cx="12" cy="12" r="10" />
                                                    <circle className="opacity-40" cx="12" cy="12" r="9.5" />
                                                    <circle className="opacity-60" cx="12" cy="12" r="9" />
                                                    
                                                    {/* 나침반 바늘 */}
                                                    <path className="transform origin-center group-hover:rotate-[360deg] transition-transform duration-700" 
                                                          d="M12 2l2 8-2 2-2-2z" 
                                                          fill="currentColor"
                                                    />
                                                    <path className="transform origin-center group-hover:rotate-[360deg] transition-transform duration-700" 
                                                          d="M12 22l-2-8 2-2 2 2z" 
                                                          fill="currentColor"
                                                    />
                                                    
                                                    {/* 중앙 포인트 */}
                                                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                                                    
                                                    {/* 방향 표시 */}
                                                    <path className="opacity-70" d="M12 7l0.5-3" />
                                                    <path className="opacity-70" d="M12 17l0.5 3" />
                                                    <path className="opacity-70" d="M7 12l-3 0.5" />
                                                    <path className="opacity-70" d="M17 12l3 0.5" />
                                                </svg>
                                            </div>
                                            <span className="font-extrabold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">로침반</span>
                                        </div>
                                    </Link>
                                </div>
                                <CharacterSearchInput
                                    favorites={favorites}
                                    onFavoriteToggle={handleFavoriteToggle}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 버튼 그룹 */}
                    <div className="flex items-center space-x-4">
                        <DarkToggle />
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm font-medium text-gray-800 dark:text-white">
                                    {user.nickname || user.username}님
                                    {user.discriminator && `#${user.discriminator}`}
                                </span>
                                <Link 
                                    to="/mypage"
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 border border-transparent rounded-md transition"
                                >
                                    마이페이지
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 border border-transparent rounded-md transition"
                                >
                                    로그아웃
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 border border-transparent rounded-md transition">
                                    로그인
                                </Link>
                                <Link to="/register" className="px-4 py-2 text-sm font-medium text-gray-800 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                                    회원가입
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 두 번째 줄 - 탭 네비게이션 */}
            <div className="w-full bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white shadow-sm">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex w-full">
                        {[
                            { 
                                to: '/', 
                                label: '홈',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                )
                            },
                            { 
                                to: '/sassagae', 
                                label: '사사게 게시판',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                )
                            },
                            { 
                                to: '/statistics', 
                                label: '통계',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                    </svg>
                                )
                            },
                            { 
                                to: '/ranking', 
                                label: '순위',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                    </svg>
                                )
                            },
                            { 
                                to: '/boards', 
                                label: '게시판',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 1h10v1a1 1 0 01-1 1H6a1 1 0 01-1-1V6zm10 3H5v7h10V9z" clipRule="evenodd" />
                                    </svg>
                                )
                            },
                            { 
                                to: '/ai-assistant', 
                                label: 'AI 도우미',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                                        <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                                        <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                                    </svg>
                                )
                            }
                        ].map((tab) => (
                            <NavLink
                                key={tab.to}
                                to={tab.to}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center flex-1 ${
                                        isActive
                                            ? 'bg-gray-300 dark:bg-gray-900'
                                            : 'hover:bg-gray-300 dark:hover:bg-gray-700'
                                    }`
                                }
                            >
                                {tab.icon}
                                {tab.label}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>


        </nav>
    );
};

export default Navbar;