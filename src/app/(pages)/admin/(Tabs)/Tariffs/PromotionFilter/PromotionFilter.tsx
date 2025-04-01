import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Checkbox } from "@components/ui/checkbox";
import { Icons } from "@/assets/svg/svg";
import styles from "./PromotionFilter.module.css"; // стили можешь скопировать из StatusFilter
import { PromotionsEnum } from "@/types/Promotions";
import { useAdminMarketsStore } from "@/entities/admin/markets/useAdminMarketsStore";

const promotionOptions = [
	{
		label: PromotionsEnum.standardPromotion,
		value: "standardPromotion",
	},
	{
		label: PromotionsEnum.premiumPromotion,
		value: "premiumPromotion",
	},
] as const;

export default function PromotionFilter() {
	const { filterPromotions, setFilterPromotion } = useAdminMarketsStore();
	const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

	const handlePromotionChange = (
		promoValue: keyof typeof PromotionsEnum,
		checked: boolean,
	) => {
		setFilterPromotion(
			checked
				? [...filterPromotions, promoValue]
				: filterPromotions.filter((p) => p !== promoValue),
		);
	};

	return (
		<div className={styles.filter}>
			<DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
				<DropdownMenuTrigger className={styles.statusSelect}>
					Тариф
					<Icons.ArrowDown
						className={`${styles.arrowIcon} ${isDropdownOpen ? styles.rotated : ""}`}
					/>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{promotionOptions.map((promo) => (
						<DropdownMenuItem key={promo.value}>
							<Checkbox
								className={styles.checkbox}
								checked={filterPromotions.includes(promo.value)}
								onCheckedChange={(checked) =>
									handlePromotionChange(promo.value, !!checked)
								}
							/>
							<div className={styles.status}>{promo.label}</div>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
