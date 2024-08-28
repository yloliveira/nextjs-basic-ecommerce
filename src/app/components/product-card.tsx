import Image from "next/image";

type Props = {
  product: {
    title: string;
    price: number;
    image: string;
  };
};

export default function ProductCard({ product }: Props) {
  return (
    <div>
      <Image alt={product.title} src={product.image} width={100} height={100} />
      <h3>{product.title}</h3>
      <h3>{product.price}</h3>
    </div>
  );
}
