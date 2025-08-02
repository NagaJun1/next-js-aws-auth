import { Input } from "@/common/components";
import type { AuthData } from "@/common/type/auth";

/** メールアドレス・パスワードの入力フィールド */
export const AuthFields = (props: {
	data: AuthData;
	setData: (data: AuthData) => void;
}) => {
	const { data, setData } = props;
	return (
		<div>
			<div>メールアドレス</div>
			<Input
				defaultValue={data.email}
				onChange={(val) => setData({ ...data, email: val.target.value })}
				required={true}
			/>
			<div>パスワード</div>
			<Input
				type="password"
				onChange={(val) => setData({ ...data, password: val.target.value })}
				required={true}
			/>
		</div>
	);
};
