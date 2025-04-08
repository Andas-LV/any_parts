"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginModal from "@/widgets/modals/customer/auth/login";
import ConfirmEmailModal from "@/widgets/modals/customer/auth/confirmEmail";
import RegisterModal from "@/widgets/modals/customer/auth/register";
import styles from "./login.module.css";
import { Icons } from "@/assets/svg/svg";
import { routes } from "@/configs/routes";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [code, setCode] = useState("");
	const [username, setUsername] = useState("");
	const [agreed, setAgreed] = useState(false);
	const [step, setStep] = useState<"email" | "code" | "register" | null>("email");
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const goBack = () => {
		setStep(null);
		router.back();
	};

	// Шаг 1: Отправка email для получения кода
	const handleEmailSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		const result = await signIn("send-code", {
			email,
			redirect: false,
		});

		// При успешной отправке кода провайдер выбрасывает ошибку "Please enter the confirmation code sent to your email"
		if (result?.error === "Please enter the confirmation code sent to your email") {
			setStep("code");
		} else {
			setError(result?.error || "Failed to send code");
		}
	};

	// Шаг 2: Подтверждение кода
	const handleCodeSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		const result = await signIn("confirm", {
			email,
			code,
			redirect: false,
		});

		if (result?.ok) {
			router.push(routes.home()); // Успешный вход
		} else if (result?.error === "User does not exist, please register") {
			setStep("register");
		} else {
			setError(result?.error || "Invalid code");
		}
	};

	// Повторная отправка кода
	const handleResend = async () => {
		setError(null);
		const result = await signIn("send-code", {
			email,
			redirect: false,
		});
		if (result?.error && result.error !== "Please enter the confirmation code sent to your email") {
			setError(result.error);
		}
	};

	// Шаг 3: Регистрация
	const handleRegisterSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		const result = await signIn("register", {
			email,
			code,
			username,
			redirect: false,
		});

		if (result?.ok) {
			router.push(routes.home()); // Успешная регистрация и вход
		} else {
			setError(result?.error || "Registration failed");
		}
	};

	return (
		<div className={styles.LoginPage}>
			<div className={styles.logo}>
				<Icons.Logo width={45} height={35} />
				<h1>Any Parts</h1>
			</div>

			{step === "email" && (
				<LoginModal
					email={email}
					setEmail={setEmail}
					agreed={agreed}
					setAgreed={setAgreed}
					error={error}
					onSubmit={handleEmailSubmit}
					back={goBack}
				/>
			)}

			{step === "code" && (
				<ConfirmEmailModal
					email={email}
					code={code}
					setCode={setCode}
					error={error}
					onSubmit={handleCodeSubmit}
					onResend={handleResend}
					onChangeEmail={() => setStep("email")}
					back={() => setStep("email")}
				/>
			)}

			{step === "register" && (
				<RegisterModal
					email={email}
					username={username}
					setUsername={setUsername}
					error={error}
					onSubmit={handleRegisterSubmit}
					onChangeEmail={() => setStep("email")}
					back={() => setStep("code")}
				/>
			)}
		</div>
	);
}
