import GemCard from "./GemCard";

export default function GemList({ gems }) {
  if (!gems || gems.length === 0) return <p className="text-gray-400 italic">보석 정보 없음</p>;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold border-b pb-1 mb-2 text-cyan-300">💎 보석</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {gems.map((gem, i) => <GemCard key={i} gem={gem} />)}
      </div>
    </div>
  );
}