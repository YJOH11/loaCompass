// src/pages/CharacterSearch.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-3xl font-bold mb-8">
                {characterData?.profile?.CharacterName} 님의 정보</h1>

            {hasSearched && (
                characterData ? (
                    <div className="bg-gray-800 rounded-lg shadow-md p-6 flex gap-6 items-start">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-2">
                                {characterData.profile?.CharacterName}
                            </h2>
                            <ul className="space-y-1">
                                <li>
                                    <span className="font-semibold">서버:</span> {characterData.profile?.ServerName}
                                </li>
                                <li>
                                    <span className="font-semibold">클래스:</span> {characterData.profile?.CharacterClassName}
                                </li>
                                <li>
                                    <span className="font-semibold">레벨:</span> {characterData.profile?.CharacterLevel}
                                </li>
                            </ul>
                        </div>

                        <div className="flex-1">
                            {characterData.equipments?.length > 0 ? (
                                characterData.equipments.map((item, idx) => (
                                    item && (
                                        <div key={idx} className="bg-gray-700 rounded p-4 mb-2">
                                            {item.icon && (
                                                <img
                                                    src={item.icon}
                                                    alt={item.name || "장비"}
                                                    className="w-12 h-12 mb-2"
                                                />
                                            )}
                                            <div className="font-semibold">{item.name || "이름 없음"}</div>
                                            <div className="text-sm text-gray-300">
                                                {item.type || "타입 없음"} | {item.grade || "등급 없음"}
                                            </div>
                                            <div className="text-sm">
                                                +{item.refinementLevel ?? 0} | 품질: {item.quality ?? 0}
                                            </div>
                                            {item.elixirName && (
                                                <div className="text-sm text-emerald-300">
                                                    엘릭서: {item.elixirName}
                                                </div>
                                            )}
                                            {item.elixirEffects?.length > 0 && (
                                                <ul className="text-sm text-emerald-200 list-disc ml-4">
                                                    {item.elixirEffects.map((effect, i) => (
                                                        <li key={i}>{effect}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )
                                ))
                            ) : (
                                <div className="text-gray-400 italic">장비 정보 없음</div>
                            )}
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
