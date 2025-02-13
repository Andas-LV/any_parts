"use client";

import React, { useState } from "react";
import styles from "./register.module.css";
import { Button } from "@components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import ModalsLayout from "@components/modals/layout";

const RegisterModal = ({onClose, onChangeEmail}: {
    onClose: () => void;
    onChangeEmail: () => void;
}) => {
    const { register, isLoading, error, email } = useAuthStore();
    const [username, setUsername] = useState("");

    const handleSubmit = async () => {
        if (!email) {
            return
        }
        try {
            await register({ username, email });
            onClose();
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <ModalsLayout title={'Регистрация'} back={false} onClose={onClose}>
            <p className={styles.instruction}>
                Мы не нашли аккаунт, зарегистрированный на почту <br/>
                <span className={styles.email}>{email}</span>
                <button className={styles.changeNumberBtn} onClick={onChangeEmail}>
                    Изменить
                </button>
            </p>


            <p className={styles.instruction}>
                Чтобы создать новый аккаунт, введите своё имя и нажмите <br/>
                кнопку «Зарегистрироваться»
            </p>

            <input
                type="text"
                className={styles.nameInput}
                placeholder="Ваше имя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <Button
                className={styles.submitButton}
                onClick={handleSubmit}
                disabled={isLoading}
            >
                Зарегистрироваться
            </Button>
        </ModalsLayout>
    );
};

export default RegisterModal;