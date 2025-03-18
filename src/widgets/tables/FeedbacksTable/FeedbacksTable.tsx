import React, { useState } from "react";
import styles from "./FeedbacksTable.module.css";
import { PartnerFeedback } from "@/types/partners/Feedbacks";
import { useDealerItemsStore } from "@/entities/partners/items/useDealerItemsStore";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "@components/ui/table";
import { PaginationWithSelect } from "@components/PaginationBlock/PaginationBlock";
import { formatDate } from "@/hooks/formatDate";
import { Button } from "@components/ui/button";
import {
	itemDeliveryStatuses,
	partnerFeedbackStatuses,
} from "@/constants/status";
import QuestionResponse from "@/widgets/modals/partners/QuestionResponse/QuestionResponse";
import FeedbackResponse from "@/widgets/modals/partners/FeedbackResponse/FeedbackResponse";

interface FeedbacksTableProps {
	items: PartnerFeedback[];
}

export default function FeedbacksTable({ items }: FeedbacksTableProps) {
	const { allItems } = useDealerItemsStore();
	const [selectedFeedback, setSelectedFeedback] =
		useState<PartnerFeedback | null>(null);

	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const totalPages = Math.ceil(items.length / rowsPerPage);
	const currentItems = items.slice(
		(currentPage - 1) * rowsPerPage,
		currentPage * rowsPerPage,
	);

	const handlePageChange = (page: number) => setCurrentPage(page);
	const handleRowsChange = (rows: number) => {
		setRowsPerPage(rows);
		setCurrentPage(1);
	};

	return (
		<div className={styles.FeedbacksTable}>
			<Table>
				<TableHeader>
					<TableRow>
						<TableCell>Товар</TableCell>
						<TableCell>Статус</TableCell>
						<TableCell>Дата и время</TableCell>
						<TableCell>Покупатель</TableCell>
						<TableCell>Статус получателя</TableCell>
						<TableCell>Отзыв</TableCell>
						<TableCell>Оценка</TableCell>
						<TableCell>Фото</TableCell>
						<TableCell>Видео</TableCell>
						<TableCell>Ответы</TableCell>
					</TableRow>
				</TableHeader>
				<TableBody>
					{currentItems.map((item) => (
						<TableRow
							key={item.id}
							onClick={() => setSelectedFeedback(item)}
							className={"cursor-pointer"}
						>
							<TableCell>
								<div className={styles.tableProductCell}>
									<img
										src={item.item.image}
										alt={item.item.productName}
										className={styles.image}
									/>
									<div>
										<p className={styles.productName}>
											{item.item.productName}
										</p>
										{item.item.category}
									</div>
								</div>
							</TableCell>
							<TableCell className={styles.tableCell}>
								{partnerFeedbackStatuses
									.filter((s) => s.name === item.status)
									.map((status) => (
										<div
											key={status.name}
											style={{ backgroundColor: status.backgroundColor }}
											className={styles.status}
										>
											{status.name}
										</div>
									))}
							</TableCell>
							<TableCell>
								<div className={styles.tableDateCell}>
									<span className={styles.date}>
										{formatDate(item.time).date}
									</span>
									<span className={styles.time}>
										{formatDate(item.time).time}
									</span>
								</div>
							</TableCell>
							<TableCell>{item.customer}</TableCell>
							<TableCell>
								{itemDeliveryStatuses
									.filter((s) => s.name === item.receiverStatus)
									.map((status) => (
										<div
											key={status.name}
											style={{ backgroundColor: status.backgroundColor }}
											className={styles.status}
										>
											{item.receiverStatus}
										</div>
									))}
							</TableCell>
							<TableCell>
								<Button
									onClick={() => setSelectedFeedback(item)}
									className={"p-0 h-fit"}
									variant="link"
								>
									Комментарий
								</Button>
							</TableCell>
							<TableCell>{item.feedback.rating} / 5</TableCell>
							<TableCell>
								{item.feedback.images?.length
									? item.feedback.images.length
									: "-"}
							</TableCell>
							<TableCell>-</TableCell>
							<TableCell>
								{item.feedback.replies?.length
									? item.feedback.replies.length
									: "-"}
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

			{selectedFeedback && (
				<FeedbackResponse
					feedback={selectedFeedback}
					onClose={() => setSelectedFeedback(null)}
				/>
			)}
		</div>
	);
}
