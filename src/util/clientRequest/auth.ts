import type { AuthData } from "@/common/type/auth";
import { PATH } from "@/constant";

const headers = { "Content-Type": "application/json" };

/** ユーザー登録リクエスト */
export const signUpRequest = async (props: AuthData): Promise<Response> => {
	return await fetch(`${PATH.api}${PATH.signUp}`, {
		method: "POST",
		headers,
		body: JSON.stringify(props),
	});
};

/** ログインリクエスト */
export const loginRequest = async (props: AuthData): Promise<Response> => {
	return await fetch(`${PATH.api}${PATH.login}`, {
		method: "POST",
		headers,
		body: JSON.stringify(props),
	});
};

/** ユーザー登録：認証コードリクエスト */
export const signUpConfirmRequest = async (props: {
	code: string;
	email: string;
}): Promise<Response> => {
	return await fetch(`${PATH.api}${PATH.signUp}${PATH.confirm}`, {
		method: "POST",
		headers,
		body: JSON.stringify(props),
	});
};
