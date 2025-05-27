import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BoardList = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/boards')
      .then(res => res.json())
      .then(data => setBoards(data))
      .catch(err => console.error('게시글 목록 불러오기 실패:', err));
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime())
      ? '유효하지 않음'
      : new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
      }).format(date);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">📋 게시판</h1>
        <Link to="/boards/write">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            ✍️ 글쓰기
          </button>
        </Link>
      </div>

      {boards.map(board => (
        <div key={board.id} className="border-b pb-4 mb-4">
          <Link to={`/boards/${board.id}`}>
            <h2 className="text-xl font-semibold hover:underline">👉 {board.title}</h2>
          </Link>
          <p className="text-gray-700 mt-2">{board.content?.slice(0, 100)}...</p>
          <div className="text-sm text-gray-500 mt-1">
            작성자: {board.author} | 작성일: {formatDate(board.createdAt)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoardList;
