"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import styles from "./imageCarousel.module.css";
import { Icons } from "@/assets/svg";
import ImagesSkeleton from "@components/skeletons/ItemPageSkeleton/ImagesSkeleton/ImagesSkeleton";

interface ImageCarouselProps {
	images: string[];
	selectedIndex: number;
	setSelectedIndexAction: (index: number) => void;
}

export default function ImageCarousel({
	images,
	selectedIndex,
	setSelectedIndexAction,
}: ImageCarouselProps) {
	const [scrollIndex, setScrollIndex] = useState(0);
	const thumbnailsRef = useRef<HTMLDivElement>(null);
	const visibleThumbnails = 5;

	const selectedMedia = images[selectedIndex];
	const isVideo =
		selectedMedia.endsWith(".mp4") || selectedMedia.endsWith(".webm");

	const scrollDown = () => {
		if (scrollIndex + visibleThumbnails < images.length) {
			setScrollIndex(scrollIndex + 1);
			thumbnailsRef.current?.scrollBy({ top: 60, behavior: "smooth" });
		}
	};

	const scrollUp = () => {
		if (scrollIndex > 0) {
			setScrollIndex(scrollIndex - 1);
			thumbnailsRef.current?.scrollBy({ top: -60, behavior: "smooth" });
		}
	};

	return (
		<div className={styles.carousel}>
			<div className={styles.thumbnailContainer}>
				{scrollIndex > 0 && (
					<button className={styles.scrollButton} onClick={scrollUp}>
						<Icons.ArrowUp />
					</button>
				)}
				<div className={styles.thumbnails} ref={thumbnailsRef}>
					{images
						.slice(scrollIndex, scrollIndex + visibleThumbnails)
						.map((src, index) => (
							<button
								key={index + scrollIndex}
								className={cn(styles.thumbnail, {
									[styles.active]: index + scrollIndex === selectedIndex,
								})}
								onClick={() => setSelectedIndexAction(index + scrollIndex)}
							>
								{src.endsWith(".mp4") || src.endsWith(".webm") ? (
									<div className={styles.videoThumbnail}>
										<span className={styles.playIcon}>▶</span>
									</div>
								) : (
									<Image
										src={src}
										alt={`Thumbnail ${index + 1}`}
										width={60}
										height={60}
									/>
								)}
							</button>
						))}
				</div>
				{scrollIndex + visibleThumbnails < images.length && (
					<button className={styles.scrollButton} onClick={scrollDown}>
						<Icons.ArrowDown />
					</button>
				)}
			</div>

			<div className={styles.mainMedia}>
				{isVideo ? (
					<video controls className={styles.video}>
						<source src={selectedMedia} type="video/mp4" />
						Ваш браузер не поддерживает видео.
					</video>
				) : (
					<Image
						src={selectedMedia}
						alt="Main media"
						width={400}
						height={300}
						className={styles.image}
					/>
				)}
			</div>
		</div>
	);
}
