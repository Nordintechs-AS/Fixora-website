import "./DesktopNav.css";
import { NavLink } from "react-router-dom";
import { Button } from "../golbal/button";
import { useTranslation } from "react-i18next";

interface DesktopNavProps {
    userType: "privat" | "bedrift";
}

export function DesktopNav({ userType }: DesktopNavProps) {
    const { t } = useTranslation();

    return (
        <div className="navLinksDesktop">
            <NavLink to="/" className="navLink">
                {t("nav.home")}
            </NavLink>
            <NavLink to="/about" className="navLink">
                {t("nav.about")}
            </NavLink>
            {userType === "bedrift" && (
                <NavLink to="/price" className="navLink">
                    {t("nav.price")}
                </NavLink>
            )}
            <Button content={t("nav.preorderButton")} outline={true} link="/" />
        </div>
    );
}
