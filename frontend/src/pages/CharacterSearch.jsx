import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EquipmentCard from "../components/EquipmentCard";

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

    const gears = characterData?.equipments?.filter(
        (item) => ["무기", "투구", "상의", "하의", "장갑", "어깨"].includes(item.Type)
    ) || [];

    const accessories = characterData?.equipments?.filter(
        (item) => ["목걸이", "귀걸이", "반지"].includes(item.Type)
    ) || [];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-3xl font-bold mb-8">
                {characterData?.profile?.CharacterName} 님의 정보
            </h1>

            {hasSearched && (
                characterData ? (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* 캐릭터 요약 정보 */}
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-2">
                                {characterData.profile?.CharacterName}
                            </h2>
                            <ul className="space-y-1">
                                <li><span className="font-semibold">서버:</span> {characterData.profile?.ServerName}</li>
                                <li><span className="font-semibold">길드:</span> {characterData.profile?.GuildName}</li>
                                <li><span className="font-semibold">클래스:</span> {characterData.profile?.CharacterClassName}</li>
                                <li><span className="font-semibold">원정대 레벨:</span> {characterData.profile?.ExpeditionLevel}</li>
                                <li><span className="font-semibold">아이템 레벨:</span> {characterData.profile?.ItemAvgLevel}</li>
                                <li><span className="font-semibold">전투 레벨:</span> {characterData.profile?.CharacterLevel}</li>
                            </ul>
                            <img
                                src={characterData.profile?.CharacterImage}
                                alt="캐릭터 이미지"
                                className="w-64 h-auto mt-4 rounded border border-gray-600"
                            />
                        </div>

                        {/* 장비 및 악세서리 */}
                        <div className="flex-1 space-y-8">
                            {/* 장비 섹션 */}
                            <div>
                                <h2 className="text-xl font-bold border-b pb-1 mb-2">🛡 장비</h2>
                                {gears.length > 0 ? (
                                    gears.map((item, idx) => <EquipmentCard key={idx} item={item} />)
                                ) : (
                                    <div className="text-gray-400">장비 정보 없음</div>
                                )}
                            </div>

                            {/* 악세서리 섹션 */}
                            <div>
                                <h2 className="text-xl font-bold border-b pb-1 mb-2">💍 악세서리</h2>
                                {accessories.length > 0 ? (
                                    accessories.map((item, idx) => <EquipmentCard key={idx} item={item} />)
                                ) : (
                                    <div className="text-gray-400">악세서리 정보 없음</div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="bg-red-600 text-white font-semibold px-4 py-2 rounded shadow-md">
                        검색하신 유저가 존재하지 않습니다.
                    </p>
                )
            )}
        </div>
    );
}
