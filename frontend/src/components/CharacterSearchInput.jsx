import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function CharacterSearchInput({ favorites = [], setFavorites, onFavoriteToggle }) {
    const [keyword, setKeyword] = useState("");
    const [history, setHistory] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const wrapperRef = useRef();

    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
        setHistory(savedHistory);
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleSearch = (e) => {
        e.preventDefault();
        const trimmed = keyword.trim();
        if (trimmed !== "") {
            saveSearchHistory(trimmed);
            navigate(`/character/${encodeURIComponent(trimmed)}`);
            setShowDropdown(false);
        }
    };

    const saveSearchHistory = (term) => {
        let updated = history.filter((h) => h !== term);
        updated.unshift(term);
        if (updated.length > 10) updated = updated.slice(0, 10);
        localStorage.setItem("searchHistory", JSON.stringify(updated));
        setHistory(updated);
    };

    const handleSelect = (term) => {
        setKeyword(term);
        navigate(`/character/${encodeURIComponent(term)}`);
        setShowDropdown(false);
    };

    const handleRemove = (term) => {
        // 검색 기록 제거
        const updatedHistory = history.filter((h) => h !== term);
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
        setHistory(updatedHistory);

        // 즐겨찾기에 포함돼 있다면 같이 제거
        if (favorites.includes(term)) {
            if (typeof onFavoriteToggle === "function") {
                onFavoriteToggle(term, false); // 즐겨찾기 해제
            }
        }
    };



    const toggleFavorite = (term, e) => {
        e.stopPropagation();
        if (typeof onFavoriteToggle === "function") {
            const willFavorite = !favorites.includes(term);
            onFavoriteToggle(term, willFavorite);
        }
    };


    const sortedHistory = [
        ...favorites,
        ...history.filter((term) => !favorites.includes(term)),
    ];

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <form onSubmit={handleSearch} className="relative w-full">
                <input
                    type="text"
                    placeholder="캐릭터명을 입력하세요"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onFocus={() => setShowDropdown(true)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault(); // ✅ 중복 방지
                            handleSearch(e);
                        }
                    }}
                    className="w-full py-2 pl-4 pr-24 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 rounded-md transition"
                >
                    검색
                </button>
            </form>




            {showDropdown && sortedHistory.length > 0 && (
                <div className="absolute top-full mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow z-20">

                    {/* 상단: 검색기록 + 전체삭제 같은 줄 */}
                    <div className="flex justify-between items-center px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-b">
                        <span className="font-semibold">검색 기록</span>
                        <button
                            onClick={() => {
                                localStorage.removeItem("searchHistory");
                                setHistory([]);
                            }}
                            className="hover:text-red-500"
                        >
                            전체삭제
                        </button>
                    </div>

                    {/* 검색기록 리스트 */}
                    {sortedHistory.map((term) => (
                        <div
                            key={term}
                            className="group flex justify-between items-center px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <div
                                className="flex items-center gap-2 cursor-pointer w-full"
                                onClick={() => handleSelect(term)} // ✅ 줄 클릭 여기에만
                            >
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation(); // ✅ 줄 클릭 막음
                                        toggleFavorite(term, e);
                                    }}
                                    className={favorites.includes(term)
                                        ? "text-yellow-400 hover:text-yellow-500"
                                        : "text-gray-400 hover:text-yellow-400"}
                                >
                                    {favorites.includes(term) ? "★" : "☆"}
                                </button>
                                <span>{term}</span>
                            </div>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(term);
                                }}
                                className="text-gray-400 hover:text-red-400 ml-2"
                            >
                                ×
                            </button>


                        </div>
                    ))}


                </div>
            )}
        </div>
    );
}
