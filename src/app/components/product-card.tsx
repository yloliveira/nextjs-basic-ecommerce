import Image from "next/image";

type Props = {
  onClick: (productSlugId: string) => void;
  product: {
    slugId: string;
    title: string;
    price: {
      originalAmount: number;
      numberOfInstallmentsWithoutTaxes: number;
      installmentValue: number;
    };
    image: string;
    freeShipping: boolean;
  };
};

export default function ProductCard({ onClick, product }: Props) {
  return (
    <div data-testid="container" onClick={() => onClick(product.slugId)}>
      <Image alt={product.title} src={product.image} width={100} height={100} />
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
