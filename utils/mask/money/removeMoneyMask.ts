export function removeCurrencyMask(value: string): number | null {
  if (!value) return null;

  let cleaned = String(value).replace(/\s|R\$|[^0-9,\.]/g, "");
  cleaned = cleaned.replace(/\./g, "").replace(/,/g, ".");
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}
