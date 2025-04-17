import {User} from "@/types/User";

declare module "next-auth" {
	interface Session {
		user: User;
		access: string;
	}

	interface JWT {
		access: string;
		refresh: string;
		user: User;
	}
}
