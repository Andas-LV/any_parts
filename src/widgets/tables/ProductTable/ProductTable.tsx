import React, { useState } from "react";
import styles from "./ProductTable.module.css";
import {
	TPartnersItem,
	TPromotionStatuses,
	PromotionStatuses,
} from "@/types/partners/Items";
import { partnerItemStatuses } from "@/constants/status";
import { Icons } from "@/assets/svg/svg";
import { useDealerItemsStore } from "@/entities/partners/items/useDealerItemsStore";
import { PaginationWithSelect } from "@components/PaginationBlock/PaginationBlock";
import { usePagination } from "@/hooks/usePagination";
import { GenericTable } from "@/components/GenericTable";
import { Checkbox } from "@components/ui/checkbox";
import { ActionMenu } from "@components/ActionMenu";
import SkeletonTable from "@components/skeletons/SkeletonTable/SkeletonTable";
import { CurrencySymbol } from "@/hooks/useCurrency";

interface ProductTableProps {
	filteredItems: TPartnersItem[];
	currencySymbol: CurrencySymbol | null;
}

export default function ProductTable({
	filteredItems,
	currencySymbol,
}: ProductTableProps) {
	const { allItems, toggleSelect, toggleSelectAll, selectedItems } =
		useDealerItemsStore();
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
		isChangingPage,
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

	const columns = [
		{
			header: (
				<Checkbox checked={isAllSelected} onCheckedChange={toggleSelectAll} />
			),
			render: (item: TPartnersItem) => (
				<Checkbox
					className={styles.checkBox}
					checked={selectedItems().some((selected) => selected.id === item.id)}
					onCheckedChange={() => toggleSelect(item.id)}
				/>
			),
		},
		{
			header: "Товар",
			render: (item: TPartnersItem) => (
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
			render: (item: TPartnersItem) => (
				<div className={styles.tableCell}>
					<p className={styles.article}>{item.article}</p>
					{item.barcode}
				</div>
			),
		},
		{
			header: "Статус",
			render: (item: TPartnersItem) => (
				<div className={styles.tableStatusCell}>
					{item.statuses.map((status, index) => {
						const statusInfo = partnerItemStatuses.find(
							(s) => s.value === status,
						);
						return (
							<span
								key={index}
								className={styles.status}
								style={{ background: statusInfo?.backgroundColor }}
							>
								{PromotionStatuses.includes(status as TPromotionStatuses) && (
									<Icons.ArrowLineUp color="black" />
								)}
								{statusInfo?.status}
							</span>
						);
					})}
				</div>
			),
		},
		{
			header: "Цена",
			accessor: "price" as keyof TPartnersItem,
			sortable: true,
			render: (item: TPartnersItem) => (
				<>
					{item.price} {currencySymbol}
				</>
			),
		},
		{
			header: "Склад AP",
			accessor: "inStockRoom" as keyof TPartnersItem,
			sortable: true,
			render: (item: TPartnersItem) => item.inStockRoom,
		},
		{
			header: "",
			render: (item: TPartnersItem) => (
				<ActionMenu
					actions={[
						{
							label: "Редактировать товар",
							onClick: () => console.log(item.id),
						},
						{
							label: "Скачать штрихкод в PDF",
							onClick: () => console.log(item.id),
						},
					]}
					open={openDropdownId === item.id}
					onOpenChange={() => handleDropdownToggle(item.id)}
				/>
			),
		},
	];

	return (
		<div className={styles.ProductTable}>
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
		</div>
	);
}
