import { Button } from "../golbal/button";
import { useTranslation } from "react-i18next";

interface OfferProps {
    text: string;
}

export function Offer({ text }: OfferProps) {
    const { t } = useTranslation();

    return (
        <div className="offerContainer">
            <p className="offerText">{text}</p>
            <div className="offerActions">
                <input
                    type="email"
                    placeholder={t('offer.emailPlaceholder')}
                    className="inputField"
                />
                <Button content={t('offer.button')} link="" outline={false} />
            </div>
        </div>
    );
}
