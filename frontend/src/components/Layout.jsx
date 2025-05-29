// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';     // ✅ 이게 있어야 함
import Footer from './Footer';

const Layout = () => {
    return (
        <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 flex flex-col">
            <Navbar />      {/* ✅ 이거 꼭 있어야 보여요 */}
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
