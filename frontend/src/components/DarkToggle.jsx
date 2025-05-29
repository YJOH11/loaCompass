import { useEffect, useState } from 'react';

export default function DarkToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [dark]);

    return (
        <button
            onClick={() => setDark(!dark)}
            className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded text-sm font-medium"
        >
            {dark ? '☀️ 라이트 모드' : '🌙 다크 모드'}
        </button>
    );
}
