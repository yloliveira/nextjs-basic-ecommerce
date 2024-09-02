/* eslint-disable @next/next/no-img-element */
import { Product } from "@/app/models/product";

type Props = {
  onClick: (productSlugId: string) => void;
  product: Product;
};

export default function ProductCard({ onClick, product }: Props) {
  return (
    <div data-testid="product-card" onClick={() => onClick(product.slugId)}>
      <img alt={product.title} src={product.image} className="w-full h-auto" />
      <h3>{product.title}</h3>
      <h3>{product.price.originalAmount}</h3>
      {product.freeShipping && (
        <div data-testid="freeShipping">Frete grátis</div>
      )}
      {product.price.numberOfInstallmentsWithoutTaxes > 1 && (
        <div data-testid="installmentsText">
          {`em ${product.price.numberOfInstallmentsWithoutTaxes}x R$ ${product.price.installmentValue} sem juros`}
        </div>
      )}
    </div>
  );
}
