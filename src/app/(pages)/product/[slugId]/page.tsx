"use client";
import React from "react";
import { useFetchProduct } from "@/app/hooks/useFetchProduct";

export default function Product({ params }: { params: { slugId: string } }) {
  const { product } = useFetchProduct(params.slugId);

  if (!product) {
    return null;
  }

  return (
    <main className="">
      <h1>{product.title}</h1>
    </main>
  );
}
