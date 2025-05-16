import { useState, useEffect } from "react";

export default function CharacterProfileCard({ profile }) {
const [favorites, setFavorites] = useState(() => {
const stored = localStorage.getItem("favoriteHistory");
try {
const parsed = JSON.parse(stored);
return Array.isArray(parsed) ? parsed : [];
} catch {
return [];
}
});

const isFavorite = favorites.includes(profile.CharacterName);

const toggleFavorite = (e) => {
e?.stopPropagation?.(); // 버튼 클릭 시 상위 이벤트 방지
let updated;
if (isFavorite) {
updated = favorites.filter(name => name !== profile.CharacterName);
} else {
updated = [profile.CharacterName, ...favorites];
}
localStorage.setItem("favoriteHistory", JSON.stringify(updated));
setFavorites(updated);
};

return (
<div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow text-black dark:text-white w-full">
<div className="relative">
<img src={profile.CharacterImage} alt="캐릭터 이미지" className="w-24 h-24 object-cover rounded border border-gray-300 dark:border-gray-600 mx-auto mb-4" />
<button onClick={toggleFavorite} className="absolute top-0 right-0 text-2xl mr-1 mt-1 cursor-pointer focus:outline-none" >
<span className={isFavorite ? "text-yellow-400" : "text-gray-300"}>★</span>
</button>
</div>