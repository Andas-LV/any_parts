import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "@/schemas/auth";
import { login } from "@/entities/customer/auth/auth.service";
import { Login } from "@/types/Auth";
import { routes } from "@/configs/routes";

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text", placeholder: "you@example.com" },
				accepted_agreement: { label: "Принял соглашение", type: "checkbox" },
			},
			async authorize(credentials, req) {
				// Валидируем входные данные через Zod-схему
				const result = loginSchema.safeParse(credentials);
				if (!result.success) {
					// Можно выбросить ошибку с подробностями, либо вернуть null
					throw new Error(
						"Неверные данные: " +
						JSON.stringify(result.error.flatten().fieldErrors)
					);
				}
				const loginData: Login = result.data;
				try {
					// Отправляем запрос на логин (ваша функция должна вернуть объект пользователя)
					const user = await login(loginData);
					if (user) {
						return user; // объект пользователя должен включать уникальный идентификатор (например, id)
					}
					return null;
				} catch (error) {
					throw new Error("Ошибка при авторизации");
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.email = user.email;
			}
			return token;
		},
		async session({ session, token }) {
			session.user = {
				email: token.email as string,
			};
			return session;
		},
	},
	pages: {
		signIn: routes.home(),
	},
});
