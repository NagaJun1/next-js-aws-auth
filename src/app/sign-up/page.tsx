"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/common/components";
import { PATH } from "@/constant";
import { AuthFields } from "@/features/components/auth";
import { signUpRequest } from "@/util/clientRequest/auth";

export default function Page() {
	const [form, setForm] = useState({ email: "", password: "" });
	const router = useRouter();
	return (
		<div className="m-4">
			<div>ユーザー登録</div>
			<AuthFields data={form} setData={setForm} />
			<Button
				className="m-4"
				onClick={async () => {
					// ユーザー登録のリクエストを送信
					// Password must have uppercase characters
					// Password must have symbol characters
					const result = await signUpRequest(form);
					console.log("Response:", result);

					// confirm 画面へ遷移
					router.push(
						`${PATH.signUp}${PATH.confirm}?email=${encodeURIComponent(form.email)}`,
					);
				}}
			>
				ユーザー登録
			</Button>
		</div>
	);
}
