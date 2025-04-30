import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SassagaeCrawler() {
    const [keyword, setKeyword] = useState("");
    const [searchType, setSearchType] = useState("subject"); // subject(제목만) 또는 content(제목+본문)
    const [maxConcurrent, setMaxConcurrent] = useState(5);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!keyword.trim()) {
            setError("검색어를 입력해주세요");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `http://localhost:5000/api/search`, {
                    params: {
                        keyword,
                        searchType,
                        maxConcurrent
                    }
                }
            );

            if (response.data) {
                setResults(response.data);
            }
        } catch (error) {
            console.error("크롤링 중 오류 발생:", error);
            setError("데이터를 가져오는 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    // 서버명 추출 (제목 내 대괄호 안의 텍스트)
    const extractServer = (title) => {
        const match = title.match(/\[(.*?)\]/);
        return match ? match[1] : "기타";
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="flex items-center mb-8">
                <button 
                    onClick={goBack}
                    className="mr-4 p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
                >
                    &larr; 뒤로
                </button>
                <h1 className="text-3xl font-bold">사사게 검색기</h1>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">검색어</label>
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="검색어를 입력하세요"
                            className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-2">검색 범위</label>
                        <div className="flex gap-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    value="subject"
                                    checked={searchType === "subject"}
                                    onChange={() => setSearchType("subject")}
                                    className="mr-2"
                                />
                                제목만
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    value="content"
                                    checked={searchType === "content"}
                                    onChange={() => setSearchType("content")}
                                    className="mr-2"
                                />
                                제목+본문
                            </label>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-2">동시 요청 수 (1~20)</label>
                        <input
                            type="number"
                            min="1"
                            max="20"
                            value={maxConcurrent}
                            onChange={(e) => setMaxConcurrent(Math.max(1, Math.min(20, parseInt(e.target.value || "5"))))}
                            className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
                
                <button
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="w-full p-2 mt-4 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-70"
                >
                    {isLoading ? "검색 중..." : "검색하기"}
                </button>
                
                {error && (
                    <p className="mt-2 text-red-400">{error}</p>
                )}
            </div>

            {isLoading && (
                <div className="bg-gray-800 rounded-lg p-6 mb-8 text-center">
                    <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-white transition duration-150 ease-in-out bg-blue-600 rounded-md shadow cursor-wait">
                        <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        검색 중입니다. 잠시만 기다려 주세요...
                    </div>
                </div>
            )}

            {results.length > 0 ? (
                <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <div className="p-4 bg-gray-700 border-b border-gray-600">
                        <h3 className="font-semibold">검색결과: {results.length}건</h3>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="p-3 text-left">제목</th>
                                <th className="p-3 text-left">서버</th>
                                <th className="p-3 text-left">작성자</th>
                                <th className="p-3 text-left">날짜</th>
                                <th className="p-3 text-left">조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((post, index) => (
                                <tr key={index} className="border-t border-gray-700 hover:bg-gray-700">
                                    <td className="p-3">
                                        <a 
                                            href={post.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:underline"
                                        >
                                            {post.title}
                                        </a>
                                    </td>
                                    <td className="p-3">{post.server || extractServer(post.title)}</td>
                                    <td className="p-3">{post.author}</td>
                                    <td className="p-3">{post.date}</td>
                                    <td className="p-3">{post.views}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                !isLoading && (
                    <div className="bg-gray-800 rounded-lg p-8 text-center text-gray-400">
                        검색 결과가 표시됩니다.
                    </div>
                )
            )}
        </div>
    );
} 