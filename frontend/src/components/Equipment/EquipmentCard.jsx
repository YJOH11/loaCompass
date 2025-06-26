import { useState, useRef } from "react";

export default function EquipmentCard({ item }) {
  if (!item) return null;

  const {
    Icon,
    Name,
    Type,
    quality: initialQuality = 100,
    elixirOptions,
    elixirName,
    additionalEffect,
    refinementLevel,
  } = item;

  const [quality, setQuality] = useState(initialQuality);
  const [showSelector, setShowSelector] = useState(false);

  const getQualityColor = (q) => {
    if (q === 100) return "bg-yellow-400";
    else if (q >= 90) return "bg-purple-500";
    else if (q >= 70) return "bg-sky-400";
    else return "bg-green-500";
  };

  const getQualityTextColor = (q) => {
    if (q === 100) return "text-yellow-400";
    else if (q >= 90) return "text-purple-500";
    else if (q >= 70) return "text-sky-400";
    else return "text-green-500";
  };

  const additionalDamage = Type === "무기" ? ((quality / 100) * 30).toFixed(1) : null;

  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded shadow w-full h-[100px] flex gap-3 items-start">
      <div className="flex flex-col items-center">
        <img src={Icon} alt={Name} className="w-12 h-12 object-contain shrink-0" />

        {/* 품질바 (클릭 시 셀렉트 표시, 무기만) */}
        {Type === "무기" ? (
          <div className="mt-1 relative">
            <div
              className="relative w-12 h-3 bg-gray-300 rounded-full overflow-hidden cursor-pointer"
              onClick={() => setShowSelector(true)}
            >
            <div className="w-full bg-gray-300 dark:bg-gray-600 h-3 rounded overflow-hidden">
              <div
                className={`absolute top-0 left-0 h-full ${getQualityColor(quality)}`}
                style={{ width: `${quality}%` }}
              />
              <div className="absolute inset-0 text-[10px] text-white font-bold flex items-center justify-center pointer-events-none">
                {quality}%
              </div>
            </div>
            </div>

            {showSelector && (
              <select
                className="absolute left-0 top-5 text-xs bg-white dark:bg-gray-700 text-black dark:text-white border rounded px-1 py-0.5 shadow z-10"
                value={quality}
                onChange={(e) => {
                  setQuality(Number(e.target.value));
                  setShowSelector(false);
                }}
                onBlur={() => setShowSelector(false)}
              >
                {Array.from({ length: 101 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}%
                  </option>
                ))}
              </select>
            )}
          </div>
        ) : (
          // 무기가 아닌 경우엔 품질바만
          <div className="relative w-12 h-3 mt-1 bg-gray-300 rounded-full overflow-hidden ">
            <div className="w-full bg-gray-300 dark:bg-gray-600 h-3 rounded overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full ${getQualityColor(quality)}`}
                  style={{ width: `${quality}%` }}
                />
                <div className="absolute inset-0 text-[10px] text-white font-bold flex items-center justify-center">
                  {quality}%
                </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 text-xs text-orange-500 whitespace-pre-wrap leading-snug overflow-hidden">
        <div className="font-semibold text-sm text-black dark:text-white mb-1">
          {Name} X{refinementLevel}
        </div>

        {/* 초월옵션 */}
        <div className="flex gap-2 flex-wrap mb-1">
          {elixirName && (
            <div className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white px-2 py-0.5 rounded text-xs">
              {elixirName.replace(/^슬롯 효과\s*/, "")}
            </div>
          )}
        </div>

        {/* 엘릭서 옵션 */}
        {elixirOptions && elixirOptions.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-1">
            {elixirOptions.map((e, i) => (
              <span
                key={i}
                className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white px-2 py-0.5 rounded text-xs"
              >
                [{e.name}] Lv.{e.level}
              </span>

            ))}
          </div>
        )}

        {/* 추가 효과 (무기만) */}
        {Type === "무기" && additionalEffect && (
          <div className="flex gap-2 flex-wrap mb-1">
            <div className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-xs ">
              <span className={`${getQualityTextColor(quality)}`}>
                추가 피해: {additionalDamage}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
