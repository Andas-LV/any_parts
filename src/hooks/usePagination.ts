// usePagination.ts

import { useState } from "react";

interface UsePaginationProps {
	initialPage?: number;
	initialRowsPerPage?: number;
	totalItems: number;
}

export function usePagination({
	initialPage = 1,
	initialRowsPerPage = 10,
	totalItems,
}: UsePaginationProps) {
	const [currentPage, setCurrentPage] = useState(initialPage);
	const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

	const totalPages = Math.ceil(totalItems / rowsPerPage);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleRowsChange = (rows: number) => {
		setRowsPerPage(rows);
		// При смене кол-ва строк сбрасываем на первую страницу
		setCurrentPage(1);
	};

	// Функции для кнопок "Следующая страница" / "Предыдущая страница"
	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage((prev) => prev + 1);
		}
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage((prev) => prev - 1);
		}
	};

	// Для отрисовки части данных (если нужно)
	const paginatedData = <T>(data: T[]) => {
		const start = (currentPage - 1) * rowsPerPage;
		const end = currentPage * rowsPerPage;
		return data.slice(start, end);
	};

	return {
		currentPage,
		rowsPerPage,
		totalPages,
		handlePageChange,
		handleRowsChange,
		handleNextPage,
		handlePreviousPage,
		paginatedData,
	};
}
