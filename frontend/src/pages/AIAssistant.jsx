import React, { useState, useRef, useEffect } from 'react';

const AIAssistant = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef(null);

    // 채팅창 자동 스크롤
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');
        
        // 사용자 메시지 추가
        setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const res = await fetch("http://localhost:8080/api/ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ message: userMessage }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            const data = await res.json();
            
            // AI 응답 추가
            setMessages(prev => [...prev, { type: 'assistant', content: data.response }]);
        } catch (error) {
            console.error('AI 응답 에러:', error);
            setMessages(prev => [...prev, { 
                type: 'assistant', 
                content: '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' 
            }]);
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    {/* 헤더 */}
                    <div className="bg-indigo-600 p-4">
                        <h1 className="text-xl font-bold text-white flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                                <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                                <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                            </svg>
                            로아 AI 도우미
                        </h1>
                        <p className="text-indigo-200 mt-1">
                            게임 관련 궁금한 점을 물어보세요!
                        </p>
                    </div>

                    {/* 채팅 영역 */}
                    <div 
                        ref={chatContainerRef}
                        className="h-[500px] overflow-y-auto p-4 space-y-4"
                    >
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[70%] rounded-lg p-3 ${
                                        message.type === 'user'
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                                    }`}
                                >
                                    {message.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-3 flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 입력 영역 */}
                    <form onSubmit={handleSubmit} className="border-t dark:border-gray-700 p-4">
                        <div className="flex space-x-4">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="질문을 입력하세요..."
                                className="flex-1 rounded-lg border dark:border-gray-600 p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                            >
                                전송
                            </button>
                        </div>
                    </form>
                </div>

                {/* 도움말 */}
                <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        이런 것들을 물어보세요!
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <p className="text-gray-700 dark:text-gray-300">🎮 게임 공략</p>
                            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                <li>• 레이드/던전 공략 방법</li>
                                <li>• 클래스별 스킬 빌드</li>
                                <li>• 효율적인 육성 루트</li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-700 dark:text-gray-300">💰 경제 활동</p>
                            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                <li>• 골드 파밍 방법</li>
                                <li>• 거래소 시세 분석</li>
                                <li>• 재화 효율적 사용법</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIAssistant; 