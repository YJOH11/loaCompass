import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClearRecordCard from '../components/clear/ClearRecordCard';

const ClearRecordListPage = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get('/api/clear-records')
      .then(res => setRecords(res.data))
      .catch(err => console.error('불러오기 실패:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">제출된 클리어 기록</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {records.map((r, idx) => (
            <ClearRecordCard key={idx} record={r} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClearRecordListPage;
