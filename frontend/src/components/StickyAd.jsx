// components/StickyAd.jsx
import { useEffect, useRef, useState } from "react";
import Advertisement from "./Advertisement";

export default function StickyAd({ position = "left" }) {
    const adRef = useRef();
    const [targetY, setTargetY] = useState(120);
    const [currentY, setCurrentY] = useState(120);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxY = document.body.scrollHeight - window.innerHeight - 200;
            const safeY = Math.min(scrollY + 120, maxY);
            setTargetY(safeY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const animate = () => {
            setCurrentY((prevY) => {
                const nextY = prevY + (targetY - prevY) * 0.1; // 0.1 = 속도 (작을수록 느림)
                if (adRef.current) {
                    adRef.current.style.transform = `translateY(${nextY}px)`;
                }
                return nextY;
            });
            requestAnimationFrame(animate);
        };
        animate();
    }, [targetY]);

    const baseClass = "fixed w-[160px] transition-transform duration-300 z-50";
    const positionClass = position === "left" ? "left-4" : "right-4";

    return (
        <div
            ref={adRef}
            className={`${baseClass} ${positionClass}`}
            style={{ top: "80px" }} // 초기 위치 기준
        >
            <Advertisement />
        </div>
    );
}
