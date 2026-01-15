import "./index.css";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "../golbal/button";

export function Footer() {
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const langDropdownRef = useRef<HTMLDivElement>(null);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setIsLangDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                langDropdownRef.current &&
                !langDropdownRef.current.contains(event.target as Node)
            ) {
                setIsLangDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
                            className="footerLanguageSwitcher"
                            onClick={() =>
                                setIsLangDropdownOpen(!isLangDropdownOpen)
                            }
                            aria-label={t("nav.languageToggle")}
                            aria-expanded={isLangDropdownOpen}
                        >
                            {i18n.language === "no" ? "Norsk" : "English"}
                        </button>
                        {isLangDropdownOpen && (
                            <div className="footerLanguageDropdownMenu">
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
                            </div>
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
