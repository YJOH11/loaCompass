import { useEffect, useRef, useState } from "react";
import Advertisement from "./Advertisement";

export default function FloatingAd({ position = "left" }) {
    const adRef = useRef(null);
    const [isFixed, setIsFixed] = useState(false);
    const [adInitialTop, setAdInitialTop] = useState(0);

    useEffect(() => {
        if (adRef.current) {
            // 최초 위치 측정 (absolute 기준 top 위치)
            const rect = adRef.current.getBoundingClientRect();
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            setAdInitialTop(rect.top + scrollTop);
        }

        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            // 광고가 화면 상단에 닿으면 fixed
            if (scrollTop >= adInitialTop) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [adInitialTop]);

    const sideClass =
        position === "left"
            ? "left-[calc(50%-650px)]"
            : "right-[calc(50%-650px)]";

    return (
        <div
            ref={adRef}
            className={`w-[160px] hidden xl:block ${isFixed ? "fixed" : "absolute"} ${sideClass}`}
            style={{
                top: isFixed ? "0px" : "120px",
                zIndex: 30, // nav보다 낮게
            }}
        >
            <Advertisement />
        </div>
    );
}
