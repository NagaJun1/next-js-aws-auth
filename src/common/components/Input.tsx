import type { InputHTMLAttributes } from "react";

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
	return (
		<input
			{...props}
			className={`border border-gray-300 rounded p-2 ${props.className}`}
		/>
	);
};
