import { TMarketsCountry, TSellsList } from "@/types/admin/Markets";

export const exampleSellsData: TSellsList[] = [];

for (let i = 1; i <= 30; i++) {
	const countryKey = i % 2 === 0 ? "kazakh" : "russia";
	const countryValue =
		TMarketsCountry[countryKey as keyof typeof TMarketsCountry]

	exampleSellsData.push({
		id: i,
		item: {
			id: 1000 + i,
			image: "https://www.cadillac.com/content/dam/cadillac/na/us/english/index/homepage/racing/new-assets-/24-cad-homepage-default-best-selling-ev-promo-l-v3.jpg?imwidth=1200",
			productName: `Наименование товара №${i}`,
			category: 'Категория товаров',
			article: `ART-${1000 + i}`,
			barcode: `BC-${1000 + i}`,
			price: 10000 + i,
			inStockRoom: 50 - i
		},
		market: {
			id: 2000 + i,
			marketName: `MarketName ${i}`,
			registrationDate: new Date(2025, 10, 13), // 13 ноября 2025
			contactNumber: `+7 (777) 300-23${String(i).padStart(2, '0')}`,
			country: countryValue,
			sellsCount: i * 10
		},
		customer: {
			id: 3000 + i,
			email: `customer${i}@example.com`,
			phone: `+7 (777) 600-46${String(i).padStart(2, '0')}`,
			apWallet: false,
			username: `Покупатель_${i}`,
			avatarUrl: null,
			currency: 'KZT',
			moderated: false
		},
		sellDate: new Date(2025, 10, 13),
		sellAmount: 10000 * i,
	});
}