// CharacterSearch.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CharacterProfileCard from "../components/CharacterProfileCard";
import GemList from "../components/GemList";
import EquipmentAccessoryRow from "../components/EquipmentAccessoryRow";

export default function CharacterSearch() {
  const { name: characterName } = useParams();
  const [characterData, setCharacterData] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/character/${characterName}`
        );
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
    };

    if (characterName) fetchCharacter();
  }, [characterName]);

  const gears = characterData?.equipments?.filter((item) =>
    ["무기", "투구", "상의", "하의", "장갑", "어깨"].includes(item.Type)
  ) || [];

  const accessories = characterData?.equipments?.filter((item) =>
    ["목걸이", "귀걸이", "반지"].includes(item.Type)
  ) || [];

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-6">
      {hasSearched && characterData ? (
        <>
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            {characterData.profile.CharacterName} 님의 캐릭터 정보
          </h1>

          <div className="flex flex-col items-center">
            <div className="flex w-full max-w-[1280px] gap-6">
              {/* 캐릭터 요약 박스 */}
              <div className="min-w-[260px] max-w-[260px] bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow">
                <CharacterProfileCard profile={characterData.profile} />
              </div>

              {/* 보석 + 장비/악세서리 */}
              <div className="flex-1">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">💎 보석</h2>
                    <GemList gems={characterData.gems} layout="inline" />
                  </div>

                  <div className="mt-6">
                    <div className="grid grid-cols-2 mb-2">
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">🛡 장비</h2>
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">💍 악세서리</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-start">
                      {Array.from({ length: Math.max(gears.length, accessories.length) }).map((_, i) => (
                        <EquipmentAccessoryRow
                          key={i}
                          equipment={gears[i] || null}
                          accessory={accessories[i] || null}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-red-500 dark:text-red-400">검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
