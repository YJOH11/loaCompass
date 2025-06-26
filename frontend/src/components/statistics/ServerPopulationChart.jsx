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
  const [selectedServer, setSelectedServer] = useState(null);

  useEffect(() => {
    axios.get('/api/statistics/server-count')
      .then(res => {
        const sorted = [...res.data].sort((a, b) => b.count - a.count);
        setData(sorted);
      })
      .catch(error => console.error('통계 데이터를 불러오는 중 오류:', error));
  }, []);

  const total = data.reduce((sum, d) => sum + d.count, 0);

  const handleBarClick = (entry) => {
    setSelectedServer(selectedServer?.serverName === entry.serverName ? null : entry);
  };

  return (
    <div className="space-y-6">
      {/* 차트 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">서버별 인원 비율</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            전체 인원: {total.toLocaleString()}명
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

      {/* 선택된 서버 정보 */}
      {selectedServer && (
        <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4">
          <h3 className="font-medium text-indigo-900 dark:text-indigo-200">
            {selectedServer.serverName}
          </h3>
          <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
            인원: {selectedServer.count.toLocaleString()}명 ({formatPercent(selectedServer.count, total)})
          </p>
        </div>
      )}

      {/* 차트 */}
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          {viewMode === 'bar' ? (
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 30, bottom: 30 }}
              onClick={(data) => data && handleBarClick(data.activePayload[0].payload)}
            >
              <XAxis
                dataKey="serverName"
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
                  return [`${value.toLocaleString()}명 (${percent})`, '인원'];
                }}
                contentStyle={{
                  ...TOOLTIP_STYLE,
                  backgroundColor: "#1f2937",
                  color: "#fff",
                  borderRadius: "0.5rem",
                  border: "none",
                }}
              />
              <Legend wrapperStyle={{ color: "currentColor" }} />
              <Bar
                dataKey="count"
                name="인원 수"
                radius={[4, 4, 0, 0]}
              >
                {data.map((entry, idx) => (
                  <Cell
                    key={idx}
                    fill={CHART_COLORS[idx % CHART_COLORS.length]}
                    opacity={selectedServer?.serverName === entry.serverName ? 1 : 0.7}
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
                nameKey="serverName"
                cx="50%"
                cy="50%"
                outerRadius={140}
                innerRadius={80}
                paddingAngle={1}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                    opacity={selectedServer?.serverName === entry.serverName ? 1 : 0.7}
                    className="transition-opacity duration-200"
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => {
                  const percent = formatPercent(value, total);
                  return [`${value.toLocaleString()}명 (${percent})`, '인원'];
                }}
                contentStyle={{
                  ...TOOLTIP_STYLE,
                  backgroundColor: "#1f2937",
                  color: "#fff",
                  borderRadius: "0.5rem",
                  border: "none",
                }}
              />
              <Legend
                wrapperStyle={{ color: "currentColor" }}
                onClick={(entry) => handleBarClick(entry)}
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
