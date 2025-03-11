"use client";

import React, { useState } from "react";
import styles from "./confirmEmail.module.css";
import { Button } from "@components/ui/button";
import { useAuthStore } from "@/entities/auth/useAuthStore";
import RegisterModal from "@/widgets/modals/auth/register";
import { renderError } from "@/hooks/renderError";
import ModalsLayout from "@/layouts/modalLayout/layout";
import Timer, { useTimer } from "@/hooks/useTimer";
import { formatTime } from "@/hooks/formatTime";

const ConfirmEmailModal = ({
	onClose,
	onChangeEmail,
}: {
	onClose: () => void;
	onChangeEmail: () => void;
}) => {
	const { email, isLoading, error } = useAuthStore();
	const [code, setCode] = useState("");
	const [canResend, setCanResend] = useState(false);
	const [showRegisterModal, setShowRegisterModal] = useState(false);
	const { reset: resetTimer } = useTimer(120, () => setCanResend(true));

	const handleResend = () => {
		setCanResend(false);
		resetTimer();
		// Add your resend logic here
	};

	const handleSubmit = async () => {
		// await confirmEmail(code);
		if (!useAuthStore.getState().error) {
			setShowRegisterModal(true);
		}
	};

	if (showRegisterModal) {
		return <RegisterModal onClose={onClose} onChangeEmail={onChangeEmail} />;
	}

	return (
		<ModalsLayout title={"Подтвердите почту"} onClose={onClose}>
			<p className={styles.instruction}>
				Укажите проверочный код - он придёт на <span>{email}</span> <br />в
				течение 2 минут.
			</p>

			<input
				type="text"
				className={styles.codeInput}
				placeholder="Код из смс"
				value={code}
				onChange={(e) => setCode(e.target.value)}
			/>

			{!canResend ? (
				<Timer
					initialTime={120}
					onComplete={() => setCanResend(true)}
					render={(timeLeft) => (
						<p className={styles.timerText}>
							Получить новый код можно через {formatTime(timeLeft)}
						</p>
					)}
				/>
			) : (
				<button className={styles.resendButton} onClick={handleResend}>
					Отправить код заново
				</button>
			)}

			{renderError(error, "code")}

			<div className={styles.buttonGroup}>
				<Button
					className={styles.submitButton}
					onClick={handleSubmit}
					disabled={isLoading}
				>
					Подтвердить
				</Button>

				<Button
					variant="ghost"
					className={styles.changeEmailButton}
					onClick={onChangeEmail}
					disabled={isLoading}
				>
					Изменить почту
				</Button>
			</div>
		</ModalsLayout>
	);
};

export default ConfirmEmailModal;
