import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateList = () => {
    const [updates, setUpdates] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/update")
            .then(res => setUpdates(res.data))
            .catch(err => console.error("업데이트 불러오기 실패:", err));
    }, []);

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">업데이트</h2>
            <ul className="list-disc ml-6">
                {updates.map((item, index) => (
                    <li key={index}>
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UpdateList;
