export type TPartnerItemStatuses = {
	status: string;
	value: ItemStatusValues;
	backgroundColor: string;
	icon: boolean;
};

export type ItemStatusValues =
	| "notSelling"
	| "selling"
	| "standardPromotion"
	| "premiumPromotion";

export type TableItem = {
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
