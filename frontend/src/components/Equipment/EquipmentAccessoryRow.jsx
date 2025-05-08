import EquipmentCard from "../Equipment/EquipmentCard";
import AccessoryCard from "./AccessoryCard";

export default function EquipmentAccessoryRow({ equipment, accessory }) {
  return (
    <>
      <div>{equipment && <EquipmentCard item={equipment} />}</div>
      <div>{accessory && <AccessoryCard item={accessory} />}</div>
    </>
  );
}
