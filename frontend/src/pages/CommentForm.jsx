import { useState } from "react";
import axios from "axios";

const CommentForm = ({ boardId, onCommentSaved }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await axios.post(`http://localhost:8080/api/boards/${boardId}/comments`, {
        content,
        author: "익명", // 임시로 고정. 로그인 기능 붙이면 수정
      });
      setContent("");
      onCommentSaved(); // 댓글 새로고침
    } catch (error) {
      console.error("댓글 등록 실패:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <textarea
        className="w-full p-2 border rounded"
        rows="3"
        placeholder="댓글을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit" className="px-4 py-1 bg-blue-500 text-white rounded">
        등록
      </button>
    </form>
  );
};

export default CommentForm;

