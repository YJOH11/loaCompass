import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrophy, FaShareAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function TopPlayerCarousel() {
  const [players, setPlayers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get("/api/statistics/top-players").then((res) => {
      setPlayers(res.data);
    });
  }, []);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => alert(" 링크가 복사되었습니다!"))
      .catch(() => alert("복사 실패"));
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + players.length) % players.length);
  };

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  if (!players.length) return null;

  return (
    <div className="relative flex justify-center items-center w-full mt-10">
      {/* 좌측 버튼 */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/80 dark:bg-gray-800/80 rounded-r-xl shadow-lg backdrop-blur-sm text-indigo-600 dark:text-indigo-400 hover:bg-white dark:hover:bg-gray-800 transition-all group"
      >
        <FaChevronLeft className="text-2xl group-hover:scale-110 transition-transform" />
      </button>

      {/* 카드 컨테이너 */}
      <div className="relative w-[600px] h-[700px] overflow-visible">
        {players.map((p, index) => {
          const offset = index - currentIndex;
          const isCenter = offset === 0;
          const zIndex = 10 - Math.abs(offset);
          const scale = isCenter ? 1 : 0.85;
          const translateX = offset * 60;

          return (
            <div
              key={p.characterName + index}
              className="absolute top-0 left-1/2 transition-all duration-500"
              style={{
                transform: `translateX(${translateX - 50}%) scale(${scale})`,
                zIndex,
                opacity: Math.abs(offset) > 2 ? 0 : 1,
              }}
            >
              {/* 카드 본체 */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 w-[400px]">
                {/* 타이틀 */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-yellow-400 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                      TOP {index + 1}
                    </span>
                  </div>
                  <button 
                    onClick={handleShare} 
                    title="링크 복사" 
                    className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    <FaShareAlt size={16} />
                  </button>
                </div>

                {/* 이미지 & 정보 */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-500/20 dark:to-purple-500/30 rounded-full"></div>
                    <img
                      src={encodeURI(p.characterImage)}
                      alt="캐릭터 이미지"
                      className="w-[320px] h-[320px] rounded-full border-4 border-purple-500/50 shadow-lg object-cover transition-transform hover:scale-105"
                    />
                  </div>

                  <div className="text-center space-y-2">
                    <Link
                      to={`/character/${p.characterName}`}
                      className="block font-bold text-lg text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                    >
                      {p.characterName}
                    </Link>
                    <div className="text-gray-700 dark:text-gray-300 space-y-1">
                      <div className="font-medium">아이템 레벨: {p.itemLevel}</div>
                      <div>직업: {p.characterClass}</div>
                      <div>서버: {p.serverName}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 우측 버튼 */}
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/80 dark:bg-gray-800/80 rounded-l-xl shadow-lg backdrop-blur-sm text-indigo-600 dark:text-indigo-400 hover:bg-white dark:hover:bg-gray-800 transition-all group"
      >
        <FaChevronRight className="text-2xl group-hover:scale-110 transition-transform" />
      </button>

      {/* 페이지 인디케이터 */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
        {players.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex
                ? 'bg-indigo-600 dark:bg-indigo-400 w-4'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
