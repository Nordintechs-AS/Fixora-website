import { Button } from "../golbal/button";

export function Offer() {
    return (
        <div className="offerContainer">
            <p className="offerText">
                Vil du være en av det første som utnytter Fixora? eller er du en
                bedrift som ønsker å tilby tjenester?
            </p>
            <Button content="Forhånd bestill nå" link="" outline={false} />
        </div>
    );
}
