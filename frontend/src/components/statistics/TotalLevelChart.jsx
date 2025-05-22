import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, LabelList
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
   
    useEffect(() => {
        axios.get('/api/statistics/total-level-distribution')
            .then(res => {
                const raw = res.data;
                const sorted = [...raw].sort((a, b) => b.count - a.count); // 인원 수 기준 정렬
                setData(sorted);
            })
            .catch(err => console.error(err));
    }, []);

    const total = data.reduce((sum, d) => sum + d.count, 0);

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
                            formatter={(value) => {
                                const percent = formatPercent(value, total);
                                return [`${value}명 (${percent})`, '인원'];
                            }}
                            contentStyle={TOOLTIP_STYLE}
                        />
                        <Legend />
                        <Bar dataKey="count" name="인원 수">
                            <LabelList
                                dataKey="count"
                                position="right"
                                content={({ value }) => `${value} (${formatPercent(value, total)})`}
                                style={LABEL_STYLE}
                            />
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
                            nameKey="levelRange"
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
