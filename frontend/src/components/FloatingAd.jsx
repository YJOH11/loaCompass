import { useEffect, useRef } from "react";
import Advertisement from "./Advertisement";

export default function FloatingAd({ position = "left" }) {
    const adRef = useRef(null);
    const currentY = useRef(120);

    useEffect(() => {
        const adHeight = adRef.current?.offsetHeight || 160;

        const animate = () => {
            // 기준 위치 = 현재 스크롤 위치 + 여유
            const targetY = window.scrollY + 120;

            // 광고가 화면 아래로 안 나가게 제한
            const maxY = window.scrollY + window.innerHeight - adHeight - 20;
            const limitedY = Math.min(targetY, maxY);

            // 부드럽게 이동
            currentY.current += (limitedY - currentY.current) * 0.11;

            if (adRef.current) {
                adRef.current.style.transform = `translateY(${currentY.current}px)`;
            }

            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    const sideClass =
        position === "left"
            ? "left-[calc(50%-650px)]"
            : "right-[calc(50%-650px)]"; // ← 기존 620px → 600px로 줄임


    return (
        <div
            ref={adRef}
            className={`fixed top-0 ${sideClass} w-[160px] hidden xl:block z-7`}
            style={{ transform: `translateY(120px)` }}
        >
            <Advertisement />
        </div>

    );
}
