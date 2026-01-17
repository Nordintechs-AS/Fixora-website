import "./styles.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ButtonProps {
    content: string;
    link?: string;
    outline?: boolean;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export function Button({ content, link, outline, type = "button", disabled }: ButtonProps) {
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
                type={type}
                disabled={disabled}
            >
                {!outline && (
                    <div ref={shadowRef} className="button-shadow"></div>
                )}
                <span className="button-content">{content}</span>
            </button>
        );
    }
    return (
        <button className="button" type={type} disabled={disabled}>
            {!outline && <div ref={shadowRef} className="button-shadow"></div>}
            <span className="button-content">{content}</span>
        </button>
    );
}
