"use client";

import React from "react";
import styles from "./register.module.css";
import PartnersModalLayout from "@/layouts/PartnersModalLayout/PartnersModalLayout";
import PartnerRegisterForm from "@/forms/PartnerRegisterForm/PartnerRegisterForm";
import { usePartnerAuthStore } from "@/entities/partners/auth/usePartnersAuthStore";

interface PartnerRegisterModalProps {
	onChangeEmail: () => void;
	onNext: () => void;
}

const PartnerRegisterModal = ({
	onChangeEmail,
	onNext,
}: PartnerRegisterModalProps) => {
	const { email } = usePartnerAuthStore();

	return (
		<PartnersModalLayout title={"Регистрация"}>
			<p className={styles.instruction}>
				Мы не нашли аккаунт, зарегистрированный на почту <br />
				<span className={styles.email}>{email}</span>
				<button
					type="button"
					className={styles.changeNumberBtn}
					onClick={onChangeEmail}
				>
					Изменить
				</button>
			</p>

			<p className={styles.instruction}>
				Чтобы создать новый аккаунт, заполните форму и нажмите <br />
				кнопку «Зарегистрироваться»
			</p>

			<PartnerRegisterForm onNext={onNext} />
		</PartnersModalLayout>
	);
};

export default PartnerRegisterModal;
