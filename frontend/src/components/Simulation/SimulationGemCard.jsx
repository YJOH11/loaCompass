import { useMemo } from "react";

const GEM_TYPES = ["겁화", "작열", "멸화", "홍염"];
const GEM_LEVELS = Array.from({ length: 10 }, (_, i) => i + 1);

function extractGemTypeFromTooltip(tooltip) {
  const text = JSON.stringify(tooltip);
  if (text.includes("멸화")) return "멸화";
  if (text.includes("홍염")) return "홍염";
  if (text.includes("작열")) return "작열";
  if (text.includes("겁화")) return "겁화";
  return "";
}

function extractSkillNameFromTooltip(tooltipJson) {
  try {
    const tooltip = JSON.parse(tooltipJson);
    const nameTag = tooltip?.Element_000?.value || "";
    if (nameTag.includes("멸화") || nameTag.includes("홍염")) {
      const effectText = tooltip?.Element_005?.value?.Element_001 || "";
      const match = effectText.match(/<FONT COLOR='[^']*'>(.*?)<\/FONT>/);
      return match?.[1] || "스킬 없음";
    } else {
      const effectText = tooltip?.Element_006?.value?.Element_001 || "";
      const match = effectText.match(/<FONT COLOR='[^']*'>(.*?)<\/FONT>/);
      return match?.[1] || "스킬 없음";
    }
  } catch (e) {
    return "스킬 없음";
  }
}

export default function GemCard({ gem, onChange }) {
  if (!gem) return null;

  const currentGemType = useMemo(
    () => extractGemTypeFromTooltip(gem.Tooltip),
    [gem.Tooltip]
  );

  const skillName = useMemo(
    () => extractSkillNameFromTooltip(gem.Tooltip),
    [gem.Tooltip]
  );

  const handleLevelChange = (e) => {
    const newLevel = parseInt(e.target.value, 10);
    onChange?.({
      ...gem,
      Level: newLevel,
      gemType: extractGemTypeFromTooltip(gem.Tooltip), // 항상 최신 값 반영
    });
  };

  const handleGemTypeChange = (e) => {
    const newType = e.target.value;
    onChange?.({
      ...gem,
      gemType: newType,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-1 w-[72px]">
      {/* 보석 레벨 셀렉트 */}
      <select
        value={gem.Level}
        onChange={handleLevelChange}
        className="text-[10px] w-full px-1 py-0.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 mb-1"
      >
        {GEM_LEVELS.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>

      {/* 보석 종류 셀렉트 */}
      <select
        value={gem.gemType !== undefined ? gem.gemType : currentGemType}
        onChange={handleGemTypeChange}
        className="text-[10px] w-full px-1 py-0.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 mb-1"
      >
        {GEM_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {/* 스킬 이름 */}
      <div className="text-[11px] text-center text-white px-1 py-[2px] min-h-[28px] leading-tight break-words whitespace-pre-wrap w-full bg-gray-700 rounded">
        {skillName}
      </div>
    </div>
  );
}
