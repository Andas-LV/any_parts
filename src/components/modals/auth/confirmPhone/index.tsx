"use client";

import React, { useState, useEffect } from "react";
import styles from "./confirmPhone.module.css";
import { Icons } from "@/assets/svg";
import { Button } from "@components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import RegisterModal from "@components/modals/auth/register";
import {renderError} from "@/utils/renderError";

const ConfirmPhoneModal = ({
                               onClose,
                               onChangePhone,
                           }: {
    onClose: () => void;
    onChangePhone: () => void;
}) => {
    const { phone, isLoading, error } = useAuthStore();
    const [code, setCode] = useState("");
    const [timeLeft, setTimeLeft] = useState(120);
    const [canResend, setCanResend] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => {
            setIsVisible(true);
        });

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
        // await confirmPhone(code);
        if (!useAuthStore.getState().error) {
            setShowRegisterModal(true);
        }
    };

    if (showRegisterModal) {
        return <RegisterModal
            onClose={onClose}
            onChangePhone={onChangePhone}
        />;
    }

    return (
        <div className={`${styles.overlay} ${isVisible ? styles.visible : ''}`}>
            <div className={`${styles.modal} ${isVisible ? styles.modalVisible : ''}`}>
                <Icons.Close className={styles.closeButton} onClick={onClose}/>
                <h2>Подтвердите номер</h2>

                <p className={styles.instruction}>
                    Укажите проверочный код - он придёт <br/>
                    на {phone} в течение 2 минут.
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
                        className={styles.changePhoneButton}
                        onClick={onChangePhone}
                        disabled={isLoading}
                    >
                        Изменить номер
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPhoneModal;