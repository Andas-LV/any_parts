"use client";

import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "@components/ui/table";
import { Checkbox } from "@components/ui/checkbox";
import { partnerItemStatuses } from "@/constants/status";
import {
	PromotionStatuses,
	Items,
	TPromotionStatuses,
} from "@/types/partners/Items";
import styles from "./ProductTable.module.css";
import { Icons } from "@/assets/svg";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useDealerItemsStore } from "@/entities/partners/items/useDealerItemsStore";
import { PaginationWithSelect } from "@components/PaginationBlock/PaginationBlock";

interface ProductTableProps {
	filteredItems: Items[];
	currencySymbol: string;
}

export default function ProductTable({
	filteredItems,
	currencySymbol,
}: ProductTableProps) {
	const { allItems, toggleSelect, toggleSelectAll, selectedItems } =
		useDealerItemsStore();
	const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const totalPages = Math.ceil(filteredItems.length / rowsPerPage);
	const currentItems = filteredItems.slice(
		(currentPage - 1) * rowsPerPage,
		currentPage * rowsPerPage,
	);
	const isAllSelected =
		allItems.length > 0 &&
		allItems.every((item) =>
			selectedItems().some((selected) => selected.id === item.id),
		);

	const handleDropdownToggle = (id: number) =>
		setOpenDropdownId((prev) => (prev === id ? null : id));
	const handlePageChange = (page: number) => setCurrentPage(page);
	const handleRowsChange = (rows: number) => {
		setRowsPerPage(rows);
		setCurrentPage(1);
	};

	return (
		<div className={styles.ProductTable}>
			<Table>
				<TableHeader>
					<TableRow>
						<TableCell>
							<Checkbox
								checked={isAllSelected}
								onCheckedChange={toggleSelectAll}
							/>
						</TableCell>
						<TableCell>Товар</TableCell>
						<TableCell>Артикул</TableCell>
						<TableCell>Статус</TableCell>
						<TableCell>Цена</TableCell>
						<TableCell>Склад AP</TableCell>
						<TableCell></TableCell>
					</TableRow>
				</TableHeader>
				<TableBody>
					{currentItems.map((item) => (
						<TableRow key={item.id}>
							<TableCell>
								<Checkbox
									className={styles.checkBox}
									checked={selectedItems().some(
										(selected) => selected.id === item.id,
									)}
									onCheckedChange={() => toggleSelect(item.id)}
								/>
							</TableCell>
							<TableCell>
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
							</TableCell>
							<TableCell className={styles.tableCell}>
								<p className={styles.article}>{item.article}</p>
								{item.barcode}
							</TableCell>
							<TableCell>
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
												{PromotionStatuses.includes(
													status as TPromotionStatuses,
												) && <Icons.ArrowLineUp color="black" />}
												{statusInfo?.status}
											</span>
										);
									})}
								</div>
							</TableCell>
							<TableCell>
								{item.price} {currencySymbol}
							</TableCell>
							<TableCell>{item.inStockRoom}</TableCell>
							<TableCell>
								<DropdownMenu
									open={openDropdownId === item.id}
									onOpenChange={() => handleDropdownToggle(item.id)}
								>
									<DropdownMenuTrigger className={styles.actionDots}>
										<Icons.DotsThreeVertical />
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuItem>Редактировать товар</DropdownMenuItem>
										<DropdownMenuItem>Скачать штрихкод в PDF</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<PaginationWithSelect
				currentPage={currentPage}
				totalPages={totalPages}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleRowsChange}
				onPageChange={handlePageChange}
				onNextPage={() =>
					currentPage < totalPages && setCurrentPage((prev) => prev + 1)
				}
				onPreviousPage={() =>
					currentPage > 1 && setCurrentPage((prev) => prev - 1)
				}
			/>
		</div>
	);
}
