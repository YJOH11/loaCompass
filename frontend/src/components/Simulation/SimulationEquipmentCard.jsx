import { useState, useEffect } from "react";

export default function SimulationEquipmentCard({ item, onEquipmentChanges }) {
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

  const extractTranscendence = (text = "") => {
    if (typeof text !== "string") return { step: 0, level: 0 };
    const match = text.match(/(\d+)단계\s*(\d+)/);
    return {
      step: match ? parseInt(match[1], 10) : 0,
      level: match ? parseInt(match[2], 10) : 0,
    };
  };

  const extractNumberFromName = (name = "") => {
    if (typeof name !== "string") return 0;
    const match = name.match(/^\+(\d+)/);
    return match ? Number(match[1]) : 0;
  };

  const {
    Icon,
    Name = "",
    Type = "",
    quality: initialQuality = 100,
    elixirOptions = [],
    elixirName = "",
    additionalEffect = "",
    refinementLevel: propRefinementLevel,
  } = item;

  const [selectedElixirs, setSelectedElixirs] = useState(elixirOptions.length ? elixirOptions : [
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
    elixirOptions.length ? elixirOptions : [{ name: "", level: 0 }, { name: "", level: 0 }]
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

  useEffect(() => {
    const updatedItem = {
      ...item,
      Name: `+${nameNumber} ${Name.replace(/^\+\d+\s*/, "")}`,
      refinementLevel,
      quality,
      transcendence: `${transcendStep}단계 ${transcendLevel}`,
      elixirOptions: elixirs,
    };
    onEquipmentChanges && onEquipmentChanges(updatedItem);
  }, [nameNumber, refinementLevel, quality, transcendStep, transcendLevel, elixirs]);

  // JSX 렌더링 부분은 그대로 유지하되, 위 코드만 방어 보완됨
  return (
    // ... 기존 JSX 그대로 유지
    null // (여기선 JSX 생략)
  );
}
