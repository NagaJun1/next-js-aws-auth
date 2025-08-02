"use client";

import { useState } from "react";
import { Button } from "@/common/components";
import { AuthFields } from "@/features/components/auth";
import { loginRequest } from "@/util/clientRequest/auth";

export default function LoginPage() {
	const [form, setForm] = useState({ email: "", password: "" });
	return (
		<div className="m-4">
			<h1>Login</h1>
			<AuthFields data={form} setData={setForm} />
			<br />
			<Button
				className="m-2"
				onClick={async () => {
					const result = await loginRequest(form);
					console.log(result);
					alert(`result.status: ${result.status}`);
				}}
			>
				ログイン
			</Button>
		</div>
	);
}
