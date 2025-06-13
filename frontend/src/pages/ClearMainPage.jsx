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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 헤더 섹션 */}
      <div className="relative bg-gradient-to-br from-indigo-600 to-blue-700 dark:from-indigo-900 dark:to-blue-900">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">레이드 정보</h1>
          <p className="text-blue-100 text-lg">최신 레이드 공략과 클리어 기록을 확인하세요</p>
        </div>
      </div>

      {/* 네비게이션 */}
      <div className="sticky top-0 z-20 bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {Object.keys(raidData).map((act) => (
              <button
                key={act}
                onClick={() => {
                  setSelectedAct(act);
                  setSelectedGate(raidData[act][0]);
                }}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  selectedAct === act
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {act}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 레이드 이미지 섹션 */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden bg-gray-800 shadow-2xl">
              <img
                src={bossImages[selectedGate] || '/images/default.jpg'}
                alt={selectedGate}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              {/* 게이트 선택 버튼 */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex flex-wrap gap-2">
                  {raidData[selectedAct].map((gate) => (
                    <button
                      key={gate}
                      onClick={() => setSelectedGate(gate)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedGate === gate
                          ? 'bg-indigo-600 text-white shadow-lg'
                          : 'bg-gray-700/80 text-gray-200 hover:bg-gray-600/80 backdrop-blur-sm'
                      }`}
                    >
                      {gate}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 클리어 정보 패널 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl h-fit">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{selectedGate}</h2>
            
            {topRecord ? (
              <div className="space-y-6">
                {/* 최고 기록 */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">최고 기록</h3>
                  <div className="space-y-2">
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium text-lg">
                      {topRecord.guildName || '이름 없음'}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      클리어 타임: {topRecord.clearTime}
                    </p>
                  </div>
                </div>

                {/* 파티 구성 */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">파티 구성</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2].map((partyNum) => (
                      <div key={partyNum} className="space-y-2">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">{partyNum}파티</h4>
                        <ul className="space-y-2">
                          {topRecord[`party${partyNum}`].map((m, idx) => (
                            <li key={idx} className="text-sm">
                              <button
                                onClick={() => navigate(`/character/${encodeURIComponent(m.characterName)}`)}
                                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                              >
                                {m.characterName}
                              </button>
                              <span className="text-gray-600 dark:text-gray-400"> • {m.job} ({m.level})</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 직업 티어 */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">추천 직업</h3>
                  <div className="flex flex-wrap gap-2">
                    {tier1.map((t, idx) => (
                      <span key={idx} className="px-3 py-1 bg-yellow-400/90 text-yellow-900 rounded-full text-sm">
                        {t.job}
                      </span>
                    ))}
                    {tier2.map((t, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full text-sm">
                        {t.job}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 액션 버튼 */}
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate('/clear/submit')}
                    className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                  >
                    클리어 인증
                  </button>
                  <button
                    onClick={() => navigate(`/clear/list?boss=${encodeURIComponent(selectedGate)}`)}
                    className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors"
                  >
                    기록 보기
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 mb-4">아직 클리어 기록이 없습니다.</p>
                <button
                  onClick={() => navigate('/clear/submit')}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  첫 클리어 인증하기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClearMainPage;
