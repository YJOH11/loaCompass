export default function EquipmentCard({ item }) {
    return (
        <div className="bg-gray-700 rounded p-4 mb-2">
            {item.Icon && (
                <img
                    src={item.Icon}
                    alt={item.name || "장비"}
                    className="w-12 h-12 mb-2"
                />
            )}
            <div className="font-semibold">{item.Name || "이름 없음"}</div>
            <div className="text-sm text-gray-300">
                {item.Type || "타입 없음"} | {item.Grade || "등급 없음"}
            </div>
            <div className="text-sm">
                {item.refinementLevel !== null ? `+${item.refinementLevel}` : ""} | 품질: {item.quality ?? 0}
            </div>

            {/* 기본 효과 */}
            {item.basicEffect && (
                <div className="text-sm text-blue-300 whitespace-pre-line mt-1">
                     기본 효과: {item.basicEffect}
                </div>
            )}

            {/* 연마 효과 */}
            {item.refinementEffect && (
                <div className="text-sm text-green-300 whitespace-pre-line mt-1">
                     연마 효과: {item.refinementEffect}
                </div>
            )}

            {/* 아크 패시브 (악세서리 전용) */}
            {item.arcPassiveEffect && (
            <div className="text-sm text-purple-300 mt-1">
                🌀 아크 패시브: {item.arcPassiveEffect}
            </div>
            )}

            {/* 추가 효과 (장비 전용) */}
            {item.additionalEffect && (
            <div className="text-sm text-indigo-300 mt-1">
                💠 추가 효과: {item.additionalEffect}
            </div>
            )}

            {/* 엘릭서 옵션 */}
            {item.elixirOptions?.length > 0 ? (
                <ul className="text-sm text-emerald-300 list-disc ml-4">
                    {item.elixirOptions.map((opt, i) => (
                        <li key={i}>{opt.level}레벨 {opt.name}</li>
                    ))}
                </ul>
            ) : (
                <div className="text-sm text-gray-400">엘릭서 미적용</div>
            )}

            {/* 엘릭서 이름 + 효과 */}
            {item.elixirName && (
                <div className="text-sm text-emerald-300">엘릭서: {item.elixirName}</div>
            )}
            {item.elixirEffects?.length > 0 && (
                <ul className="text-sm text-emerald-200 list-disc ml-4">
                    {item.elixirEffects.map((effect, i) => (
                        <li key={i}>{effect}</li>
                    ))}
                </ul>
            )}

            {/* 획득처 */}
            {item.acquisitionInfo && (
                <div className="text-sm text-yellow-200 whitespace-pre-line mt-2">
                    획득처: {item.acquisitionInfo}
                </div>
            )}
        </div>
    );
}
