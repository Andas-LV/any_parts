import React, { useState, useMemo } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "@components/ui/table";
import { Icons } from "@/assets/svg/svg";

type Column<T> = {
	header: React.ReactNode;
	render: (item: T) => React.ReactNode;
	accessor?: keyof T;
	sortable?: boolean;
};

interface GenericTableProps<T> {
	data: T[];
	columns: Column<T>[];
	getRowKey?: (item: T) => string | number;
}

export function GenericTable<T>({
	data,
	columns,
	getRowKey,
}: GenericTableProps<T>) {
	const [sortBy, setSortBy] = useState<keyof T | null>(null);
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

	// Сортировка
	const sortedData = useMemo(() => {
		if (!sortBy) return data;
		return [...data].sort((a, b) => {
			const aValue = a[sortBy];
			const bValue = b[sortBy];

			if (typeof aValue === "number" && typeof bValue === "number") {
				return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
			}

			if (typeof aValue === "string" && typeof bValue === "string") {
				return sortDirection === "asc"
					? aValue.localeCompare(bValue)
					: bValue.localeCompare(aValue);
			}

			return 0;
		});
	}, [data, sortBy, sortDirection]);

	const handleSort = (accessor?: keyof T) => {
		if (!accessor) return;
		if (sortBy === accessor) {
			setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
		} else {
			setSortBy(accessor);
			setSortDirection("asc");
		}
	};

	return (
		<Table>
			<TableHeader>
				<TableRow>
					{columns.map((col, index) => (
						<TableCell
							key={index}
							style={{ cursor: col.sortable ? "pointer" : "default" }}
							onClick={() => col.sortable && handleSort(col.accessor)}
						>
							<div className={"flex items-center"}>
								{col.header}
								{col.sortable && col.accessor === sortBy && (
									<span style={{ marginLeft: 4 }}>
										{sortDirection === "asc" ? (
											<Icons.ArrowUp />
										) : (
											<Icons.ArrowDown />
										)}
									</span>
								)}
							</div>
						</TableCell>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{sortedData.map((item, index) => {
					const key = getRowKey ? getRowKey(item) : index;
					return (
						<TableRow key={key}>
							{columns.map((col, idx) => (
								<TableCell key={idx}>{col.render(item)}</TableCell>
							))}
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
