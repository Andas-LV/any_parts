import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import styles from "./RefundTable.module.css";
import { RefundItem, TRefundStatus } from "@/types/Refund";
import { getRefundStatusStyle } from "./utils/getRefundStatusStyle";
import { renderStatusAction } from "./utils/RenderStatusAction/RenderStatusAction";

interface RefundTableProps {
	items: RefundItem[];
	currencySymbol: string;
}

const RefundTable: React.FC<RefundTableProps> = ({
	items,
	currencySymbol,
}) => {
	return (
		<div className={styles.tableWrapper}>
			{items && items.length > 0 && (
				<Table className={styles.table}>
					<TableHeader className={styles.tableHeader}>
						<TableRow className={styles.tableRow}>
							<TableHead className={styles.tableHead}>№ претензии</TableHead>
							<TableHead className={styles.tableHead}>Дата</TableHead>
							<TableHead className={styles.tableHead}>
								Цена {currencySymbol}
							</TableHead>
							<TableHead className={styles.tableHead}>Статус</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{items.map((item) => (
							<TableRow key={item.id} className={styles.tableRow}>
								<TableCell className={styles.tableCell}>{item.id}</TableCell>
								<TableCell className={styles.tableCell}>
									{item.createdAt.toLocaleDateString()}
								</TableCell>
								<TableCell className={styles.tableCell}>
									{item.price.toLocaleString("ru-RU")}
								</TableCell>
								<TableCell className={styles.tableCell}>
									<span
										className={getRefundStatusStyle(
											item.status as TRefundStatus,
										)}
									>
										{item.status}
									</span>
									{renderStatusAction(item)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</div>
	);
};

export default RefundTable;
