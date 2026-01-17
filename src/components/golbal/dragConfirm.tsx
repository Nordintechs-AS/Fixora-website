import "./styles.css";
import { useRef, useState } from "react";
import gsap from "gsap";

interface DragConfirmProps {
    onConfirmed: () => void;
    disabled?: boolean;
}

export function DragConfirm({ onConfirmed, disabled }: DragConfirmProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        if (disabled || isConfirmed || !trackRef.current || !thumbRef.current)
            return;

        const startX = "clientX" in e ? e.clientX : e.touches[0].clientX;
        const maxWidth = trackRef.current.offsetWidth;
        const thumb = thumbRef.current;

        const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
            const currentX =
                moveEvent instanceof MouseEvent
                    ? moveEvent.clientX
                    : moveEvent.touches[0].clientX;
            const delta = currentX - startX;
            const position = Math.max(0, Math.min(delta, maxWidth));
            gsap.set(thumb, { x: position });

            if (position >= maxWidth * 0.9) {
                setIsConfirmed(true);
                onConfirmed();
                gsap.to(thumb, {
                    scale: 1.4,
                    y: -25,
                    duration: 0.6,
                    ease: "back.out",
                });
                gsap.to(thumb, {
                    y: 0,
                    duration: 0.8,
                    delay: 0.6,
                    ease: "bounce.out",
                });
                cleanup();
            }
        };

        const handleEnd = () => {
            if (!isConfirmed) {
                gsap.to(thumb, { x: 0, duration: 0.4, ease: "bounce.out" });
            }
            cleanup();
        };

        const cleanup = () => {
            document.removeEventListener("mousemove", handleMove);
            document.removeEventListener("touchmove", handleMove);
            document.removeEventListener("mouseup", handleEnd);
            document.removeEventListener("touchend", handleEnd);
        };

        document.addEventListener("mousemove", handleMove);
        document.addEventListener("touchmove", handleMove);
        document.addEventListener("mouseup", handleEnd);
        document.addEventListener("touchend", handleEnd);
    };

    return (
        <div
            className={`dragConfirmTrack ${isConfirmed ? "confirmed" : ""}`}
            ref={trackRef}
        >
            {!isConfirmed && (
                <div
                    ref={thumbRef}
                    className="dragConfirmThumb"
                    onMouseDown={handleDragStart}
                    onTouchStart={handleDragStart}
                >
                    →
                </div>
            )}
            <span className="dragConfirmText">
                {isConfirmed ? "✓ Verified" : "Drag to verify"}
            </span>
        </div>
    );
}
