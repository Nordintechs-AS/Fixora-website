import { useState } from "react";
import { Button } from "../golbal/button";
import { useTranslation } from "react-i18next";
import { useUserTypeStore } from "../../store/userTypeStore";
import { addPreorderEmail } from "../../lib/supabase";
import { DragConfirm } from "../golbal/dragConfirm";

interface OfferProps {
    text: string;
}
interface OfferProps {
    text: string;
    debug?: boolean;
}
type SubmitStatus =
    | "idle"
    | "loading"
    | "success"
    | "error"
    | "exists"
    | "invalid";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export function Offer({ text }: OfferProps) {
    const { t, i18n } = useTranslation();
    const { userType } = useUserTypeStore();

    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<SubmitStatus>("idle");

    const [showDragConfirm, setShowDragConfirm] = useState(false);
    const [isHumanVerified, setIsHumanVerified] = useState(false);

    const isEmailValid = EMAIL_REGEX.test(email.trim());

    /** STEP 1: Button click */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isEmailValid) {
            setStatus("invalid");
            return;
        }

        // Show drag instead of sending
        setShowDragConfirm(true);
    };

    /** STEP 2: Drag confirmed */
    const handleHumanConfirmed = async () => {
        setIsHumanVerified(true);

        // Hide drag after 0.5s
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
                        setIsHumanVerified(false);
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
