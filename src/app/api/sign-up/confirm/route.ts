import { type NextRequest, NextResponse } from "next/server";
import type { SignUpConfirmData } from "@/common/type/auth";
import { signUpConfirm } from "@/util/aws/cognitoUserPoolUtility";
import { authErrorResponse } from "@/util/next/nextResponse";

/** ユーザー登録後のコード認証 */
export const POST = async (request: NextRequest) => {
	const json: SignUpConfirmData = await request.json();
	if (!json.code || !json.email) {
		return NextResponse.json(
			{ message: "Missing code or email" },
			{ status: 400 },
		);
	}
	const result = await signUpConfirm(json);
	if (result) {
		return NextResponse.json(
			{ message: "Sign up confirmation successful" },
			{ status: 200 },
		);
	}
	return authErrorResponse("Sign up confirmation failed");
};
