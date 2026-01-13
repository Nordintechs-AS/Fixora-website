import "./index.css";
import { useUserTypeStore } from "../../store/userTypeStore";
import type { UserType } from "../../store/userTypeStore";

interface Section {
    title: string;
    content: string;
}

export function About() {
    const { userType } = useUserTypeStore();

    const content: Record<
        UserType,
        {
            title: string;
            sections: Section[];
        }
    > = {
        privat: {
            title: "Om Fixora",
            sections: [
                {
                    title: "Hva er Fixora?",
                    content:
                        "Fixora gjør det enkelt å holde styr på eiendomsene dine på ett sted. Enten du eier boligen din, en ferieeiendom eller en utleieeiendom, hjelper Fixora deg med å organisere alt du trenger å vite om eiendomsene dine—alt tilgjengelig fra telefonen eller datamaskinen din.",
                },
                {
                    title: "Hvorfor Fixora Finnes",
                    content:
                        "Det er vanskeligere enn det burde være å holde viktig eiendomsinformasjon organisert. Dokumenter ender opp i ulike mapper, bilder er spredt over telefonen din, og det tar evigheter å finne spesifikasjoner når du trenger dem. Fixora bringer det hele sammen slik at du kan slutte å søke og begynne å administrere.",
                },
                {
                    title: "Hva Vi Gjør",
                    content:
                        "Behold Alt på Ett Sted\nLagre alle eiendomsdetaljene dine—adresser, antall rom, kvadratmeter, verdivurderinger—på ett organisert sted. Ikke mer uting gjennom filer eller jakt på dokumenter.\n\nOrganiser Dokumentene Dine\nBilder, inspeksjonsrapporter, garantibrosjyrer og kontrakter hører sammen. Last dem opp en gang, få tilgang til dem når som helst. Det er som å ha et digitalt arkiv som passer i lommen din.\n\nSe Eiendomsene Dine på Kart\nVis eiendomsene dine visuelt med integrert kartlegging. Enten du selger, leier ut eller bare oppbevarer opplysninger, se alt på øyeblikket.\n\nFå Tilgang Når Som Helst, Hvor Som Helst\nBruk Fixora på telefonen din når du er på farten, eller på datamaskinen din når du vil ha en større visning. Eiendomsinformasjonen din er alltid der når du trenger den.",
                },
                {
                    title: "Hvem Vi Betjener",
                    content:
                        "Huseiere, eiendomsinvestorer og alle som ønsker å holde eiendomsinformasjonen sin organisert og tilgjengelig. Hvis du eier eiendom og vil slutte å administrere filer og begynne å administrere smartere, er Fixora for deg.",
                },
                {
                    title: "Vår Tilnærming",
                    content:
                        "Vi holder det enkelt. Ingen kompliserte funksjoner du ikke trenger. Bare enkle verktøy som hjelper deg med å organisere eiendomsene dine og finne det du trenger øyeblikkelig.\n\nTilgjengelig på iOS, Android og Web.",
                },
            ],
        },
        bedrift: {
            title: "Om Fixora",
            sections: [
                {
                    title: "Hva er Fixora?",
                    content:
                        "Fixora er en omfattende eiendomsforvaltningsplattform designet for eiendomsmeglere, eiendomsforvaltere og bedriftseiere. Vi forenkler måten du administrerer, dokumenterer og presenterer eiendomsporteføljen din med moderne verktøy bygget for effektivitet.",
                },
                {
                    title: "Hvorfor Fixora Finnes",
                    content:
                        "Å administrere flere eiendommer på tvers av ulike steder er komplisert. Regneark blir utdatert, dokumenter spredes på tvers av enheter, og presentasjon av eiendommer til interessenter tar for lang tid. Fixora løser dette ved å sentralisere all eiendomsinformasjonen din på én tilgjengelig, sikker plattform.",
                },
                {
                    title: "Hva Vi Gjør",
                    content:
                        "Sentralisert Eiendomsforvaltning\nBehold alle eiendomsdetaljer på ett sted. Lagre adresser, spesifikasjoner, verdivurderinger og dokumenter uten å bytte mellom flere verktøy. Hvert teammedlem holder seg synkronisert med sanntidsoppdateringer.\n\nProfesjonell Dokumentasjon\nLast opp og organiser eiendomsdokumenter, sertifikater, inspeksjonsrapporter og kontrakter. Aldri mist viktige filer igjen, og del dem øyeblikkelig med kolleger og klienter.\n\nPlassintelligens\nIntegrert kartlegging viser eiendommers plassering med presise detaljer. Presenter eiendommer profesjonelt til investorer, långivere og partnere med visuell kontekst som betyr noe.\n\nBygget for Team\nAdministrer eiendommer på tvers av organisasjonen din. Flere brukere kan få tilgang til, oppdatere og samarbeide om eiendomsporteføljer basert på deres roller og tillatelser.",
                },
                {
                    title: "Hvem Vi Betjener",
                    content:
                        "Eiendomsmeglerkontorer, eiendomsforvaltningsselskaper, investeringsfirmaer og porteføljeeiere som trenger pålitelige verktøy for å administrere eiendommer i stor skala.",
                },
                {
                    title: "Vår Tilnærming",
                    content:
                        "Vi tror at eiendomsforvaltning bør være enkel, ikke komplisert. Fixora fjerner administrativ friksjon slik at du kan fokusere på det som betyr noe: å vokse virksomheten din og betjene kundene dine bedre.\n\nTilgjengelig på iOS, Android og Web—arbeid hvor som helst.",
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
                <h3 className="tocTitle">Innhold</h3>
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
