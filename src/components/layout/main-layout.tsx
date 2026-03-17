import Header from './header';
import Footer from './footer';
import FloatingZalo from './floating-zalo';
import AgeVerification from './age-verification';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-brand-black selection:bg-brand-primary selection:text-white">
      <NextTopLoader color="#E1001ECC" showSpinner={false} />
      <Header />
      <main className="flex-grow pt-[85px] lg:pt-[120px]">
        {children}
      </main>
      <Footer />
      <FloatingZalo />
      <AgeVerification />
      <Toaster position="top-center" richColors />
    </div>
  );
}
