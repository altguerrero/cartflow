interface ProductPriceProps {
  price: number;
}

const usdPriceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function ProductPrice({ price }: ProductPriceProps) {
  return (
    <p className="text-primary text-lg leading-none font-semibold">
      {usdPriceFormatter.format(price)}
    </p>
  );
}
