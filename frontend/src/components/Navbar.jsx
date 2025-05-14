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
                                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
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
                                `px-4 py-2 rounded-md text-sm font-medium flex items-center ${
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
