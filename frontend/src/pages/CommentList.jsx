import { useEffect, useState } from "react";
import axios from "axios";

const CommentList = ({ boardId }) => {
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/boards/${boardId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error("댓글 불러오기 실패:", error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`http://localhost:8080/api/boards/${boardId}/comments/${commentId}`);
      fetchComments();
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  const startEdit = (comment) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const submitEdit = async () => {
    try {
      await axios.put(`http://localhost:8080/api/boards/${boardId}/comments/${editingId}`, {
        content: editContent,
      });
      setEditingId(null);
      setEditContent("");
      fetchComments();
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
  };

  const handleLike = async (commentId) => {
    try {
      await axios.post(`http://localhost:8080/api/boards/${boardId}/comments/${commentId}/like`);
      fetchComments();
    } catch (error) {
      console.error("좋아요 실패:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [boardId]);

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id} className="border-b py-2">
          {editingId === comment.id ? (
            <>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-1 border"
              />
              <button onClick={submitEdit} className="mr-2">저장</button>
              <button onClick={() => setEditingId(null)}>취소</button>
            </>
          ) : (
            <>
              <p>{comment.content}</p>
              <div className="flex gap-2">
                <button onClick={() => startEdit(comment)}>수정</button>
                <button onClick={() => handleDelete(comment.id)}>삭제</button>
                <button onClick={() => handleLike(comment.id)}>
                  ❤️ {comment.likeCount || 0}
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;



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
                href={`http://localhost:8080/api/comments/${comment.id}/file`}
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
              {comment.liked ? '❤️' : '🤍'}
            </button>
            <button onClick={() => deleteComment(comment.id)} className="text-red-500">
              🗑️ 삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;


