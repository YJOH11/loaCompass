import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function CharacterProfileCard({ profile, onFavoriteToggle, favorites }) {
    const isInitiallyFavorite = Array.isArray(favorites) &&
        favorites.some((n) =>
            n.toLowerCase().trim() === profile.CharacterName.toLowerCase().trim()
        );

    const [isFavorite, setIsFavorite] = useState(isInitiallyFavorite);
    const [showStarAnim, setShowStarAnim] = useState(false);

    const toggleFavorite = (e) => {
        e?.stopPropagation?.();
        const newState = !isFavorite;

        setIsFavorite(newState);

        if (newState === true) {
            // ★ 추가할 때만 애니메이션 실행
            setShowStarAnim(true);
            setTimeout(() => setShowStarAnim(false), 500);
        }

        if (onFavoriteToggle) {
            onFavoriteToggle(profile.CharacterName, newState);
        }
    };


    return (
        <div className="w-full max-w-xs bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 text-black dark:text-white transition-all duration-300">
            <div className="relative flex justify-center">
                <img
                    src={profile.CharacterImage}
                    alt="캐릭터 이미지"
                    className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 dark:border-gray-600"
                />

                {/* 애니메이션 별 */}
                <AnimatePresence>
                    {showStarAnim && (
                        <motion.span
                            key="animated-star"
                            initial={{ y: -40, opacity: 0, scale: 0.3 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 20,
                                duration: 0.5
                            }}
                            className="absolute top-0 right-0 text-yellow-400 text-2xl mt-1 mr-1 z-10 pointer-events-none"
                        >
                            ★
                        </motion.span>
                    )}
                </AnimatePresence>

                {/* 클릭 가능한 별 */}
                <button
                    onClick={toggleFavorite}
                    className="absolute top-0 right-0 text-2xl mt-1 mr-1 cursor-pointer focus:outline-none z-20"
                    title={isFavorite ? "즐겨찾기 제거" : "즐겨찾기 추가"}
                >
                    <span className={isFavorite ? "text-yellow-400" : "text-gray-300"}>★</span>
                </button>
            </div>

            <div className="mt-4 text-center space-y-1">
                <div className="text-lg font-semibold truncate">{profile.CharacterName}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                    {profile.ServerName} | {profile.CharacterClassName}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    원정대 Lv. {profile.ExpeditionLevel}<br />
                    전투 Lv. {profile.CharacterLevel}<br />
                    아이템 Lv. {profile.ItemAvgLevel}
                </div>
            </div>
        </div>
    );
}

CharacterProfileCard.defaultProps = {
    favorites: [],
};
