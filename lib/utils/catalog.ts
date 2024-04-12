export const getCheckedPriceFrom = (price: number) =>
  +price > 10000 ? '5000' : price

export const getCheckedPriceTo = (price: number) =>
  +price > 10000 ? '10000' : price
