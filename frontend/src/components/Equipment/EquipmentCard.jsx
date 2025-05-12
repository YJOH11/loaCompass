export default function EquipmentCard({ item }) {
  if (!item) return null;

  const {
    Icon, Name, quality, elixirEffects, elixirOptions,
    refinementEffect, additionalEffect
  } = item;

  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded shadow w-full h-[100px] flex gap-3 items-start">
      <img src={Icon} alt={Name} className="w-12 h-12 object-contain shrink-0" />
      <div className="flex-1 text-xs text-orange-500 whitespace-pre-wrap leading-snug overflow-hidden">
        <div className="font-semibold text-sm text-black dark:text-white mb-1">{Name}</div>

        {/* 엘릭서 옵션 (가로 정렬) */}
        {elixirOptions && elixirOptions.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-1">
            {elixirOptions.map((e, i) => (
              <span
                key={i}
                className="bg-gray-100 dark:bg-gray-700 text-green-500 px-2 py-0.5 rounded text-xs"
              >
                [{e.name}] Lv.{e.level}
              </span>
            ))}
          </div>
        )}

        {refinementEffect && <div>• {refinementEffect}</div>}
        
      </div>
    </div>
  );
}
