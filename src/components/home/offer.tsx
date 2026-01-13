import { Button } from "../golbal/button";

interface OfferProps {
    text: string;
}

export function Offer({ text }: OfferProps) {
    return (
        <div className="offerContainer">
            <p className="offerText">{text}</p>
            <div className="offerActions">
                <input
                    type="email"
                    placeholder="Din epost adresse"
                    className="inputField"
                />
                <Button content="Forhåndsbestill nå" link="" outline={true} />
            </div>
        </div>
    );
}
