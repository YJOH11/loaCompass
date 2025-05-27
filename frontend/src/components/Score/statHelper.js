


const myStat = {
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
};

// 기본 강화 수치
const baseStats = {
  투구: [29030,30005,31013,32055,33131,34244,35394,36583,37811,39081,40393,41749,43150,44663,46228,47848,49524,51260,53056,54915,56839,58830,60891,63024,65232,67517],
  견갑: [30896,31934,33007,34115,35261,36445,37669,38934,40242,41593,42989,44433,45924,47534,49200,50924,52708,54555,56467,58445,60493,62612,64806,67076,69426,71858],
  상의: [23224,24004,24811,25644,26505,27395,28315,29266,30249,31265,32314,33399,34520,35730,36982,38278,39620,41008,42445,43932,45471,47064,48713,50420,52186,54014],
  하의: [25090,25933,26804,27705,28635,29597,30591,31618,32680,33777,34911,36083,37294,38601,39954,41354,42803,44303,45855,47462,49125,50846,52627,54471,56379,58357],
  장갑: [34836,36006,37216,38466,39758,41093,42473,43899,45373,46897,48471,50098,51780,53595,55473,57417,59429,61512,63667,65898,68206,70596,73069,75629,78278,81021],
  무기: [50362,52051,53796,55599,57463,59390,61381,63439,65566,67764,70036,72384,74811,77429,80139,82944,85847,88851,91961,95180,98511,101959,105527,109221,113044,117000],
  에스더: [0,23000,28000,34500,37500,43500,123464,158479,214931,277946]
};

// 상급 재련 수치 (최대 40단계까지 확장)
const upperStats = {
  투구: [
    0,234,470,708,948,1189,1431,1675,1921,2168,
    2417,2667,2919,3173,3429,3687,3945,4205,4467,4731,4999,
    5251,5503,5755,6007,6259,6511,6763,7015,7267,7519,
    7771,8023,8275,8527,8779,9031,9283,9535,9787,10039,10291
  ],
  견갑: [
    0,249,500,753,1008,1265,1523,1783,2045,2309,
    2573,2839,3107,3377,3649,3924,4199,4476,4755,5036,5320,
    5573,5826,6079,6332,6585,6838,7091,7344,7597,7850,
    8103,8356,8609,8862,9115,9368,9621,9874,10127,10380,10633
  ],
  상의: [
    0,187,376,566,758,951,1145,1340,1537,1735,
    1934,2134,2336,2539,2744,2950,3157,3365,3575,3786,3999,
    4194,4389,4584,4779,4974,5169,5364,5559,5754,5949,
    6144,6339,6534,6729,6924,7119,7314,7509,7704,7899,8094
  ],
  하의: [
    0,202,406,611,818,1027,1236,1447,1659,1873,
    2089,2305,2523,2742,2963,3186,3409,3634,3861,4090,4320,
    4532,4744,4956,5168,5380,5592,5804,6016,6228,6440,
    6652,6864,7076,7288,7500,7712,7924,8136,8348,8560,8772
  ],
  장갑: [
    0,281,564,849,1136,1426,1716,2009,2304,2601,
    2900,3200,3503,3808,4115,4424,4734,5046,5361,5678,5998,
    6290,6582,6874,7166,7458,7750,8042,8334,8626,8918,
    9210,9502,9794,10086,10378,10670,10962,11254,11546,11838,12130
  ],
  무기: [
    0, 405, 814, 1226, 1641, 2058, 2477, 2899, 3324, 3753,
    4185, 4618, 5054, 5494, 5937, 6383, 6831, 7282, 7736, 8194,
    8655, 9079, 9526, 9973, 10420, 10867, 11314, 11761, 12208, 12655,
    13102, 13549, 13996, 14443, 14890, 15337, 15784, 16231, 16678, 17125, 17572
  ],
  에스더:[
          0, 405, 814, 1226, 1641, 2058, 2477, 2899, 3324, 3753,
          4185, 4618, 5054, 5494, 5937, 6383, 6831, 7282, 7736, 8194,
          8655, 9079, 9526, 9973, 10420, 10867, 11314, 11761, 12208, 12655,
          13102, 13549, 13996, 14443, 14890, 15337, 15784, 16231, 16678, 17125, 17572
        ]
};

// 초월 단계별 스탯 증가량 (방어구, 무기)
const transcendStageStats = {
  방어구: [600, 680, 760, 840, 920, 1000, 1080],
  무기: [300, 340, 380, 420, 460, 500, 540],
};

// 부동소수점 오류 방지용 정밀 계산 함수
function addWithPrecision(target, value) {
  return Number((target + value).toFixed(2));
}

// 강화 + 상급재련 누적 함수
export function addEnhanceStats(type, itemName, upperReinforceLevel, statObj) {
  const basicEnhanceLevel = parseInt(itemName.match(/\+(\d+)/)?.[1] ?? '0', 10);
  const base = baseStats[type]?.[basicEnhanceLevel] ?? 0;
  let upper = 0;

  const upperArr = upperStats[type];
  if (!upperArr) {
    console.warn(`upperStats에 ${type} 타입이 없습니다.`);
    return;
  }

  if (upperReinforceLevel > 0) {
    if (upperArr[upperReinforceLevel] !== undefined) {
      // 데이터가 존재하면 그대로 사용
      upper = upperArr[upperReinforceLevel];
    } else {
      // 존재하지 않으면 10~20 기준 보간
      if (upperArr[20] === undefined || upperArr[10] === undefined) {
        console.warn(`upperStats[${type}][10] 또는 upperStats[${type}][20]가 정의되지 않았습니다.`);
        upper = 0;
      } else {
        const avgIncrease = (upperArr[20] - upperArr[10]) / 10;
        upper = upperArr[20] + Math.round(avgIncrease * (upperReinforceLevel - 20));
      }
    }

    // 30단 이상일 경우 추가 보정
    if (upperReinforceLevel >= 30 && upperReinforceLevel < 40) {
      upper = Math.round((base + upper) * 1.01);
    } else if (upperReinforceLevel >= 40) {
      upper = Math.round((base + upper) * 1.03);
    }
  }

  const totalStat = base + upper;

  if (type === '무기') {
    statObj.WeaponAtk = addWithPrecision(statObj.WeaponAtk || 0, totalStat);
    console.log("무기:"+type);
  } else if(type === '에스더'){
    statObj.WeaponAtk = addWithPrecision(statObj.WeaponAtk || 0, totalStat);
    console.log("에스더:"+type+statObj.WeaponAtk+"  "+basicEnhanceLevel+"  "+base);
  }
  else {
    statObj.STAT = addWithPrecision(statObj.STAT || 0, totalStat);
  }
}




