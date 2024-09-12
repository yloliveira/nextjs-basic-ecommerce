"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/app/components/product-card";
import Search from "@/app/components/search";
import { useFetchProducts } from "@/app/hooks/useFetchProducts";

export default function Home() {
  const router = useRouter();
  const { products, error, setFilter } = useFetchProducts();

  const onSubmitSearchForm = ({ text }: { text: string }) => {
    router.push(`/search&term=${text}`);
  };

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
    <main className="flex flex-col items-center justify-between px-5">
      <Search onSubmit={onSubmitSearchForm} />
      {renderHeaderMessage()}
      <div
        data-testid="product-list"
        className="bg-white w-full max-w-7xl p-5 shadow grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-5 gap-y-10"
      >
        {products.map(product => (
          <ProductCard
            onClick={onClickProduct}
            product={product}
            key={product.slugId}
          />
        ))}
      </div>
    </main>
  );
}
