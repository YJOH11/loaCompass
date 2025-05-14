import React, { useState, useEffect } from 'react';
import UpdateList from '../components/UpdateList';
import ShopList from '../components/ShopList';
import {useNavigate, Link} from "react-router-dom";
import axios from 'axios';

function Home() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8080/api/events');
                setEvents(response.data);
                setError(null);
            } catch (err) {
                console.error('이벤트 데이터를 가져오는 중 오류 발생:', err);
                setError('이벤트 정보를 불러올 수 없습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* 네비게이션 바 */}
            <nav className="bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-center h-16">
                        <div className="flex items-center">
                            <div className="hidden md:block">
                                <div className="flex space-x-4">
                                    <Link 
                                        to="/" 
                                        className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'home' ? 'bg-gray-300 dark:bg-gray-900' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                                        onClick={() => setActiveTab('home')}
                                    >
                                        홈
                                    </Link>
                                    <Link 
                                        to="/sassagae" 
                                        className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'sassagae' ? 'bg-gray-300 dark:bg-gray-900' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                                        onClick={() => setActiveTab('sassagae')}
                                    >
                                        사사게 게시판
                                    </Link>
                                    <Link 
                                        to="/guild" 
                                        className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'guild' ? 'bg-gray-300 dark:bg-gray-900' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                                        onClick={() => setActiveTab('guild')}
                                    >
                                        길드
                                    </Link>
                                    <Link 
                                        to="/ranking" 
                                        className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'ranking' ? 'bg-gray-300 dark:bg-gray-900' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                                        onClick={() => setActiveTab('ranking')}
                                    >
                                        순위
                                    </Link>
                                    <Link 
                                        to="/statistics" 
                                        className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'statistics' ? 'bg-gray-300 dark:bg-gray-900' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                                        onClick={() => setActiveTab('statistics')}
                                    >
                                        통계
                                    </Link>
                                    <Link 
                                        to="/tools" 
                                        className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'tools' ? 'bg-gray-300 dark:bg-gray-900' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                                        onClick={() => setActiveTab('tools')}
                                    >
                                        도구
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* 모바일 메뉴 버튼 - 중앙에서 우측으로 이동 */}
                        <div className="md:hidden absolute right-4 flex items-center h-16">
                            <button 
                                className="mobile-menu-button" 
                                onClick={toggleMobileMenu}
                            >
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* 모바일 메뉴 */}
                <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link 
                            to="/" 
                            className={`block px-3 py-2 rounded-md text-base font-medium ${activeTab === 'home' ? 'bg-gray-300 dark:bg-gray-900' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                            onClick={() => {
                                setActiveTab('home');
                                setMobileMenuOpen(false);
                            }}
                        >
                            홈
                        </Link>
                        <Link 
                            to="/sassagae" 
                            className={`block px-3 py-2 rounded-md text-base font-medium ${activeTab === 'sassagae' ? 'bg-gray-300 dark:bg-gray-900' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                            onClick={() => {
                                setActiveTab('sassagae');
                                setMobileMenuOpen(false);
                            }}
                        >
                            사사게 게시판
                        </Link>
                        <Link 
                            to="/guild" 
                            className={`block px-3 py-2 rounded-md text-base font-medium ${activeTab === 'guild' ? 'bg-gray-300 dark:bg-gray-900' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                            onClick={() => {
                                setActiveTab('guild');
                                setMobileMenuOpen(false);
                            }}
                        >
                            길드
                        </Link>
                        <Link 
                            to="/ranking" 
                            className={`block px-3 py-2 rounded-md text-base font-medium ${activeTab === 'ranking' ? 'bg-gray-300 dark:bg-gray-900' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                            onClick={() => {
                                setActiveTab('ranking');
                                setMobileMenuOpen(false);
                            }}
                        >
                            순위
                        </Link>
                        <Link 
                            to="/statistics" 
                            className={`block px-3 py-2 rounded-md text-base font-medium ${activeTab === 'statistics' ? 'bg-gray-300 dark:bg-gray-900' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                            onClick={() => {
                                setActiveTab('statistics');
                                setMobileMenuOpen(false);
                            }}
                        >
                            통계
                        </Link>
                        <Link 
                            to="/tools" 
                            className={`block px-3 py-2 rounded-md text-base font-medium ${activeTab === 'tools' ? 'bg-gray-300 dark:bg-gray-900' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                            onClick={() => {
                                setActiveTab('tools');
                                setMobileMenuOpen(false);
                            }}
                        >
                            도구
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="flex-grow bg-white text-black dark:bg-black dark:text-white p-6">
                {/* 로스트아크 이벤트 섹션 */}
                <div className="mb-8 bg-black text-white p-4 rounded">
                    <h2 className="text-2xl font-bold mb-4 text-center border-b border-gray-700 pb-2">진행중인 로스트아크 이벤트</h2>

                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-400 dark:border-white"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 dark:text-red-400 py-4">{error}</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map(event => (
                                <a
                                    key={event.id}
                                    href={event.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cursor-pointer hover:opacity-90 transition-opacity"
                                >
                                    <div className="relative overflow-hidden rounded shadow">
                                        <img
                                            src={event.imageUrl}
                                            alt={event.title}
                                            className="w-full object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs py-2 px-2">
                                            <p className="text-center font-medium">{event.period}</p>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                {/* 업데이트 & 마리샵 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
                        <UpdateList />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
                        <ShopList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
