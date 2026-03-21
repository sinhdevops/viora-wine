import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";

export const metadata = {
	title: "Điều khoản sử dụng | Viora Wine",
};

const SECTIONS = [
	{
		title: "1. Xác nhận độ tuổi",
		content: `Viora Wine kinh doanh đồ uống có cồn. Khi truy cập và sử dụng website, bạn xác nhận rằng:

• Bạn từ đủ 18 tuổi trở lên theo quy định pháp luật Việt Nam
• Việc mua bán rượu cho người dưới 18 tuổi là vi phạm pháp luật và bị nghiêm cấm
• Viora Wine có quyền từ chối giao hàng nếu nghi ngờ người nhận chưa đủ tuổi`,
	},
	{
		title: "2. Sử dụng website",
		content: `Bạn đồng ý sử dụng website cho mục đích hợp pháp và không thực hiện các hành vi:

• Cung cấp thông tin sai lệch khi đặt hàng
• Sao chép, phân phối lại nội dung website mà không có sự cho phép
• Tấn công, can thiệp hoặc làm gián đoạn hoạt động của hệ thống
• Sử dụng bot, crawler thu thập dữ liệu trái phép`,
	},
	{
		title: "3. Đặt hàng và thanh toán",
		content: `Khi đặt hàng tại Viora Wine:

• Đơn hàng chỉ được xác nhận sau khi thanh toán thành công hoặc được nhân viên xác nhận qua điện thoại/Zalo
• Giá sản phẩm được niêm yết bằng VND và có thể thay đổi mà không báo trước
• Chúng tôi chấp nhận thanh toán chuyển khoản ngân hàng, tiền mặt khi nhận hàng và các ví điện tử hợp lệ
• Viora Wine có quyền hủy đơn hàng nếu phát hiện thông tin gian lận hoặc vi phạm điều khoản`,
	},
	{
		title: "4. Vận chuyển và giao hàng",
		content: `• Giao hàng toàn quốc qua các đơn vị vận chuyển uy tín
• Thời gian giao hàng: 1–3 ngày (nội thành Đà Nẵng), 3–7 ngày (tỉnh khác)
• Phí vận chuyển được tính dựa trên địa chỉ nhận và khối lượng đơn hàng
• Chúng tôi không chịu trách nhiệm với các rủi ro phát sinh ngoài tầm kiểm soát (thiên tai, đình công, v.v.)
• Người nhận hàng phải từ đủ 18 tuổi; nhân viên giao hàng có quyền kiểm tra CMND/CCCD`,
	},
	{
		title: "5. Chính sách đổi trả",
		content: `Viora Wine chấp nhận đổi trả trong các trường hợp:

• Sản phẩm bị hư hỏng, rò rỉ trong quá trình vận chuyển (báo trong 24 giờ kể từ khi nhận hàng)
• Sản phẩm giao sai so với đơn hàng đã đặt
• Sản phẩm hết hạn sử dụng

Không chấp nhận đổi trả khi:
• Sản phẩm đã được mở nắp hoặc sử dụng một phần
• Hết hạn báo cáo 24 giờ mà không có bằng chứng hợp lệ`,
	},
	{
		title: "6. Sở hữu trí tuệ",
		content: `Toàn bộ nội dung trên website Viora Wine — bao gồm văn bản, hình ảnh, logo, video và thiết kế — là tài sản của Viora Wine và được bảo hộ bởi Luật Sở hữu trí tuệ Việt Nam. Nghiêm cấm sao chép, sử dụng hoặc phân phối lại dưới bất kỳ hình thức nào khi chưa có sự chấp thuận bằng văn bản.`,
	},
	{
		title: "7. Giới hạn trách nhiệm",
		content: `Viora Wine cung cấp dịch vụ trên cơ sở "nguyên trạng". Trong giới hạn pháp luật cho phép, chúng tôi không chịu trách nhiệm về:

• Thiệt hại gián tiếp phát sinh từ việc sử dụng sản phẩm không đúng cách
• Nội dung từ các website bên thứ ba được liên kết trên website của chúng tôi
• Gián đoạn dịch vụ do sự cố kỹ thuật ngoài tầm kiểm soát`,
	},
	{
		title: "8. Luật áp dụng và giải quyết tranh chấp",
		content: `Các điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Mọi tranh chấp phát sinh sẽ được giải quyết trước tiên bằng thương lượng. Nếu không đạt được thỏa thuận, tranh chấp sẽ được đưa ra Tòa án nhân dân có thẩm quyền tại Đà Nẵng.`,
	},
	{
		title: "9. Thay đổi điều khoản",
		content: `Viora Wine có quyền cập nhật điều khoản sử dụng bất kỳ lúc nào. Phiên bản mới nhất luôn được đăng tải trên website. Việc tiếp tục sử dụng dịch vụ sau khi điều khoản được cập nhật đồng nghĩa với việc bạn chấp nhận các thay đổi đó. Ngày cập nhật lần cuối: 21/03/2026.`,
	},
];

