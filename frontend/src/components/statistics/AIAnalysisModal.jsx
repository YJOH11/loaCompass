export default function AIAnalysisModal({ visible, onClose, items = [], onDetailClick }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg">
        {/* 헤더 */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h3 className="text-lg font-semibold text-gray-800">🧠 AI 분석 요약</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">×</button>
        </div>

        {/* 본문 */}
        <div className="p-4 space-y-2 text-sm text-gray-800">
          {items.length === 0 ? (
            <p className="text-gray-400">분석 데이터를 불러오는 중...</p>
          ) : (
            items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span>•</span>
                <span>{item}</span>
              </div>
            ))
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="px-4 py-3 border-t text-right">
          <button
            onClick={onDetailClick}
            className="text-blue-600 hover:underline text-sm"
          >
            자세히 보기 →
          </button>
        </div>
      </div>
    </div>
  );
}
