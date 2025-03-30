import styles from "./refundFullInfo.module.css";
import ModalsLayout from "@/layouts/modalLayout/layout";
import React, { useState } from "react";
import { Button } from "@components/ui/button";
import { useItemsStore } from "@/entities/items/useItemsStore";
import { PHOTO_OPTIONS, RETURN_REASONS } from "@/constants/item";
import { Textarea } from "@components/ui/textarea";
import { Icons } from "@/assets/svg/svg";
import Loading from "@components/Loading";
import RequestSended from "@/widgets/modals/requestSended/requestSended";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";

export default function RefundFullInfo({
	onClose,
	onNext,
	onPrev,
}: {
	onClose: () => void;
	onNext: () => void;
	onPrev: () => void;
}) {
	const { currentItem } = useItemsStore();
	const { user } = useUserStore();

	const [selectedReason, setSelectedReason] = useState("");
	const [uploadedFiles, setUploadedFiles] = useState<{
		[key: number]: File | null;
	}>({});
	const [description, setDescription] = useState("");
	const [showAfterCreate, setShowAfterCreate] = useState(false);

	if (!currentItem) {
		return <Loading />;
	}

	const item = currentItem;

	const handleFileUpload = (
		e: React.ChangeEvent<HTMLInputElement>,
		optionId: number,
	) => {
		e.stopPropagation();
		if (e.target.files && e.target.files[0]) {
			setUploadedFiles((prev) => ({
				...prev,
				[optionId]: e.target.files![0],
			}));
		}
	};

	const handleSubmit = () => {
		console.log({
			reason: selectedReason,
			description: description,
			uploadedFiles: uploadedFiles,
		});
		setShowAfterCreate(true);
		onNext();
	};

	return (
		<ModalsLayout title="Причина возврата" back={onPrev} onClose={onClose}>
			<div className={styles.itemCard}>
				<img
					src={item.images[0]}
					alt={item.name}
					className={styles.itemImage}
				/>
				<div className={styles.itemInfo}>
					<div className={styles.itemNamePrice}>
						<span>
							{item.marketName} / {item.name}
						</span>
						<span className={styles.itemPrice}>
							{item.price.toLocaleString("ru-RU")}{" "}
							{user && useCurrencySymbol(user.currency)}
						</span>
					</div>
					<div className={styles.itemDetails}>
						<span>Артикул: {item.article}</span>
						<span>Order configuration</span>
					</div>
				</div>
			</div>

			<div className={styles.contentScrollSection}>
				<div className={styles.section}>
					<h3>Выберите причину возврата</h3>
					<div className={styles.reasonButtons}>
						{RETURN_REASONS.map((reason) => (
							<button
								key={reason}
								className={`${styles.reasonButton} ${selectedReason === reason ? styles.selected : ""}`}
								onClick={() => setSelectedReason(reason)}
							>
								{reason}
							</button>
						))}
					</div>
				</div>

				<div className={styles.section}>
					<h3>Расскажите подробнее</h3>
					<Textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className={styles.textarea}
						placeholder="Опишите причину возврата"
					/>
				</div>

				<div className={styles.section}>
					<h3>Расскажите подробнее</h3>
					<p className={styles.photoDescription}>
						Минимум — 1 фото. Но продавцы чаще одобряют подробные заявки: с
						видео и несколькими фото, на которых хорошо видно причину возврата
					</p>
					<div className={styles.photoGrid}>
						{PHOTO_OPTIONS.map((option, index) => (
							<label key={index} className={styles.photoOption}>
								{uploadedFiles[index] ? (
									<img
										src={URL.createObjectURL(uploadedFiles[index])}
										alt="preview"
										className={styles.uploadedMedia}
									/>
								) : (
									<div key={index} className={styles.photoUpload}>
										<Icons.CameraPlus />
										<span>{option}</span>
									</div>
								)}
								<input
									type="file"
									accept="image/*, video/*"
									className={styles.fileInput}
									onChange={(e) => handleFileUpload(e, index)}
								/>
							</label>
						))}
					</div>
				</div>
			</div>

			<Button
				onClick={handleSubmit}
				type="button"
				className={styles.submitButton}
				disabled={!selectedReason || !description}
			>
				Создать заявку
			</Button>

			{showAfterCreate && <RequestSended onClose={onClose} />}
		</ModalsLayout>
	);
}
