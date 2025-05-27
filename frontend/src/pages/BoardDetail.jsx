import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [board, setBoard] = useState(null);
  const [liked, setLiked] = useState(false);

  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/api/boards/${id}`)
      .then(res => {
        setBoard(res.data);
        setLiked(res.data.liked);
      })
      .catch(err => console.error(err));
  }, [id]);

  const fetchComments = () => {
    axios.get(`http://localhost:8080/api/comments/board/${id}`)
      .then(res => setComments(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const toggleLike = () => {
    axios.post(`http://localhost:8080/api/boards/${id}/like`)
      .then(res => setLiked(res.data.liked))
      .catch(err => console.error(err));
  };

  const handleDelete = () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      axios.delete(`http://localhost:8080/api/boards/${id}`)
        .then(() => navigate('/boards'))
        .catch(err => console.error(err));
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim() === '') return alert('댓글 내용을 입력하세요.');

    axios.post(`http://localhost:8080/api/comments`, {
      content: commentInput,
      boardId: id
    })
      .then(() => {
        setCommentInput('');
        fetchComments();
      })
      .catch(err => console.error(err));
  };

  const toggleCommentLike = (commentId) => {
    axios.post(`http://localhost:8080/api/comments/${commentId}/like`)
      .then(() => fetchComments())
      .catch(err => console.error(err));
  };

  const handleCommentDelete = (commentId) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      axios.delete(`http://localhost:8080/api/comments/${commentId}`)
        .then(() => fetchComments())
        .catch(err => console.error(err));
    }
  };

  const startEditing = (comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  const saveEditing = (commentId) => {
    if (editingContent.trim() === '') return alert('댓글 내용을 입력하세요.');

    axios.put(`http://localhost:8080/api/comments/${commentId}`, {
      content: editingContent
    })
      .then(() => {
        setEditingCommentId(null);
        setEditingContent('');
        fetchComments();
      })
      .catch(err => console.error(err));
  };

  if (!board) return <div>로딩중...</div>;

  return (
    <div style={{ maxWidth: 700, margin: '20px auto', fontFamily: 'Arial, sans-serif', padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2 style={{ borderBottom: '2px solid #333', paddingBottom: 10 }}>📋 {board.title}</h2>
      <p style={{ whiteSpace: 'pre-wrap', fontSize: 16, lineHeight: 1.6 }}>{board.content}</p>

      <div style={{ marginTop: 20 }}>
        <button onClick={toggleLike} style={{
          backgroundColor: liked ? '#e0245e' : '#eee',
          color: liked ? '#fff' : '#333',
          border: 'none',
          padding: '8px 15px',
          borderRadius: 5,
          cursor: 'pointer',
          marginRight: 10,
          fontWeight: 'bold',
          fontSize: 16,
        }}>
          {liked ? '❤️ 좋아요 취소' : '🤍 좋아요'}
        </button>

        <button onClick={() => navigate(`/boards/${id}/edit`)} style={{
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          padding: '8px 15px',
          borderRadius: 5,
          cursor: 'pointer',
          marginRight: 10,
          fontWeight: 'bold',
          fontSize: 16,
        }}>
          ✍️ 수정
        </button>

        <button onClick={handleDelete} style={{
          backgroundColor: '#dc3545',
          color: '#fff',
          border: 'none',
          padding: '8px 15px',
          borderRadius: 5,
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: 16,
        }}>
          🗑️ 삭제
        </button>
      </div>

      <hr style={{ margin: '30px 0' }} />

      <div>
        <h3>💬 댓글</h3>

        <form onSubmit={handleCommentSubmit} style={{ marginBottom: 20 }}>
          <textarea
            value={commentInput}
            onChange={e => setCommentInput(e.target.value)}
            placeholder="댓글을 입력하세요..."
            rows={3}
            style={{ width: '100%', padding: 10, fontSize: 14, borderRadius: 5, border: '1px solid #ccc' }}
          />
          <button type="submit" style={{
            marginTop: 8,
            padding: '8px 15px',
            fontWeight: 'bold',
            backgroundColor: '#28a745',
            border: 'none',
            color: 'white',
            borderRadius: 5,
            cursor: 'pointer'
          }}>
            댓글 등록
          </button>
        </form>

        {comments.length === 0 && <p>댓글이 없습니다.</p>}

        {comments.map(comment => (
          <div key={comment.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
            {editingCommentId === comment.id ? (
              <>
                <textarea
                  value={editingContent}
                  onChange={e => setEditingContent(e.target.value)}
                  rows={3}
                  style={{ width: '100%', padding: 10, fontSize: 14, borderRadius: 5, border: '1px solid #ccc' }}
                />
                <div style={{ marginTop: 6 }}>
                  <button onClick={() => saveEditing(comment.id)} style={{
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: 5,
                    cursor: 'pointer',
                    marginRight: 10,
                    fontWeight: 'bold',
                  }}>
                    저장
                  </button>
                  <button onClick={cancelEditing} style={{
                    backgroundColor: '#6c757d',
                    color: '#fff',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: 5,
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}>
                    취소
                  </button>
                </div>
              </>
            ) : (
              <>
                <p style={{ whiteSpace: 'pre-wrap', fontSize: 14, lineHeight: 1.4 }}>{comment.content}</p>
                <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>
                  <span style={{ marginRight: 10 }}>작성자: {comment.author}</span>
                  <span style={{ marginRight: 10 }}>
                    작성일: {comment.createdAt
                      ? new Date(comment.createdAt).toLocaleString()
                      : '작성일 없음'}
                  </span>
                </div>
                <div style={{ marginTop: 6 }}>
                  <button onClick={() => toggleCommentLike(comment.id)} style={{
                    backgroundColor: comment.liked ? '#e0245e' : '#eee',
                    color: comment.liked ? '#fff' : '#333',
                    border: 'none',
                    padding: '4px 10px',
                    borderRadius: 5,
                    cursor: 'pointer',
                    marginRight: 10,
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                    {comment.liked ? '❤️ 좋아요 취소' : '🤍 좋아요'}
                  </button>

                  <button onClick={() => startEditing(comment)} style={{
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    padding: '4px 10px',
                    borderRadius: 5,
                    cursor: 'pointer',
                    marginRight: 10,
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                    ✍️ 수정
                  </button>

                  <button onClick={() => handleCommentDelete(comment.id)} style={{
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    padding: '4px 10px',
                    borderRadius: 5,
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                    🗑️ 삭제
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardDetail;

