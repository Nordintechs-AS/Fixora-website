import { useState } from "react";
import { Button } from "../golbal/button";
import { useTranslation } from "react-i18next";
import { useUserTypeStore } from "../../store/userTypeStore";
import { addPreorderEmail } from "../../lib/supabase";

interface OfferProps {
    text: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error' | 'exists';

export function Offer({ text }: OfferProps) {
    const { t, i18n } = useTranslation();
    const { userType } = useUserTypeStore();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<SubmitStatus>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            return;
        }

        setStatus('loading');

        try {
            await addPreorderEmail(email, userType, i18n.language);
            setStatus('success');
            setEmail('');
        } catch (error) {
            if (error instanceof Error && error.message === 'EMAIL_EXISTS') {
                setStatus('exists');
            } else {
                setStatus('error');
                console.error('Pre-order submission failed:', error);
            }
        }
    };

    const getStatusMessage = () => {
        switch (status) {
            case 'success':
                return t('offer.success');
            case 'exists':
                return t('offer.exists');
            case 'error':
                return t('offer.error');
            default:
                return null;
        }
    };

    const statusMessage = getStatusMessage();

    return (
        <div className="offerContainer">
            <p className="offerText">{text}</p>
            <form className="offerActions" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder={t('offer.emailPlaceholder')}
                    className="inputField"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    required
                />
                <Button
                    content={status === 'loading' ? t('offer.loading') : t('offer.button')}
                    link=""
                    outline={false}
                    type="submit"
                    disabled={status === 'loading'}
                />
            </form>
            {statusMessage && (
                <p className={`offerStatus ${status}`}>
                    {statusMessage}
                </p>
            )}
        </div>
    );
}
