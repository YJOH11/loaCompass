import { useState, useRef } from "react";

export default function EngravingsCard({ item }) {
  if (!item) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">각인 정보</h3>
      <ul className="space-y-2">
        {item.map((engraving, index) => (
          <li
            key={index}
            className="flex items-center p-2 border border-gray-300 dark:border-gray-700 rounded"
          >
            <span className="flex-1 text-gray-800 dark:text-gray-200 truncate">
              {engraving.name}
            </span>
            <span className="w-16 text-sm text-center text-orange-600 dark:text-orange-400">
              {engraving.grade}
            </span>
            <span className="w-12 text-sm text-right text-gray-600 dark:text-gray-400">
              {engraving.level}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
