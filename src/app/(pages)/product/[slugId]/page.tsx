"use client";
import React from "react";
import { useFetchProduct } from "@/app/hooks/useFetchProduct";
import Currency from "@/app/utils/currency";

export default function Product({ params }: { params: { slugId: string } }) {
  const { product } = useFetchProduct(params.slugId);

  if (!product) {
    return null;
  }

  return (
    <main className="">
      <h1>{product.title}</h1>
      <h3 data-testid="original-amount" className="text-lg font-semibold">
        {Currency.format(product.price.originalAmount)}
      </h3>
    </main>
  );
}
