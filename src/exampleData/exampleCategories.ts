import { Category, PopularCategories } from "@/types/Category";

export const categories: Category[] = [
	{
		id: "auto",
		icon: "/cars/car.svg",
		name: "Авто",
		amount: 200,
		subcategories: [
			{
				title: "Двигатели и системы",
				items: [
					"Поршни, кольца, шатуны",
					"ГРМ (цепи, ремни, натяжители)",
					"Прокладки и сальники",
					"Турбины и компрессоры",
				],
			},
			{
				title: "Трансмиссия",
				items: [
					"Коробка передач (МКПП, АКПП, вариатор)",
					"Сцепление (диски, корзины)",
					"Приводы и карданные валы",
					"Масла и жидкости КПП",
				],
			},
		],
	},
	{
		id: "truck",
		icon: "/cars/Truck.svg",
		name: "Трак",
		amount: 200,
		subcategories: [
			{
				title: "Грузовые двигатели",
				items: ["Форсунки", "Топливные насосы", "Турбины"],
			},
			{
				title: "Шасси и подвеска",
				items: ["Рессоры", "Амортизаторы", "Оси и ступицы"],
			},
		],
	},
	{
		id: "motorcycle",
		icon: "/cars/Motorcycle.svg",
		name: "Мотоцикл",
		amount: 200,
		subcategories: [
			{
				title: "Двигатель",
				items: ["Поршни", "Картер", "ГРМ"],
			},
			{
				title: "Электрооборудование",
				items: ["Аккумуляторы", "Фары", "Проводка"],
			},
		],
	},
	{
		id: "scooter",
		icon: "/cars/Scooter.svg",
		name: "Скутер",
		amount: 200,
		subcategories: [
			{
				title: "Запчасти двигателя",
				items: ["Карбюраторы", "Поршни", "Глушители"],
			},
			{
				title: "Тормозная система",
				items: ["Тормозные колодки", "Диски", "Шланги"],
			},
		],
	},
	{
		id: "moped",
		icon: "/cars/Moped.svg",
		name: "Мопед",
		amount: 200,
		subcategories: [
			{
				title: "Шины и колёса",
				items: ["Передние шины", "Задние шины", "Камеры"],
			},
			{
				title: "Система зажигания",
				items: ["Свечи зажигания", "Магнето", "Катушки"],
			},
		],
	},
	{
		id: "tractor",
		icon: "/cars/Tractor.svg",
		name: "Трактор",
		amount: 200,
		subcategories: [
			{
				title: "Навесное оборудование",
				items: ["Плуги", "Бороны", "Сеялки"],
			},
			{
				title: "Гидравлика",
				items: ["Насосы", "Цилиндры", "Фильтры"],
			},
		],
	},
	{
		id: "bus",
		icon: "/cars/Van.svg",
		name: "Автобус",
		amount: 200,
		subcategories: [
			{
				title: "Кузовные детали",
				items: ["Стекла", "Двери", "Зеркала"],
			},
			{
				title: "Сиденья и интерьер",
				items: ["Обивка", "Ремни безопасности", "Подлокотники"],
			},
		],
	},
	{
		id: "snowmobile",
		icon: "/cars/Snowflake.svg",
		name: "Снегоход",
		amount: 200,
		subcategories: [
			{
				title: "Гусеницы и подвеска",
				items: ["Гусеницы", "Амортизаторы", "Ролики"],
			},
			{
				title: "Система охлаждения",
				items: ["Радиаторы", "Термостаты", "Антифриз"],
			},
		],
	},
];

const popCatImages = [
	"https://ic.carid.com/icons/wheels-and-rims_ic_5.jpg",
	"https://ic.carid.com/icons/headlights_ic_5.jpg",
	"https://ic.carid.com/icons/tires_ic_5.jpg",
	"https://ic.carid.com/icons/exhaust-systems_ic_5.jpg",
	"https://ic.carid.com/icons/running-boards_ic_5.jpg",
	"https://ic.carid.com/icons/suspension-systems_ic_5.jpg",
	"https://ic.carid.com/icons/custom-floor-mats_ic_5.jpg",
	"https://ic.carid.com/icons/brakes_ic_5.jpg",
	"https://ic.carid.com/icons/seat-covers_ic_5.jpg",
	"https://ic.carid.com/icons/bed-accessories_ic_5.jpg",
];

const popCatNames = [
	{ name: "Колёса и диски", value: "wheels-and-rims" },
	{ name: "Фары", value: "headlights" },
	{ name: "Шины", value: "tires" },
	{ name: "Системы выхлопа", value: "exhaust-systems" },
	{ name: "Пороги", value: "running-boards" },
	{ name: "Системы подвески", value: "suspension-systems" },
	{ name: "Индивидуальные коврики", value: "custom-floor-mats" },
	{ name: "Тормоза", value: "brakes" },
	{ name: "Чехлы для сидений", value: "seat-covers" },
	{ name: "Аксессуары для кузова", value: "bed-accessories" },
];

export const popularCategories: PopularCategories[] = popCatNames.map(
	(cat, index) => ({
		...cat,
		image: popCatImages[index],
	}),
);
