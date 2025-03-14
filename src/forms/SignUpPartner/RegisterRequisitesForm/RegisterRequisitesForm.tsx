import React from "react";
import styles from "./RegisterRequisitesForm.module.css";
import { Button } from "@components/ui/button";
import { Controller, useForm } from "react-hook-form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@components/ui/select";
import { countryCodes } from "@/constants/countryCodes";
import { usePartnersSignUpStore } from "@/entities/partners/fullSignUp/usePartnersSignUpStore";
import { TRequisites } from "@/types/partners/signUp";
import { zodResolver } from "@hookform/resolvers/zod";
import { requisitesSchema } from "@/schemas/partners";

interface RegisterRequisitesFormProps {
	nextStep?: () => void;
	previousStep?: () => void;
}

export default function RegisterRequisitesForm({
	nextStep,
	previousStep,
}: RegisterRequisitesFormProps) {
	const { setRequisites } = usePartnersSignUpStore();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<TRequisites>({
		resolver: zodResolver(requisitesSchema),
		mode: "onSubmit",
	});

	const onFormSubmit = (data: TRequisites) => {
		setRequisites(data);
		console.log("TRequisites:", data);

		if (nextStep) {
			nextStep();
		}
	};

	const onError = (formErrors: any) => {
		console.log("Ошибки от zod:", formErrors);
	};

	return (
		<div className={styles.RegisterRequisitesForm}>
			<form
				id="requisites"
				className={styles.form}
				onSubmit={handleSubmit(onFormSubmit, onError)}
			>
				<div className={styles.inputRow}>
					<input
						type="text"
						placeholder="Расчётный счёт"
						className={styles.nameInput}
						{...register("account")}
					/>

					<div className={styles.selectWrapper}>
						<Controller
							name="currency"
							control={control}
							defaultValue={undefined}
							render={({ field: { onChange, value } }) => (
								<Select value={value} onValueChange={onChange}>
									<SelectTrigger className={styles.nameInput}>
										<SelectValue placeholder="Валюта" />
									</SelectTrigger>
									<SelectContent className={styles.selectContent}>
										{countryCodes.map((country) => (
											<SelectItem
												key={country.currency}
												value={country.currency}
											>
												{country.currency}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>
					</div>
				</div>

				{errors.account && (
					<span className={styles.error}>{errors.account.message}</span>
				)}

				{errors.currency && (
					<span className={styles.error}>{errors.currency.message}</span>
				)}

				<input
					type="text"
					placeholder="SWIFT"
					className={styles.nameInput}
					{...register("swift")}
				/>
				{errors.swift && (
					<span className={styles.error}>{errors.swift.message}</span>
				)}

				<input
					type="text"
					placeholder="Название банка"
					className={styles.nameInput}
					{...register("bankName")}
				/>
				{errors.bankName && (
					<span className={styles.error}>{errors.bankName.message}</span>
				)}

				<div className={styles.inputRow}>
					<input
						type="text"
						placeholder="Город банка"
						className={styles.nameInput}
						{...register("bankCity")}
					/>

					<input
						type="text"
						placeholder="Адрес банка"
						className={styles.nameInput}
						{...register("bankAddress")}
					/>
				</div>

				{errors.bankCity && (
					<span className={styles.error}>{errors.bankCity.message}</span>
				)}

				{errors.bankAddress && (
					<span className={styles.error}>{errors.bankAddress.message}</span>
				)}
			</form>

			<div className={styles.stepsButtons}>
				<Button variant={"secondary"} onClick={previousStep}>
					Назад
				</Button>
				<Button form={"requisites"} type="submit">
					Далее
				</Button>
			</div>
		</div>
	);
}
