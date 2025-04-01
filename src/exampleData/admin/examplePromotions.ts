import { PREMIUM_PROMOTION_PRICE, STANDARD_PROMOTION_PRICE } from "@/constants/apConstants";
import { PromotionsEnum, TPromotionTable } from "@/types/Promotions";

export const examplePromotions: TPromotionTable[] = [
	{
		name: PromotionsEnum.standardPromotion,
		value: "standardPromotion",
		activeClients: 1245,
		cost: STANDARD_PROMOTION_PRICE,
	},
	{
		name: PromotionsEnum.premiumPromotion,
		value: "premiumPromotion",
		activeClients: 365,
		cost: PREMIUM_PROMOTION_PRICE,
	}
]