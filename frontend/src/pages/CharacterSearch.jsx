import { useState } from "react";
import axios from "axios";

export default function CharacterSearch() {
    const [characterName, setCharacterName] = useState("");
    const [characterData, setCharacterData] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    const searchCharacter = async () => {
        setHasSearched(true);
        try {
            const response = await axios.get(
                `http://localhost:8080/api/character/${characterName}`
            );
            console.log(response.data);

            if (response.data && response.data.profile) {
                setCharacterData(response.data);
            } else {
                setCharacterData(null);
            }
        } catch (error) {
            console.error(error);
            setCharacterData(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-3xl font-bold mb-8">유저 검색</h1>

            <div className="flex mb-8">
                <input
                    type="text"
                    placeholder="유저 이름을 입력하세요"
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    className="flex-1 p-2 rounded-l-lg bg-gray-800 border border-gray-600 focus:outline-none"
                />
                <button
                    onClick={searchCharacter}
                    className="p-2 px-4 rounded-r-lg bg-blue-600 hover:bg-blue-700"
                >
                    검색
                </button>
            </div>

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
