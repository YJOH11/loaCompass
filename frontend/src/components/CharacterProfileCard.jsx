export default function CharacterProfileCard({ profile }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow text-black dark:text-white w-full flex flex-col items-center text-center">
      <img
        src={profile.CharacterImage}
        alt="캐릭터 이미지"
        className="w-24 h-24 object-cover rounded border border-gray-300 dark:border-gray-600 mb-3"
      />
      <div className="space-y-1">
        <div className="text-xl font-bold">{profile.CharacterName}</div>
        <div className="text-sm text-gray-700 dark:text-gray-300">
          {profile.ServerName} | {profile.CharacterClassName}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          원정대 Lv.{profile.ExpeditionLevel} | 전투 Lv.{profile.CharacterLevel} | 아이템 Lv.{profile.ItemAvgLevel}
        </div>
        {profile.cards && profile.cards.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-1">💳 카드</h3>
            <div className="flex flex-wrap gap-1">
              {profile.cards.map((card, i) => (
                <span
                  key={i}
                  className="bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded text-xs"
                >
                  {card.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {profile.engravings && profile.engravings.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-1">🔥 각인</h3>
            <div className="flex flex-wrap gap-1">
              {profile.engravings.map((engrave, i) => (
                <span
                  key={i}
                  className="bg-gray-200 dark:bg-gray-700 text-purple-600 dark:text-purple-300 px-2 py-0.5 rounded text-xs"
                >
                  {engrave.name} Lv.{engrave.level}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
