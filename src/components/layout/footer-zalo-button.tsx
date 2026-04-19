'use client';

declare function gtag(...args: unknown[]): void;

interface FooterZaloButtonProps {
  label: string;
}

export default function FooterZaloButton({ label }: FooterZaloButtonProps) {
  const handleClick = () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', { send_to: 'AW-18100193809/tU1uCO_GvJ4cEJGU7LZD' });
    }
  };

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://zalo.me/0338909973"
      onClick={handleClick}
      className="inline-block rounded-lg bg-brand-primary px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#A30000]"
    >
      {label}
    </a>
  );
}
