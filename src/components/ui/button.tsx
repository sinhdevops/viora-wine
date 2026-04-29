import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ElementType, forwardRef } from "react";
import { Link } from "@/i18n/routing";
import type { ComponentProps } from "react";

type Variant = "primary" | "outline" | "outline-primary" | "ghost" | "dark";
type Size = "md" | "lg";

interface BaseProps {
	variant?: Variant;
	size?: Size;
	className?: string;
	leftIcon?: ElementType;
}

interface ButtonProps extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
	href?: never;
}

interface LinkProps extends BaseProps {
	href: ComponentProps<typeof Link>["href"];
	target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
	rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
	children?: React.ReactNode;
	className?: string;
}

type Props = ButtonProps | LinkProps;

const variantClasses: Record<Variant, string> = {
	primary: "bg-brand-wine border border-[#FF0022] text-white hover:bg-brand-wine/80 hover:border-[#FF0022]/80",
	outline: "bg-white/10 border border-white/20 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/20",
	"outline-primary": "bg-white border border-brand-primary text-brand-primary hover:bg-red-50",
	ghost: "bg-black/40 border border-white/30 text-white backdrop-blur-sm hover:bg-black/60",
	dark: "bg-[#1a1a1a] border border-white/10 text-white hover:bg-[#2a2a2a]",
};

const sizeClasses: Record<Size, string> = {
	md: "h-10 px-5 text-xs lg:text-[15px]",
	lg: "h-14 px-3 lg:px-7 text-xs lg:text-[18px]",
};

const base =
	"inline-flex items-center justify-center gap-2 rounded-xl font-semibold uppercase tracking-wider transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

function buildClassName(variant: Variant, size: Size, extra?: string) {
	return [base, variantClasses[variant], sizeClasses[size], extra].filter(Boolean).join(" ");
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(function Button(props, _ref) {
	const { variant = "primary", size = "md", className, children, leftIcon: LeftIcon } = props;
	const cls = buildClassName(variant, size, className);
	const iconSize = size === "lg" ? 20 : 16;

	const content = (
		<>
			{LeftIcon && <LeftIcon size={iconSize} className="shrink-0" />}
			{children}
		</>
	);

	if ("href" in props && props.href !== undefined) {
		const { href, target, rel } = props as LinkProps;
		return (
			<Link href={href} className={cls} target={target} rel={rel}>
				{content}
			</Link>
		);
	}

	const {
		href: _href,
		leftIcon: _leftIcon,
		variant: _variant,
		size: _size,
		className: _className,
		...rest
	} = props as ButtonProps & { href?: never; leftIcon?: ElementType };
	return (
		<button className={cls} {...rest}>
			{content}
		</button>
	);
});

Button.displayName = "Button";
export default Button;
