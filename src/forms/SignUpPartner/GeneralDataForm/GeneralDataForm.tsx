import React from "react";
import styles from "./GeneralDataForm.module.css";
import { usePartnersSignUpStore } from "@/entities/partners/fullSignUp/usePartnersSignUpStore";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkDataSchema } from "@/schemas/partners";
import { TCheckData } from "@/types/partners/signUp";
import { Button } from "@components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@components/ui/select";
import { organizationTypes } from "@/types/Auth";

interface GeneralDataFormProps {
	nextStep?: (() => void) | undefined;
}

export default function GeneralDataForm({ nextStep }: GeneralDataFormProps) {
	const { setCheckData } = usePartnersSignUpStore();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<TCheckData>({
		resolver: zodResolver(checkDataSchema),
		mode: "onChange",
	});

	const onFormSubmit = (data: TCheckData) => {
		setCheckData(data);
		console.log("data 1:", data);

		if (nextStep) {
			nextStep();
		}
	};

	const onError = (formErrors: any) => {
		console.log("Ошибки от zod:", formErrors);
	};

	return (
		<div className={styles.GeneralDataForm}>
			<form
				id="generalData"
				className={styles.form}
				onSubmit={handleSubmit(onFormSubmit, onError)}
			>
				<input
					type="text"
					placeholder="Название организации"
					className={styles.nameInput}
					{...register("organizationName")}
				/>
				{errors.organizationName && (
					<span className={styles.error}>
						{errors.organizationName.message}
					</span>
				)}

				<input
					type="text"
					placeholder="Налоговый номер"
					className={styles.nameInput}
					{...register("taxNumber")}
				/>
				{errors.taxNumber && (
					<span className={styles.error}>{errors.taxNumber.message}</span>
				)}

				<div className={styles.selectWrapper}>
					<Controller
						name="organizationType"
						control={control}
						defaultValue={undefined}
						render={({ field: { onChange, value } }) => (
							<Select value={value} onValueChange={onChange}>
								<SelectTrigger className={styles.nameInput}>
									<SelectValue placeholder="Тип организации" />
								</SelectTrigger>
								<SelectContent>
									{organizationTypes.map((org) => (
										<SelectItem key={org.value} value={org.value}>
											{org.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					/>
				</div>
				{errors.organizationType && (
					<span className={styles.error}>
						{errors.organizationType.message}
					</span>
				)}
			</form>

			<Button form={"generalData"} type="submit">
				Далее
			</Button>
		</div>
	);
}
