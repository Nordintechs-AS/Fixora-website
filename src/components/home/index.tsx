import "./index.css";
import { Offer } from "./offer";
import { Benefits } from "./benefits";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { useUserTypeStore } from "../../store/userTypeStore";
import type { UserType } from "../../store/userTypeStore";
import {
    FaSearch,
    FaClipboardList,
    FaDollarSign,
    FaChartLine,
    FaBolt,
    FaCreditCard,
} from "react-icons/fa";

export function Home() {
    const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
    const { userType } = useUserTypeStore();

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

    const content: Record<
        UserType,
        {
            title: string;
            underTitle: string;
            benefits: Array<{
                title: string;
                description: string;
                icon: ReactNode;
            }>;
        }
    > = {
        privat: {
            title: "Få fikset det du trenger, enkelt og raskt",
            underTitle:
                "Bestill tjenester direkte fra appen, se håndverkerens profil og vurderinger, og betal trygt gjennom plattformen. Vær en av de første til å prøve vår nye app!",
            benefits: [
                {
                    title: "Lønnsomme inspeksjoner",
                    description:
                        "Spar tid, penger og stree ved å oppdage problemer tidlig med vår avanserte skanneteknologi.",
                    icon: <FaSearch />,
                },
                {
                    title: "Bolig historikken",
                    description:
                        "Hold oversikt over alle reparasjoner og vedlikehold i din bolig på ett sted.",
                    icon: <FaClipboardList />,
                },
                {
                    title: "Ingen i sjul",
                    description:
                        "Transparente priser uten skjulte kostnader. Bestill og betal enkelt via appen.",
                    icon: <FaDollarSign />,
                },
            ],
        },
        bedrift: {
            title: "Din nye digitale partner for flere jobber",
            underTitle:
                "Som 'Uber for håndverkere' få tilgang til flere oppdrag, fast timepriser, og planlegg hele uken din med vår enkle og intuitive Appen. Vær først og meld deg nå",
            benefits: [
                {
                    title: "Flere jobber hver måned",
                    description:
                        "Få tilgang til et stort nettverk av kunder som trenger dine tjenester.",
                    icon: <FaChartLine />,
                },
                {
                    title: "Mindre administrasjon",
                    description:
                        "Automatisk fakturering og betaling gjør at du kan fokusere på jobben din.",
                    icon: <FaBolt />,
                },
                {
                    title: "Raskere betaling",
                    description:
                        "Få betalt raskere med automatisk fakturering og betaling.",
                    icon: <FaCreditCard />,
                },
            ],
        },
    };

    const currentContent = content[userType as UserType];

    return (
        <main className="homeContainer">
            <div className="textContainer">
                <h1 className="title">{currentContent.title}</h1>
                <Offer text={currentContent.underTitle} />
            </div>
            <Benefits benefits={currentContent.benefits} />
        </main>
    );
}
