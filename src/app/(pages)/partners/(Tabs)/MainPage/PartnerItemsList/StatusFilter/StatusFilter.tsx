import React, { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Checkbox } from "@components/ui/checkbox";
import { Icons } from "@/assets/svg";
import { partnerItemStatuses } from "@/constants/item";
import styles from "./StatusFilter.module.css";
import {
	ItemStatusValues,
	PromotionStatuses,
} from "@/types/partners/TableItem";

interface StatusFilterProps {
	selectedStatuses: ItemStatusValues[];
	setSelectedStatuses: React.Dispatch<React.SetStateAction<ItemStatusValues[]>>;
}

export default function StatusFilter({
	selectedStatuses,
	setSelectedStatuses,
}: StatusFilterProps) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleStatusChange = (
		statusValue: ItemStatusValues,
		checked: boolean,
	) => {
		if (checked) {
			setSelectedStatuses((prev) => [...prev, statusValue]);
		} else {
			setSelectedStatuses((prev) =>
				prev.filter((status) => status !== statusValue),
			);
		}
	};

	return (
		<div className={styles.filter}>
			<DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
				<DropdownMenuTrigger className={styles.statusSelect}>
					Статус
					<Icons.ArrowDown
						className={`${styles.arrowIcon} ${isDropdownOpen ? styles.rotated : ""}`}
					/>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{partnerItemStatuses.map((status) => (
						<DropdownMenuItem key={status.value}>
							<Checkbox
								className={styles.checkbox}
								checked={selectedStatuses.includes(status.value)}
								onCheckedChange={(checked) =>
									handleStatusChange(status.value, !!checked)
								}
							/>
							<div
								className={styles.status}
								style={{ background: `${status.backgroundColor}` }}
							>
								{PromotionStatuses.includes(status.value) && (
									<Icons.ArrowLineUp color={"black"} />
								)}
								{status.status}
							</div>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
