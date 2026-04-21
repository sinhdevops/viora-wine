import { useTranslations, useLocale } from 'next-intl';

export const useZaloLink = () => {
  const t = useTranslations('zalo');
  const locale = useLocale();
  const phone = '0349748451'; // Số điện thoại Zalo của shop

  const getZaloLink = (productName: string) => {
    const message = t('message', { name: productName });
    const encodedMessage = encodeURIComponent(message);
    return `https://zalo.me/${phone}?text=${encodedMessage}`;
  };

  return { getZaloLink };
};
