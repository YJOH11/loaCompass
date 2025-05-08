export default function CharacterProfileCard({ profile }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow text-black dark:text-white w-full">
      <div className="flex items-center gap-4">
        <img
          src={profile.CharacterImage}
          alt="캐릭터 이미지"
          className="w-24 h-24 object-cover rounded border border-gray-300 dark:border-gray-600"
        />
        <div className="flex-1 space-y-1">
          <div className="text-xl font-bold">{profile.CharacterName}</div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            {profile.ServerName} | {profile.CharacterClassName}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            원정대 Lv.{profile.ExpeditionLevel} | 전투 Lv.{profile.CharacterLevel} | 아이템 Lv.{profile.ItemAvgLevel}
          </div>
        </div>
      </div>
    </div>
  );
}