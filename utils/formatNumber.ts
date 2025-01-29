export const formatNumber = (num: number): string => {
  if (isNaN(num) || !isFinite(num)) return "0.00";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
