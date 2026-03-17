'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';

export default function AgeVerification() {
  const [show, setShow] = useState(false);
  const t = useTranslations('age_verify');

  useEffect(() => {
    const checkAge = () => {
      const verified = localStorage.getItem('age-verified');
      if (!verified) {
        setShow(true);
      }
    };
    checkAge();
  }, []);

  const handleConfirm = () => {
    localStorage.setItem('age-verified', 'true');
    setShow(false);
  };

  const handleCancel = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-black/80 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md w-full bg-white border border-brand-primary/20 p-8 text-center rounded-2xl shadow-2xl"
          >
            <h2 className="text-3xl font-serif text-brand-primary mb-4">{t('title')}</h2>
            <p className="text-gray-600 mb-8">{t('description')}</p>
            <div className="flex flex-col gap-4">
              <button
                onClick={handleConfirm}
                className="bg-brand-primary text-white font-bold py-3 px-6 rounded-full hover:bg-brand-primary/90 transition-colors shadow-lg"
              >
                {t('confirm')}
              </button>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-brand-primary transition-colors"
              >
                {t('cancel')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
