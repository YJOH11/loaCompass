// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';     // ✅ 이게 있어야 함
import Footer from './Footer';

const Layout = () => {
    return (
        <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 flex flex-col">
            <Navbar />
            <main className="flex-1 text-inherit">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
