import { Suspense } from "react";
import WineProductGrid from "./wine-product-grid";

function WineGridSkeleton() {
	return (
		<div className="min-h-[600px] grid grid-cols-2 gap-4 content-start sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
			{Array.from({ length: 8 }).map((_, i) => (
				<div key={i} className="aspect-[216/290] animate-pulse rounded-xl bg-gray-100" />
			))}
		</div>
	);
}

interface Props {
	wineType?: string;
	grapeVariety?: string;
	emptyLabel?: string;
}

export default function WineProductGridWrapper(props: Props) {
	return (
		<Suspense fallback={<WineGridSkeleton />}>
			<WineProductGrid {...props} />
		</Suspense>
	);
}
