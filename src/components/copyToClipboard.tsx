import { toastVariants } from "@components/ui/toast";

export const copyToClipboard = (
	text: string | number | string[],
	toast: (options: {
		done: boolean;
		description: string;
		duration?: number;
		variant?: typeof toastVariants.arguments;
	}) => void,
) => {
	const strValue = text.toString();
	navigator.clipboard
		.writeText(strValue)
		.then(() => {
			toast({
				done: true,
				description: `Скопировано: ${strValue}`,
				duration: 3000,
			});
		})
		.catch((err) => console.error("Ошибка копирования:", err));
};
