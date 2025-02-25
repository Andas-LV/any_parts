"use client"

import {ItemInfoType} from "@/types/Item";
import styles from './photosSection.module.css'
import {Button} from "@components/ui/button";
import Image from "next/image";
import {useItemsStore} from "@/entities/items/useItemsStore";

export function PhotosSection() {
    const { currentItem } = useItemsStore();
    const item = currentItem;

    if (!item) {
        return null;
    }

    return (
        <div className={styles.photosWrapper}>
            <div className={styles.photosHeader}>
                <p>Все фотографии покупателей</p>
                <Button variant="link">Смотреть все {item.comments.images.totalImages}</Button>
            </div>

            <div className={styles.photos}>
                {item.comments.images.image.map((img, index) => (
                    <div key={index} className={styles.imageWrapper}>
                        <Image src={img.imageUrl} alt={`Фото ${index + 1}`} className={styles.image} fill sizes={"50px"}/>
                    </div>
                ))}
            </div>
        </div>
    );
}