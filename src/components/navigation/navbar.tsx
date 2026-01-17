import "./index.css";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { useUserTypeStore, type UserType } from "../../store/userTypeStore";
import { useTranslation } from "react-i18next";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { userType, setUserType } = useUserTypeStore();
    const location = useLocation();
    const isPricePage = location.pathname === "/price";
    const { t } = useTranslation();

    const indicatorRef = useRef<HTMLDivElement>(null);
    const privatButtonRef = useRef<HTMLButtonElement>(null);
    const bedriftButtonRef = useRef<HTMLButtonElement>(null);

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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMobileMenuClose = () => {
        setIsMenuOpen(false);
        document.body.style.overflow = "";
    };

    return (
        <nav className="navbar">
            <div className="navLeftSection">
                {!isPricePage && (
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
                )}
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

            <DesktopNav userType={userType} />

            <MobileNav
                isOpen={isMenuOpen}
                onClose={handleMobileMenuClose}
                userType={userType}
            />
        </nav>
    );
}
