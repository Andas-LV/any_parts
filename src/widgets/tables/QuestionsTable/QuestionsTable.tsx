import React, { useState } from "react";
import styles from "./QuestionsTable.module.css";
import { PartnerQuestion } from "@/types/partners/Feedbacks";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "@components/ui/table";
import { partnerFeedbackStatuses } from "@/constants/status";
import { formatDate } from "@/utils/formatDate";
import { Button } from "@components/ui/button";
import { PaginationWithSelect } from "@components/PaginationBlock/PaginationBlock";
import QuestionResponse from "@/widgets/modals/partners/QuestionResponse/QuestionResponse";

interface QuestionsTableProps {
	items: PartnerQuestion[];
}

export default function QuestionsTable({ items }: QuestionsTableProps) {
	const [selectedQuestion, setSelectedQuestion] =
		useState<PartnerQuestion | null>(null);

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
		<div className={styles.QuestionsTable}>
			<Table>
				<TableHeader>
					<TableRow>
						<TableCell>Товар</TableCell>
						<TableCell>Статус</TableCell>
						<TableCell>Дата и время</TableCell>
						<TableCell>Покупатель</TableCell>
						<TableCell>Вопрос</TableCell>
						<TableCell>Ответы</TableCell>
						<TableCell>Полезный</TableCell>
					</TableRow>
				</TableHeader>
				<TableBody>
					{currentItems.map((item) => (
						<TableRow
							key={item.id}
							onClick={() => setSelectedQuestion(item)}
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
								<Button
									onClick={() => setSelectedQuestion(item)}
									className={"p-0 h-fit"}
									variant="link"
								>
									Содержание
								</Button>
							</TableCell>
							<TableCell>{item.answers} </TableCell>
							<TableCell>{item.helpful} </TableCell>
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

			{selectedQuestion && (
				<QuestionResponse
					question={selectedQuestion}
					onClose={() => setSelectedQuestion(null)}
				/>
			)}
		</div>
	);
}
