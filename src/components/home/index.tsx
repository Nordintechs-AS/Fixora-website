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
import { useTranslation } from "react-i18next";

export function Home() {
    const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
    const { userType } = useUserTypeStore();
    const { t } = useTranslation();

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
            title: t('home.privat.title'),
            underTitle: t('home.privat.subtitle'),
            benefits: [
                {
                    title: t('home.privat.benefits.inspections.title'),
                    description: t('home.privat.benefits.inspections.description'),
                    icon: <FaSearch />,
                },
                {
                    title: t('home.privat.benefits.history.title'),
                    description: t('home.privat.benefits.history.description'),
                    icon: <FaClipboardList />,
                },
                {
                    title: t('home.privat.benefits.transparent.title'),
                    description: t('home.privat.benefits.transparent.description'),
                    icon: <FaDollarSign />,
                },
            ],
        },
        bedrift: {
            title: t('home.bedrift.title'),
            underTitle: t('home.bedrift.subtitle'),
            benefits: [
                {
                    title: t('home.bedrift.benefits.jobs.title'),
                    description: t('home.bedrift.benefits.jobs.description'),
                    icon: <FaChartLine />,
                },
                {
                    title: t('home.bedrift.benefits.admin.title'),
                    description: t('home.bedrift.benefits.admin.description'),
                    icon: <FaBolt />,
                },
                {
                    title: t('home.bedrift.benefits.payment.title'),
                    description: t('home.bedrift.benefits.payment.description'),
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
