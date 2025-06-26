import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SassagaeCrawler() {
    const [keyword, setKeyword] = useState("");
    const [searchType, setSearchType] = useState("subject"); // subject(제목만) 또는 content(제목+본문)
    const [maxConcurrent, setMaxConcurrent] = useState(10);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!keyword || keyword.trim() === '') {
            alert('검색어를 입력하세요.');
            setHasSearched(true);
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

    // 서버명 추출 (제목 내 대괄호 안의 텍스트)
    const extractServer = (title) => {
        const match = title.match(/\[(.*?)\]/);
        return match ? match[1] : "기타";
    };

    const [hasSearched, setHasSearched] = useState(false);


    return (
        <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white flex flex-col items-center justify-start py-16">
            <div className="w-full max-w-3xl px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">사건/사고 게시판</h1>
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-xl shadow-sm mb-8 max-w-2xl mx-auto">
                        <div className="flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 dark:text-indigo-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">게시판 안내</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            로스트아크 인벤 사건/사고 게시판의 게시글을 검색할 수 있습니다.<br/>
                            특정 닉네임과 관련된 사건/사고 이력을 확인하실 수 있으며,<br/>
                            제목 검색과 본문 검색을 선택하여 사용하실 수 있습니다.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 max-w-xl mx-auto">
                        <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
                            닉네임을 입력해주세요
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            정확한 검색을 위해 닉네임을 올바르게 입력해주세요
                        </p>
                    </div>
                </div>

                <div className="mb-10">
                    <div className="relative">
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            placeholder="검색어를 입력해주세요"
                            className="w-full p-4 pl-5 pr-12 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white border-2 border-gray-300 dark:border-gray-700 focus:outline-none focus:border-blue-500 text-center text-lg"
                        />
                        <button
                            onClick={handleSearch}
                            disabled={isLoading}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>

                    <div className="mt-8 flex flex-col space-y-4">
                        <div className="flex justify-center space-x-2">
                            <label className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-sm border border-gray-300 dark:border-gray-700">
                                <input
                                    type="radio"
                                    value="subject"
                                    checked={searchType === "subject"}
                                    onChange={() => setSearchType("subject")}
                                    className="mr-2"
                                />
                                제목만
                            </label>
                            <label className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-sm border border-gray-300 dark:border-gray-700">
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
                </div>

                {error && (
                    <div className="text-center text-red-500 dark:text-red-400 mb-4">{error}</div>
                )}

                {isLoading && (
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center px-4 py-2 text-black dark:text-white">
                            <svg className="w-5 h-5 mr-3 animate-spin text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            검색중 입니다. 잠시만 기다려주세요
                        </div>
                    </div>
                )}

                {results.length > 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <div className="p-4 bg-gray-200 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
                            <h3 className="font-semibold text-black dark:text-white">검색결과: {results.length}건</h3>
                        </div>
                        
                        <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {results.map((post, index) => (
                                    <div key={index} className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                        <a href={post.link} target="_blank" rel="noopener noreferrer" className="block">
                                            <div className="flex items-start p-4">
                                                <div className="flex-shrink-0">
                                                    <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300">
                                                        {post.author ? post.author.charAt(0) : '?'}
                                                    </div>
                                                </div>
                                                <div className="ml-3 flex-1">
                                                    <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1 hover:text-blue-600 dark:hover:text-blue-400">
                                                        {post.title}
                                                    </h3>
                                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                        <span>{post.date}</span>
                                                        <span className="mx-2">•</span>
                                                        <span>조회 {post.views}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-xs flex justify-between text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
                                                <span>{post.server || extractServer(post.title)}</span>
                                                <span>{post.author}</span>
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    !isLoading && hasSearched && (
                        <div className="text-center text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-700 rounded-lg p-12">
                            검색어를 입력하여 결과를 확인하세요
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
