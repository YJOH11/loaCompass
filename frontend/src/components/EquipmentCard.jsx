// src/components/EquipmentCard.jsx
export default function EquipmentCard({ item }) {
    return (
      <div className="bg-gray-700 rounded p-3 text-sm text-white">
        <img src={item.Icon} alt={item.Name} className="w-10 h-10 mb-2" />
        <div className="font-semibold">{item.Name}</div>
        <div className="text-gray-300">{item.Type} | {item.Grade}</div>
        <div>+{item.refinementLevel ?? 0} | 품질 {item.quality ?? 0}</div>
      </div>
    );
  }
  