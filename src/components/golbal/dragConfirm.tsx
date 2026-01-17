import "./styles.css";
import { useRef, useState } from "react";

interface DragConfirmProps {
    onConfirmed: () => void;
    disabled?: boolean;
}

export function DragConfirm({ onConfirmed, disabled }: DragConfirmProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [dragX, setDragX] = useState(0);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (disabled || isConfirmed) return;

        const track = trackRef.current;
        if (!track) return;

        const startX = e.clientX;
        const maxWidth = track.offsetWidth;

        const onMouseMove = (moveEvent: MouseEvent) => {
            const delta = moveEvent.clientX - startX;
            const clamped = Math.max(0, Math.min(delta, maxWidth));
            setDragX(clamped);

            if (clamped >= maxWidth * 0.9) {
                setIsConfirmed(true);
                onConfirmed();
                cleanup();
            }
        };

        const cleanup = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", cleanup);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", cleanup);
    };

    return (
        <div className="dragConfirmTrack" ref={trackRef}>
            <div
                className={`dragConfirmThumb ${isConfirmed ? "confirmed" : ""}`}
                style={{ transform: `translateX(${dragX}px)` }}
                onMouseDown={handleMouseDown}
            >
                {isConfirmed ? "✓" : "→"}
            </div>
            <span className="dragConfirmText">
                {isConfirmed ? "Verified" : "Drag to verify"}
            </span>
        </div>
    );
}
