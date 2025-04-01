import React, { useState } from "react";
import styles from "./AdminProductsCheckTable.module.css";
import { TAdminItems, TAdminItemsStatus } from "@/types/admin/Items";
import { useAdminItemsStore } from "@/entities/admin/items/useAdminItemsStore";
import { usePagination } from "@/hooks/usePagination";
import { Checkbox } from "@components/ui/checkbox";
import { adminItemStatuses } from "@/constants/status";
import { ActionMenu } from "@components/ActionMenu";
import { GenericTable } from "@components/GenericTable";
import { PaginationWithSelect } from "@components/PaginationBlock/PaginationBlock";
import { useModal } from "@/hooks/useModal";
import DeleteItemModal from "@/widgets/modals/admin/DeleteItemModal/DeleteItemModal";
import { useToast } from "@/hooks/use-toast";
import SkeletonTable from "@components/skeletons/SkeletonTable/SkeletonTable";

type ModalState = {
	type: "removeItem" | null;
	data: number;
};

interface AdminProductsCheckTableProps {
	filteredItems: TAdminItems[];
	currencySymbol: string;
}

export default function AdminProductsCheckTable({
	filteredItems,
	currencySymbol,
}: AdminProductsCheckTableProps) {
	const { allItems, toggleSelect, toggleSelectAll, selectedItems, sendForRevision, returnItem } =
		useAdminItemsStore();
	const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
	const { modalData, openModal, closeModal } = useModal<ModalState>();
	const { toast } = useToast();

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
		totalItems: filteredItems.length,
	});

	const currentItems = paginatedData(filteredItems);

	const isAllSelected =
		allItems.length > 0 &&
		allItems.every((item) =>
			selectedItems().some((selected) => selected.id === item.id),
		);

	const handleDropdownToggle = (id: number) =>
		setOpenDropdownId((prev) => (prev === id ? null : id));

	const handleRemoveItem = (id: number) => {
		openModal({ type: "removeItem", data: id });
	};

	const handleSendForRevision = async (id: number) => {

		try {
			await sendForRevision(id)
			toast({
				done: true,
				description: "Товар отправлен на доработку!",
			})
		} catch (error) {
			console.error(error);
		}
	};

	const handleReturnItem = async (id: number) => {
		try {
			await returnItem(id)
			toast({
				done: true,
				description: "Товар снова актуален!",
			})
		} catch (error) {
			console.error(error);
		}
	};

	const columns = [
		{
			header: (
				<Checkbox checked={isAllSelected} onCheckedChange={toggleSelectAll} />
			),
			render: (item: TAdminItems) => (
				<Checkbox
					className={styles.checkBox}
					checked={selectedItems().some((selected) => selected.id === item.id)}
					onCheckedChange={() => toggleSelect(item.id)}
				/>
			),
		},
		{
			header: "Товар",
			render: (item: TAdminItems) => (
				<div className={styles.tableProductCell}>
					<img
						src={item.image}
						alt={item.productName}
						className={styles.image}
					/>
					<div>
						<p className={styles.productName}>{item.productName}</p>
						{item.category}
					</div>
				</div>
			),
		},
		{
			header: "Артикул",
			render: (item: TAdminItems) => (
				<div className={styles.tableCell}>
					<p className={styles.article}>{item.article}</p>
					{item.barcode}
				</div>
			),
		},
		{
			header: "Статус",
			accessor: "status" as keyof TAdminItems,
			sortable: true,
			render: (item: TAdminItems) => {
				const status = adminItemStatuses.find((s) => s.name === item.status);
				return (
					<div
						className={styles.status}
						style={{ backgroundColor: status?.backgroundColor }}
					>
						{status?.name}
					</div>
				);
			},
		},
		{
			header: "Цена продавца",
			accessor: "price" as keyof TAdminItems,
			sortable: true,
			render: (item: TAdminItems) => (
				<div>
					{item.price} {currencySymbol}
				</div>
			),
		},
		{
			header: "Склад AP",
			render: (item: TAdminItems) => item.inStockRoom,
		},
		{
			header: "",
			render: (item: TAdminItems) => {
				const actions =
					item.status === TAdminItemsStatus.inRevision
						? [
							{
								label: "Вернуть товар",
								onClick: () => handleReturnItem(item.id),
							},
							{
								label: "Удалить товар",
								onClick: () => handleRemoveItem(item.id),
							},
						]
						: [
							{
								label: "Отправить на доработку",
								onClick: () => handleSendForRevision(item.id),
							},
							{
								label: "Удалить товар",
								onClick: () => handleRemoveItem(item.id),
							},
						];
				return (
					<ActionMenu
						actions={actions}
						open={openDropdownId === item.id}
						onOpenChange={() => handleDropdownToggle(item.id)}
					/>
				);
			},
		}
	];

	return (
		<div className={styles.AdminProductsCheckTable}>
			{isChangingPage ? (
				<SkeletonTable />
			) : (
				<GenericTable
					data={currentItems}
					columns={columns}
					getRowKey={(item) => item.id}
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

			{modalData?.type === "removeItem" && (
				<DeleteItemModal itemId={modalData.data} onClose={closeModal} />
			)}
		</div>
	);
}
