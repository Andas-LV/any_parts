"use client";

import React, { useState } from "react";
import styles from "./PartnerItemsList.module.css";
import { Plus, Search as SearchIcon } from "lucide-react";
import { Icons } from "@/assets/svg";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@components/ui/table";
import { partnerItemStatuses } from "@/constants/item";
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { tableItems } from "@/exampleData/examplePartnersItems";
import { ItemStatusValues } from "@/types/partners/TableItem";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";

export default function PartnerItemsList() {
	const { user } = useUserStore();
	const [search, setSearch] = useState("");
	const [selectedStatuses, setSelectedStatuses] = useState<ItemStatusValues[]>(
		[],
	);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const currencySymbol = user ? useCurrencySymbol(user.currency) : "";

	const handleStatusChange = (
		statusValue: ItemStatusValues,
		checked: boolean,
	) => {
		if (checked) {
			setSelectedStatuses((prev) => [...prev, statusValue]);
		} else {
			setSelectedStatuses((prev) =>
				prev.filter((status) => status !== statusValue),
			);
		}
	};

	const filteredItems = tableItems.filter(
		(item) =>
			selectedStatuses.every((status) => item.statuses.includes(status)) &&
			(item.productName.toLowerCase().includes(search.toLowerCase()) ||
				item.article.toLowerCase().includes(search.toLowerCase())),
	);

	return (
		<div className={styles.PartnerItemsList}>
			<div className={styles.header}>
				<h2>Список товаров</h2>

				<div className={styles.actions}>
					<div className={styles.searchWrapper}>
						<SearchIcon className={styles.searchIcon} />

						<input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							type="text"
							placeholder="Название, артикул, штрихкод"
							className={styles.searchInput}
						/>
					</div>

					<div className={styles.filter}>
						<DropdownMenu
							open={isDropdownOpen}
							onOpenChange={setIsDropdownOpen}
						>
							<DropdownMenuTrigger className={styles.statusSelect}>
								Статус
								<Icons.ArrowDown
									className={`${styles.arrowIcon} ${isDropdownOpen ? styles.rotated : ""}`}
								/>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								{partnerItemStatuses.map((status) => (
									<DropdownMenuItem key={status.value}>
										<Checkbox
											className={styles.checkbox}
											checked={selectedStatuses.includes(status.value)}
											onCheckedChange={(checked) =>
												handleStatusChange(status.value, !!checked)
											}
										/>

										<div
											className={styles.status}
											style={{ background: `${status.backgroundColor}` }}
										>
											{status.icon && <Icons.ArrowLineUp color={"black"} />}
											{status.status}
										</div>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					<Button>
						<Plus /> Добавить товар
					</Button>
				</div>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableCell>
							<Checkbox />
						</TableCell>
						<TableCell>Товар</TableCell>
						<TableCell>Артикул</TableCell>
						<TableCell>Статус</TableCell>
						<TableCell>Цена</TableCell>
						<TableCell>Склад AP</TableCell>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredItems.map((item) => (
						<TableRow key={item.id}>
							<TableCell>
								<Checkbox className={styles.checkBox} />
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
									{item.statuses.map((status) => (
										<span
											key={status}
											className={styles.status}
											style={{
												background: partnerItemStatuses.find(
													(s) => s.value === status,
												)?.backgroundColor,
											}}
										>
											{
												partnerItemStatuses.find((s) => s.value === status)
													?.status
											}
										</span>
									))}
								</div>
							</TableCell>
							<TableCell>
								{item.price} {currencySymbol}
							</TableCell>
							<TableCell>{item.inStockRoom}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
