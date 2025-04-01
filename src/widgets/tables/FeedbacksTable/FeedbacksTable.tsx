"use client";

import React from "react";
import styles from "./FeedbacksTable.module.css";
import { PartnerFeedback } from "@/types/partners/Feedbacks";
import { GenericTable } from "@/components/GenericTable";
import { PaginationWithSelect } from "@components/PaginationBlock/PaginationBlock";
import { formatDate } from "@/utils/formatDate";
import { Button } from "@components/ui/button";
import { itemDeliveryStatuses, partnerFeedbackStatuses } from "@/constants/status";
import FeedbackResponse from "@/widgets/modals/partners/FeedbackResponse/FeedbackResponse";
import { usePagination } from "@/hooks/usePagination";
import { useModal } from "@/hooks/useModal";
import SkeletonTable from "@components/skeletons/SkeletonTable/SkeletonTable"
import { TAdminItems } from "@/types/admin/Items";

interface FeedbacksTableProps {
	items: PartnerFeedback[];
}

type ModalState = {
	data: PartnerFeedback;
};

export default function FeedbacksTable({ items }: FeedbacksTableProps) {
	const {
		currentPage,
		rowsPerPage,
		totalPages,
		handlePageChange,
		handleRowsChange,
		handleNextPage,
		handlePreviousPage,
		paginatedData,
		isChangingPage
	} = usePagination({
		initialPage: 1,
		initialRowsPerPage: 10,
		totalItems: items.length,
	});

	const currentItems = paginatedData(items);
	const { modalData, openModal, closeModal } = useModal<ModalState>();

	// Определяем столбцы для универсальной таблицы
	const columns = [
		{
			header: "Товар",
			render: (item: PartnerFeedback) => (
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
			accessor: "status" as keyof PartnerFeedback,
			sortable: true,
			render: (item: PartnerFeedback) => (
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
			accessor: "time" as keyof PartnerFeedback,
			sortable: true,
			render: (item: PartnerFeedback) => (
				<div className={styles.tableDateCell}>
					<span className={styles.date}>{formatDate(item.time).date}</span>
					<span className={styles.time}>{formatDate(item.time).time}</span>
				</div>
			),
		},
		{
			header: "Покупатель",
			render: (item: PartnerFeedback) => item.customer,
		},
		{
			header: "Статус получателя",
			render: (item: PartnerFeedback) => (
				<>
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
				</>
			),
		},
		{
			header: "Отзыв",
			render: (item: PartnerFeedback) => (
				<Button
					onClick={(e) => {
						// предотвращаем всплытие, если клик происходит внутри строки
						e.stopPropagation();
						openModal({ data: item });
					}}
					className={"p-0 h-fit"}
					variant="link"
				>
					Комментарий
				</Button>
			),
		},
		{
			header: "Оценка",
			render: (item: PartnerFeedback) => `${item.feedback.rating} / 5`,
		},
		{
			header: "Фото",
			render: (item: PartnerFeedback) =>
				item.feedback.images?.length ? item.feedback.images.length : "-",
		},
		{
			header: "Видео",
			render: (item: PartnerFeedback) => "-",
		},
		{
			header: "Ответы",
			render: (item: PartnerFeedback) =>
				item.feedback.replies?.length ? item.feedback.replies.length : "-",
		},
	];

	return (
		<div className={styles.FeedbacksTable}>
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
			{modalData && (
				<FeedbackResponse feedback={modalData.data} onClose={closeModal} />
			)}
		</div>
	);
}
