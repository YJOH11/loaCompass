import { useEffect, useRef, useState } from "react";
import { askGemini } from "@/services/gemini";
import ChatMessage from "@/components/ChatMessage";

export default function ChatMain() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const chatContainerRef = useRef();

    const questionMap = {
        "게임 공략": [
            "레이드 공략 방법",
            "클래스별 스킬 빌드",
            "효율적인 육성 루트",
        ],
        "경제 활동": [
            "골드 파밍 방법",
            "거래소 시세 분석",
            "재화 효율적 사용법",
        ],
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { type: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        const reply = await askGemini([...messages, userMessage]);
        const botMessage = { type: "assistant", content: reply };

        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
    };

    const handleQuestionClick = (question) => {
        setInput(question);
        handleSubmit({ preventDefault: () => {} });
    };

    useEffect(() => {
        // 초기 메시지는 한 번만
        if (messages.length > 0) return;

        setMessages([
            {
                type: "assistant",
                content: (
                    <>
                        안녕하세요! 아래 카테고리 중에서 궁금한 주제를 골라보세요:
                        <div className="mt-2 space-y-2">
                            {Object.keys(questionMap).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className="block w-full text-left px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-700 rounded"
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </>
                ),
            },
        ]);
    }, []);

    useEffect(() => {
        if (!selectedCategory) return;

        // 동일 카테고리 질문 메시지 중복 방지
        const alreadyShown = messages.some(
            (m) =>
                typeof m.content === "object" &&
                m.content?.props?.children?.[0]?.props?.children?.includes(`${selectedCategory} 관련 질문`)
        );
        if (alreadyShown) return;

        setMessages((prev) => [
            ...prev,
            {
                type: "assistant",
                content: (
                    <>
                        <div className="mb-1 font-semibold">{selectedCategory} 관련 질문:</div>
                        <div className="space-y-2">
                            {questionMap[selectedCategory].map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleQuestionClick(q)}
                                    className="block w-full text-left px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-700 rounded"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </>
                ),
            },
        ]);
    }, [selectedCategory]);

    useEffect(() => {
        chatContainerRef.current?.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    return (
        <div className="relative flex flex-col h-full">
            {/* 메시지 출력 영역 */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
                {messages.map((msg, i) => (
                    <ChatMessage key={i} message={msg} />
                ))}
                {isLoading && (
                    <div className="text-sm text-gray-400 dark:text-gray-500 animate-pulse">
                        AI가 응답 중입니다...
                    </div>
                )}
            </div>

            {/* 전송 입력창 – 고정 아님, 푸터 위에 자연스레 */}
            <form
                onSubmit={handleSubmit}
                className="w-full bg-white dark:bg-gray-900 px-4 py-3"
            >
                <div className="flex items-center gap-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-md border dark:border-gray-600 focus:outline-none bg-white dark:bg-gray-800 text-black dark:text-white"
                        placeholder="AI에게 질문하기..."
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
                        disabled={isLoading}
                    >
                        전송
                    </button>
                </div>
            </form>
        </div>
    );

}
