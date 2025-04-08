"use client";

import React from "react";
import styles from "./loginModal.module.css";
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
import { renderError } from "@/utils/renderError";
import ModalsLayout from "@/layouts/modalLayout/layout";
import PartnersModalLayout from "@/layouts/PartnersModalLayout/PartnersModalLayout";

interface LoginModalProps {
	email: string;
	setEmail: (value: string) => void;
	agreed: boolean;
	setAgreed: (value: boolean) => void;
	error: string | null;
	onSubmit: (e: React.FormEvent) => Promise<void>;
	back: () => void;
}

const LoginModal = ({
	email,
	setEmail,
	agreed,
	setAgreed,
	error,
	onSubmit,
	back,
}: LoginModalProps) => {
	return (
		<PartnersModalLayout title={"Войдите по почте"} back={back}>
			<p>Введите email, чтобы войти или зарегистрироваться</p>
			<form onSubmit={onSubmit} className="flex flex-col gap-4">
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

				<Button type="submit" className={styles.submitButton}>
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
			</form>
		</PartnersModalLayout>
	);
};

export default LoginModal;
