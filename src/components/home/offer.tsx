import { useState } from "react";
import { Button } from "../golbal/button";
import { useTranslation } from "react-i18next";
import { useUserTypeStore } from "../../store/userTypeStore";
import { addPreorderEmail } from "../../lib/supabase";
import { DragConfirm } from "../golbal/dragConfirm";

interface OfferProps {
    text: string;
}

type SubmitStatus =
    | "idle"
    | "loading"
    | "success"
    | "error"
    | "exists"
    | "invalid";

// More robust email regex - requires proper domain with at least 2 chars TLD
const EMAIL_REGEX = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function Offer({ text }: OfferProps) {
    const { t, i18n } = useTranslation();
    const { userType } = useUserTypeStore();

    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<SubmitStatus>("idle");
    const [showDragConfirm, setShowDragConfirm] = useState(false);

    const isEmailValid = EMAIL_REGEX.test(email.trim());

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isEmailValid) {
            setStatus("invalid");
            return;
        }

        setShowDragConfirm(true);
    };

    const handleHumanConfirmed = async () => {
        setTimeout(() => {
            setShowDragConfirm(false);
        }, 500);

        setStatus("loading");

        try {
            await addPreorderEmail(email.trim(), userType, i18n.language);
            setStatus("success");
            setEmail("");
        } catch (error) {
            if (error instanceof Error && error.message === "EMAIL_EXISTS") {
                setStatus("exists");
            } else {
                setStatus("error");
                console.error("Pre-order submission failed:", error);
            }
        }
    };

    return (
        <div className="offerContainer">
            <p className="offerText">{text}</p>

            <form className="offerActions" onSubmit={handleSubmit} noValidate>
                <input
                    type="email"
                    placeholder={t("offer.emailPlaceholder")}
                    className={`inputField ${status === "invalid" ? "inputError" : ""}`}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setStatus("idle");
                        setShowDragConfirm(false);
                    }}
                    disabled={status === "loading"}
                    required
                />

                <Button
                    content={
                        status === "loading"
                            ? t("offer.loading")
                            : t("offer.button")
                    }
                    link=""
                    outline={false}
                    type="submit"
                    disabled={!isEmailValid || status === "loading"}
                />

                {showDragConfirm && (
                    <DragConfirm
                        disabled={status === "loading"}
                        onConfirmed={handleHumanConfirmed}
                    />
                )}
            </form>

            {status !== "idle" && (
                <p className={`offerStatus ${status}`}>
                    {t(`offer.${status}`)}
                </p>
            )}
        </div>
    );
}
