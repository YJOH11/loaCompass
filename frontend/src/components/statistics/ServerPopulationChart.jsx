import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import {
  CHART_COLORS,
  LABEL_STYLE,
  TOOLTIP_STYLE,
  formatPercent
} from "../../styles/chartStyles";

export default function ServerPopulationChart() {
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState("bar");

  useEffect(() => {
    axios.get('/api/statistics/server-count')
      .then(res => {
        const sorted = [...res.data].sort((a, b) => b.count - a.count);
        setData(sorted);
      })
      .catch(error => console.error('통계 데이터를 불러오는 중 오류:', error));
  }, []);

  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="w-full h-[400px] mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">서버별 인원 비율</h2>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
          onClick={() => setViewMode(viewMode === 'bar' ? 'pie' : 'bar')}
        >
          {viewMode === 'bar' ? 'Pie 보기' : 'Bar 보기'}
        </button>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        {viewMode === 'bar' ? (
          <BarChart data={data} margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
            <XAxis dataKey="serverName" />
            <YAxis />
            <Tooltip
              formatter={(value) => {
                const percent = formatPercent(value, total);
                return [`${value}명 (${percent})`, '인원'];
              }}
              contentStyle={TOOLTIP_STYLE}
            />
            <Legend />
            <Bar dataKey="count" name="인원 수">
              {data.map((_, idx) => (
                <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
              ))}
            </Bar>
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
        )}
      </ResponsiveContainer>
    </div>
  );
}
