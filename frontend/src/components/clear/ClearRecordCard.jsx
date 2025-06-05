import React from 'react';

const ClearRecordCard = ({ record }) => {
  const {
    boss,
    difficulty,
    clearTime,
    createdAt,
    screenshotUrl,
    party1,
    party2
  } = record;

  const renderParty = (party) => (
    <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc ml-4">
      {party.map((m, i) => (
        <li key={i}>{m.job} ({m.level})</li>
      ))}
    </ul>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{boss} ({difficulty})</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">클리어 타임: {clearTime}</p>
      <div className="flex gap-4 text-sm mb-2">
        <div>
          <strong>1파티</strong>
          {renderParty(party1)}
        </div>
        <div>
          <strong>2파티</strong>
          {renderParty(party2)}
        </div>
      </div>
      {screenshotUrl && (
        <img
          src={screenshotUrl}
          alt="인증 스크린샷"
          className="w-full h-auto max-h-60 object-contain rounded"
        />
      )}
      <p className="text-xs text-gray-400 mt-2">제출일: {new Date(createdAt).toLocaleString()}</p>
    </div>
  );
};

export default ClearRecordCard;
