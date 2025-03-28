import React, { useState } from "react";
import styles from "./forgotPassword.module.css";
import PartnersModalLayout from "@/layouts/PartnersModalLayout/PartnersModalLayout";
import { renderError } from "@/utils/renderError";
import { Button } from "@components/ui/button";
import { useAdminAuthStore } from "@/entities/admin/auth/useAdminAuthStore";

interface ForgotPasswordModalProps {
	onNext: () => void;
}

export default function ForgotPasswordModal({
	onNext,
}: ForgotPasswordModalProps) {
	const { getConfirmCode, isLoading, error } = useAdminAuthStore();

	const [email, setEmail] = useState("");

	const handleSubmit = async () => {
		await getConfirmCode(email);
		onNext()
		console.log(email);
	};

	return (
		<PartnersModalLayout title={"Сброс пароля"}>
			<p>Введите email для восстановления</p>

			<div className={styles.inputWrapper}>
				<input
					type="text"
					className={styles.input}
					placeholder="Почта"
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
				Отправить
			</Button>
		</PartnersModalLayout>
	);
}
