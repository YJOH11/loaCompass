import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import JobTierDisplay from '../components/clear/JobTierDisplay';

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
  const [topRecord, setTopRecord] = useState(null);
  const [jobTiers, setJobTiers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedGate) return;
    axios.get(`/api/clear-records/top?boss=${encodeURIComponent(selectedGate)}`)
      .then((res) => setTopRecord(res.data))
      .catch(() => setTopRecord(null));

    axios.get(`/api/clear-records/tier?boss=${encodeURIComponent(selectedGate)}`)
      .then(res => setJobTiers(res.data))
      .catch(() => setJobTiers([]));
  }, [selectedGate]);

  const tier1 = jobTiers.slice(0, 2);
  const tier2 = jobTiers.slice(2, 5);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center">
      <div className="flex justify-center gap-4 py-4 border-b border-gray-200 dark:border-gray-700 w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white z-10">
        {Object.keys(raidData).map((act) => (
          <button
            key={act}
            onClick={() => {
              setSelectedAct(act);
              setSelectedGate(raidData[act][0]);
            }}
            className={`px-4 py-2 font-semibold rounded transition ${selectedAct === act ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
              }`}
          >
            {act}
          </button>
        ))}
      </div>

      <div className="relative w-full max-w-[1280px]">
        <img
          src={bossImages[selectedGate] || '/images/default.jpg'}
          alt="Boss"
          className="w-full object-contain"
        />

        <div className="absolute top-4 right-4 flex gap-2">
          {raidData[selectedAct].map((gate) => (
            <button
              key={gate}
              onClick={() => setSelectedGate(gate)}
              className={`px-3 py-1.5 rounded-full text-sm transition ${selectedGate === gate ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white'
                }`}
            >
              {gate}
            </button>
          ))}
        </div>

        <div className="absolute top-20 right-4 bg-white dark:bg-black bg-opacity-90 dark:bg-opacity-70 text-gray-900 dark:text-white p-4 rounded shadow-lg w-96">
          <h2 className="text-xl font-bold mb-1">{selectedGate}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {topRecord ? (
              <>
                1위 공대: <span className="font-semibold text-indigo-500">{topRecord.guildName || '이름 없음'}</span>
                <span className="ml-2 text-xs">(클리어 타임: {topRecord.clearTime})</span>
              </>
            ) : (
              <span className="text-red-500">아직 클리어 기록이 없습니다.</span>
            )}
          </p>

          {topRecord && (
            <div className="mb-3">
              <p className="text-sm font-semibold mb-1">※ 파티 구성</p>
              <div className="flex gap-6 text-sm">
                {[1, 2].map((partyNum) => (
                  <div key={partyNum}>
                    <h4 className="font-semibold">{partyNum}파티</h4>
                    <ul className="list-disc ml-4">
                      {topRecord[`party${partyNum}`].map((m, idx) => (
                        <li key={idx}>
                          <span
                            onClick={() => navigate(`/character/${encodeURIComponent(m.characterName)}`)}
                            className="text-indigo-400 hover:underline cursor-pointer"
                          >
                            {m.characterName}
                          </span>
                          &nbsp;({m.job}, {m.level})
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-4">
            <p className="text-sm font-semibold mb-1">※ 추천 직업 티어</p>
            <div className="flex flex-wrap gap-2">
              {tier1.map((t, idx) => (
                <div key={idx} className="bg-yellow-400 text-black px-2 py-1 rounded text-xs">
                  1티어: {t.job}
                </div>
              ))}
              {tier2.map((t, idx) => (
                <div key={idx} className="bg-gray-400 text-black px-2 py-1 rounded text-xs">
                  2티어: {t.job}
                </div>
              ))}
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

        <div className="w-full px-4 py-3 bg-white/70 dark:bg-black/50 backdrop-blur-sm z-10 overflow-visible relative">
          <JobTierDisplay jobTiers={jobTiers} />
        </div>
      </div>
    </div>
  );
};

export default ClearMainPage;
