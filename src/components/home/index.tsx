import fixoraLogo from "../../assets/logo.svg";
import "./index.css";
import { Offer } from "./offer";
import worker from "../../assets/worker.svg";
import home from "../../assets/home.svg";

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
                    {/* <img
                        src={fixoraLogo}
                        className="logoImageHome"
                        alt="tow workers fixing standing beside each other"
                    />
                    <img
                        src={home}
                        className="workersImage"
                        alt="tow workers fixing standing beside each other"
                    /> */}
                </div>
                <h1 className="title">
                    Få fikset det du trenger, enkelt og raskt
                </h1>
            </div>
            <Offer />
        </>
    );
}
