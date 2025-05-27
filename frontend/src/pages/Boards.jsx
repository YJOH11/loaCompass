// src/pages/Boards.jsx
import React, { useEffect, useState } from 'react';

const Boards = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/boards')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('게시글을 불러오는 데 실패했습니다.', err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📋 게시판</h1>
        <a
          href="/boards/write"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ✏️ 글쓰기
        </a>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">작성된 게시글이 없습니다.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="border p-4 rounded-lg shadow mb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-700">{post.content}</p>
            <div className="text-sm text-gray-500 mt-2">
              작성자: {post.author} | 작성일: {new Date(post.createdAt).toLocaleString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Boards;

