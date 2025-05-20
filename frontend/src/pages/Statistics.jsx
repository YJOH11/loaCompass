import React from 'react';
import StatisticTabs from '../components/statistics/StatisticsTabs';


export default function Statistics() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">로아 인구 통계</h1>

      <StatisticTabs />
    </div>
  );
}