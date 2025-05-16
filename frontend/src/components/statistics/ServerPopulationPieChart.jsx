import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff8042',
  '#a28be6', '#ff7f50', '#00bcd4', '#a3d977'
];

export default function ServerPopulationPieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/statistics/server-count')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="w-full h-[400px] mt-8">
      <h2 className="text-xl font-bold mb-4">서버별 인원 비율</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="serverName"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={60}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
