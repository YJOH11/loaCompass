export default function AccessoryCard({ item }) {
  const splitEffect = (effect) =>
    effect?.match(/[^+]+[+][\d.,%]+(?:\s*\S*)?/g)?.map(s => s.trim()) || [];

  return (
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded shadow w-full min-h-[120px] flex gap-3">
      {item.Icon && (
        <img
          src={item.Icon}
          alt={item.Name}
          className="w-12 h-12 object-contain"
        />
      )}
      <div className="flex-1">
        <div className="font-semibold text-sm">{item.Name}</div>
        <div className="text-xs text-gray-600 dark:text-gray-300">
          {item.Type} | <span className="font-semibold">{item.Grade}</span>
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">
          품질: {item.quality}
        </div>

        {/* 연마 효과 */}
        {item.refinementEffect && (
          <ul className="text-xs text-green-600 dark:text-green-400 mt-1 list-disc list-inside space-y-0.5">
            {splitEffect(item.refinementEffect).map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        )}

        {/* 아크 패시브 */}
        {item.arcPassiveEffect && (
          <div className="text-xs text-purple-600 dark:text-purple-400 mt-1 whitespace-pre-wrap break-words">
            {item.arcPassiveEffect}
          </div>
        )}
      </div>
    </div>
  );
}
