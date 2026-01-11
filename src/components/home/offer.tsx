import { Button } from "../golbal/button";

export function Offer() {
    return (
        <div className="offerContainer">
            <p className="offerText">
                Vil du være en av det første som utnytter Fixora? eller er du en
                bedrift som ønsker å tilby tjenester?
            </p>
            <div className="offerActions">
                <input
                    type="email"
                    placeholder="Din epost adresse"
                    className="inputField"
                />
                <Button content="Bestill" link="" outline={true} />
            </div>
        </div>
    );
}
