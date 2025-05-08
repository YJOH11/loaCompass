import EquipmentCard from "./EquipmentCard";

export default function EquipmentList({ equipments }) {
  const gears = equipments.filter((item) =>
    ["무기", "투구", "상의", "하의", "장갑", "어깨"].includes(item.Type)
  );

  return (
    <div className="flex flex-col gap-2">
      {gears.length > 0 ? (
        gears.map((item, idx) => (
          <EquipmentCard key={idx} item={item} />
        ))
      ) : (
        <div className="text-gray-400 italic">장비 정보 없음</div>
      )}
    </div>
  );
}

