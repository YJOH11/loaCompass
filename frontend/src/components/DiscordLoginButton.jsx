import React, { useEffect, useState } from 'react';

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

    const CLIENT_ID = '1370226057252438068';
    const REDIRECT_URI = encodeURIComponent('http://localhost:5173/discord/callback');
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
                <a
                    href={discordAuthUrl}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
                >
                    로그인
                </a>
            )}
        </>
    );
};

export default DiscordLoginButton;
