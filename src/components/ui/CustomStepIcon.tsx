import { styled } from "@mui/material/styles";
import StepConnector, {
	stepConnectorClasses,
} from "@mui/material/StepConnector";
import React from "react";
import { Box } from "@mui/material";
import { Icons } from "@/assets/svg";

export const CustomConnector = styled(StepConnector)(({ theme }) => ({
	[`& .${stepConnectorClasses.line}`]: {
		display: "none",
	},
}));

interface CustomStepIconProps {
	active?: boolean;
	completed?: boolean;
	icon: React.ReactNode;
}
export default function CustomStepIcon(props: CustomStepIconProps) {
	const { active, completed, icon } = props;
	return (
		<Box
			sx={{
				backgroundColor: completed
					? "#F3F7FE"
					: active
						? "var(--brand-primary)"
						: "var(--skeleton)",
				color: "#fff",
				width: 30,
				height: 30,
				display: "flex",
				borderRadius: "50%",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{completed ? <Icons.CheckedIcon /> : icon}
		</Box>
	);
}
