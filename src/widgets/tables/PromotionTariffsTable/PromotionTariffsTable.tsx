import React from "react";
import styles from "./PromotionTariffsTable.module.css";
import { GenericTable } from "@components/GenericTable";
import { TPromotionTable } from "@/types/Promotions";
import { useUserStore } from "@/entities/user/useUserStore";
import { usePromotionsStore } from "@/entities/admin/promotions/usePromotionStore";
import { Pencil, Save } from "lucide-react";

export default function PromotionTariffsTable() {
	const { currencySymbol } = useUserStore();

	const {
		promotions,
		editingId,
		tempPrice,
		isLoading,
		toggleSelectPromotion,
		startEditing,
		updateTempPrice,
		savePrice,
	} = usePromotionsStore();

	const columns = [
		{
			header: "Название тарифа",
			render: (promotion: TPromotionTable) => (
				<div
					className={
						promotion.value === "standardPromotion"
							? styles.standardPromo
							: styles.premiumPromo
					}
					onClick={() => toggleSelectPromotion(promotion.value)} // Selection on click
				>
					{promotion.name}
				</div>
			),
		},
		{
			header: "Кол-во активных тарифов",
			render: (promotion: TPromotionTable) => (
				<div className={styles.tableProductCell}>{promotion.activeClients}</div>
			),
		},
		{
			header: `Стоимость/месяц (${currencySymbol})`,
			render: (promotion: TPromotionTable) => (
				<div className={styles.costCell}>
					{editingId === promotion.value ? (
						<div className={styles.priceWrapper}>
							<input
								type="text"
								value={tempPrice}
								onChange={(e) => updateTempPrice(e.target.value)}
								className={styles.priceInput}
								disabled={isLoading}
							/>
							<button
								onClick={() => savePrice(promotion.value)}
								className={`${styles.actionButton} ${isLoading ? styles.disabled : ""}`}
								disabled={isLoading}
							>
								<Save className={styles.actionIcon} />
							</button>
						</div>
					) : (
						<div className={styles.priceWrapper}>
							<span className={styles.priceText}>{promotion.cost}</span>
							<button
								onClick={() => startEditing(promotion.value)}
								className={`${styles.actionButton} ${isLoading ? styles.disabled : ""}`}
								disabled={isLoading}
							>
								<Pencil className={styles.actionIcon} />
							</button>
						</div>
					)}
				</div>
			),
		},
	];

	return (
		<div className={styles.PromotionTariffsTable}>
			<GenericTable
				data={promotions}
				columns={columns}
				getRowKey={(promotion) => promotion.value}
			/>
		</div>
	);
}