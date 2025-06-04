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
          year: '2-digit', month: '2-digit', day: '2-digit',
          hour: '2-digit', minute: '2-digit'
        }).format(date);
  };

  return (
      <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">자유게시판</h1>
          <Link to="/boards/write">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              글쓰기
            </button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="w-12 border px-2 py-2 dark:border-gray-600">번호</th>
              <th className="px-4 py-2 border dark:border-gray-600 text-left">제목</th>
              <th className="w-32 border px-2 py-2 dark:border-gray-600">글쓴이</th>
              <th className="w-40 border px-2 py-2 dark:border-gray-600">등록일</th>
              <th className="w-16 border px-2 py-2 dark:border-gray-600">추천</th>
              <th className="w-16 border px-2 py-2 dark:border-gray-600">조회</th>
            </tr>
            </thead>
            <tbody>
            {boards.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500 dark:text-gray-400">
                    게시글이 없습니다.
                  </td>
                </tr>
            ) : (
                boards.map((board, index) => (
                    <tr key={board.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="border px-2 py-2 text-center dark:border-gray-600">
                        {boards.length - index}
                      </td>
                      <td className="border px-4 py-2 dark:border-gray-600 whitespace-normal break-words">
                        <Link to={`/boards/${board.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                          {board.title}
                        </Link>
                      </td>
                      <td className="border px-2 py-2 text-center dark:border-gray-600">{board.author || '익명'}</td>
                      <td className="border px-2 py-2 text-center dark:border-gray-600">{formatDate(board.createdAt)}</td>
                      <td className="border px-2 py-2 text-center dark:border-gray-600">{board.likes ?? 0}</td>
                      <td className="border px-2 py-2 text-center dark:border-gray-600">{board.views ?? 0}</td>
                    </tr>
                ))
            )}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default BoardList;
