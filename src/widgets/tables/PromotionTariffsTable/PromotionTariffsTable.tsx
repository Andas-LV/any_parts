import React from "react";
import styles from "./PromotionTariffsTable.module.css";
import { examplePromotions } from "@/exampleData/admin/examplePromotions";
import { GenericTable } from "@components/GenericTable";
import { TPromotionTable } from "@/types/Promotions";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";

export default function PromotionTariffsTable() {
	const { user } = useUserStore();
	const currencySymbol = user ? useCurrencySymbol(user.currency) : "";

	const columns = [
		{
			header: "Название тарифа",
			render: (promotion: TPromotionTable) => {
				return promotion.value === "standardPromotion" ? (
					<div className={styles.standardPromo}>{promotion.name}</div>
				) : (
					<div className={styles.premiumPromo}>{promotion.name}</div>
				);
			},
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
				<div className={styles.tableProductCell}>{promotion.cost}</div>
			),
		},
	];

	return (
		<div className={styles.PromotionTariffsTable}>
			<GenericTable
				data={examplePromotions}
				columns={columns}
				getRowKey={(promotion) => promotion.value}
			/>
		</div>
	);
}
