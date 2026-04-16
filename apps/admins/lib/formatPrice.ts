export function formatPrice(amount: number): string {
  if (amount >= 1_00_00_000) {
    const val = amount / 1_00_00_000;
    return `${val % 1 === 0 ? val : val.toFixed(2)}C`;
  }
  if (amount >= 1_00_000) {
    const val = amount / 1_00_000;
    return `${val % 1 === 0 ? val : val.toFixed(2)}L`;
  }
  if (amount >= 1_000) {
    const val = amount / 1_000;
    return `${val % 1 === 0 ? val : val.toFixed(1)}K`;
  }
  return `${amount}`;
}