"use client";

import React, { useState } from "react";
import styles from "./register.module.css";
import { Icons } from "@/assets/svg";
import { Button } from "@components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";

const RegisterModal = ({onClose, onChangeEmail}: {
    onClose: () => void;
    onChangeEmail: () => void;
}) => {
    const { register, isLoading, error, email } = useAuthStore();
    const [username, setUsername] = useState("");
    const [isVisible, setIsVisible] = useState(false);

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
        <div className={`${styles.overlay} ${isVisible ? styles.visible : ''}`}>
            <div className={`${styles.modal} ${isVisible ? styles.modalVisible : ''}`}>
                <Icons.Close className={styles.closeButton} onClick={onClose}/>
                <h2>Регистрация</h2>

                <p className={styles.instruction}>
                    Мы не нашли аккаунт, зарегистрированный на почту
                    <span className={styles.email}>{email}</span>
                    <button className={styles.changeNumberBtn} onClick={onChangeEmail}>
                        Изменить
                    </button>
                </p>


                <p className={styles.instruction}>
                    Чтобы создать новый аккаунт, введите своё имя и нажмите
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
            </div>
        </div>
    );
};

export default RegisterModal;