"use client";

import React, { useState } from "react";
import styles from "./currencyModal.module.css";
import { Icons } from "@/assets/svg/svg";
import { Button } from "@components/ui/button";
import Image from "next/image";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { countryCodes } from "@/constants/countryCodes";
import ModalsLayout from "@/layouts/modalLayout/layout";
import { useUserStore } from "@/entities/user/useUserStore";
import { Currency } from "@/types/User";

const CurrencyModal = ({ onClose }: { onClose: () => void }) => {
	const { user, changeCurrency, isLoading, error } = useUserStore();

	const userCurrency = user?.currency;

	const defaultCountry =
		countryCodes.find((country) => country.currency === userCurrency) ||
		countryCodes[0];

	const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
	const [selectIsOpen, setSelectIsOpen] = useState(false);

	const handleSubmit = async () => {
		await changeCurrency(selectedCountry.currency as Currency);
		onClose();
	};

	return (
		<ModalsLayout title={"Валюта"} onClose={onClose}>
			<div className={styles.currencyModal}>
				<p>
					Выберите знакомую для вас валюту, чтобы оценить стоимость товаров.
					Валюта оплаты будет рассчитана в тенге.
				</p>

				<div className={styles.inputWrapper}>
					<DropdownMenu onOpenChange={setSelectIsOpen}>
						<div className={styles.inputContainer}>
							<DropdownMenuTrigger asChild>
								<div className={styles.countrySelector}>
									<Image
										src={selectedCountry.flag}
										alt={selectedCountry.name}
										width={20}
										height={16}
										className={styles.flag}
									/>
									{selectedCountry.currencyDesc},{selectedCountry.currency}
									<Icons.ArrowDown
										className={`${styles.arrowIcon} ${selectIsOpen ? styles.rotated : ""}`}
									/>
								</div>
							</DropdownMenuTrigger>
						</div>

						<DropdownMenuContent className={styles.dropdownMenu}>
							{countryCodes.map((country) => (
								<DropdownMenuItem
									key={country.name}
									onClick={() => setSelectedCountry(country)}
								>
									<Image
										src={country.flag}
										alt={country.name}
										width={20}
										height={16}
										className={styles.flag}
									/>
									{country.currencyDesc},{country.currency}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<Button
					className={styles.submitButton}
					onClick={handleSubmit}
					disabled={isLoading}
				>
					Сохранить
				</Button>
			</div>
		</ModalsLayout>
	);
};

export default CurrencyModal;
