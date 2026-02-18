export function formatPrice(
  cents: number | null,
  locale = "pt-PT",
  currency = "EUR",
) {
  if (!cents) return "0,00€";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(cents / 100);
}
