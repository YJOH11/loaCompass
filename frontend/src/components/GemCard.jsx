import React from "react";

export default function GemCard({ gem }) {
  if (!gem) return null;

  return (
    <div className="relative group w-16 h-16">
      <img
        src={gem.Icon || "/placeholder-gem.png"}
        alt={gem.Name}
        className="w-16 h-16 object-contain bg-gray-900 rounded"
      />

      <div className="absolute bottom-0 left-0 right-0 text-center text-[10px] text-white bg-black bg-opacity-70 rounded-b">
        Lv.{gem.Level}
      </div>

      <div className="absolute z-10 hidden group-hover:block w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-pre-wrap">
        <div className="font-semibold text-sm mb-1">{gem.Name}</div>
        <div className="text-yellow-400 text-[11px] mb-1">Lv.{gem.Level} | {gem.gemType}</div>
        <div className="text-green-300 whitespace-pre-wrap break-words leading-snug mt-1">
          {gem.effect}
        </div>
        {gem.skillName && (
          <div className="text-[11px] text-blue-300 mt-1 break-words">
            스킬: {gem.skillName}
          </div>
        )}
      </div>
    </div>
  );
}
