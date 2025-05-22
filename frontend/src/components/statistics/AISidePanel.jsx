import React from "react";
import { X } from "lucide-react"; // 닫기 아이콘 (설치 필요: npm install lucide-react)

export default function AISidePanel({ visible, onClose, items = [] }) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${visible ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* 패널 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">🧠 AI 분석 요약</h3>
        <button onClick={onClose}>
          <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
        </button>
      </div>

      {/* 패널 본문 */}
      <div className="p-4 space-y-3 text-sm text-gray-800">
        {items.length === 0 ? (
          <p className="text-gray-400">분석 데이터를 불러오는 중...</p>
        ) : (
          items.map((item, idx) => (
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
