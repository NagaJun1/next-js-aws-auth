import {
	AuthenticationDetails,
	CognitoUser,
	CognitoUserAttribute,
	CognitoUserPool,
	type CognitoUserSession,
	type ISignUpResult,
} from "amazon-cognito-identity-js";
import type { AuthData, SignUpConfirmData } from "@/common/type/auth";

/** {@link CognitoUser} の生成 */
const createCognitoUser = (email: string) => {
	return new CognitoUser({
		Username: email, // aws 側の設定で、ユーザー識別をメールアドレスにしているため、Usernameはメールアドレスを指定
		Pool: createCognitoUserPool(),
	});
};

/**
 * {@link CognitoUserPool} の生成
 * ※環境変数の都合で、サーバーサイドでのみ使用可能
 */
export const createCognitoUserPool = () => {
	if (!process.env.COGNITO_USER_POOL_ID) {
		throw new Error("COGNITO_USER_POOL_ID is not defined");
	}
	if (!process.env.COGNITO_CLIENT_ID) {
		throw new Error("COGNITO_CLIENT_ID is not defined");
	}
	return new CognitoUserPool({
		UserPoolId: process.env.COGNITO_USER_POOL_ID,
		ClientId: process.env.COGNITO_CLIENT_ID,
	});
};

type SignUpUserResponse = {
	ok: boolean;
	signUpResult: ISignUpResult | undefined;
};

/**
 * ユーザーの新規登録
 * ※環境変数の都合で、サーバーサイドでのみ使用可能
 * @returns 実行成功： true, 実行失敗：false
 */
export const signUpUser = async (
	props: AuthData,
): Promise<SignUpUserResponse> => {
	const { password, email } = props;
	const userPool = createCognitoUserPool();
	const attributeList = [
		new CognitoUserAttribute({ Name: "email", Value: email }),
	];
	return await new Promise<SignUpUserResponse>((resolve, _reject) => {
		userPool.signUp(
			email, // aws 側の設定で、ユーザー識別をメールアドレスにしているため、userNameはメールアドレスを指定
			password,
			attributeList,
			attributeList,
			(error, result) => {
				console.error("error:", error);
				resolve({ ok: !error, signUpResult: result });
			},
		);
	});
};

/** ユーザー登録、コード認証 */
export const signUpConfirm = (props: SignUpConfirmData) => {
	const { email, code } = props;
	const cognitoUser = createCognitoUser(email);
	return new Promise<boolean>((resolve, _reject) => {
		cognitoUser.confirmRegistration(
			code,
			true,
			(error, result: string | null) => {
				console.error("error:", error);
				console.log(result);
				resolve(result === "SUCCESS");
			},
		);
	});
};

type LoginResponse = { ok: boolean; session?: CognitoUserSession };

/**
 * ログイン認証
 * ※環境変数の都合で、サーバーサイドでのみ使用可能
 */
export const login = async (props: AuthData) => {
	const { email, password } = props;
	const result = createCognitoUser(email);
	const details = new AuthenticationDetails({
		Username: email, // aws 側の設定で、ユーザー識別をメールアドレスにしているため、Usernameはメールアドレスを指定
		Password: password,
	});
	return await new Promise<LoginResponse>((resolve) => {
		result.authenticateUser(details, {
			onSuccess: (session) => {
				resolve({ ok: true, session });
			},
			onFailure: (error) => {
				console.error("Login failed:", error);
				resolve({ ok: false });
			},
		});
	});
};
