import "./styles.css";

interface ButtonProps {
    content: string;
}

export function Button({ content }: ButtonProps) {
    return <button>{content}</button>;
}
