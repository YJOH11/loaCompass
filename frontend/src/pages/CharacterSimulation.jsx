import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CharacterSearchInput from "../components/CharacterSearchInput";
import CharacterProfileCard from "../components/CharacterProfileCard";
import GemList from "../components/Gem/GemList";
import ScoreRow from "../components/score/ScoreRow";
import SimulationRow from "../components/Simulation/SimulationRow";

export default function CharacterSimulation() {

  const { name: characterName } = useParams();
  const [characterData, setCharacterData] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [simOptionsChanged, setSimOptionsChanged] = useState(0);
  const [updatedItem, setUpdatedItem] = useState(null);
  const [updatedAbilityStone, setUpdatedAbilityStone] = useState(null);
  const [updatedAccessory, setUpdatedAccessory] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("favoriteHistory");
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const fetchCharacter = async () => {
      if (!characterName) return;
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/character/${characterName}`);
        if (response.data?.profile) {
          setCharacterData(response.data);
        } else {
          setCharacterData(null);
        }
      } catch (err) {
        console.error(err);
        setCharacterData(null);
      }
      setHasSearched(true);
      setIsLoading(false);
    };

    fetchCharacter();
  }, [characterName]);

  const handleFavoriteToggle = (name, isNowFavorite) => {
    const updated = isNowFavorite
      ? [name, ...favorites.filter((n) => n !== name)]
      : favorites.filter((n) => n !== name);
    localStorage.setItem("favoriteHistory", JSON.stringify(updated));
    setFavorites(updated);
  };

  const handleEquipmentChange = (newItems) => {
    setUpdatedItem(newItems);
    setSimOptionsChanged((prev) => prev + 1);

  };
  const handleAccessoryChange = (newItems) => {


        if(newItems.Type == "목걸이"&&"귀걸이"&&"반지"){
            console.log("여기");
            setUpdatedAccessory(newItems);

        }else if(newItems.Type == "어빌리티 스톤"){
            setUpdatedAccessory(newItems);
        }

        setSimOptionsChanged((prev) => prev + 1);


  };

  const engravings = characterData?.profile?.engravings || [];

  const gears =
    characterData?.equipments?.filter((item) =>
      ["무기", "투구", "상의", "하의", "장갑", "어깨"].includes(item.Type)
    ) || [];

  const accessories =
    characterData?.equipments?.filter((item) =>
      ["목걸이", "귀걸이", "반지"].includes(item.Type)
    ) || [];

  const displayItems = (() => {
    if (!updatedItem || updatedItem.length === 0) return gears;
    const updatedArray = Array.isArray(updatedItem) ? updatedItem : [updatedItem];

    const updatedTypes = updatedArray.map((item) => item.Type);

    return gears.map((gear) => {
      const replacement = updatedArray.find((item) => item.Type === gear.Type);
      return replacement || gear;
    });
  })();

const displayAccessorys = (() => {
      if (!updatedAccessory || updatedAccessory.length === 0) return accessories;
    const updatedArray = Array.isArray(updatedAccessory) ? updatedAccessory : [updatedAccessory];

    const updatedTypes = updatedArray.map((item) => item.Type);

    return accessories.map((accessories) => {
      const replacement = updatedArray.find((item) => item.Type === accessories.Type);
      return replacement || accessories;
    });
  })();
  const displayAbilityStone = (() => {
        if (!updatedAccessory || updatedAccessory.length === 0) return accessories;
      const updatedArray = Array.isArray(updatedAccessory) ? updatedAccessory : [updatedAccessory];

      const updatedTypes = updatedArray.map((item) => item.Type);

      return accessories.map((accessories) => {
        const replacement = updatedArray.find((item) => item.Type === accessories.Type);
        return replacement || accessories;
      });
    })();

  const abilityStone = characterData?.equipments?.find((item) => item.Type === "어빌리티 스톤");
  const bracelet = characterData?.equipments?.find((item) => item.Type === "팔찌");
  const maxLen = 7;

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-6">
      {(!hasSearched || (!characterData && !isLoading)) && (
        <CharacterSearchInput
          favorites={favorites}
          setFavorites={setFavorites}
          onFavoriteToggle={handleFavoriteToggle}
        />
      )}

      {isLoading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">잠시만 기다려주세요</p>
      ) : hasSearched && characterData ? (
        <>
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            {characterData.profile.CharacterName} 님의 캐릭터 정보
          </h1>

          <div className="flex flex-col items-center">
            <div className="flex w-full max-w-[1280px] gap-6">
              <div className="min-w-[260px] max-w-[260px] bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow">
                <CharacterProfileCard
                  profile={characterData.profile}
                  favorites={favorites}
                  onFavoriteToggle={handleFavoriteToggle}
                />
                <ScoreRow
                  key={simOptionsChanged} // 강제 리렌더링
                  items={displayItems}
                  accessories={displayAccessorys}
                  engravings={engravings}
                  abilityStone={displayAbilityStone}
                  bracelet={bracelet}
                  gems={characterData.gems}
                />
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">보석</h2>
                    <GemList gems={characterData.gems} layout="inline" />
                  </div>

                  <div className="mt-6">
                    <div className="grid grid-cols-2 mb-2">
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">장비</h2>
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">악세서리</h2>
                    </div>
                    <div className="flex flex-col gap-2">
                      {Array.from({ length: maxLen }).map((_, i) => (
                        <SimulationRow
                          key={i}
                          equipment={gears[i] || null}
                          accessory={accessories[i] || null}
                          engravings={i === maxLen - 1 ? engravings : null}
                          abilityStone={i === maxLen - 2 ? abilityStone : null}
                          bracelet={i === maxLen - 1 ? bracelet : null}
                          onEquipmentChanges={handleEquipmentChange}
                          onAccessoryChanges={handleAccessoryChange}

                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : hasSearched ? (
        <p className="text-center text-red-500 dark:text-red-400">해당 유저가 존재하지 않습니다.</p>
      ) : null}
    </div>
  );
}
