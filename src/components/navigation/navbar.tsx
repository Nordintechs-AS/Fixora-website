import "./index.css";
import fixoraLogo from "../../assets/logo.svg";
import { NavLink } from "react-router-dom";
import { Button } from "../golbal/button";
import { useState } from "react";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <nav className="navbar">
            <div>
                <NavLink to="/">
                    <img src={fixoraLogo} alt="Logo" className="logoImage" />
                </NavLink>
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
