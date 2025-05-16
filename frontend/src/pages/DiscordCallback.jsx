import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const DiscordCallback = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        const exchangeCodeForToken = async () => {
            if (!code) {
                console.error('No code found in URL');
                setError('인증 코드를 찾을 수 없습니다.');
                return;
            }

            console.log('Got Discord authorization code:', code.slice(0, 10) + '...');

            try {
                console.log('Sending request to backend:', { code });
                const response = await axios.post('http://localhost:8080/api/auth/discord', { code });
                
                console.log('로그인 성공:', response.data);
                
                if (!response.data || !response.data.id) {
                    throw new Error('Backend returned invalid user data');
                }
                
                // 로그인 성공 시 처리
                localStorage.setItem('discordUser', JSON.stringify(response.data));
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token); // JWT 토큰이 있다면 저장
                }

                // 로컬 스토리지 이벤트 강제 발생 (다른 탭/창에서 감지 가능)
                window.dispatchEvent(new Event('storage'));
                
                // 직접 사용자 데이터를 전역 상태에 저장하는 방법이 있다면 좋겠지만
                // 현재는 없으므로 홈으로 리다이렉트 후 새로고침
                navigate('/', { replace: true });
                setTimeout(() => {
                    window.location.reload(); // 페이지 강제 새로고침
                }, 100);
            } catch (error) {
                console.error('디스코드 로그인 실패:', error);
                console.error('오류 상세 정보:', error.response?.data || '상세 정보 없음');
                setError('디스코드 로그인에 실패했습니다. 다시 시도해주세요.');
            }
        };

        exchangeCodeForToken();
    }, [code, navigate]);

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen p-4">
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 max-w-md">
                    <p className="font-bold">오류 발생</p>
                    <p>{error}</p>
                </div>
                <button 
                    onClick={() => navigate('/login')} 
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    로그인 페이지로 돌아가기
                </button>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-lg">디스코드 로그인 처리 중...</p>
                <p className="text-sm text-gray-500 mt-2">잠시만 기다려주세요.</p>
            </div>
        </div>
    );
};

export default DiscordCallback;
