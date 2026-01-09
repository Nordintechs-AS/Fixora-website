import "./styles.css";

interface ButtonProps {
    content: string;
    link?: string;
    outline?: boolean;
}

export function Button({ content, link, outline }: ButtonProps) {
    if (link) {
        return (
            <button
                className={outline === true ? "buttonOutline" : "button"}
                onClick={() => (window.location.href = link)}
            >
                {content}
            </button>
        );
    }
    return <button className="button">{content}</button>;
}
