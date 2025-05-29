export default function AccessoryCard({ item }) {
  if (!item) return null;

  const {
    Type, Icon, basicEffect,
    refinementEffects, arcPassiveEffect,
    abilityStoneEngravings, braceletEffects,
  } = item;

  const mainStats = ["힘", "민첩", "지능"];
  const excludeKeywords = ["깨달음", "체력"];

  const parseEffects = (text, skipMainStats = false) => {
    if (!text) return [];

    // 1. 문장 단위로 분리 (마침표, 괄호, 줄바꿈 등 포함)
    const sentences = text
      .split(/[\.\n]+/) // 마침표, 줄바꿈 기준으로 분리
      .map(s => s.trim())
      .filter(s => s.length > 0);

    // 2. mainStats 와 excludeKeywords 체크 함수
    const hasMainStat = (str) =>
      mainStats.some(stat => str.includes(stat));
    const hasExclude = (str) =>
      excludeKeywords.some(kw => str.includes(kw));

    // 3. 필터링 및 반환
    return sentences.filter(s => {
      if (hasExclude(s)) return false;
      if (skipMainStats && hasMainStat(s)) return false;
      return true;
    });
  };


  const renderEffectSpans = (lines) =>
    lines.map((line, i) => (
      <span
        key={i}
        className="bg-gray-100 dark:bg-gray-700 text-green-500 px-2 py-0.5 rounded text-xs mr-1 mb-1 inline-block"
      >
        {line}
      </span>
    ));

  const extractMainStatValue = (text) => {
    const regex = /([^\s]+) \+(\d+(\.\d+)?)/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      const [_, stat, value] = match;
      if (excludeKeywords.includes(stat)) continue;
      if (mainStats.includes(stat)) return parseInt(value, 10);
    }
    return null;
  };

  const basicStatValue = extractMainStatValue(basicEffect);

  const getStatPercentBar = () => {
    if (!basicStatValue || !Type) return null;

    const ranges = {
      목걸이: [15178, 17857],
      귀걸이: [11806, 13889],
      반지: [10962, 12897],
    };
    const [min, max] = ranges[Type] || [];
    if (!min || !max) return null;

    const percent = Math.min(100, Math.round(((basicStatValue - min) / (max - min)) * 100));
    let color = "bg-green-400";
    if (percent >= 100) color = "bg-yellow-400";
    else if (percent >= 90) color = "bg-purple-400";
    else if (percent >= 70) color = "bg-blue-400";

    return (
      <div className="relative w-12 h-3 mt-1 bg-gray-300 rounded-full overflow-hidden">
        <div className="w-full bg-gray-300 dark:bg-gray-600 h-3 rounded overflow-hidden">
          <div className={`absolute top-0 left-0 h-full ${color}`} style={{ width: `${percent}%` }} />
        </div>
        <div className="absolute inset-0 text-[10px] text-white font-bold flex items-center justify-center">
          {percent}%
        </div>
      </div>
    );
  };

  const renderEffectTags = (list) => {
    if (!list?.length) return null;

    const thresholds = [
      { name: "추가 피해", high: 2.6, mid: 1.6, low: 0.6, isPercent: true },
      { name: "적에게 주는 피해", high: 2.0, mid: 1.2, low: 0.55 },
      { name: "공격력", high: 390, mid: 195, low: 80 },
      { name: "무기 공격력", high: 960, mid: 480, low: 195 },
      { name: "세레나데", high: 6, mid: 3.6, low: 1.6 },
      { name: "신앙", high: 6, mid: 3.6, low: 1.6 },
      { name: "조화 게이지 획득량", high: 6, mid: 3.6, low: 1.6 },
      { name: "낙인력", high: 8, mid: 4.8, low: 2.15 },
      { name: "무기 공격력", high: 3.0, mid: 1.8, low: 0.8, isPercent: true },
      { name: "공격력", high: 1.55, mid: 0.95, low: 0.4, isPercent: true },
      { name: "파티원 회복 효과", high: 3.5, mid: 2.1, low: 0.95 },
      { name: "파티원 보호막 효과", high: 3.5, mid: 2.1, low: 0.95 },
      { name: "치명타 적중률", high: 1.55, mid: 0.95, low: 0.4 },
      { name: "치명타 피해", high: 4.0, mid: 2.4, low: 1.1 },
      { name: "아군 공격력 강화 효과", high: 5.0, mid: 3.0, low: 1.35 },
      { name: "아군 피해량 강화 효과", high: 7.5, mid: 4.5, low: 2.0 },
    ];



    const getColorAndPrefix = (text) => {
      for (const t of thresholds) {
        if (text.includes(t.name)) {
          const value = parseFloat((text.match(/([0-9.]+)/g) || []).pop());
          if (isNaN(value)) break;
          if (value >= t.high) return { color: "text-yellow-400", prefix: "상 " };
          if (value >= t.mid) return { color: "text-purple-400", prefix: "중 " };
          if (value >= t.low) return { color: "text-sky-400", prefix: "하 " };
        }
      }
      return { color: "text-green-500", prefix: "무" };
    };

    return (
      <div className="flex flex-col gap-1 mb-1">
        {list.map((e, i) => {
          if (e.includes("체력")) return null;
          const { color, prefix } = getColorAndPrefix(e);
          return (
            <span key={i} className={`px-2 py-0.5 rounded text-xs w-fit ${color} inline-flex items-center gap-[0.15em]`}>
              <span className="bg-black px-1 rounded text-[10px] font-semibold">{prefix}</span>
              <span>{e}</span>
            </span>
          );
        })}
      </div>
    );
  };

 const braceletRenderEffectTags = (list) => {
   if (!list?.length) return null;

   const postfixRules = [
     "공격이 치명타로 적중 시", "무력화 상태의 적에게", "악마 및 대악마",
     "적에게 주는 피해가 4.5%", "적에게 주는 피해가 5", "공격 및 이동속도가 1%", "자신의 생명력이", "공격 적중 시"
   ];

   const combined = [];
   for (let i = 0; i < list.length; i++) {
     const cur = list[i];

     // "해당 효과는 한 파티 당 하나만 적용된다."가 나오면 앞뒤 합치기
     if (cur === "해당 효과는 한 파티 당 하나만 적용된다.") {
       let combinedText = "";

       // 앞 문장 있으면 합치기
       if (combined.length > 0) {
         combinedText += combined.pop() + " ";
       }

       // 현재 문장
       combinedText += cur;

       // 뒤 문장 있으면 합치기
       if (i + 1 < list.length) {
         combinedText += " " + list[i + 1];
         i++; // 뒤 문장 처리했으니 인덱스 건너뛰기
       }

       combined.push(combinedText);
       continue;
     }

     const isPostfix = postfixRules.some(rule => cur.startsWith(rule));
     if (isPostfix && combined.length) {
       combined[combined.length - 1] += ` ${cur}`;
     } else {
       combined.push(cur);
     }
   }

   // 이하 getTier, getColor, JSX 렌더링 부분은 기존 코드와 동일

   const getTier = (text) => {
     const matches = text.match(/\d+(\.\d+)?/g) || [];
     const num = matches.length > 0 ? parseFloat(matches[0]) : null;
     const num2 = matches.length > 1 ? parseFloat(matches[1]) : null;

     if (text.includes("공격 및 이동속도")) {
       if (num === 6) return "상";
       if (num === 5) return "중";
       return "하";
     }
     if (text.includes("전투자원 회복량")) {
       if (num === 12) return "상";
       if (num === 10) return "중";
       return "하";
     }
     if (text.includes("면역 지속 시간") || text.includes("재사용 대기시간")) {
       if (num === 60) return "상";
       if (num === 70) return "중";
       return "하";
     }
     if (text.includes("치명타 적중률")) {
       if (num >= 5.0) return "상";
       if (num >= 4.2) return "중";
       return "하";
     }
     if (text.includes("치명타 피해")) {
       if (num >= 10) return "상";
       if (num >= 8.4) return "중";
       return "하";
     }
     if (text.includes("적에게 주는 피해") && text.includes("각성기")) {
       if (num >= 3.5) return "상";
       if (num >= 3) return "중";
       return "하";
     }
     if (text.includes("적에게 주는 피해")) {
       if (num >= 3) return "상";
       if (num >= 2.5) return "중";
       return "하";
     }
     if (text.includes("피해 증가") && !text.includes("조건")) {
       if (num >= 3) return "상";
       if (num >= 2.5) return "중";
       return "하";
     }
     if (text.includes("추가 피해") && !text.includes("악마")) {
       if (num >= 4) return "상";
       if (num >= 3.5) return "중";
       return "하";
     }
     if (text.includes("추가 피해") && text.includes("악마")) {
       if (num >= 3.5) return "상";
       if (num >= 3) return "중";
       return "하";
     }
     if (text.includes("백어택") || text.includes("헤드어택") || text.includes("방향성 공격 아님")) {
       if (num >= 3.5) return "상";
       if (num >= 3) return "중";
       return "하";
     }
     if (text.includes("무기 공격력")) {
       if ([9000, 8700].includes(num) || num2 === 1480) return "상";
       if ([8100, 7800].includes(num) || num2 === 1320) return "중";
       if ([7200, 6900].includes(num) || num2 === 1160) return "하";
     }

     // 신속, 치명, 특화 상중하 기준 (숫자가 정확히 나와야)
     if (text.includes("특화") || text.includes("신속") || text.includes("치명") || text.includes("인내") || text.includes("제압") || text.includes("숙련")) {
       if (num >= 108) return "상";
       if (num >= 84) return "중";
       return "하";
     }
     if (text.includes("힘") || text.includes("민첩") || text.includes("지능")) {
       if (num >= 14400) return "상";
       if (num >= 11200) return "중";
       return "하";
     }
     if (text.includes("체력")) {
       if (num >= 5400) return "상";
       if (num >= 4200) return "중";
       return "하";
     }

     return null;
   };

   const getColor = (tier) => {
     switch (tier) {
       case "상":
         return "text-yellow-500"; // gold
       case "중":
         return "text-purple-400"; // purple
       case "하":
         return "text-sky-400"; // skyblue
       default:
         return "text-black"; // default
     }
   };

   return (
     <div className="flex gap-2 flex-wrap mb-1">
       {combined.map((e, i) => {
         const tier = getTier(e);
         const colorClass = getColor(tier);
         const prefix = tier ? `${tier} ` : "";

         return (
           <span key={i} className={`px-2 py-0.5 rounded text-xs w-fit ${colorClass} inline-flex items-center gap-[0.15em]`}>
             <span className="bg-black px-1 rounded text-[10px] font-semibold">{prefix}</span>
             <span>{e}</span>
           </span>
         );
       })}
     </div>
   );
 };



  const basicStats = parseEffects(basicEffect || "", true);
  const filteredBracelet = Type === "팔찌"
    ? (braceletEffects || []).filter(line => !basicStats.includes(line))
    : [];


  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded shadow w-full min-h-[100px] flex gap-3 items-start">
      <div className="flex flex-col items-center">
        <img src={Icon} alt="icon" className="w-12 h-12 object-contain shrink-0" />
        {getStatPercentBar()}
      </div>
      <div className="flex-1 text-xs text-green-500 whitespace-pre-wrap leading-snug overflow-hidden">
        {Type !== "팔찌" && renderEffectTags(refinementEffects)}
        {Type === "팔찌" && braceletRenderEffectTags(filteredBracelet)}
        {Type === "어빌리티 스톤" && braceletRenderEffectTags(abilityStoneEngravings)}
      </div>
    </div>

  );
}
