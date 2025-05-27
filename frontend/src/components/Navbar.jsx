// components/Navbar.jsx
import React from 'react';
import DarkToggle from "./DarkToggle.jsx";
import CharacterSearchInput from './CharacterSearchInput';
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    const menuItems = [
        { name: '홈', path: '/' },
        { name: '길드', path: '/guild' },
        { name: '순위', path: '/ranking' },
        { name: '통계', path: '/stats' },
        { name: '도구', path: '/tools' },
        { name: '자유게시판', path: '/boards' },
    ];

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
            </div>

            {/* 두 번째 줄 */}
            <div className="flex justify-center gap-3 py-2 border-t border-gray-300 dark:border-gray-700">
                {menuItems.map((item, idx) => (
                    <NavLink
                        key={idx}
                        to={item.path}
                        className={({ isActive }) =>
                            `px-4 py-2 rounded text-center border transition
                            border-gray-300 dark:border-gray-700
                            ${
                                isActive
                                    ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-semibold'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white'
                            }`
                        }
                    >
                        {item.name}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
