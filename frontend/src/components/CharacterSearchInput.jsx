// components/CharacterSearchInput.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CharacterSearchInput() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim() !== "") {
            navigate(`/character/${encodeURIComponent(keyword.trim())}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full">
            <input
                type="text"
                placeholder="검색할 캐릭터명을 입력하세요..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full py-2 pl-4 pr-10 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
                🔍
            </button>
        </form>
    );
}