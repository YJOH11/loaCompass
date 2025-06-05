import React, { useEffect, useState } from 'react';
import EquipmentCard from "./SimulationEquipmentCard";
import AccessoryCard from "./SimulationAccessoryCard";
import EngravingsCard from "./SimulationEngravingsCard";

function SimulationRow({equipment, accessory, abilityStone, bracelet,onAccessoryChanges,engravings,onEquipmentChanges}) {
  const [selectedOption, setSelectedOption] = useState('');
  const onEquipmentChange = (updatedItem) => {

    onEquipmentChanges && onEquipmentChanges(updatedItem);

  };
  const onAccessoryChange = (updatedItem) => {
      onAccessoryChanges && onAccessoryChanges(updatedItem);

    };
console.log(abilityStone);


  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
      <div className="space-y-2">
            {/* 첫 줄: 장비 + 나머지 악세서리들 수직 정렬 */}
            <div className="flex w-full gap-4">
              {/* 장비 */}
              <div className="w-1/2">
                 {equipment && <EquipmentCard item={equipment} onEquipmentChanges={onEquipmentChange} />}
                 {engravings && <EngravingsCard item={engravings} />}
              </div>

              {/* 악세 + 팔찌 + 능력 스톤 수직 정렬 */}
              <div className="w-1/2 space-y-2">
                  {accessory && <AccessoryCard item={accessory}  onAccessoryChanges={onAccessoryChange}/>}
                  {bracelet && <AccessoryCard item={bracelet} />}
                  {abilityStone && <AccessoryCard item={abilityStone} />}
              </div>
            </div>
          </div>

  );
}

export default SimulationRow;
