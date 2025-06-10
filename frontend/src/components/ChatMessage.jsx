export default function ChatMessage({ message }) {
    const isUser = message.type === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg shadow text-sm ${isUser ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"}`}>
                {typeof message.content === "string" ? (
                    message.content
                ) : (
                    message.content  // JSX.Element인 경우
                )}
            </div>
        </div>
    );
}
