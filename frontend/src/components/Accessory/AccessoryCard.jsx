export default function AccessoryCard({ item }) {
  if (!item) return null;

  const {
    Type, Icon, basicEffect,
    refinementEffects, arcPassiveEffect,
    abilityStoneEngravings, braceletEffects,
  } = item;

  // 기본 스탯 추출
  const parseBasicEffect = (text) => {
    if (!text) return [];
    const regex = /([^\s]+ \+\d+)/g;
    const matches = text.match(regex) || [];
    return matches.map((line, i) => (
      <span
        key={i}
        className="bg-gray-100 dark:bg-gray-700 text-green-500 px-2 py-0.5 rounded text-xs mr-1 mb-1 inline-block"
      >
        {line}
      </span>
    ));
  };

  // 일반 효과 리스트 렌더링
  const renderEffectTags = (list) => {
    if (!list || list.length === 0) return null;
    return (
      <div className="flex gap-2 flex-wrap mb-1">
        {list.map((e, i) => (
          <span
            key={i}
            className="bg-gray-100 dark:bg-gray-700 text-green-500 px-2 py-0.5 rounded text-xs"
          >
            {e}
          </span>
        ))}
      </div>
    );
  };

  // 팔찌 중복 제거: basicEffect 내 스탯 항목만 추출해서 비교
  const getBasicStatsFromEffect = (text) => {
    if (!text) return [];
    const regex = /([^\s]+ \+\d+)/g;
    return text.match(regex) || [];
  };

  const basicStats = getBasicStatsFromEffect(basicEffect || "");

  const filteredBracelet = Type === "팔찌"
    ? (braceletEffects || []).filter(line => !basicStats.includes(line))
    : [];

  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded shadow w-full min-h-[100px] flex gap-3 items-start">
      <img src={Icon} alt="icon" className="w-12 h-12 object-contain shrink-0" />
      <div className="flex-1 text-xs text-green-500 whitespace-pre-wrap leading-snug overflow-hidden">

        {/* 기본 능력치 */}
        {basicEffect && <div className="flex flex-wrap mb-1">{parseBasicEffect(basicEffect)}</div>}

        {/* 연마 효과 (팔찌 제외) */}
        {Type !== "팔찌" && renderEffectTags(refinementEffects)}

        {/* 아크 패시브 */}
        {arcPassiveEffect && (
          <div className="flex flex-wrap mb-1">
            <span className="bg-gray-100 dark:bg-gray-700 text-green-500 px-2 py-0.5 rounded text-xs">
              {arcPassiveEffect}
            </span>
          </div>
        )}

        {/* 어빌리티 스톤 각인 */}
        {Type === "어빌리티 스톤" && renderEffectTags(abilityStoneEngravings)}

        {/* 팔찌 효과 */}
        {Type === "팔찌" && renderEffectTags(filteredBracelet)}
      </div>
    </div>
  );
}
