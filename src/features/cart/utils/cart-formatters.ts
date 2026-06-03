const usdCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatCartCurrency(value: number): string {
  return usdCurrencyFormatter.format(value);
}

export function formatCartItemQuantity(quantity: number): string {
  return quantity === 1 ? "1 item" : `${quantity} items`;
}
