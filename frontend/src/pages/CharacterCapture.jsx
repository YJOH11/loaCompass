import React, { useState } from 'react';
import axios from 'axios';
import ScoreRow from '../components/score/ScoreRow';

function CharacterScoreFromImage() {
  const [nicknameCandidates, setNicknameCandidates] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [scoreDataList, setScoreDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;


    const formData = new FormData();
    formData.append('image', file);
    setLoading(true);
    setError('');
    setSelectedNames([]);
    setScoreDataList([]);
    setNicknameCandidates([]);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ocr`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );

      const dataArray = Array.isArray(res.data) ? res.data : [];
      const candidates = dataArray.map((d) => d.text).filter((t) => t.length > 1);
      setNicknameCandidates(candidates);

      if (candidates.length === 0) {
        setError('닉네임 후보가 감지되지 않았습니다.');
      } else {
        for (const name of candidates) {
          await fetchCharacterScore(name);
        }
      }
    } catch (err) {
      console.error(err);
      setError('OCR 요청 실패');
    }

    setLoading(false);
  };

  const fetchCharacterScore = async (name) => {
    if (selectedNames.includes(name)) return;

    setSelectedNames((prev) => [...prev, name]);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/character/${name}`
      );
      if (response.data?.profile) {
        const characterData = response.data;

        const gears = characterData?.equipments?.filter((item) =>
          ["무기", "투구", "상의", "하의", "장갑", "어깨"].includes(item.Type)
        ) || [];

        const accessories = characterData?.equipments?.filter((item) =>
          ["목걸이", "귀걸이", "반지"].includes(item.Type)
        ) || [];

        const abilityStone = characterData?.equipments?.find((item) => item.Type === "어빌리티 스톤");
        const bracelet = characterData?.equipments?.find((item) => item.Type === "팔찌");
        const engravings = characterData?.profile?.engravings || [];

        setScoreDataList((prev) => [
          ...prev,
          {
            name,
            items: gears,
            accessories,
            abilityStone,
            bracelet,
            engravings,
            gems: characterData.gems,
          },
        ]);
      } else {
        setError(`'${name}' 캐릭터를 찾을 수 없습니다.`);
      }
    } catch (err) {
      console.error(err);
      setError(`'${name}' 캐릭터 조회 실패`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-indigo-700">
        사진으로 닉네임 자동 인식 및 점수 확인
      </h2>

      {/* 파일 업로드 */}
      <div className="flex justify-center mb-6">
        <label
          htmlFor="file-upload"
          className="cursor-pointer inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          title="이미지 파일 선택"
        >
          이미지 업로드
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {/* 상태 메시지 */}
      <div className="min-h-[2rem] text-center">
        {loading && <p className="text-indigo-500 animate-pulse">불러오는 중...</p>}
        {error && <p className="text-red-600 font-semibold">{error}</p>}
      </div>

      {/* 감지된 닉네임 */}
      {nicknameCandidates.length > 0 && (
        <p className="text-center text-gray-600 italic mb-8">
          감지된 닉네임: <span className="font-semibold">{nicknameCandidates.join(', ')}</span>
        </p>
      )}

      {/* 점수 카드 리스트 */}
      {scoreDataList.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {scoreDataList.map((data, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-4 text-indigo-700">{data.name}</h3>
              <ScoreRow
                items={data.items}
                accessories={data.accessories}
                engravings={data.engravings}
                abilityStone={data.abilityStone}
                bracelet={data.bracelet}
                gems={data.gems}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CharacterScoreFromImage;
