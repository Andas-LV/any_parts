export enum PromotionsEnum {
	standardPromotion = 'Стандарт-продвижение',
	premiumPromotion = 'Премиум-продвижение',
}

export type TPromotionTable = {
	name: PromotionsEnum,
	value: keyof typeof PromotionsEnum;
	activeClients: number,
	cost: number,
}