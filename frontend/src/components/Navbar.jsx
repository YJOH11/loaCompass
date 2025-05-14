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

        </nav>
    );
};

export default Navbar;
