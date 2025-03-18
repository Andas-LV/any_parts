export type TPartnersItem = {
	id: number;
	image: string;
	productName: string;
	category: string;
	article: string;
	barcode: string;
	statuses: ItemStatusValues[];
	price: number;
	inStockRoom: number;
};

/* ========================= STATUSES ========================= */
export type TPartnerItemStatuses = {
	status: string;
	value: ItemStatusValues;
	backgroundColor: string;
};

export type ItemStatusValues =
	| "notSelling"
	| "selling"
	| "standardPromotion"
	| "premiumPromotion";

export const PromotionStatuses = [
	"standardPromotion",
	"premiumPromotion",
] as const;

export type TPromotionStatuses = (typeof PromotionStatuses)[number];
