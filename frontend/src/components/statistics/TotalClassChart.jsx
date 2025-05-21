import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LabelList, PieChart, Pie, Cell
} from 'recharts';
import {
  CHART_COLORS,
  LABEL_STYLE,
  TOOLTIP_STYLE,
  formatPercent
} from '../../styles/chartStyles'; // ✅ 상대경로

export default function TotalClassChart() {
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState('bar');

  useEffect(() => {
    axios.get('/api/statistics/total-class-distribution')
      .then(res => {
        const sorted = [...res.data].sort((a, b) => b.count - a.count);
        setData(sorted);
      })
      .catch(err => console.error(err));
  }, []);

  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="w-full h-[500px] mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">전체 직업 분포</h2>
        <button
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => {
                const percent = formatPercent(value, total);
                return [`${percent}`, '비율'];
              }}
              contentStyle={TOOLTIP_STYLE}
            />
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
            <Tooltip
              formatter={(value) => {
                const percent = formatPercent(value, total);
                return [`${value}명 (${percent})`, '인원'];
              }}
              contentStyle={TOOLTIP_STYLE}
            />
            <Legend />
            <Bar dataKey="count" name="인원 수">
              <LabelList
                dataKey="count"
                position="right"
                content={({ value }) => `${value} (${formatPercent(value, total)})`}
                style={LABEL_STYLE}
              />
              {data.map((_, index) => (
                <Cell key={`bar-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
