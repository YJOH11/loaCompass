// components/Navbar.jsx
import React from 'react';
import DarkToggle from "./DarkToggle.jsx";
import CharacterSearchInput from './CharacterSearchInput';
import { Link, NavLink } from "react-router-dom";
import DiscordLoginButton from "./DiscordLoginButton.jsx";

const Navbar = () => {

    return (
        <nav className="w-full bg-white dark:bg-gray-900 text-black dark:text-white px-6 md:px-12">
            {/* 첫 번째 줄 */}
            <div className="flex items-center justify-between py-3">
                <div className="text-2xl font-bold">
                    <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                        로침반
                    </Link>
                </div>

                <div className="flex-1 mx-6">
                    <CharacterSearchInput />
                </div>

                <div className="flex items-center gap-2">
                    <DarkToggle />
                </div>

                <div className="flex items-center gap-2">
                    <DiscordLoginButton />
                </div>
            </div>

            {/* 두 번째 줄 - 탭 네비게이션 */}
            <div className="w-full bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white shadow-sm">
                <div className="flex justify-center space-x-4 py-2">
                    {[
                        { to: '/', label: '홈' },
                        { to: '/sassagae', label: '사사게 게시판' },
                        { to: '/guild', label: '길드' },
                        { to: '/ranking', label: '순위' },
                        { to: '/statistics', label: '통계' },
                        { to: '/tools', label: '도구' }
                    ].map((tab) => (
                        <NavLink
                            key={tab.to}
                            to={tab.to}
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-md text-sm font-medium ${
                                    isActive
                                        ? 'bg-gray-300 dark:bg-gray-900'
                                        : 'hover:bg-gray-300 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            {tab.label}
                        </NavLink>
                    ))}
                </div>
            </div>


        </nav>
    );
};

export default Navbar;
