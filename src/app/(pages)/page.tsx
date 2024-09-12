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
    setFilter(text);
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

    return (
      <div data-testid="products-quantity">
        {products.length} {products.length === 1 ? "produto" : "produtos"}
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Search onSubmit={onSubmitSearchForm} />
      {renderHeaderMessage()}
      <div data-testid="product-list">
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
