import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function ServerLevelChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/statistics/server-level-distribution')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  // 데이터 변환: 서버별 객체에 레벨 구간별 필드 추가
  const transformed = [];

  data.forEach(entry => {
    const existing = transformed.find(d => d.serverName === entry.serverName);
    if (existing) {
      existing[entry.levelRange] = entry.count;
    } else {
      transformed.push({
        serverName: entry.serverName,
        [entry.levelRange]: entry.count
      });
    }
  });

  // 모든 레벨 구간 추출 (legend용)
  const allRanges = [...new Set(data.map(d => d.levelRange))];

  return (
    <div className="w-full h-[400px] mt-8">
      <h2 className="text-xl font-bold mb-4">서버별 레벨 구간 분포</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={transformed}>
          <XAxis dataKey="serverName" />
          <YAxis />
          <Tooltip />
          <Legend />
          {allRanges.map(range => (
            <Bar key={range} dataKey={range} fill="#82ca9d" />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
