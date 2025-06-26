// components/StickyAd.jsx
import { useEffect, useRef, useState } from "react";
import Advertisement from "./Advertisement";

export default function StickyAd({ position = "left" }) {
    const adRef = useRef();
    const [targetY, setTargetY] = useState(120);
    const currentY = useRef(120);
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxY = document.documentElement.scrollHeight - window.innerHeight - 200;
            const safeY = Math.min(Math.max(80, scrollY), 500); // 최소 80px, 최대 500px
            setTargetY(safeY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const adHeight = 160; // 광고 높이 (필요시 정확히 측정해도 됨)
            const maxY = window.innerHeight - adHeight - 80; // 창 하단에서 멈추는 위치
            const safeY = Math.min(scrollY + 40, maxY);
            setTargetY(safeY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);



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
