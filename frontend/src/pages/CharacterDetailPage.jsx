import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CharacterDetailPage() {
  const { name } = useParams();
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/character/${name}`)
      .then((res) => setSummary(res.data))
      .catch((err) => setError("유저 정보를 불러올 수 없습니다."));
  }, [name]);

  if (error) {
    return <p className="text-red-500 font-bold p-4">{error}</p>;
  }

  if (!summary) {
    return <p className="text-gray-400 p-4">로딩 중...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">{summary.profile.characterName}님의 정보</h1>

      {/* 프로필 */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-2">프로필</h2>
        <ul className="space-y-1">
          <li><b>서버:</b> {summary.profile.serverName}</li>
          <li><b>클래스:</b> {summary.profile.characterClassName}</li>
          <li><b>레벨:</b> {summary.profile.characterLevel}</li>
          <li><b>아이템 레벨:</b> {summary.profile.itemAvgLevel}</li>
        </ul>
      </div>

      {/* 장비 */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">장비 목록</h2>
        {summary.equipments?.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {summary.equipments.map((item, idx) => (
              <div key={idx} className="bg-gray-700 p-3 rounded shadow">
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-gray-400">{item.type} | {item.grade}</div>
                <div className="text-sm">+{item.refinementLevel ?? 0} | 품질: {item.quality ?? 0}</div>
                {item.elixirName && <div className="text-emerald-300 text-sm">엘릭서: {item.elixirName}</div>}
                {item.elixirEffects?.length > 0 && (
                  <ul className="text-sm text-emerald-200 list-disc ml-4">
                    {item.elixirEffects.map((effect, i) => (
                      <li key={i}>{effect}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic">장비 정보가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
