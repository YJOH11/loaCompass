import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ServerClassChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/statistics/server-class-distribution')
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, []);

    // 데이터 전처리: 서버별로 그룹화 + 직업별 필드 분리
    const transformed = [];

    data.forEach(entry => {
        const existing = transformed.find(d => d.serverName === entry.serverName);
        if (existing) {
            existing[entry.characterClass] = entry.count;
        } else {
            transformed.push({
                serverName: entry.serverName,
                [entry.characterClass]: entry.count
            });
        }
    });

    // 직업 리스트 추출 (legend용)
    const allClasses = [...new Set(data.map(d => d.characterClass))];
    const classColors = {
        바드: "#8884d8",
        슬레이어: "#82ca9d",
        창술사: "#ffc658",
        도화가: "#ff8042",
        블레이드: "#a28be6",
        워로드: "#ff7f50",
        홀리나이트: "#00bcd4",
        기상술사: "#a3d977",
        // 모든 직업 계속 추가
    };

    return (
        <div className="w-full h-[400px] mt-8">
            <h2 className="text-xl font-bold mb-4">서버별 직업 분포</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={transformed}>
                    <XAxis dataKey="serverName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {allClasses.map(cls => (
                        <Bar
                            key={cls}
                            dataKey={cls}
                            stackId="a"
                            fill={classColors[cls] || "#ccc"} // 없으면 회색 기본값
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
