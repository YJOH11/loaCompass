// CharacterSearch.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CharacterProfileCard from "../components/CharacterProfileCard";
import GemList from "../components/Gem/GemList";
import EquipmentAccessoryRow from "../components/Equipment/EquipmentAccessoryRow"

export default function CharacterSearch() {
  const { name: characterName } = useParams();
  const [characterData, setCharacterData] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 👈 추가

  useEffect(() => {
    const fetchCharacter = async () => {
      setIsLoading(true); // 👈 검색 시작
      try {
        const response = await axios.get(`http://localhost:8080/api/character/${characterName}`);
        if (response.data && response.data.profile) {
          setCharacterData(response.data);
        } else {
          setCharacterData(null);
        }
      } catch (error) {
        console.error(error);
        setCharacterData(null);
      }
      setHasSearched(true);
      setIsLoading(false);
    };

    if (characterName) fetchCharacter();
  }, [characterName]);

  const gears = characterData?.equipments?.filter((item) =>
      ["무기", "투구", "상의", "하의", "장갑", "어깨"].includes(item.Type)
  ) || [];

  const accessories = characterData?.equipments?.filter((item) =>
      ["목걸이", "귀걸이", "반지"].includes(item.Type)
  ) || [];

  const abilityStone = characterData?.equipments?.find(item => item.Type === "어빌리티 스톤");
  const bracelet = characterData?.equipments?.find(item => item.Type === "팔찌");
  const maxLen = Math.max(gears.length, accessories.length);

  return (
      <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-6">
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
                    <CharacterProfileCard profile={characterData.profile} />
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
                              <EquipmentAccessoryRow
                                  key={i}
                                  equipment={gears[i] || null}
                                  accessory={accessories[i] || null}
                                  abilityStone={i === maxLen - 1 ? abilityStone : null}
                                  bracelet={i === maxLen - 1 ? bracelet : null}
                              />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
        ) : hasSearched && !characterData ? (
            <p className="text-center text-red-500 dark:text-red-400">해당 유저가 존재하지 않습니다.</p>
        ) : null}
      </div>
  );
}
