import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LabelList, PieChart, Pie, Cell
} from 'recharts';

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff8042',
  '#a28be6', '#ff7f50', '#00bcd4', '#a3d977',
  '#ba68c8', '#ffb347', '#26a69a', '#d84315',
  '#795548', '#64b5f6', '#e53935', '#90caf9'
];

export default function TotalClassChart() {
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState('pie');

  useEffect(() => {
    axios.get('/api/statistics/total-class-distribution')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="w-full h-[500px] mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">전체 직업 분포</h2>
        <button
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setViewMode(viewMode === 'pie' ? 'bar' : 'pie')}
        >
          {viewMode === 'pie' ? 'Bar 보기' : 'Pie 보기'}
        </button>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        {viewMode === 'pie' ? (
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="characterClass"
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
        ) : (
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 10, right: 30, bottom: 10, left: 120 }}
          >
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="characterClass" />
            <Tooltip formatter={(value) => [`${value}명 (${((value / total) * 100).toFixed(1)}%)`, '인원']} />
            <Legend />
            <Bar dataKey="count" name="백분율(%)">
              <LabelList
                dataKey="count"
                position="right"
                content={({ value }) => `${value} (${((value / total) * 100).toFixed(1)}%)`}
              />
              {data.map((_, index) => (
                <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
