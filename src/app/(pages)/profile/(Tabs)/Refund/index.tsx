"use client";
import styles from "./page.module.css";
import { useItemsStore } from "@/entities/items/useItemsStore";
import { Button } from "@components/ui/button";
import React, { useEffect, useMemo, useState } from "react";
import { Icons } from "@/assets/svg";
import CreateRefund from "@/widgets/modals/customer/menuModals/refund/create/CreateRefund";
import RefundFullInfo from "@/widgets/modals/customer/menuModals/refund/create/refundFullInfo";
import RequestSended from "@/widgets/modals/requestSended/requestSended";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";
import SearchBar from "@components/SearchBar/SearchBar";
import RefundTable from "@/widgets/tables/RefundTable/RefundTable";

type TModal = "itemChooseModal" | "itemFullInfoModal" | "onSuccessModal" | null;

export default function Refund() {
	const { getRefundItems, refunds } = useItemsStore();
	const { user } = useUserStore();
	const [search, setSearch] = useState("");
	const [activeModal, setActiveModal] = useState<TModal>(null);
	const currencySymbol = useCurrencySymbol(user ? user.currency : "KZT");

	useEffect(() => {
		getRefundItems();
	}, []);

	const filteredItems = useMemo(() => {
		return (
			refunds?.filter(
				(item) =>
					item.id.toString().includes(search) ||
					item.price.toString().includes(search),
			) || []
		);
	}, [search, refunds]);

	return (
		<div className={styles.wrapper}>
			<h2 className={styles.title}>Возврат</h2>

			<div className={styles.infoContentWrapper}>
				<div className={styles.infoContentTitle}>
					Чтобы вернуть товар по браку, оформите заявку на его проверку.
				</div>
				<p>
					<Icons.Info width={16} height={16} color={"black"} />
					Рассмотрение заявки занимает до 7 рабочих дней.
				</p>
				<Button
					onClick={() => setActiveModal("itemChooseModal")}
					variant={"outline"}
					className={styles.createBtn}
				>
					Создать заявку
				</Button>
			</div>

			<div className={styles.content}>
				<div className={styles.searchContainer}>
					<SearchBar
						search={search}
						placeholder={"Поиск..."}
						onSearchChange={(e) => setSearch(e.target.value)}
					/>
				</div>

				<div className={styles.tableWrapper}>
					{refunds && refunds.length > 0 && (
						<RefundTable
							items={filteredItems}
							currencySymbol={currencySymbol}
						/>
					)}
				</div>

				<Button className={styles.deliveryPoint}>Пункт выдачи</Button>
			</div>

			{activeModal === "itemChooseModal" && (
				<CreateRefund
					onClose={() => setActiveModal(null)}
					onNext={() => setActiveModal("itemFullInfoModal")}
				/>
			)}
			{activeModal === "itemFullInfoModal" && (
				<RefundFullInfo
					onClose={() => setActiveModal(null)}
					onPrev={() => setActiveModal("itemChooseModal")}
					onNext={() => setActiveModal("onSuccessModal")}
				/>
			)}
			{activeModal === "onSuccessModal" && (
				<RequestSended onClose={() => setActiveModal(null)} />
			)}
		</div>
	);
}
