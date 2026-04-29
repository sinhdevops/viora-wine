export interface BadgeProps {
	variant?: "red" | "orange" | "green" | "purple" | "pink";
	children: React.ReactNode;
	className?: string;
}

const gradients: Record<NonNullable<BadgeProps["variant"]>, string> = {
	red: "linear-gradient(180deg, #D8262E 0%, #8A0203 100%)",
	orange: "linear-gradient(180deg, #E7A112 0%, #C85A04 100%)",
	green: "linear-gradient(180deg, #3AD800 0%, #008927 100%)",
	purple: "linear-gradient(180deg, #6E25FF 0%, #29005E 100%)",
	pink: "linear-gradient(180deg, #C712E7 0%, #80005C 100%)",
};

export default function Badge({ variant = "red", children, className = "" }: BadgeProps) {
	return (
		<span
			className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white ${className}`}
			style={{ background: gradients[variant] }}
		>
			{children}
		</span>
	);
}
