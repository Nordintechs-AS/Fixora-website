import "./index.css";
import { Offer } from "./offer";
import appImageOne from "../../assets/1.png";
import appImageTwo from "../../assets/2.png";
import appImageThree from "../../assets/3.png";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Home() {
    const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

    useEffect(() => {
        const images = imageRefs.current.filter(Boolean);

        gsap.set(images, {
            opacity: 0,
            y: 100,
            scale: 0.8,
        });

        images.forEach((img, index) => {
            const rotation = index === 0 ? -8 : index === 1 ? 0 : 8;
            const yOffset = index === 1 ? 0 : 10;

            gsap.to(img, {
                opacity: 1,
                y: yOffset,
                scale: 1,
                rotation: rotation,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.2 + index * 0.4,
            });
        });
    }, []);

    return (
        <main className="homeContainer">
            <div className="textContainer">
                <h1 className="title">
                    Få fikset det du trenger, enkelt og raskt
                </h1>
                <Offer />
            </div>
            <div className="imagesContainer">
                <img
                    ref={(el) => {
                        imageRefs.current[0] = el;
                    }}
                    src={appImageThree}
                    alt="Workers"
                    className="appImages appImage1"
                />
                <img
                    ref={(el) => {
                        imageRefs.current[1] = el;
                    }}
                    src={appImageTwo}
                    alt="Workers"
                    className="appImages appImage2"
                />
                <img
                    ref={(el) => {
                        imageRefs.current[2] = el;
                    }}
                    src={appImageOne}
                    alt="Workers"
                    className="appImages appImage3"
                />
            </div>
        </main>
    );
}
