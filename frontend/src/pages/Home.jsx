import React from 'react';
import UpdateList from '../components/UpdateList';
import ShopList from '../components/ShopList';

function Home() {
    return (

        <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white p-6">
            <div className="space-x-4 mb-6">
                <button
                    onClick={() => navigate('/sassagae')}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg shadow"
                >
                    📰 사사게 게시판 검색
                </button>
            </div>

            <UpdateList />
            <ShopList />
        </div>


    );
}

export default Home;
