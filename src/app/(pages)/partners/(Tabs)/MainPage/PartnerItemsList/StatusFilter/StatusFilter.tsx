import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Checkbox } from "@components/ui/checkbox";
import { Icons } from "@/assets/svg/svg";
import styles from "./StatusFilter.module.css";
import {
	PromotionStatuses,
	TPartnerItemStatuses,
	TPromotionStatuses,
} from "@/types/partners/Items";
import { useDealerItemsStore } from "@/entities/partners/items/useDealerItemsStore";

interface StatusFilterProps {
	statuses: TPartnerItemStatuses[];
}

export default function StatusFilter({ statuses }: StatusFilterProps) {
	const { filterStatus, setFilterStatus } = useDealerItemsStore();
	const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

	const handleStatusChange = (
		statusValue: TPromotionStatuses,
		checked: boolean,
	) => {
		setFilterStatus(
			checked
				? [...filterStatus, statusValue]
				: filterStatus.filter((status) => status !== statusValue),
		);
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
					{statuses.map((status) => (
						<DropdownMenuItem key={status.value}>
							<Checkbox
								className={styles.checkbox}
								checked={filterStatus.includes(
									status.value as TPromotionStatuses,
								)}
								onCheckedChange={(checked) =>
									handleStatusChange(
										status.value as TPromotionStatuses,
										!!checked,
									)
								}
							/>
							<div
								className={styles.status}
								style={{ background: `${status.backgroundColor}` }}
							>
								{PromotionStatuses.includes(
									status.value as TPromotionStatuses,
								) && <Icons.ArrowLineUp color={"black"} />}
								{status.status}
							</div>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
