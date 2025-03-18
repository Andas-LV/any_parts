import { StatusChoice } from "@/types/Orders";
import { Feedback } from "@/types/Feedbacks";
import { TPartnersItem } from "@/types/partners/Items";

export type PartnerFeedback = {
	id: number;
	item: Partial<TPartnersItem>;
	status: FeedbacksStatuses;
	customer: string;
	receiverStatus: StatusChoice;
	time: Date;
	feedback: Feedback;
};

export type PartnerQuestion = {
	id: number;
	item: Partial<TPartnersItem>;
	status: FeedbacksStatuses;
	customer: string;
	question: string;
	time: Date;
	answers: number;
	helpful: number;
};

export type TPartnerFeedbackStatuses = {
	name: FeedbacksStatuses;
	value: keyof FeedbacksStatuses;
	backgroundColor: string;
};

export enum FeedbacksStatuses {
	new = "Новый",
	seen = "Просмотрен",
	processed = "Обработан",
}
