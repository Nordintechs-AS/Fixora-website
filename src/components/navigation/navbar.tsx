import "./index.css";
import fixoraLogo from "../../assets/logo.svg";
import { NavLink } from "react-router-dom";
import { Button } from "../golbal/button";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useUserTypeStore, type UserType } from "../../store/userTypeStore";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { userType, setUserType } = useUserTypeStore();
    const indicatorRef = useRef<HTMLDivElement>(null);
    const privatButtonRef = useRef<HTMLButtonElement>(null);
    const bedriftButtonRef = useRef<HTMLButtonElement>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
                    privat
                </button>
                <button
                    ref={bedriftButtonRef}
                    className={`userTypeButton ${
                        userType === "bedrift" ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick("bedrift")}
                >
                    bedrift
                </button>
            </div>
            <button
                className="menuButton"
                aria-label="Menu"
                onClick={toggleMenu}
            >
                <span>&#9776;</span>
            </button>
            <div
                className="navLinks"
                style={{ display: isMenuOpen ? "flex" : "" }}
            >
                <NavLink to="/" className="navLink">
                    Home
                </NavLink>
                <NavLink to="/about" className="navLink">
                    About
                </NavLink>
                <NavLink to="/contact" className="navLink">
                    Contact
                </NavLink>
                {!isMenuOpen && (
                    <Button
                        content="Forhåndsbestill nå"
                        outline={true}
                        link="/"
                    />
                )}
            </div>
        </nav>
    );
}
