import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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

  const saveSearchHistory = (term) => {
    let updated = history.filter(h => h !== term);
    updated.unshift(term);
    if (updated.length > 10) updated = updated.slice(0, 10);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
    setHistory(updated);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = keyword.trim();
    if (!trimmed) return;
    saveSearchHistory(trimmed);
    navigate(`/character/${encodeURIComponent(trimmed)}`);
    setShowDropdown(false);
  };

  const handleSelect = (term) => {
    setKeyword(term);
    navigate(`/character/${encodeURIComponent(term)}`);
    setShowDropdown(false);
  };

  const handleRemove = (term) => {
    const updatedHistory = history.filter(h => h !== term);
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
    ...history.filter(term => !favorites.includes(term)),
  ];

  const openImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setShowModal(true);
    setLoading(true);
    setError("");
    setScoreDataList([]);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const ocrRes = await fetch("/api/ocr", { method: "POST", body: formData });
      if (!ocrRes.ok) throw new Error("OCR API 호출 실패");
      const ocrData = await ocrRes.json();

      // 중복 제거한 닉네임 리스트
      const nicknames = Array.from(new Set(
        ocrData
          .map(d => d.text)
          .filter(t => typeof t === "string" && t.length > 1)
      ));

      if (nicknames.length === 0) {
        setError("OCR에서 닉네임을 찾지 못했습니다.");
        setLoading(false);
        return;
      }

      // 병렬 요청
      const promises = nicknames.map(async (name) => {
        try {
          const res = await fetch(`/api/character/${encodeURIComponent(name)}`);
          if (!res.ok) throw new Error(`캐릭터 조회 실패: ${name}`);
          const data = await res.json();
          if (data?.profile) {
            const gears = data.equipments.filter(i =>
              ["무기", "투구", "상의", "하의", "장갑", "어깨"].includes(i.Type));
            const accessories = data.equipments.filter(i =>
              ["목걸이", "귀걸이", "반지"].includes(i.Type));
            const abilityStone = data.equipments.find(i => i.Type === "어빌리티 스톤");
            const bracelet = data.equipments.find(i => i.Type === "팔찌");

            return {
              name,
              items: gears,
              accessories,
              abilityStone,
              bracelet,
              engravings: data.profile.engravings || [],
              gems: data.gems,
            };
          }
          return null;
        } catch {
          return null;
        }
      });

      const results = await Promise.all(promises);
      const newScoreDataList = results.filter(Boolean);

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
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch(e);
            }
          }}
          className="w-full py-2 pl-4 pr-32 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          aria-label="캐릭터명 입력"
        />

        {/* 이미지 업로드 버튼 */}
        <div className="absolute right-20 top-1/2 -translate-y-1/2 group">
          <button
            type="button"
            onClick={openImageUpload}
            className="px-2 py-1 text-base text-white bg-indigo-500 hover:bg-indigo-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"            aria-label="이미지 업로드"
          >
            📸
          </button>

          {/* 툴팁 */}
          <div
            style={{ overflow: "visible", zIndex: 9999 }}
            className="absolute left-0 top-full mt-2 w-64 text-xs text-white bg-black bg-opacity-80 p-2 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none select-none transition-opacity z-50"
            role="tooltip"
          >
            이미지를 올리면 닉네임을 자동으로 검색해<br />
            스펙과 사사게 이력을 확인합니다.<br /><br />
            ⚠️ 닉네임 스크린샷을 찍어야 하며<br />
            직업 아이콘이 포함되면 인식에 실패합니다.
          </div>
        </div>

        {/* 숨겨진 파일 업로드 input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
          aria-hidden="true"
        />

        {/* 검색 버튼 */}
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          aria-label="검색"
        >
          검색
        </button>
      </form>

      {/* 검색 기록 드롭다운 */}
      {showDropdown && sortedHistory.length > 0 && (
        <div
          className="absolute top-full mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow z-30 max-h-60 overflow-y-auto"
          role="listbox"
          aria-label="검색 기록"
        >
          <div className="flex justify-between items-center px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-b select-none">
            <span className="font-semibold">검색 기록</span>
            <button
              onClick={() => {
                if (window.confirm("검색 기록을 모두 삭제하시겠습니까?")) {
                  localStorage.removeItem("searchHistory");
                  setHistory([]);
                }
              }}
              className="hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
              aria-label="검색 기록 전체 삭제"
              type="button"
            >
              전체삭제
            </button>
          </div>
          {sortedHistory.map((term) => (
            <div
              key={term}
              className="group flex justify-between items-center px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer select-none"
              role="option"
              tabIndex={0}
              onClick={() => handleSelect(term)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(term);
                }
              }}
            >
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(term, e);
                  }}
                  className={favorites.includes(term)
                    ? "text-yellow-400 hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                    : "text-gray-400 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"}
                  aria-pressed={favorites.includes(term)}
                  aria-label={favorites.includes(term) ? `${term} 즐겨찾기 해제` : `${term} 즐겨찾기`}
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
                className="text-gray-400 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 rounded ml-2"
                aria-label={`${term} 검색 기록 삭제`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* OCR 결과 모달 */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} className="fixed z-50 inset-0 overflow-y-auto" aria-modal="true" role="dialog" aria-labelledby="modal-title">
        <div className="flex items-center justify-center min-h-screen bg-black/50 px-4">
          <Dialog.Panel className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title id="modal-title" className="text-xl font-bold text-indigo-700">
                유저 검색 결과
              </Dialog.Title>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-red-500 text-2xl focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                aria-label="모달 닫기"
              >
                ×
              </button>
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
                    className="border rounded-lg p-4 bg-white dark:bg-gray-800 cursor-pointer hover:bg-indigo-50 dark:hover:bg-gray-700 transition"
                    onClick={() => {
                      setShowModal(false);
                      navigate(`/character/${encodeURIComponent(data.name)}`);
                    }}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setShowModal(false);
                        navigate(`/character/${encodeURIComponent(data.name)}`);
                      }
                    }}
                    role="button"
                    aria-label={`${data.name} 캐릭터 상세보기`}
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
