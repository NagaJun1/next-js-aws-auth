"use client";

import { use, useState } from "react";
import { Button, Input } from "@/common/components";
import { signUpConfirmRequest } from "@/util/clientRequest/auth";

export default function Page(props: {
	searchParams: Promise<{ email?: string }>;
}) {
	const { searchParams } = props;
	const email = use(searchParams).email;
	const [code, setCode] = useState("");
	if (!email) {
		return <div>メールアドレスが指定されていません。</div>;
	}
	return (
		<div className="m-4">
			<h1>認証画面</h1>
			<Input
				type="text"
				placeholder="認証コード"
				onChange={(val) => setCode(val.target.value)}
			/>
			<Button
				onClick={async () => {
					const result = await signUpConfirmRequest({ code, email });
					alert(`result.status: ${result.status}`);
				}}
			>
				認証する
			</Button>
		</div>
	);
}
