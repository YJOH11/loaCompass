export const askGemini = async (messages) => {
    // ✅ 여기에 prompt 변환 로직 다시 추가
    const prompt = messages
        .filter((m) => m.type === "user")
        .map((m) => `사용자: ${m.content}`)
        .join("\n") + "\nAI:";


    const res = await fetch("http://localhost:8080/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error("Gemini API 오류:", errorText);
        return "Gemini API 요청 실패 (status " + res.status + ")";
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "답변을 불러오지 못했습니다.";
};
