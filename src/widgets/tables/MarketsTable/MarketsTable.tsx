"use client";

import React, { useMemo, useState } from "react";
import styles from "./MarketsTable.module.css";
import { useAdminMarketsStore } from "@/entities/admin/markets/useAdminMarketsStore";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "@components/ui/table";
import { Checkbox } from "@components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { PaginationWithSelect } from "@components/PaginationBlock/PaginationBlock";
import { TMarketFullInfo, TMarketsList } from "@/types/admin/Markets";
import { marketStatuses } from "@/constants/status";
import { Icons } from "@/assets/svg";
import { exampleMarketFullInfo } from "@/exampleData/admin/exampleMarketFullInfo";
import MarketFullInfoModal from "@/widgets/modals/admin/MarketFullInfoModal/MarketFullInfoModal";
import AdminTreatmentCancellationModal from "@/widgets/modals/admin/AdminTreatmentCancellationModal/AdminTreatmentCancellationModal";
import { formatDateWithDuration } from "@/utils/formatDate";

type ModalType = "fullInfo" | "cancel" | null;

interface MarketsTableProps {
	filteredMarkets: TMarketsList[];
	currencySymbol: string;
}

export default function MarketsTable({
	filteredMarkets,
	currencySymbol,
}: MarketsTableProps) {
	const { allMarkets, toggleSelect, toggleSelectAll, selectedMarkets } =
		useAdminMarketsStore();
	const [selectedMarket, setSelectedMarket] = useState<TMarketFullInfo | null>(
		null,
	);
	const [modalType, setModalType] = useState<ModalType>(null);

	const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const totalPages = Math.ceil(filteredMarkets.length / rowsPerPage);

	const currentMarkets = useMemo(() => {
		return filteredMarkets.slice(
			(currentPage - 1) * rowsPerPage,
			currentPage * rowsPerPage,
		);
	}, [filteredMarkets, currentPage, rowsPerPage]);

	const isAllSelected =
		allMarkets.length > 0 &&
		allMarkets.every((item) =>
			selectedMarkets().some((selected) => selected.id === item.id),
		);

	const handleDropdownToggle = (id: number) =>
		setOpenDropdownId((prev) => (prev === id ? null : id));
	const handlePageChange = (page: number) => setCurrentPage(page);
	const handleRowsChange = (rows: number) => {
		setRowsPerPage(rows);
		setCurrentPage(1);
	};

	const handleOpenFullInfo = (id: number) => {
		setSelectedMarket(exampleMarketFullInfo[id - 1]);
		setModalType("fullInfo");
	};

	const handleCancelTreatment = (id: number) => {
		setSelectedMarket(exampleMarketFullInfo[id - 1]);
		setModalType("cancel");
	};

	return (
		<div className={styles.MarketsTable}>
			<Table>
				<TableHeader>
					<TableRow>
						<TableCell>
							<Checkbox
								checked={isAllSelected}
								onCheckedChange={toggleSelectAll}
							/>
						</TableCell>
						<TableCell>Магазин</TableCell>
						<TableCell>Дата регистрации</TableCell>
						<TableCell>Страна регистрации</TableCell>
						<TableCell>Статус</TableCell>
						<TableCell>Контактный номер</TableCell>
						<TableCell>Продажи({currencySymbol})</TableCell>
						<TableCell></TableCell>
					</TableRow>
				</TableHeader>
				<TableBody>
					{currentMarkets.map((market) => {
						const statusInfo = marketStatuses.find(
							(s) => s.name === market.status,
						);
						return (
							<TableRow key={market.id}>
								<TableCell>
									<Checkbox
										checked={selectedMarkets().some(
											(selected) => selected.id === market.id,
										)}
										onCheckedChange={() => toggleSelect(market.id)}
									/>
								</TableCell>
								<TableCell>{market.marketName}</TableCell>
								<TableCell>
									{formatDateWithDuration(market.registrationDate)}
								</TableCell>
								<TableCell>{market.country}</TableCell>
								<TableCell>
									<span
										className={styles.status}
										style={{ background: statusInfo?.backgroundColor }}
									>
										{statusInfo?.name}
									</span>
								</TableCell>
								<TableCell>{market.contactNumber}</TableCell>
								<TableCell>{market.sellsCount}</TableCell>
								<TableCell>
									<DropdownMenu
										open={openDropdownId === market.id}
										onOpenChange={() => handleDropdownToggle(market.id)}
									>
										<DropdownMenuTrigger className={styles.actionDots}>
											<Icons.DotsThreeVertical />
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuItem
												onClick={() => handleOpenFullInfo(market.id)}
											>
												Узнать больше
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() => handleCancelTreatment(market.id)}
											>
												Расторгнуть договор
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						);
					})}
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

			{modalType === "fullInfo" && selectedMarket && (
				<MarketFullInfoModal
					market={selectedMarket}
					onClose={() => {
						setModalType(null);
						setSelectedMarket(null);
					}}
				/>
			)}
			{modalType === "cancel" && selectedMarket && (
				<AdminTreatmentCancellationModal
					market={selectedMarket}
					onClose={() => {
						setModalType(null);
						setSelectedMarket(null);
					}}
				/>
			)}
		</div>
	);
}
