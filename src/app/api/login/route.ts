import { type NextRequest, NextResponse } from "next/server";
import { login } from "@/util/aws/cognitoUserPoolUtility";
import { authErrorResponse } from "@/util/next/nextResponse";

/** ログイン */
export const POST = async (request: NextRequest) => {
	const json = await request.json();
	if (!json.email || !json.password) {
		return NextResponse.json(
			{ message: "Missing required fields" },
			{ status: 400 },
		);
	}
	const result = await login(json);
	if (result.ok) {
		return NextResponse.json(
			{ message: "Login successful", ...result.session },
			{ status: 200 },
		);
	}
	return authErrorResponse();
};
