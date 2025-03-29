import React, { useState } from "react";
import styles from "./MarketsTable.module.css";
import { useAdminMarketsStore } from "@/entities/admin/markets/useAdminMarketsStore";
import { Checkbox } from "@components/ui/checkbox";
import { PaginationWithSelect } from "@components/PaginationBlock/PaginationBlock";
import {
	TMarketFullInfo,
	TMarketsList,
	ModalType,
} from "@/types/admin/Markets";
import { marketStatuses } from "@/constants/status";
import { exampleMarketFullInfo } from "@/exampleData/admin/exampleMarketFullInfo";
import MarketFullInfoModal from "@/widgets/modals/admin/MarketFullInfoModal/MarketFullInfoModal";
import AdminTreatmentCancellationModal from "@/widgets/modals/admin/AdminTreatmentCancellationModal/AdminTreatmentCancellationModal";
import { formatDateWithDuration } from "@/utils/formatDate";
import { usePagination } from "@/hooks/usePagination";
import { ActionMenu } from "@components/ActionMenu";
import { useModal } from "@/hooks/useModal";
import { GenericTable } from "@/components/GenericTable";

type ModalState = {
	type: ModalType;
	data: TMarketFullInfo;
};

export default function MarketsTable({
	filteredMarkets,
	currencySymbol,
}: {
	filteredMarkets: TMarketsList[];
	currencySymbol: string;
}) {
	const { allMarkets, toggleSelect, toggleSelectAll, selectedMarkets } =
		useAdminMarketsStore();

	const { modalData, openModal, closeModal } = useModal<ModalState>();

	const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
	const {
		currentPage,
		rowsPerPage,
		totalPages,
		handlePageChange,
		handleRowsChange,
		handleNextPage,
		handlePreviousPage,
		paginatedData,
	} = usePagination({
		initialPage: 1,
		initialRowsPerPage: 10,
		totalItems: filteredMarkets.length,
	});

	const currentMarkets = paginatedData(filteredMarkets);

	const isAllSelected =
		allMarkets.length > 0 &&
		allMarkets.every((item) =>
			selectedMarkets().some((selected) => selected.id === item.id),
		);

	const handleDropdownToggle = (id: number) =>
		setOpenDropdownId((prev) => (prev === id ? null : id));

	const handleOpenFullInfo = (id: number) => {
		openModal({ type: "fullInfo", data: exampleMarketFullInfo[id - 1] });
	};

	const handleCancelTreatment = (id: number) => {
		openModal({ type: "cancel", data: exampleMarketFullInfo[id - 1] });
	};

	// Определяем столбцы для GenericTable
	const columns = [
		{
			header: (
				<Checkbox checked={isAllSelected} onCheckedChange={toggleSelectAll} />
			),
			render: (market: TMarketsList) => (
				<Checkbox
					checked={selectedMarkets().some(
						(selected) => selected.id === market.id,
					)}
					onCheckedChange={() => toggleSelect(market.id)}
				/>
			),
		},
		{
			header: "Магазин",
			render: (market: TMarketsList) => market.marketName,
		},
		{
			header: "Дата регистрации",
			render: (market: TMarketsList) =>
				formatDateWithDuration(market.registrationDate),
		},
		{
			header: "Страна регистрации",
			render: (market: TMarketsList) => market.country,
		},
		{
			header: "Статус",
			render: (market: TMarketsList) => {
				const statusInfo = marketStatuses.find((s) => s.name === market.status);
				return (
					<span
						className={styles.status}
						style={{ background: statusInfo?.backgroundColor }}
					>
						{statusInfo?.name}
					</span>
				);
			},
		},
		{
			header: "Контактный номер",
			render: (market: TMarketsList) => market.contactNumber,
		},
		{
			header: "Продажи",
			render: (market: TMarketsList) => `${market.sellsCount} ${currencySymbol}`,
		},
		{
			header: "",
			render: (market: TMarketsList) => (
				<ActionMenu
					actions={[
						{
							label: "Узнать больше",
							onClick: () => handleOpenFullInfo(market.id),
						},
						{
							label: "Расторгнуть договор",
							onClick: () => handleCancelTreatment(market.id),
						},
					]}
					open={openDropdownId === market.id}
					onOpenChange={() => handleDropdownToggle(market.id)}
				/>
			),
		},
	];

	return (
		<div className={styles.MarketsTable}>
			<GenericTable
				data={currentMarkets}
				columns={columns}
				getRowKey={(market) => market.id}
			/>
			<PaginationWithSelect
				currentPage={currentPage}
				totalPages={totalPages}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleRowsChange}
				onPageChange={handlePageChange}
				onNextPage={handleNextPage}
				onPreviousPage={handlePreviousPage}
			/>

			{modalData?.type === "fullInfo" && (
				<MarketFullInfoModal market={modalData.data} onClose={closeModal} />
			)}
			{modalData?.type === "cancel" && (
				<AdminTreatmentCancellationModal
					market={modalData.data}
					onClose={closeModal}
				/>
			)}
		</div>
	);
}
