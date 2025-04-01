import { TAdminItemsStatus, TAdminItems } from "@/types/admin/Items";
import { articles, baseInStock, basePrices, imageUrl, productNames, categories } from "@/exampleData/partners/examplePartnersItems";

const statusesOptions: TAdminItemsStatus[] = [
	TAdminItemsStatus.active,
	TAdminItemsStatus.notActive,
	TAdminItemsStatus.inRevision,
];

const getStatus = (i: number): TAdminItemsStatus =>
	statusesOptions[(i * 7) % statusesOptions.length];

export const exampleAdminItems: TAdminItems[] = Array.from({ length: 80 }, (_, i) => {
	const index = i % 20;
	const groupNumber = Math.floor(i / 20) + 1;
	const status = getStatus(i);

	return {
		id: i + 1,
		image: imageUrl,
		productName: productNames[index],
		category: categories[index],
		article: `${articles[index]}-${groupNumber}`,
		barcode: (1234567890123 + i).toString(),
		status,
		price: basePrices[index],
		inStockRoom: baseInStock[index],
	};
});
