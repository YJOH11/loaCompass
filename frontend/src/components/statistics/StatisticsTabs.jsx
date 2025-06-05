import React, { useState, useEffect } from "react";
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
  const [aiSummaryShort, setAiSummaryShort] = useState([]);
  const [aiSummaryFull, setAiSummaryFull] = useState([]);
  const [forecastSummary, setForecastSummary] = useState([]);
  const [jobGrowthSummary, setJobGrowthSummary] = useState([]); 

  // 1. 요약 데이터
  useEffect(() => {
    fetch("http://localhost:5000/api/ai-summary?mode=short")
      .then(res => res.json())
      .then(setAiSummaryShort)
      .catch(err => console.error("요약 불러오기 실패:", err));

    fetch("http://localhost:5000/api/ai-summary")
      .then(res => res.json())
      .then(setAiSummaryFull)
      .catch(err => console.error("전체 불러오기 실패:", err));
  }, []);

  // 2. 서버 예측
  useEffect(() => {
    fetch("http://localhost:5000/api/forecast/top-growth")
      .then(res => res.json())
      .then(setForecastSummary)
      .catch(err => console.error("예측 데이터를 불러오는 데 실패했습니다:", err));
  }, []);

  // 3. 직업 성장 예측
  useEffect(() => {
    fetch("http://localhost:5000/api/forecast/job-growth")
      .then(res => res.json())
      .then(setJobGrowthSummary)
      .catch(err => console.error("직업 성장 예측 실패:", err));
  }, []);

  //  전체 슬라이드 내용 결합
  const combinedSummary = [
    ...aiSummaryFull,
    "------------------------------",
    ...forecastSummary,
    "------------------------------",
    "🧠 다음 주 평균 레벨이 가장 크게 상승할 것으로 예상되는 직업은:",
    ...jobGrowthSummary.map((job, idx) =>
      `${idx + 1}. ${job.character_class} (+${job.increase} 예상)`
    ),
  ];

  const tabList = [
    { id: "player", label: "로침반 최고 점수", icon: "🏆" },
    { id: "population", label: "서버 인원 비율", icon: "📊" },
    { id: "class", label: "직업별 분포", icon: "⚔️" },
    { id: "level", label: "레벨별 분포", icon: "📈" },
  ];

  return (
    <div className="w-full bg-transparent">
      {/* 헤더 섹션 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{title}</h2>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 ease-in-out"
          >
            <span className="mr-2">🧠</span>
            통계 분석
          </button>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex flex-wrap gap-2">
          {tabList.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ease-in-out
                ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 차트 컨테이너 */}
      <div className="min-h-[500px]">
        {activeTab === "player" && <TopPlayerCard />}
        {activeTab === "population" && <ServerPopulationChart />}
        {activeTab === "class" && <TotalClassChart />}
        {activeTab === "level" && <TotalLevelChart />}
      </div>

      {/* 분석 팝업/패널 */}
      <AIAnalysisModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onDetailClick={() => {
          setShowModal(false);
          setShowPanel(true);
        }}
        items={aiSummaryShort}
      />

      <AISidePanel
        visible={showPanel}
        onClose={() => setShowPanel(false)}
        itemsByTopic={{
          summary: aiSummaryFull,
          server: forecastSummary,
          job: [
            "🧠 분석에 따르면, 다음 주 평균 레벨이 가장 크게 상승할 것으로 예상되는 직업은:",
            ...jobGrowthSummary.map((j, i) => `${i + 1}. ${j.character_class} (+${j.increase} 예상)`),
          ],
        }}
      />
    </div>
  );
}
