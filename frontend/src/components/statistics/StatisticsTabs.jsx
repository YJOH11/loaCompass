import React, { useState } from "react";
import TopPlayerCard from "./TopPlayerCard";
import ServerPopulationChart from "./ServerPopulationChart";
import TotalClassChart from "./TotalClassChart";
import TotalLevelChart from "./TotalLevelChart";
import AIAnalysisModal from "./AIAnalysisModal";
import AISidePanel from "./AISidePanel";

export default function StatisticsTabs({ title }) {
  const [activeTab, setActiveTab] = useState("player");
  const [showModal, setShowModal] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  const aiSummary = [
    "🔥 인기 서버: 카마인",
    "📈 성장 서버: 카제로스",
    "🧘 조용한 서버: 니나브",
  ];

  const tabList = [
    { id: "player", label: "로침반 최고 점수" },
    { id: "population", label: "서버 인원 비율" },
    { id: "class", label: "직업별 분포" },
    { id: "level", label: "레벨별 분포" },
  ];

  return (
    <div className="w-full p-4">
      {/* 제목 + 버튼 한 줄에 표시 */}
      <div className="flex items-center space-x-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded shadow"
          title="AI 분석 보기"
        >
          🧠 AI 분석
        </button>
      </div>

      {/* 탭 버튼 */}
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

      {/* 탭 콘텐츠 */}
      <div>
        {activeTab === "player" && <TopPlayerCard />}
        {activeTab === "population" && <ServerPopulationChart />}
        {activeTab === "class" && <TotalClassChart />}
        {activeTab === "level" && <TotalLevelChart />}
      </div>

      {/* 중앙 팝업 모달 */}
      <AIAnalysisModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onDetailClick={() => {
          setShowModal(false);
          setShowPanel(true);
        }}
        items={aiSummary}
      />

      {/* 오른쪽 슬라이드 패널 */}
      <AISidePanel
        visible={showPanel}
        onClose={() => setShowPanel(false)}
        items={aiSummary}
      />
    </div>
  );
}
