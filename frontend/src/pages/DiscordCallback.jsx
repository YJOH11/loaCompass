import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const DiscordCallback = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingStage, setLoadingStage] = useState('요청 처리 중...');

    useEffect(() => {
        const exchangeCodeForToken = async () => {
            if (!code) {
                console.error('No code found in URL');
                setError('인증 코드를 찾을 수 없습니다.');
                setLoading(false);
                return;
            }

            console.log('Got Discord authorization code:', code.slice(0, 10) + '...');
            setLoadingStage('디스코드 인증 코드 확인 중...');

            try {
                console.log('Sending request to backend:', { code });
                setLoadingStage('서버에 인증 정보 전송 중...');
                
                const response = await axios.post('http://localhost:8080/api/auth/discord', { code });
                
                console.log('로그인 성공:', response.data);
                setLoadingStage('로그인 정보 처리 중...');
                
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
                
                setLoadingStage('로그인 완료! 메인 페이지로 이동합니다...');
                
                // 직접 사용자 데이터를 전역 상태에 저장하는 방법이 있다면 좋겠지만
                // 현재는 없으므로 홈으로 리다이렉트 후 새로고침
                setTimeout(() => {
                    navigate('/', { replace: true });
                    setTimeout(() => {
                        window.location.reload(); // 페이지 강제 새로고침
                    }, 100);
                }, 500);
            } catch (error) {
                console.error('디스코드 로그인 실패:', error);
                console.error('오류 상세 정보:', error.response?.data || '상세 정보 없음');
                setError('디스코드 로그인 처리 중 일시적인 오류가 발생했습니다.');
                setLoading(false);
            }
        };

        exchangeCodeForToken();
    }, [code, navigate]);

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
                    <div className="flex items-center justify-center mb-4">
                        <svg className="w-12 h-12 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-4">디스코드 로그인 처리 중</h2>
                    <div className="py-3 text-center text-gray-600 dark:text-gray-300 mb-4">
                        정보를 처리하는 중입니다. 잠시만 기다려주세요.
                    </div>
                    <button 
                        onClick={() => navigate('/login')} 
                        className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        로그인 페이지로 돌아가기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <div className="flex justify-center mb-6">
                    <svg className="w-16 h-16 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">디스코드 로그인 처리 중</h2>
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden my-6">
                    <div className="absolute h-full bg-indigo-600 animate-pulse"></div>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">{loadingStage}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                    잠시만 기다려주세요. 자동으로 홈페이지로 이동합니다.
                </p>
            </div>
        </div>
    );
};

export default DiscordCallback;
