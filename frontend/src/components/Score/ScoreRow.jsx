import React, { useEffect, useState } from 'react';
import * as statHelper from "./statHelper";


const ScoreRow = ({ items ,accessories,engravings,abilityStone,bracelet,gems}) => {
  const [myStat, setMyStat] = useState({
    STAT: 0,
    WeaponAtk: 0,
    Atk: 0,
    addDamagePer: 0,
    finalDamagePer: 0,
    WeaponAtkPer: 0,
    AtkPer: 0,
    criticalChancePer: 0,
    criticalDamagePer: 0,
    mainStat: 2000,
  });
  useEffect(() => {
    // useEffect 안에서 items, accessories 등 모든 props 최신값을 사용
    const tempStat = {
      STAT: 0,
      WeaponAtk: 0,
      Atk: 0,
      addDamagePer: 0,
      finalDamagePer: 0,
      WeaponAtkPer: 0,
      AtkPer: 0,
      criticalChancePer: 0,
      criticalDamagePer: 0,
    };

    if (Array.isArray(items)) {
      items.forEach(item => {
        statHelper.addEnhanceStats(
          item.Grade === "에스더" ? item.Grade : item.Type,
          item.Name,
          item.refinementLevel,
          tempStat
        );

        const part = item.Type;
        const transcendenceLevel = statHelper.getTranscendStageFromElixirNameLevel(item.elixirName);
        const transcendenceStage = statHelper.getTranscendStageFromElixirName(item.elixirName);

        statHelper.addTranscendStats(part, transcendenceLevel, transcendenceStage, transcendenceLevel, tempStat);
        statHelper.applyTranscendenceBonus(part, transcendenceLevel, transcendenceStage, transcendenceLevel, tempStat);

        if (Array.isArray(item.elixirOptions)) {
          item.elixirOptions.slice(0, 2).forEach(opt => {
            statHelper.applyElixirEffect(
              opt.name,
              opt.level,
              statHelper.getTotalElixirLevelFromItems(items),
              tempStat
            );
          });
        }
      });
    }

    if (Array.isArray(accessories)) {
      accessories.forEach(accessory => {
        statHelper.applyAccessoryEffects(
          { basicEffect: accessory.basicEffect, refinementEffects: accessory.refinementEffects },
          tempStat
        );
      });
    }

    if (Array.isArray(engravings)) {
      engravings.forEach(engraving => {
        statHelper.applyEngravingOption(engraving,tempStat);
      });
    }

    if(abilityStone) {
      statHelper.applyAbilityStones(abilityStone.abilityStoneEngravings,tempStat);
    }

    if(bracelet) {
      statHelper.applyBraceletEffects(bracelet.braceletEffects,tempStat);
    }

    setMyStat(tempStat);

  }, [items, accessories, engravings, abilityStone, bracelet, gems]);




  const score = statHelper.calculateScore(myStat,gems);
  
  return (
      <div className="score-row">
        <h3>🧮 내 점수</h3>
           <p><strong>총 점수:</strong> {score}</p>
      </div>
    );
  };

export default ScoreRow;
