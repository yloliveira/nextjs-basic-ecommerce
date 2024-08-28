import Image from "next/image";

type Props = {
  product: {
    title: string;
    price: {
      originalAmount: number;
    };
    image: string;
    freeShipping: boolean;
    numberOfInstallmentsWithoutTaxes: number;
  };
};

export default function ProductCard({ product }: Props) {
  return (
    <div>
      <Image alt={product.title} src={product.image} width={100} height={100} />
      <h3>{product.title}</h3>
      <h3>{product.price.originalAmount}</h3>
      {product.freeShipping && (
        <div data-testid="freeShipping">Frete grátis</div>
      )}
      {product.numberOfInstallmentsWithoutTaxes > 1 && (
        <div>em {product.numberOfInstallmentsWithoutTaxes}x sem juros</div>
      )}
    </div>
  );
}
