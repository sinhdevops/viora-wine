export const formatCurrency = (amount: number, locale: string = 'vi') => {
  return new Intl.NumberFormat(locale === 'vi' ? 'vi-VN' : 'en-US', {
    style: 'currency',
    currency: 'VND' ,
  }).format(amount);
};
