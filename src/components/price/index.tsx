import "./index.css";
import { useTranslation } from "react-i18next";

export function Price() {
    const { t } = useTranslation();
    const features = t("price.plans.features", {
        returnObjects: true,
    }) as string[];

    return (
        <main className="priceContainer">
            <h1 className="priceTitle">{t("price.title")}</h1>
            <p className="priceSubtitle">{t("price.subtitle")}</p>

            <div className="pricingCard">
                <h2 className="planTitle">{t("price.plans.price")}</h2>
                <p className="planDescription">
                    {t("price.plans.description")}
                </p>

                <div className="priceOptions">
                    <div className="priceOption highlighted">
                        <span className="priceLabel before">
                            {t("price.plans.before")}
                        </span>
                        <span className="priceAmount">
                            {t("price.plans.priceBefore")}
                        </span>
                    </div>
                    <div className="priceOption">
                        <span className="priceLabel">
                            {t("price.plans.after")}
                        </span>
                        <span className="priceAmount after">
                            {t("price.plans.priceAfter")}
                        </span>
                    </div>
                </div>

                <div className="featuresSection">
                    <h3 className="featuresTitle">
                        {t("price.plans.tjenester")}
                    </h3>
                    <ul className="featuresList">
                        {features.map((feature, index) => (
                            <li key={index} className="featureItem">
                                <span className="featureCheck">✓</span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    );
}
