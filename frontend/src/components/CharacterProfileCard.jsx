import { useEffect, useState } from "react";

export default function CharacterProfileCard({ profile }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // 즐겨찾기 상태 확인
    const favorites = localStorage.getItem('favoriteCharacters');
    if (favorites && profile) {
      const parsedFavorites = JSON.parse(favorites);
      const isInFavorites = parsedFavorites.some(
        fav => fav.name === profile.CharacterName && fav.server === profile.Server
      );
      setIsFavorite(isInFavorites);
    }
  }, [profile]);

  const toggleFavorite = () => {
    if (!profile) return;
    
    const favorites = localStorage.getItem('favoriteCharacters');
    let favoriteList = [];
    
    if (favorites) {
      favoriteList = JSON.parse(favorites);
    }
    
    if (isFavorite) {
      // 즐겨찾기 삭제
      favoriteList = favoriteList.filter(
        fav => !(fav.name === profile.CharacterName && fav.server === profile.Server)
      );
      setIsFavorite(false);
    } else {
      // 즐겨찾기 추가
      const characterToAdd = {
        name: profile.CharacterName,
        server: profile.Server,
        class: profile.CharacterClass,
        itemLevel: profile.ItemLevel
      };
      favoriteList.push(characterToAdd);
      setIsFavorite(true);
    }
    
    localStorage.setItem('favoriteCharacters', JSON.stringify(favoriteList));
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow text-black dark:text-white w-full">
      <img
        src={profile.CharacterImage}
        alt="캐릭터 이미지"
        className="w-24 h-24 object-cover rounded border border-gray-300 dark:border-gray-600 mx-auto mb-4"
      />

      <div className="text-center space-y-1">
        <div className="text-xl font-bold">{profile.CharacterName}</div>
        <div className="text-sm text-gray-700 dark:text-gray-300">
          {profile.ServerName} | {profile.CharacterClassName}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          원정대 Lv.{profile.ExpeditionLevel} | 전투 Lv.{profile.CharacterLevel} | 아이템 Lv.{profile.ItemAvgLevel}
        </div>

        {profile.cardSet && (
          <div className="mt-3 text-xs text-green-500 bg-gray-200 dark:bg-gray-700 rounded px-2 py-1">
            <div className="font-semibold">카드</div>
            <div>{profile.cardSet.Name}</div>
            <div className="text-green-300">{profile.cardSet.Description}</div>
          </div>
        )}

        {profile.engravings && profile.engravings.length > 0 && (
          <div className="mt-3 text-xs text-blue-500 bg-gray-100 dark:bg-gray-700 rounded px-2 py-1">
            <div className="font-semibold mb-1">각인</div>
            <ul className="space-y-1">
              {profile.engravings.map((engraving, index) => (
                <li key={index} className="flex justify-between text-sm">
                  <span>{engraving.name}</span>
                  <span className="text-blue-300">{engraving.level}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-3 text-xs text-gray-700 dark:text-gray-300">
          <button 
            onClick={toggleFavorite}
            className={`flex items-center gap-1 px-3 py-1 rounded-md ${
              isFavorite 
                ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
          </button>
        </div>
      </div>
    </div>
  );
}
