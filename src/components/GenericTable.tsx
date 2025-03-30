import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "@components/ui/table";

type Column<T> = {
	header: React.ReactNode;
	render: (item: T) => React.ReactNode;
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
	return (
		<Table>
			<TableHeader>
				<TableRow>
					{columns.map((col, index) => (
						<TableCell key={index}>{col.header}</TableCell>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((item, index) => {
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
