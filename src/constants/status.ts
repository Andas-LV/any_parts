import { TPartnerItemStatuses } from "@/types/partners/Items";
import { FeedbacksStatuses } from "@/types/partners/Feedbacks";
import { StatusChoice } from "@/types/Orders";
import { MarketRequestStatuses, MarketStatuses } from "@/types/admin/Markets";
import { StatusObject } from "@/types/Status";
import { TAdminItemsStatus } from "@/types/admin/Items";

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

export const partnerFeedbackStatuses: StatusObject<FeedbacksStatuses>[] = [
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

export const adminItemStatuses:StatusObject<TAdminItemsStatus>[] = [
	{
		name: TAdminItemsStatus.active,
		value: "active" as keyof TAdminItemsStatus,
		backgroundColor: "#c2ebda",
	},
	{
		name: TAdminItemsStatus.notActive,
		value: "notActive" as keyof TAdminItemsStatus,
		backgroundColor: "var(--brand-gray)",
	},
	{
		name: TAdminItemsStatus.inRevision,
		value: "inRevision" as keyof TAdminItemsStatus,
		backgroundColor: "#FCCDC9",
	},
]

export const marketStatuses: StatusObject<MarketStatuses>[] = [
	{
		name: MarketStatuses.active,
		value: "active" as keyof MarketStatuses,
		backgroundColor: "#c2ebda",
	},
	{
		name: MarketStatuses.notActive,
		value: "notActive" as keyof MarketStatuses,
		backgroundColor: "var(--brand-gray)",
	},
	{
		name: MarketStatuses.notStarted,
		value: "notStarted" as keyof MarketStatuses,
		backgroundColor: "#FEF5C6",
	},
	{
		name: MarketStatuses.archive,
		value: "archive" as keyof MarketStatuses,
		backgroundColor: "var(--brand-gray)",
	},
];

export const marketRequestStatuses: StatusObject<MarketRequestStatuses>[] = [
	{
		name: MarketRequestStatuses.new,
		value: "active" as keyof MarketStatuses,
		backgroundColor: "#c2ebda",
	},
	{
		name: MarketRequestStatuses.seen,
		value: "notActive" as keyof MarketStatuses,
		backgroundColor: "var(--brand-gray)",
	},
	{
		name: MarketRequestStatuses.partner,
		value: "notStarted" as keyof MarketStatuses,
		backgroundColor: "#c1d8f6",
	},
];

export const itemDeliveryStatuses: StatusObject<StatusChoice>[] = [
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
