"use client";

import React, { useState, useEffect } from "react";
import styles from "./confirm.module.css";
import { Button } from "@components/ui/button";
import { useRequisitesStore } from "@/store/useRequisitesStore";
import {renderError} from "@/utils/renderError";
import ModalsLayout from "@components/modals/layout";

const ConfirmCodeModal = ({onClose,}: { onClose: () => void; }) => {
    const { registerReq, isLoading, error } = useRequisitesStore();
    const [code, setCode] = useState("");
    const [timeLeft, setTimeLeft] = useState(120);
    const [canResend, setCanResend] = useState(false);

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
        // registerReq
        onClose()
    };


    return (
        <ModalsLayout title={'Введите код'} back onClose={onClose}>
            <div className={styles.wrapper}>
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

                <Button
                    className={styles.submitButton}
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    Подтвердить
                </Button>
            </div>
        </ModalsLayout>
    );
};

export default ConfirmCodeModal;