///////////////////////////////////////////////////////////////////////////////////////////////
// 초월 누적 함수

export function addTranscendStats(type, transcendLevel, transcendStage, totalTranscend, statObj) {
  const isWeapon = type === '무기';
  const statKey = isWeapon ? 'WeaponAtk' : 'STAT';

  const arr = transcendStageStats[isWeapon ? '무기' : '방어구'];
  let stageSum = 0;
  for (let i = 0; i < Math.min(transcendStage, arr.length); i++) {
    stageSum += arr[i];
  }

  statObj[statKey] = addWithPrecision(statObj[statKey] || 0, stageSum * transcendLevel);
}

export function applyTranscendenceBonus(part, transcendenceLevel, transcendenceStage, totalTranscendenceLevel, baseStats) {
  const baseStatsArray = {
    armor: [600, 680, 760, 840, 920, 1000, 1080],
    weapon: [300, 340, 380, 420, 460, 500, 540]
  };

  const stageEffects = {
    "투구": {
      5: { type: "STAT", perGrade: 80 },
      10: { type: "STAT", perGrade: 55 },
      15: { type: "WeaponAtk", perGrade: 14 },
      20: { type: "Atk", perGrade: 6 }
    },
    "견갑": {
      5: { type: "WeaponAtk", flat: 1200 },
      10: { type: "STAT", flat: 1800 },
      15: { type: "WeaponAtk", flat: 1200 },
      20: { type: "WeaponAtk", flat: 1200 }
    },
    "상의": {
      5: { type: "WeaponAtk", flat: 2000 },
      10: { type: "STAT", flat: 1400 },
      15: { type: "WeaponAtk", flat: 2000 },
      20: { type: "WeaponAtk", flat: 3200 }
    },
    "하의": {
      5: { type: "STAT", flat: 0 },
      10: { type: "STAT", flat: 0 },
      15: { type: "STAT", flat: 0 },
      20: { type: "STAT", flat: 0 }
    },
    "장갑": {
      5: { type: "STAT", flat: 4200 },
      10: { type: "STAT", flat: 1800 },
      15: { type: "STAT", flat: 4200 },
      20: { type: "STAT", flat: 4200 }
    },
    "무기": {
      5: { type: "Atk", flat: 800 },
      10: { type: "Atk", flat: 800 },
      15: { type: "Atk", flat: 800 },
      20: { type: "Atk", flat: 1125 }
    }
  };

  // 기본 누적 스탯 계산
  const baseArray = part === "무기" ? baseStatsArray.weapon : baseStatsArray.armor;
  const baseType = part === "무기" ? "WeaponAtk" : "STAT";
  const baseSum = baseArray.slice(0, transcendenceStage).reduce((a, b) => a + b, 0);

  // 기본 스탯에 더하기
  baseStats[baseType] = addWithPrecision(baseStats[baseType] || 0, baseSum);

  // 보너스 스탯 추가
  const bonuses = stageEffects[part] || {};
  [5, 10, 15, 20].forEach(stage => {
    if (transcendenceLevel >= stage && bonuses[stage]) {
      const { type, perGrade, flat } = bonuses[stage];
      const value = perGrade ? perGrade * totalTranscendenceLevel : flat || 0;
      baseStats[type] = addWithPrecision(baseStats[type] || 0, value);
    }
  });
}

/////////////////////////////////////////////////////////////////////////////////////
const specialSetEffects = {
  "회심": [
    { level: 35, effect: { addDamagePer: 6 } },
    { level: 40, effect: { addDamagePer: 12 } }
  ],
  "달인": [
    { level: 35, effect: { criticalChancePer: 7 } },
    { level: 40, effect: { addDamagePer: 8.5 } }
  ]
};

const statIncrements = {
  "공격력": [122, 253, 383, 575, 767], // Atk
  "무기 공격력": [236, 488, 740, 1110, 1480], // WeaponAtk
  "힘": [864, 1782, 2700, 4050, 5400], // STAT
  "민첩": [864, 1782, 2700, 4050, 5400], // STAT
  "지능": [864, 1782, 2700, 4050, 5400], // STAT

  "회심 (질서)": [0.23, 0.47, 0.72, 1.08, 1.44], //AtkPer(%)
  "달인 (질서)": [0.23, 0.47, 0.72, 1.08, 1.44], // AtkPer(%)

  "회심 (혼돈)": [0.23, 0.47, 0.72, 1.08, 1.44], // addDamagePer(%)
  "달인 (혼돈)": [0.23, 0.47, 0.72, 1.08, 1.44], // addDamagePer(%)

  "보스 피해": [0.38, 0.79, 1.2, 1.8, 2.4], // finalDamagePer(%)
  "추가 피해": [0.49, 1.02, 1.55, 2.32, 3.10], // addDamagePer(%)
  "치명타 피해": [1.12, 2.31, 3.50, 5.25, 7], // criticalDamagePer(%)
};


export function applyElixirEffect(optionName, level, totalLevel, myStat) {
  if (level < 1 || level > 5) return;

  const incrementArray = statIncrements[optionName];
  if (!incrementArray || !incrementArray[level - 1]) return;

  const value = incrementArray[level - 1];

  switch(optionName) {
    case "공격력":
      myStat.Atk = addWithPrecision(myStat.Atk, value);
      break;
    case "무기 공격력":
      myStat.WeaponAtk = addWithPrecision(myStat.WeaponAtk, value);
      break;
    case "지능":
    case "민첩":
    case "힘":
      myStat.STAT = addWithPrecision(myStat.STAT, value);
      break;

    case "회심 (질서)":
      myStat.AtkPer = addWithPrecision(myStat.AtkPer, value);
      break;
    case "달인 (질서)":
      myStat.AtkPer = addWithPrecision(myStat.AtkPer, value);
      break;
    case "회심 (혼돈)":
      myStat.addDamagePer = addWithPrecision(myStat.addDamagePer, value);
      break;
    case "달인 (혼돈)":
      myStat.addDamagePer = addWithPrecision(myStat.addDamagePer, value);
      break;
    case "보스 피해":
      myStat.finalDamagePer = addWithPrecision(myStat.finalDamagePer, value);
      break;
    case "추가 피해":
      myStat.addDamagePer = addWithPrecision(myStat.addDamagePer, value);
      break;
    case "치명타 피해":
      myStat.criticalDamagePer = addWithPrecision(myStat.criticalDamagePer, value);
      break;
  }

  if (optionName.includes("회심 (질서)")) {
    applySpecialSetEffect("회심", totalLevel, myStat);
  }
  if (optionName.includes("달인 (질서)")) {
    applySpecialSetEffect("달인", totalLevel, myStat);
  }
}

function applySpecialSetEffect(type, totalLevel, myStat) {
  if (totalLevel >= 40) {
    specialSetEffects[type].forEach(({ effect }) => applyEffectToStat(effect, myStat));
  } else if (totalLevel >= 35) {
    specialSetEffects[type]
      .filter(s => s.level === 35)
      .forEach(({ effect }) => applyEffectToStat(effect, myStat));
  }
}

