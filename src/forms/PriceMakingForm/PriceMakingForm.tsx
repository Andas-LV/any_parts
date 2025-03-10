import styles from "./PriceMakingForm.module.css";
import { Button } from "@components/ui/button";
import { useForm } from "react-hook-form";
import { TPriceMakingSchema } from "@/types/CreateItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { priceMakingSchema } from "@/schemas/createItem";
import { useCreateItemStore } from "@/entities/items/useCreateItemStore";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	examplePriceMakingColors,
	examplePriceMakingSizes,
} from "@/exampleData/examplePriceMakingData";

interface PriceMakingFormProps {
	nextStep?: () => void;
	previousStep?: () => void;
}

export default function PriceMakingForm({
	nextStep,
	previousStep,
}: PriceMakingFormProps) {
	const { config, setPriceMaking } = useCreateItemStore();

	const colors = config?.colors || examplePriceMakingColors;
	const sizes = config?.sizes || examplePriceMakingSizes;

	const defaultPriceMakingData = {
		colors: colors.map((color) => ({
			...color,
			sizes: sizes.map((size) => ({
				...size,
				price: 0,
				discountPrice: 0,
				barcode: "",
			})),
		})),
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TPriceMakingSchema>({
		resolver: zodResolver(priceMakingSchema),
		defaultValues: defaultPriceMakingData,
	});

	const onSubmit = (data: TPriceMakingSchema) => {
		console.log("Данные формы:", data);
		setPriceMaking(data);
		if (nextStep) {
			nextStep();
		}
	};

	const onError = (formErrors: any) => {
		console.log("Ошибки от zod:", formErrors);
	};

	return (
		<div className={styles.PriceMakingForm}>
			<form
				id="create-item-price"
				onSubmit={handleSubmit(onSubmit, onError)}
				className={styles.form}
			>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Цвет</TableHead>
							<TableHead>Размер</TableHead>
							<TableHead>Цена *</TableHead>
							<TableHead>Цена со скидкой</TableHead>
							<TableHead>Штрихкод товара</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{colors.map((color, colorIndex) =>
							sizes.map((size, sizeIndex) => (
								<TableRow key={`${colorIndex}-${sizeIndex}`}>
									{sizeIndex === 0 && (
										<TableCell rowSpan={sizes.length}>
											<div className={styles.colorCell}>
												{color.colorName}
												{color.photo && (
													<img
														src={color.photo}
														alt={color.colorName}
														className={styles.colorImage}
													/>
												)}
											</div>
										</TableCell>
									)}

									<TableCell>{size.sizeName}</TableCell>

									{/* Цена */}
									<TableCell>
										<div className={styles.inputWrapper}>
											<input
												placeholder="Цена"
												type="text"
												{...register(
													`colors.${colorIndex}.sizes.${sizeIndex}.price`,
													{
														valueAsNumber: true,
													},
												)}
											/>
											{errors.colors?.[colorIndex]?.sizes?.[sizeIndex]
												?.price && (
												<p className={styles.error}>
													{
														errors.colors[colorIndex].sizes[sizeIndex].price!
															.message
													}
												</p>
											)}
										</div>
									</TableCell>

									{/* Цена до скидки */}
									<TableCell>
										<div className={styles.inputWrapper}>
											<input
												placeholder="Цена"
												type="text"
												{...register(
													`colors.${colorIndex}.sizes.${sizeIndex}.discountPrice`,
													{
														valueAsNumber: true,
													},
												)}
											/>
											{errors.colors?.[colorIndex]?.sizes?.[sizeIndex]
												?.discountPrice && (
												<p className={styles.error}>
													{
														errors.colors[colorIndex].sizes[sizeIndex]
															.discountPrice!.message
													}
												</p>
											)}
										</div>
									</TableCell>

									{/* Штрихкод товара */}
									<TableCell>
										<div className={styles.inputWrapper}>
											<input
												placeholder="Код"
												type="text"
												{...register(
													`colors.${colorIndex}.sizes.${sizeIndex}.barcode`,
												)}
											/>
											{errors.colors?.[colorIndex]?.sizes?.[sizeIndex]
												?.barcode && (
												<p className={styles.error}>
													{
														errors.colors[colorIndex].sizes[sizeIndex].barcode!
															.message
													}
												</p>
											)}
										</div>
									</TableCell>
								</TableRow>
							)),
						)}
					</TableBody>
				</Table>
			</form>

			<div className={styles.actions}>
				<Button variant="secondary" onClick={() => reset()}>
					Очистить
				</Button>
				<div className={styles.stepsButtons}>
					<Button variant="secondary" onClick={previousStep}>
						Назад
					</Button>
					<Button form={"create-item-price"} type="submit">
						Далее
					</Button>
				</div>
			</div>
		</div>
	);
}
