"use client";

import React, { useState } from "react";
import styles from "./confirm.module.css";
import { Button } from "@components/ui/button";
import { useRequisitesStore } from "@/entities/requisites/useRequisitesStore";
import { renderError } from "@/hooks/renderError";
import ModalsLayout from "@/layouts/modalLayout/layout";
import { formatTime } from "@/hooks/formatTime";
import Timer, { useTimer } from "@/hooks/useTimer";

const ConfirmReqCodeModal = ({
	onClose,
	onPrev,
}: {
	onClose: () => void;
	onPrev: () => void;
}) => {
	const { registerReq, isLoading, error } = useRequisitesStore();
	const [code, setCode] = useState("");
	const [canResend, setCanResend] = useState(false);
	const { reset: resetTimer } = useTimer(120, () => setCanResend(true));

	const handleResend = () => {
		setCanResend(false);
		resetTimer();
		// Add your resend logic here
	};

	const handleSubmit = async () => {
		// registerReq
		onClose();
	};

	return (
		<ModalsLayout title={"Введите код"} back={onPrev} onClose={onClose}>
			<div className={styles.wrapper}>
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

				<Button
					className={styles.submitButton}
					onClick={handleSubmit}
					disabled={isLoading}
				>
					Подтвердить
				</Button>
			</div>
		</ModalsLayout>
	);
};

export default ConfirmReqCodeModal;
