import { useState } from "react";
import axios from "axios";

export default function CharacterSearch() {
    const [characterName, setCharacterName] = useState("");
    const [characterData, setCharacterData] = useState([]);

    const searchCharacter = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/character/${characterName}`);
            console.log(response.data);
            setCharacterData(response.data); // 데이터 저장
        } catch (error) {
            console.error(error);
            alert("캐릭터 정보를 가져오는 데 실패했습니다.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-3xl font-bold mb-8">로스트아크 캐릭터 검색</h1>

            {/* 검색창 */}
            <div className="flex mb-8">
                <input
                    type="text"
                    placeholder="캐릭터 이름을 입력하세요"
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

            {/* 검색 결과 테이블 */}
            {characterData.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-800 rounded-lg">
                        <thead>
                        <tr>
                            <th className="p-4 border-b border-gray-700">#</th>
                            <th className="p-4 border-b border-gray-700">캐릭터 이름</th>
                            <th className="p-4 border-b border-gray-700">서버</th>
                            <th className="p-4 border-b border-gray-700">클래스</th>
                        </tr>
                        </thead>
                        <tbody>
                        {characterData.map((character, index) => (
                            <tr key={index} className="hover:bg-gray-700">
                                <td className="p-4 text-center">{index + 1}</td>
                                <td className="p-4 text-center">{character.CharacterName}</td>
                                <td className="p-4 text-center">{character.ServerName}</td>
                                <td className="p-4 text-center">{character.CharacterClassName}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-400">검색 결과가 없습니다.</p>
            )}
        </div>
    );
}
