import React from "react";
import styles from "./PromotionCard.module.css";
import { TPromotionStatuses } from "@/types/partners/Items";
import {
	PREMIUM_PROMOTION_PRICE,
	STANDARD_PROMOTION_PRICE,
} from "@/constants/apConstants";

interface PromotionCardProps {
	promotionType: TPromotionStatuses;
}

export default function PromotionCard({ promotionType }: PromotionCardProps) {
	const isPremium = promotionType === "premiumPromotion";

	return (
		<div
			className={`${styles.PromotionCard} ${isPremium ? styles.premium : styles.standard}`}
		>
			<h2 className={isPremium ? styles.premiumTitle : ""}>
				{isPremium ? "Премиум-продвижение" : "Стандарт-продвижение"}
			</h2>

			<p>
				Стоимость:{" "}
				{isPremium ? PREMIUM_PROMOTION_PRICE : STANDARD_PROMOTION_PRICE}/месяц
			</p>

			<ul>
				{isPremium ? (
					<>
						<li>До 20 000 показов в поиске</li>
						<li>Приоритетное размещение над конкурентами</li>
						<li>Максимальный охват аудитории</li>
						<li>Усиленная реклама в рекомендованных товарах</li>
					</>
				) : (
					<>
						<li>До 5 000 показов в поиске</li>
						<li>Умеренная конкуренция среди продвигаемых товаров</li>
						<li>Контроль расходов и прозрачная статистика</li>
					</>
				)}
			</ul>
		</div>
	);
}
