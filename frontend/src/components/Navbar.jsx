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

    return (
        <nav className="w-full bg-white dark:bg-gray-900 text-black dark:text-white px-6 md:px-12">
            {/* 첫 번째 줄 */}
            <div className="flex items-center justify-between py-3 pl-20">
                <div className="text-2xl font-bold">
                    <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                        </svg>
                        로침반
                    </Link>
                </div>

                <div className="flex-1 mx-6">
                    <CharacterSearchInput />
                </div>

                <div className="flex items-center gap-2 mr-3">
                    <DarkToggle />
                </div>

                <div className="flex items-center gap-3">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-800 dark:text-white">
                                {user.nickname || user.username}님
                                {user.discriminator && `#${user.discriminator}`}
                            </span>
                            <Link 
                                to="/mypage"
                                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 border border-transparent rounded-md transition"
                            >
                                마이페이지
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 border border-transparent rounded-md transition"
                            >
                                로그아웃
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 border border-transparent rounded-md transition">
                                로그인
                            </Link>
                            <Link to="/register" className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-800 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                                    <path d="M16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                </svg>
                                회원가입
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* 두 번째 줄 - 탭 네비게이션 */}
            <div className="w-screen relative left-1/2 right-1/2 -translate-x-1/2 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white shadow-sm">
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
                            label: '사사게 검색기',
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            )
                        },
                        { 
                            to: '/guild', 
                            label: '길드',
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                </svg>
                            )
                        },
                        { 
                            to: '/ranking', 
                            label: '순위',
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
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
                            to: '/tools', 
                            label: '도구',
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
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


        </nav>
    );
};

export default Navbar;
