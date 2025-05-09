import EquipmentCard from "./EquipmentCard";
import AccessoryCard from "../Accessory/AccessoryCard";

export default function EquipmentAccessoryRow({ equipment, accessory, abilityStone, bracelet }) {
  return (
    <>
      <div className="flex gap-4 items-start">
        <div className="flex-1">{equipment && <EquipmentCard item={equipment} />}</div>
        <div className="flex-1">{accessory && <AccessoryCard item={accessory} />}</div>
      </div>
      {(abilityStone || bracelet) && (
        <div className="flex gap-4 items-start mt-2">
          <div className="flex-1">{abilityStone && <AccessoryCard item={abilityStone} />}</div>
          <div className="flex-1">{bracelet && <AccessoryCard item={bracelet} />}</div>
        </div>
      )}
    </>
  );
}
