import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LabelList, AreaChart, Area, CartesianGrid
} from 'recharts';
import {
  CHART_COLORS,
  LABEL_STYLE,
  TOOLTIP_STYLE,
  formatPercent
} from '../../styles/chartStyles';

export default function TotalLevelChart() {
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState("bar");
  const [selectedLevel, setSelectedLevel] = useState(null);

  useEffect(() => {
    axios.get('/api/statistics/total-level-distribution')
      .then(res => {
        const raw = res.data;
        // 레벨 범위로 정렬
        const sorted = [...raw].sort((a, b) => {
          const levelA = parseInt(a.levelRange.split('-')[0]);
          const levelB = parseInt(b.levelRange.split('-')[0]);
          return levelA - levelB;
        });
        setData(sorted);
      })
      .catch(err => console.error(err));
  }, []);

  const total = data.reduce((sum, d) => sum + d.count, 0);

  const handleLevelClick = (entry) => {
    setSelectedLevel(selectedLevel?.levelRange === entry.levelRange ? null : entry);
  };

  return (
    <div className="space-y-6">
      {/* 차트 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">레벨별 분포</h2>
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
              viewMode === 'area'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            onClick={() => setViewMode('area')}
          >
            Area
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

      {/* 선택된 레벨 정보 */}
      {selectedLevel && (
        <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4">
          <h3 className="font-medium text-indigo-900 dark:text-indigo-200">
            레벨 {selectedLevel.levelRange}
          </h3>
          <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
            캐릭터 수: {selectedLevel.count.toLocaleString()}개 ({formatPercent(selectedLevel.count, total)})
          </p>
        </div>
      )}

      {/* 차트 */}
      <div className="h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          {viewMode === 'bar' ? (
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 30, bottom: 20, left: 100 }}
              onClick={(data) => data && handleLevelClick(data.activePayload[0].payload)}
            >
              <XAxis
                type="number"
                stroke="currentColor"
                tick={{ fill: 'currentColor', fontSize: 12 }}
              />
              <YAxis
                dataKey="levelRange"
                type="category"
                stroke="currentColor"
                tick={{ fill: 'currentColor', fontSize: 12 }}
                width={80}
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
                    opacity={selectedLevel?.levelRange === entry.levelRange ? 1 : 0.7}
                    className="transition-opacity duration-200"
                  />
                ))}
              </Bar>
            </BarChart>
          ) : viewMode === 'area' ? (
            <AreaChart
              data={data}
              margin={{ top: 20, right: 30, bottom: 60, left: 30 }}
              onClick={(data) => data && handleLevelClick(data.activePayload[0].payload)}
            >
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS[0]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={CHART_COLORS[0]} stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
              <XAxis
                dataKey="levelRange"
                stroke="currentColor"
                tick={{ fill: 'currentColor', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
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
              <Area
                type="monotone"
                dataKey="count"
                name="캐릭터 수"
                stroke={CHART_COLORS[0]}
                fillOpacity={1}
                fill="url(#colorCount)"
              />
            </AreaChart>
          ) : (
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="levelRange"
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
                    opacity={selectedLevel?.levelRange === entry.levelRange ? 1 : 0.7}
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
                onClick={(entry) => handleLevelClick(entry)}
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
