import "./index.css";
import fixoraLogo from "../../assets/logo.svg";
import { NavLink } from "react-router-dom";

export function Navbar() {
    return (
        <nav className="navbar">
            <div>
                <NavLink to="/">
                    <img src={fixoraLogo} alt="Logo" className="logoImage" />
                </NavLink>
            </div>
            <div className="navLinks">
                <NavLink to="/" className="navLink">
                    Home
                </NavLink>
                <NavLink to="/about" className="navLink">
                    About
                </NavLink>
                <NavLink to="/contact" className="navLink">
                    Contact
                </NavLink>
            </div>
        </nav>
    );
}
