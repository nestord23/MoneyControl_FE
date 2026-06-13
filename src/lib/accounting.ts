export function accountingFormat(value: string): string {
  const num = parseFloat(value.replace(/[^0-9.-]/g, ''));
  if (isNaN(num)) return '';
  const neg = num < 0;
  const formatted = Math.abs(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return neg ? `(Q${formatted})` : `Q${formatted}`;
}

export function rawValue(value: string): string {
  return value.replace(/[Q()\s]/g, '');
}
