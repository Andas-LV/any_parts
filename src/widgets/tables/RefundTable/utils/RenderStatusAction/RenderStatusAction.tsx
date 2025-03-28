import { RefundItem } from "@/types/Refund";
import DeleteRefund from "@/widgets/modals/customer/menuModals/refund/deleteRefund/DeleteRefund";
import { Icons } from "@/assets/svg";
import styles from "./RenderStatusAction.module.css";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import React, { useState } from "react";

export const renderStatusAction = (item: RefundItem) => {
	const { id, status, comment } = item;
	const [showDeleteRefund, setShowDeleteRefund] = useState(false);

	if (status === "На рассмотрении") {
		return (
			<div>
				{showDeleteRefund && (
					<DeleteRefund
						itemId={id}
						onClose={() => setShowDeleteRefund(false)}
					/>
				)}
				<Icons.BlackClose
					className={styles.deleteButton}
					onClick={() => setShowDeleteRefund(true)}
				/>
			</div>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className={styles.commentButton}>
				Комментарии
			</DropdownMenuTrigger>
			<DropdownMenuContent className={styles.commentContent}>
				<DropdownMenuItem>
					<pre>{comment}</pre>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
