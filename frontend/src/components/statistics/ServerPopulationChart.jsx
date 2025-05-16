import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';

export default function ServerPopulationChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/statistics/server-count')
      .then(response => setData(response.data))
      .catch(error => console.error('통계 데이터를 불러오는 중 오류:', error));
  }, []);

  return (
    <div className="w-full h-96">
      <h2 className="text-xl font-bold mb-4">서버별 인원 수</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="serverName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" name="인원 수" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
