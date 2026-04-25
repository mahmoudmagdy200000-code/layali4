export const formatCurrency = (price, currency, isRTL) => {
  return isRTL ? `${price} ${currency}` : `${price} ${currency}`;
};
