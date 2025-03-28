import ModalsLayout from "@/layouts/modalLayout/layout";
import styles from "./edit.module.css";
import { Button } from "@components/ui/button";
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import { useUserStore } from "@/entities/user/useUserStore";
import { editSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MaleChoice } from "@/types/User";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { countryCodes } from "@/constants/countryCodes";
import Image from "next/image";
import { Icons } from "@/assets/svg";

export default function EditModal({ onClose }: { onClose: () => void }) {
	const { user, updateUser, isLoading, error } = useUserStore();
	const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
	const [selectIsOpen, setSelectIsOpen] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(editSchema),
		defaultValues: {
			username: user?.username ?? "",
			phone: user?.phone ?? "",
			male: user?.male ?? "Male",
		},
	});

	const onSubmit = async (data: z.infer<typeof editSchema>) => {
		await updateUser(data);
		console.log(data);
		onClose();
	};

	return (
		<ModalsLayout title="Личные данные" onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<div className={styles.inputsWrapper}>
					<input
						type="text"
						placeholder="User_name"
						{...register("username")}
						className={styles.input}
					/>
					{errors.username && (
						<p className={styles.errorText}>{errors.username.message}</p>
					)}

					<div className={styles.inputWrapper}>
						<DropdownMenu onOpenChange={setSelectIsOpen}>
							<div className={styles.inputContainer}>
								<DropdownMenuTrigger asChild>
									<div className={styles.countrySelector}>
										<Image
											src={selectedCountry.flag}
											alt={selectedCountry.name}
											width={20}
											height={16}
											className={styles.flag}
										/>

										<Icons.ArrowDown
											className={`${styles.arrowIcon} ${selectIsOpen ? styles.rotated : ""}`}
										/>
									</div>
								</DropdownMenuTrigger>

								<input
									type="text"
									placeholder="+7 777 777-45-60"
									{...register("phone")}
									className={styles.input}
								/>
							</div>

							<DropdownMenuContent className={styles.dropdownMenu}>
								{countryCodes.map((country) => (
									<DropdownMenuItem
										key={country.name}
										onClick={() => setSelectedCountry(country)}
									>
										<Image
											src={country.flag}
											alt={country.name}
											width={20}
											height={16}
											className={styles.flag}
										/>
										{country.name}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					{errors.phone && (
						<p className={styles.errorText}>{errors.phone.message}</p>
					)}
				</div>

				<div className={styles.genderWrapper}>
					<span className={styles.genderLabel}>Пол:</span>
					<RadioGroup
						value={watch("male")}
						onValueChange={(value) => setValue("male", value as MaleChoice)}
						className={styles.radioGroup}
					>
						<div className={styles.radioItem}>
							<RadioGroupItem value="Male" id="male" />
							<label htmlFor="male">Мужской</label>
						</div>
						<div className={styles.radioItem}>
							<RadioGroupItem value="Female" id="female" />
							<label htmlFor="female">Женский</label>
						</div>
					</RadioGroup>
				</div>

				<Button
					type="submit"
					className={styles.submitButton}
					disabled={isLoading}
				>
					Сохранить
				</Button>
				{error && <p className={styles.errorText}>{error}</p>}
			</form>
		</ModalsLayout>
	);
}
