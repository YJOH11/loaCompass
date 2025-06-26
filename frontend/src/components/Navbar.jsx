// components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import DarkToggle from "./DarkToggle.jsx";
import CharacterSearchInput from './CharacterSearchInput';
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 🍔 햄버거 메뉴 상태 추가

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
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        // 로그아웃 이벤트 발생
        document.dispatchEvent(new Event('userLoggedOut'));
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
    // 🍔 햄버거 메뉴 토글 함수
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };



    return (
        <nav className="w-full bg-white dark:bg-gray-900 text-black dark:text-white">
            {/* 첫 번째 줄 */}
            <div className="max-w-9xl mx-auto px-8">
                <div className="flex items-center justify-between py-3">
                    {/* 로고와 검색바 그룹 (이 부분은 이전 답변에서 pl-48을 md:pl-48로 수정 권장) */}
                    <div className="flex items-center flex-1">
                        <div className="flex-1 mx-1 ">
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
                                </div>                                <CharacterSearchInput
                                    favorites={favorites}
                                    onFavoriteToggle={handleFavoriteToggle}
                                    // 🍔 모바일에서 검색창 숨기거나 조절 필요 시 여기에 Tailwind 클래스 추가
                                    // 예: className="hidden sm:block" 또는 sm:w-auto w-full
                                />
                            </div>
                        </div>
                    </div>

                    {/* 버튼 그룹 (이 부분이 햄버거 메뉴로 바뀔 부분) */}
                    <div className="flex items-center space-x-4"> {/* sm:space-x-4는 유지, 아래 div에서 숨김 */}

                        {/* 🍔 햄버거 메뉴 토글 버튼 (모바일에서만 보임) */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? (
                                // X 아이콘 (메뉴 닫기)
                                <svg className="h-6 w-6 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                // 햄버거 아이콘 (메뉴 열기)
                                <svg className="h-6 w-6 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>

                        {/* 🍔 데스크톱에서 보이는 버튼 그룹 (md 이상에서만 flex로 보임) */}
                        <div className="hidden md:flex items-center space-x-4">
                            <DarkToggle />
                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <Link to="/mypage" className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 border border-transparent rounded-md transition">
                                        {user.nickname || user.username}님
                                        {user.discriminator && `#${user.discriminator}`}
                                    </Link>
                                    <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 border border-transparent rounded-md transition">
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
            </div>

            {/* 🍔 모바일 메뉴 (햄버거 버튼 클릭 시 나타나는 메뉴) */}
            {isMobileMenuOpen && (
                <div className="md:hidden px-4 pt-4 pb-3 bg-gray-100 dark:bg-gray-800">
                    <div className="flex flex-wrap items-center gap-3"> {/* 가로 배치 + 줄바꿈 가능 */}
                        {user ? (
                            <>
                                <Link
                                    to="/mypage"
                                    className="px-4 py-2 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
                                    onClick={toggleMobileMenu}
                                >
                                    {user.nickname || user.username}님{user.discriminator && `#${user.discriminator}`}
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        toggleMobileMenu();
                                    }}
                                    className="px-4 py-2 text-base font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                                >
                                    로그아웃
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
                                    onClick={toggleMobileMenu}
                                >
                                    로그인
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 text-base font-medium text-gray-800 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                    onClick={toggleMobileMenu}
                                >
                                    회원가입
                                </Link>
                            </>
                        )}

                        <DarkToggle className="w-full sm:w-auto justify-start px-4 py-2" />
                    </div>
                </div>
            )}


            <div className="w-full bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white shadow-sm md:block ">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex w-full overflow-x-auto whitespace-nowrap">
                    {[
                            { to: '/', label: '홈' },
                            { to: '/sassagae', label: '사건/사고 게시판' },
                            { to: '/statistics', label: '통계' },
                            { to: '/ranking', label: '순위' },
                            { to: '/boards', label: '자유 게시판' },
                            { to: '/raid', label: '레이드 정보' }
                        ].map((tab) => (
                            <NavLink
                                key={tab.to}
                                to={tab.to}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center flex-1  ${isActive
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