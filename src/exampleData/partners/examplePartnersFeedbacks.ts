import {
	FeedbacksStatuses,
	PartnerFeedback,
	PartnerQuestion,
} from "@/types/partners/Feedbacks";
import { exampleFeedbacks } from "@/exampleData/exampleFeedbacks";
import { tableItems } from "@/exampleData/partners/examplePartnersItems";
import { StatusChoice } from "@/types/Orders";

export const examplePartnerFeedbacks: PartnerFeedback[] = tableItems.map(
	(item, index) => {
		const feedback = exampleFeedbacks[index % exampleFeedbacks.length];

		return {
			id: index + 1,
			item: {
				id: item.id,
				image: item.image,
				productName: item.productName,
				category: item.category,
				article: item.article,
				barcode: item.barcode,
			},
			status:
				index % 3 === 0
					? FeedbacksStatuses.new
					: index % 3 === 1
						? FeedbacksStatuses.seen
						: FeedbacksStatuses.processed,
			customer: feedback.user.username,
			receiverStatus: StatusChoice.received,
			time: new Date(),
			feedback: {
				id: feedback.id,
				user: feedback.user,
				rating: feedback.rating,
				date: feedback.date,
				text: feedback.text,
				likedByMe: feedback.likedByMe,
				images: feedback.images,
				likes: feedback.likes,
				replies: feedback.replies,
				updatedAt: feedback.updatedAt,
			},
		};
	},
);

export const examplePartnerQuestions: PartnerQuestion[] = tableItems.map(
	(item, index) => {
		const feedback = exampleFeedbacks[index % exampleFeedbacks.length];

		return {
			id: index + 1,
			item: {
				id: item.id,
				image: item.image,
				productName: item.productName,
				category: item.category,
				article: item.article,
				barcode: item.barcode,
			},
			status:
				index % 3 === 0
					? FeedbacksStatuses.new
					: index % 3 === 1
						? FeedbacksStatuses.seen
						: FeedbacksStatuses.processed,
			customer: feedback.user.username,
			question: `How does ${item.productName} compare to other items in the same category?`,
			time: new Date(),
			answers: Math.floor(Math.random() * 5),
			helpful: Math.floor(Math.random() * 20),
		};
	},
);
