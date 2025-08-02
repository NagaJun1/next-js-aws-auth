"use client";

import Link from "next/link";
import { PATH } from "@/constant";

export default function Page() {
	return (
		<div className="m-4">
			<Link href={PATH.signUp} className="text-blue-500 hover:underline">
				ユーザー登録画面
			</Link>
			<div className="h-4" />
			<Link href={PATH.login} className="text-blue-500 hover:underline">
				ログイン画面
			</Link>
		</div>
	);
}
