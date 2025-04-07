import { ItemCardType, ItemInfoType } from "@/types/items/Item";
import { RefundItem, TRefundStatus } from "@/types/Refund";
import { exampleFeedbacks } from "@/exampleData/exampleFeedbacks";
import { Currency, MaleChoice, Roles } from "@/types/User";

const imagePaths = [
	"/items/steeringWheel.png",
	"/items/case.png",
	"/items/evaCarpet.png",
	"/items/seatCovers.png",
	"/items/wheelItems.png",
	"/items/carpet.png",
];

// items
export const items: ItemCardType[] = [];

for (let i = 0; i < 10; i++) {
	const item = {
		id: i + 1,
		name: `Item ${i + 1}`,
		price: 2000 + i * 300,
		currentPrice: i % 2 === 0 ? 2000 + i * 200 : null,
		discount: i % 2 === 0 ? 10 + i * 2 : null,
		rating: 3.5 + i * 0.1,
		comments: 100 + i * 50,
		favorite: i % 3 === 0,
		images: [imagePaths[i % 6], imagePaths[(i + 1) % 6]],
	};
	items.push(item);
}

// itemInfo
export const itemInfo: ItemInfoType[] = [];

for (let i = 0; i < 9; i++) {
	// Generate multiple comments for each item
	const commentImages = [];
	for (let j = 0; j < 17; j++) { // 17 comments per item, adjust as needed
		commentImages.push({
			user: {
				id: 3 + j, // Incremental user ID
				username: `user${j + 1}`, // Unique username
				email: `user${j + 1}@gmail.com`, // Unique email
				phone: `+777777777${j.toString().padStart(2, '0')}`, // Incremental phone
				apWallet: j % 2 === 0, // Alternating apWallet
				avatarUrl: `user${j % 3 + 1}.png`, // Cycle through 3 avatars
				male: j % 2 === 0 ? "Male" : "Female" as MaleChoice, // Alternating gender
				currency: "KZT" as Currency,
				role: "user" as Roles,
			},
			imageUrl: imagePaths[j % 6] // Cycle through the 6 images
		});
	}

	const item = {
		id: i + 1,
		name: `Item ${i + 1}`,
		price: 2000 + (i * 500),
		apPrice: 1800,
		currentPrice: i % 2 === 0 ? 1500 + (i * 400) : null,
		discount: i % 2 === 0 ? 20 + (i * 2) : null,
		favorite: i % 3 === 0,
		marketName: "Market_name",
		rating: 3.5 + (i * 0.1),
		ratingDistribution: {
			1: 2,
			2: 4,
			3: 9,
			4: 13,
			5: 86,
		},
		comments: {
			amount: commentImages.length, // Matches the number of comments
			images: {
				totalImages: commentImages.length, // Matches the number of comment images
				image: commentImages // Array of generated comments
			},
			list: exampleFeedbacks, // Assuming this is defined elsewhere
		},
		sold: 100 + (i * 20),
		options: ["Черный", "Серый", "Красный"],
		type: i % 2 === 0 ? ["Тюнинг", "Перешив"] : ["Коврики", "Защита"],
		brand: `Brand ${i + 1}`,
		material: i % 2 === 0 ? "Кожа" : "Полиуретан",
		article: 15978954613 + i,
		images: [
			imagePaths[i % 6],
			imagePaths[(i + 1) % 6],
			imagePaths[(i + 2) % 6]
		],
		description:
			"Lorem ipsum dolor sit amet consectetur. " +
			"Enim lectus et lorem auctor fermentum tellus purus enim. " +
			"Amet luctus sit mauris non euismod sagittis sit amet suscipit. " +
			"Quisque morbi scelerisque neque vulputate pharetra est. " +
			"Sed eleifend elit parturient eleifend scelerisque. " +
			"Etiam viverra vel amet tincidunt felis. " +
			"Vel pellentesque aliquam faucibus nisl dignissim nisl justo lacus diam. " +
			"Quam nisl портtitor eget elit ornare pellentesque eget sapien. " +
			"Eu imperdiet malesuada semper in in purus urna velit. " +
			"Diam dolor lacinia nunc duis a. Sit sit libero blandit ante tristique velit. " +
			"Vestibulum cursus morbi sed egestas sed viverra sagittis cras.",
	};
	itemInfo.push(item);
}

// itemsForRefund
const refundStatuses: TRefundStatus[] = [
	"На рассмотрении",
	"Одобрено",
	"Не одобрено",
];
const refundPrices = [10000, 20000, 5000];
const refundComments = [
	undefined,
	"Здравствуйте!  \nВаша онлайн-заявка рассмотрена и подтверждена. Вы можете оформить возврат товара в любом фирменном пункте самовывоза в течение 15 календарных дней с момента утверждения заявки.  \nНадеемся, что ваши будущие покупки будут удачными!  \nС уважением, Any Parts",
	"Здравствуйте!\n\nВаша онлайн-заявка рассмотрена, но, к сожалению, не может быть утверждена. Возврат товара невозможен в соответствии с установленными условиями.\n\nЕсли у вас есть дополнительные вопросы, пожалуйста, свяжитесь с нашей поддержкой.\n\nС уважением, Any Parts",
];

export const itemsForRefund: RefundItem[] = refundStatuses.map(
	(status, index) => ({
		id: index + 1,
		price: refundPrices[index],
		status,
		images: [
			{
				id: 1,
				file: "/items/carpet.png",
				file_type: "image/png",
				file_name: "carpet.png",
			},
		],
		createdAt: new Date("2024-02-14T12:30:00Z"),
		comment: refundComments[index],
	}),
);
