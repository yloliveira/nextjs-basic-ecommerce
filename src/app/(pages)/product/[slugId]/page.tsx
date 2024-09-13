/* eslint-disable @next/next/no-img-element */
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
      <img alt={product.title} src={product.image} className="w-full h-auto" />
      <h1>{product.title}</h1>
      <h3 data-testid="original-amount" className="text-lg font-semibold">
        {Currency.format(product.price.originalAmount)}
      </h3>
      {product.price.numberOfInstallmentsWithoutTaxes > 1 && (
        <div data-testid="installmentsText" className="text-xs font-light">
          {`em ${
            product.price.numberOfInstallmentsWithoutTaxes
          }x ${Currency.format(product.price.installmentValue)} sem juros`}
        </div>
      )}
      <p>{product.description}</p>
    </main>
  );
}
