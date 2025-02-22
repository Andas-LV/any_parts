import {ItemInfoType, TFilteredItemInfo} from "@/types/Item";

export const charactersSerializer = (item: ItemInfoType) => {
    return [
        { name: "Артикул", value: item.article },
        { name: "Тип", value: item.type },
        { name: "Брэнд", value: item.brand },
        { name: "Материал", value: item.material },
    ]
};