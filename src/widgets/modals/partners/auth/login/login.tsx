"use client";

import styles from "./login.module.css";
import React, { useState } from "react";
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
import { usePartnerAuthStore } from "@/entities/partners/auth/usePartnersAuthStore";
import { renderError } from "@/utils/renderError";
import PartnersModalLayout from "@/layouts/PartnersModalLayout/PartnersModalLayout";

interface PartnerLoginModalProps {
	onNext: () => void;
}

const PartnerLoginModal = ({ onNext }: PartnerLoginModalProps) => {
	const { getConfirmCode, isLoading, error } = usePartnerAuthStore();
	const [email, setEmail] = useState("");
	const [agreed, setAgreed] = useState(false);

	const loginForm = {
		email: email,
		accepted_agreement: agreed,
	};

	const handleSubmit = async () => {
		onNext();
		await getConfirmCode(loginForm);
	};

	return (
		<PartnersModalLayout title={"Войдите по почте"}>
			<p>Введите email, чтобы войти или зарегистрироваться</p>
			<div className={styles.inputWrapper}>
				<input
					type="text"
					className={styles.emailInput}
					placeholder="example@gmail.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>

			{renderError(error, "email")}

			<Button
				disabled={isLoading}
				className={styles.submitButton}
				onClick={handleSubmit}
			>
				Получить код
			</Button>
			<div className={styles.checkbox}>
				<Checkbox
					id="terms"
					checked={agreed}
					onClick={() => setAgreed(!agreed)}
				/>
				<Label htmlFor="terms" className={styles.terms}>
					<span>Соглашаюсь</span>
					<a>
						с правилами пользования <br /> торговой площадкой{" "}
					</a>
					<span>и</span>
					<a>возврата</a>
				</Label>
			</div>

			{renderError(error, "accepted_agreement")}
		</PartnersModalLayout>
	);
};

export default PartnerLoginModal;
