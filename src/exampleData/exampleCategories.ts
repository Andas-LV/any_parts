import { Category } from "@/types/Category";

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
                    "Турбины и компрессоры"
                ]
            },
            {
                title: "Трансмиссия",
                items: [
                    "Коробка передач (МКПП, АКПП, вариатор)",
                    "Сцепление (диски, корзины)",
                    "Приводы и карданные валы",
                    "Масла и жидкости КПП"
                ]
            }
        ]
    },
    {
        id: "truck",
        icon: "/cars/Truck.svg",
        name: "Трак",
        amount: 200,
        subcategories: [
            {
                title: "Грузовые двигатели",
                items: ["Форсунки", "Топливные насосы", "Турбины"]
            },
            {
                title: "Шасси и подвеска",
                items: ["Рессоры", "Амортизаторы", "Оси и ступицы"]
            }
        ]
    },
    {
        id: "motorcycle",
        icon: "/cars/Motorcycle.svg",
        name: "Мотоцикл",
        amount: 200,
        subcategories: [
            {
                title: "Двигатель",
                items: ["Поршни", "Картер", "ГРМ"]
            },
            {
                title: "Электрооборудование",
                items: ["Аккумуляторы", "Фары", "Проводка"]
            }
        ]
    },
    {
        id: "scooter",
        icon: "/cars/Scooter.svg",
        name: "Скутер",
        amount: 200,
        subcategories: [
            {
                title: "Запчасти двигателя",
                items: ["Карбюраторы", "Поршни", "Глушители"]
            },
            {
                title: "Тормозная система",
                items: ["Тормозные колодки", "Диски", "Шланги"]
            }
        ]
    },
    {
        id: "moped",
        icon: "/cars/Moped.svg",
        name: "Мопед",
        amount: 200,
        subcategories: [
            {
                title: "Шины и колёса",
                items: ["Передние шины", "Задние шины", "Камеры"]
            },
            {
                title: "Система зажигания",
                items: ["Свечи зажигания", "Магнето", "Катушки"]
            }
        ]
    },
    {
        id: "tractor",
        icon: "/cars/Tractor.svg",
        name: "Трактор",
        amount: 200,
        subcategories: [
            {
                title: "Навесное оборудование",
                items: ["Плуги", "Бороны", "Сеялки"]
            },
            {
                title: "Гидравлика",
                items: ["Насосы", "Цилиндры", "Фильтры"]
            }
        ]
    },
    {
        id: "bus",
        icon: "/cars/Van.svg",
        name: "Автобус",
        amount: 200,
        subcategories: [
            {
                title: "Кузовные детали",
                items: ["Стекла", "Двери", "Зеркала"]
            },
            {
                title: "Сиденья и интерьер",
                items: ["Обивка", "Ремни безопасности", "Подлокотники"]
            }
        ]
    },
    {
        id: "snowmobile",
        icon: "/cars/Snowflake.svg",
        name: "Снегоход",
        amount: 200,
        subcategories: [
            {
                title: "Гусеницы и подвеска",
                items: ["Гусеницы", "Амортизаторы", "Ролики"]
            },
            {
                title: "Система охлаждения",
                items: ["Радиаторы", "Термостаты", "Антифриз"]
            }
        ]
    }
];
