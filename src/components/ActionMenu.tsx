import React from "react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@components/ui/dropdown-menu";
import { Icons } from "@/assets/svg/svg";

interface Action {
	label: string;
	onClick: () => void;
}

interface ActionMenuProps {
	actions: Action[];
	open: boolean;
	onOpenChange: () => void;
}

export function ActionMenu({ actions, open, onOpenChange }: ActionMenuProps) {
	return (
		<DropdownMenu open={open} onOpenChange={onOpenChange}>
			<DropdownMenuTrigger>
				<Icons.DotsThreeVertical />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{actions.map((action, idx) => (
					<DropdownMenuItem key={idx} onClick={action.onClick}>
						{action.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
