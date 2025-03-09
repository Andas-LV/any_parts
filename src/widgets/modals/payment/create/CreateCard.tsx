"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./createCard.module.css";
import { Icons } from "@/assets/svg";
import { usePaymentStore } from "@/entities/payment/usePaymentStore";
import ModalsLayout from "@/layouts/modalLayout/layout";
import React, { useState } from "react";
import { cardSchema } from "@/schemas/payment";
import { useToast } from "@/hooks/use-toast";

const CreateCard = ({
	onClose,
	onPrev,
}: {
	onClose: () => void;
	onPrev: () => void;
}) => {
	const { registerCard, isLoading, error } = usePaymentStore();
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(cardSchema),
		defaultValues: { cardId: "", expires: "", cvc: "" },
	});

	const { toast } = useToast();

	const expires = watch("expires");
	const [visibleCvc, setVisibleCvc] = useState("");

	const handleExpiresChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value.replace(/\D/g, "").slice(0, 4);
		if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
		setValue("expires", value);
	};

	const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;

		if (input.length < visibleCvc.length) {
			const newValue = visibleCvc.slice(0, -1);
			setVisibleCvc(newValue);
			setValue("cvc", newValue);
			return;
		}

		const lastChar = input.slice(-1);

		if (/^\d$/.test(lastChar) && visibleCvc.length < 3) {
			const newValue = visibleCvc + lastChar;
			setVisibleCvc(newValue);
			setValue("cvc", newValue);
		}
	};

	const onSubmit = async (data: z.infer<typeof cardSchema>) => {
		await registerCard({
			cardId: Number(data.cardId),
			expires: data.expires,
			cvc: Number(data.cvc),
		});
		if (!error) onClose();

		toast({
			done: true,
			variant: "success",
			description: "Карта успешно привязана.",
		});
	};

	return (
		<ModalsLayout title="Привязка карты" back={onPrev} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.modalContent}>
				<input
					type="text"
					placeholder="Номер карты"
					{...register("cardId")}
					className={styles.input}
				/>
				{errors.cardId && (
					<p className={styles.error}>{errors.cardId.message}</p>
				)}

				<div className={styles.inputRow}>
					<input
						type="text"
						placeholder="ММ/ГГ"
						value={expires}
						onChange={handleExpiresChange}
						className={styles.input}
						maxLength={5}
					/>
					<input
						type="text"
						placeholder="CVV/CVC"
						value={"*".repeat(visibleCvc.length)}
						onChange={handleCvcChange}
						className={styles.input}
						maxLength={3}
					/>
				</div>
				{errors.expires && (
					<p className={styles.error}>{errors.expires.message}</p>
				)}
				{errors.cvc && <p className={styles.error}>{errors.cvc.message}</p>}

				{error && <p className={styles.error}>{error.toString()}</p>}

				<button
					type="submit"
					disabled={isLoading}
					className={styles.submitButton}
				>
					{isLoading ? "Загрузка..." : "Привязать"}
				</button>

				<p className={styles.securityInfo}>
					<Icons.Shield /> Данные карты надежно защищены
				</p>
			</form>
		</ModalsLayout>
	);
};

export default CreateCard;
