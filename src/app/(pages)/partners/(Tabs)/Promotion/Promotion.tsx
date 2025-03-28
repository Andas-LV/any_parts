"use client"

import React, { useEffect, useState } from "react";
import styles from "./Promotion.module.css";
import { Button } from "@components/ui/button";
import PromotionCard from "@components/cards/PromotionCard/PromotionCard";
import { useDealerItemsStore } from "@/entities/partners/items/useDealerItemsStore";
import SearchBar from "@components/SearchBar/SearchBar";
import StatusFilter from "@/app/(pages)/partners/(Tabs)/MainPage/PartnerItemsList/StatusFilter/StatusFilter";
import { Plus } from "lucide-react";
import ProductTable from "@/widgets/tables/ProductTable/ProductTable";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";
import { Icons } from "@/assets/svg";
import { promotionStatuses } from "@/constants/status";
import StandardPromotionModal from "@/widgets/modals/partners/promotions/StandardPromotionModal/StandardPromotionModal";
import PremiumPromotionModal from "@/widgets/modals/partners/promotions/PremiumPromotionModal/PremiumPromotionModal";

type TModalOptions = "standardPromotion" | "premiumPromotion" | null;

export default function Promotion() {
	const { setFilterStatus, filteredItems } = useDealerItemsStore();
	const { user, setActivePartnersTab } = useUserStore();

	const currencySymbol = user ? useCurrencySymbol(user.currency) : "";
	const [search, setSearch] = useState("");
	const [openModal, setOpenModal] = useState<TModalOptions>(null);

	useEffect(() => {
		setFilterStatus(["premiumPromotion", "standardPromotion"]);
	}, []);

	return (
		<div className={styles.Promotion}>
			<h1>Продвижение товаров</h1>

			<div className={styles.promotionCards}>
				<PromotionCard promotionType={"standardPromotion"} />
				<PromotionCard promotionType={"premiumPromotion"} />
			</div>

			<div className={styles.tableWrapper}>
				<div className={styles.actionsContainer}>
					<div className={styles.actions}>
						<SearchBar
							search={search}
							placeholder={"Название, артикул, штрихкод"}
							onSearchChange={(e) => setSearch(e.target.value)}
						/>
						<StatusFilter statuses={promotionStatuses} />
						<Button
							onClick={() => {
								setActivePartnersTab("items");
							}}
							className={"rounded-xl"}
						>
							<Plus /> Добавить товар
						</Button>
					</div>

					<div className={styles.promotionBtns}>
						<Button
							className={styles.standard}
							onClick={() => setOpenModal("standardPromotion")}
						>
							<Icons.ArrowLineUp color="white" /> Стандарт-продвижение
						</Button>

						<Button
							className={styles.premium}
							onClick={() => setOpenModal("premiumPromotion")}
						>
							<Icons.ArrowLineUp color="white" /> Премиум-продвижение
						</Button>
					</div>
				</div>

				<ProductTable
					filteredItems={filteredItems()}
					currencySymbol={currencySymbol}
				/>
			</div>

			<div className={styles.noContent}>
				<h3>Пока пусто</h3>
				<p>Здесь можно будет продвинуть товар</p>
				<Button
					onClick={() => {
						setActivePartnersTab("items");
					}}
					className={styles.createItemBtn}
				>
					Создать товар
				</Button>
			</div>

			{openModal === "standardPromotion" && (
				<StandardPromotionModal onClose={() => setOpenModal(null)} />
			)}

			{openModal === "premiumPromotion" && (
				<PremiumPromotionModal onClose={() => setOpenModal(null)} />
			)}
		</div>
	);
}
