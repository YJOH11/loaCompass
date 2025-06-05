import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const raidData = {
  '서막': ['에키드나 1관문', '에키드나 2관문'],
  '1막': ['에기르 1관문', '에기르 2관문'],
  '2막': ['아브렐슈드 1관문', '아브렐슈드 2관문'],
  '3막': ['모르둠 1관문', '모르둠 2관문', '모르둠 3관문'],
};

const bossImages = {
  '에키드나 1관문': '/images/18d4615f8dd496d12.jpg',
  '에키드나 2관문': '/images/artwork_Echidna_3840x2160_v2.jpg',
  '에기르 1관문': '/images/illakan.jpg',
  '에기르 2관문': '/images/LOSTARK_wallpaper_3840x2160_Egir.jpg',
  '아브렐슈드 1관문': '/images/narok.jpg',
  '아브렐슈드 2관문': '/images/avrell.jpg',
  '모르둠 1관문': '/images/kamen.jpg',
  '모르둠 2관문': '/images/night.jpg',
  '모르둠 3관문': '/images/mordum.jpg',
};

const ClearMainPage = () => {
  const [selectedAct, setSelectedAct] = useState('서막');
  const [selectedGate, setSelectedGate] = useState('에키드나 1관문');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center">

      {/* 상단 탭 */}
      <div className="flex justify-center gap-4 py-4 border-b border-gray-200 dark:border-gray-700 w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white z-10">
        {Object.keys(raidData).map((act) => (
          <button
            key={act}
            onClick={() => {
              setSelectedAct(act);
              setSelectedGate(raidData[act][0]);
            }}
            className={`px-4 py-2 font-semibold rounded transition ${
              selectedAct === act ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
            }`}
          >
            {act}
          </button>
        ))}
      </div>

      {/* 배경 이미지 위 오버레이 */}
      <div className="relative w-full max-w-[1280px]">
        <img
          src={bossImages[selectedGate] || '/images/default.jpg'}
          alt="Boss"
          className="w-full object-contain"
        />

        {/* 관문 버튼 오버레이 */}
        <div className="absolute top-4 right-4 flex gap-2">
          {raidData[selectedAct].map((gate) => (
            <button
              key={gate}
              onClick={() => setSelectedGate(gate)}
              className={`px-3 py-1.5 rounded-full text-sm transition ${
                selectedGate === gate ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white'
              }`}
            >
              {gate}
            </button>
          ))}
        </div>

        {/* 우측 상단 정보 박스 */}
        <div className="absolute top-20 right-4 bg-white dark:bg-black bg-opacity-90 dark:bg-opacity-70 text-gray-900 dark:text-white p-4 rounded shadow-lg w-96">
          <h2 className="text-xl font-bold mb-3">{selectedGate}</h2>
          <div className="mb-3">
            <p className="text-sm font-semibold mb-1">※ 1위 공대 정보 (클리어 타임 기준)</p>
            <div className="flex gap-6 text-sm">
              <div>
                <h4 className="font-semibold">1파티</h4>
                <ul className="list-disc ml-4">
                  <li>버서커 (1610)</li>
                  <li>기공사 (1600)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">2파티</h4>
                <ul className="list-disc ml-4">
                  <li>건슬링어 (1605)</li>
                  <li>소서리스 (1608)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm font-semibold mb-1">※ 추천 직업 티어</p>
            <div className="flex flex-wrap gap-2">
              <div className="bg-yellow-400 text-black px-2 py-1 rounded text-xs">1티어: 바드</div>
              <div className="bg-gray-400 text-black px-2 py-1 rounded text-xs">2티어: 디스트로이어</div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 text-sm"
              onClick={() => navigate('/clear/submit')}
            >
              클리어 인증
            </button>
            <button
              className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 text-sm"
              onClick={() => navigate(`/clear/list?boss=${encodeURIComponent(selectedGate)}`)}
            >
              기록 보기
            </button>
          </div>
        </div>

        {/* 하단 - 기대보상 스타일 영역 */}
        <div className="absolute bottom-0 left-0 right-0 bg-gray-200 dark:bg-black bg-opacity-80 text-center py-3 text-gray-800 dark:text-white">
          <span className="text-sm font-semibold">직업 티어 분석 기반 통계 제공 예정</span>
        </div>
      </div>
    </div>
  );
};

export default ClearMainPage;