import { Link } from '@/i18n/routing';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-serif text-brand-primary mb-4">404</h1>
      <h2 className="text-3xl font-serif text-brand-black mb-6">Không tìm thấy trang</h2>
      <p className="text-gray-500 max-w-md mb-10">
        Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. 
        Hãy quay lại trang chủ để khám phá những chai vang tuyệt hảo của chúng tôi.
      </p>
      <Link
        href="/"
        className="bg-brand-primary text-white font-bold py-4 px-12 rounded-full hover:bg-brand-black transition-all shadow-lg"
      >
        Quay lại trang chủ
      </Link>
    </div>
  );
}
