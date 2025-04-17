// "use server"

import Cookies from "js-cookie";
// import { cookies } from 'next/headers'

export const setAuthToken = async(token: string) => {
	// const cookieStore = await cookies();
	// cookieStore.set('token', token, { secure: true, expires: 10, path: "/"  })
	Cookies.set("token", token, { expires: 10, path: "/" });
};

export const removeAuthToken = async() => {
	// (await cookies()).delete("token");
	Cookies.remove("token", { path: "/" });
};

export const getAuthToken = async() => {
	if (typeof window !== "undefined") {
		// return (await cookies()).get("token")
		return Cookies.get("token");
	}
	return null;
};
