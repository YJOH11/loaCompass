export default function EquipmentCard({ item }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg p-4 shadow hover:shadow-lg transition">
      {item.Icon && (
        <img
          src={item.Icon}
          alt={item.Name}
          className="w-10 h-10 mb-2"
        />
      )}
      <div className="font-semibold">{item.Name || "이름 없음"}</div>
      <div className="text-sm text-gray-600 dark:text-gray-300">
        {item.Type || "타입 없음"} | {item.Grade || "등급 없음"}
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-400">
        {item.refinementLevel !== null ? `+${item.refinementLevel}` : ""} | 품질: {item.quality ?? 0}
      </div>
    </div>
  );
}
