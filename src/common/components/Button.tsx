import type { ButtonHTMLAttributes, MouseEventHandler } from "react";

export const Button = (props: {
	type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
	className?: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
	children: React.ReactNode;
}) => {
	const { type = "button", className, onClick, children } = props;
	return (
		<button
			type={type}
			className={`cursor-pointer bg-blue-500 text-white px-4 py-2 rounded ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
