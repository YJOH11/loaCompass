import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BoardWrite = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    content: '',
    author: '', // 작성자도 포함하고 있다면
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/boards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert('게시글이 등록되었습니다.');
        navigate('/boards');
      } else {
        alert('등록 실패');
      }
    } catch (error) {
      console.error('글 등록 중 오류 발생:', error);
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">게시글 작성</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="제목"
          className="border border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-2 py-1 w-full"
          required
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="내용"
          className="border border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-2 py-1 w-full"
          required
        />
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="작성자"
          className="border border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-2 py-1 w-full"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          등록하기
        </button>
      </form>
    </div>
  );
};

export default BoardWrite;
