export default function AccessoryCard({ item }) {
  if (!item) return null;

  const {
    Type, Name, Icon, Grade, quality,
    basicEffect, refinementEffect, arcPassiveEffect,
    acquisitionInfo, abilityStoneEngravings, additionalEffect
  } = item;

  return (
<div className="bg-white dark:bg-gray-800 p-4 rounded shadow w-full h-[160px] flex flex-col justify-between">

<div className="flex items-start gap-3">
        <img src={Icon} alt={Name} className="w-12 h-12 object-contain" />
        <div>
          <div className="font-semibold text-sm">{Name}</div>
          <div className="text-xs text-gray-400">{Type} | {Grade}</div>
          {quality >= 0 && <div className="text-xs text-gray-500">품질: {quality}</div>}
        </div>
      </div>

      <div className="mt-2 text-xs text-green-500 whitespace-pre-wrap leading-snug">
        {Type === "어빌리티 스톤" && abilityStoneEngravings?.map((e, i) => (
          <div key={i}>• {e}</div>
        ))}

        {Type === "팔찌" && additionalEffect && (
          <div dangerouslySetInnerHTML={{ __html: additionalEffect.replace(/\n/g, "<br />") }} />
        )}

        {["목걸이", "귀걸이", "반지"].includes(Type) && (
          <>
            {basicEffect && <div>• {basicEffect}</div>}
            {refinementEffect && <div>• {refinementEffect}</div>}
            {arcPassiveEffect && <div>• {arcPassiveEffect}</div>}
          </>
        )}
      </div>
    </div>
  );
}
