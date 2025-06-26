import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CharacterScoreFromImage from "../pages/CharacterCapture";
import { Dialog } from "@headlessui/react";
import ScoreRow from '../components/score/ScoreRow';

export default function CharacterSearchInput({ favorites = [], setFavorites, onFavoriteToggle }) {
    const [keyword, setKeyword] = useState("");
    const [history, setHistory] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [scoreDataList, setScoreDataList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const wrapperRef = useRef();
    const fileInputRef = useRef();
    const navigate = useNavigate();

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
    }, []);

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
        const updatedHistory = history.filter((h) => h !== term);
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
        setHistory(updatedHistory);
        if (favorites.includes(term) && typeof onFavoriteToggle === "function") {
            onFavoriteToggle(term, false);
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

    const openImageUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = null; // 같은 파일 다시 선택 가능하도록 초기화
            fileInputRef.current.click();
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setShowModal(true);
        setLoading(true);
        setError('');
        setScoreDataList([]);

        const formData = new FormData();
        formData.append("image", file);

        try {
            const ocrRes = await fetch("/api/ocr", {
                method: "POST",
                body: formData,
            });
            if (!ocrRes.ok) throw new Error("OCR API 호출 실패");
            const ocrData = await ocrRes.json();

            const nicknames = ocrData
                .map((d) => d.text)
                .filter((t) => typeof t === 'string' && t.length > 1);

            if (nicknames.length === 0) {
                setError("OCR에서 닉네임을 찾지 못했습니다.");
                setLoading(false);
                return;
            }

            const newScoreDataList = [];
            for (const name of nicknames) {
                try {
                    const res = await fetch(`/api/character/${encodeURIComponent(name)}`);
                    if (!res.ok) throw new Error(`캐릭터 조회 실패: ${name}`);
                    const data = await res.json();

                    if (data?.profile) {
                        const gears = data.equipments.filter(item =>
                            ["무기", "투구", "상의", "하의", "장갑", "어깨"].includes(item.Type));
                        const accessories = data.equipments.filter(item =>
                            ["목걸이", "귀걸이", "반지"].includes(item.Type));
                        const abilityStone = data.equipments.find(item => item.Type === "어빌리티 스톤");
                        const bracelet = data.equipments.find(item => item.Type === "팔찌");

                        newScoreDataList.push({
                            name,
                            items: gears,
                            accessories,
                            abilityStone,
                            bracelet,
                            engravings: data.profile.engravings || [],
                            gems: data.gems,
                        });
                    }
                } catch (innerErr) {
                    console.warn(innerErr.message);
                }
            }

            if (newScoreDataList.length === 0) {
                setError("유효한 캐릭터 데이터를 찾지 못했습니다.");
            }
            setScoreDataList(newScoreDataList);
        } catch (err) {
            console.error(err);
            setError("OCR 또는 캐릭터 데이터 요청 실패");
        } finally {
            setLoading(false);
        }
    };

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
                            e.preventDefault();
                            handleSearch(e);
                        }
                    }}
                    className="w-full py-2 pl-4 pr-32 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {/* 이미지 업로드 버튼 */}
                <button
                    type="button"
                    onClick={openImageUpload}
                    className="absolute right-20 top-1/2 -translate-y-1/2 px-3 py-1.5 text-sm text-white bg-indigo-400 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-md transition"
                    title="이미지로 검색"
                >
                    이미지
                </button>

                {/* 숨겨진 파일 업로드 input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                />

                {/* 검색 버튼 */}
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 rounded-md transition"
                >
                    검색
                </button>
            </form>

            {/* 검색 기록 드롭다운 */}
            {showDropdown && sortedHistory.length > 0 && (
                <div className="absolute top-full mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow z-20">
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
                    {sortedHistory.map((term) => (
                        <div
                            key={term}
                            className="group flex justify-between items-center px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <div
                                className="flex items-center gap-2 cursor-pointer w-full"
                                onClick={() => handleSelect(term)}
                            >
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
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

            {/* OCR 결과 모달 */}
            <Dialog open={showModal} onClose={() => setShowModal(false)} className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen bg-black/50 px-4">
                    <Dialog.Panel className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 max-w-4xl w-full">
                        <div className="flex justify-between items-center mb-4">
                            <Dialog.Title className="text-xl font-bold text-indigo-700">유저 검색 결과</Dialog.Title>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500 text-2xl">×</button>
                        </div>

                        {loading && <p className="text-indigo-600 text-center animate-pulse">처리 중...</p>}
                        {error && <p className="text-red-600 text-center font-semibold">{error}</p>}

                        {!loading && !error && scoreDataList.length === 0 && (
                            <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
                        )}

                        {scoreDataList.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {scoreDataList.map((data, idx) => (
                                     <div
                                        key={idx}
                                        className="border rounded-lg p-4 bg-white dark:bg-gray-800 cursor-pointer hover:bg-indigo-50 dark:hover:bg-gray-700"
                                        onClick={() =>{
                                             setShowModal(false);  // 모달 닫기
                                             navigate(`/character/${encodeURIComponent(data.name)}`); // 페이지 이동

                                        }}
                                      >
                                        <h3 className="text-lg font-semibold text-indigo-700 mb-2">{data.name}</h3>
                                        <ScoreRow
                                          items={data.items}
                                          accessories={data.accessories}
                                          engravings={data.engravings}
                                          abilityStone={data.abilityStone}
                                          bracelet={data.bracelet}
                                          gems={data.gems}
                                        />
                                      </div>
                                ))}
                            </div>
                        )}
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
}
