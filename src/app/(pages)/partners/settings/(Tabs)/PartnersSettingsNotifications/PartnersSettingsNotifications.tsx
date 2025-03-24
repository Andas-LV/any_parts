import React, { useState } from "react";
import styles from "./PartnersSettingsNotifications.module.css";
import { useUserStore } from "@/entities/user/useUserStore";
import { useForm } from "react-hook-form";
import { TNotificationEditSchema } from "@/types/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { notificationEditSchema } from "@/schemas/auth";
import { Button } from "@components/ui/button";

export default function PartnersSettingsNotifications() {
	const { user, updateUser } = useUserStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TNotificationEditSchema>({
		resolver: zodResolver(notificationEditSchema),
		defaultValues: {
			email: user?.email ?? "",
			phone: user?.phone ?? "",
		},
	});

	const [isUsernameDisabled, setIsUsernameDisabled] = useState(true);
	const [isPhoneDisabled, setIsPhoneDisabled] = useState(true);

	const onError = (formErrors: any) => {
		console.log("Ошибки от zod:", formErrors);
	};

	const onSubmitName = async (data: TNotificationEditSchema) => {
		await updateUser({ email: data.email });
		setIsUsernameDisabled(true);
	};

	const onSubmitPhone = async (data: TNotificationEditSchema) => {
		await updateUser({ phone: data.phone });
		setIsPhoneDisabled(true);
	};

	return (
		<div className={styles.PartnersSettingsNotifications}>
			{/* Phone */}
			<div className={styles.inputGroup}>
				<h2>SMS</h2>
				<p>Добавьте телефон, с помощью которого мы сможем с вами связаться</p>

				<div className={styles.fieldWithButton}>
					<input
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

			{/* Email */}
			<div className={styles.inputGroup}>
				<h2>Почта</h2>
				<p>Укажите контактную почту для получения уведомлений</p>

				<div className={styles.fieldWithButton}>
					<input
						type="text"
						placeholder="Почта"
						{...register("email")}
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
				{errors.email && (
					<p className={styles.errorText}>{errors.email.message}</p>
				)}
			</div>
		</div>
	);
}
