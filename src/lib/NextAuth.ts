import {type NextAuthOptions} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { login, confirmEmail, register, refreshToken } from "@/entities/customer/auth/auth.service";
import { Login, ConfirmCode, Register } from "@/types/Auth";
import { User } from "@/types/User";
// @ts-ignore
import { CredentialsSignin } from "next-auth";
import { routes } from "@/configs/routes";

interface IAccessToken {
	token_type: "access" | "refresh";
	exp: number;
	iat: number;
	jti: string;
	user_id: number;
}

interface IUser {
	id: string;
	email: string;
	username?: string;
	access?: string;
	refresh?: string;
}

export const authOptions:NextAuthOptions = {
	providers: [
		// 1. Провайдер для отправки кода (только email)
		Credentials({
			id: "send-code",
			name: "Send Code",
			credentials: {
				email: { label: "Email", type: "text", placeholder: "you@example.com" },
			},
			async authorize(credentials) {
				const { email } = credentials || {};
				if (!email) throw new Error("Email is required");
				const loginData: Login = { email, accepted_agreement: true };

				try {
					await login(loginData);
					throw new Error("Please enter the confirmation code sent to your email");
				} catch (error) {
					// Если ошибка имеет иной смысл, пробрасываем её дальше.
					if (error instanceof Error && error.message !== "Please enter the confirmation code sent to your email") {
						throw new Error(error.message);
					}
					throw error;
				}
			},
		}),

		// 2. Провайдер для подтверждения кода (email и код)
		Credentials({
			id: "confirm",
			name: "Confirm Code",
			credentials: {
				email: { label: "Email", type: "text", placeholder: "you@example.com" },
				code: { label: "Code", type: "text", placeholder: "Введите код" },
			},
			async authorize(credentials) {
				const { email, code } = credentials || {};
				if (!email || !code) throw new Error("Email and code are required");

				const confirmData: ConfirmCode = { email, code };
				try {
					const result = await confirmEmail(confirmData);
					if (result) {
						return {
							id: result.id.toString(),
							email: result.email,
							username: result.username,
							access: result.access,
							refresh: result.refresh,
						} as IUser;
					} else {
						throw new Error("Invalid confirmation code");
					}
				} catch (error) {
					throw new CredentialsSignin(
						error instanceof Error ? error.message : "Confirmation failed"
					);
				}
			},
		}),

		// 3. Провайдер для регистрации (email, код и username)
		Credentials({
			id: "register",
			name: "Register",
			credentials: {
				email: { label: "Email", type: "text", placeholder: "you@example.com" },
				code: { label: "Code", type: "text", placeholder: "Введите код" },
				username: { label: "Username", type: "text", placeholder: "Введите имя" },
			},
			async authorize(credentials) {
				const { email, code, username } = credentials || {};
				if (!email || !code || !username) {
					throw new Error("All fields are required for registration");
				}

				const registerData: Register = { email, username };
				try {
					const result = await register(registerData);
					if (result) {
						return {
							id: result.id.toString(),
							email: result.email,
							username: result.username,
							access: result.access,
							refresh: result.refresh,
						} as IUser;
					}
					throw new Error("Registration failed");
				} catch (error) {
					throw new CredentialsSignin(
						error instanceof Error ? error.message : "Registration failed"
					);
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
				const customUser = user as IUser;
				const { access, refresh, ...profile } = customUser;
				token.user = profile;
				token.access = access;
				token.refresh = refresh;
			}

			if (token.access) {
				try {
					const decoded = jwtDecode<IAccessToken>(token.access as string);
					const currentTimeSeconds = Math.floor(Date.now() / 1000);
					const isExpired = decoded.exp <= currentTimeSeconds + 30; // Обновляем за 30 секунд до истечения
					if (isExpired && token.refresh) {
						const refreshResponse = await refreshToken(token.refresh as string);
						if (refreshResponse.success) {
							token.access = refreshResponse.data.access;
						} else {
							console.error("Refresh token failed");
							return token;
						}
					}
				} catch (error) {
					console.error("Error refreshing token:", error);
					return token;
				}
			}

			return token;
		},

		async session({ session, token }) {
			// Передаём данные пользователя из token в session
			if (token.user) {
				session.user = token.user as User;
				session.access = token.access as string;
			}

			return session;
		},
	},

	pages: {
		signIn: (routes.login()),
		error: (routes.login()),
	},

	secret: process.env.NEXTAUTH_SECRET,
}
