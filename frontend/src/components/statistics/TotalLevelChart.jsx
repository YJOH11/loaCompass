import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LabelList
} from 'recharts';

const COLORS = [
  '#cfd8dc', '#aed581', '#81c784', '#4caf50', '#388e3c', '#2e7d32',
  '#66bb6a', '#26a69a', '#00acc1', '#039be5', '#1e88e5', '#5c6bc0', '#7e57c2', '#ab47bc'
];

export default function TotalLevelChart() {
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState("bar");

  useEffect(() => {
    axios.get('/api/statistics/total-level-distribution')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  const total = data.reduce((sum, d) => sum + d.count, 0);
  const dataWithPercentage = data.map((d, i) => ({
    ...d,
    percent: total ? ((d.count / total) * 100).toFixed(1) : 0,
    fill: COLORS[i % COLORS.length]
  }));

  return (
    <div className="w-full h-[500px] mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">레벨 분포</h2>
        <button
          onClick={() => setViewMode(viewMode === 'bar' ? 'pie' : 'bar')}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {viewMode === 'bar' ? 'Pie 보기' : 'Bar 보기'}
        </button>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        {viewMode === 'bar' ? (
          <BarChart data={dataWithPercentage} layout="vertical" margin={{ top: 10, right: 30, left: 100, bottom: 10 }}>
            <XAxis type="number" />
            <YAxis dataKey="levelRange" type="category" width={100} />
            <Tooltip />
            <Legend />
            <Bar dataKey="percent" name="백분율(%)" fill="#8884d8">
              <LabelList
                dataKey="percent"
                position="right"
                content={({ value, x, y }) => (
                  <text x={x + 10} y={y + 5} fontSize={12} fill="#555">{value}%</text>
                )}
              />
            </Bar>
          </BarChart>
        ) : (
          <PieChart>
            <Pie
              data={dataWithPercentage}
              dataKey="count"
              nameKey="levelRange"
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={60}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
            >
              {dataWithPercentage.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
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
