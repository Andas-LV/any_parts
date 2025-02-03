"use client"

import { useState } from 'react';
import Image from 'next/image';
import styles from './imageCarousel.module.css';

interface ImageCarouselProps {
    images: string[];
    alt: string;
    width?: number;
}

export const ImageCarousel = ({
                                  images,
                                  alt,
                                  width = 250
                              }: ImageCarouselProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const hasMultipleImages = images.length > 1;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isHovering || !hasMultipleImages) return;

        const { clientX, currentTarget } = e;
        const { left, width } = currentTarget.getBoundingClientRect();
        const relativeX = clientX - left;
        const percentage = (relativeX / width) * 100;

        const sectionWidth = 100 / images.length;
        const newIndex = Math.floor(percentage / sectionWidth);

        if (newIndex !== currentImageIndex && newIndex >= 0 && newIndex < images.length) {
            setCurrentImageIndex(newIndex);
        }
    };

    return (
        <div
            className={styles.container}
            style={{ width: `${width}px` }}
        >
            <div
                className={styles.imageContainer}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onMouseMove={handleMouseMove}
            >
                {hasMultipleImages && (
                    <>
                        <div className={styles.progressIndicators}>
                            {images.map((_, index) => (
                                <div
                                    key={index}
                                    className={`${styles.indicator} ${index === currentImageIndex ? styles.activeIndicator : ''}`}
                                    style={{ width: `${100 / images.length}%` }}
                                />
                            ))}
                        </div>

                        <div className={styles.hoverZones}>
                            {images.map((_, index) => (
                                <div
                                    key={index}
                                    className={styles.hoverZone}
                                    style={{ width: `${100 / images.length}%` }}
                                />
                            ))}
                        </div>
                    </>
                )}

                <Image
                    src={images[currentImageIndex]}
                    alt={`${alt} - image ${currentImageIndex + 1}`}
                    fill
                    className={styles.image}
                    sizes={`${width}px`}
                />
            </div>
        </div>
    );
};