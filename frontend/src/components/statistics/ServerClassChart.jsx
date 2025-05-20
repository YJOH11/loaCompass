import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
    ResponsiveContainer, LabelList
} from 'recharts';

export default function ServerClassChart() {
    const [data, setData] = useState([]);
    const [viewMode, setViewMode] = useState('stacked');

    useEffect(() => {
        axios.get('/api/statistics/server-class-distribution')
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, []);

    const groupedData = {};
    data.forEach(({ serverName, characterClass, count }) => {
        if (!groupedData[serverName]) {
            groupedData[serverName] = { serverName };
        }
        groupedData[serverName][characterClass] = count;
    });
    const transformed = Object.values(groupedData);
    const allClasses = [...new Set(data.map(d => d.characterClass))];

    const classColors = {
        바드: "#8884d8", 도화가: "#ffb347", 홀리나이트: "#00bcd4", 기상술사: "#a3d977", 환수사: "#4dd0e1",
        소울이터: "#ff6b6b", 리퍼: "#d84315", 블레이드: "#a28be6", 데모닉: "#7c4dff",
        워로드: "#ff7f50", 슬레이어: "#82ca9d", 디스트로이어: "#795548", 버서커: "#e53935",
        창술사: "#ffd54f", 배틀마스터: "#fbc02d", 인파이터: "#ff8f00", 스트라이커: "#ffa000",
        건슬링어: "#90caf9", 데빌헌터: "#64b5f6", 블래스터: "#1e88e5", 호크아이: "#0288d1", 스카우터: "#00838f",
        소서리스: "#ba68c8", 서머너: "#ab47bc", 아르카나: "#ce93d8", 브레이커: "#26a69a", 기공사: "#81c784",
        없음: "#c0c0c0"
    };

    return (
        <div className="w-full h-[500px] mt-10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">서버별 직업 분포 ({viewMode === 'stacked' ? 'Stacked' : 'Grouped'})</h2>
                <button
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                    onClick={() => setViewMode(viewMode === 'stacked' ? 'grouped' : 'stacked')}
                    
                >
                    {viewMode === 'stacked' ? 'Grouped 보기' : 'Stacked 보기'}
                </button>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={transformed} margin={{ top: 20, right: 30, bottom: 20 }}>
                    <XAxis dataKey="serverName" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    {allClasses.map(cls => (
                        <Bar
                            key={cls}
                            dataKey={cls}
                            stackId={viewMode === 'stacked' ? 'a' : undefined}
                            fill={classColors[cls] || "#ccc"}
                        >
                            <LabelList
                                dataKey={cls}
                                content={({ value, x, y, width, height, payload }) => {
                                    if (!payload || value === undefined) return null;

                                    const total = Object.entries(payload)
                                        .filter(([k, v]) => typeof v === 'number' && k !== 'serverName')
                                        .reduce((acc, [, v]) => acc + v, 0);

                                    const percent = total ? ((value / total) * 100).toFixed(1) : '0.0';

                                    return (
                                        <text
                                            x={x + width / 2}
                                            y={y - 4}
                                            textAnchor="middle"
                                            fontSize="12"
                                            fill="#333"
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
