/**
 * Parse a numeric input value safely, returning 0 for empty or non-finite inputs.
 */
export const parseNumber = (value?: number | string | null): number => {
  if (value === undefined || value === null) return 0;
  if (typeof value === "string" && value.trim() === "") return 0;
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

/**
 * Round a currency value to 2 decimal places while guarding against floating-point drift, non-finite values, and -0.
 */
export const roundCurrency = (value: number): number => {
  if (!Number.isFinite(value)) return 0;
  const fixed = value.toFixed(6);
  const rounded = fixed.includes("e")
    ? Math.round((value + Number.EPSILON) * 100) / 100
    : Number(`${Math.round(Number(`${fixed}e+2`))}e-2`);
  return rounded === 0 ? 0 : rounded;
};

/**
 * Resolve the effective quantity for line calculation (0 or empty defaults to 1).
 */
export const getEffectiveQty = (qty?: number | string | null): number => {
  const parsed = parseNumber(qty);
  return parsed > 0 ? parsed : 1;
};

/**
 * Calculate the rounded line total for a single invoice item.
 */
export const getItemLineTotal = (item: Item): number =>
  roundCurrency(getEffectiveQty(item.qty) * Math.max(0, parseNumber(item.amount)));

/**
 * Calculate invoice subtotal, discount, tax, and final total rounded consistently.
 */
export const calculateInvoiceTotals = (
  items: Item[] = [],
  discount?: string | null,
  taxRate?: string | null
) => {
  const safeItems = Array.isArray(items) ? items : [];
  const subtotal = roundCurrency(
    safeItems.reduce((total, item) => total + getItemLineTotal(item), 0)
  );
  const discountValue = Math.max(0, roundCurrency(parseNumber(discount)));
  const discountedSubtotal = Math.max(0, roundCurrency(subtotal - discountValue));
  const taxRateValue = Math.max(0, parseNumber(taxRate));
  const taxAmount = roundCurrency(discountedSubtotal * (taxRateValue / 100));
  const totalAmount = roundCurrency(discountedSubtotal + taxAmount);

  return {
    subtotal,
    discountValue,
    discountedSubtotal,
    taxRateValue,
    taxAmount,
    totalAmount,
  };
};

/**
 * Format a numeric value with thousands separators without altering decimal digits.
 */
export const addCommasToNumber = (value: number): string => {
  const rounded = roundCurrency(value);
  const parts = rounded.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};
