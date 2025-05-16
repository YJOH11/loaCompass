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
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                <div className="flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-700 border-b">
                                    <div className="flex items-center">
                                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">업데이트 내역</h3>
                                    </div>
                                    <a
                                        href="https://lostark.game.onstove.com/News/Notice/List"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 dark:text-blue-400"
                                    >
                                        모든 공지사항
                                    </a>
                                </div>
                                <div className="p-4">
                                    <UpdateList />
                                </div>
                            </div>

                            {/* 마리샵 정보 */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                <div className="flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-700 border-b">
                                    <div className="flex items-center">
                                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">마리샵</h3>
                                    </div>
                                    <a
                                        href="https://m-lostark.game.onstove.com/Shop"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 dark:text-blue-400"
                                    >
                                        이전 상품 보러가기
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
