import React from 'react';
import ServerPopulationPieChart from '../components/statistics/ServerPopulationPieChart';
import TopPlayerCard from '../components/statistics/TopPlayerCard';
import ServerClassChart from '../components/statistics/ServerClassChart'
import ServerLevelChart from '../components/statistics/ServerLevelChart';

export default function Statistics() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">로아 인구 통계</h1>
      <TopPlayerCard />
      <ServerPopulationPieChart />
      <ServerClassChart />
      <ServerLevelChart />
    </div>
  );
}