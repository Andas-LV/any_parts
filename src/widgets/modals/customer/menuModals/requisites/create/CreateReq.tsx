import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Icons } from "@/assets/svg/svg";
import ModalsLayout from "@/layouts/modalLayout/layout";
import { RequisiteValidatorSchema } from "@/schemas/requisite";
import { useRequisitesStore } from "@/entities/customer/requisites/useRequisitesStore";
import { countryCodes } from "@/constants/countryCodes";
import { RequisiteValidator } from "@/types/Requisites";

interface ICreateReq {
	onClose: () => void;
	onPrev: () => void;
	onNext: () => void;
}

const CreateReq = ({ onClose, onPrev, onNext }: ICreateReq) => {
	const { registerReq, isLoading, error } = useRequisitesStore();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<RequisiteValidator>({
		resolver: zodResolver(RequisiteValidatorSchema),
		defaultValues: {
			country: countryCodes[0].value,
			name: "",
			BIK: "",
			account: "",
			fullName: "",
		},
	});

	const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
	const [selectIsOpen, setSelectIsOpen] = useState(false);

	const { ref: countryRef, ...countryRest } = register("country");

	const handleCountrySelect = (country: (typeof countryCodes)[number]) => {
		setSelectedCountry(country);
		setValue("country", country.value, { shouldValidate: true });
		setSelectIsOpen(false);
	};

	const onSubmit = async (data: any) => {
		await registerReq(data);
		onNext();
	};

	return (
		<ModalsLayout title="Добавить реквизиты" back={onPrev} onClose={onClose}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col items-start gap-5 w-[550px] max-w-[800px]"
			>
				<div className="relative w-full">
					<div className="relative flex items-center w-full bg-[var(--brand-gray)] rounded-lg">
						<div
							className="flex items-center gap-2 pl-3 cursor-pointer h-[42px]"
							onClick={() => setSelectIsOpen(!selectIsOpen)}
						>
							<div className="w-6 h-6 rounded-full bg-white flex items-center justify-center overflow-hidden">
								<Image
									src={selectedCountry.flag}
									alt={selectedCountry.name}
									width={20}
									height={16}
									className="object-cover rounded-full"
								/>
							</div>
							<Icons.ArrowDown
								className={`w-4 h-4 transition-transform duration-200 ${selectIsOpen ? "rotate-180" : ""}`}
							/>
						</div>

						{/* Видимый input для отображения названия страны */}
						<input
							type="text"
							className="flex-1 bg-transparent pl-2 h-[42px] focus:outline-none"
							placeholder="Выберите страну банка"
							readOnly
							value={selectedCountry.name}
							onClick={() => setSelectIsOpen(!selectIsOpen)}
						/>

						{/* Скрытый input для хранения value страны */}
						<input type="hidden" {...countryRest} ref={countryRef} />

						{selectIsOpen && (
							<div className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg shadow-lg max-h-[200px] overflow-y-auto z-50">
								{countryCodes.map((country) => (
									<div
										key={country.value}
										className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
										onClick={() => handleCountrySelect(country)}
									>
										<div className="w-6 h-6 rounded-full bg-white flex items-center justify-center overflow-hidden">
											<Image
												src={country.flag}
												alt={country.name}
												width={20}
												height={16}
												className="object-cover"
											/>
										</div>
										<span>{country.name}</span>
									</div>
								))}
							</div>
						)}
					</div>
					{errors.country && (
						<p className="text-red-500 text-sm mt-1">
							{errors.country.message}
						</p>
					)}
				</div>

				<input
					type="text"
					placeholder="Название реквизитов"
					{...register("name")}
					className="w-full p-3 bg-[var(--brand-gray)] rounded-lg text-base focus:outline-none"
				/>
				{errors.name && (
					<p className="text-red-500 text-sm">{errors.name.message}</p>
				)}

				<input
					type="number"
					placeholder="БИК"
					{...register("BIK")}
					className="w-full p-3 bg-[var(--brand-gray)] rounded-lg text-base focus:outline-none"
				/>
				{errors.BIK && (
					<p className="text-red-500 text-sm">{errors.BIK.message}</p>
				)}

				<input
					type="number"
					placeholder="Счёт получателя"
					{...register("account")}
					className="w-full p-3 bg-[var(--brand-gray)] rounded-lg text-base focus:outline-none"
				/>
				{errors.account && (
					<p className="text-red-500 text-sm">{errors.account.message}</p>
				)}

				<input
					type="text"
					placeholder="ФИО"
					{...register("fullName")}
					className="w-full p-3 bg-[var(--brand-gray)] rounded-lg text-base focus:outline-none"
				/>
				{errors.fullName && (
					<p className="text-red-500 text-sm">{errors.fullName.message}</p>
				)}

				{error && <p className="text-red-500 text-sm">{error.toString()}</p>}

				<button
					type="submit"
					disabled={isLoading}
					className="w-full py-5 bg-[var(--brand-primary)] text-white rounded-2xl cursor-pointer text-base font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
				>
					{isLoading ? "Загрузка..." : "Добавить"}
				</button>
			</form>
		</ModalsLayout>
	);
};

export default CreateReq;
