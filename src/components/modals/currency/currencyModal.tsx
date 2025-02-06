"use client";

import React, { useState } from "react";
import styles from "./currencyModal.module.css";
import { Icons } from "@/assets/svg";
import { Button } from "@components/ui/button";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { countryCodes } from "@components/modals/auth/countryCodes";
import {useAuthStore} from "@/store/useAuthStore";

const CurrencyModal = ({ onClose }: { onClose: () => void; }) => {
    const { getConfirmCode, isLoading, error } = useAuthStore();

    const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
    const [selectIsOpen, setSelectIsOpen] = useState(false);

    const [isVisible, setIsVisible] = useState(true);

    const handleSubmit = async() => {
        onClose()
    };

    return (
        <div className={`${styles.overlay} ${isVisible ? styles.visible : ''}`}>
            <div className={`${styles.modal} ${isVisible ? styles.modalVisible : ''}`}>
                <Icons.Close className={styles.closeButton} onClick={onClose} />
                <h2>Валюта</h2>

                <p>
                    Выберите знакомую для вас валюту, чтобы оценить стоимость
                    товаров. Валюта оплаты будет рассчитана в тенге.
                </p>

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

                                    {selectedCountry.currencyDesc},
                                    {selectedCountry.currency}

                                    <Icons.ArrowDown className={`${styles.arrowIcon} ${selectIsOpen ? styles.rotated : ""}`}/>
                                </div>
                            </DropdownMenuTrigger>

                        </div>

                        <DropdownMenuContent className={styles.dropdownMenu}>
                            {countryCodes.map((country) => (
                                <DropdownMenuItem key={country.code} onClick={() => setSelectedCountry(country)}>
                                    <Image
                                        src={country.flag}
                                        alt={country.country}
                                        width={20}
                                        height={16}
                                        className={styles.flag}
                                    />

                                    {country.currencyDesc},
                                    {country.currency}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>


                <Button className={styles.submitButton} onClick={handleSubmit}>
                   Сохранить
                </Button>
            </div>
        </div>
    );
};

export default CurrencyModal;