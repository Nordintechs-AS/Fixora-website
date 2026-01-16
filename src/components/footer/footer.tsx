import "./index.css";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function Footer() {
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
    const { t, i18n } = useTranslation();
    const langDropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setIsLangDropdownOpen(false);
    };

    const menuRef = useRef<HTMLDivElement>(null);

    const updateDropdownPosition = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.top - 8,
                right: window.innerWidth - rect.right,
            });
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                langDropdownRef.current &&
                !langDropdownRef.current.contains(target) &&
                menuRef.current &&
                !menuRef.current.contains(target)
            ) {
                setIsLangDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (isLangDropdownOpen) {
            updateDropdownPosition();
            window.addEventListener("resize", updateDropdownPosition);
            window.addEventListener("scroll", updateDropdownPosition);
            return () => {
                window.removeEventListener("resize", updateDropdownPosition);
                window.removeEventListener("scroll", updateDropdownPosition);
            };
        }
    }, [isLangDropdownOpen]);

    return (
        <footer className="footer">
            {/* Bottom Bar */}
            <div className="footerBottom">
                {/* Contact - Left */}
                <div className="footerContact">
                    <a href="mailto:support@fixora.no">support@fixora.no</a>
                    <span>Thormøhlens gate 51, 5006 Bergen</span>
                </div>

                {/* Social Icons - Center */}
                <div className="footerCenter">
                    <div className="socialIcons">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                        >
                            <FaFacebook />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="X (Twitter)"
                        >
                            <FaXTwitter />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href="https://tiktok.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="TikTok"
                        >
                            <FaTiktok />
                        </a>
                    </div>
                </div>

                {/* Language - Right */}
                <div className="footerRight">
                    <div
                        className="footerLanguageDropdown"
                        ref={langDropdownRef}
                    >
                        <button
                            ref={buttonRef}
                            className="footerLanguageSwitcher"
                            onClick={() =>
                                setIsLangDropdownOpen(!isLangDropdownOpen)
                            }
                            aria-label={t("nav.languageToggle")}
                            aria-expanded={isLangDropdownOpen}
                        >
                            {i18n.language === "no" ? "Norsk" : "English"}
                        </button>
                        {isLangDropdownOpen &&
                            createPortal(
                                <div
                                    ref={menuRef}
                                    className="footerLanguageDropdownMenu"
                                    style={{
                                        position: "fixed",
                                        top: dropdownPosition.top,
                                        right: dropdownPosition.right,
                                        transform: "translateY(-100%)",
                                    }}
                                >
                                    <button
                                        className={`footerLanguageOption ${
                                            i18n.language === "no" ? "active" : ""
                                        }`}
                                        onClick={() => changeLanguage("no")}
                                    >
                                        Norsk
                                    </button>
                                    <button
                                        className={`footerLanguageOption ${
                                            i18n.language === "en" ? "active" : ""
                                        }`}
                                        onClick={() => changeLanguage("en")}
                                    >
                                        English
                                    </button>
                                </div>,
                                document.body
                            )}
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="footerCopyright">
                <span className="copyright">
                    &copy; {new Date().getFullYear()} Fixora
                </span>
            </div>
        </footer>
    );
}
