import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TopPlayerCard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/statistics/top-player')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">최고 점수 유저</h3>
      <div className="text-sm">
        <div><b>닉네임:</b> {data.characterName}</div>
        <div><b>아이템 레벨:</b> {data.itemLevel}</div>
        <div><b>직업:</b> {data.characterClass}</div>
        <div><b>서버:</b> {data.serverName}</div>
      </div>
    </div>
  );
}
