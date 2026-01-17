import "./MobileNav.css";
import { NavLink } from "react-router-dom";
import { Button } from "../golbal/button";
import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
    userType: "privat" | "bedrift";
}

export function MobileNav({ isOpen, onClose, userType }: MobileNavProps) {
    const { t } = useTranslation();
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const mobileCtaRef = useRef<HTMLDivElement>(null);

    const animateMenuOpen = useCallback(() => {
        if (!mobileMenuRef.current) return;

        const tl = gsap.timeline();

        tl.to(mobileMenuRef.current, {
            clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)",
            duration: 0.6,
            ease: "power3.inOut",
        });

        tl.fromTo(
            navLinksRef.current.filter(Boolean),
            { opacity: 0, x: -40 },
            {
                opacity: 1,
                x: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: "power2.out",
            },
            "-=0.3"
        );

        if (mobileCtaRef.current) {
            tl.fromTo(
                mobileCtaRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
                "-=0.2"
            );
        }
    }, []);

    const animateMenuClose = useCallback(() => {
        if (!mobileMenuRef.current) return;

        const tl = gsap.timeline();

        if (mobileCtaRef.current) {
            tl.to(mobileCtaRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.2,
                ease: "power2.in",
            });
        }

        tl.to(
            navLinksRef.current.filter(Boolean).reverse(),
            {
                opacity: 0,
                x: -40,
                duration: 0.2,
                stagger: 0.05,
                ease: "power2.in",
            },
            "-=0.1"
        );

        tl.to(
            mobileMenuRef.current,
            {
                clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
                duration: 0.5,
                ease: "power3.inOut",
            },
            "-=0.1"
        );

        tl.call(() => {
            onClose();
        });
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            requestAnimationFrame(() => {
                animateMenuOpen();
            });
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen, animateMenuOpen]);

    const handleNavLinkClick = () => {
        animateMenuClose();
    };

    const setNavLinkRef = (index: number) => (el: HTMLAnchorElement | null) => {
        navLinksRef.current[index] = el;
    };

    if (!isOpen) return null;

    return (
        <div className="mobileMenuOverlay" ref={mobileMenuRef}>
            <div className="mobileMenuContent">
                <div className="mobileNavLinks">
                    <NavLink
                        to="/"
                        className="mobileNavLink"
                        ref={setNavLinkRef(0)}
                        onClick={handleNavLinkClick}
                    >
                        <span className="mobileNavLinkNumber">01</span>
                        <span className="mobileNavLinkText">
                            {t("nav.home")}
                        </span>
                    </NavLink>
                    <NavLink
                        to="/about"
                        className="mobileNavLink"
                        ref={setNavLinkRef(1)}
                        onClick={handleNavLinkClick}
                    >
                        <span className="mobileNavLinkNumber">02</span>
                        <span className="mobileNavLinkText">
                            {t("nav.about")}
                        </span>
                    </NavLink>
                    {userType === "bedrift" && (
                        <NavLink
                            to="/price"
                            className="mobileNavLink"
                            ref={setNavLinkRef(2)}
                            onClick={handleNavLinkClick}
                        >
                            <span className="mobileNavLinkNumber">03</span>
                            <span className="mobileNavLinkText">
                                {t("nav.price")}
                            </span>
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
}
