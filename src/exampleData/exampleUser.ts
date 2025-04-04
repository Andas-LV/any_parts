import type { User } from "@/types/User";
import { userDeliveryPoints } from "@/exampleData/exampleDeliveryPoints";

export const exampleUser: User = {
	id: 1,
	username: "User Surname",
	phone: "+77771234568",
	apWallet: false,
	email: "user@gmail.com",
	avatarUrl: "/user.png",
	male: "Male",
	currency: "KZT",
	role: "dealer",
	moderated: true,
	deliveryPoints: userDeliveryPoints,
};
