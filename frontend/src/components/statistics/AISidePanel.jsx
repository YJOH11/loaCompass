import React, { useState } from "react";
import { X } from "lucide-react";

export default function AISidePanel({ visible, onClose, itemsByTopic = {} }) {
  const [activeTab, setActiveTab] = useState("summary");

  const tabLabels = {
    summary: "📋 인구 변화 ",
    server: "📊 서버 예측",
    job: "🧠 직업 예측",
  };

  const currentItems = itemsByTopic[activeTab] || [];

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${visible ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* 패널 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">🧠 분석 요약</h3>
        <button onClick={onClose}>
          <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
        </button>
      </div>

      {/* 탭 버튼 */}
      <div className="flex border-b border-gray-200">
        {Object.keys(tabLabels).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === key
                ? "bg-indigo-100 text-indigo-700"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            {tabLabels[key]}
          </button>
        ))}
      </div>

      {/* 탭 본문 */}
      <div className="p-4 space-y-3 text-sm text-gray-800 overflow-y-auto max-h-[calc(100%-120px)]">
        {currentItems.length === 0 ? (
          <p className="text-gray-400">분석 데이터를 불러오는 중...</p>
        ) : (
          currentItems.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span>•</span>
              <span>{item}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
