import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LabelList,
  PieChart, Pie, Cell
} from 'recharts';
import {
  CHART_COLORS,
  LABEL_STYLE,
  TOOLTIP_STYLE,
  formatPercent
} from '../../styles/chartStyles';

export default function TotalClassChart() {
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState('bar');
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    axios.get('/api/statistics/total-class-distribution')
      .then(res => {
        const sorted = [...res.data].sort((a, b) => b.count - a.count);
        setData(sorted);
      })
      .catch(err => console.error(err));
  }, []);

  const total = data.reduce((sum, d) => sum + d.count, 0);

  const handleClassClick = (entry) => {
    setSelectedClass(selectedClass?.characterClass === entry.characterClass ? null : entry);
  };

  return (
    <div className="space-y-6">
      {/* 차트 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">직업별 분포</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            전체 캐릭터: {total.toLocaleString()}개
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'bar'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            onClick={() => setViewMode('bar')}
          >
            Bar
          </button>
          <button
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'pie'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            onClick={() => setViewMode('pie')}
          >
            Pie
          </button>
        </div>
      </div>

      {/* 선택된 직업 정보 */}
      {selectedClass && (
        <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4">
          <h3 className="font-medium text-indigo-900 dark:text-indigo-200">
            {selectedClass.characterClass}
          </h3>
          <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
            캐릭터 수: {selectedClass.count.toLocaleString()}개 ({formatPercent(selectedClass.count, total)})
          </p>
        </div>
      )}

      {/* 차트 */}
      <div className="h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          {viewMode === 'bar' ? (
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 20, right: 30, bottom: 20, left: 120 }}
              onClick={(data) => data && handleClassClick(data.activePayload[0].payload)}
            >
              <XAxis
                type="number"
                stroke="currentColor"
                tick={{ fill: 'currentColor', fontSize: 12 }}
              />
              <YAxis
                type="category"
                dataKey="characterClass"
                stroke="currentColor"
                tick={{ fill: 'currentColor', fontSize: 12 }}
              />
              <Tooltip
                formatter={(value) => {
                  const percent = formatPercent(value, total);
                  return [`${value.toLocaleString()}개 (${percent})`, '캐릭터 수'];
                }}
                contentStyle={{
                  ...TOOLTIP_STYLE,
                  backgroundColor: '#1f2937',
                  color: '#fff',
                  borderRadius: '0.5rem',
                  border: 'none',
                }}
              />
              <Legend wrapperStyle={{ color: 'currentColor' }} />
              <Bar
                dataKey="count"
                name="캐릭터 수"
                radius={[0, 4, 4, 0]}
              >
                <LabelList
                  dataKey="count"
                  position="right"
                  content={({ value }) => `${value.toLocaleString()} (${formatPercent(value, total)})`}
                  style={{ ...LABEL_STYLE, fill: 'currentColor' }}
                />
                {data.map((entry, index) => (
                  <Cell
                    key={`bar-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                    opacity={selectedClass?.characterClass === entry.characterClass ? 1 : 0.7}
                    className="transition-opacity duration-200"
                  />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="characterClass"
                cx="50%"
                cy="50%"
                outerRadius={160}
                innerRadius={100}
                paddingAngle={1}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                    opacity={selectedClass?.characterClass === entry.characterClass ? 1 : 0.7}
                    className="transition-opacity duration-200"
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => {
                  const percent = formatPercent(value, total);
                  return [`${value.toLocaleString()}개 (${percent})`, '캐릭터 수'];
                }}
                contentStyle={{
                  ...TOOLTIP_STYLE,
                  backgroundColor: '#1f2937',
                  color: '#fff',
                  borderRadius: '0.5rem',
                  border: 'none',
                }}
              />
              <Legend
                wrapperStyle={{ color: 'currentColor' }}
                onClick={(entry) => handleClassClick(entry)}
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
