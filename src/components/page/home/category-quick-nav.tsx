import { Link } from "@/i18n/routing";
import Image from "next/image";
import { WINE_IMAGES } from "../../../../public/statics/images";

const categories = [
	{ label: "Vang đỏ", image: WINE_IMAGES.wineRed, path: "/products?wt=red" },
	{ label: "Vang trắng", image: WINE_IMAGES.wineWhite, path: "/products?wt=white" },
	{ label: "Vang hồng", image: WINE_IMAGES.winePink, path: "/products?wt=rose" },
	{ label: "Whisky", image: WINE_IMAGES.whisky, path: "/products?cat=whisky" },
	{ label: "Rượu mạnh", image: WINE_IMAGES.wineStrong, path: "/products?cat=spirits" },
	{ label: "Champagne", image: WINE_IMAGES.champaign, path: "/products?wt=champagne" },
	{ label: "Quà tặng", image: WINE_IMAGES.gift, path: "/products?cat=gift" },
	{ label: "Combo ưu đãi", image: WINE_IMAGES.combo, path: "/products?cat=combo" },
];

export default function CategoryQuickNav() {
	return (
		<div className="w-full rounded-2xl border border-gray-100 bg-white px-2 shadow-lg sm:px-4 md:px-6">
			<div className="grid grid-cols-4 md:grid-cols-8">
				{categories.map((cat) => (
					<Link
						key={cat.path}
						href={cat.path as any}
						className="group flex flex-col items-center justify-center gap-1.5 rounded-xl px-1 py-3 transition-colors hover:bg-gray-50 md:h-36 md:gap-2 md:px-2"
					>
						<div className="relative h-12 w-12 lg:h-20 lg:w-20">
							<Image
								src={cat.image}
								alt={cat.label}
								fill
								className="object-contain transition-transform duration-200 group-hover:scale-110"
							/>
						</div>
						<span className="text-center text-[11px] leading-tight font-medium text-gray-700 group-hover:text-red-600 md:text-[13px]">
							{cat.label}
						</span>
					</Link>
				))}
			</div>
		</div>
	);
}
