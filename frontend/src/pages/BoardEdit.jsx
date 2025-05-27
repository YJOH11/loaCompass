import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BoardEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/boards/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('게시글을 불러오는 데 실패했습니다.');
        return res.json();
      })
      .then(data => {
        setForm({
          title: data.title,
          content: data.content,
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        alert('게시글을 불러오는 데 실패했습니다.');
        navigate('/boards');
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 인증 토큰 가져오기 (필요하면)
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:8080/api/boards/${id}`, {
        method: 'PUT', // 혹은 백엔드에서 지정한 메서드로 변경
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }), // 토큰 있으면 헤더에 추가
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert('게시글이 수정되었습니다.');
        navigate(`/boards/${id}`);
      } else {
        const errorText = await response.text();
        console.error('수정 실패 응답:', errorText);
        alert('수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('수정 중 오류 발생:', error);
      alert('오류가 발생했습니다.');
    }
  };

  if (loading) return <div className="p-4 text-center">로딩 중...</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded shadow-md mt-8"
    >
      <h2 className="text-2xl font-bold mb-6">게시글 수정</h2>
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="제목"
        className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="내용"
        className="w-full border border-gray-300 rounded p-2 h-40 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          수정 완료
        </button>
        <button
          type="button"
          onClick={() => navigate('/boards')}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
        >
          취소
        </button>
      </div>
    </form>
  );
};

export default BoardEdit;


