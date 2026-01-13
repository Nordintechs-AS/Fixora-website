import "./styles.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ButtonProps {
    content: string;
    link?: string;
    outline?: boolean;
}

export function Button({ content, link, outline }: ButtonProps) {
    const shadowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (shadowRef.current && !outline) {
            gsap.set(shadowRef.current, {
                transformOrigin: "50% 50%",
            });

            gsap.to(shadowRef.current, {
                rotate: 360,
                duration: 5,
                repeat: -1,
                ease: "none",
            });
        }
    }, [outline]);

    if (link) {
        return (
            <button
                className={outline === true ? "buttonOutline" : "button"}
                onClick={() => (window.location.href = link)}
            >
                {!outline && (
                    <div ref={shadowRef} className="button-shadow"></div>
                )}
                <span className="button-content">{content}</span>
            </button>
        );
    }
    return (
        <button className="button">
            {!outline && <div ref={shadowRef} className="button-shadow"></div>}
            <span className="button-content">{content}</span>
        </button>
    );
}
