import { TPartnerItemStatuses } from "@/types/partners/Items";

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
