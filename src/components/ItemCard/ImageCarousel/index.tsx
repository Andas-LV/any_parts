"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./imageCarousel.module.css";

interface ImageCarouselProps {
    images: string[];
    alt: string;
    width?: number;
}

export const ImageCarousel = ({ images, alt, width = 250 }: ImageCarouselProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const hasMultipleImages = images.length > 1;
    const maxVisibleImages = 5;
    const extraImagesCount = images.length - maxVisibleImages;
    const limitedImages = images.slice(0, maxVisibleImages);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isHovering || !hasMultipleImages) return;

        const { clientX, currentTarget } = e;
        const { left, width } = currentTarget.getBoundingClientRect();
        const relativeX = clientX - left;
        const percentage = (relativeX / width) * 100;

        const sectionWidth = 100 / limitedImages.length;
        const newIndex = Math.floor(percentage / sectionWidth);

        if (newIndex !== currentImageIndex && newIndex >= 0 && newIndex < limitedImages.length) {
            setCurrentImageIndex(newIndex);
        }
    };

    return (
        <div className={styles.container} >
            <div
                className={styles.imageContainer}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onMouseMove={handleMouseMove}
            >
                {hasMultipleImages && (
                    <>
                        {isHovering && (
                            <div className={styles.progressIndicators}>
                                {limitedImages.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.indicator} ${index === currentImageIndex ? styles.activeIndicator : ""}`}
                                        style={{ width: `${100 / limitedImages.length}%` }}
                                    />
                                ))}
                            </div>
                        )}

                        <div className={styles.hoverZones}>
                            {limitedImages.map((_, index) => (
                                <div
                                    key={index}
                                    className={styles.hoverZone}
                                    style={{ width: `${100 / limitedImages.length}%` }}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* Отображение изображений */}
                <Image
                    src={limitedImages[currentImageIndex]}
                    alt={`${alt} - image ${currentImageIndex + 1}`}
                    fill
                    className={styles.image}
                    sizes={`${width}px`}
                />

                {/* Оверлей с "ещё N фото" */}
                {extraImagesCount > 0 && currentImageIndex === maxVisibleImages - 1 && isHovering && (
                    <div className={styles.overlay}>
                        <span>ещё {extraImagesCount} фото</span>
                    </div>
                )}
            </div>
        </div>
    );
};
