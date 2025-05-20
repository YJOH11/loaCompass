import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList
} from 'recharts';

export default function ServerClassChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/statistics/server-class-distribution')
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, []);

    // 서버별 + 직업별 데이터 그룹화
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
        바드: "#8884d8",
        슬레이어: "#82ca9d",
        창술사: "#ffc658",
        도화가: "#ff8042",
        블레이드: "#a28be6",
        워로드: "#ff7f50",
        홀리나이트: "#00bcd4",
        기상술사: "#a3d977",
        //  필요한 직업 계속 추가
    };

    return (
        <div className="w-full h-[450px] mt-8">
            <h2 className="text-xl font-bold mb-4">서버별 직업 분포 (Grouped)</h2>
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
                            fill={classColors[cls] || "#cccccc"}
                        >
                            <LabelList dataKey={cls} position="top" />
                        </Bar>
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
