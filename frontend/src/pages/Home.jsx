import React from 'react';
import UpdateList from '../components/UpdateList';
import ShopList from '../components/ShopList';
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-8">


            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Sidebar */}
                <div className="md:col-span-1">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                            사사게 검색
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            사사게(사사로운 사건 게시판)에서 원하는 키워드를 빠르게 검색해보세요.
                        </p>
                        <button
                            onClick={() => navigate('/sassagae')}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition"
                        >
                           검색하기
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="md:col-span-2 space-y-8">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow p-6">
                        <UpdateList />
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow p-6">
                        <ShopList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
