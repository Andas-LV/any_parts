import { TPartnerItemStatuses } from "@/types/partners/Items";
import {
	FeedbacksStatuses,
	TPartnerFeedbackStatuses,
} from "@/types/partners/Feedbacks";
import { StatusChoice, TItemDeliveryStatuses } from "@/types/Orders";

export const partnerItemStatuses: TPartnerItemStatuses[] = [
	{
		status: "Не продается",
		value: "notSelling",
		backgroundColor: "var(--skeleton)",
	},
	{
		status: "Продается",
		value: "selling",
		backgroundColor: "#c2ebda",
	},
	{
		status: "Стандарт-продвижение",
		value: "standardPromotion",
		backgroundColor: "#c1d8f6",
	},
	{
		status: "Премиум-продвижение",
		value: "premiumPromotion",
		backgroundColor: "var(--premium-gradient-light)",
	},
];

export const partnerFeedbackStatuses: TPartnerFeedbackStatuses[] = [
	{
		name: FeedbacksStatuses.new,
		value: "new" as keyof FeedbacksStatuses,
		backgroundColor: "#c2ebda",
	},
	{
		name: FeedbacksStatuses.seen,
		value: "seen" as keyof FeedbacksStatuses,
		backgroundColor: "var(--brand-gray)",
	},
	{
		name: FeedbacksStatuses.processed,
		value: "processed" as keyof FeedbacksStatuses,
		backgroundColor: "var(--brand-gray)",
	},
];

export const itemDeliveryStatuses: TItemDeliveryStatuses[] = [
	{
		name: StatusChoice.received,
		value: "received" as keyof StatusChoice,
		backgroundColor: "#c3ecdb",
	},
	{
		name: StatusChoice.pending,
		value: "pending" as keyof StatusChoice,
		backgroundColor: "var(--brand-gray)",
	},
	{
		name: StatusChoice.waiting,
		value: "waiting" as keyof StatusChoice,
		backgroundColor: "#c2d9f8",
	},
];

export const promotionStatuses: TPartnerItemStatuses[] = [
	{
		status: "Стандарт-продвижение",
		value: "standardPromotion",
		backgroundColor: "#c1d8f6",
	},
	{
		status: "Премиум-продвижение",
		value: "premiumPromotion",
		backgroundColor: "var(--premium-gradient-light)",
	},
];