export default function TermsPage() {
	return (
		<div className="min-h-screen bg-white">
			{/* Breadcrumb */}
			<div className="border-b border-gray-100">
				<div className="mx-auto max-w-360 px-4 py-3 sm:px-6 lg:px-8">
					<nav className="flex items-center gap-1.5 text-[12px] text-gray-400">
						<Link href="/" className="hover:text-gray-700">Trang chủ</Link>
						<ChevronRight size={12} />
						<span className="text-gray-700">Điều khoản sử dụng</span>
					</nav>
				</div>
			</div>

			<div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-10 border-b border-gray-100 pb-8">
					<p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-brand-primary">
						Viora Wine
					</p>
					<h1 className="text-2xl font-black uppercase tracking-tight text-gray-900 md:text-[32px]">
						Điều khoản sử dụng
					</h1>
					<p className="mt-3 text-sm text-gray-500">
						Cập nhật lần cuối: 21/03/2026 · Vui lòng đọc kỹ các điều khoản dưới đây trước khi sử dụng dịch vụ của Viora Wine.
					</p>
				</div>

				{/* Intro */}
				<div className="mb-8 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-5">
					<p className="text-[13px] leading-relaxed text-gray-700">
						Bằng việc truy cập và sử dụng website <strong>viorawine.vn</strong>, bạn đồng ý bị ràng buộc bởi các điều khoản và điều kiện dưới đây. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng website.
					</p>
				</div>

				{/* Sections */}
				<div className="space-y-8">
					{SECTIONS.map((section) => (
						<div key={section.title}>
							<h2 className="mb-3 text-[15px] font-black text-gray-900">
								{section.title}
							</h2>
							<p className="whitespace-pre-line text-[14px] leading-relaxed text-gray-600">
								{section.content}
							</p>
						</div>
					))}
				</div>

				{/* Contact */}
				<div className="mt-12 rounded-2xl bg-gray-50 p-6">
					<h3 className="mb-2 text-[14px] font-bold text-gray-900">Mọi thắc mắc xin liên hệ</h3>
					<p className="text-[13px] leading-relaxed text-gray-500">
						Nếu bạn có câu hỏi về điều khoản sử dụng, chúng tôi sẵn sàng giải đáp:
					</p>
					<ul className="mt-3 space-y-1 text-[13px] text-gray-600">
						<li>Email: <span className="font-medium">legal@viorawine.vn</span></li>
						<li>Hotline: <span className="font-medium">0905 123 456</span></li>
						<li>Giờ làm việc: <span className="font-medium">08:00 – 22:00 mỗi ngày</span></li>
					</ul>
				</div>

				{/* Back links */}
				<div className="mt-8 flex items-center gap-6 border-t border-gray-100 pt-8">
					<Link href="/privacy-policy" className="text-[13px] font-medium text-brand-primary hover:underline">
						← Chính sách bảo mật
					</Link>
					<Link href="/" className="text-[13px] font-medium text-gray-500 hover:text-gray-800">
						Về trang chủ
					</Link>
				</div>
			</div>
		</div>
	);
}
