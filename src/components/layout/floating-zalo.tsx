'use client';

import { SiZalo, SiFacebook } from 'react-icons/si';
import { motion } from 'motion/react';

export default function FloatingZalo() {
  const phone = '0338909973';
  const messengerLink = 'https://m.me/61579501142862';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-center">
      {/* Messenger */}
      <motion.a
        href={messengerLink}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        className="relative bg-[#0099ff] text-white p-4 rounded-full shadow-lg flex items-center justify-center"
      >
        <SiFacebook size={32} />
        <span className="absolute -top-2 -right-2 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
        </span>
      </motion.a>

      {/* Zalo */}
      <motion.a
        href={`https://zalo.me/${phone}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        className="relative bg-[#0068ff] text-white p-4 rounded-full shadow-lg flex items-center justify-center"
      >
        <SiZalo size={32} />
        <span className="absolute -top-2 -right-2 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
        </span>
      </motion.a>
    </div>
  );
}
