export function formatToCurrency(
  cents: number | null | undefined,
  locale = "pt-PT",
  currency = "EUR",
) {
  if (!cents) return "0,00€";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export function formatToCents(price: number | null | undefined) {
  if (!price) return 0;
  return price * 100;
}
