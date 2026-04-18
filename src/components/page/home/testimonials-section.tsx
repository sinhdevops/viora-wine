"use client";

import { useTranslations } from "next-intl";
import { HiStar } from "react-icons/hi";

interface ReviewItem {
	id: string;
	name: string;
	initials: string;
	review: string;
	productName: string;
}

const MOCK_REVIEWS: ReviewItem[] = [
	{
		id: "rev-1",
		name: "Nguyễn Hải",
		initials: "NH",
		review: "Vang đỏ Chile quá tuyệt. Shop tư vấn nhiệt tình, giao hàng nhanh chóng tại Đà Nẵng, đóng gói cẩn thận.",
		productName: "Vang Chile G7 Classic",
	},
	{
		id: "rev-2",
		name: "Trần Vân",
		initials: "TV",
		review: "Đã mua hộp quà biếu đối tác, hình thức rất sang trọng. Nhận được nhiều lời khen, sẽ quay lại ủng hộ.",
		productName: "Hộp Quà Vang Pháp",
	},
	{
		id: "rev-3",
		name: "Lê Minh",
		initials: "LM",
		review: "Giá cả hợp lý, hàng chuẩn chính hãng. Có thêm bộ ly tặng kèm rất đẹp. Hoàn toàn yên tâm khi mua tại đây.",
		productName: "Vang Ý Luccarelli",
	},
	{
		id: "rev-4",
		name: "Hoàng Oanh",
		initials: "HO",
		review: "Phục vụ 24/7 thực sự chuyên nghiệp. Gọi lúc 9h tối vẫn có người tư vấn kỹ càng để chọn đúng vị vang ngọt.",
		productName: "Vang Ngọt Ý Moscato",
	},
];

const METRICS = [
	{ label: "Đánh giá sao", value: "4.9/5", suffix: "★" },
	{ label: "Khách hàng tin chọn", value: "2.000", suffix: "+" },
	{ label: "Cam kết chính hãng", value: "100", suffix: "%" },
];

export default function TestimonialsSection() {
	const t = useTranslations("home");
	const metrics = t.raw("metrics") || [];
	const reviews = t.raw("reviews") || [];

	return (
		<section className="bg-[#FAFAFA] py-16 md:py-20 lg:py-24">
			<div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
				
				{/* 1. Tiêu đề + Subtitle */}
				<div className="mb-10 text-center">
					<h2 className="mb-3 text-xl font-semibold uppercase tracking-[0.15em] md:text-[28px]">
						{t("testimonials")}
					</h2>
					<p className="text-gray-500 text-sm md:text-base mx-auto max-w-2xl">
						{t("testimonials_subtitle")}
					</p>
				</div>

				{/* 2. 3 Metrics */}
				<div className="mb-12 flex flex-wrap justify-center gap-8 md:mb-16 md:gap-16 lg:gap-24">
					{metrics.map((metric: any, idx: number) => (
						<div key={idx} className="flex flex-col items-center text-center">
							<div className="flex items-baseline text-3xl font-bold text-gray-900 md:text-4xl">
								{metric.value}
								<span className="text-xl md:text-2xl text-brand-primary ml-1">{metric.suffix}</span>
							</div>
							<p className="mt-2 text-sm font-medium text-gray-500 md:text-base uppercase tracking-wider">
								{metric.label}
							</p>
						</div>
					))}
				</div>

				{/* 3. Lưới 4 Card Review */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{reviews.map((review: any) => (
						<div 
							key={review.id} 
							className="flex flex-col rounded-xl border border-gray-100 bg-white p-6   transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary font-bold text-lg">
									{review.initials}
								</div>
								<div>
									<h4 className="font-semibold text-gray-900">{review.name}</h4>
									<div className="flex mt-1 text-yellow-400">
										<HiStar size={16} />
										<HiStar size={16} />
										<HiStar size={16} />
										<HiStar size={16} />
										<HiStar size={16} />
									</div>
								</div>
							</div>
							
							<p className="text-sm leading-relaxed text-gray-600 mb-5 flex-grow italic">
								"{review.review}"
							</p>

							<div className="mt-auto">
								<span className="inline-block rounded-md bg-[#F4F4F4] px-3 py-1.5 text-[12px] font-medium text-[#3D3D3D]">
									{t("bought_label")}<span className="text-gray-800 font-semibold">{review.productName}</span>
								</span>
							</div>
						</div>
					))}
				</div>
				
			</div>
		</section>
	);
}
