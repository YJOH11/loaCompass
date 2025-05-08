import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full bg-gray-100 dark:bg-gray-900 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4">
                <div className="flex justify-center space-x-8 mb-2">
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">1:1문의</a>
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">후원안내</a>
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">디스코드</a>
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Credit</a>
                </div>
                <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
                    Copyright 2025 로침반. kr All rights reserved.
                </div>
            </div>
        </footer>
    );
}
