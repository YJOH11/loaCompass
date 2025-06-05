import React, { useState } from 'react';
import axios from 'axios';

const ClearSubmitForm = () => {
  const [boss, setBoss] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [clearTime, setClearTime] = useState('');
  const [party1, setParty1] = useState([{ job: '', level: '' }]);
  const [party2, setParty2] = useState([{ job: '', level: '' }]);
  const [screenshot, setScreenshot] = useState(null);

  const handlePartyChange = (partySetter, party, index, field, value) => {
    const updated = [...party];
    updated[index][field] = value;
    partySetter(updated);
  };

  const addPartyMember = (partySetter, party) => {
    if (party.length < 4) {
      partySetter([...party, { job: '', level: '' }]);
    } else {
      alert("각 파티는 최대 4명까지만 입력 가능합니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('boss', boss);
    form.append('difficulty', difficulty);
    form.append('clearTime', clearTime);
    form.append('screenshot', screenshot);

    party1.forEach((p, i) => {
      form.append(`party1[${i}][job]`, p.job);
      form.append(`party1[${i}][level]`, p.level);
    });
    party2.forEach((p, i) => {
      form.append(`party2[${i}][job]`, p.job);
      form.append(`party2[${i}][level]`, p.level);
    });

    try {
      await axios.post('/api/clear-records', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('제출 완료!');
    } catch (err) {
      alert('제출 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold">레이드 클리어 인증</h2>

      {/* 레이드 관문 선택 */}
      <div>
        <label className="block mb-1 font-semibold">레이드 관문 선택</label>
        <select
          value={boss}
          onChange={e => setBoss(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 w-full"
        >
          <option value="">선택</option>

          <optgroup label="서막 - 에키드나">
            <option value="에키드나 1관문">에키드나 1관문</option>
            <option value="에키드나 2관문">에키드나 2관문</option>
          </optgroup>

          <optgroup label="1막 - 에기르">
            <option value="에기르 1관문">에기르 1관문</option>
            <option value="에기르 2관문">에기르 2관문</option>
          </optgroup>

          <optgroup label="2막 - 아브렐슈드">
            <option value="아브렐슈드 1관문">아브렐슈드 1관문</option>
            <option value="아브렐슈드 2관문">아브렐슈드 2관문</option>
          </optgroup>

          <optgroup label="3막 - 모르둠">
            <option value="모르둠 1관문">모르둠 1관문</option>
            <option value="모르둠 2관문">모르둠 2관문</option>
            <option value="모르둠 3관문">모르둠 3관문</option>
          </optgroup>
        </select>
      </div>

      {/* 난이도 선택 */}
      <div>
        <label className="block mb-1 font-semibold">난이도 선택</label>
        <select
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 w-full"
        >
          <option value="">선택</option>
          <option value="노말">노말</option>
          <option value="하드">하드</option>
        </select>
      </div>

      {/* 클리어 타임 */}
      <div>
        <label className="block mb-1 font-semibold">클리어 타임 (예: 08:41)</label>
        <input
          type="text"
          value={clearTime}
          onChange={e => setClearTime(e.target.value)}
          placeholder="예: 08:41"
          className="border border-gray-300 rounded px-2 py-1 w-full"
        />
      </div>

      {/* 1파티 */}
      <div>
        <h4 className="font-semibold mt-4 mb-1">1파티</h4>
        {party1.map((member, idx) => (
          <div key={`p1-${idx}`} className="flex space-x-2 mb-2">
            <input
              type="text"
              placeholder="직업"
              value={member.job}
              onChange={e =>
                handlePartyChange(setParty1, party1, idx, 'job', e.target.value)
              }
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
            <input
              type="number"
              placeholder="아이템레벨"
              value={member.level}
              onChange={e =>
                handlePartyChange(setParty1, party1, idx, 'level', e.target.value)
              }
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => addPartyMember(setParty1, party1)}
          className="text-sm text-blue-500 hover:underline"
        >
          + 1파티원 추가
        </button>
      </div>

      {/* 2파티 */}
      <div>
        <h4 className="font-semibold mt-4 mb-1">2파티</h4>
        {party2.map((member, idx) => (
          <div key={`p2-${idx}`} className="flex space-x-2 mb-2">
            <input
              type="text"
              placeholder="직업"
              value={member.job}
              onChange={e =>
                handlePartyChange(setParty2, party2, idx, 'job', e.target.value)
              }
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
            <input
              type="number"
              placeholder="아이템레벨"
              value={member.level}
              onChange={e =>
                handlePartyChange(setParty2, party2, idx, 'level', e.target.value)
              }
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => addPartyMember(setParty2, party2)}
          className="text-sm text-blue-500 hover:underline"
        >
          + 2파티원 추가
        </button>
      </div>

      {/* 인증 스크린샷 */}
      <div>
        <label className="block mb-1 font-semibold">인증 스크린샷</label>
        <input
          type="file"
          accept="image/*"
          onChange={e => setScreenshot(e.target.files[0])}
        />
      </div>

      {/* 제출 버튼 */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        제출
      </button>
    </form>
  );
};

export default ClearSubmitForm;
