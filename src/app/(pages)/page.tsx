"use client";
import React from "react";
import ProductCard from "@/app/components/product-card";
import Search from "@/app/components/search";
import { useFetchProducts } from "@/app/hooks/useFetchProducts";

export default function Home() {
  const { products, error } = useFetchProducts();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Search onSubmit={() => {}} />
      <div data-testid="product-list">
        {products.map(product => (
          <ProductCard
            onClick={() => {}}
            product={product}
            key={product.slugId}
          />
        ))}

        {products.length === 0 && (
          <div data-testid="no-product">Nenhum Produto encontrado...</div>
        )}
      </div>
    </main>
  );
}
