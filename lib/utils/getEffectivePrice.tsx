export function getEffectivePrice(
  price: number | null,
  onSale: boolean | null,
  salePrice: number | null,
) {
  return onSale && salePrice ? salePrice : price || 0;
}
