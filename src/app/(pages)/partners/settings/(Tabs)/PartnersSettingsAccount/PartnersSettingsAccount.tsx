"use client";

import React, { useState } from "react";
import styles from "./PartnersSettingsAccount.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editSchema } from "@/schemas/auth";
import { useUserStore } from "@/entities/user/useUserStore";
import { Button } from "@components/ui/button";
import { Icons } from "@/assets/svg/svg";
import { TEditSchema } from "@/types/User";
import LogOutModal from "@/widgets/modals/customer/auth/logout/LogOut";

export default function PartnersSettingsAccount() {
	const { user, updateUser } = useUserStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TEditSchema>({
		resolver: zodResolver(editSchema),
		defaultValues: {
			username: user?.username ?? "",
			phone: user?.phone ?? "",
		},
	});

	const [isUsernameDisabled, setIsUsernameDisabled] = useState(true);
	const [isPhoneDisabled, setIsPhoneDisabled] = useState(true);
	const [isLogOutOpen, setIsLogOutOpen] = useState(false);

	const onError = (formErrors: any) => {
		console.log("Ошибки от zod:", formErrors);
	};

	const onSubmitName = async (data: TEditSchema) => {
		await updateUser({ username: data.username });
		setIsUsernameDisabled(true);
	};

	const onSubmitPhone = async (data: TEditSchema) => {
		await updateUser({ phone: data.phone });
		setIsPhoneDisabled(true);
	};

	return (
		<div className={styles.PartnersSettingsAccount}>
			<div className={styles.inputGroup}>
				<label htmlFor="userId" className={styles.label}>
					Any Parts ID
				</label>
				<input
					id="userId"
					type="text"
					value={String(user?.id)}
					className={styles.input}
					disabled
				/>
			</div>

			{/* Username */}
			<div className={styles.inputGroup}>
				<label htmlFor="username" className={styles.label}>
					Имя пользователя
				</label>
				<div className={styles.fieldWithButton}>
					<input
						id="username"
						type="text"
						placeholder="Введите имя пользователя"
						{...register("username")}
						className={styles.input}
						disabled={isUsernameDisabled}
					/>
					{isUsernameDisabled ? (
						<Button
							variant="link"
							className="p-0"
							onClick={() => setIsUsernameDisabled(false)}
						>
							Изменить
						</Button>
					) : (
						<Button
							variant="link"
							className="p-0"
							onClick={handleSubmit(onSubmitName, onError)}
						>
							Сохранить
						</Button>
					)}
				</div>
				{errors.username && (
					<p className={styles.errorText}>{errors.username.message}</p>
				)}
			</div>

			{/* Phone */}
			<div className={styles.inputGroup}>
				<label htmlFor="phone" className={styles.label}>
					Телефон
				</label>
				<div className={styles.fieldWithButton}>
					<input
						id="phone"
						type="text"
						placeholder="Введите номер телефона"
						{...register("phone")}
						className={styles.input}
						disabled={isPhoneDisabled}
					/>
					{isPhoneDisabled ? (
						<Button
							variant="link"
							className="p-0"
							onClick={() => setIsPhoneDisabled(false)}
						>
							Изменить
						</Button>
					) : (
						<Button
							variant="link"
							className="p-0"
							onClick={handleSubmit(onSubmitPhone, onError)}
						>
							Сохранить
						</Button>
					)}
				</div>
				{errors.phone && (
					<p className={styles.errorText}>{errors.phone.message}</p>
				)}
			</div>

			<Button
				className={"w-fit p-5 rounded-xl"}
				variant={"outline"}
				onClick={() => setIsLogOutOpen(true)}
			>
				<Icons.Logout width={20} height={20} />
				Выйти из аккаунта
			</Button>

			{isLogOutOpen && <LogOutModal onClose={() => setIsLogOutOpen(false)} />}
		</div>
	);
}
