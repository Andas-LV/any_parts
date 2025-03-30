"use client";

import React, { useState } from "react";
import styles from "./DocumentForm.module.css";
import { Button } from "@components/ui/button";
import { usePartnersSignUpStore } from "@/entities/partners/fullSignUp/usePartnersSignUpStore";
import { useForm } from "react-hook-form";
import { TDocumentType } from "@/types/partners/signUp";
import { zodResolver } from "@hookform/resolvers/zod";
import { documentSchema } from "@/schemas/partners";
import { Icons } from "@/assets/svg/svg";

interface DocumentFormProps {
	nextStep?: () => void;
	previousStep?: () => void;
}

export default function DocumentForm({
	nextStep,
	previousStep,
}: DocumentFormProps) {
	const { setDocument } = usePartnersSignUpStore();
	const [fileInfo, setFileInfo] = useState<{
		name: string;
		size: string;
	} | null>(null);

	const {
		register,
		reset,
		formState: { errors },
	} = useForm<TDocumentType>({
		resolver: zodResolver(documentSchema),
	});

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files ? event.target.files[0] : null;
		if (file) {
			const fileSize = (file.size / 1024 / 1024).toFixed(2) + " MB";
			setFileInfo({
				name: file.name,
				size: fileSize,
			});
			setDocument({ document: file });
		}
	};

	const handleFileDelete = () => {
		setFileInfo(null);
		reset({ document: undefined });
		setDocument(null);
	};

	return (
		<div className={styles.DocumentForm}>
			<div className={styles.inputContainer}>
				<p>
					Загрузить уведомление о начале деятельности (Тип организации -
					название юридической формы)
				</p>

				<div className={styles.inputWrapper}>
					<div className={styles.iconWrapper}>
						{fileInfo ? (
							<Icons.TextFile width={32} height={32} />
						) : (
							<Icons.PaperClip width={32} height={32} />
						)}
					</div>

					{fileInfo ? (
						<div className={styles.inputText}>
							<p className={styles.fileName}>{fileInfo.name}</p>
							<p className={styles.fileSize}>{fileInfo.size}</p>
						</div>
					) : (
						<div className={styles.inputText}>
							<p className={styles.headerText}>Загрузите или перетащите файл</p>
							<p>
								Формат <span className={styles.formats}>JPG и PNG, PDF</span>.
								Размер - не больше 32 МБ.
							</p>
						</div>
					)}

					{fileInfo && (
						<div onClick={handleFileDelete} className={styles.deleteFile}>
							<Icons.Trash width={26} height={26} />
						</div>
					)}

					{!fileInfo && (
						<input
							type="file"
							accept="image/png, image/jpeg, application/pdf"
							className={styles.fileInput}
							{...register("document")}
							onChange={handleFileChange}
						/>
					)}
				</div>

				{errors.document && (
					<span className={styles.error}>{errors.document.message}</span>
				)}
			</div>

			<div className={styles.stepsButtons}>
				<Button variant={"secondary"} onClick={previousStep}>
					Назад
				</Button>
				<Button onClick={nextStep}>Далее</Button>
			</div>
		</div>
	);
}
