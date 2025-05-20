import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, LabelList
} from 'recharts';

export default function ServerLevelChart() {
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState('grouped');

  useEffect(() => {
    axios.get('/api/statistics/server-level-distribution')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  // 서버별 그룹화
  const grouped = {};
  data.forEach(({ serverName, levelRange, count }) => {
    if (!grouped[serverName]) {
      grouped[serverName] = { serverName };
    }
    grouped[serverName][levelRange] = count;
  });

  const transformed = Object.values(grouped);
  const allRanges = [...new Set(data.map(d => d.levelRange))];

  // 색상 설정
  const levelColors = {
    '1640 미만': '#cfd8dc',
    '1640-1650': '#aed581',
    '1650-1660': '#81c784',
    '1660-1670': '#4caf50',
    '1670-1680': '#388e3c',
    '1680-1690': '#2e7d32',
    '1690-1700': '#66bb6a',
    '1700-1710': '#26a69a',
    '1710-1720': '#00acc1',
    '1720-1730': '#039be5',
    '1730-1740': '#1e88e5',
    '1740-1750': '#5c6bc0',
    '1750-1760': '#7e57c2',
    '1760+': '#ab47bc'
  };

  // 각 구간의 평균 값 추정용 맵
  const rangeMidMap = {
    '1640 미만': 1635,
    '1640-1650': 1645,
    '1650-1660': 1655,
    '1660-1670': 1665,
    '1670-1680': 1675,
    '1680-1690': 1685,
    '1690-1700': 1695,
    '1700-1710': 1705,
    '1710-1720': 1715,
    '1720-1730': 1725,
    '1730-1740': 1735,
    '1740-1750': 1745,
    '1750-1760': 1755,
    '1760+': 1760
  };

  // 평균 계산
  const averageLevels = Object.entries(grouped).map(([server, entry]) => {
    let sum = 0;
    let total = 0;
    for (const [range, count] of Object.entries(entry)) {
      if (range === 'serverName') continue;
      const mid = rangeMidMap[range] || 0;
      sum += mid * count;
      total += count;
    }
    return { server, average: total > 0 ? (sum / total).toFixed(2) : 'N/A' };
  });

  return (
    <div className="w-full h-[500px] mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">서버별 레벨 구간 분포 ({viewMode})</h2>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
          onClick={() => setViewMode(viewMode === 'stacked' ? 'grouped' : 'stacked')}
        >
          {viewMode === 'stacked' ? 'Grouped 보기' : 'Stacked 보기'}
        </button>
      </div>

      {/* 평균 레벨 표기 */}
      <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        {averageLevels.map(({ server, average }) => (
          <span key={server} className="mr-4">
            <strong>{server}</strong>: {average}
          </span>
        ))}
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={transformed}
          margin={{ top: 20, right: 30, bottom: 20 }}
        >
          <XAxis dataKey="serverName" angle={-20} textAnchor="end" interval={0} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend layout="horizontal" verticalAlign="bottom" wrapperStyle={{ maxHeight: 50, overflowY: 'auto' }} />

          {allRanges.map(range => (
            <Bar
              key={range}
              dataKey={range}
              stackId={viewMode === 'stacked' ? 'a' : undefined}
              fill={levelColors[range] || '#ccc'}
            >
              <LabelList
                dataKey={range}
                position="top"
                content={({ value, payload, x, y, width }) => {
                  if (!value || !payload) return null;
                  const total = Object.entries(payload)
                    .filter(([k, v]) => typeof v === 'number' && k !== 'serverName')
                    .reduce((acc, [, v]) => acc + v, 0);
                  const percent = total ? ((value / total) * 100).toFixed(1) : '0.0';
                  return (
                    <text
                      x={x + width / 2}
                      y={y - 4}
                      textAnchor="middle"
                      fontSize="11"
                      fill="#444"
                    >
                      {value} ({percent}%)
                    </text>
                  );
                }}
              />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
