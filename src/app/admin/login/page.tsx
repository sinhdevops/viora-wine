"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "motion/react";
import { 
  Wine, 
  Lock, 
  Mail, 
  ArrowRight, 
  Loader2, 
  AlertCircle,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        setError(authError.message === "Invalid login credentials" 
          ? "Email hoặc mật khẩu không chính xác" 
          : authError.message);
        toast.error("Đăng nhập thất bại");
        return;
      }

      toast.success("Đăng nhập thành công!");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError("Đã xảy ra lỗi không xác định. Vui lòng thử lại.");
      toast.error("Lỗi hệ thống");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0a] font-(family-name:--font-lexend)">
      {/* Background ambient light */}
      <div className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-brand-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-brand-wine/5 blur-[120px]" />
      
      {/* Animated background patterns */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[440px] px-6"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-brand-primary to-brand-wine shadow-lg shadow-brand-primary/20"
          >
            <Wine className="text-white" size={32} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-extrabold tracking-tight text-white"
          >
            Viora <span className="text-brand-primary">Wine</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-sm text-gray-400"
          >
            Vui lòng đăng nhập để truy cập trang quản trị
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="glass-card soft-shadow overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-8 backdrop-blur-2xl"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-3 rounded-xl bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20"
                >
                  <AlertCircle size={18} />
                  <p>{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              <div className="group space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 group-focus-within:text-brand-primary transition-colors">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-primary transition-colors" size={18} />
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="admin@viorawine.com"
                    className="w-full rounded-2xl border border-white/5 bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 outline-none transition-all focus:border-brand-primary/50 focus:bg-white/8 focus:ring-4 focus:ring-brand-primary/10"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-400 ml-1">{errors.email.message}</p>
                )}
              </div>

              <div className="group space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 group-focus-within:text-brand-primary transition-colors">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-primary transition-colors" size={18} />
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-white/5 bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 outline-none transition-all focus:border-brand-primary/50 focus:bg-white/8 focus:ring-4 focus:ring-brand-primary/10"
                  />
                </div>
                {errors.password && (
                  <p className="text-xs text-red-400 ml-1">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-brand-primary py-4 font-bold text-white transition-all hover:bg-brand-wine active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <span className="flex items-center gap-2">
                      Đăng nhập <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 flex items-center justify-center gap-4 border-t border-white/5 pt-6 text-[10px] sm:text-xs">
            <div className="flex items-center gap-1.5 text-gray-500">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Hệ thống bảo mật cao</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-gray-700" />
            <div className="text-gray-500">
              Viora Wine Admin Panel
            </div>
          </div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center text-xs text-gray-600"
        >
          © {new Date().getFullYear()} Viora Wine. Bảo lưu mọi quyền.
        </motion.p>
      </motion.div>
    </div>
  );
}
