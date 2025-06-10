import React, { useState } from "react";
import { X } from "lucide-react";

export default function AISidePanel({ visible, onClose, itemsByTopic = {}, analysisDate }) {
  const [activeTab, setActiveTab] = useState("summary");

  const tabLabels = {
    summary: "인구 변화",
    server: "서버 예측",
    job: "직업 예측",
  };

  const tabIcons = {
    summary: "📋",
    server: "📊",
    job: "🧠",
  };

  const currentItems = itemsByTopic[activeTab] || [];

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 
        bg-white dark:bg-gray-800 
        shadow-lg dark:shadow-[0_0_12px_rgba(0,0,0,0.6)] 
        z-50 transform transition-transform duration-300 ease-in-out
        ${visible ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* 헤더 - 버튼형 보라 배경 스타일 */}
      <div className="flex items-center justify-between px-4 py-3 bg-indigo-500 text-white rounded-t-lg shadow-sm">
        <h3 className="text-base font-semibold">🧠 분석 요약</h3>
        <button onClick={onClose}>
          <X className="w-5 h-5 text-white hover:text-gray-200" />
        </button>
      </div>

      {/* 탭 버튼 */}
      <div className="flex justify-around px-2 py-2">
        {Object.keys(tabLabels).map((key) => (
          <div key={key} className="relative group">
            <button
              onClick={() => setActiveTab(key)}
              className={`w-10 h-10 flex items-center justify-center rounded-full text-xl transition-colors 
                ${activeTab === key
                  ? "bg-indigo-100 text-indigo-700 dark:bg-gray-700 dark:text-indigo-400"
                  : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
            >
              {tabIcons[key]}
            </button>
            {/* 툴팁 */}
            <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap">
              {tabLabels[key]}
            </div>
          </div>
        ))}
      </div>

      {/* 기준일 (탭 아래로 이동) */}
      {analysisDate && (
        <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400">
          📅 분석 기준일: <span className="font-medium">{analysisDate}</span>
        </div>
      )}

      {/* 🔻 시각 구분선 추가 */}
      <div className="h-[1px] bg-gray-200 dark:bg-gray-700 mx-4 my-2 rounded-full" />

      {/* 본문 */}
      <div className="p-4 space-y-3 text-sm text-gray-800 dark:text-gray-200 overflow-y-auto max-h-[calc(100%-120px)]">
        {currentItems.length === 0 ? (
          <p className="text-gray-400 dark:text-gray-500">분석 데이터를 불러오는 중...</p>
        ) : (
          currentItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2 leading-relaxed ${idx === 0 ? "text-sm font-semibold text-indigo-700 dark:text-indigo-400 mt-1" : "text-sm"
                }`}
            >
              <span className={`${idx === 0 ? "text-indigo-500" : "text-gray-400 dark:text-gray-500"}`}>

              </span>
              <span className="whitespace-pre-wrap">{item}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
