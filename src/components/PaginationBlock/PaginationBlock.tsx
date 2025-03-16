import React from "react";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
} from "@components/ui/pagination";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@components/ui/select";
import styles from "./PaginationBlock.module.css";

interface PaginationWithSelectProps {
	currentPage: number;
	totalPages: number;
	rowsPerPage: number;
	onRowsPerPageChange: (rows: number) => void;
	onPageChange: (page: number) => void;
	onNextPage: () => void;
	onPreviousPage: () => void;
}

export const PaginationWithSelect = ({
	currentPage,
	totalPages,
	rowsPerPage,
	onRowsPerPageChange,
	onPageChange,
	onNextPage,
	onPreviousPage,
}: PaginationWithSelectProps) => {
	return (
		<div className={styles.paginationWrapper}>
			<Select
				value={rowsPerPage.toString()}
				onValueChange={(value) => onRowsPerPageChange(Number(value))}
			>
				<SelectTrigger>{rowsPerPage} строк</SelectTrigger>
				<SelectContent>
					<SelectItem value="10">10 строк</SelectItem>
					<SelectItem value="15">15 строк</SelectItem>
					<SelectItem value="20">20 строк</SelectItem>
					<SelectItem value="25">25 строк</SelectItem>
					<SelectItem value="30">30 строк</SelectItem>
				</SelectContent>
			</Select>

			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationLink
							isActive={currentPage === 1}
							onClick={() => onPageChange(1)}
						>
							1
						</PaginationLink>
					</PaginationItem>

					{currentPage > 3 && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}

					{currentPage > 2 && (
						<PaginationItem>
							<PaginationLink onClick={() => onPageChange(currentPage - 1)}>
								{currentPage - 1}
							</PaginationLink>
						</PaginationItem>
					)}

					{currentPage !== 1 && currentPage !== totalPages && (
						<PaginationItem>
							<PaginationLink
								isActive
								onClick={() => onPageChange(currentPage)}
							>
								{currentPage}
							</PaginationLink>
						</PaginationItem>
					)}

					{currentPage < totalPages - 1 && (
						<PaginationItem>
							<PaginationLink onClick={() => onPageChange(currentPage + 1)}>
								{currentPage + 1}
							</PaginationLink>
						</PaginationItem>
					)}

					{currentPage < totalPages - 2 && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}

					{totalPages > 1 && (
						<PaginationItem>
							<PaginationLink
								isActive={currentPage === totalPages}
								onClick={() => onPageChange(totalPages)}
							>
								{totalPages}
							</PaginationLink>
						</PaginationItem>
					)}
				</PaginationContent>
			</Pagination>

			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious onClick={onPreviousPage} />
					</PaginationItem>
					<PaginationItem>
						<PaginationNext onClick={onNextPage} />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
};
