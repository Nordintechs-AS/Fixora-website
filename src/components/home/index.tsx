import "./index.css";
import { Offer } from "./offer";
import worker from "../../assets/worker.svg";

export function Home() {
    return (
        <>
            <div>
                <div className="homeContainer">
                    <img
                        src={worker}
                        className="workersImage"
                        alt="tow workers fixing standing beside each other"
                    />
                </div>
                <h1 className="title">
                    Få fikset det du trenger, enkelt og raskt
                </h1>
            </div>
            <Offer />
        </>
    );
}
