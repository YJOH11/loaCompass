import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DiscordLoginButton = () => {
    const [discordUser, setDiscordUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('discordUser');
        if (storedUser) {
            setDiscordUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('discordUser');
        setDiscordUser(null);
    };

    const CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
    const REDIRECT_URI = encodeURIComponent(import.meta.env.VITE_DISCORD_REDIRECT_URI);
    const RESPONSE_TYPE = 'code';
    const SCOPE = encodeURIComponent('identify email');

    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;


    return (
        <>
            {discordUser ? (
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
                >
                    로그아웃 ({discordUser.username})
                </button>
            ) : (
                <Link
                    to="/login"
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
                >
                    로그인
                </Link>
            )}
        </>
    );
};

export default DiscordLoginButton;
