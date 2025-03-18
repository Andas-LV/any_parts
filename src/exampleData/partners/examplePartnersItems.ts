import { ItemStatusValues, TPartnersItem } from "@/types/partners/Items";

const productNames = [
	"Тормозные колодки передние",
	"Амортизатор задний",
	"Фильтр воздушный",
	"Ремень ГРМ",
	"Насос охлаждения",
	"Прокладка головки блока цилиндров",
	"Шаровая опора передняя",
	"Свечи зажигания",
	"Радиатор охлаждения",
	"Палец рычага подвески",
	"Топливный фильтр",
	"Вентилятор радиатора",
	"Поршневая группа",
	"Комплект сцепления",
	"Подшипник ступицы",
	"Маховик",
	"Турбина",
	"Датчик температуры охлаждающей жидкости",
	"Шланг радиатора",
	"Крышка масляного фильтра",
];

const categories = [
	"Тормозная система",
	"Подвеска",
	"Двигатель",
	"Двигатель",
	"Охлаждение",
	"Двигатель",
	"Подвеска",
	"Электрика",
	"Охлаждение",
	"Подвеска",
	"Топливная система",
	"Охлаждение",
	"Двигатель",
	"Трансмиссия",
	"Подвеска",
	"Трансмиссия",
	"Двигатель",
	"Электрика",
	"Охлаждение",
	"Двигатель",
];

const articles = [
	"TB-1024",
	"AM-2255",
	"FV-9784",
	"RG-3452",
	"NO-2205",
	"PG-8765",
	"ШО-5632",
	"СЗ-4321",
	"RO-1357",
	"ПР-3215",
	"ТФ-4563",
	"ВР-8901",
	"ПГ-2145",
	"КС-9832",
	"ПС-2349",
	"М-6435",
	"Т-8520",
	"ДТ-6542",
	"ШР-9843",
	"КМФ-3021",
];

const basePrices = [
	1500, 2300, 600, 1200, 3200, 800, 950, 400, 5000, 300, 650, 1800, 4500, 2500,
	950, 3800, 10000, 1200, 450, 350,
];

const baseInStock = [
	10, 5, 15, 20, 3, 25, 8, 50, 2, 30, 12, 18, 4, 6, 22, 10, 2, 15, 8, 25,
];

// Массив возможных статусов
const statusesOptions: ItemStatusValues[] = [
	"selling",
	"standardPromotion",
	"notSelling",
	"premiumPromotion",
];

const imageUrl =
	"https://media.istockphoto.com/id/514802759/photo/speeding.jpg?s=612x612&w=0&k=20&c=NOkADTslFprPmuUuwzFTKgkYpGk5HQv495Mj6w3jSZc=";

export const tableItems: TPartnersItem[] = Array.from(
	{ length: 80 },
	(_, i) => {
		const index = i % 20;
		const groupNumber = Math.floor(i / 20) + 1;
		const firstStatus = statusesOptions[i % statusesOptions.length];
		const hasTwoStatuses = i % 2 !== 0;
		const secondStatus = statusesOptions[(i + 1) % statusesOptions.length];
		const statuses = hasTwoStatuses
			? [firstStatus, secondStatus]
			: [firstStatus];

		return {
			id: i + 1,
			image: imageUrl,
			productName: productNames[index],
			category: categories[index],
			article: `${articles[index]}-${groupNumber}`,
			barcode: (1234567890123 + i).toString(),
			statuses,
			price: basePrices[index],
			inStockRoom: baseInStock[index],
		};
	},
);
