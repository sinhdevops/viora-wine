'use client';

import { SiZalo, SiFacebook } from 'react-icons/si';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface FloatingButtonItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  color: string;
  delay?: number;
}

function FloatingButtonItem({ href, icon, label, color, delay = 0 }: FloatingButtonItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 20, 
        delay 
      }}
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

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10"
      >
        {/* Main Button */}
        <motion.div
          animate={{
            rotate: [0, -10, 10, -10, 10, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "easeInOut",
            delay: delay + 1,
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className={`relative w-14 h-14 flex items-center justify-center rounded-full shadow-2xl overflow-hidden ${color}`}
          style={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          }}
        >
          {/* Shine effect */}
          <motion.div
            animate={{
              left: ['-100%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 4,
            }}
            className="absolute top-0 w-1/2 h-full bg-white/30 -skew-x-12"
          />
          
          <div className="text-white drop-shadow-md">
            {icon}
          </div>
        </motion.div>

        {/* Pulsing ripples */}
        <div className="absolute inset-0 -z-10">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.6, scale: 1 }}
              animate={{
                opacity: 0,
                scale: 2.2,
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.8,
                ease: 'easeOut',
              }}
              className={`absolute inset-0 rounded-full ${color.includes('from-[#00B2FF]') ? 'bg-[#00B2FF]' : 'bg-[#2196F3]'} opacity-20`}
            />
          ))}
        </div>

        {/* Notification dot */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4 z-20">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
        </span>
      </a>
    </motion.div>
  );
}

export default function FloatingZalo() {
  const t = useTranslations('common');
  const phone = '0338909973';
  const messengerLink = 'https://m.me/viorawine';

  return (
    <motion.div 
      initial={false}
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-10 items-center"
    >
      <FloatingButtonItem
        href={messengerLink}
        icon={<SiFacebook size={28} />}
        label={t('chat_messenger')}
        color="bg-gradient-to-br from-[#00B2FF] to-[#006AFF]"
        delay={0.1}
      />

      <FloatingButtonItem
        href={`https://zalo.me/${phone}`}
        icon={<SiZalo size={32} />}
        label={t('chat_zalo')}
        color="bg-gradient-to-br from-[#2196F3] to-[#01579B]"
        delay={0.2}
      />
    </motion.div>
  );
}
