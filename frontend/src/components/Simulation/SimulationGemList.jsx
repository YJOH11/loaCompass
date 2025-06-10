import GemCard from "./SimulationGemCard";

export default function GemList({ gems, onGemsChange, layout = "grid" }) {
  if (!Array.isArray(gems) || gems.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 italic">
        보석 정보 없음
      </p>
    );
  }

  const handleGemChange = (updatedGem, index) => {
    const newGems = [...gems];
    newGems[index] = updatedGem;
    onGemsChange(newGems);
  };

  return (
    <div className={layout === "inline" ? "flex flex-wrap gap-2" : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4"}>
      {gems.map((gem, idx) => (
        <GemCard key={idx} gem={gem} onChange={(newGem) => handleGemChange(newGem, idx)} />
      ))}
    </div>
  );
}
