// DateRangePicker.tsx
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { ru } from "date-fns/locale";
import { formatDate } from "@/hooks/formatDate";
import styles from "./DateRangePicker.module.css";

interface DateRangePickerProps {
	dateRange: DateRange | undefined;
	setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
	setAppliedDateRange: React.Dispatch<
		React.SetStateAction<DateRange | undefined>
	>;
	isPopoverOpen: boolean;
	setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
	dateRange,
	setDateRange,
	setAppliedDateRange,
	isPopoverOpen,
	setPopoverOpen,
}) => {
	const handleApplyDateRange = () => {
		setAppliedDateRange(dateRange);
		setPopoverOpen(false);
	};

	const handleCancelDateRange = () => {
		setDateRange({ from: undefined, to: undefined });
		setPopoverOpen(false);
	};

	return (
		<Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" className={styles.popoverTrigger}>
					{dateRange?.from ? (
						dateRange.to ? (
							<div className={styles.dateRange}>
								<span>{formatDate(dateRange.from).date}</span> -
								<span>{formatDate(dateRange.to).date}</span>
							</div>
						) : (
							<div>{formatDate(dateRange.from).date}</div>
						)
					) : (
						<span>Дата начала - Дата окончания</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className={styles.popoverContent} align="start">
				<Calendar
					mode="range"
					selected={dateRange}
					onSelect={setDateRange}
					initialFocus
					locale={ru}
				/>
				{(dateRange?.from || dateRange?.to) && (
					<div className={styles.datePickerBtns}>
						<Button
							className={styles.cancelBtn}
							variant="ghost"
							onClick={handleCancelDateRange}
						>
							Отменить
						</Button>
						<Button className={styles.applyBtn} onClick={handleApplyDateRange}>
							Применить
						</Button>
					</div>
				)}
			</PopoverContent>
		</Popover>
	);
};

export default DateRangePicker;
