// components/Navbar.jsx
import React from 'react';
import DarkToggle from "./DarkToggle.jsx";
import CharacterSearchInput from './CharacterSearchInput';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="w-full bg-gray-900 text-white px-4 py-3 flex items-center justify-between">

            <div className="text-2xl font-bold">
                <Link to="/" className="hover:text-indigo-400 transition">
                    로침반
                </Link>
                <span className="text-sm text-gray-400 ml-1"></span>
            </div>

            {/* 검색창 */}
            <div className="flex-1 mx-6">
                <div className="relative">
                    <CharacterSearchInput />
                </div>
            </div>

            {/* 우측 버튼들 */}
            <div className="flex items-center gap-2">
                <DarkToggle />
             {/*   <button className="p-2 hover:bg-gray-800 rounded flex items-center gap-1">
                    🌐 <span className="text-sm">KO</span> ▼
                </button>*/}
            </div>
        </nav>
    );
};

export default Navbar;
