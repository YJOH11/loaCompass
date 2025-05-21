import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, LabelList
} from 'recharts';

const COLORS = [
    '#FF6B6B', '#4D96FF', '#FFD93D', '#6BCB77',
    '#FF922B', '#845EC2', '#00C9A7', '#F9C74F',
    '#F94144', '#43AA8B', '#F3722C', '#577590',
    '#B5179E', '#9A031E'
];

export default function TotalLevelChart() {
    const [data, setData] = useState([]);
    const [viewMode, setViewMode] = useState("bar");

    useEffect(() => {
        axios.get('/api/statistics/total-level-distribution')
            .then(res => {
                const raw = res.data;
                const total = raw.reduce((sum, d) => sum + d.count, 0);

                const withPercent = raw.map((d, i) => ({
                    ...d,
                    percent: total ? Number(((d.count / total) * 100).toFixed(1)) : 0,
                    fill: COLORS[i % COLORS.length]
                }));

                setData(withPercent);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="w-full h-[500px] mt-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">레벨 분포</h2>
                <button
                    onClick={() => setViewMode(viewMode === 'bar' ? 'pie' : 'bar')}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    {viewMode === 'bar' ? 'Pie 보기' : 'Bar 보기'}
                </button>
            </div>

            <ResponsiveContainer width="100%" height="100%">
                {viewMode === 'bar' ? (
                    <BarChart
                        data={data}
                        layout="vertical"
                        barSize={36}
                        margin={{ top: 10, right: 40, left: 100, bottom: 10 }}
                    >
                        <XAxis type="number" />
                        <YAxis dataKey="levelRange" type="category" width={100} />
                        <Tooltip
                            formatter={(value, name, props) => {
                                const total = data.reduce((sum, d) => sum + d.count, 0);
                                const percent = total ? ((value / total) * 100).toFixed(1) : 0;
                                return [`${percent}%`, '비율'];
                            }}
                            separator=": "
                            contentStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                        />

                        <Legend />
                        <Bar dataKey="percent" name="백분율(%)" fill="#8884d8">
                            <LabelList
                                dataKey="percent"
                                position="right"
                                formatter={(value) => `${value}%`}
                                style={{
                                    fill: '#111',
                                    fontWeight: 'bold',
                                    fontSize: 13
                                }}
                            />
                        </Bar>
                    </BarChart>
                ) : (
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="count"
                            nameKey="levelRange"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            innerRadius={60}
                            isAnimationActive={true}
                            label={({ name }) => name} // 퍼센트 제거, 레벨 구간만 표시
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>

                        <Tooltip
                            formatter={(value) => {
                                const total = data.reduce((sum, d) => sum + d.count, 0);
                                const percent = total ? ((value / total) * 100).toFixed(1) : 0;
                                return [`${percent}%`, '비율'];
                            }}
                            separator=": "
                            contentStyle={{
                                fontSize: '14px',
                                fontWeight: 'bold',
                            }}
                        />

                        <Legend />
                    </PieChart>
                )}
            </ResponsiveContainer>
        </div>
    );
}
