export const formatCurrency = (value, locale = 'en-US', currency = 'USD') =>
  Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
