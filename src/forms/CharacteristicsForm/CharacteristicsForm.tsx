import React from "react";
import styles from "./CharacteristicsForm.module.css";
import { Button } from "@components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { TCharacteristicsSchema } from "@/types/CreateItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { characteristicsSchema } from "@/schemas/createItem";
import { useCreateItemStore } from "@/entities/items/useCreateItemStore";
import { Textarea } from "@components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@components/ui/select";
import { countryCodes } from "@/constants/countryCodes";

interface CharacteristicsFormProps {
	nextStep?: () => void;
	previousStep?: () => void;
}

export default function CharacteristicsForm({
	nextStep,
	previousStep,
}: CharacteristicsFormProps) {
	const { setCharacteristics } = useCreateItemStore();

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<TCharacteristicsSchema>({
		resolver: zodResolver(characteristicsSchema),
	});

	const onFormSubmit = (data: TCharacteristicsSchema) => {
		// ЛОГИКА АККУМУЛЯЦИИ
		setCharacteristics(data);
		console.log("Форма отправлена:", data);
		if (nextStep) {
			nextStep();
		}
	};

	const onError = (formErrors: any) => {
		console.log("Ошибки от zod:", formErrors);
	};

	const handleReset = () => {
		reset();
	};

	return (
		<div className={styles.CharacteristicsForm}>
			<form
				id="create-item-second"
				className={styles.form}
				onSubmit={handleSubmit(onFormSubmit, onError)}
			>
				<div className={styles.section}>
					<h3>Описание</h3>
					<Textarea
						{...register("description")}
						className={styles.textarea}
						placeholder="Добавьте описание товара"
					/>
					{errors.description && (
						<span className={styles.error}>{errors.description.message}</span>
					)}
				</div>

				<div className={styles.section}>
					<h3>Габариты упаковки</h3>
					<div className={styles.sizesRow}>
						<input
							type="number"
							placeholder="Длина (см)"
							className={styles.nameInput}
							{...register("packageLength", { valueAsNumber: true })}
						/>
						<input
							type="number"
							placeholder="Ширина (см)"
							className={styles.nameInput}
							{...register("packageWidth", { valueAsNumber: true })}
						/>

						<input
							type="number"
							placeholder="Высота (см)"
							className={styles.nameInput}
							{...register("packageHeight", { valueAsNumber: true })}
						/>
					</div>

					{errors.packageHeight && (
						<span className={styles.error}>{errors.packageHeight.message}</span>
					)}

					<input
						type="number"
						placeholder="Вес товара с упаковкой (г)"
						className={styles.nameInput}
						{...register("weight", { valueAsNumber: true })}
					/>
					{errors.weight && (
						<span className={styles.error}>{errors.weight.message}</span>
					)}
				</div>

				<div className={styles.section}>
					<h3>Дополнительные характеристики</h3>
					<input
						type="text"
						placeholder="Материал"
						className={styles.nameInput}
						{...register("material")}
					/>
					{errors.material && (
						<span className={styles.error}>{errors.material.message}</span>
					)}

					<div className={styles.selectWrapper}>
						<Controller
							name="manuFactored"
							control={control}
							defaultValue={undefined}
							render={({ field: { onChange, value } }) => (
								<Select value={value} onValueChange={onChange}>
									<SelectTrigger className={styles.nameInput}>
										<SelectValue placeholder="Страна-изготовитель" />
									</SelectTrigger>
									<SelectContent>
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
					{errors.manuFactored && (
						<span className={styles.error}>{errors.manuFactored.message}</span>
					)}
					<input
						type="text"
						placeholder="Особенности"
						className={styles.nameInput}
						{...register("features")}
					/>
					{errors.features && (
						<span className={styles.error}>{errors.features.message}</span>
					)}
				</div>
			</form>

			<div className={styles.actions}>
				<Button variant="secondary" onClick={handleReset}>
					Очистить
				</Button>
				<div className={styles.stepsButtons}>
					<Button variant={"secondary"} onClick={previousStep}>
						Назад
					</Button>
					<Button form={"create-item-second"} type="submit">
						Далее
					</Button>
				</div>
			</div>
		</div>
	);
}
