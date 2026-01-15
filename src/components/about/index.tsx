import "./index.css";
import { useUserTypeStore } from "../../store/userTypeStore";
import type { UserType } from "../../store/userTypeStore";
import { useTranslation } from "react-i18next";

interface Section {
    title: string;
    content: string;
}

export function About() {
    const { userType } = useUserTypeStore();
    const { t } = useTranslation();

    const content: Record<
        UserType,
        {
            title: string;
            sections: Section[];
        }
    > = {
        privat: {
            title: t("about.privat.title"),
            sections: [
                {
                    title: t("about.privat.sections.whatIs.title"),
                    content: t("about.privat.sections.whatIs.content"),
                },
                {
                    title: t("about.privat.sections.why.title"),
                    content: t("about.privat.sections.why.content"),
                },
                {
                    title: t("about.privat.sections.whatWeDo.title"),
                    content: t("about.privat.sections.whatWeDo.content"),
                },
                {
                    title: t("about.privat.sections.approach.title"),
                    content: t("about.privat.sections.approach.content"),
                },
            ],
        },
        bedrift: {
            title: t("about.bedrift.title"),
            sections: [
                {
                    title: t("about.bedrift.sections.whatIs.title"),
                    content: t("about.bedrift.sections.whatIs.content"),
                },
                {
                    title: t("about.bedrift.sections.why.title"),
                    content: t("about.bedrift.sections.why.content"),
                },
                {
                    title: t("about.bedrift.sections.whatWeDo.title"),
                    content: t("about.bedrift.sections.whatWeDo.content"),
                },
                {
                    title: t("about.bedrift.sections.approach.title"),
                    content: t("about.bedrift.sections.approach.content"),
                },
            ],
        },
    };

    const currentContent = content[userType as UserType];

    const scrollToSection = (index: number) => {
        const element = document.getElementById(`section-${index}`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <main className="aboutContainer">
            <h1 className="aboutTitle">{currentContent.title}</h1>

            <nav className="tableOfContents">
                <h3 className="tocTitle">{t("about.privat.toc")}</h3>
                <ul className="tocList">
                    {currentContent.sections.map((section, index) => (
                        <li key={index} className="tocItem">
                            <button
                                onClick={() => scrollToSection(index)}
                                className="tocLink"
                            >
                                {section.title}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="aboutContent">
                {currentContent.sections.map((section, index) => (
                    <section
                        key={index}
                        id={`section-${index}`}
                        className="aboutSection"
                    >
                        <h2 className="sectionTitle">{section.title}</h2>
                        <p className="sectionContent">{section.content}</p>
                    </section>
                ))}
            </div>
        </main>
    );
}
