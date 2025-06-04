import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrophy, FaShareAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom"; // 상단에 추가

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
        className="absolute left-10 z-10 text-3xl text-purple-600 hover:text-purple-800"
      >
        <FaChevronLeft />
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
                  <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 flex items-center gap-2">
                     <span className="ml-2 text-xs bg-yellow-400 text-white px-2 py-1 rounded-full">
                        TOP {index + 1}
                      </span>
                  </h3>
                  <button onClick={handleShare} title="링크 복사" className="text-gray-400 hover:text-gray-700">
                    <FaShareAlt size={16} />
                  </button>
                </div>

                {/* 이미지 & 정보 */}
                <div className="flex flex-col items-center space-y-4">
                  <img
                    src={encodeURI(p.characterImage)}
                    alt="캐릭터 이미지"
                    className="w-[320px] h-[320px] rounded-full border-4 border-purple-500 shadow-md object-cover"
                  />

                  <div className="text-center text-gray-800 dark:text-gray-200 space-y-1">
                    <div className="font-semibold text-lg">

                        <Link
                            to={`/character/${p.characterName}`}
                            className="font-semibold text-lg text-blue-600 hover:underline"
                        >
                            {p.characterName}
                        </Link>

                    </div>
                    <div>아이템 레벨: {p.itemLevel}</div>
                    <div>직업: {p.characterClass}</div>
                    <div>서버: {p.serverName}</div>
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
        className="absolute right-10 z-10 text-3xl text-purple-600 hover:text-purple-800"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
