export default function CharacterProfileCard({ profile, onFavoriteToggle, favorites }) {
    const isFavorite = Array.isArray(favorites) && favorites.some((n) =>
        n.toLowerCase().trim() === profile.CharacterName.toLowerCase().trim()
    );


    const toggleFavorite = (e) => {
        e?.stopPropagation?.();
        if (onFavoriteToggle) {
            onFavoriteToggle(profile.CharacterName, !isFavorite);
        }
    };



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

CharacterProfileCard.defaultProps = {
  favorites: [],
};
