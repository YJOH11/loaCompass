export default function AbilityStoneCard({ item }) {
    if (!item) return null;
  
    return (
      <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded shadow w-full">
        <div className="flex items-center gap-4">
          <img src={item.Icon} alt={item.Name} className="w-12 h-12 object-contain" />
          <div>
            <div className="font-semibold">{item.Name}</div>
            <div className="text-xs">{item.Grade}</div>
          </div>
        </div>
        <div className="mt-2 text-xs whitespace-pre-wrap">
          {item.abilityStoneEngravings?.map((e, i) => (
            <div key={i}>🔸 {e}</div>
          ))}
        </div>
      </div>
    );
  }
  