import styles from "./feedbackCard.module.css";
import { TMyFeedbackCard } from "@/types/Feedbacks";
import RatingStars from "@components/stars/RatingStars";
import { Button } from "@components/ui/button";
import { Icons } from "@/assets/svg";
import {
	CardDescription,
	CardHeader,
	CardTitle,
	Card,
} from "@components/ui/card";
import React, { useState, useRef } from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@components/ui/carousel";
import CreateFeedback from "@/widgets/modals/customer/feedback/createFeedback";
import { itemInfo } from "@/exampleData/exampleItems";
import { useItemsStore } from "@/entities/items/useItemsStore";
import { shouldUseCarousel } from "@/utils/shouldUseCarousel";

interface FeedbackCardProps {
	feedback: TMyFeedbackCard;
}

export default function FeedbackCard({ feedback }: FeedbackCardProps) {
	const {
		productImage,
		productName,
		shopName,
		images,
		rating,
		text,
		likes,
		likedByMe,
		id,
	} = feedback;

	const { setCurrentItem } = useItemsStore();
	const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

	const [liked, setLiked] = useState(likedByMe);
	const containerRef = useRef<HTMLDivElement>(null);

	const useCarousel = shouldUseCarousel(
		images!,
		containerRef.current?.offsetWidth || 0,
	);

	const selectItemToFeedback = () => {
		setCurrentItem(itemInfo[id]);
		setIsFeedbackOpen(true);
	};

	return (
		<Card className={styles.card}>
			<div className={styles.headerWrapper}>
				<CardHeader className={styles.cardHeader}>
					{productImage && (
						<img
							src={productImage}
							alt={productName}
							className={styles.image}
						/>
					)}

					<div className={styles.headerDetails}>
						<CardTitle className={styles.cardTitle}>
							{shopName} / {productName}
						</CardTitle>
						<CardDescription>Configuration</CardDescription>
					</div>
				</CardHeader>

				<div className={styles.commentRating}>
					<RatingStars rating={rating} />
				</div>
			</div>

			<div className={styles.commentBody}>
				<p>{text}</p>
			</div>

			{images && (
				<div ref={containerRef}>
					{useCarousel ? (
						<Carousel
							opts={{
								align: "start",
								slidesToScroll: 1,
							}}
							className={styles.carousel}
						>
							<CarouselContent className={styles.carouselContent}>
								{images.map((image, index) => (
									<CarouselItem key={index} className={styles.carouselItem}>
										<img
											className={styles.feedbackImage}
											src={image}
											alt={productName}
										/>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious className={styles.carouselButton} />
							<CarouselNext className={styles.carouselButton} />
						</Carousel>
					) : (
						<div className={styles.images}>
							{images.map((image) => (
								<img
									className={styles.feedbackImage}
									key={image}
									src={image}
									alt={productName}
								/>
							))}
						</div>
					)}
				</div>
			)}

			<div className={styles.commentFooter}>
				<Button
					onClick={() => setLiked(!liked)}
					variant="ghost"
					className={styles.likeBtn}
				>
					{liked ? (
						<Icons.ThumbsUpFilled width={24} height={24} />
					) : (
						<Icons.ThumbsUp width={24} height={24} />
					)}
					{likes}
				</Button>

				<Button
					onClick={selectItemToFeedback}
					variant="outline"
					className={styles.replyBtn}
				>
					Дополнить отзыв
				</Button>
			</div>

			{isFeedbackOpen && (
				<CreateFeedback
					feedbackType={"Дополнительный"}
					onClose={() => setIsFeedbackOpen(false)}
				/>
			)}
		</Card>
	);
}
