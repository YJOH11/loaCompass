import { useEffect, useState } from "react";
import axios from "axios";

const CommentList = ({ boardId }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/boards/${boardId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error("댓글 불러오기 실패:", error);
    }

    const deleteComment = async (commentId) => {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/boards/${boardId}/comments/${commentId}`);
        fetchComments();
      } catch (error) {
        console.error("댓글 삭제 실패:", error);
      }
    };


    const toggleLike = async (commentId) => {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/boards/${boardId}/comments/${commentId}/like`);
        fetchComments();
      } catch (error) {
        console.error("좋아요 실패:", error);
      }
    };

    useEffect(() => {
      fetchComments();
    }, [boardId]);

    return (
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border rounded p-3">
            <p className="whitespace-pre-wrap">{comment.content}</p>

            {comment.fileName && (
              <p>
                📎{' '}
                <a
                  href={`${import.meta.env.VITE_API_URL}/api/comments/${comment.id}/file`}
                  className="text-blue-500 underline"
                  download
                >
                  {comment.fileName}
                </a>

              </p>
            )}

            <div className="text-sm text-gray-500 mt-2">
              작성자: {comment.writer} | 작성일: {comment.createdAt}
            </div>

            <div className="flex gap-3 mt-2">
              <button onClick={() => toggleLike(comment.id)}>
                {comment.liked ? '❤️' : '🤍'} {comment.likeCount || 0}
              </button>
              <button
                onClick={() => deleteComment(comment.id)}
                className="text-red-500"
              >
                🗑️ 삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  export default CommentList;
