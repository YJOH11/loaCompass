import { useState, useEffect } from "react";


export default function SimulationEquipmentCard({ item,onItemChange }) {
  if (!item) return null;

  const ELIXIR_EFFECTS = [
    { name: "공격력", effect: "공격력", values: [122, 253, 383, 575, 767], slot: "공용" },
    { name: "무기 공격력", effect: "무기 공격력", values: [236, 488, 740, 1110, 1480], slot: "공용" },
    { name: "힘", effect: "특성 증가", values: [864, 1782, 2700, 4050, 5400], slot: "공용" },
    { name: "민첩", effect: "특성 증가", values: [864, 1782, 2700, 4050, 5400], slot: "공용" },
    { name: "지능", effect: "특성 증가", values: [864, 1782, 2700, 4050, 5400], slot: "공용" },
    { name: "회심 (질서)", effect: "공격력", values: [0.23, 0.47, 0.72, 1.08, 1.44], slot: "투구" },
    { name: "달인 (질서)", effect: "공격력", values: [0.23, 0.47, 0.72, 1.08, 1.44], slot: "투구" },
    { name: "회심 (혼돈)", effect: "피해 증가", values: [0.23, 0.47, 0.72, 1.08, 1.44], slot: "장갑" },
    { name: "달인 (혼돈)", effect: "피해 증가", values: [0.23, 0.47, 0.72, 1.08, 1.44], slot: "장갑" },
    { name: "보스 피해", effect: "보스 피해", values: [0.38, 0.79, 1.2, 1.8, 2.4], slot: "견갑" },
    { name: "추가 피해", effect: "추가 피해", values: [0.49, 1.02, 1.55, 2.32, 3.10], slot: "하의" },
    { name: "치명타 피해", effect: "치명타 피해", values: [1.12, 2.31, 3.5, 5.25, 7], slot: "하의" },
  ];

  const {
    Icon,
    Name,
    Type,
    quality: initialQuality = 100,
    elixirOptions = [],
    elixirName,
    additionalEffect,
    refinementLevel: propRefinementLevel,
  } = item;

  const extractTranscendence = (text = "") => {
    const match = text.match(/(\d+)단계\s*(\d+)/);
    return {
      step: match ? parseInt(match[1], 10) : 0,
      level: match ? parseInt(match[2], 10) : 0,
    };
  };

  const extractNumberFromName = (name = "") => {
    const match = name.match(/^\+(\d+)/);
    return match ? Number(match[1]) : 0;
  };

  const [selectedElixirs, setSelectedElixirs] = useState(item.elixirOptions || [
    { name: "", level: 0 },
    { name: "", level: 0 },
  ]);

  const [refinementLevel, setRefinementLevel] = useState(
    typeof propRefinementLevel === "number" ? propRefinementLevel : 0
  );
  const [nameNumber, setNameNumber] = useState(extractNumberFromName(Name));
  let { step: initialStep, level: initialLevel } = extractTranscendence(elixirName);

  if (initialStep === 0 && initialLevel === 0) {
    initialStep = 7;
    initialLevel = 21;
  }

  const [transcendStep, setTranscendStep] = useState(initialStep);
  const [transcendLevel, setTranscendLevel] = useState(initialLevel);
  const [quality, setQuality] = useState(initialQuality);
  const [showSelector, setShowSelector] = useState(false);

  const [elixirs, setElixirs] = useState(() =>
      item.elixirOptions.length ? item.elixirOptions : [{ name: "", level: 0 }, { name: "", level: 0 }]
    );

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

  // ✅ 변경된 item 콘솔 출력
  useEffect(() => {
    const updatedItem = {
      ...item,
      Name: `+${nameNumber} ${Name.replace(/^\+\d+\s*/, "")}`,
      refinementLevel,
      quality,
      transcendence: `${transcendStep}단계 ${transcendLevel}`,
      elixirOptions: elixirs,
    };
    onItemChange && onItemChange(updatedItem);

  }, [nameNumber, refinementLevel, quality, transcendStep, transcendLevel, elixirs]);

  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded shadow w-full h-auto flex gap-3 items-start">
      <div className="flex flex-col items-center">
        <img src={Icon} alt={Name} className="w-12 h-12 object-contain shrink-0" />
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
      </div>

      <div className="flex-1 text-xs text-orange-500 whitespace-pre-wrap leading-snug overflow-hidden">
        <div className="font-semibold text-sm text-black dark:text-white mb-1 flex items-center gap-2">
          <select
            value={nameNumber}
            onChange={(e) => setNameNumber(Number(e.target.value))}
            className="border rounded px-1 py-0.5 dark:bg-gray-700 dark:text-white text-xs"
          >
            {Array.from({ length: 26 }, (_, i) => (
              <option key={i} value={i}>
                +{i}
              </option>
            ))}
          </select>
          <span>{Name.replace(/^\+\d+\s*/, "")}</span> / 상급 재련:
          <select
            value={refinementLevel}
            onChange={(e) => setRefinementLevel(Number(e.target.value))}
            className="border rounded px-1 py-0.5 dark:bg-gray-700 dark:text-white text-xs"
          >
            {Array.from({ length: 41 }, (_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 items-center flex-wrap mb-1 text-black dark:text-white text-xs">
          <span className="font-semibold">초월 옵션:</span>
          <label>단계:</label>
          <select
            value={transcendStep}
            onChange={(e) => setTranscendStep(Number(e.target.value))}
            className="border rounded px-1 py-0.5 dark:bg-gray-700 dark:text-white"
          >
            {Array.from({ length: 8 }, (_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <label>레벨:</label>
          <select
            value={transcendLevel}
            onChange={(e) => setTranscendLevel(Number(e.target.value))}
            className="border rounded px-1 py-0.5 dark:bg-gray-700 dark:text-white"
          >
            {Array.from({ length: 22 }, (_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        {/* Elixir Options */}
        {Type !== "무기" && (
          <div className="flex gap-2 flex-wrap mb-1 text-black dark:text-white text-xs">
            <span className="font-semibold">엘릭서 옵션:</span>
            {elixirs.map((elixir, index) => (
              <div key={index} className="flex items-center gap-1">
                <select
                  value={elixir.name}
                  onChange={(e) => {
                    const newElixirs = [...elixirs];
                    newElixirs[index].name = e.target.value;
                    setElixirs(newElixirs);
                  }}
                  className="border rounded px-1 py-0.5 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">선택</option>
                  {ELIXIR_EFFECTS.map((e) => (
                    <option key={e.name} value={e.name}>
                      {e.name}
                    </option>
                  ))}
                </select>

                <select
                  value={elixir.level}
                  onChange={(e) => {
                    const newElixirs = [...elixirs];
                    newElixirs[index].level = Number(e.target.value);
                    setElixirs(newElixirs);
                  }}
                  className="border rounded px-1 py-0.5 dark:bg-gray-700 dark:text-white"
                >
                  {Array.from({ length: 6 }, (_, i) => (
                    <option key={i} value={i}>
                      Lv.{i}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        {Type === "무기" && additionalEffect && (
          <div className="flex gap-2 flex-wrap mb-1">
            <div className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-xs">
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
