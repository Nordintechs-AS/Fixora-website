import "./index.css";
import { Offer } from "./offer";

export function Home() {
    return (
        <>
            <div>
                <h1 className="title">
                    Få fikset det du trenger, enkelt og raskt
                </h1>
            </div>
            <Offer />
        </>
    );
}
