"use client";

import React, { useState, useEffect } from "react";
import styles from "./GeneralInfoForm.module.css";
import { Button } from "@components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generalInfoSchema } from "@/schemas/createItem";
import { countryCodes } from "@/constants/countryCodes";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@components/ui/select";
import { TGeneralInfoSchema } from "@/types/items/CreateItem";
import { Icons } from "@/assets/svg";
import { useCreateItemStore } from "@/entities/partners/createItem/useCreateItemStore";

interface GeneralInfoFormProps {
	nextStep?: () => void;
}

export default function GeneralInfoForm({ nextStep }: GeneralInfoFormProps) {
	const { setGeneralInfo } = useCreateItemStore();

	const [images, setImages] = useState<(File | null)[]>(Array(15).fill(null));

	const {
		register,
		control,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm<TGeneralInfoSchema>({
		resolver: zodResolver(generalInfoSchema),
		mode: "onChange",
	});

	useEffect(() => {
		const imageUrls = images
			.filter((file) => file !== null)
			.map((file) => URL.createObjectURL(file!));
		setValue("images", imageUrls);
	}, [images, setValue]);

	const handleFileChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setImages((prev) => {
				const updated = [...prev];
				updated[index] = file;
				return updated;
			});
		}
	};

	const handleRemoveImage = (
		e: React.MouseEvent<HTMLButtonElement>,
		index: number,
	) => {
		e.preventDefault();
		e.stopPropagation();
		setImages((prev) => {
			const updated = [...prev];
			updated[index] = null;
			return updated;
		});
	};

	const onFormSubmit = (data: TGeneralInfoSchema) => {
		// ЛОГИКА АККУМУЛЯЦИИ
		setGeneralInfo(data);
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
		setImages(Array(15).fill(null));
	};

	return (
		<form
			id="create-item-first"
			className={styles.form}
			onSubmit={handleSubmit(onFormSubmit, onError)}
		>
			{/* ===== Поля формы ===== */}
			<input
				type="text"
				placeholder="Название товара"
				className={styles.nameInput}
				{...register("productName")}
			/>
			{errors.productName && (
				<span className={styles.error}>{errors.productName.message}</span>
			)}

			<div className={styles.selectWrapper}>
				<Controller
					name="category"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<Select value={value} onValueChange={onChange}>
							<SelectTrigger className={styles.nameInput}>
								<SelectValue placeholder="Категория" />
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
			{errors.category && (
				<span className={styles.error}>{errors.category.message}</span>
			)}

			<div className={styles.selectWrapper}>
				<Controller
					name="type"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<Select value={value} onValueChange={onChange}>
							<SelectTrigger className={styles.nameInput}>
								<SelectValue placeholder="Тип" />
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
			{errors.type && (
				<span className={styles.error}>{errors.type.message}</span>
			)}

			<input
				type="text"
				placeholder="Артикул"
				className={styles.nameInput}
				{...register("article")}
			/>
			{errors.article && (
				<span className={styles.error}>{errors.article.message}</span>
			)}

			<div className={styles.selectWrapper}>
				<Controller
					name="currency"
					control={control}
					defaultValue={undefined}
					render={({ field: { onChange, value } }) => (
						<Select value={value} onValueChange={onChange}>
							<SelectTrigger className={styles.nameInput}>
								<SelectValue placeholder="Валюта товара" />
							</SelectTrigger>
							<SelectContent>
								{countryCodes.map((country) => (
									<SelectItem key={country.value} value={country.currency}>
										{country.currency}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					)}
				/>
			</div>
			{errors.currency && (
				<span className={styles.error}>{errors.currency.message}</span>
			)}

			<div className={styles.selectWrapper}>
				<input
					type="text"
					placeholder="Название бренда"
					className={styles.nameInput}
					{...register("brand")}
				/>
				<p>
					Нет вашего?
					<Button className={styles.link} variant="link">
						Добавьте в список
					</Button>
					(по умолчанию нет бренда)
				</p>
			</div>
			{errors.brand && (
				<span className={styles.error}>{errors.brand.message}</span>
			)}

			{/* ===== Блок изображений ===== */}
			<div className={styles.imagesWrapper}>
				<div className={styles.imagesHeader}>
					<div>
						<h2>Изображения</h2>
						<span className={styles.imagesAmount}>
							{images.filter((img) => img !== null).length}/15
						</span>
					</div>
					<Button className={styles.addPhotoBtn} variant="outline">
						Добавить фото
						<input
							type="file"
							accept="image/*, video/*"
							className={styles.fileInput}
							onChange={(e) => handleFileChange(e, 0)}
						/>
					</Button>
				</div>

				<div className={styles.images}>
					{/* ===== Основной слот (index = 0) ===== */}
					<label className={styles.mainImage}>
						{images[0] ? (
							<div className={styles.uploadedWrapper}>
								<img
									src={URL.createObjectURL(images[0]!)}
									alt="preview"
									className={styles.uploadedMedia}
								/>
								<button
									type="button"
									className={styles.removeButton}
									onClick={(e) => handleRemoveImage(e, 0)}
								>
									✕
								</button>
							</div>
						) : (
							<div className={styles.emptyPlaceholder}>
								<Icons.CameraPlus width={40} height={40} />
							</div>
						)}
						<input
							type="file"
							accept="image/*, video/*"
							className={styles.fileInput}
							onChange={(e) => handleFileChange(e, 0)}
						/>
					</label>

					{/* ===== Остальные 14 слотов (index = 1..14) ===== */}
					<div className={styles.photoGrid}>
						{Array.from({ length: 14 }).map((_, i) => {
							const index = i + 1;
							return (
								<label key={index} className={styles.photoOption}>
									{images[index] ? (
										<div className={styles.uploadedWrapper}>
											<img
												src={URL.createObjectURL(images[index]!)}
												alt="preview"
												className={styles.uploadedMedia}
											/>
											<button
												type="button"
												className={styles.removeButton}
												onClick={(e) => handleRemoveImage(e, index)}
											>
												✕
											</button>
										</div>
									) : (
										<div className={styles.emptyPlaceholder}></div>
									)}
									<input
										type="file"
										accept="image/*, video/*"
										className={styles.fileInput}
										onChange={(e) => handleFileChange(e, index)}
									/>
								</label>
							);
						})}
					</div>
				</div>
			</div>

			{errors.images && (
				<span className={styles.error}>{errors.images.message}</span>
			)}

			<div className={styles.actions}>
				<Button variant="secondary" onClick={handleReset}>
					Очистить
				</Button>
				<Button form={"create-item-first"} type="submit">
					Далее
				</Button>
			</div>
		</form>
	);
}
