"use client";

import React, { useState } from "react";
import styles from "./loginModal.module.css";
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
import ConfirmEmailModal from "../confirmEmail";
import { useAuthStore } from "@/entities/customer/auth/useAuthStore";
import { renderError } from "@/utils/renderError";
import ModalsLayout from "@/layouts/modalLayout/layout";

const LoginModal = ({ onClose }: { onClose: () => void }) => {
	const { getConfirmCode, isLoading, error } = useAuthStore();
	const [email, setEmail] = useState("");
	const [agreed, setAgreed] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const loginForm = {
		email: email,
		agreed: agreed,
	};

	const handleSubmit = async () => {
		await getConfirmCode(loginForm);

		if (!useAuthStore.getState().error) {
			setShowConfirmModal(true);
		}
	};

	const handleChangeEmail = () => {
		setShowConfirmModal(false);
	};

	if (showConfirmModal) {
		return (
			<ConfirmEmailModal onClose={onClose} onChangeEmail={handleChangeEmail} />
		);
	}

	return (
		<ModalsLayout title={"Войдите по почте"} onClose={onClose}>
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

			<Button className={styles.submitButton} onClick={handleSubmit}>
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

			{renderError(error, "agreed")}
		</ModalsLayout>
	);
};

export default LoginModal;
