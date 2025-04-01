import { useState } from "react";

interface UsePaginationProps {
	initialPage?: number;
	initialRowsPerPage?: number;
	totalItems: number;
}

export function usePagination({ initialPage = 1, initialRowsPerPage = 10, totalItems }: UsePaginationProps) {
	const [currentPage, setCurrentPage] = useState(initialPage);
	const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
	const [isChangingPage, setIsChangingPage] = useState(false);

	const totalPages = Math.ceil(totalItems / rowsPerPage);

	const triggerPageChange = (page: number) => {
		setIsChangingPage(true);
		setTimeout(() => {
			setCurrentPage(page);
			setIsChangingPage(false);
		}, 500);
	};

	const handlePageChange = triggerPageChange;
	const handleNextPage = () => {
		if (currentPage < totalPages) triggerPageChange(currentPage + 1);
	};
	const handlePreviousPage = () => {
		if (currentPage > 1) triggerPageChange(currentPage - 1);
	};

	const handleRowsChange = (rows: number) => {
		setRowsPerPage(rows);
		triggerPageChange(1); // Сброс на первую страницу
	};

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
		isChangingPage,
	};
}
