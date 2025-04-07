"use client";

import styles from "./photosSection.module.css";
import { Button } from "@components/ui/button";
import Image from "next/image";
import { useItemsStore } from "@/entities/items/useItemsStore";
import { ShowAllPhotosModal } from "@/widgets/modals/general/ShowAllPhotosModal/ShowAllPhotosModal";
import { useState } from "react";

export function PhotosSection() {
	const { currentItem } = useItemsStore();
	const item = currentItem;
	const [showAllPhotosModal, setShowAllPhotosModal] = useState(false);

	if (!item) {
		return null;
	}

	return (
		<div className={styles.photosWrapper}>
			<div className={styles.photosHeader}>
				<p>Все фотографии покупателей</p>
				<Button variant="link" onClick={() => setShowAllPhotosModal(true)}>
					Смотреть все {item.comments.images.totalImages}
				</Button>
			</div>

			<div className={styles.photos}>
				{item.comments.images.image.map((img, index) => (
					<div key={index} className={styles.imageWrapper}>
						<Image
							src={img.imageUrl}
							alt={`Фото ${index + 1}`}
							className={styles.image}
							fill
							sizes={"50px"}
						/>
					</div>
				))}
			</div>

			{showAllPhotosModal && (
				<ShowAllPhotosModal
					images={item.comments.images}
					onClose={() => setShowAllPhotosModal(false)}
				/>
			)}
		</div>
	);
}
