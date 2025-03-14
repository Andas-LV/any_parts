import { PhotoOptions } from "@/types/Refund";
import { TPartnerItemStatuses } from "@/types/partners/TableItem";

export const itemSearchTypes = [
	{
		name: "Все",
		value: "all",
	},
	{
		name: "VIN код",
		value: "vinCode",
	},
];

export const itemSorts = [
	{
		name: "По дате добавления",
		value: "byDate",
	},
	{
		name: "По популярности",
		value: "byPopular",
	},
];

export const itemSearchedSorts = [
	{
		name: "Рекомендуемое",
		value: "recommended",
	},
	{
		name: "Сначала дешевле",
		value: "cheapest",
	},
	{
		name: "Сначала дороже",
		value: "expensive",
	},
	{
		name: "По рейтингу покупателей",
		value: "clientRated",
	},
	{
		name: "Сначала новинки",
		value: "newest",
	},
	{
		name: "Популярное",
		value: "byPopular",
	},
];

export const REFUND_START_PENDING = 7;

export const HOLDING_DAYS = 14;

export const RETURN_REASONS = [
	"Товар с браком",
	"Не оригинал",
	"Есть повреждения",
	"Товаром пользовались",
	"Другое",
];

export const PHOTO_OPTIONS: PhotoOptions[] = [
	"Товар целиком",
	"Бирка или этикетка",
	"Штрихкод на упаковке",
	"Дефект товара",
	"Срок годности или № партии",
	"Видео дефекта",
];

export const partnerItemStatuses: TPartnerItemStatuses[] = [
	{
		status: "Не продается",
		value: "notSelling",
		backgroundColor: "var(--skeleton)",
		icon: false,
	},
	{
		status: "Продается",
		value: "selling",
		backgroundColor: "#c2ebda",
		icon: false,
	},
	{
		status: "Стандарт-продвижение",
		value: "standardPromotion",
		backgroundColor: "#c1d8f6",
		icon: true,
	},
	{
		status: "Премиум-продвижение",
		value: "premiumPromotion",
		backgroundColor: "linear-gradient(90deg, #DBB4F7 0%, #c2d9f8 100%)",
		icon: true,
	},
];
