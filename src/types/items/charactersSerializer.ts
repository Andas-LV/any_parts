import { ItemInfoType } from "@/types/items/Item";
import { TCreateItemFullInfo } from "@/types/items/CreateItem";

export const charactersSerializer = (
	item: ItemInfoType | TCreateItemFullInfo,
) => {
	return [
		{ name: "Артикул", value: item.article },
		{ name: "Тип", value: item.type },
		{ name: "Брэнд", value: item.brand },
		{ name: "Материал", value: item.material },
	];
};
