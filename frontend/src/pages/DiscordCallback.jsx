import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const DiscordCallback = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const navigate = useNavigate();

    useEffect(() => {
        const exchangeCodeForToken = async () => {
            if (!code) {
                console.error('No code found');
                return;
            }

            try {
                const response = await axios.post('http://localhost:8080/api/auth/discord', { code });
                console.log('로그인 성공:', response.data);
                // DiscordCallback.jsx 안에서 로그인 성공 후
                localStorage.setItem('discordUser', JSON.stringify(response.data));

                navigate('/');
                window.location.reload();  // ✅ 페이지 강제 새로고침
            } catch (error) {
                console.error('로그인 실패:', error);
            }
        };

        exchangeCodeForToken();
    }, [code, navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <p>로그인 처리 중...</p>
        </div>
    );
};

export default DiscordCallback;
