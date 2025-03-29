"use client";

import React from "react";
import styles from "./QuestionsTable.module.css";
import { PartnerQuestion } from "@/types/partners/Feedbacks";
import { GenericTable } from "@/components/GenericTable";
import { partnerFeedbackStatuses } from "@/constants/status";
import { formatDate } from "@/utils/formatDate";
import { Button } from "@components/ui/button";
import { PaginationWithSelect } from "@components/PaginationBlock/PaginationBlock";
import QuestionResponse from "@/widgets/modals/partners/QuestionResponse/QuestionResponse";
import { usePagination } from "@/hooks/usePagination";
import { useModal } from "@/hooks/useModal";

interface QuestionsTableProps {
	items: PartnerQuestion[];
}

type ModalState = {
	data: PartnerQuestion;
};

export default function QuestionsTable({ items }: QuestionsTableProps) {
	const {
		currentPage,
		rowsPerPage,
		totalPages,
		handlePageChange,
		handleRowsChange,
		handleNextPage,
		handlePreviousPage,
		paginatedData,
	} = usePagination({
		initialPage: 1,
		initialRowsPerPage: 10,
		totalItems: items.length,
	});

	const currentItems = paginatedData(items);
	const { modalData, openModal, closeModal } = useModal<ModalState>();

	const columns = [
		{
			header: "Товар",
			render: (item: PartnerQuestion) => (
				<div className={styles.tableProductCell}>
					<img
						src={item.item.image}
						alt={item.item.productName}
						className={styles.image}
					/>
					<div>
						<p className={styles.productName}>{item.item.productName}</p>
						{item.item.category}
					</div>
				</div>
			),
		},
		{
			header: "Статус",
			render: (item: PartnerQuestion) => (
				<>
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
				</>
			),
		},
		{
			header: "Дата и время",
			render: (item: PartnerQuestion) => (
				<div className={styles.tableDateCell}>
					<span className={styles.date}>{formatDate(item.time).date}</span>
					<span className={styles.time}>{formatDate(item.time).time}</span>
				</div>
			),
		},
		{
			header: "Покупатель",
			render: (item: PartnerQuestion) => item.customer,
		},
		{
			header: "Вопрос",
			render: (item: PartnerQuestion) => (
				<Button
					onClick={(e) => {
						e.stopPropagation();
						openModal({ data: item });
					}}
					className="p-0 h-fit"
					variant="link"
				>
					Содержание
				</Button>
			),
		},
		{
			header: "Ответы",
			render: (item: PartnerQuestion) => item.answers,
		},
		{
			header: "Полезный",
			render: (item: PartnerQuestion) => item.helpful,
		},
	];

	return (
		<div className={styles.QuestionsTable}>
			<GenericTable
				data={currentItems}
				columns={columns}
				getRowKey={(item) => item.id}
			/>
			<PaginationWithSelect
				currentPage={currentPage}
				totalPages={totalPages}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleRowsChange}
				onPageChange={handlePageChange}
				onNextPage={handleNextPage}
				onPreviousPage={handlePreviousPage}
			/>
			{modalData && (
				<QuestionResponse question={modalData.data} onClose={closeModal} />
			)}
		</div>
	);
}
