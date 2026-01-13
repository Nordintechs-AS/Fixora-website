import "./benefits.css";
import type { ReactNode } from "react";

export interface Benefit {
    title: string;
    description: string;
    icon?: ReactNode;
}

interface BenefitsProps {
    benefits: Benefit[];
}

export function Benefits({ benefits }: BenefitsProps) {
    return (
        <div className="benefitsContainer">
            <div className="benefitsGrid">
                {benefits.map((benefit, index) => (
                    <div key={index} className="benefitBox">
                        {benefit.icon && (
                            <div className="benefitIcon">{benefit.icon}</div>
                        )}
                        <h3 className="benefitTitle">{benefit.title}</h3>
                        <p className="benefitDescription">
                            {benefit.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
