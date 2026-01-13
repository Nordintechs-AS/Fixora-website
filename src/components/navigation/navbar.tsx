import "./index.css";
import { NavLink } from "react-router-dom";
import { Button } from "../golbal/button";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useUserTypeStore, type UserType } from "../../store/userTypeStore";
import { useTranslation } from "react-i18next";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { userType, setUserType } = useUserTypeStore();
    const { t, i18n } = useTranslation();
    const indicatorRef = useRef<HTMLDivElement>(null);
    const privatButtonRef = useRef<HTMLButtonElement>(null);
    const bedriftButtonRef = useRef<HTMLButtonElement>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    useEffect(() => {
        if (!indicatorRef.current) return;

        const targetButton =
            userType === "privat"
                ? privatButtonRef.current
                : bedriftButtonRef.current;
        if (!targetButton) return;

        gsap.to(indicatorRef.current, {
            x: targetButton.offsetLeft,
            width: targetButton.offsetWidth,
            duration: 0.4,
            ease: "power2.out",
        });
    }, [userType]);

    const handleButtonClick = (buttonType: UserType) => {
        setUserType(buttonType);
    };

    return (
        <nav className="navbar">
            <div className="navLeftSection">
                <button
                    className="languageSwitcher"
                    onClick={() =>
                        changeLanguage(i18n.language === "no" ? "en" : "no")
                    }
                    aria-label={t("nav.languageToggle")}
                >
                    {i18n.language === "no" ? "NO" : "EN"}
                </button>
                <div className="userTypeButtons">
                    <div
                        className="userTypeButtonIndicator"
                        ref={indicatorRef}
                    ></div>
                    <button
                        ref={privatButtonRef}
                        className={`userTypeButton ${
                            userType === "privat" ? "active" : ""
                        }`}
                        onClick={() => handleButtonClick("privat")}
                    >
                        {t("nav.userType.privat")}
                    </button>
                    <button
                        ref={bedriftButtonRef}
                        className={`userTypeButton ${
                            userType === "bedrift" ? "active" : ""
                        }`}
                        onClick={() => handleButtonClick("bedrift")}
                    >
                        {t("nav.userType.bedrift")}
                    </button>
                </div>
            </div>
            <button
                className={`menuButton ${isMenuOpen ? "open" : ""}`}
                aria-label={t("nav.menuLabel")}
                onClick={toggleMenu}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div
                className="navLinks"
                style={{ display: isMenuOpen ? "flex" : "" }}
            >
                <NavLink to="/" className="navLink">
                    {t("nav.home")}
                </NavLink>
                <NavLink to="/about" className="navLink">
                    {t("nav.about")}
                </NavLink>
                <NavLink to="/contact" className="navLink">
                    {t("nav.contact")}
                </NavLink>
                {!isMenuOpen && (
                    <>
                        <Button
                            content={t("nav.preorderButton")}
                            outline={true}
                            link="/"
                        />
                    </>
                )}
            </div>
        </nav>
    );
}
