"use client";

import React, { useState, useEffect } from "react";
import styles from "./confirmEmail.module.css";
import { Icons } from "@/assets/svg";
import { Button } from "@components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import RegisterModal from "@components/modals/auth/register";
import {renderError} from "@/utils/renderError";
import {confirmEmail} from "@/schemas/auth";
import ModalsLayout from "@components/modals/layout";

const ConfirmEmailModal = ({
                               onClose,
                               onChangeEmail,
                           }: {
    onClose: () => void;
    onChangeEmail: () => void;
}) => {
    const { email, isLoading, error } = useAuthStore();
    const [code, setCode] = useState("");
    const [timeLeft, setTimeLeft] = useState(120);
    const [canResend, setCanResend] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            setCanResend(true);
        }
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleResend = () => {
        setTimeLeft(120);
        setCanResend(false);
        // Add your resend logic here
    };

    const handleSubmit = async() => {
        // await confirmEmail(code);
        if (!useAuthStore.getState().error) {
            setShowRegisterModal(true);
        }
    };

    if (showRegisterModal) {
        return <RegisterModal
            onClose={onClose}
            onChangeEmail={onChangeEmail}
        />;
    }

    return (
        <ModalsLayout title={'Подтвердите номер'} onClose={onClose}>
            <p className={styles.instruction}>
                Укажите проверочный код - он придёт на {email} <br/>
                в течение 2 минут.
            </p>

            <input
                type="text"
                className={styles.codeInput}
                placeholder="Код из смс"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />

            {!canResend ? (
                <p className={styles.timerText}>
                    Получить новый код можно через {formatTime(timeLeft)}
                </p>
            ) : (
                <button
                    className={styles.resendButton}
                    onClick={handleResend}
                >
                    Отправить код заново
                </button>
            )}

            {renderError(error, "code")}

            <div className={styles.buttonGroup}>
                <Button
                    className={styles.submitButton}
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    Подтвердить
                </Button>

                <Button
                    variant="ghost"
                    className={styles.changeEmailButton}
                    onClick={onChangeEmail}
                    disabled={isLoading}
                >
                    Изменить почту
                </Button>
            </div>
        </ModalsLayout>
    );
};

export default ConfirmEmailModal;