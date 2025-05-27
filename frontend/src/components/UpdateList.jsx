import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateList = () => {
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:8080/api/update")
            .then(res => {
                setUpdates(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("업데이트 불러오기 실패:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="mb-8">
            {loading ? (
                <div className="flex justify-center items-center h-20">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
                </div>
            ) : (
                <div className="space-y-1">
                    {updates.map((item, index) => (
                        <div key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <a 
                                href={item.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="block p-4"
                            >
                                <h3 className="text-md font-medium text-gray-900 dark:text-white">{item.title}</h3>
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UpdateList;
