export function formatNumber(num) {
  if (num === null || num === undefined) return '0';
  return new Intl.NumberFormat().format(num);
}

export default formatNumber;
