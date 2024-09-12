/* eslint-disable @next/next/no-img-element */
import { Product } from "@/app/models/product";

type Props = {
  onClick: (productSlugId: string) => void;
  product: Product;
};

export default function ProductCard({ onClick, product }: Props) {
  return (
    <div
      data-testid="product-card"
      onClick={() => onClick(product.slugId)}
      className="cursor-pointer group"
    >
      <img alt={product.title} src={product.image} className="w-full h-auto" />
      <h3 className="text-sm my-3 group-hover:text-blue-500">
        {product.title}
      </h3>
      <h3 className="text-lg font-semibold">{product.price.originalAmount}</h3>
      {product.price.numberOfInstallmentsWithoutTaxes > 1 && (
        <div data-testid="installmentsText" className="text-xs font-light">
          {`em ${product.price.numberOfInstallmentsWithoutTaxes}x R$ ${product.price.installmentValue} sem juros`}
        </div>
      )}
      {product.freeShipping && (
        <div
          data-testid="freeShipping"
          className="text-xs mt-3 text-green-600 font-semibold"
        >
          Frete grátis
        </div>
      )}
    </div>
  );
}
