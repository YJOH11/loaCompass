import React, { useState } from "react";
import TopPlayerCard from "./TopPlayerCard";
import ServerPopulationChart from "./ServerPopulationChart";
import TotalClassChart from "./TotalClassChart";
import TotalLevelChart from "./TotalLevelChart";


export default function StatisticsTabs() {
  const [activeTab, setActiveTab] = useState("player");

  const tabList = [
    { id: "player", label: "오늘 최고 점수"},
    { id: "population", label: "서버 인원 비율" },
    { id: "class", label: "서버별 직업 분포" },
    { id: "level", label: "서버별 레벨 분포" },
  ];

  return (
    <div className="w-full p-4">
      {/* Tab Buttons */}
      <div className="flex space-x-2 mb-4">
        {tabList.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md font-medium border ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div>
        {activeTab === "player" && <TopPlayerCard />}
        {activeTab === "population" && <ServerPopulationChart />}
        {activeTab === "class" && <TotalClassChart />}
        {activeTab === "level" && <TotalLevelChart />}
      </div>
    </div>
  );
}
