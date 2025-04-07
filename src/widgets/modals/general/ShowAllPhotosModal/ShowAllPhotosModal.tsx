import React from "react";
import styles from "./ShowAllPhotosModal.module.css";
import Image from "next/image";
import { feedbackImages } from "@/types/items/Item";
import { Icons } from "@/assets/svg/svg";

interface ShowAllPhotosModalProps {
	images: feedbackImages;
	onClose: () => void;
}

export const ShowAllPhotosModal = ({
	images,
	onClose,
}: ShowAllPhotosModalProps) => {
	return (
		<div className={styles.ShowAllPhotosModal}>
			<div className={styles.modalContent}>
				<Icons.BlackClose onClick={onClose} className={styles.closeBtn} />

				<h2>
					Все фото <span>({images.totalImages})</span>
				</h2>

				<div className={styles.images}>
					{images.image.map((img, index) => (
						<div key={index} className={styles.imageWrapper}>
							<Image
								src={img.imageUrl}
								alt={`Фото ${index + 1}`}
								className={styles.image}
								fill
								sizes="50px"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
