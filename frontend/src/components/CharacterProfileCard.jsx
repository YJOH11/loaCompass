import { useState, useEffect } from "react";

export default function CharacterProfileCard({ profile, onFavoriteToggle }) {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favoriteHistory");
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const isFavorite = favorites.includes(profile.CharacterName);

  const toggleFavorite = (e) => {
    e?.stopPropagation?.();
    let updated;
    if (isFavorite) {
      updated = favorites.filter(name => name !== profile.CharacterName);
    } else {
      updated = [profile.CharacterName, ...favorites];
    }
    localStorage.setItem("favoriteHistory", JSON.stringify(updated));
    setFavorites(updated);
    
    // 부모 컴포넌트에 즐겨찾기 변경 알림 (마이페이지에서 즐겨찾기 목록 업데이트)
    if (onFavoriteToggle) {
      onFavoriteToggle(profile.CharacterName, !isFavorite);
    }
  };

  // 로컬 스토리지 변경 감지하여 즐겨찾기 상태 업데이트
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem("favoriteHistory");
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      } catch (error) {
        console.error("Failed to update favorites from storage", error);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow text-black dark:text-white w-full">
      <div className="relative">
        <img
          src={profile.CharacterImage}
          alt="캐릭터 이미지"
          className="w-24 h-24 object-cover rounded border border-gray-300 dark:border-gray-600 mx-auto mb-4"
        />
        <button
          onClick={toggleFavorite}
          className="absolute top-0 right-0 text-2xl mr-1 mt-1 cursor-pointer focus:outline-none"
        >
          <span className={isFavorite ? "text-yellow-400" : "text-gray-300"}>★</span>
        </button>
      </div>

      <div className="text-center space-y-1">
        <div className="text-xl font-bold">{profile.CharacterName}</div>
        <div className="text-sm text-gray-700 dark:text-gray-300">
          {profile.ServerName} | {profile.CharacterClassName}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          원정대 Lv.{profile.ExpeditionLevel} | 전투 Lv.{profile.CharacterLevel} | 아이템 Lv.{profile.ItemAvgLevel}
        </div>
      </div>
    </div>
  );
}
