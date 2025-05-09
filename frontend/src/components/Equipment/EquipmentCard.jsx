export default function EquipmentCard({ item }) {
  return (
<div className="bg-white dark:bg-gray-800 p-4 rounded shadow w-full h-[160px] flex flex-col justify-between">

<img
        src={item.Icon}
        alt={item.Name}
        className="w-10 h-10 object-contain mt-1"
      />
      <div className="flex-1">
        <div className="font-semibold text-sm mb-1">
          +{item.refinementLevel ?? 0} {item.Name}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-300">
          {item.Type} | <span className="font-semibold">{item.Grade}</span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">품질: {item.quality ?? 0}</div>

        {/* 엘릭서 옵션 */}
        {item.elixirOptions?.length > 0 && (
          <ul className="text-xs text-orange-500 dark:text-orange-400 list-disc ml-4 space-y-0.5">
            {item.elixirOptions.map((opt, i) => (
              <li key={i}>
                {opt.level} {opt.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
