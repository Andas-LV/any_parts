import React from "react";
import styles from "./SellsTable.module.css";
import { TMarketFullInfo, TSellsList, ModalType } from "@/types/admin/Markets";
import { exampleMarketFullInfo } from "@/exampleData/admin/exampleMarketFullInfo";
import { formatDateWithDuration } from "@/utils/formatDate";
import { PaginationWithSelect } from "@components/PaginationBlock/PaginationBlock";
import MarketFullInfoModal from "@/widgets/modals/admin/MarketFullInfoModal/MarketFullInfoModal";
import AdminTreatmentCancellationModal from "@/widgets/modals/admin/AdminTreatmentCancellationModal/AdminTreatmentCancellationModal";
import { usePagination } from "@/hooks/usePagination";
import { ActionMenu } from "@components/ActionMenu";
import { useModal } from "@/hooks/useModal";
import { GenericTable } from "@/components/GenericTable";
import SkeletonTable from "@components/skeletons/SkeletonTable/SkeletonTable"

type ModalState = {
	type: ModalType;
	data: TMarketFullInfo;
};

interface SellsTableProps {
	sellsData: TSellsList[];
	currencySymbol: string;
}

export default function SellsTable({ sellsData, currencySymbol }: SellsTableProps) {
	const [openDropdownId, setOpenDropdownId] = React.useState<number | null>(null);

	const {
		currentPage,
		rowsPerPage,
		totalPages,
		handlePageChange,
		handleRowsChange,
		handleNextPage,
		handlePreviousPage,
		paginatedData,
		isChangingPage
	} = usePagination({
		initialPage: 1,
		initialRowsPerPage: 10,
		totalItems: sellsData.length,
	});

	const currentSells = paginatedData(sellsData);

	const { modalData, openModal, closeModal } = useModal<ModalState>();

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
			header: "Товар",
			render: (sell: TSellsList) => (
				<div className={styles.tableProductCell}>
					<img
						src={sell.item.image}
						alt={sell.item.productName}
						className={styles.image}
					/>
					<div className={styles.infoWithSubtitle}>
						{sell.item.productName}
						<span>{sell.item.category}</span>
					</div>
				</div>
			),
		},
		{
			header: "Магазин",
			render: (sell: TSellsList) => (
				<div className={styles.infoWithSubtitle}>
					{sell.market.marketName}
					<span>Any Parts ID {sell.market.id}</span>
				</div>
			),
		},
		{
			header: "Покупатель",
			render: (sell: TSellsList) => (
				<div className={styles.infoWithSubtitle}>
					{sell.customer.phone}
					<span>{sell.customer.username}</span>
				</div>
			),
		},
		{
			header: "Дата покупки",
			accessor: "sellDate" as keyof TSellsList,
			sortable: true,
			render: (sell: TSellsList) => formatDateWithDuration(sell.sellDate),
		},
		{
			header: "Стоимость покупки",
			accessor: "sellAmount" as keyof TSellsList,
			sortable: true,
			render: (sell: TSellsList) => (
				<>
					{sell.sellAmount} {currencySymbol}
				</>
			),
		},
		{
			header: "",
			render: (sell: TSellsList) => (
				<ActionMenu
					actions={[
						{
							label: "Узнать больше",
							onClick: () => handleOpenFullInfo(sell.id),
						},
						{
							label: "Расторгнуть договор",
							onClick: () => handleCancelTreatment(sell.id),
						},
					]}
					open={openDropdownId === sell.id}
					onOpenChange={() => handleDropdownToggle(sell.id)}
				/>
			),
		},
	];

	return (
		<div className={styles.SellsTable}>
			{isChangingPage ? (
				<SkeletonTable />
			) : (
				<GenericTable
					data={currentSells}
					columns={columns}
					getRowKey={(sell) => sell.id}
				/>
			)}
			<PaginationWithSelect
				currentPage={currentPage}
				totalPages={totalPages}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleRowsChange}
				onPageChange={handlePageChange}
				onNextPage={handleNextPage}
				onPreviousPage={handlePreviousPage}
			/>

			{modalData?.type === "fullInfo" && modalData.data && (
				<MarketFullInfoModal market={modalData.data} onClose={closeModal} />
			)}
			{modalData?.type === "cancel" && modalData.data && (
				<AdminTreatmentCancellationModal market={modalData.data} onClose={closeModal} />
			)}
		</div>
	);
}
