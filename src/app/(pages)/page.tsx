"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/app/components/product-card";
import { useFetchProducts } from "@/app/hooks/useFetchProducts";

export default function Home() {
  const router = useRouter();
  const { products, error, setFilter } = useFetchProducts();

  const onClickProduct = (productSlugId: string) => {
    router.push(`/product/${productSlugId}`);
  };

  function renderHeaderMessage() {
    if (error) {
      return <div data-testid="fetch-error">Algo deu errado por aqui...</div>;
    }

    if (products.length === 0) {
      return <div data-testid="no-product">Nenhum Produto encontrado...</div>;
    }
  }

  return (
    <main className="flex flex-col items-center justify-between gap-10">
      {renderHeaderMessage()}
      <section className="px-5">
        <div
          data-testid="product-list"
          className="bg-white w-full max-w-7xl p-5 shadow grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-5 gap-y-10 rounded-md"
        >
          <h2
            data-testid="product-list-title"
            className="col-span-2 md:col-span-4 lg:col-span-6 text-xl font-semibold"
          >
            Ofertas do dia
          </h2>
          {products.map(product => (
            <ProductCard
              onClick={onClickProduct}
              product={product}
              key={product.slugId}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
