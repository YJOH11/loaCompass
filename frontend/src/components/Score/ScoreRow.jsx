import React, { useEffect, useState } from 'react';
import * as statHelper from "./statHelper";

const ScoreRow = ({ items, accessories, engravings, abilityStone, bracelet, gems }) => {
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
        statHelper.applyEngravingOption(engraving, tempStat);
      });
    }

    if (abilityStone) {
      statHelper.applyAbilityStones(abilityStone.abilityStoneEngravings, tempStat);
    }

    if (bracelet) {
      statHelper.applyBraceletEffects(bracelet.braceletEffects, tempStat);
    }

    setMyStat(tempStat);
  }, [items, accessories, engravings, abilityStone, bracelet, gems]);

  const score = statHelper.calculateScore(myStat, gems);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center shadow-sm w-full">
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">총 점수</div>
      <div className="text-2xl font-semibold text-yellow-500">{score}</div>
    </div>
  );
};

export default ScoreRow;
