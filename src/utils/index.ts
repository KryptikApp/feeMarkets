export const roundToDecimals = function (
  amountIn: number,
  decimals: number = 18
) {
  return Number(amountIn.toFixed(decimals));
};

export const divByDecimals = function (
  amountIn: number,
  decimals: number
): number {
  amountIn = roundToDecimals(amountIn, decimals);
  return amountIn / 10 ** decimals;
};
