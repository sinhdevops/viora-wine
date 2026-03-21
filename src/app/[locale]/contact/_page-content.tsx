'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPageContent() {
  const t = useTranslations('contact');
  const footerT = useTranslations('footer');
  const commonT = useTranslations('common');

  const contactSchema = z.object({
    name: z.string().min(2, t('error_name_short')),
    email: z.string().email(t('error_email_invalid')),
    message: z.string().min(10, t('error_message_short')),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    toast.success(t('success'));
    reset();
  };

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-brand-primary mb-4">{commonT('contact')}</h1>
          <div className="w-24 h-1 bg-brand-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-serif text-brand-primary mb-8">{t('info_title')}</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                    <HiOutlineLocationMarker size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold mb-1">{t('address_label')}</h4>
                    <p className="text-gray-600">{footerT('address')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                    <HiOutlinePhone size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold mb-1">{t('phone_label')}</h4>
                    <p className="text-gray-600">{footerT('phone')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                    <HiOutlineMail size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold mb-1">{t('email_label')}</h4>
                    <p className="text-gray-600">{footerT('email')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-80 rounded-2xl overflow-hidden border border-brand-primary/10 grayscale hover:grayscale-0 transition-all duration-500 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58948.33744955375!2d108.19163245!3d16.0470797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c792252a13%3A0x1df0cb4e86727f0d!2zRMOgbm5nLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1710570000000!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="WineHouse Da Nang Map"
              ></iframe>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-50 p-8 md:p-12 rounded-3xl border border-brand-primary/10 shadow-xl"
          >
            <h2 className="text-3xl font-serif text-brand-primary mb-8">{t('form_title')}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-500 mb-2">{t('name_label')}</label>
                <input
                  {...register('name')}
                  className="w-full bg-white border border-brand-primary/10 rounded-lg px-4 py-3 text-gray-900 focus:border-brand-primary outline-none transition-all shadow-sm"
                  placeholder={t('name_placeholder')}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">{t('email_input_label')}</label>
                <input
                  {...register('email')}
                  className="w-full bg-white border border-brand-primary/10 rounded-lg px-4 py-3 text-gray-900 focus:border-brand-primary outline-none transition-all shadow-sm"
                  placeholder={t('email_placeholder')}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">{t('message_label')}</label>
                <textarea
                  {...register('message')}
                  rows={5}
                  className="w-full bg-white border border-brand-primary/10 rounded-lg px-4 py-3 text-gray-900 focus:border-brand-primary outline-none transition-all resize-none shadow-sm"
                  placeholder={t('message_placeholder')}
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-primary text-white font-bold py-4 rounded-lg hover:bg-brand-black transition-all disabled:opacity-50 shadow-lg"
              >
                {isSubmitting ? t('submitting') : t('submit')}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
