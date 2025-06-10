import { useState, useEffect } from "react";

export default function EngravingsCard({ item = [], onChange }) {
  const [engravings, setEngravings] = useState(item);

  const nameOptions = [
    "원한", "질량 증가", "기습의 대가", "마나 효율 증가", "아드레날린",
    "저주받은 인형", "예리한 둔기", "결투의 대가", "돌격대장", "정밀단도",
    "슈퍼차지", "타격의 대가", "안정된 상태", "바리케이드", "속전속결", "에테르 포식자"
  ];

  const gradeOptions = ["영웅", "전설", "유물"];
  const levelOptions = ["Lv.0", "Lv.1", "Lv.2", "Lv.3", "Lv.4"];

  // 공통 변경 핸들러
  const updateEngraving = (index, key, value) => {
    const updated = [...engravings];
    updated[index] = { ...updated[index], [key]: value };
    setEngravings(updated);
    onChange?.(updated); // 상위에 전달
  };

  useEffect(() => {
    setEngravings(item);
  }, [item]);

  if (!engravings.length) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">각인 정보</h3>
      <ul className="space-y-2">
        {engravings.map((engraving, index) => (
          <li
            key={index}
            className="flex items-center gap-2 p-2 border border-gray-300 dark:border-gray-700 rounded"
          >
            <select
              value={engraving.name}
              onChange={(e) => updateEngraving(index, "name", e.target.value)}
              className="flex-1 text-sm text-gray-800 dark:text-gray-200 bg-transparent border rounded border-gray-300 dark:border-gray-600"
            >
              {nameOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>

            <select
              value={engraving.grade}
              onChange={(e) => updateEngraving(index, "grade", e.target.value)}
              className="w-20 text-sm text-orange-600 dark:text-orange-400 bg-transparent border rounded border-gray-300 dark:border-gray-600"
            >
              {gradeOptions.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>

            <select
              value={engraving.level}
              onChange={(e) => updateEngraving(index, "level", e.target.value)}
              className="w-16 text-sm text-right text-gray-600 dark:text-gray-400 bg-transparent border rounded border-gray-300 dark:border-gray-600"
            >
              {levelOptions.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}
