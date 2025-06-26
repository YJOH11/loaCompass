import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [board, setBoard] = useState(null);
  const [liked, setLiked] = useState(false);

  // ✅ 댓글 관련 상태
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');

  // 게시글 불러오기
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/boards/${id}`)
        .then(res => {
          setBoard(res.data);
          setLiked(res.data.liked);
        })
        .catch(err => console.error(err));
  }, [id]);

  // 댓글 불러오기
  const fetchComments = () => {
    axios.get(`/api/comments/board/${id}`)
        .then(res => setComments(res.data))
        .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim() === '') return;

    axios.post('/api/comments', {
      content: commentInput,
      boardId: id,
    })
        .then(() => {
          setCommentInput('');
          fetchComments();
        })
        .catch(err => console.error(err));
  };

  if (!board) return <div className="text-center mt-10">로딩중...</div>;

  return (
      <div className="max-w-3xl mx-auto mt-10">
        <div className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          자유게시판
        </div>

        {/* 게시글 박스 */}
        <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded">
          <h2 className="text-2xl font-bold border-b pb-2 mb-3">{board.title}</h2>

          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex justify-between">
            <div>작성자: <span className="font-semibold">{board.author || '익명'}</span></div>
            <div>
              {board.createdAt ? new Date(board.createdAt).toLocaleString() : '작성일 없음'} | 조회수: {board.views ?? 0}
            </div>
          </div>

          <div className="text-base leading-relaxed whitespace-pre-wrap mb-8">
            {board.content}
          </div>

          <div className="space-x-2">
            <button
                onClick={() => {
                  axios.post(`/api/boards/${id}/like`)
                      .then(res => setLiked(res.data.liked));
                }}
                className={`px-4 py-2 rounded font-bold text-sm ${
                    liked ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'
                }`}
            >
              {liked ? '추천 취소' : '추천'}
            </button>

            <button
                onClick={() => navigate(`/boards/${id}/edit`)}
                className="px-4 py-2 rounded bg-blue-600 text-white font-bold text-sm"
            >
              수정
            </button>

            <button
                onClick={() => {
                  if (window.confirm('게시글을 삭제하시겠습니까?')) {
                    axios.delete(`/api/boards/${id}`)
                        .then(() => navigate('/boards'));
                  }
                }}
                className="px-4 py-2 rounded bg-red-600 text-white font-bold text-sm"
            >
              삭제
            </button>
          </div>
        </div>

        {/* ✅ 댓글 영역 */}
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded">
          <h3 className="text-lg font-semibold mb-4">댓글</h3>

          {/* 댓글 입력 */}
          <form onSubmit={handleCommentSubmit} className="mb-4">
          <textarea
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
              rows="3"
              placeholder="댓글을 입력하세요..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
          />
            <button
                type="submit"
                className="mt-2 px-4 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700"
            >
              댓글 등록
            </button>
          </form>

          {/* 댓글 목록 */}
          {comments.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">댓글이 없습니다.</p>
          ) : (
              <ul className="space-y-4">
                {comments.map((comment) => (
                    <li key={comment.id} className="border-t pt-2 text-sm text-gray-800 dark:text-gray-200">
                      <div className="mb-1 whitespace-pre-wrap">{comment.content}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        작성자: {comment.author || '익명'} | {new Date(comment.createdAt).toLocaleString()}
                      </div>
                    </li>
                ))}
              </ul>
          )}
        </div>
      </div>
  );
};

export default BoardDetail;
