export default function CharacterProfileCard({ profile }) {
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
      </div>
    </div>
  );
}
