export const DEPLOYMENT_PRICE_THB = 20_000;

export function formatAmount(value: number) {
  return new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatMoney(value: number) {
  return `${formatAmount(value)} ฿`;
}

export function formatDeploymentPrice() {
  return `${formatAmount(DEPLOYMENT_PRICE_THB)} THB`;
}

export function currencySymbol() {
  return "฿";
}
