import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";

export const metadata = {
	title: "Chính sách bảo mật | Viora Wine",
};

const SECTIONS = [
	{
		title: "1. Thông tin chúng tôi thu thập",
		content: `Viora Wine thu thập thông tin cá nhân khi bạn đặt hàng, đăng ký tài khoản hoặc liên hệ với chúng tôi, bao gồm:

• Họ tên, số điện thoại, địa chỉ email
• Địa chỉ giao hàng và thông tin thanh toán
• Lịch sử đặt hàng và sở thích sản phẩm
• Thông tin thiết bị và hành vi truy cập website (cookies, địa chỉ IP)`,
	},
	{
		title: "2. Mục đích sử dụng thông tin",
		content: `Thông tin của bạn được sử dụng để:

• Xử lý đơn hàng và giao hàng đúng địa chỉ
• Xác minh độ tuổi theo quy định pháp luật (18+ đối với đồ uống có cồn)
• Gửi thông báo về đơn hàng, khuyến mãi và chương trình thành viên
• Cải thiện chất lượng dịch vụ và trải nghiệm mua sắm
• Tuân thủ các yêu cầu pháp lý liên quan đến kinh doanh rượu`,
	},
	{
		title: "3. Chia sẻ thông tin",
		content: `Viora Wine cam kết không bán, cho thuê hoặc trao đổi thông tin cá nhân của bạn với bên thứ ba vì mục đích thương mại. Chúng tôi chỉ chia sẻ thông tin trong các trường hợp:

• Với đơn vị vận chuyển để thực hiện giao hàng
• Với cổng thanh toán để xử lý giao dịch an toàn
• Khi có yêu cầu từ cơ quan nhà nước có thẩm quyền theo quy định pháp luật`,
	},
	{
		title: "4. Bảo mật thông tin",
		content: `Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức phù hợp để bảo vệ thông tin cá nhân của bạn khỏi truy cập trái phép, mất mát hoặc tiết lộ, bao gồm:

• Mã hóa dữ liệu truyền tải (SSL/TLS)
• Kiểm soát quyền truy cập nội bộ theo nguyên tắc tối thiểu
• Giám sát hệ thống thường xuyên để phát hiện bất thường`,
	},
	{
		title: "5. Chính sách Cookies",
		content: `Website sử dụng cookies để ghi nhớ phiên đăng nhập, giỏ hàng và tùy chọn của bạn. Bạn có thể tắt cookies trong cài đặt trình duyệt, tuy nhiên một số tính năng của website có thể bị ảnh hưởng.

Chúng tôi cũng sử dụng cookies phân tích (Google Analytics) để theo dõi lưu lượng truy cập nhằm cải thiện dịch vụ.`,
	},
	{
		title: "6. Quyền của bạn",
		content: `Bạn có quyền:

• Yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân
• Từ chối nhận email marketing bất kỳ lúc nào
• Phản đối việc xử lý dữ liệu trong một số trường hợp nhất định

Để thực hiện các quyền trên, vui lòng liên hệ với chúng tôi qua email hoặc hotline.`,
	},
	{
		title: "7. Cập nhật chính sách",
		content: `Chính sách bảo mật này có thể được cập nhật định kỳ. Mọi thay đổi quan trọng sẽ được thông báo qua email hoặc thông báo nổi bật trên website. Ngày cập nhật lần cuối: 21/03/2026.`,
	},
];

export default function PrivacyPolicyPage() {
	return (
		<div className="min-h-screen bg-white">
			{/* Breadcrumb */}
			<div className="border-b border-gray-100">
				<div className="mx-auto max-w-360 px-4 py-3 sm:px-6 lg:px-8">
					<nav className="flex items-center gap-1.5 text-[12px] text-gray-400">
						<Link href="/" className="hover:text-gray-700">Trang chủ</Link>
						<ChevronRight size={12} />
						<span className="text-gray-700">Chính sách bảo mật</span>
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
						Chính sách bảo mật
					</h1>
					<p className="mt-3 text-sm text-gray-500">
						Cập nhật lần cuối: 21/03/2026 · Viora Wine cam kết bảo vệ quyền riêng tư và thông tin cá nhân của khách hàng theo quy định pháp luật Việt Nam.
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
					<h3 className="mb-2 text-[14px] font-bold text-gray-900">Liên hệ về quyền riêng tư</h3>
					<p className="text-[13px] leading-relaxed text-gray-500">
						Nếu bạn có câu hỏi về chính sách bảo mật, vui lòng liên hệ với chúng tôi:
					</p>
					<ul className="mt-3 space-y-1 text-[13px] text-gray-600">
						<li>Email: <span className="font-medium">privacy@viorawine.vn</span></li>
						<li>Hotline: <span className="font-medium">0905 123 456</span></li>
						<li>Địa chỉ: <span className="font-medium">Đà Nẵng, Việt Nam</span></li>
					</ul>
				</div>
			</div>
		</div>
	);
}
