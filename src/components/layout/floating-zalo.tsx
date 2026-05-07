'use client';

import { SiZalo, SiFacebook } from 'react-icons/si';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

declare function gtag(...args: unknown[]): void;

function trackContactConversion() {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', { send_to: 'AW-18100193809/tU1uCO_GvJ4cEJGU7LZD' });
  }
}

interface FloatingButtonItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  bgClass: string;
  rippleColor: string;
  delay?: number;
}

function FloatingButtonItem({ href, icon, label, bgClass, rippleColor, delay = 0 }: FloatingButtonItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex items-center justify-end group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Label */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.8 }}
            animate={{ opacity: 1, x: -12, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.8 }}
            className="absolute right-full px-3 py-1.5 bg-white/90 backdrop-blur-md text-slate-800 text-sm font-medium rounded-lg shadow-xl border border-white/20 whitespace-nowrap pointer-events-none"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>

      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="relative" onClick={trackContactConversion}>
        {/* Ripple rings — CSS animation, không dùng framer */}
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-40"
          style={{ backgroundColor: rippleColor, animationDuration: '2s', animationDelay: `${delay}s` }}
        />
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{ backgroundColor: rippleColor, animationDuration: '2s', animationDelay: `${delay + 0.8}s` }}
        />

        {/* Main button */}
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 5,
            ease: 'easeInOut',
            delay: delay + 1,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`relative z-10 w-14 h-14 flex items-center justify-center rounded-full shadow-2xl ${bgClass}`}
        >
          <div className="text-white drop-shadow-md">{icon}</div>
        </motion.div>

        {/* Notification dot */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4 z-20">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white" />
        </span>
      </a>
    </div>
  );
}

export default function FloatingZalo() {
  const t = useTranslations('common');
  const phone = '0325610016';
  const messengerLink = 'https://m.me/viorawine';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-10 items-center">
      <FloatingButtonItem
        href={messengerLink}
        icon={<SiFacebook size={28} aria-hidden="true" />}
        label={t('chat_messenger')}
        bgClass="bg-gradient-to-br from-[#00B2FF] to-[#006AFF]"
        rippleColor="#00B2FF"
        delay={0}
      />
      <FloatingButtonItem
        href={`https://zalo.me/${phone}`}
        icon={<SiZalo size={32} aria-hidden="true" />}
        label={t('chat_zalo')}
        bgClass="bg-gradient-to-br from-[#2196F3] to-[#01579B]"
        rippleColor="#2196F3"
        delay={0.8}
      />
    </div>
  );
}
