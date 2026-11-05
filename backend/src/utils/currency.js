const USD_TO_INR = 85; // Example rate only; replace with a current rate.

export const convertUsdToInr = (usdPrice) => {
  return Number(usdPrice || 0) * USD_TO_INR;
};

export const formatINR = (priceInInr) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number(priceInInr) || 0);
};

export const formatUsdAsInr = (usdPrice) => {
  return formatINR(convertUsdToInr(usdPrice));
};