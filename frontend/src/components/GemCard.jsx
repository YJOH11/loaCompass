export default function GemCard({ gem }) {
    if (!gem) return null;
  
    return (
      <div className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition flex flex-col h-full">
        <div className="flex items-start gap-3 mb-2">
          <img
            src={gem.Icon || "/placeholder-gem.png"}
            alt={gem.Name}
            className="w-10 h-10 object-contain bg-gray-900 rounded flex-shrink-0"
          />
          <div className="flex-1">
            <div className="font-semibold text-white text-xs break-words">{gem.Name}</div>
            <div className="text-[11px] text-yellow-400 break-words">
              Lv.{gem.Level} | {gem.gemType}
            </div>
          </div>
        </div>
  
        <div className="text-xs text-green-300 whitespace-pre-wrap break-words leading-snug mt-1">
          {gem.effect}
        </div>
  
        {gem.skillName && (
          <div className="text-[11px] text-blue-300 mt-1 break-words">
            스킬: {gem.skillName}
          </div>
        )}
      </div>
    );
  }
  