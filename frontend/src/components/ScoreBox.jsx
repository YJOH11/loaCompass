export default function ScoreBox({ profile }) {
    // 점수 계산 로직 미구현 상태: 예시용 더미 점수
    const dummyScore = profile?.CharacterLevel
      ? (profile.CharacterLevel * 10).toFixed(0)
      : "???";
  
    return (
      <div className="bg-gray-800 rounded-xl p-4 flex flex-col justify-center items-center shadow-md">
        <h2 className="text-lg font-bold text-yellow-300 mb-2"> 캐릭터 점수</h2>
        <div className="text-4xl font-extrabold text-white">{dummyScore}</div>
        <div className="text-sm text-gray-400 mt-1">(추후 계산 예정)</div>
      </div>
    );
  }
  