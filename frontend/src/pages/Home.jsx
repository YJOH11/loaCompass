
import UpdateList from '../components/UpdateList';
import ShopList from '../components/ShopList';
import Advertisement from '../components/Advertisement';
import WelcomeBanner from "../components/WelcomeBanner.jsx";
import EventSection from "../components/EventSection.jsx";


function Home() {

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="flex-grow">
                <div className="grid grid-cols-1 lg:grid-cols-[160px_auto_160px] gap-4 p-6">
                    {/* 왼쪽 광고 */}
                    <div className="hidden lg:block">
                        <Advertisement position="1" />
                    </div>
                    
                    {/* 메인 콘텐츠 */}
                    <div>
                        <div className="max-w-6xl mx-auto">
                            <WelcomeBanner />
                            {/* 로스트아크 이벤트 섹션 */}
                            <EventSection />


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* 업데이트 공지 */}
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                    <div className="flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-700 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                                                 <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                        </svg>
                                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">업데이트 내역</h3>
                                        </div>
                                    <a
                                        href="https://lostark.game.onstove.com/News/Notice/List"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 dark:text-blue-400 hover:no-underline"

                                             > 모든 공지사항
                                    </a>
                                    </div>
                                    <div className="p-4">
                                        <UpdateList />
                                    </div>
                                </div>

                                {/* 마리샵 정보 */}
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                    <div className="flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-700 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                            </svg>
                                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">마리샵</h3>
                                        </div>
                                        <a
                                            href="https://m-lostark.game.onstove.com/Shop"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 dark:text-blue-400 hover:no-underline"

                                            >이전 상품 보러가기
                                        </a>
                                    </div>


                                    <div className="p-4">
                                        <ShopList />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 오른쪽 광고 */}
                    <div className="hidden lg:block">
                        <Advertisement position="2" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
