import { NextResponse } from "next/server";

export const authErrorResponse = (message: string = "auth error") => {
	return NextResponse.json({ message }, { status: 401 });
};
