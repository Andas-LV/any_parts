import { Icons } from "@/assets/svg/svg";

export const isProgressed = (progress: number) => {
	return progress >= 0;
};

export const renderProgressIcon = (progress: number) => {
	if (progress >= 0) {
		return <Icons.TrendUp />;
	} else {
		return <Icons.TrendDown />;
	}
};