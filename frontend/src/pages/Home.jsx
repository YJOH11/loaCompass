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
                                        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${activeTab === 'home' ? 'bg-gray-300 dark:bg-gray-900' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                                        onClick={() => setActiveTab('home')}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                        </svg>
                                        홈
                                    </Link>
                                    <Link 
                                        to="/sassagae" 
                                        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${activeTab === 'sassagae' ? 'bg-gray-300 dark:bg-gray-900' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                                        onClick={() => setActiveTab('sassagae')}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                        </svg>
                                        사사게 게시판
                                    </Link>
                                    <Link 
                                        to="/guild" 
                                        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${activeTab === 'guild' ? 'bg-gray-300 dark:bg-gray-900' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                                        onClick={() => setActiveTab('guild')}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                        </svg>
                                        길드
                                    </Link>
                                    <Link 
                                        to="/ranking" 
                                        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${activeTab === 'ranking' ? 'bg-gray-300 dark:bg-gray-900' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                                        onClick={() => setActiveTab('ranking')}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                                        </svg>
                                        순위
                                    </Link>
                                    <Link 
                                        to="/statistics" 
                                        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${activeTab === 'statistics' ? 'bg-gray-300 dark:bg-gray-900' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                                        onClick={() => setActiveTab('statistics')}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                        </svg>
                                        통계
                                    </Link>
                                    <Link 
                                        to="/tools" 
                                        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${activeTab === 'tools' ? 'bg-gray-300 dark:bg-gray-900' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                                        onClick={() => setActiveTab('tools')}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                        </svg>
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
                            className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${activeTab === 'home' ? 'bg-gray-300 dark:bg-gray-900' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                            onClick={() => {
                                setActiveTab('home');
                                setMobileMenuOpen(false);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            홈
                        </Link>
                        <Link 
                            to="/sassagae" 
                            className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${activeTab === 'sassagae' ? 'bg-gray-300 dark:bg-gray-900' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                            onClick={() => {
                                setActiveTab('sassagae');
                                setMobileMenuOpen(false);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                            </svg>
                            사사게 게시판
                        </Link>
                        <Link 
                            to="/guild" 
                            className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${activeTab === 'guild' ? 'bg-gray-300 dark:bg-gray-900' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                            onClick={() => {
                                setActiveTab('guild');
                                setMobileMenuOpen(false);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                            길드
                        </Link>
                        <Link 
                            to="/ranking" 
                            className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${activeTab === 'ranking' ? 'bg-gray-300 dark:bg-gray-900' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                            onClick={() => {
                                setActiveTab('ranking');
                                setMobileMenuOpen(false);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                            </svg>
                            순위
                        </Link>
                        <Link 
                            to="/statistics" 
                            className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${activeTab === 'statistics' ? 'bg-gray-300 dark:bg-gray-900' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                            onClick={() => {
                                setActiveTab('statistics');
                                setMobileMenuOpen(false);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                            </svg>
                            통계
                        </Link>
                        <Link 
                            to="/tools" 
                            className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${activeTab === 'tools' ? 'bg-gray-300 dark:bg-gray-900' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                            onClick={() => {
                                setActiveTab('tools');
                                setMobileMenuOpen(false);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                            </svg>
                            도구
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="flex-grow bg-white text-black dark:bg-black dark:text-white p-6">
                {/* 로스트아크 이벤트 섹션 */}
                <div className="mb-8 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
                    <div className="flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                            진행중인 로스트아크 이벤트
                        </h2>
                        <Link to="/events" className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                            모든 이벤트 보기
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>

                    <div className="p-6">
                        {loading ? (
                            <div className="flex justify-center items-center h-40">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-400 dark:border-white"></div>
                            </div>
                        ) : error ? (
                            <div className="text-center text-red-500 dark:text-red-400 py-4">{error}</div>
                        ) : events.length === 0 ? (
                            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                                이벤트 정보를 불러올 수 없습니다.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {events.map(event => (
                                    <a
                                        key={event.id}
                                        href={event.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={event.imageUrl}
                                                alt={event.title}
                                                className="w-full h-40 object-cover"
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
                </div>

                {/* 업데이트 & 마리샵 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 최신 업데이트 */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
                        <div className="flex items-center px-6 py-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-700 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                            </svg>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">최신 업데이트</h3>
                        </div>
                        <div className="p-4">
                            <UpdateList />
                        </div>
                    </div>

                    {/* 마리샵 정보 */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
                        <div className="flex items-center px-6 py-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-700 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                            </svg>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">마리샵 정보</h3>
                        </div>
                        <div className="p-4">
                            <ShopList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
