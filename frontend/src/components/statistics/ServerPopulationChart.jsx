import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff8042',
  '#a28be6', '#ff7f50', '#00bcd4', '#a3d977'
];

export default function ServerPopulationChart() {
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState("bar");

  useEffect(() => {
    axios.get('/api/statistics/server-count')
      .then(response => setData(response.data))
      .catch(error => console.error('통계 데이터를 불러오는 중 오류:', error));
  }, []);

  return (
    <div className="w-full h-[400px] mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">서버별 인원 비율</h2>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
          onClick={() => setViewMode(viewMode === 'bar' ? 'pie' : 'bar')}
          
        >
          {viewMode === 'bar' ? 'Pie 보기' : 'Bar 보기'}
        </button>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        {viewMode === 'bar' ? (
          <BarChart data={data}>
            <XAxis dataKey="serverName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" name="인원 수" />
          </BarChart>
        ) : (
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="serverName"
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={60}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
