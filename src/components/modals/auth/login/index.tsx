"use client";

import React, { useState } from "react";
import styles from "./loginModal.module.css";
import { Icons } from "@/assets/svg";
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { countryCodes } from "@components/modals/auth/countryCodes";
import ConfirmPhoneModal from "../confirmPhone";
import {useAuthStore} from "@/store/useAuthStore";
import {renderError} from "@/utils/renderError";

const LoginModal = ({ onClose }: { onClose: () => void; }) => {
    const { getConfirmCode, isLoading, error } = useAuthStore();
    const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
    const [selectIsOpen, setSelectIsOpen] = useState(false);
    const [phone, setPhone] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const phoneNumber = selectedCountry.code.concat(phone.replace(/\D/g, ""));

    const loginForm = {
        phone: phoneNumber,
        agreed: agreed
    };

    const handleSubmit = async() => {
        await getConfirmCode(loginForm);

        if (!useAuthStore.getState().error) {
            setShowConfirmModal(true);
        }
    };

    const handleChangePhone = () => {
        setShowConfirmModal(false);
    };

    if (showConfirmModal) {
        return <ConfirmPhoneModal
            onClose={onClose}
            onChangePhone={handleChangePhone}
        />;
    }

    return (
        <div className={`${styles.overlay} ${isVisible ? styles.visible : ''}`}>
            <div className={`${styles.modal} ${isVisible ? styles.modalVisible : ''}`}>
                <Icons.Close className={styles.closeButton} onClick={onClose} />
                <h2>Войти или создать профиль</h2>
                <div className={styles.inputWrapper}>
                    <DropdownMenu onOpenChange={setSelectIsOpen}>
                        <div className={styles.inputContainer}>
                            <DropdownMenuTrigger asChild>
                                <div className={styles.countrySelector}>
                                    <Image
                                        src={selectedCountry.flag}
                                        alt={selectedCountry.country}
                                        width={20}
                                        height={16}
                                        className={styles.flag}
                                    />
                                    <Icons.ArrowDown className={`${styles.arrowIcon} ${selectIsOpen ? styles.rotated : ""}`}/>
                                </div>
                            </DropdownMenuTrigger>

                            <span className={styles.countryCode}>{selectedCountry.code}</span>

                            <input
                                type="text"
                                className={styles.phoneInput}
                                placeholder="000 000-00-00"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <DropdownMenuContent>
                            <DropdownMenuLabel>Код страны</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            {countryCodes.map((country) => (
                                <DropdownMenuItem key={country.code} onClick={() => setSelectedCountry(country)}>
                                    <Image
                                        src={country.flag}
                                        alt={country.country}
                                        width={20}
                                        height={16}
                                        className={styles.flag}
                                    />
                                    {country.country} {country.code}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {renderError(error, "phone")}

                <Button className={styles.submitButton} onClick={handleSubmit}>
                    Получить код
                </Button>
                <div className={styles.checkbox}>
                    <Checkbox id="terms" onClick={() => setAgreed(!agreed)}/>
                    <Label htmlFor="terms" className={styles.terms}>
                        <span>Соглашаюсь</span>
                        <a>с правилами пользования <br/> торговой площадкой </a>
                        <span>и</span>
                        <a>возврата</a>
                    </Label>
                </div>

                {renderError(error, "agreed")}
            </div>
        </div>
    );
};

export default LoginModal;