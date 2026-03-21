import Image from "next/image";
import { Link } from "@/i18n/routing";
import { WINE_IMAGES } from "../../../../public/statics/images";

const categories = [
	{
		name: "RƯỢU MẠNH",
		image: WINE_IMAGES.categoryWine1,
		path: "/products?cat=spirits",
	},
	{
		name: "RƯỢU VANG",
		image: WINE_IMAGES.categoryWine2,
		path: "/products?cat=wine",
	},
	{
		name: "CHAMPAGNE",
		image: WINE_IMAGES.categoryWine3,
		path: "/products?cat=champagne",
	},
	{
		name: "WHISKY",
		image: WINE_IMAGES.categoryWine4,
		path: "/products?cat=whisky",
	},
	{
		name: "QUÀ TẶNG",
		image: WINE_IMAGES.categoryWine5,
		path: "/products?cat=gift",
	},
];

export default function FeaturedCategories() {
	return (
		<section className="bg-white py-12 md:py-16">
			<div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
				{/* Title */}
				<h2 className="mb-8 text-center text-xl font-black tracking-[0.2em] text-gray-900 uppercase md:mb-10 md:text-2xl">
					DANH MỤC NỔI BẬT
				</h2>

				{/* Mobile: first item full width, rest 2 cols | Desktop: 5 columns */}
				<div className="grid grid-cols-2 gap-3 md:gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-7.5">
					{categories.map((cat, index) => (
						<Link
							key={cat.name}
							href={cat.path}
							className={`group relative aspect-4/3 overflow-hidden rounded-2xl${index === 0 ? " col-span-2 sm:col-span-1" : ""}`}
						>
							{/* Background Image */}
							<Image
								src={cat.image}
								alt={cat.name}
								fill
								className="object-cover transition-transform duration-500 group-hover:scale-105"
							/>

							{/* Dark overlay */}
							<div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/30" />

							{/* Label */}
							<div
								className="absolute inset-x-0 flex items-center justify-center py-3"
								style={{
									top: "50%",
									transform: "translateY(-50%)",
									background:
										"linear-gradient(90deg, rgba(0,0,0,0) 6.94%, #000000 49.13%, rgba(0,0,0,0) 92.36%)",
								}}
							>
								<span className="text-sm lg:text-[18px] font-semibold tracking-wider text-white uppercase">
									{cat.name}
								</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
