import React from 'react';
import UpdateList from '../components/UpdateList';
import ShopList from '../components/ShopList';
import WelcomeBanner from '../components/WelcomeBanner';
import EventSection from '../components/EventSection';
import FloatingAd from '../components/FloatingAd';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 relative">

            {/* 좌우 광고 */}
            <FloatingAd position="left" />
            <FloatingAd position="right" />

            {/* 본문 */}
            <div className="flex justify-center w-full px-4 mt-6">
                <div className="w-full max-w-screen-xl">
                    <div className="mx-auto max-w-[960px]">
                        {/* 환영 배너 + 이벤트 */}
                        <div className="mb-6">
                            <WelcomeBanner />
                            <EventSection />
                        </div>

                        {/* 업데이트 + 마리샵 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {/* 업데이트 공지 */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                                <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-800 dark:to-blue-700">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14" />
                                        </svg>
                                        <h3 className="text-lg font-bold text-white">업데이트 내역</h3>
                                    </div>
                                    <a
                                        href="https://lostark.game.onstove.com/News/Notice/List"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-white hover:text-blue-200 transition-colors duration-200 flex items-center"
                                    >
                                        <span>모든 공지사항</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                </div>
                                <div className="p-4">
                                    <UpdateList />
                                </div>
                            </div>

                            {/* 마리샵 정보 */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                                <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-800 dark:to-blue-700">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                        </svg>
                                        <h3 className="text-lg font-bold text-white">마리샵</h3>
                                    </div>
                                    <a
                                        href="https://m-lostark.game.onstove.com/Shop"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-white hover:text-blue-200 transition-colors duration-200 flex items-center"
                                    >
                                        <span>이전 상품 보러가기</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                </div>
                                <div className="p-4">
                                    <ShopList />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
