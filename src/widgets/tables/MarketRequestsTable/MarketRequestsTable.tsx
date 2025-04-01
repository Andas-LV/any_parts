import styles from "./MarketRequestsTable.module.css";
import {
	ModalType,
	TMarketFullInfo,
	TMarketRequestsList
} from "@/types/admin/Markets";
import { useModal } from "@/hooks/useModal";
import { usePagination } from "@/hooks/usePagination";
import { exampleMarketRequestFullInfo } from "@/exampleData/admin/exampleMarketFullInfo";
import { formatDateWithDuration } from "@/utils/formatDate";
import { marketRequestStatuses } from "@/constants/status";
import { GenericTable } from "@components/GenericTable";
import { PaginationWithSelect } from "@components/PaginationBlock/PaginationBlock";
import MarketFullInfoModal from "@/widgets/modals/admin/MarketFullInfoModal/MarketFullInfoModal";
import SkeletonTable from "@components/skeletons/SkeletonTable/SkeletonTable"

type ModalState = {
	type: ModalType;
	data: TMarketFullInfo;
};

interface MarketRequestsTableProps {
	displayedMarkets?: TMarketRequestsList[];
}

export default function MarketRequestsTable({
	displayedMarkets,
}: MarketRequestsTableProps) {
	if (!displayedMarkets) {
		return null;
	}

	const { modalData, openModal, closeModal } = useModal<ModalState>();

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
		totalItems: displayedMarkets.length,
	});

	const currentMarkets = paginatedData(displayedMarkets);


	const handleOpenFullInfo = (id: number) => {
		openModal({ type: "fullInfo", data: exampleMarketRequestFullInfo[id - 1] });
	};

	const columns = [
		{
			header: "Магазин",
			render: (market: TMarketRequestsList) => market.marketName,
		},
		{
			header: "Дата регистрации",
			render: (market: TMarketRequestsList) =>
				formatDateWithDuration(market.registrationDate),
		},
		{
			header: "Страна регистрации",
			render: (market: TMarketRequestsList) => market.country,
		},
		{
			header: "Статус",
			accessor: "status" as keyof TMarketRequestsList,
			sortable: true,
			render: (market: TMarketRequestsList) => {
				const statusInfo = marketRequestStatuses.find((s) => s.name === market.status);
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
			render: (market: TMarketRequestsList) => {
				return <div className={styles.contact}>{market.contactNumber}</div>;
			},
		},
		{
			header: "Договор",
			render: (market: TMarketRequestsList) => {
				return (
					<div
						onClick={() => handleOpenFullInfo(market.id)}
						className={styles.checkReq}
					>
						Просмотреть заявку
					</div>
				);
			},
		},
	];

	return (
		<div className={styles.MarketRequestsTable}>
			{isChangingPage ? (
				<SkeletonTable />
			) : (
				<GenericTable
					data={currentMarkets}
					columns={columns}
					getRowKey={(market) => market.id}
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

			{modalData?.type === "fullInfo" && (
				<MarketFullInfoModal actions market={modalData.data} onClose={closeModal} />
			)}
		</div>
	);
}
