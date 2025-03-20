import React, { useState } from "react";
import styles from "./PartnerItemsQuestions.module.css";
import SearchBar from "@components/SearchBar/SearchBar";
import DateRangePicker from "@components/DateRangePicker/DateRangePicker";
import QuestionsTable from "@/widgets/tables/QuestionsTable/QuestionsTable";
import { useDealerItemsStore } from "@/entities/partners/items/useDealerItemsStore";
import { DateRange } from "react-day-picker";

export default function PartnerItemsQuestions() {
	const { itemQuestions } = useDealerItemsStore();
	const [search, setSearch] = useState<string>("");
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: undefined,
		to: undefined,
	});
	const [appliedDateRange, setAppliedDateRange] = useState<
		DateRange | undefined
	>({
		from: undefined,
		to: undefined,
	});

	const [isPopoverOpen, setPopoverOpen] = useState(false);

	const filteredItems = itemQuestions.filter((item) => {
		const matchesSearch =
			item.item.productName?.toLowerCase().includes(search.toLowerCase()) ||
			item.item.article?.toLowerCase().includes(search.toLowerCase()) ||
			item.item.barcode?.toLowerCase().includes(search.toLowerCase());

		const itemDate = item.time ? new Date(item.time) : null;
		const matchesDate =
			!appliedDateRange?.from ||
			!appliedDateRange?.to ||
			(itemDate &&
				appliedDateRange.from &&
				appliedDateRange.to &&
				itemDate >= appliedDateRange.from &&
				itemDate <= appliedDateRange.to);

		return matchesSearch && matchesDate;
	});

	return (
		<div className={styles.PartnerItemsQuestions}>
			<h2>Вопросы пользователей</h2>
			<div className={styles.header}>
				<div className={styles.actions}>
					<SearchBar
						search={search}
						placeholder={"Название, артикул, штрихкод"}
						onSearchChange={(e) => setSearch(e.target.value)}
					/>
					<DateRangePicker
						dateRange={dateRange}
						setDateRange={setDateRange}
						setAppliedDateRange={setAppliedDateRange}
						isPopoverOpen={isPopoverOpen}
						setPopoverOpen={setPopoverOpen}
					/>
				</div>
			</div>
			<QuestionsTable items={filteredItems} />
		</div>
	);
}
