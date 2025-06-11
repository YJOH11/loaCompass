import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BoardList = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/boards`)
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
    <div className="min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">자유게시판</h1>
              <Link to="/boards/write">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
                  글쓰기
                </button>
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">

              <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider w-16">번호</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">제목</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider w-32">글쓴이</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider w-40">등록일</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider w-20">추천</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider w-20">조회</th>
              </tr>
              </thead>

              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {boards.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-300">
                      게시글이 없습니다.
                    </td>
                  </tr>
              ) : (
                  boards.map((board, index) => (
                      <tr key={board.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-center">
                          {boards.length - index}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <Link to={`/boards/${board.id}`} className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
                            {board.title}
                          </Link>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-center">
                          {board.author || '익명'}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-center">
                          {formatDate(board.createdAt)}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-center">
                          {board.likes ?? 0}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-center">
                          {board.views ?? 0}
                        </td>
                      </tr>
                  ))
              )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardList;
