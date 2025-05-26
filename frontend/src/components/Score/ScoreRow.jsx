import React, { useEffect, useState } from 'react';
import * as statHelper from "./statHelper";


const ScoreRow = ({ items ,accessories,engravings,abilityStone,bracelet}) => {
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



            // 초월 단계, 초월 레벨 정리
            const part = item.Type;
            const transcendenceLevel = statHelper.getTranscendStageFromElixirNameLevel(item.elixirName);
            const transcendenceStage = statHelper.getTranscendStageFromElixirName(item.elixirName);
            // elixirName에서 초월 스테이지 (ex: "7단계") 파싱 함수 필요

            // 기본 스탯 계산
            statHelper.addTranscendStats(part, transcendenceLevel, transcendenceStage, transcendenceLevel, tempStat);

            // 보너스 스탯 계산
            statHelper.applyTranscendenceBonus(part, transcendenceLevel, transcendenceStage, transcendenceLevel, tempStat);
            const optionCount = item.elixirOptions ? item.elixirOptions.length : 0;
            const loopCount = Math.min(2, optionCount);


            // 올바르게 elixirOptions에 대해 반복
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
    statHelper.applyAbilityStones(abilityStone.abilityStoneEngravings,tempStat);

    statHelper.applyBraceletEffects(bracelet.braceletEffects,tempStat);
    setMyStat(tempStat);
  }, [items]);



  const score = statHelper.calculateScore(myStat);
  return (
      <div className="score-row">
        <h3>🧮 내 점수</h3>
           <p><strong>총 점수:</strong> {score}</p>
      </div>
    );
  };

export default ScoreRow;
