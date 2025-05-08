export default function AccessoryCard({ item }) {
    return (
      <div className="bg-gray-800 p-3 rounded shadow w-44">
        {item.Icon && (
          <img src={item.Icon} alt={item.Name} className="w-10 h-10 mb-2" />
        )}
        <div className="font-semibold text-sm">{item.Name}</div>
        <div className="text-xs text-gray-400">{item.Type} | {item.Grade}</div>
        <div className="text-xs">+{item.refinementLevel} | 품질 {item.quality}</div>
      </div>
    );
  }
  