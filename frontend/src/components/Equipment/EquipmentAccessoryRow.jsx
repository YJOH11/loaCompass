import EquipmentCard from "./EquipmentCard";
import AccessoryCard from "../Accessory/AccessoryCard";

export default function EquipmentAccessoryRow({ equipment, accessory, abilityStone, bracelet }) {
  return (
    <>
      <div className="flex w-full gap-4">
        <div className="w-1/2">
          {equipment && <EquipmentCard item={equipment} />}
        </div>
        <div className="w-1/2">
          {accessory && <AccessoryCard item={accessory} />}
        </div>
      </div>
      {(abilityStone || bracelet) && (
        <div className="flex w-full gap-4 mt-2">
          <div className="w-1/2">{abilityStone && <AccessoryCard item={abilityStone} />}</div>
          <div className="w-1/2">{bracelet && <AccessoryCard item={bracelet} />}</div>
        </div>
      )}
    </>
  );
}
