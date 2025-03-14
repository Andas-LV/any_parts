import React from "react";
import styles from "./RegisterAddressForm.module.css";
import { usePartnersSignUpStore } from "@/entities/partners/fullSignUp/usePartnersSignUpStore";
import { Controller, useForm } from "react-hook-form";
import { TAddressRegister } from "@/types/partners/signUp";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressRegisterSchema } from "@/schemas/partners";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@components/ui/select";
import { Button } from "@components/ui/button";
import { countryCodes } from "@/constants/countryCodes";

interface RegisterAddressFormProps {
	nextStep?: () => void;
	previousStep?: () => void;
}

export default function RegisterAddressForm({
	nextStep,
	previousStep,
}: RegisterAddressFormProps) {
	const { setAddressRegister } = usePartnersSignUpStore();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<TAddressRegister>({
		resolver: zodResolver(addressRegisterSchema),
		mode: "onChange",
	});

	const onFormSubmit = (data: TAddressRegister) => {
		setAddressRegister(data);
		console.log("data 2:", data);

		if (nextStep) {
			nextStep();
		}
	};

	const onError = (formErrors: any) => {
		console.log("Ошибки от zod:", formErrors);
	};

	return (
		<div className={styles.RegisterAddressForm}>
			<form
				id="address-form"
				className={styles.form}
				onSubmit={handleSubmit(onFormSubmit, onError)}
			>
				<div className={styles.selectWrapper}>
					<Controller
						name="country"
						control={control}
						defaultValue={undefined}
						render={({ field: { onChange, value } }) => (
							<Select value={value} onValueChange={onChange}>
								<SelectTrigger className={styles.nameInput}>
									<SelectValue placeholder="Страна" />
								</SelectTrigger>
								<SelectContent className={styles.selectContent}>
									{countryCodes.map((country) => (
										<SelectItem key={country.value} value={country.value}>
											{country.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					/>
				</div>
				{errors.country && (
					<span className={styles.error}>{errors.country.message}</span>
				)}

				<input
					type="text"
					placeholder="Город"
					className={styles.nameInput}
					{...register("city")}
				/>
				{errors.city && (
					<span className={styles.error}>{errors.city.message}</span>
				)}

				<input
					type="text"
					placeholder="Адрес"
					className={styles.nameInput}
					{...register("address")}
				/>
				{errors.address && (
					<span className={styles.error}>{errors.address.message}</span>
				)}
			</form>

			<div className={styles.stepsButtons}>
				<Button variant={"secondary"} onClick={previousStep}>
					Назад
				</Button>
				<Button form={"address-form"} type="submit">
					Далее
				</Button>
			</div>
		</div>
	);
}
