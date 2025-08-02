import { type NextRequest, NextResponse } from "next/server";
import type { AuthData } from "@/common/type/auth";
import { signUpUser } from "@/util/aws/cognitoUserPoolUtility";

/** ユーザーの新規作成 */
export const POST = async (request: NextRequest) => {
	const json: AuthData = await request.json();
	if (!json.password || !json.email) {
		return NextResponse.json(
			{ message: "Missing required fields" },
			{ status: 400 },
		);
	}
	const result = await signUpUser(json);
	if (result.ok) {
		return NextResponse.json(
			{ message: "User created successfully", ...result.signUpResult },
			{ status: 201 },
		);
	}
	return NextResponse.json(
		{ message: "Failed to create user" },
		{ status: 500 },
	);
};