function applyEffectToStat(effect, myStat) {
  if (effect.finalDamagePer !== undefined) myStat.finalDamagePer = addWithPrecision(myStat.finalDamagePer, effect.finalDamagePer);
  if (effect.addDamagePer !== undefined) myStat.addDamagePer = addWithPrecision(myStat.addDamagePer, effect.addDamagePer);
  if (effect.criticalChancePer !== undefined) myStat.criticalChancePer = addWithPrecision(myStat.criticalChancePer, effect.criticalChancePer);
  if (effect.criticalDamagePer !== undefined) myStat.criticalDamagePer = addWithPrecision(myStat.criticalDamagePer, effect.criticalDamagePer);
  if (effect.AtkPer !== undefined) myStat.AtkPer = addWithPrecision(myStat.AtkPer, effect.AtkPer);
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function applyAccessoryEffects({ basicEffect, refinementEffects } = {}, myStat) {
  // 부동소수점 오류 방지용 정밀 계산 함수
  const addWithPrecision = (target, value, label = "") => {
    const result = Number((target + value).toFixed(2));
    return result;
  };

  // 1) 힘, 민첩, 지능 중 하나에 해당하는 숫자를 찾아 myStat.STAT에 더함
  if (typeof basicEffect === 'string') {
    const statMatch = basicEffect.match(/(힘|민첩|지능) \+(\d+)/);
    if (statMatch) {
      const value = Number(statMatch[2]);
      myStat.STAT = addWithPrecision(myStat.STAT, value);
    }
  }

  // 2) refinementEffects가 배열인지 확인 후 처리
  if (Array.isArray(refinementEffects)) {
    refinementEffects.forEach(effect => {
      const match = effect.match(/^(.+?) \+([\d.]+)(%?)/);
      if (!match) return;

      const optionName = match[1].trim();
      const value = parseFloat(match[2]);
      const isPercent = match[3] === "%";

      switch (optionName) {
        case "추가 피해":
        case "적에게 주는 피해":
          myStat.addDamagePer = addWithPrecision(myStat.addDamagePer, value);
          break;
        case "무기 공격력":
          if (isPercent) {
            myStat.WeaponAtkPer = addWithPrecision(myStat.WeaponAtkPer, value);
          } else {
            myStat.WeaponAtk = addWithPrecision(myStat.WeaponAtk, value);
          }
          break;
        case "공격력":
          if (isPercent) {
            myStat.AtkPer = addWithPrecision(myStat.AtkPer, value);
          } else {
            myStat.Atk = addWithPrecision(myStat.Atk, value);
          }
          break;
        case "치명타 적중률":
          if (isPercent) {
            myStat.criticalChancePer = addWithPrecision(myStat.criticalChancePer, value);
          }
          break;
        case "치명타 피해":
          if (isPercent) {
            myStat.criticalDamagePer = addWithPrecision(myStat.criticalDamagePer, value);
          }
          break;
        case "보스 피해":
          if (isPercent) {
            myStat.finalDamagePer = addWithPrecision(myStat.finalDamagePer, value);
          }
          break;
      }
    });
  }
}




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const engravings = {
  "결투의 대가": {
    base: { finalDamagePer: 12.2 },
    effects: {
      영웅: [0.95, 1.9, 2.85, 3.8], // 피해 증가 + 백어택 추가 피해
      전설: [0.95, 1.9, 2.85, 3.8],
      유물: [0.7, 1.4, 2.1, 2.8],
    },
    apply: (level, grade, myStat) => {
      const gradeOrder = ["영웅", "전설", "유물"];
      const currentIndex = gradeOrder.indexOf(grade);
      if (currentIndex === -1) return;

      const isZeroLevel = level === "Lv.0" || level === 0 || level === "0";
      const parsedLevel = typeof level === "string" ? parseInt(level.replace("Lv.", "")) : level;

      for (let i = 0; i <= currentIndex; i++) {
        const g = gradeOrder[i];
        const effectList = engravings["결투의 대가"].effects[g];
        const value = isZeroLevel ? effectList[0] : effectList[parsedLevel - 1];

        myStat.finalDamagePer = (myStat.finalDamagePer || 0) + value;
        myStat.addDamagePer = (myStat.addDamagePer || 0) + value;
      }
    }
  }
,

  "기습의 대가": {
    base: { finalDamagePer: 12.2 },
    effects: {
      영웅: [0.95, 1.9, 2.85, 3.8], // 피해 증가 + 백어택 추가 피해
      전설: [0.95, 1.9, 2.85, 3.8],
      유물: [0.7, 1.4, 2.1, 2.8],
    },
    apply: (level, grade, myStat) => {
      const gradeOrder = ["영웅", "전설", "유물"];
      const currentIndex = gradeOrder.indexOf(grade);
      if (currentIndex === -1) return;

      const isZeroLevel = level === "Lv.0" || level === 0 || level === "0";
      const parsedLevel = typeof level === "string" ? parseInt(level.replace("Lv.", "")) : level;

      for (let i = 0; i <= currentIndex; i++) {
        const g = gradeOrder[i];
        const effectList = engravings["기습의 대가"].effects[g];
        const value = isZeroLevel ? effectList[0] : effectList[parsedLevel - 1];

        myStat.finalDamagePer = (myStat.finalDamagePer || 0) + value;
        myStat.addDamagePer = (myStat.addDamagePer || 0) + value;
      }
    }
  }

,

 "돌격대장": {
   base: { finalDamagePer: 9.6 },
   effects: {
     영웅: [0.8, 1.6, 2.4, 3.2],
     전설: [0.8, 1.6, 2.4, 3.2],
     유물: [0.8, 1.6, 2.4, 3.2],
   },
   apply: (level, grade, myStat) => {
     const gradeOrder = ["영웅", "전설", "유물"];
     const currentIndex = gradeOrder.indexOf(grade);
     if (currentIndex === -1) return;

     const isZeroLevel = level === "Lv.0" || level === 0 || level === "0";
     const parsedLevel = typeof level === "string" ? parseInt(level.replace("Lv.", "")) : level;

     for (let i = 0; i <= currentIndex; i++) {
       const g = gradeOrder[i];
       const effectList = engravings["돌격대장"].effects[g];
       const value = isZeroLevel ? effectList[0] : effectList[parsedLevel - 1];

       myStat.movementSpeedToDamagePer = (myStat.movementSpeedToDamagePer || 0) + value;
     }
   }
 },

  "마나 효율 증가": {
    base: { addDamagePer: 9 },
    effects: {
      영웅: [0.5, 1, 1.5, 2],
      전설: [0.5, 1, 1.5, 2],
      유물: [0.5, 1, 1.5, 2],
    },
    apply: (level, grade, myStat) => {
      const gradeOrder = ["영웅", "전설", "유물"];
      const currentIndex = gradeOrder.indexOf(grade);
      if (currentIndex === -1) return;

      const isZeroLevel = level === "Lv.0" || level === 0 || level === "0";
      const parsedLevel = typeof level === "string" ? parseInt(level.replace("Lv.", "")) : level;

      for (let i = 0; i <= currentIndex; i++) {
        const g = gradeOrder[i];
        const effectList = engravings["마나 효율 증가"].effects[g];
        const value = isZeroLevel ? effectList[0] : effectList[parsedLevel - 1];

        myStat.addDamagePer = (myStat.addDamagePer || 0) + value;
      }
    }
  },

  "바리케이드": {
    base: { attackPowerPer: 12, addDamagePer: 5 },
    effects: {
      영웅: [0.75, 1.5, 2.25, 3],
      전설: [0.75, 1.5, 2.25, 3],
      유물: [0.75, 1.5, 2.25, 3],
    },
    apply: (level, grade, myStat) => {
      const gradeOrder = ["영웅", "전설", "유물"];
      const currentIndex = gradeOrder.indexOf(grade);
      if (currentIndex === -1) return;

      const isZeroLevel = level === "Lv.0" || level === 0 || level === "0";
      const parsedLevel = typeof level === "string" ? parseInt(level.replace("Lv.", "")) : level;

      for (let i = 0; i <= currentIndex; i++) {
        const g = gradeOrder[i];
        const effectList = engravings["바리케이드"].effects[g];
        const value = isZeroLevel ? effectList[0] : effectList[parsedLevel - 1];

        myStat.addDamagePer = (myStat.addDamagePer || 0) + value;
      }
    }
  },

  "속전속결": {
    base: { addDamagePer: 0.14 },
    effects: {
      영웅: [0.5, 1, 1.5, 2],
      전설: [0.5, 1, 1.5, 2],
      유물: [0.5, 1, 1.5, 2],
    },
    apply: (level, grade, myStat) => {
      const gradeOrder = ["영웅", "전설", "유물"];
      const currentIndex = gradeOrder.indexOf(grade);
      if (currentIndex === -1) return;

      const isZeroLevel = level === "Lv.0" || level === 0 || level === "0";
      const parsedLevel = typeof level === "string" ? parseInt(level.replace("Lv.", "")) : level;

      for (let i = 0; i <= currentIndex; i++) {
        const g = gradeOrder[i];
        const effectList = engravings["속전속결"].effects[g];
        const value = isZeroLevel ? effectList[0] : effectList[parsedLevel - 1];

        myStat.addDamagePer = (myStat.addDamagePer || 0) + value;
      }
    }
  },

  "슈퍼 차지": {
    base: { addDamagePer: 0.14 },
    effects: {
      영웅: [0.5, 1, 1.5, 2],
      전설: [0.5, 1, 1.5, 2],
      유물: [0.5, 1, 1.5, 2],
    },
    apply: (level, grade, myStat) => {
      const gradeOrder = ["영웅", "전설", "유물"];
      const currentIndex = gradeOrder.indexOf(grade);
      if (currentIndex === -1) return;

      const isZeroLevel = level === "Lv.0" || level === 0 || level === "0";
      const parsedLevel = typeof level === "string" ? parseInt(level.replace("Lv.", "")) : level;

      for (let i = 0; i <= currentIndex; i++) {
        const g = gradeOrder[i];
        const effectList = engravings["슈퍼 차지"].effects[g];
        const value = isZeroLevel ? effectList[0] : effectList[parsedLevel - 1];

        myStat.addDamagePer = (myStat.addDamagePer || 0) + value;
      }
    }
  }
,

  "아드레날린": {
    base: { AtkPer: 2.4, criticalChancePer: 8 },
    effects: {
      영웅: [0.78, 1.56, 2.34, 3.12], // 공격력 증가
      전설: [0.78, 1.56, 2.34, 3.12], // 치명타 적중률 증가
      유물: [0.78, 1.56, 2.34, 3.12], // 치명타 적중률 증가
    },
    apply: (level, grade, myStat) => {
      const gradeOrder = ["영웅", "전설", "유물"];
      const currentIndex = gradeOrder.indexOf(grade);

      if (currentIndex === -1) return;

      // 하위 등급의 공격력 효과 적용 (영웅 고정)
      const atkValue = engravings["아드레날린"].effects["영웅"][level - 1];
      myStat.AtkPer = (myStat.AtkPer || 0) + atkValue;

      // 현재 등급 포함 하위 등급들의 치명타 적중률 누적 적용
      for (let i = 1; i <= currentIndex; i++) {
        const gradeName = gradeOrder[i];
        const critValue = engravings["아드레날린"].effects[gradeName][level - 1];
        myStat.criticalChancePer = (myStat.criticalChancePer || 0) + critValue;
      }
    }
  },

"안정된 상태": {
  base: { finalDamagePer: 8 },
  effects: {
    영웅: [0.75, 1.5, 2.25, 3],
    전설: [0.75, 1.5, 2.25, 3],
    유물: [0.75, 1.5, 2.25, 3],
  },
  apply: (level, grade, myStat) => {
    const gradeOrder = ["영웅", "전설", "유물"];
    const currentIndex = gradeOrder.indexOf(grade);
    if (currentIndex === -1) return;

    const isZeroLevel = level === "Lv.0" || level === 0 || level === "0";
    const parsedLevel = typeof level === "string" ? parseInt(level.replace("Lv.", "")) : level;

    for (let i = 0; i <= currentIndex; i++) {
      const g = gradeOrder[i];
      const effectList = engravings["안정된 상태"].effects[g];
      const value = isZeroLevel ? effectList[0] : effectList[parsedLevel - 1];
      myStat.finalDamagePer = (myStat.finalDamagePer || 0) + value;
    }
  }
},

"에테르 포식자": {
  base: { AtkPer: 10 },
  effects: {
    유물: [0.9, 1.8, 2.7, 3.6],
  },
  apply: (level, grade, myStat) => {
    const isZeroLevel = level === "Lv.0" || level === 0 || level === "0";
    const parsedLevel = typeof level === "string" ? parseInt(level.replace("Lv.", "")) : level;

    const effects = engravings["에테르 포식자"].effects["유물"];
    const value = isZeroLevel ? effects[0] : effects[parsedLevel - 1];
    myStat.AtkPer = (myStat.AtkPer || 0) + value;
  }
},

"예리한 둔기": {
  base: { criticalDamagePer: 28 },
  effects: {
    영웅: [2, 4, 6, 8],
    전설: [2, 4, 6, 8],
    유물: [2, 4, 6, 8],
  },
  apply: (level, grade, myStat) => {
    const gradeOrder = ["영웅", "전설", "유물"];
    const currentIndex = gradeOrder.indexOf(grade);
    if (currentIndex === -1) return;

    const isZeroLevel = level === "Lv.0" || level === 0 || level === "0";
    const parsedLevel = typeof level === "string" ? parseInt(level.replace("Lv.", "")) : level;

    for (let i = 0; i <= currentIndex; i++) {
      const g = gradeOrder[i];
      const effectList = engravings["예리한 둔기"].effects[g];
      const value = isZeroLevel ? effectList[0] : effectList[parsedLevel - 1];
      myStat.criticalDamagePer = (myStat.criticalDamagePer || 0) + value;
    }
  }
},

"원한": {
  base: { bossDamagePer: 12 },
  effects: {
    영웅: [0.75, 1.5, 2.25, 3],
    전설: [0.75, 1.5, 2.25, 3],
    유물: [0.75, 1.5, 2.25, 3],
  },
  apply: (level, grade, myStat) => {
    const gradeOrder = ["영웅", "전설", "유물"];
    const currentIndex = gradeOrder.indexOf(grade);
    if (currentIndex === -1) return;

    const isZeroLevel = level === "Lv.0" || level === 0 || level === "0";
    const parsedLevel = typeof level === "string" ? parseInt(level.replace("Lv.", "")) : level;

    for (let i = 0; i <= currentIndex; i++) {
      const g = gradeOrder[i];
      const effectList = engravings["원한"].effects[g];
      const value = isZeroLevel ? effectList[0] : effectList[parsedLevel - 1];
      myStat.addDamagePer = (myStat.addDamagePer || 0) + value;
    }
  }
},

"저주받은 인형": {
  base: { finalDamagePer: 8 },
  effects: {
    영웅: [0.75, 1.5, 2.25, 3],
    전설: [0.75, 1.5, 2.25, 3],
    유물: [0.75, 1.5, 2.25, 3],
  },
  apply: (level, grade, myStat) => {
    const gradeOrder = ["영웅", "전설", "유물"];
    const currentIndex = gradeOrder.indexOf(grade);
    if (currentIndex === -1) return;

    const isZeroLevel = level === "Lv.0" || level === 0 || level === "0";
    const parsedLevel = typeof level === "string" ? parseInt(level.replace("Lv.", "")) : level;

    for (let i = 0; i <= currentIndex; i++) {
      const g = gradeOrder[i];
      const effectList = engravings["저주받은 인형"].effects[g];
      const value = isZeroLevel ? effectList[0] : effectList[parsedLevel - 1];
      myStat.finalDamagePer = (myStat.finalDamagePer || 0) + value;
    }
  }
},

"정밀단도": {
  base: { criticalChancePer: 12, criticalDamagePer: -6 },
  effects: {
    영웅: [0.75, 1.5, 2.25, 3],
    전설: [0.75, 1.5, 2.25, 3],
    유물: [0.75, 1.5, 2.25, 3],
  },
  apply: (level, grade, myStat) => {
    const gradeOrder = ["영웅", "전설", "유물"];
    const currentIndex = gradeOrder.indexOf(grade);
    if (currentIndex === -1) return;

    const isZeroLevel = level === "Lv.0" || level === 0 || level === "0";
    const parsedLevel = typeof level === "string" ? parseInt(level.replace("Lv.", "")) : level;

    for (let i = 0; i <= currentIndex; i++) {
      const g = gradeOrder[i];
      const effectList = engravings["정밀단도"].effects[g];
      const value = isZeroLevel ? effectList[0] : effectList[parsedLevel - 1];
      myStat.criticalChancePer = (myStat.criticalChancePer || 0) + value;
    }
  }
},

"질량증가": {
  base: { finalDamagePer: 10 },
  effects: {
    영웅: [0.75, 1.5, 2.25, 3],
    전설: [0.75, 1.5, 2.25, 3],
    유물: [0.75, 1.5, 2.25, 3],
  },
  apply: (level, grade, myStat) => {
    const gradeOrder = ["영웅", "전설", "유물"];
    const currentIndex = gradeOrder.indexOf(grade);
    if (currentIndex === -1) return;

    const isZeroLevel = level === "Lv.0" || level === 0 || level === "0";
    const parsedLevel = typeof level === "string" ? parseInt(level.replace("Lv.", "")) : level;

    for (let i = 0; i <= currentIndex; i++) {
      const g = gradeOrder[i];
      const effectList = engravings["질량증가"].effects[g];
      const value = isZeroLevel ? effectList[0] : effectList[parsedLevel - 1];
      myStat.finalDamagePer = (myStat.finalDamagePer || 0) + value;
    }
  }
},

"타격의 대가": {
  base: { finalDamagePer: 8 },
  effects: {
    영웅: [0.75, 1.5, 2.25, 3],
    전설: [0.75, 1.5, 2.25, 3],
    유물: [0.75, 1.5, 2.25, 3],
  },
  apply: (level, grade, myStat) => {
    const gradeOrder = ["영웅", "전설", "유물"];
    const currentIndex = gradeOrder.indexOf(grade);
    if (currentIndex === -1) return;

    const isZeroLevel = level === "Lv.0" || level === 0 || level === "0";
    const parsedLevel = typeof level === "string" ? parseInt(level.replace("Lv.", "")) : level;

    for (let i = 0; i <= currentIndex; i++) {
      const g = gradeOrder[i];
      const effectList = engravings["타격의 대가"].effects[g];
      const value = isZeroLevel ? effectList[0] : effectList[parsedLevel - 1];
      myStat.finalDamagePer = (myStat.finalDamagePer || 0) + value;
    }
  }
}



};
function parseEffectiveGradeLevel(grade, levelStr) {
  let level = parseInt(levelStr.replace("Lv.", ""));
  if (isNaN(level)) level = 0;

  const gradeOrder = ["영웅", "전설", "유물"];
  let gradeIndex = gradeOrder.indexOf(grade);
  if (gradeIndex === -1) return { effectiveGrade: grade, effectiveLevel: level };

  // 0레벨일 때 하위 등급 4레벨로 승급 처리 (영웅 0레벨만 base만)
  if (level === 0) {
    if (gradeIndex > 0) {
      // 하위 등급 4레벨로 변경 (등급 한 단계 아래, 레벨 4)
      gradeIndex -= 1;
      level = 4;
    }
    // 영웅 0레벨은 그대로 두고 base만 적용하게 함
  }

  // 각 4레벨마다 상위 등급으로 승급
  while (level > 4 && gradeIndex < gradeOrder.length - 1) {
    level -= 4;
    gradeIndex += 1;
  }

  return { effectiveGrade: gradeOrder[gradeIndex], effectiveLevel: level };
}

export function applyEngravingOption({ name, grade, level }, myStat) {
  const engraving = engravings[name];
  if (!engraving) {
    console.warn(`해당 이름의 각인이 존재하지 않습니다: ${name}`);
    return;
  }

  const { effectiveGrade, effectiveLevel } = parseEffectiveGradeLevel(grade, level);

  const gradeOrder = ["영웅", "전설", "유물"];
  const currentIndex = gradeOrder.indexOf(effectiveGrade);
  if (currentIndex === -1) return;

  // base 스탯은 항상 적용
  if (engraving.base) {
    for (const key in engraving.base) {
      const baseValue = engraving.base[key];
      const prev = Number(myStat[key]) || 0;
      myStat[key] = roundFloat(prev + baseValue);
    }
  }

  // 영웅 0레벨이면 base만 적용, 효과 누적은 건너뜀
  if (effectiveGrade === "영웅" && effectiveLevel === 0) {
    return;
  }

  // 등급 누적 효과 적용
  for (let i = 0; i <= currentIndex; i++) {
    const g = gradeOrder[i];
    const effectList = engraving.effects?.[g];
    if (effectList && effectList[effectiveLevel - 1] != null) {
      const value = effectList[effectiveLevel - 1];
      const prev = Number(myStat.finalDamagePer) || 0;
      myStat.finalDamagePer = roundFloat(prev + value);
    }
  }

  if (engraving.apply) {
    engraving.apply(effectiveLevel, effectiveGrade, myStat);
  }
}

function roundFloat(value, precision = 2) {
  const factor = Math.pow(10, precision);
  return Math.round((value + Number.EPSILON) * factor) / factor;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////
const abilityStoneStats = {
  "원한": { statKey: "addDamagePer", values: [3, 3.75, 5.25, 6] },
  "질량 증가": { statKey: "addDamagePer", values: [3, 3.75, 5.25, 6] },
  "기습의 대가": { statKey: "addDamagePer", values: [3.27, 3.4, 4.7, 5.4] },
  "마나 효율 증가": { statKey: "addDamagePer", values: [3, 3.75, 5.25, 6] },
  "아드레날린": { statKey: "AtkPer", values: [2.88, 3.6, 4.98, 5.7] },
  "저주받은 인형": { statKey: "addDamagePer", values: [3, 3.75, 5.25, 6] },
  "예리한 둔기": { statKey: "criticalDamagePer", values: [7.5, 9.4, 13.2, 15] },
  "결투의 대가": { statKey: "addDamagePer", values: [3.27, 3.4, 4.7, 5.4] },
  "돌격대장": { statKey: "addDamagePer", values: [3, 3.75, 5.25, 6] },
  "정밀단도": { statKey: "criticalChancePer", values: [3, 3.75, 5.25, 6] },
  "슈퍼차지": { statKey: "addDamagePer", values: [3, 3.75, 5.25, 6] },
  "타격의 대가": { statKey: "addDamagePer", values: [3, 3.75, 5.25, 6] },
  "안정된상태": { statKey: "addDamagePer", values: [3, 3.75, 5.25, 6] },
  "속전속결": { statKey: "addDamagePer", values: [3, 3.75, 5.25, 6] },
  "바리케이드": { statKey: "addDamagePer", values: [3, 3.75, 5.25, 6] },
  "에테르 포식자": { statKey: "AtkPer", values: [3, 3.75, 5.25, 6] },
};

export function applyAbilityStones(abilityStoneEngravings, myStat) {
  if (!Array.isArray(abilityStoneEngravings)) return;  // 배열이 아니면 바로 리턴

  abilityStoneEngravings.forEach((str) => {
    const matched = str.match(/\[([^\]]+)\]\s*Lv\.(\d+)/);
    if (!matched) return;
    const name = matched[1];
    const level = parseInt(matched[2], 10);
    if (level <= 0) return;
    const statInfo = abilityStoneStats[name];
    if (!statInfo) return;
    const value = statInfo.values[level - 1];
    if (value === undefined) return;

    myStat[statInfo.statKey] = (myStat[statInfo.statKey] || 0) + value;
  });
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////


export function applyBraceletEffects(braceletEffects, myStat) {
  const maxValues = {
    mainStat: 360,
    STAT: 16000,
  };

  const braceletOptionPatterns = [
    {
      regex: /(특화|치명|신속) \+(\d+)/,
      apply: (match, myStat) => {
        myStat.mainStat = roundFloat((myStat.mainStat || 2000) + parseInt(match[2], 10));

      },
    },
    {
      regex: /(지능|힘|민첩) \+(\d+)/,
      apply: (match, myStat) => {
        myStat.STAT = roundFloat(myStat.STAT + parseInt(match[2], 10));
      },
    },
    {
      regex: /치명타 적중률(?:이)? ?\+?((\d+\.?\d*\/)*\d+\.?\d*)%? 증가/,
      apply: (match, myStat) => {
        const nums = match[1].split('/');
        const value = nums.length === 1 ? parseFloat(nums[0]) : parseFloat(nums[1]);
        myStat.criticalChancePer = roundFloat(myStat.criticalChancePer + value);
      },
    },
    {
      regex: /치명타 적중률 \+(\d+\.?\d*)%/,
      apply: (match, myStat) => {
        myStat.criticalChancePer = roundFloat(myStat.criticalChancePer + parseFloat(match[1]));
      },
    },
    {
      regex: /치명타 피해가 ((\d+\.?\d*\/)*\d+\.?\d*)% 증가/,
      apply: (match, myStat) => {
        const nums = match[1].split('/');
        const value = nums.length === 1 ? parseFloat(nums[0]) : parseFloat(nums[1]);
        myStat.criticalDamagePer = roundFloat(myStat.criticalDamagePer + value);
      },
    },
    {
      regex: /치명타 피해 \+(\d+\.?\d*)%/,
      apply: (match, myStat) => {
        myStat.criticalDamagePer = roundFloat(myStat.criticalDamagePer + parseFloat(match[1]));
      },
    },
    {
      regex: /적에게 주는 피해가 ((\d+\.?\d*\/)*\d+\.?\d*)% 증가/,
      apply: (match, myStat) => {
        const nums = match[1].split('/');
        const value = nums.length === 1 ? parseFloat(nums[0]) : parseFloat(nums[1]);
        myStat.addDamagePer = roundFloat(myStat.addDamagePer + value);
      },
    },
    {
      regex: /추가 피해가 ((\d+\.?\d*\/)*\d+\.?\d*)% 증가/,
      apply: (match, myStat) => {
        const nums = match[1].split('/');
        const value = nums.length === 1 ? parseFloat(nums[0]) : parseFloat(nums[1]);
        myStat.addDamagePer = roundFloat(myStat.addDamagePer + value);
      },
    },
    {
      regex: /공격이 치명타로 적중 시 적에게 주는 피해가 (\d+\.?\d*)% 증가/,
      apply: (match, myStat) => {
        myStat.addDamagePer = roundFloat(myStat.addDamagePer + parseFloat(match[1]));
      },
    },
    {
      regex: /무기공격력 (\d+)\/(\d+)\/(\d+) 증가/,
      apply: (match, myStat) => {
        myStat.WeaponAtk = roundFloat(myStat.WeaponAtk + parseInt(match[2], 10));
      },
    },
    {
      regex: /최대 (\d+)중첩.*?무기공격력 (\d+)\/(\d+)\/(\d+)/,
      apply: (match, myStat) => {
        const maxStack = parseInt(match[1], 10);
        const weaponAtkPerStack = parseInt(match[2], 10);
        const halfStack = Math.floor(maxStack / 2);
        const totalWeaponAtk = weaponAtkPerStack * halfStack;
        myStat.WeaponAtk = roundFloat(myStat.WeaponAtk + totalWeaponAtk);
      },
    },
    {
      regex: /무기 공격력이 (\d+) 증가한다/,
      apply: (match, myStat) => {
        myStat.WeaponAtk = roundFloat(myStat.WeaponAtk + parseInt(match[1], 10));
      },
    },
    {
      regex: /공격 적중 시 30초 마다 120초 동안 무기 공격력이 (\d+) 증가한다.*?최대 (\d+)중첩/,
      apply: (match, myStat) => {
        const atkPerStack = parseInt(match[1], 10);
        const maxStack = parseInt(match[2], 10);
        const halfStack = Math.floor(maxStack / 2);
        myStat.WeaponAtk = roundFloat(myStat.WeaponAtk + atkPerStack * halfStack);
      },
    },
  ];

  braceletEffects.forEach(line => {
    for (const pattern of braceletOptionPatterns) {
      const match = line.match(pattern.regex);
      if (match) {
        pattern.apply(match, myStat);
        break;
      }
    }
  });


}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
export function getTranscendStageFromElixirName(elixirName) {
  if (typeof elixirName !== 'string') return 0;

  const match = elixirName.match(/(\d+)\s*단계/);
  return match ? parseInt(match[1], 10) : 0;
}

export function getTranscendStageFromElixirNameLevel(elixirName) {
  if (typeof elixirName !== 'string') return 0;

  const match = elixirName.match(/단계\s*(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}
export function getTotalElixirLevel(item) {
  if (!item || !Array.isArray(item.elixirOptions)) return 0;
  return item.elixirOptions.reduce((sum, elixir) => sum + (elixir.level || 0), 0);
}

export function getTotalElixirLevelFromItems(items) {
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, item) => sum + getTotalElixirLevel(item), 0);
}

function calculateAverageGemLevel(gemList) {
  const adjustedLevels = gemList.map(gem => {
    const level = parseInt(gem.Name);
    if (gem.gemType === '멸화' || gem.gemType === '홍염') {
      return level - 1.7;
    }
    return level;
  });

  const total = adjustedLevels.reduce((sum, lvl) => sum + lvl, 0);
  const average = total / adjustedLevels.length;
  console.log(Number(average.toFixed(2))*160);
  return Number(average.toFixed(2))*160;

}


export function calculateScore(myStat,gems) {
  const {
    STAT = 0,
    WeaponAtk = 0,
    Atk = 0,
    addDamagePer = 0,
    finalDamagePer = 0,
    WeaponAtkPer = 0,
    AtkPer = 0,
    criticalChancePer = 0,
    criticalDamagePer = 0,
    bossDamagePer = 0,
    mainStat = 0
  } = myStat;

  // finalAtk 계산
  const baseAtk = Math.sqrt((STAT * WeaponAtk) / 6); // 고침
  const weaponScaled = baseAtk * (1 + WeaponAtkPer / 100);
  const rawFinalAtk = (weaponScaled + Atk) * (1 + AtkPer / 100);

  // 각 스탯 점수 계산
  const finalAtkScore = (rawFinalAtk / 200) * 3;
  const bossDamageScore = bossDamagePer * 15;
  const addDamageScore = addDamagePer * 12;
  const finalDamageScore = finalDamagePer * 11;
  const critDmgScore = criticalDamagePer * 5;
  const critChanceScore = criticalChancePer * 10;
  const mainStatScore = mainStat * 0.22;
  const gemScore = calculateAverageGemLevel(gems);
  // 총합
  const totalScore = finalAtkScore + bossDamageScore + addDamageScore +
                     finalDamageScore + critDmgScore + critChanceScore +
                     mainStatScore + gemScore;

  return Math.round(totalScore * 100) / 100;
}
